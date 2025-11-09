
export type DayId = string;

export interface DayInfo {
    dayId: DayId;
    dayName: string;
}

export interface WorkoutPart {
  type?: 'warmup' | 'hiit-exercise';
  name: string;
  duration: number;
  cue: string;
  transition?: number;
}

export interface WorkoutStep {
  id: string; // Unique ID for each step for DB operations
  type: 'exercise' | 'warmup' | 'hiit' | 'cooldown' | 'activity';
  name: string;
  details?: string;
  // Warmup specific
  duration?: number;
  transition?: number;
  cue?: string;
  parts?: WorkoutPart[];
  // Exercise specific
  sets?: number;
  reps?: string;
  rest?: number;
  technique?: string;
  progression?: string;
  // HIIT specific
  rounds?: number;
  workTime?: number;
  restTime?: number;
  exercises?: string[];
}

export interface FinalStep {
  type: 'cardio';
  name: string;
  details: string;
}

export interface DayPlan {
  dayName: string;
  title: string;
  warmUpType: 'fuerza' | 'hiit' | null;
  steps: WorkoutStep[];
  final?: FinalStep;
  requiresExercise: boolean;
  requiresSteps: boolean;
  stepGoal: number;
}

export type WarmUp = WorkoutStep & { type: 'warmup' };

export interface WorkoutData {
  warmUps: {
    fuerza: WarmUp[];
    hiit: WarmUp[];
  };
  days: Record<DayId, DayPlan>;
  activityLog?: ActivityLogEntry[];
}


export interface ActivityLogEntry {
  id: string;
  date: string; // ISO string format
  dayId: DayId;
  title: string;
  exerciseCompleted: boolean;
}

export interface AppSettings {
    soundEnabled: boolean;
    vibrationEnabled: boolean;
}
