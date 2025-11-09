
import React, { useEffect, useState, useMemo } from 'react';
import * as workoutService from '../services/workoutService';
import { ActivityLogEntry, DayId, DayPlan } from '../types';
import ActivityCalendar from './ActivityCalendar';
import WorkoutBarChart from './WorkoutBarChart';
import { ChartIcon, TrashIcon, PlusIcon } from './icons/Icons';
import Modal from './Modal';

interface EditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  logsForDate: ActivityLogEntry[];
  allWorkouts: { dayId: DayId; title: string }[];
  onAdd: (date: string, workout: { dayId: DayId; title: string }) => void;
  onDelete: (logId: string) => void;
}

const EditLogModal: React.FC<EditLogModalProps> = ({ isOpen, onClose, selectedDate, logsForDate, allWorkouts, onAdd, onDelete }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState<string>('');

    useEffect(() => {
        if (isOpen) {
            setShowAddForm(false);
            if (allWorkouts.length > 0) {
                setSelectedWorkout(JSON.stringify(allWorkouts[0]));
            }
        }
    }, [isOpen, allWorkouts]);

    const handleAdd = () => {
        if (selectedWorkout) {
            onAdd(selectedDate, JSON.parse(selectedWorkout));
            setShowAddForm(false);
        }
    };

    const formattedDate = new Date(`${selectedDate}T12:00:00`).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Registro del ${formattedDate}`}>
            <div className="space-y-4">
                <h4 className="font-semibold text-lg text-white">Entrenamientos Registrados</h4>
                {logsForDate.length > 0 ? (
                    <ul className="space-y-2">
                        {logsForDate.map(log => (
                            <li key={log.id} className="flex justify-between items-center bg-brand-dark p-3 rounded-md">
                                <span className="text-brand-muted">{log.title}</span>
                                <button onClick={() => onDelete(log.id)} className="text-red-500 hover:text-red-400">
                                    <TrashIcon />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-brand-muted text-sm">No hay entrenamientos registrados para este día.</p>
                )}

                <div className="pt-4 border-t border-gray-700">
                    {showAddForm ? (
                        <div className="space-y-3">
                            <h4 className="font-semibold text-lg text-white">Añadir Entrenamiento</h4>
                            <div>
                                <label htmlFor="workout-select" className="block text-sm font-medium text-brand-muted mb-1">Seleccionar rutina</label>
                                <select
                                    id="workout-select"
                                    value={selectedWorkout}
                                    onChange={e => setSelectedWorkout(e.target.value)}
                                    className="w-full bg-brand-dark border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-brand-purple focus:border-brand-purple"
                                >
                                    {allWorkouts.map(w => (
                                        <option key={w.dayId} value={JSON.stringify(w)}>{w.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-md text-sm font-semibold bg-brand-light text-gray-300 hover:bg-gray-800 transition-colors">Cancelar</button>
                                <button onClick={handleAdd} className="px-4 py-2 rounded-md text-sm font-semibold bg-brand-purple text-white hover:bg-purple-700 transition-colors">Añadir</button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setShowAddForm(true)} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold bg-brand-light text-gray-300 hover:bg-gray-800 transition-colors">
                            <PlusIcon /> Añadir Entrenamiento
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
};


interface ProgressViewProps {
    log: ActivityLogEntry[];
    onLogChange: () => void;
}

const ProgressView: React.FC<ProgressViewProps> = ({ log, onLogChange }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [allWorkouts, setAllWorkouts] = useState<{ dayId: DayId; title: string }[]>([]);
    
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            setIsLoading(true);
            const plans = await workoutService.getAllDayPlans();
            const simpleWorkouts = plans.map(p => ({ dayId: p.dayId, title: p.plan.title }));
            setAllWorkouts(simpleWorkouts);
            setIsLoading(false);
        };
        initialize();
    }, []);

    const completionStatusByDate = useMemo(() => {
        const statusMap = new Map<string, 'complete'>();
        log.forEach(entry => {
            const dateKey = entry.date.split('T')[0];
            if (entry.exerciseCompleted) {
                statusMap.set(dateKey, 'complete');
            }
        });
        return statusMap;
    }, [log]);

    const chartData = useMemo(() => {
        const counts: { [key: string]: number } = {};
        log.forEach(entry => {
            const simpleTitle = entry.title.split(':')[1]?.replace(/🏋️‍♂️|🦵|🔥|💪|🚶‍♂️/g, '').trim() || entry.title;
            counts[simpleTitle] = (counts[simpleTitle] || 0) + 1;
        });

        return Object.entries(counts)
            .map(([label, value]) => ({ label, value }))
            .sort((a, b) => b.value - a.value);
    }, [log]);

    const handleDateClick = (date: string) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const handleAddWorkout = async (date: string, workout: { dayId: DayId; title: string }) => {
        await workoutService.addWorkoutLog(date, workout);
        onLogChange();
    };

    const handleDeleteWorkout = async (logId: string) => {
        await workoutService.deleteWorkoutLog(logId);
        onLogChange();
    };
    
    const logsForSelectedDate = useMemo(() => {
        if (!selectedDate) return [];
        return log.filter(entry => entry.date.split('T')[0] === selectedDate);
    }, [log, selectedDate]);


    if (isLoading) {
        return <p className="text-center text-brand-muted animate-pulse">Loading Progress...</p>;
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <ActivityCalendar completionStatus={completionStatusByDate} onDateClick={handleDateClick} />
            
            <div className="bg-brand-dark p-4 sm:p-6 rounded-2xl border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <ChartIcon />
                    Workout Frequency
                </h3>
                {chartData.length > 0 ? (
                    <WorkoutBarChart data={chartData} />
                ) : (
                    <p className="text-brand-muted text-center py-8">
                        No workouts logged yet. Complete a session to see your stats!
                    </p>
                )}
            </div>

            {selectedDate && (
                <EditLogModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    selectedDate={selectedDate}
                    logsForDate={logsForSelectedDate}
                    allWorkouts={allWorkouts}
                    onAdd={handleAddWorkout}
                    onDelete={handleDeleteWorkout}
                />
            )}
        </div>
    );
};

export default ProgressView;
