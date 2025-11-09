import { AppSettings } from "../types";

let audioContext: AudioContext | null = null;

export const init = () => {
  // AudioContext must be created after a user gesture.
  // We'll create it on the first feedback trigger if it doesn't exist.
};

const getAudioContext = (): AudioContext | null => {
    if (!audioContext) {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                audioContext = new AudioContext();
            }
        } catch (e) {
            console.error("Web Audio API is not supported in this browser.", e);
            return null;
        }
    }
    // If context is suspended, it needs to be resumed by a user gesture.
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
    return audioContext;
}

const playSound = (type: 'countdown' | 'success' | 'warning' | 'heavy' | 'victory') => {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const now = ctx.currentTime;
    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
    gainNode.gain.setValueAtTime(0.5, now); // Increased base volume
    
    switch (type) {
        case 'countdown': {
            const oscillator = ctx.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, now);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
            oscillator.connect(gainNode);
            oscillator.start(now);
            oscillator.stop(now + 0.2);
            break;
        }
        case 'success': {
            const osc1 = ctx.createOscillator();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(523.25, now); // C5
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
            osc1.connect(gainNode);
            osc1.start(now);
            osc1.stop(now + 0.5);
            break;
        }
        case 'warning': {
            const oscillator = ctx.createOscillator();
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(330, now);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
            oscillator.connect(gainNode);
            oscillator.start(now);
            oscillator.stop(now + 0.3);
            break;
        }
        case 'heavy': { // For completing the last set
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            osc1.type = 'sine';
            osc2.type = 'sine';
            osc1.frequency.setValueAtTime(523.25, now); // C5
            osc2.frequency.setValueAtTime(659.25, now); // E5
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
            osc1.connect(gainNode);
            osc2.connect(gainNode);
            osc1.start(now);
            osc2.start(now + 0.1);
            osc1.stop(now + 0.6);
            osc2.stop(now + 0.6);
            break;
        }
        case 'victory': { // Routine completion fanfare
            const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            freqs.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + i * 0.15);
                osc.connect(gainNode);
                osc.start(now + i * 0.15);
                osc.stop(now + i * 0.15 + 0.2);
            });
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.0); // Total duration
            break;
        }
    }
};

const vibrate = (pattern: 'light' | 'success' | 'heavy' | 'warning' | 'victory') => {
    if ('vibrate' in navigator) {
        switch (pattern) {
            case 'light':
                navigator.vibrate(50); // Single light tap
                break;
            case 'success':
                navigator.vibrate([100, 50, 100]); // Success pattern
                break;
            case 'heavy':
                navigator.vibrate(200); // Strong, single pulse
                break;
            case 'warning':
                navigator.vibrate([200, 100, 200]); // Warning pattern
                break;
            case 'victory':
                navigator.vibrate([100, 50, 100, 50, 200]); // Victory pattern
                break;
        }
    }
};

export const triggerFeedback = (
    type: 'countdown' | 'success' | 'heavy' | 'light' | 'warning' | 'victory', 
    settings: AppSettings
) => {
    if (settings.soundEnabled) {
        if (type === 'light') {
            // No sound for light haptic feedback unless explicitly designed
        } else {
            playSound(type as any);
        }
    }

    if (settings.vibrationEnabled) {
        if (type === 'countdown' || type === 'light') {
            vibrate('light');
        } else {
            vibrate(type as any);
        }
    }
};
