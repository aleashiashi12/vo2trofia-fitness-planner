
import React from 'react';
import { DayId, DayInfo } from '../types';

interface DaySelectorProps {
  days: DayInfo[];
  selectedDay: DayId;
  onSelectDay: (dayId: DayId) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ days, selectedDay, onSelectDay }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
      {days.map((day) => {
        const isSelected = selectedDay === day.dayId;
        return (
          <button
            key={day.dayId}
            onClick={() => onSelectDay(day.dayId)}
            className={`px-4 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-brand-purple ${
              isSelected
                ? 'bg-brand-purple text-white shadow-lg'
                : 'bg-brand-light text-brand-muted hover:bg-gray-800 hover:text-white'
            }`}
          >
            {day.dayName}
          </button>
        );
      })}
    </div>
  );
};

export default DaySelector;
