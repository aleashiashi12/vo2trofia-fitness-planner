
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { WorkoutStep, WorkoutPart, DayId, AppSettings } from '../types';
import { PlayIcon, PauseIcon, NextIcon, PrevIcon, CloseIcon, SkipIcon, DumbbellIcon, FireIcon } from './icons/Icons';
import ConfirmationModal from './ConfirmationModal';
import * as workoutService from '../services/workoutService';
import * as uxService from '../services/uxService';


interface CircularTimerProps {
  duration: number;
  currentTime: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

const CircularTimer: React.FC<CircularTimerProps> = ({ duration, currentTime, size = 200, strokeWidth = 15, color = "text-brand-purple" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = duration > 0 ? (currentTime / duration) : 0;
    const offset = circumference * (1 - progress);

    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    className="stroke-current text-gray-700"
                    fill="none"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className={`stroke-current ${color} transition-all duration-1000 linear`}
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span 
                    className="text-7xl font-bold text-white tracking-tighter"
                    style={{fontVariantNumeric: 'tabular-nums'}}
                >
                    {`${minutes}:${seconds.toString().padStart(2, '0')}`}
                </span>
            </div>
        </div>
    );
};

interface WorkoutStepperProps {
  isOpen: boolean;
  onClose: () => void;
  routineSteps: WorkoutStep[];
  title: string;
  dayId: DayId;
  dayTitle: string;
  settings: AppSettings;
  nextRoutineType?: 'strength' | 'hiit' | null;
  onStartNextRoutine?: (routineType: 'strength' | 'hiit') => void;
  onWorkoutComplete: (dayId: DayId, title: string) => void;
}

// --- Helper Functions ---
interface FlatWarmupItem {
  part: WorkoutPart;
  parentName: string;
}

const flattenWarmup = (steps: WorkoutStep[]): FlatWarmupItem[] => {
  return steps.flatMap(step => {
    if (step.type !== 'warmup') return [];
    
    if (step.parts && step.parts.length > 0) {
      return step.parts.map(p => ({
        part: { ...p, transition: step.transition || 3, name: p.name },
        parentName: step.name,
      }));
    }
    
    const part: WorkoutPart = {
      name: step.name,
      duration: step.duration || 0,
      cue: step.cue || '',
      transition: step.transition || 3,
    };
    return [{ part, parentName: step.name }];
  });
};

const isTimedExercise = (step: WorkoutStep | undefined): boolean => {
    if (!step || !step.reps) return false;
    return step.reps.toLowerCase().includes('segundos');
};

const isPerSideExercise = (step: WorkoutStep | undefined): boolean => {
    if (!step || !step.reps) return false;
    return step.reps.toLowerCase().includes('por lado');
};

const parseTimeFromReps = (reps: string | undefined): number => {
    if (!reps) return 0;
    const match = reps.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
};

const SetProgressIndicator: React.FC<{total: number, current: number}> = ({ total, current }) => {
    const dots = [];
    for (let i = 1; i <= total; i++) {
        let dotClass = "w-4 h-4 rounded-full bg-gray-700 transition-all duration-300";
        if (i < current) { // Completed sets
            dotClass = "w-4 h-4 rounded-full bg-brand-purple";
        } else if (i === current) { // Current set
            dotClass = "w-5 h-5 rounded-full bg-brand-purple ring-2 ring-offset-2 ring-offset-black ring-brand-purple";
        }
        dots.push(<div key={i} className={dotClass} />);
    }
    return <div className="flex items-center justify-center gap-4">{dots}</div>;
};

const WorkoutPlayer: React.FC<WorkoutStepperProps> = ({ isOpen, onClose, routineSteps, title, dayId, dayTitle, settings, nextRoutineType, onStartNextRoutine, onWorkoutComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [timer, setTimer] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mode, setMode] = useState<'exercise' | 'rest' | 'warmup' | 'hiit_work' | 'hiit_rest'>('exercise');
  const [currentSide, setCurrentSide] = useState<'left' | 'right' | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showNextRoutinePrompt, setShowNextRoutinePrompt] = useState(false);
  
  const currentStep = useMemo(() => routineSteps[currentIndex], [routineSteps, currentIndex]);
  const isHiit = currentStep?.type === 'hiit';

  const warmupParts = useMemo(() => routineSteps.every(s => s.type === 'warmup') ? flattenWarmup(routineSteps) : [], [routineSteps]);
  const isWarmup = warmupParts.length > 0;
  const [warmupIndex, setWarmupIndex] = useState(0);
  
  const [hiitRound, setHiitRound] = useState(1);
  
