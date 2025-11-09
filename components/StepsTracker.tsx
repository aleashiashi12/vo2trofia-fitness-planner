
import React from 'react';
import { WalkIcon, PencilIcon } from './icons/Icons';

interface StepsTrackerProps {
  goal: number;
  logged: number;
  onLogSteps: (steps: number) => void;
}

const StepsTracker: React.FC<StepsTrackerProps> = ({ goal, logged, onLogSteps }) => {
  const progressPercentage = goal > 0 ? Math.min((logged / goal) * 100, 100) : 0;
  
  const handleLogClick = () => {
    const input = prompt("¿Cuántos pasos has completado hoy?", logged.toString());
    if (input !== null) {
      const newSteps = parseInt(input, 10);
      if (!isNaN(newSteps) && newSteps >= 0) {
        onLogSteps(newSteps);
      } else {
        alert("Por favor, introduce un número válido.");
      }
    }
  };

  return (
    <div className="bg-brand-light p-4 rounded-lg border border-gray-800">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
            <div className="bg-green-500/20 text-green-400 p-2 rounded-full">
                <WalkIcon size={20}/>
            </div>
            <div>
                <h3 className="font-bold text-white">Meta de Pasos Diaria</h3>
                <p className="text-sm text-brand-muted">
                    {logged.toLocaleString('es-ES')} / {goal.toLocaleString('es-ES')} Pasos
                </p>
            </div>
        </div>
        <button 
            onClick={handleLogClick}
            className="flex items-center gap-1 text-sm text-brand-muted hover:text-brand-purple transition-colors"
        >
            <PencilIcon size={16}/> Registrar
        </button>
      </div>
      <div className="w-full bg-brand-dark rounded-full h-2.5">
        <div 
          className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StepsTracker;
