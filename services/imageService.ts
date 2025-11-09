
import React from 'react';
import { DumbbellIcon, PushIcon, PullIcon, LegsIcon, CoreIcon, FullBodyIcon } from '../components/icons/Icons';

type ExerciseCategory = 'push' | 'pull' | 'legs' | 'core' | 'full_body' | 'default';

const getCategoryForExercise = (name: string): ExerciseCategory => {
    const lowerName = name.toLowerCase();
    // Legs: Squats, Lunges, Hip Thrusts, Romanian Deadlifts
    if (/sentadilla|zancadas|hip thrust|piernas|rumano/i.test(lowerName)) return 'legs';
    // Pull: Rows, Pull-ups, Curls, Deadlifts (conventional)
    if (/remo|dominadas|curl|peso muerto/i.test(lowerName)) return 'pull';
    // Push: Press, Dips, Push-ups
    if (/press|fondos|flexiones|push|empuje|elevaciones/i.test(lowerName)) return 'push';
    // Core: Planks, Russian Twists
    if (/plancha|giros rusos|núcleo|core|abs/i.test(lowerName)) return 'core';
    // Full Body: Farmer's Walk, Burpees
    if (/paseo|burpees|cuerpo completo|funcional/i.test(lowerName)) return 'full_body';
    return 'default';
}

export const getIconForExercise = (name: string): React.FC<any> => {
    const category = getCategoryForExercise(name);
    switch (category) {
        case 'push': return PushIcon;
        case 'pull': return PullIcon;
        case 'legs': return LegsIcon;
        case 'core': return CoreIcon;
        case 'full_body': return FullBodyIcon;
        default: return DumbbellIcon;
    }
};

export const getIconColorForExercise = (name: string): string => {
    const category = getCategoryForExercise(name);
    switch (category) {
        case 'push': return 'bg-violet-500/20 text-violet-400';
        case 'pull': return 'bg-purple-500/20 text-purple-400';
        case 'legs': return 'bg-indigo-500/20 text-indigo-400';
        case 'core': return 'bg-violet-600/20 text-violet-500';
        case 'full_body': return 'bg-purple-600/20 text-purple-500';
        default: return 'bg-indigo-600/20 text-indigo-500';
    }
};
