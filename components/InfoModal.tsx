import React, { useState, useEffect } from 'react';
import { WorkoutStep } from '../types';
import Modal from './Modal';

interface InfoModalProps {
  step: WorkoutStep;
  onClose: () => void;
}

type Tab = 'technique' | 'progression';

// Fix: Moved TabButton to be a standalone component to resolve type errors and follow best practices.
interface TabButtonProps {
  tab: Tab;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ tab, activeTab, setActiveTab, children }) => (
  <button
    onClick={() => setActiveTab(tab)}
    className={`px-4 py-2 font-semibold transition-colors rounded-t-md text-base focus:outline-none ${
      activeTab === tab
        ? 'bg-brand-light text-brand-purple border-b-2 border-brand-purple'
        : 'bg-transparent text-brand-muted hover:text-white border-b-2 border-transparent'
    }`}
  >
    {children}
  </button>
);

const InfoModal: React.FC<InfoModalProps> = ({ step, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('technique');

  const hasTechnique = !!step.technique?.trim();
  const hasProgression = !!step.progression?.trim();

  useEffect(() => {
    if (hasTechnique) {
      setActiveTab('technique');
    } else if (hasProgression) {
      setActiveTab('progression');
    }
  }, [step, hasTechnique, hasProgression]);

  return (
    <Modal isOpen={true} onClose={onClose} title={step.name}>
      <div>
        <div className="border-b border-gray-700 flex -mt-2">
          {hasTechnique && <TabButton tab="technique" activeTab={activeTab} setActiveTab={setActiveTab}>Técnica</TabButton>}
          {hasProgression && <TabButton tab="progression" activeTab={activeTab} setActiveTab={setActiveTab}>Progresión</TabButton>}
        </div>
        <div className="pt-5 pb-2 min-h-[150px]">
          {activeTab === 'technique' && hasTechnique && (
            <p className="text-gray-300 whitespace-pre-wrap animate-fade-in-fast">{step.technique}</p>
          )}
          {activeTab === 'progression' && hasProgression && (
            <p className="text-gray-300 whitespace-pre-wrap animate-fade-in-fast">{step.progression}</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

// Animation for modal content
const style = document.createElement('style');
if (!document.getElementById('info-modal-styles')) {
    style.id = 'info-modal-styles';
    style.innerHTML = `
      @keyframes fade-in-fast {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in-fast {
        animation: fade-in-fast 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
}

export default InfoModal;
