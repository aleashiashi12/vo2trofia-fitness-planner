
import React from 'react';
import { WorkoutStep } from '../types';
import { CooldownIcon } from './icons/Icons';

interface CooldownCardProps {
  step: WorkoutStep;
  className?: string;
  style?: React.CSSProperties;
}

const CooldownCard: React.FC<CooldownCardProps> = ({ step, className, style }) => {
  return (
    <div className={`bg-brand-light p-4 rounded-lg flex items-center gap-4 border border-blue-500/30 ${className || ''}`} style={style}>
        <div className="bg-blue-500/20 text-blue-400 p-3 rounded-full">
            <CooldownIcon />
        </div>
        <div>
            <h3 className="font-bold text-white">{step.name}</h3>
            <p className="text-brand-muted text-sm">{step.details}</p>
        </div>
    </div>
  );
};

export default CooldownCard;
