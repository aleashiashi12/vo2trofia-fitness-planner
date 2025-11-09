
import React from 'react';
import { WorkoutStep } from '../types';
import { FireIcon } from './icons/Icons';

interface HiitCardProps {
  step: WorkoutStep;
  onStart: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const HiitCard: React.FC<HiitCardProps> = ({ step, onStart, className, style }) => {
  return (
    <div className={`bg-brand-light p-4 rounded-lg border border-red-500/30 ${className || ''}`} style={style}>
        <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-500/20 text-red-400 p-3 rounded-full">
                <FireIcon />
            </div>
            <div>
                <h3 className="font-bold text-white">{step.name}</h3>
                <p className="text-sm text-brand-muted">{step.rounds} rounds | {step.workTime / 60} min work | {step.restTime / 60} min rest</p>
            </div>
        </div>

      <div className="mb-4 pl-4 border-l-2 border-brand-purple">
        <h4 className="font-semibold text-gray-300 mb-2">Ejercicios por ronda:</h4>
        <ul className="list-disc list-inside text-brand-muted space-y-1">
          {step.exercises?.map((ex, i) => (
            <li key={i}>{ex}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
      >
        <FireIcon />
        Iniciar HIIT
      </button>
    </div>
  );
};

export default HiitCard;