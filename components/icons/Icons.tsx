import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const PlayIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const PauseIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

export const NextIcon: React.FC<IconProps> = ({ size = 32, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
  </svg>
);

export const PrevIcon: React.FC<IconProps> = ({ size = 32, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export const PencilIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
);


export const DumbbellIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.4 14.4 9.6 9.6"/>
        <path d="M18 6h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2"/>
        <path d="M6 18H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2"/>
        <path d="m21 9-2.8-2.8"/>
        <path d="m6 15-2.8-2.8"/>
        <path d="m21 15-2.8 2.8"/>
        <path d="m6 9-2.8 2.8"/>
        <path d="M9 6H7a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2"/>
        <path d="M15 18h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2"/>
    </svg>
);

export const FireIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 4.5c.3-.3.5-.7.7-1.1.2-.4.3-.8.4-1.2.1-.4.1-.8.1-1.2 0-.4-.1-.8-.2-1.2l-.2-.2c-.3.8-.7 1.6-1.2 2.3-.5.7-1.1 1.4-1.8 2-.7.6-1.4 1.2-2.2 1.7-.8.5-1.6.9-2.5 1.2-.9.3-1.8.5-2.7.5-1 0-1.9-.1-2.8-.4-.9-.3-1.8-.7-2.5-1.2s-1.4-1.1-1.9-1.8C1.2 8.1.6 7.3.2 6.5c0 0 0 .1 0 .1.1.4.2.8.4 1.2.2.4.4.8.7 1.2.3.4.6.8 1 1.1.4.3.8.6 1.2.9.4.3.9.5 1.3.7.5.2 1 .3 1.5.4.5.1 1 .1 1.5.1s1-.1 1.5-.2c.5-.1 1-.3 1.5-.5.5-.2 1-.5 1.4-.8.4-.3.8-.7 1.2-1.1.3-.4.6-.8.8-1.2s.4-.9.6-1.3c.1-.5.2-1 .2-1.5s-.1-1-.2-1.5c-.1-.5-.3-1-.5-1.4-.2-.4-.4-.8-.7-1.2-.3-.4-.6-.7-.9-1-.3.3-.6.6-.8.9-.2.3-.4.6-.6.9-.2.3-.3.7-.4 1s-.1.7-.1 1.1c0 .4.1.8.2 1.2.1.4.3.8.5 1.2.2.4.5.8.8 1.1.3.4.7.7 1.1 1 .4.3.8.6 1.3.8.4.2.9.4 1.4.5.5.1 1 .2 1.5.2h1.5"/>
    </svg>
);

export const WalkIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15.5 4.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"/>
        <path d="m14 7 1.5-1.5"/>
        <path d="M18.5 14.5 20 16l-4 4"/>
        <path d="m17 10 2-2-1.5-1.5"/>
        <path d="M14 18.5 12 17l-1.5 1.5"/>
        <path d="m4 21 3-3-1.5-1.5"/>
        <path d="M8.5 14.5 7 16l-4 4"/>
        <path d="m12 15-1-1 2.5-2.5"/>
        <path d="M8 12.5 7 14"/>
    </svg>
);

export const CooldownIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2v2.34"/>
        <path d="M12 22v-2.34"/>
        <path d="m4.22 4.22 1.65 1.65"/>
        <path d="m18.13 18.13 1.65 1.65"/>
        <path d="M2 12h2.34"/>
        <path d="M22 12h-2.34"/>
        <path d="m4.22 19.78 1.65-1.65"/>
        <path d="m18.13 5.87 1.65-1.65"/>
        <circle cx="12" cy="12" r="4"/>
    </svg>
);


export const SkipIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4 6v12l8.5-6L4 6z" />
    <path d="M13 6v12l8.5-6L13 6z" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

export const ChartIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 20, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m18 15-6-6-6 6" />
    </svg>
);

export const ArrowDownIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export const CogIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
      <path d="M12 2v2"/>
      <path d="M12 22v-2"/>
      <path d="M4.93 4.93l1.41 1.41"/>
      <path d="M17.66 17.66l1.41 1.41"/>
      <path d="M2 12h2"/>
      <path d="M20 12h2"/>
      <path d="M4.93 19.78l1.41-1.41"/>
      <path d="M17.66 6.34l1.41-1.41"/>
    </svg>
);

export const PushIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 5l0 14"/>
        <path d="m18 11-6-6-6 6"/>
    </svg>
);

export const PullIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 19V5"/>
        <path d="m6 13 6 6 6-6"/>
    </svg>
);

export const LegsIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22v-6"/>
      <path d="m8.5 12.5-3.5 3.5"/>
      <path d="m15.5 12.5 3.5 3.5"/>
      <path d="M8 8.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/>
      <path d="M19 8.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/>
      <path d="m4.5 16-1.5-1.5"/>
      <path d="m19.5 16 1.5-1.5"/>
    </svg>
);

export const CoreIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="7" y="9" width="10" height="6" rx="1"/>
        <path d="M12 2v7"/>
        <path d="M12 15v7"/>
        <path d="M9 22h6"/>
        <path d="M9 2h6"/>
    </svg>
);

export const FullBodyIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="5" r="1" />
        <path d="M9 20l3-6 3 6" />
        <path d="M6 8l6 2 6-2" />
        <path d="M12 10v4" />
    </svg>
);