  const handleOpenConfirmation = (type: 'exit' | 'skip') => {
      uxService.triggerFeedback('warning', settings);
      if(type === 'exit') setShowExitConfirm(true);
      if(type === 'skip') setShowSkipConfirm(true);
  };

  const handleCompleteWorkout = useCallback(() => {
    const isMainRoutine = routineSteps.some(s => s.type === 'exercise' || s.type === 'hiit');

    if (isWarmup && nextRoutineType && onStartNextRoutine) {
      uxService.triggerFeedback('success', settings);
      setIsPlaying(false);
      
      if (nextRoutineType === 'hiit') {
        // Automatically start the HIIT routine
        onStartNextRoutine('hiit');
      } else {
        // For other types like 'strength', show the prompt
        setShowNextRoutinePrompt(true);
      }

    } else {
      if (isMainRoutine) {
        uxService.triggerFeedback('victory', settings);
        onWorkoutComplete(dayId, dayTitle);
      } else {
        uxService.triggerFeedback('success', settings);
      }
      setIsPlaying(false);
      setIsCompleted(true);
    }
  }, [dayId, dayTitle, routineSteps, isWarmup, nextRoutineType, onStartNextRoutine, settings, onWorkoutComplete]);
  
    const goToWarmupStep = useCallback((index: number) => {
        if (index >= 0 && index < warmupParts.length) {
            const timeDuration = warmupParts[index].part.duration;
            setTimer(timeDuration);
            setDuration(timeDuration);
            setWarmupIndex(index);
            setMode('warmup');
            setIsPlaying(true);
        } else if (index >= warmupParts.length) {
            handleCompleteWorkout();
        }
    }, [warmupParts, handleCompleteWorkout]);

  const handleFinishSet = useCallback(() => {
      const isLastSet = currentSet >= (currentStep?.sets || 1);
      if (isLastSet) {
          uxService.triggerFeedback('heavy', settings);
      } else {
          uxService.triggerFeedback('light', settings);
      }
      const restTime = currentStep?.rest || 0;
      setTimer(restTime);
      setDuration(restTime);
      setMode('rest');
      setIsPlaying(true);
  }, [currentStep, currentSet, settings]);

  const startExercise = useCallback((step: WorkoutStep) => {
    setMode('exercise');
    setCurrentSide(null);
    if (isTimedExercise(step)) {
        const timeDuration = parseTimeFromReps(step.reps);
        setTimer(timeDuration);
        setDuration(timeDuration);
        setIsPlaying(false);
        if (isPerSideExercise(step)) {
            setCurrentSide('left');
        }
    } else {
        setTimer(0);
        setDuration(0);
        setIsPlaying(true);
    }
  }, []);
  
  const handleNext = useCallback(() => {
    if (currentIndex < routineSteps.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      handleCompleteWorkout();
    }
  }, [currentIndex, routineSteps.length, handleCompleteWorkout]);

  const advanceAfterRest = useCallback(() => {
    if (mode === 'rest' && isWarmup) {
        goToWarmupStep(warmupIndex + 1);
    } else if (mode === 'hiit_rest' && isHiit) {
        if (hiitRound < (currentStep?.rounds || 1)) {
            setHiitRound(r => r + 1);
            setMode('hiit_work');
            const workTime = currentStep?.workTime || 0;
            setTimer(workTime);
            setDuration(workTime);
            setIsPlaying(true);
        } else {
            handleCompleteWorkout();
        }
    } else if (mode === 'rest' && !isWarmup && !isHiit && currentStep) {
         if (currentSet < (currentStep.sets || 1)) {
            setCurrentSet(s => s + 1);
            startExercise(currentStep);
         } else {
            setMode('exercise');
            handleNext();
         }
    }
  }, [mode, isWarmup, warmupIndex, isHiit, currentStep, hiitRound, currentSet, handleNext, startExercise, goToWarmupStep, handleCompleteWorkout]);

  useEffect(() => {
    if (isOpen) {
      const firstStep = routineSteps[0];
      setCurrentIndex(0);
      setCurrentSet(1);
      setWarmupIndex(0);
      setHiitRound(1);
      setIsPlaying(true);
      setIsCompleted(false);
      setShowNextRoutinePrompt(false);
      
      if (firstStep?.type === 'warmup') {
        setMode('warmup');
        const timeDuration = flattenWarmup([firstStep])[0]?.part.duration || 0;
        setTimer(timeDuration);
        setDuration(timeDuration);
      } else if (firstStep?.type === 'hiit') {
        setMode('hiit_work');
        const timeDuration = firstStep.workTime || 0;
        setTimer(timeDuration);
        setDuration(timeDuration);
      } else if (firstStep) {
        startExercise(firstStep);
      }
    }
  }, [isOpen, routineSteps, startExercise]);
  
