import { WorkoutData, DayId, DayPlan, DayInfo, WorkoutStep, WarmUp, ActivityLogEntry, AppSettings } from '../types';
import { initialData } from './initialData';

const DATA_STORAGE_KEY = 'vo2trofia_data';
const ACTIVITY_LOG_KEY = 'vo2trofia_activity_log';
const SETTINGS_KEY = 'vo2trofia_settings';

// --- Helper for local date ---
export const getLocalDateKey = (d: Date): string => {
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};


// --- App Settings ---
export const getAppSettings = (): AppSettings => {
    try {
        const settings = localStorage.getItem(SETTINGS_KEY);
        const defaults: AppSettings = { soundEnabled: true, vibrationEnabled: true };
        return settings ? { ...defaults, ...JSON.parse(settings) } : defaults;
    } catch (error) {
        console.error("Failed to parse settings from localStorage", error);
        return { soundEnabled: true, vibrationEnabled: true };
    }
};

export const saveAppSettings = (settings: AppSettings): void => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};


// --- Workout Data ---
const getStoredData = (): WorkoutData | null => {
    try {
        const data = localStorage.getItem(DATA_STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Failed to parse data from localStorage", error);
        return null;
    }
};

const setStoredData = (data: WorkoutData): void => {
    localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
};

export const init = async (): Promise<void> => {
    if (!getStoredData()) {
        const dataWithIds: WorkoutData = { ...initialData };
        let stepIdCounter = 0;
        Object.values(dataWithIds.days).forEach(day => {
            day.steps.forEach(step => {
                // @ts-ignore
                step.id = `step_${stepIdCounter++}`;
            });
        });
        setStoredData(dataWithIds);
        // Initialize empty log
        localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify([]));
    }
};

export const getDaysForSelector = async (): Promise<DayInfo[]> => {
    const data = getStoredData();
    if (!data) return [];

    return Object.entries(data.days).map(([dayId, dayPlan]) => ({
        dayId: dayId as DayId,
        dayName: dayPlan.dayName,
    }));
};

export const getDayPlan = async (dayId: DayId): Promise<DayPlan | null> => {
    const data = getStoredData();
    return data ? data.days[dayId] : null;
};

export const getWarmUp = (warmUpType: 'fuerza' | 'hiit'): WarmUp[] => {
    const data = getStoredData();
    return data ? data.warmUps[warmUpType] : [];
};

export const updateWorkoutStep = async (dayId: DayId, stepId: string, updates: Partial<WorkoutStep>): Promise<boolean> => {
    const data = getStoredData();
    if (!data) return false;

    const day = data.days[dayId];
    if (!day) return false;

    const stepIndex = day.steps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) return false;
    
    day.steps[stepIndex] = { ...day.steps[stepIndex], ...updates, id: stepId };
    
    setStoredData(data);
    return true;
};

export const createDayPlan = async (title: string): Promise<DayInfo> => {
    const data = getStoredData();
    if (!data) throw new Error("Data not initialized");
    const dayId: DayId = `day_${Date.now()}`;
    const dayName = title.split(':')[0].trim().substring(0,10) || "Nuevo Día"; 

    data.days[dayId] = {
        dayName: dayName,
        title: title,
        warmUpType: null,
        steps: [],
        requiresExercise: true,
        requiresSteps: false,
        stepGoal: 0,
    };
    setStoredData(data);
    return { dayId, dayName };
};

export const deleteDayPlan = async (dayId: DayId): Promise<boolean> => {
    const data = getStoredData();
    if (!data || !data.days[dayId]) return false;
    
    const initialDayIds = Object.keys(initialData.days);
    if(initialDayIds.includes(dayId)) {
        console.warn("Cannot delete an initial, default routine.");
        return false;
    }

    delete data.days[dayId];
    setStoredData(data);
    return true;
};

export const addExerciseToDay = async (dayId: DayId, exerciseData: Omit<WorkoutStep, 'id'>): Promise<WorkoutStep> => {
    const data = getStoredData();
    if (!data || !data.days[dayId]) throw new Error("Day plan not found");
    const newExercise: WorkoutStep = {
        ...exerciseData,
        id: `step_${Date.now()}`,
    };
    data.days[dayId].steps.push(newExercise);
    setStoredData(data);
    return newExercise;
};

export const deleteExerciseFromDay = async (dayId: DayId, exerciseId: string): Promise<boolean> => {
    const data = getStoredData();
    if (!data || !data.days[dayId]) return false;
    data.days[dayId].steps = data.days[dayId].steps.filter(step => step.id !== exerciseId);
    setStoredData(data);
    return true;
};

export const updateDayPlanSteps = async (dayId: DayId, newSteps: WorkoutStep[]): Promise<boolean> => {
    const data = getStoredData();
    if (!data || !data.days[dayId]) return false;
    data.days[dayId].steps = newSteps;
    setStoredData(data);
    return true;
}

