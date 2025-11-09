
import React from 'react';
import { WorkoutStep } from '../types';
import { WalkIcon } from './icons/Icons';

interface ActivityCardProps {
  step: WorkoutStep;
  className?: string;
  style?: React.CSSProperties;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ step, className, style }) => {
  return (
    <div className={`bg-brand-light p-4 rounded-lg flex items-center gap-4 border border-indigo-500/30 ${className || ''}`} style={style}>
        <div className="bg-indigo-500/20 text-indigo-400 p-3 rounded-full">
            <WalkIcon />
        </div>
        <div>
            <h3 className="font-bold text-white">{step.name}</h3>
            <p className="text-brand-muted text-sm">{step.details}</p>
        </div>
    </div>
  );
};

export default ActivityCard;
