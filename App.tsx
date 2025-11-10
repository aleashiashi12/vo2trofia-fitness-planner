
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DayId, DayPlan, WorkoutStep, AppSettings, DayInfo, ActivityLogEntry } from './types';
import * as workoutService from './services/workoutService';
import * as uxService from './services/uxService';
import DaySelector from './components/DaySelector';
import WorkoutDetail from './components/WorkoutDetail';
import EditExerciseModal from './components/EditExerciseModal';
import WorkoutPlayer from './components/WorkoutPlayer';
import InfoModal from './components/InfoModal';
import ProgressView from './components/ProgressView';
import SettingsView from './components/SettingsView';
import { CalendarIcon, ChartIcon, PlusIcon, CogIcon } from './components/icons/Icons';
import CreateDayModal from './components/CreateDayModal';
import ConfirmationModal from './components/ConfirmationModal';

type StepperState = {
  isOpen: boolean;
  steps: WorkoutStep[];
  title: string;
  nextRoutineType?: 'strength' | 'hiit' | null;
};

type View = 'planner' | 'progress' | 'settings';

const getCurrentDayId = (): DayId => {
  const dayIndex = new Date().getDay(); // 0 for Sunday, 1 for Monday...
  const dayMap: DayId[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  return dayMap[dayIndex];
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [days, setDays] = useState<DayInfo[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayId>(getCurrentDayId());
  const [currentDayPlan, setCurrentDayPlan] = useState<DayPlan | null>(null);
  const [view, setView] = useState<View>('planner');
  const [isCreateDayModalOpen, setIsCreateDayModalOpen] = useState(false);
  const [dayToDelete, setDayToDelete] = useState<DayId | null>(null);
  const [appSettings, setAppSettings] = useState<AppSettings>(workoutService.getAppSettings());
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);

  const [stepperState, setStepperState] = useState<StepperState>({
    isOpen: false,
    steps: [],
    title: '',
    nextRoutineType: null,
  });

  const [editingStep, setEditingStep] = useState<Partial<WorkoutStep> | null>(null);
  const [infoStep, setInfoStep] = useState<WorkoutStep | null>(null);
  
  const refreshDaysList = useCallback(async () => {
      const daysList = await workoutService.getDaysForSelector();
      setDays(daysList);
      return daysList;
  }, []);

  const refreshLog = useCallback(async () => {
    const log = await workoutService.getActivityLog();
    setActivityLog(log);
  }, []);

  const fetchDayPlan = useCallback(async (dayId: DayId) => {
    const plan = await workoutService.getDayPlan(dayId);
    setCurrentDayPlan(plan);
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      await workoutService.init();
      const settings = workoutService.getAppSettings();
      setAppSettings(settings);
      uxService.init(); // Initialize UX services like audio context
      await refreshDaysList();
      await fetchDayPlan(selectedDay);
      await refreshLog();
      setIsLoading(false);
    };
    initializeApp();
  }, [fetchDayPlan, selectedDay, refreshDaysList, refreshLog]);

  const handleSelectDay = (dayId: DayId) => {
    setSelectedDay(dayId);
    fetchDayPlan(dayId);
  };
  
  const handleCreateDay = async (title: string) => {
    const newDayInfo = await workoutService.createDayPlan(title);
    setIsCreateDayModalOpen(false);
    await refreshDaysList();
    handleSelectDay(newDayInfo.dayId);
  };

  const handleDeleteDay = async () => {
    if (!dayToDelete) return;
    await workoutService.deleteDayPlan(dayToDelete);
    const updatedDays = await refreshDaysList();
    setDayToDelete(null);
    if (selectedDay === dayToDelete) {
        handleSelectDay(updatedDays[0]?.dayId || 'lunes');
    }
  };

  const handleStartRoutine = (routineType: 'warmup' | 'strength' | 'hiit') => {
    if (!currentDayPlan) return;
    
    let steps: WorkoutStep[] = [];
    let title = '';
    let nextRoutineType: 'strength' | 'hiit' | null = null;

    if (routineType === 'warmup' && currentDayPlan.warmUpType) {
        steps = workoutService.getWarmUp(currentDayPlan.warmUpType);
        title = `${currentDayPlan.warmUpType.charAt(0).toUpperCase() + currentDayPlan.warmUpType.slice(1)} Warm-up`;
        
        if (currentDayPlan.steps.some(s => s.type === 'exercise')) {
            nextRoutineType = 'strength';
        } else if (currentDayPlan.steps.some(s => s.type === 'hiit')) {
            nextRoutineType = 'hiit';
        }

    } else if (routineType === 'strength') {
        steps = currentDayPlan.steps.filter(s => s.type === 'exercise');
        title = "Strength Routine";
    } else if (routineType === 'hiit') {
        const hiitStep = currentDayPlan.steps.find(s => s.type === 'hiit');
        if (hiitStep) {
            steps = [hiitStep];
            title = hiitStep.name;
        }
    }

    if (steps.length > 0) {
      setStepperState({ isOpen: true, steps, title, nextRoutineType });
    }
  };
  
  const handleAddOrUpdateExercise = async (stepData: WorkoutStep) => {
      if (!currentDayPlan) return;
      if (stepData.id) {
          await workoutService.updateWorkoutStep(selectedDay, stepData.id, stepData);
      } else {
          await workoutService.addExerciseToDay(selectedDay, stepData);
      }
      await fetchDayPlan(selectedDay);
      setEditingStep(null);
  };

  const handleDeleteExercise = async (exerciseId: string) => {
      if (!currentDayPlan) return;
      await workoutService.deleteExerciseFromDay(selectedDay, exerciseId);
      await fetchDayPlan(selectedDay);
  };
  
  const handleUpdateStepsOrder = async (newSteps: WorkoutStep[]) => {
      await workoutService.updateDayPlanSteps(selectedDay, newSteps);
      await fetchDayPlan(selectedDay);
  };

  const handleSettingsChange = (newSettings: AppSettings) => {
    workoutService.saveAppSettings(newSettings);
    setAppSettings(newSettings);
  };

  const handleResetAllExercises = async () => {
    await workoutService.resetAllExercisesToDefault();
    // After resetting, fetch the current day's plan again to reflect the changes
    await fetchDayPlan(selectedDay);
  };

  const closeStepper = () => {
    setStepperState({ isOpen: false, steps: [], title: '', nextRoutineType: null });
  };

  const handleWorkoutComplete = async (dayId: DayId, title: string) => {
      await workoutService.logExerciseCompletion(dayId, title);
      await refreshLog();
  };

  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-2xl text-brand-purple animate-pulse">Loading Your Plan...</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center text-center mb-8">
            <div className="w-12"></div> {/* Spacer */}
            <div>
                <h1 className="text-4xl md:text-5xl font-bold text-brand-purple tracking-wider">
                    VO2trofia
                </h1>
                <p className="text-brand-muted mt-2">Your Weekly Fitness Planner</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsCreateDayModalOpen(true)}
                    className="w-12 h-12 flex items-center justify-center bg-brand-light rounded-full text-brand-purple hover:bg-gray-800 transition-colors"
                    aria-label="Create new routine"
                >
                    <PlusIcon size={28}/>
                </button>
            </div>
        </header>


        <nav className="flex justify-center border-b border-gray-800 mb-8">
            <button
                onClick={() => setView('planner')}
                className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors ${view === 'planner' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-brand-muted hover:text-white'}`}
            >
                <CalendarIcon size={20}/> Planner
            </button>
            <button
                onClick={() => setView('progress')}
                className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors ${view === 'progress' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-brand-muted hover:text-white'}`}
            >
                <ChartIcon size={20}/> Progress
            </button>
             <button
                onClick={() => setView('settings')}
                className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors ${view === 'settings' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-brand-muted hover:text-white'}`}
            >
                <CogIcon size={20}/> Settings
            </button>
        </nav>

        {view === 'planner' && currentDayPlan && (
          <>
            <DaySelector
              days={days}
              selectedDay={selectedDay}
              onSelectDay={handleSelectDay}
            />
            <main className="mt-8">
              <WorkoutDetail
                key={selectedDay}
                dayPlan={currentDayPlan}
                dayId={selectedDay}
                onStartRoutine={handleStartRoutine}
                onStartEdit={(step) => setEditingStep(step)}
                onShowInfo={(step) => setInfoStep(step)}
                onDeleteExercise={handleDeleteExercise}
                onUpdateSteps={handleUpdateStepsOrder}
                onDeleteDay={(id) => setDayToDelete(id)}
              />
            </main>
          </>
        )}

        {view === 'progress' && <ProgressView log={activityLog} onLogChange={refreshLog} />}
        {view === 'settings' && <SettingsView settings={appSettings} onSettingsChange={handleSettingsChange} onResetAll={handleResetAllExercises} />}


      </div>

      <WorkoutPlayer
        isOpen={stepperState.isOpen}
        onClose={closeStepper}
        routineSteps={stepperState.steps}
        title={stepperState.title}
        dayId={selectedDay}
        dayTitle={currentDayPlan?.title || ''}
        nextRoutineType={stepperState.nextRoutineType}
        onStartNextRoutine={(routineType) => {
          closeStepper();
          setTimeout(() => handleStartRoutine(routineType), 200);
        }}
        onWorkoutComplete={handleWorkoutComplete}
        settings={appSettings}
      />
      
      <CreateDayModal
        isOpen={isCreateDayModalOpen}
        onClose={() => setIsCreateDayModalOpen(false)}
        onSave={handleCreateDay}
      />

      {editingStep && (
        <EditExerciseModal
            step={editingStep}
            onClose={() => setEditingStep(null)}
            onSave={handleAddOrUpdateExercise}
        />
      )}
      
      {infoStep && (
          <InfoModal
              step={infoStep}
              onClose={() => setInfoStep(null)}
          />
      )}

      {currentDayPlan && <ConfirmationModal
          isOpen={!!dayToDelete}
          onClose={() => setDayToDelete(null)}
          onConfirm={handleDeleteDay}
          title="Delete Routine"
          message={`Are you sure you want to permanently delete "${currentDayPlan.title}"? This action cannot be undone.`}
          confirmText="Yes, Delete"
          settings={appSettings}
      />}
    </div>
  );
};

export default App;
