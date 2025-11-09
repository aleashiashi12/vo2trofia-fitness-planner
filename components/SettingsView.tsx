
import React, { useState } from 'react';
import { AppSettings } from '../types';
import ConfirmationModal from './ConfirmationModal';

interface SettingsViewProps {
  settings: AppSettings;
  onSettingsChange: (newSettings: AppSettings) => void;
  onResetAll: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onSettingsChange, onResetAll }) => {
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleToggle = (key: keyof AppSettings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  const handleConfirmReset = () => {
    onResetAll();
    setIsResetConfirmOpen(false);
  };

  return (
    <>
      <div className="bg-brand-dark p-4 sm:p-6 rounded-2xl border border-gray-800 animate-fade-in space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Settings</h2>
          <p className="text-brand-muted">Customize your workout experience.</p>
        </div>
        
        <div className="space-y-4">
          <div 
              className="flex justify-between items-center bg-brand-light p-4 rounded-lg cursor-pointer"
              onClick={() => handleToggle('soundEnabled')}
          >
            <div>
              <h3 className="font-semibold text-white">Enable Sounds</h3>
              <p className="text-sm text-brand-muted">Plays sounds for timers and completions.</p>
            </div>
            <div className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 ease-in-out ${settings.soundEnabled ? 'bg-brand-purple' : 'bg-gray-700'}`}>
              <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${settings.soundEnabled ? 'translate-x-6' : ''}`} />
            </div>
          </div>

          <div 
              className="flex justify-between items-center bg-brand-light p-4 rounded-lg cursor-pointer"
              onClick={() => handleToggle('vibrationEnabled')}
          >
            <div>
              <h3 className="font-semibold text-white">Enable Vibration</h3>
              <p className="text-sm text-brand-muted">Provides haptic feedback on key actions.</p>
            </div>
            <div className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 ease-in-out ${settings.vibrationEnabled ? 'bg-brand-purple' : 'bg-gray-700'}`}>
              <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${settings.vibrationEnabled ? 'translate-x-6' : ''}`} />
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-700">
            <h3 className="font-semibold text-lg text-red-400 mb-2">Danger Zone</h3>
            <div className="flex justify-between items-center bg-brand-light p-4 rounded-lg">
                <div>
                    <h4 className="font-semibold text-white">Reset All Exercises</h4>
                    <p className="text-sm text-brand-muted">Reverts all exercises in the original routines to their default settings. Custom routines will not be affected.</p>
                </div>
                <button 
                    onClick={() => setIsResetConfirmOpen(true)}
                    className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors whitespace-nowrap"
                >
                    Reset All
                </button>
            </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleConfirmReset}
        title="Confirm Reset All Exercises"
        message="Are you sure you want to reset all exercises to their factory settings? Any customizations you've made will be permanently lost. This will not affect your activity log."
        confirmText="Yes, Reset Everything"
        confirmButtonClass="bg-red-600 text-white hover:bg-red-700"
      />
    </>
  );
};

const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);


export default SettingsView;