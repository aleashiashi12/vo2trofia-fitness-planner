
import React, { useState, useEffect } from 'react';
import { DayPlan, WorkoutStep, DayId } from '../types';
import ExerciseCard from './ExerciseCard';
import HiitCard from './HiitCard';
import ActivityCard from './ActivityCard';
import CooldownCard from './CooldownCard';
import { FireIcon, WalkIcon, DumbbellIcon, PencilIcon, TrashIcon, PlusIcon, CloseIcon, PushIcon, PullIcon, LegsIcon, CoreIcon, FullBodyIcon } from './icons/Icons';
import ConfirmationModal from './ConfirmationModal';
import { initialData } from '../services/initialData';


interface WorkoutDetailProps {
  dayPlan: DayPlan;
  dayId: DayId;
  onStartRoutine: (routineType: 'warmup' | 'strength' | 'hiit') => void;
  onShowInfo: (step: WorkoutStep) => void;
  onStartEdit: (step: Partial<WorkoutStep>) => void;
  onDeleteExercise: (exerciseId: string) => void;
  onUpdateSteps: (newSteps: WorkoutStep[]) => void;
  onDeleteDay: (dayId: DayId) => void;
}

const WorkoutDetail: React.FC<WorkoutDetailProps> = ({ 
  dayPlan, 
  dayId, 
  onStartRoutine, 
  onShowInfo, 
  onStartEdit, 
  onDeleteExercise, 
  onUpdateSteps, 
  onDeleteDay,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedSteps, setEditedSteps] = useState<WorkoutStep[]>([]);
  const [exerciseToDelete, setExerciseToDelete] = useState<string | null>(null);

  const isInitialDay = Object.keys(initialData.days).includes(dayId);

  useEffect(() => {
    setEditedSteps(dayPlan.steps);
  }, [dayPlan.steps]);

  const hasStrengthExercises = editedSteps.some(s => s.type === 'exercise');

  const handleToggleEditMode = () => {
    if (isEditMode) {
      // If changes were made, save them.
      if (JSON.stringify(editedSteps) !== JSON.stringify(dayPlan.steps)) {
        onUpdateSteps(editedSteps);
      }
    }
    setIsEditMode(!isEditMode);
  };

  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...editedSteps];
    const step = newSteps[index];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newSteps.length) {
      newSteps.splice(index, 1);
      newSteps.splice(newIndex, 0, step);
      setEditedSteps(newSteps);
    }
  };

  const confirmDeleteExercise = () => {
      if(exerciseToDelete) {
          onDeleteExercise(exerciseToDelete);
          setExerciseToDelete(null);
      }
  }

  const handleAddExercise = () => {
    onStartEdit({
        type: 'exercise',
        name: '',
        sets: 3,
        reps: '8-12',
        rest: 60,
        technique: '',
        progression: '',
    });
  }

  const stepsToRender = isEditMode ? editedSteps : dayPlan.steps;

  return (
    <div className="bg-brand-dark p-4 sm:p-6 rounded-2xl border border-gray-800 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{dayPlan.title}</h2>
            <p className="text-brand-muted mb-6">{dayPlan.dayName}</p>
        </div>
        <div className="flex gap-2">
            <button
                onClick={handleToggleEditMode}
                className={`p-2 rounded-full transition-colors ${isEditMode ? 'bg-brand-purple text-white' : 'bg-brand-light text-brand-muted hover:bg-gray-800'}`}
                aria-label={isEditMode ? "Finish Editing" : "Edit Routine"}
            >
                {isEditMode ? <CloseIcon /> : <PencilIcon />}
            </button>
            {!isInitialDay && (
                <button
                    onClick={() => onDeleteDay(dayId)}
                    className="p-2 rounded-full bg-brand-light text-brand-muted hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    aria-label="Delete Routine"
                >
                    <TrashIcon />
                </button>
            )}
        </div>
      </div>


      {!isEditMode && (
          <div className="space-y-4 mb-6">
            {dayPlan.warmUpType && (
                <button
                    onClick={() => onStartRoutine('warmup')}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                    <FireIcon />
                    Iniciar Calentamiento ({dayPlan.warmUpType})
                </button>
            )}
            {hasStrengthExercises && (
                <button
                    onClick={() => onStartRoutine('strength')}
                    className="w-full bg-brand-purple text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                    <DumbbellIcon />
                    Iniciar Rutina de Fuerza
                </button>
            )}
          </div>
      )}
      
      <div className="space-y-4">
        {stepsToRender.map((step, index) => {
          const animationStyle = {
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both',
          } as React.CSSProperties;
          
          const cardProps = {
            style: animationStyle,
            className: 'animate-stagger-in',
          };

          switch (step.type) {
            case 'exercise':
              return (
                <ExerciseCard 
                    key={step.id || index} 
                    step={step} 
                    onShowInfo={() => onShowInfo(step)} 
                    onStartEdit={() => onStartEdit(step)}
                    isEditMode={isEditMode}
                    onDelete={() => setExerciseToDelete(step.id)}
                    onMoveUp={() => handleMoveStep(index, 'up')}
                    onMoveDown={() => handleMoveStep(index, 'down')}
                    isFirst={index === 0}
                    isLast={index === stepsToRender.filter(s => s.type === 'exercise').length -1}
                    {...cardProps}
                />
              );
            case 'hiit':
              return <HiitCard key={step.id || index} step={step} onStart={() => onStartRoutine('hiit')} {...cardProps} />;
            case 'activity':
              return <ActivityCard key={step.id || index} step={step} {...cardProps} />;
            case 'cooldown':
              return <CooldownCard key={step.id || index} step={step} {...cardProps} />;
            default:
              return null;
          }
        })}

        {isEditMode && (
            <button 
                onClick={handleAddExercise}
                className="w-full border-2 border-dashed border-gray-600 text-brand-muted rounded-lg py-4 flex items-center justify-center gap-2 hover:border-brand-purple hover:text-brand-purple transition-colors"
            >
                <PlusIcon />
                Añadir Ejercicio
            </button>
        )}
      </div>

      {!isEditMode && dayPlan.final && (
        <div className="mt-6 pt-4 border-t border-gray-800">
             <div className="bg-brand-light p-4 rounded-lg flex items-center gap-4">
                <div className="bg-indigo-500/20 text-indigo-400 p-2 rounded-full">
                   <WalkIcon />
                </div>
                <div>
                    <h3 className="font-bold text-white">{dayPlan.final.name}</h3>
                    <p className="text-brand-muted text-sm">{dayPlan.final.details}</p>
                </div>
            </div>
        </div>
      )}
      
      <ConfirmationModal
        isOpen={!!exerciseToDelete}
        onClose={() => setExerciseToDelete(null)}
        onConfirm={confirmDeleteExercise}
        title="Delete Exercise"
        message="Are you sure you want to delete this exercise from the routine?"
        confirmText="Yes, Delete"
      />
    </div>
  );
};

const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
  @keyframes stagger-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-stagger-in {
    animation: stagger-in 0.4s ease-out;
    opacity: 0; 
  }
`;
document.head.appendChild(style);


export default WorkoutDetail;
