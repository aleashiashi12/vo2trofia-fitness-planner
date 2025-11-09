
import React, { useState } from 'react';
import { PrevIcon, NextIcon } from './icons/Icons';

interface ActivityCalendarProps {
  completionStatus: Map<string, 'partial' | 'complete'>; // Expects dates in "YYYY-MM-DD" format
  onDateClick: (date: string) => void;
}

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ completionStatus, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const renderHeader = () => {
    const monthYearFormat = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' });
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 text-brand-muted hover:text-white transition-colors">
          <PrevIcon size={24} />
        </button>
        <h3 className="text-xl font-bold text-white capitalize">
          {monthYearFormat.format(currentDate)}
        </h3>
        <button onClick={() => changeMonth(1)} className="p-2 text-brand-muted hover:text-white transition-colors">
          <NextIcon size={24} />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    return (
      <div className="grid grid-cols-7 gap-1 text-center text-sm text-brand-muted font-semibold mb-2">
        {daysOfWeek.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDate = new Date(monthStart);
    // Adjust start date to the beginning of the week (Monday)
    let dayOfWeek = startDate.getDay();
    if (dayOfWeek === 0) dayOfWeek = 7; // Sunday is 0, make it 7
    startDate.setDate(startDate.getDate() - (dayOfWeek - 1));

    const cells = [];
    let currentDateIterator = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
        const dateStr = currentDateIterator.toISOString().split('T')[0];
        const isCurrentMonth = currentDateIterator.getMonth() === currentDate.getMonth();
        const status = completionStatus.get(dateStr);

        let dotClass = '';
        if (status === 'complete') {
            dotClass = 'bg-green-500';
        } else if (status === 'partial') {
            dotClass = 'bg-brand-purple';
        }

        cells.push(
            <div 
                key={dateStr} 
                onClick={() => onDateClick(dateStr)}
                role="button"
                tabIndex={0}
                aria-label={`View or edit logs for ${dateStr}`}
                className={`relative w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ${isCurrentMonth ? 'text-white hover:bg-gray-800' : 'text-gray-600'}`}>
              <span>{currentDateIterator.getDate()}</span>
              {dotClass && <div className={`absolute bottom-1 w-1.5 h-1.5 ${dotClass} rounded-full`}></div>}
            </div>
        );
        currentDateIterator.setDate(currentDateIterator.getDate() + 1);
    }
    return <div className="grid grid-cols-7 gap-1 place-items-center">{cells}</div>;
  };


  return (
    <div className="bg-brand-dark p-4 sm:p-6 rounded-2xl border border-gray-800">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default ActivityCalendar;
