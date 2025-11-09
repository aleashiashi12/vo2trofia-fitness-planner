import React, { useState, useEffect } from 'react';
import { WorkoutStep } from '../types';
import Modal from './Modal';
import ConfirmationModal from './ConfirmationModal';
import * as workoutService from '../services/workoutService';

interface EditExerciseModalProps {
  step: Partial<WorkoutStep>;
  onClose: () => void;
  onSave: (stepData: WorkoutStep) => void;
}

const EditExerciseModal: React.FC<EditExerciseModalProps> = ({ step, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [rest, setRest] = useState('');
  const [technique, setTechnique] = useState('');
  const [progression, setProgression] = useState('');

  const [confirmAction, setConfirmAction] = useState<'save' | 'reset' | null>(null);
  const [initialExercise, setInitialExercise] = useState<WorkoutStep | null>(null);
  
  const isNewExercise = !step.id;

  useEffect(() => {
    setName(step.name || '');
    setSets(step.sets?.toString() || '3');
    setReps(step.reps || '8-12');
    setRest(step.rest?.toString() || '60');
    setTechnique(step.technique || '');
    setProgression(step.progression || '');
  }, [step]);

  useEffect(() => {
    if (step.name && !isNewExercise) {
      workoutService.getInitialExerciseByName(step.name).then(setInitialExercise);
    } else {
        setInitialExercise(null);
    }
  }, [step.name, isNewExercise]);

  const handleSaveClick = () => {
    const updatedSets = parseInt(sets, 10);
    const updatedRest = parseInt(rest, 10);

    if (name && !isNaN(updatedSets) && !isNaN(updatedRest)) {
        setConfirmAction('save');
    } else {
        console.error("Invalid input for sets, rest or name.");
        // Optionally, show a user-facing error message here
    }
  };

  const handleResetClick = () => {
      setConfirmAction('reset');
  };

  const performSave = () => {
    const stepData: WorkoutStep = {
        ...step,
        id: step.id || '',
        type: 'exercise',
        name,
        sets: parseInt(sets, 10),
        reps,
        rest: parseInt(rest, 10),
        technique,
        progression,
    };
    onSave(stepData);
  };

  const performReset = () => {
      if (!initialExercise) return;
      const resetData: WorkoutStep = {
          ...initialExercise,
          id: step.id!, // Keep the current ID
      };
      onSave(resetData);
  };

  const handleConfirm = () => {
      if (confirmAction === 'save') {
          performSave();
      } else if (confirmAction === 'reset') {
          performReset();
      }
      setConfirmAction(null);
  };

  const title = isNewExercise ? "Create Exercise" : `Edit: ${step.name}`;

  return (
    <>
      <Modal isOpen={true} onClose={onClose} title={title}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brand-muted mb-1">Name</label>
            <input
              type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-brand-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-brand-purple focus:border-brand-purple"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="sets" className="block text-sm font-medium text-brand-muted mb-1">Sets</label>
                <input
                  type="number" id="sets" value={sets} onChange={(e) => setSets(e.target.value)}
                  className="w-full bg-brand-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-brand-purple focus:border-brand-purple"
                />
              </div>
              <div>
                <label htmlFor="reps" className="block text-sm font-medium text-brand-muted mb-1">Reps</label>
                <input
                  type="text" id="reps" value={reps} onChange={(e) => setReps(e.target.value)}
                  className="w-full bg-brand-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-brand-purple focus:border-brand-purple"
                />
              </div>
              <div>
                <label htmlFor="rest" className="block text-sm font-medium text-brand-muted mb-1">Rest (s)</label>
                <input
                  type="number" id="rest" value={rest} onChange={(e) => setRest(e.target.value)}
                  className="w-full bg-brand-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-brand-purple focus:border-brand-purple"
                />
              </div>
          </div>
          <div>
            <label htmlFor="technique" className="block text-sm font-medium text-brand-muted mb-1">Technique</label>
            <textarea
              id="technique" value={technique} onChange={(e) => setTechnique(e.target.value)}
              rows={4}
              className="w-full bg-brand-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-brand-purple focus:border-brand-purple"
            />
          </div>
          <div>
            <label htmlFor="progression" className="block text-sm font-medium text-brand-muted mb-1">Progression</label>
            <textarea
              id="progression" value={progression} onChange={(e) => setProgression(e.target.value)}
              rows={2}
              className="w-full bg-brand-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-brand-purple focus:border-brand-purple"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
            <div>
              {initialExercise && (
                  <button
                      onClick={handleResetClick}
                      className="px-4 py-2 rounded-md text-sm font-semibold text-yellow-300 border border-yellow-600 hover:bg-yellow-600/20 transition-colors"
                  >
                      Reset to Default
                  </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md text-sm font-semibold bg-brand-light text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 rounded-md text-sm font-semibold bg-brand-purple text-white hover:bg-purple-700 transition-colors"
              >
                {isNewExercise ? 'Create Exercise' : 'Save Changes'}
              </button>
            </div>
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleConfirm}
        title={confirmAction === 'save' ? "Confirm Save" : "Confirm Reset"}
        message={confirmAction === 'save' ? "Are you sure you want to save these changes?" : "Are you sure you want to reset this exercise to its factory settings? This cannot be undone."}
        confirmText={confirmAction === 'save' ? "Yes, Save" : "Yes, Reset"}
        confirmButtonClass={confirmAction === 'save' 
            ? 'bg-brand-purple text-white hover:bg-purple-700' 
            : 'bg-yellow-600 text-white hover:bg-yellow-700'}
      />
    </>
  );
};

export default EditExerciseModal;
