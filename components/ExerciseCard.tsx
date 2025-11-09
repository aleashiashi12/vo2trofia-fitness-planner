import React from 'react';
import { WorkoutStep } from '../types';
import { PencilIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon, InfoIcon } from './icons/Icons';
import { getIconForExercise, getIconColorForExercise } from '../services/imageService';

interface ExerciseCardProps {
  step: WorkoutStep;
  onShowInfo: () => void;
  onStartEdit: () => void;
  isEditMode?: boolean;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
    step, 
    onShowInfo, 
    onStartEdit,
    isEditMode = false,
    onDelete,
    onMoveUp,
    onMoveDown,
    isFirst,
    isLast,
    className,
    style,
}) => {
  const IconComponent = getIconForExercise(step.name);
  const iconColorClass = getIconColorForExercise(step.name);

  const handleContainerClick = () => {
    if (!isEditMode) {
      onShowInfo();
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStartEdit();
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };
  
  const handleMoveUpClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveUp?.();
  };

  const handleMoveDownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveDown?.();
  };

  return (
    <div 
      className={`bg-brand-light p-4 rounded-lg border border-gray-800 transition-all duration-200 ${!isEditMode && 'cursor-pointer hover:border-brand-purple'} ${className || ''}`}
      style={style}
      onClick={handleContainerClick}
      role="button"
      tabIndex={isEditMode ? -1 : 0}
      aria-label={`Info for ${step.name}`}
    >
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4 flex-grow">
          <div className={`${iconColorClass} p-3 rounded-full flex-shrink-0`}>
              <IconComponent />
          </div>
          <div className="flex-grow">
            <h3 className="font-bold text-white">{step.name}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-brand-muted mt-1">
              {step.sets && <span><span className="font-semibold text-gray-300">{step.sets}</span> sets</span>}
              {step.reps && <span><span className="font-semibold text-gray-300">{step.reps}</span> reps</span>}
              {step.rest && <span><span className="font-semibold text-gray-300">{step.rest}s</span> rest</span>}
            </div>
          </div>
        </div>
        
        {isEditMode ? (
            <div className="flex items-center gap-1 flex-shrink-0">
                 <div className="flex flex-col">
                    <button onClick={handleMoveUpClick} disabled={isFirst} className="text-brand-muted hover:text-white disabled:opacity-30 disabled:hover:text-brand-muted p-1"><ArrowUpIcon size={18}/></button>
                    <button onClick={handleMoveDownClick} disabled={isLast} className="text-brand-muted hover:text-white disabled:opacity-30 disabled:hover:text-brand-muted p-1"><ArrowDownIcon size={18}/></button>
                </div>
                <button onClick={handleEditClick} className="text-brand-muted hover:text-brand-purple p-2"><PencilIcon /></button>
                <button onClick={handleDeleteClick} className="text-brand-muted hover:text-red-500 p-2"><TrashIcon /></button>
            </div>
        ) : (
             <button 
                onClick={onShowInfo}
                className="text-brand-muted hover:text-brand-purple transition-colors p-1" 
                aria-label={`Info for ${step.name}`}
             >
                <InfoIcon />
            </button>
        )}
      </div>
    </div>
  );
};

export default ExerciseCard;