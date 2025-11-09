import React, { useState } from 'react';
import Modal from './Modal';

interface CreateDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
}

const CreateDayModal: React.FC<CreateDayModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    if (title.trim()) {
      onSave(title.trim());
      setTitle(''); // Reset for next time
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Routine">
      <div className="space-y-4">
        <div>
          <label htmlFor="routine-title" className="block text-sm font-medium text-brand-muted mb-1">
            Routine Title
          </label>
          <input
            type="text"
            id="routine-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='e.g., "Día 5: Brazos y Hombros"'
            className="w-full bg-brand-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-brand-purple focus:border-brand-purple"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md text-sm font-semibold bg-brand-light text-gray-300 hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!title.trim()}
          className="px-4 py-2 rounded-md text-sm font-semibold bg-brand-purple text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Routine
        </button>
      </div>
    </Modal>
  );
};

export default CreateDayModal;