  useEffect(() => {
    if (!isOpen || !isPlaying || timer <= 0) return;
    
    if (timer <= 3 && timer >= 1) {
        uxService.triggerFeedback('countdown', settings);
    }

    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, timer, settings]);
  
  useEffect(() => {
      if (timer === 0 && isPlaying && isOpen) {
          uxService.triggerFeedback('success', settings);
          const currentWarmupItem = warmupParts[warmupIndex];
          if (mode === 'warmup' && currentWarmupItem) {
              const transitionTime = currentWarmupItem.part.transition || 3;
              setTimer(transitionTime);
              setDuration(transitionTime);
              setMode('rest');
          } else if (mode === 'hiit_work' && isHiit) {
              setMode('hiit_rest');
              const restTime = currentStep?.restTime || 0;
              setTimer(restTime);
              setDuration(restTime);
          } else if (mode === 'exercise' && isTimedExercise(currentStep)) {
              if (isPerSideExercise(currentStep) && currentSide === 'left') {
                  setCurrentSide('right');
                  const timeDuration = parseTimeFromReps(currentStep.reps);
                  setTimer(timeDuration);
                  setDuration(timeDuration);
                  setIsPlaying(false);
              } else {
                  handleFinishSet();
              }
          } else if (mode === 'rest' || mode === 'hiit_rest') {
              advanceAfterRest();
          }
      }
  }, [timer, isPlaying, isOpen, mode, warmupIndex, warmupParts, isHiit, currentStep, advanceAfterRest, currentSide, handleFinishSet, settings]);