export const getInitialExerciseByName = async (name: string): Promise<WorkoutStep | null> => {
    for (const dayId in initialData.days) {
        const dayPlan = initialData.days[dayId as DayId];
        const exercise = dayPlan.steps.find(step => step.name === name && step.type === 'exercise');
        if (exercise) {
            return exercise as WorkoutStep;
        }
    }
    return null;
};

export const resetAllExercisesToDefault = async (): Promise<void> => {
    const data = getStoredData();
    if (!data) return;

    // A simple way to get unique enough IDs
    let stepIdCounter = Date.now(); 

    for (const dayId in initialData.days) {
        if (data.days[dayId]) {
            // Get the original steps for this day
            const originalDayPlan = initialData.days[dayId as DayId];
            
            // Assign new unique IDs to the original steps
            const newStepsWithIds = originalDayPlan.steps.map((step, index) => ({
                ...step,
                id: `step_${stepIdCounter++}_${index}`
            }));
            
            // Replace the steps in the user's data
            data.days[dayId].steps = newStepsWithIds;
        }
    }

    setStoredData(data);
};


export const getActivityLog = async (): Promise<ActivityLogEntry[]> => {
    try {
        const logData = localStorage.getItem(ACTIVITY_LOG_KEY);
        const log = logData ? JSON.parse(logData) : [];
        
        let needsUpdate = false;
        const migratedLog = log.map((entry: any) => {
             const newEntry = { ...entry };
            if (typeof newEntry.id === 'undefined') {
                needsUpdate = true;
                newEntry.id = newEntry.date;
            }
            if (typeof newEntry.exerciseCompleted === 'undefined') {
                needsUpdate = true;
                // Best guess: if an old entry exists, an exercise was logged.
                newEntry.exerciseCompleted = true; 
            }
            if (newEntry.stepsCompleted) delete newEntry.stepsCompleted;
            if (newEntry.stepsLogged) delete newEntry.stepsLogged;

            return newEntry;
        });

        if (needsUpdate) {
            localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(migratedLog));
        }

        return migratedLog;
    } catch (error) {
        console.error("Failed to get activity log", error);
        return [];
    }
};

export const logExerciseCompletion = async (dayId: DayId, title: string): Promise<void> => {
    try {
        const log = await getActivityLog();
        const now = new Date();
        const todayKey = getLocalDateKey(now);
        
        // Find an entry for today based on local date, regardless of time.
        let entryForToday = log.find(entry => getLocalDateKey(new Date(entry.date)) === todayKey);

        if (entryForToday) {
            entryForToday.exerciseCompleted = true;
            // If user does a different workout than planned, update title/dayId
            entryForToday.dayId = dayId;
            entryForToday.title = title;
        } else {
            const newEntry: ActivityLogEntry = {
                id: now.toISOString(),
                date: now.toISOString(),
                dayId,
                title,
                exerciseCompleted: true,
            };
            log.push(newEntry);
        }
        localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(log));
    } catch (error) {
        console.error("Failed to log workout", error);
    }
};

export const addWorkoutLog = async (date: string, workout: {dayId: DayId, title: string}): Promise<ActivityLogEntry[]> => {
    try {
        const log = await getActivityLog();
        // The incoming 'date' is the "YYYY-MM-DD" key we want to match against.
        const dateObj = new Date(`${date}T12:00:00`); // Use noon to avoid timezone shifts at midnight
        
        const existingEntry = log.find(l => getLocalDateKey(new Date(l.date)) === date);

        if (existingEntry) {
            existingEntry.exerciseCompleted = true;
            existingEntry.dayId = workout.dayId;
            existingEntry.title = workout.title;
        } else {
            const newEntry: ActivityLogEntry = {
                id: new Date().toISOString(),
                date: dateObj.toISOString(), // Store as a full ISO string for consistency
                dayId: workout.dayId,
                title: workout.title,
                exerciseCompleted: true,
            };
            log.push(newEntry);
        }
        localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(log));
        return log;
    } catch (error) {
        console.error("Failed to add workout log", error);
        return await getActivityLog();
    }
}

export const deleteWorkoutLog = async (logId: string): Promise<ActivityLogEntry[]> => {
    try {
        const log = await getActivityLog();
        const updatedLog = log.filter(entry => entry.id !== logId);
        localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(updatedLog));
        return updatedLog;
    } catch (error) {
        console.error("Failed to delete workout log", error);
        return await getActivityLog();
    }
}

export const getAllDayPlans = async (): Promise<{dayId: DayId, plan: DayPlan}[]> => {
    const data = getStoredData();
    if (!data) return [];
    return Object.entries(data.days).map(([dayId, plan]) => ({
        dayId: dayId as DayId,
        plan: plan,
    }));
};