  useEffect(() => {
    if (isOpen && currentStep && currentStep.type === 'exercise') {
      startExercise(currentStep);
      setCurrentSet(1);
    }
  }, [currentIndex, isOpen, currentStep, startExercise]); 
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };
  
    const handleNextWarmup = () => {
        goToWarmupStep(warmupIndex + 1);
    };

    const handlePrevWarmup = () => {
        goToWarmupStep(warmupIndex - 1);
    };

  const skipRest = () => advanceAfterRest();

  if (!isOpen) return null;
  
  const ProgressBar = () => {
    let progress = 0;
    const isStrength = !isWarmup && !isHiit && routineSteps.some(s => s.type === 'exercise');

    if (isWarmup) {
        // Progress advances after a warmup step is completed.
        progress = warmupParts.length > 0 ? (warmupIndex / warmupParts.length) * 100 : 0;
    } else if (isStrength) {
        // Progress advances after each set is completed for more granular feedback.
        const totalSets = routineSteps.reduce((acc, step) => acc + (step.sets || 0), 0);
        
        if (totalSets > 0) {
            const setsFromPreviousExercises = routineSteps
                .slice(0, currentIndex)
                .reduce((acc, step) => acc + (step.sets || 0), 0);
            
            // We are on `currentSet`, so `currentSet - 1` sets are completed for the current exercise.
            const completedInCurrent = currentSet - 1;
            
            const totalCompleted = setsFromPreviousExercises + completedInCurrent;

            progress = (totalCompleted / totalSets) * 100;
        }
    } else {
        return null; // Don't show for HIIT or other routine types
    }

    return (
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
            <div 
                className="bg-brand-purple h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
  };


  const renderContent = () => {
    if (showNextRoutinePrompt) {
        return (
            <div className="text-center animate-fade-in">
                <div className="mx-auto bg-green-500/20 text-green-400 rounded-full w-24 h-24 flex items-center justify-center">
                    <FireIcon size={48} />
                </div>
                <h3 className="text-4xl font-bold text-white mt-6">¡Calentamiento Completo!</h3>
                <p className="text-brand-muted mt-2">¿Listo para empezar la rutina principal?</p>
                <button 
                    onClick={() => onStartNextRoutine?.(nextRoutineType!)} 
                    className="mt-8 bg-brand-purple text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 w-full max-w-sm"
                >
                    {nextRoutineType === 'strength' ? <DumbbellIcon/> : <FireIcon/>}
                    Iniciar Rutina de {nextRoutineType === 'strength' ? 'Fuerza' : 'HIIT'}
                </button>
                <button onClick={onClose} className="mt-4 text-brand-muted hover:text-white transition-colors">
                    Finalizar por ahora
                </button>
            </div>
        );
    }
    
    if (isCompleted) {
        return (
            <div className="text-center animate-fade-in">
                <div className="mx-auto bg-green-500/20 text-green-400 rounded-full w-24 h-24 flex items-center justify-center">
                    <DumbbellIcon size={48} />
                </div>
                <h3 className="text-4xl font-bold text-white mt-6">¡Rutina Completada!</h3>
                <p className="text-brand-muted mt-2">¡Gran trabajo! Tu sesión ha sido registrada.</p>
                <button onClick={onClose} className="mt-8 bg-brand-purple text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors">
                    Finalizar
                </button>
            </div>
        );
    }
    
    if (!currentStep) return null;

    if (isWarmup) {
        const currentItem = warmupParts[warmupIndex];
        if (!currentItem) return null;
        const displayName = currentItem.parentName !== currentItem.part.name ? `${currentItem.parentName}: ${currentItem.part.name}` : currentItem.parentName;
        const findNextExerciseName = () => {
            if (warmupIndex >= warmupParts.length - 1) return 'Finalizar';
            const currentParent = warmupParts[warmupIndex].parentName;
            const nextDifferentParentItem = warmupParts.find((item, index) => index > warmupIndex && item.parentName !== currentParent);
            return nextDifferentParentItem ? nextDifferentParentItem.parentName : 'Finalizar';
        };
        const nextExerciseName = findNextExerciseName();
        const timerColor = mode === 'rest' ? 'text-yellow-400' : 'text-brand-purple';

        return (
            <>
                <div className="absolute top-20 right-4 sm:right-8">
                    <button onClick={() => handleOpenConfirmation('skip')} className="text-brand-muted hover:text-white transition-colors flex items-center gap-2" aria-label="Saltar Calentamiento">Saltar <SkipIcon /></button>
                </div>
                <div className="text-center">
                    <p className="text-brand-muted">{mode === 'rest' ? "PREPÁRATE" : `Paso ${warmupIndex + 1} / ${warmupParts.length}`}</p>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4 h-20">{displayName}</h3>
                    <p className="text-brand-muted h-12">{mode === 'warmup' && currentItem.part.cue}</p>
                </div>
                <div className="my-8">
                    <CircularTimer duration={duration} currentTime={timer} color={timerColor} size={250} />
                </div>
                <div className="text-center"><p className="text-brand-muted">Siguiente: {nextExerciseName}</p></div>
            </>
        );
    }
    
    if (isHiit) {
        const timerColor = mode === 'hiit_work' ? 'text-red-500' : 'text-green-400';
        return (
            <div className="w-full h-full flex flex-col items-center justify-between text-center">
                <div><p className="text-xl font-bold text-brand-purple">RONDA {hiitRound} / {currentStep.rounds}</p><h3 className={`text-4xl font-bold mt-2 ${timerColor}`}>{mode === 'hiit_work' ? '¡A POR ELLO!' : 'RECUPERA'}</h3></div>
                <CircularTimer duration={duration} currentTime={timer} color={timerColor} size={250} />
                <div className="bg-brand-light p-4 rounded-lg w-full max-w-md">
                   <h4 className="font-semibold text-gray-300 mb-2 text-lg">Ejercicios del complejo:</h4>
                    <ul className="text-gray-300 space-y-2 text-2xl">{currentStep.exercises?.map((ex, i) => (<li key={i}>{ex}</li>))}</ul>
                </div>
            </div>
        );
    }

    if (mode === 'exercise') {
        if (isTimedExercise(currentStep)) {
            const showStartButton = !isPlaying && timer > 0;

            return (
                 <div className="w-full h-full flex flex-col items-center justify-around text-center">
                    <div>
                        <p className="text-lg text-brand-muted">{`Ejercicio ${currentIndex + 1} / ${routineSteps.length}`}</p>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mt-2 max-w-lg">{currentStep.name}</h3>
                        {isPerSideExercise(currentStep) && (<p className="text-2xl text-brand-purple mt-2 font-semibold">{currentSide === 'left' ? 'Lado Izquierdo' : 'Lado Derecho'}</p>)}
                    </div>
                    
                    <div className="flex flex-col items-center gap-6">
                        {showStartButton ? (
                            <div className="flex flex-col items-center">
                                 <CircularTimer duration={duration} currentTime={timer} size={250} />
                                 <button onClick={() => setIsPlaying(true)} className="mt-6 bg-brand-purple text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-purple-700 transition-colors">Iniciar</button>
                            </div>
                        ) : (
                            <CircularTimer duration={duration} currentTime={timer} size={250} />
                        )}
                        <SetProgressIndicator total={currentStep.sets || 0} current={currentSet} />
                    </div>
                </div>
            );
        }
        return (
            <div className="w-full h-full flex flex-col items-center justify-around text-center">
                <div>
                    <p className="text-lg text-brand-muted">{`Ejercicio ${currentIndex + 1} / ${routineSteps.length}`}</p>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mt-2 max-w-lg">{currentStep.name}</h3>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-8xl md:text-9xl font-bold text-white" style={{lineHeight: 1}}>{currentSet}</p>
                    <p className="text-xl text-brand-muted -mt-1 mb-4">Set</p>
                    <SetProgressIndicator total={currentStep.sets || 0} current={currentSet} />
                    <p className="text-2xl text-white mt-6">{currentStep.reps} reps</p>
                </div>
                <button onClick={handleFinishSet} className="w-full max-w-sm bg-brand-purple text-white font-bold py-4 px-6 rounded-lg text-xl hover:bg-purple-700 transition-colors">Serie Completada</button>
            </div>
        );
    }
    
    if (mode === 'rest') {
        const nextSetText = currentSet < (currentStep.sets || 1) ? `Serie ${currentSet + 1} de ${currentStep.name}` : `Siguiente Ejercicio: ${routineSteps[currentIndex + 1]?.name || 'Finalizar'}`;
        return (
             <div className="w-full h-full flex flex-col items-center justify-between text-center">
                <div><h3 className="text-4xl font-bold text-yellow-400">DESCANSO</h3><p className="text-brand-muted mt-2">Siguiente: {nextSetText}</p></div>
                 <CircularTimer duration={duration} currentTime={timer} color="text-yellow-400" size={250}/>
                 <button onClick={skipRest} className="w-full max-w-sm bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors">Saltar Descanso</button>
             </div>
        );
    }

    return null;
  };

  return (
    <div className={`fixed inset-0 bg-black z-50 flex flex-col p-4 sm:p-8 justify-between transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {!isCompleted && !showNextRoutinePrompt && (
          <header className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button onClick={() => handleOpenConfirmation('exit')} className="text-gray-400 hover:text-white"><CloseIcon size={28} /></button>
          </header>
      )}
      
      {!isCompleted && !showNextRoutinePrompt && <ProgressBar />}

      <main className="flex flex-col items-center justify-center text-center flex-grow py-8 relative">
        {renderContent()}
      </main>
      
      <footer className="flex items-center justify-center gap-6">
        {!isCompleted && !showNextRoutinePrompt && (
            <>
                {isWarmup ? (
                    <>
                        <button onClick={handlePrevWarmup} className="text-gray-400 hover:text-white disabled:opacity-30" disabled={warmupIndex === 0}><PrevIcon /></button>
                        <button onClick={() => setIsPlaying(!isPlaying)} className="bg-brand-purple text-white rounded-full p-5 shadow-lg">
                            {isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
                        </button>
                        <button onClick={handleNextWarmup} className="text-gray-400 hover:text-white"><NextIcon /></button>
                    </>
                ) : isHiit ? (
                    <button onClick={() => setIsPlaying(!isPlaying)} className="bg-brand-purple text-white rounded-full p-5 shadow-lg">
                        {isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
                    </button>
                ) : ( // Strength
                    <>
                        <button onClick={handlePrev} className="text-gray-400 hover:text-white disabled:opacity-30" disabled={currentIndex === 0}><PrevIcon /></button>
                        <button onClick={() => setIsPlaying(!isPlaying)} className="bg-brand-purple text-white rounded-full p-5 shadow-lg">
                            {isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
                        </button>
                        <button onClick={handleNext} className="text-gray-400 hover:text-white"><NextIcon /></button>
                    </>
                )}
            </>
        )}
      </footer>


      <ConfirmationModal isOpen={showExitConfirm} onClose={() => setShowExitConfirm(false)} onConfirm={() => { setShowExitConfirm(false); onClose(); }} title="Salir del Entrenamiento" message="¿Estás seguro de que quieres salir? Tu progreso en esta sesión no se guardará." confirmText="Sí, Salir" cancelText="No, Continuar" settings={settings} />
      <ConfirmationModal isOpen={showSkipConfirm} onClose={() => setShowSkipConfirm(false)} onConfirm={() => { setShowSkipConfirm(false); handleCompleteWorkout(); }} title="Saltar Calentamiento" message="¿Estás seguro de que quieres saltar el calentamiento? Se marcará como completado." confirmText="Sí, Saltar" cancelText="No, Continuar" settings={settings} />
    </div>
  );
};

export default WorkoutPlayer;
