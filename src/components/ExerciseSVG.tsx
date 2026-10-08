import React from 'react';

interface ExerciseSVGProps {
  type: 'bench-press' | 'squat' | 'pull-up' | 'overhead-press' | 'bicep-curl' | 'plank' | 'deadlift' | 'lunges';
  className?: string;
}

export const ExerciseSVG: React.FC<ExerciseSVGProps> = ({ type, className = "w-full h-40" }) => {
  switch (type) {
    case 'bench-press':
      return (
        <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bench */}
          <rect x="30" y="80" width="140" height="8" rx="2" fill="#2d3748" />
          <rect x="45" y="88" width="10" height="25" fill="#1a202c" />
          <rect x="145" y="88" width="10" height="25" fill="#1a202c" />
          {/* Figure on bench */}
          <circle cx="50" cy="72" r="9" fill="#e6b800" />
          <path d="M59 74H125C130 74 135 78 135 80" stroke="#f3f4f6" strokeWidth="6" strokeLinecap="round" />
          <path d="M125 80L145 70L155 80" stroke="#f3f4f6" strokeWidth="5" strokeLinecap="round" />
          {/* Barbell */}
          <line x1="85" y1="35" x2="85" y2="70" stroke="#a0aec0" strokeWidth="2" strokeDasharray="3 3" />
          <rect x="83" y="42" width="4" height="28" fill="#e6b800" />
          <line x1="85" y1="15" x2="85" y2="75" stroke="#cbd5e0" strokeWidth="4" />
          <rect x="75" y="32" width="20" height="6" fill="#e2e8f0" rx="1" />
          <rect x="65" y="28" width="10" height="14" fill="#e6b800" rx="2" />
          <rect x="95" y="28" width="10" height="14" fill="#e6b800" rx="2" />
          {/* Target muscle highlight */}
          <circle cx="85" cy="74" r="7" fill="#ff9900" opacity="0.6" />
        </svg>
      );

    case 'squat':
      return (
        <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ground */}
          <line x1="20" y1="110" x2="180" y2="110" stroke="#2d3748" strokeWidth="3" />
          {/* Squat figure */}
          <circle cx="95" cy="25" r="9" fill="#e6b800" />
          {/* Barbell */}
          <line x1="50" y1="32" x2="140" y2="32" stroke="#e2e8f0" strokeWidth="4" />
          <rect x="42" y="22" width="8" height="20" fill="#e6b800" rx="2" />
          <rect x="150" y="22" width="8" height="20" fill="#e6b800" rx="2" />
          {/* Body Torso */}
          <path d="M95 34L85 65" stroke="#f3f4f6" strokeWidth="7" strokeLinecap="round" />
          {/* Legs in squat */}
          <path d="M85 65L115 80L90 110" stroke="#ff9900" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M85 65L65 80L75 110" stroke="#ff9900" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Quad Glow */}
          <circle cx="100" cy="75" r="8" fill="#e6b800" opacity="0.5" />
        </svg>
      );

    case 'pull-up':
      return (
        <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pull up bar */}
          <line x1="30" y1="15" x2="170" y2="15" stroke="#e2e8f0" strokeWidth="5" />
          <line x1="40" y1="0" x2="40" y2="15" stroke="#4a5568" strokeWidth="4" />
          <line x1="160" y1="0" x2="160" y2="15" stroke="#4a5568" strokeWidth="4" />
          {/* Person pulling up */}
          <circle cx="100" cy="24" r="8" fill="#e6b800" />
          {/* Arms V Shape */}
          <path d="M65 15L88 32M135 15L112 32" stroke="#f3f4f6" strokeWidth="5" strokeLinecap="round" />
          {/* Back V Shape */}
          <path d="M100 32L100 75" stroke="#ff9900" strokeWidth="8" strokeLinecap="round" />
          {/* Lat Wings */}
          <path d="M88 36C80 48 85 60 100 65C115 60 120 48 112 36 Z" fill="#e6b800" opacity="0.4" />
          {/* Legs */}
          <path d="M100 75L92 108M100 75L108 108" stroke="#f3f4f6" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'overhead-press':
      return (
        <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dumbbells overhead */}
          <circle cx="100" cy="22" r="8" fill="#e6b800" />
          <line x1="60" y1="20" x2="140" y2="20" stroke="#e2e8f0" strokeWidth="4" />
          <rect x="52" y="12" width="8" height="16" fill="#e6b800" rx="2" />
          <rect x="140" y="12" width="8" height="16" fill="#e6b800" rx="2" />
          {/* Arms holding weights */}
          <path d="M60 20L80 36L92 40M140 20L120 36L108 40" stroke="#f3f4f6" strokeWidth="5" strokeLinecap="round" />
          {/* Shoulder Caps glow */}
          <circle cx="82" cy="38" r="6" fill="#ff9900" opacity="0.8" />
          <circle cx="118" cy="38" r="6" fill="#ff9900" opacity="0.8" />
          {/* Body */}
          <path d="M100 30L100 80" stroke="#f3f4f6" strokeWidth="7" strokeLinecap="round" />
          <path d="M100 80L90 112M100 80L110 112" stroke="#4a5568" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'bicep-curl':
      return (
        <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="85" cy="25" r="8" fill="#e6b800" />
          <path d="M85 33L85 85" stroke="#f3f4f6" strokeWidth="7" strokeLinecap="round" />
          {/* Arm curled with dumbbell */}
          <path d="M85 40L105 60L100 35" stroke="#ff9900" strokeWidth="6" strokeLinecap="round" />
          <circle cx="100" cy="32" r="7" fill="#e6b800" />
          {/* Dumbbell */}
          <rect x="90" y="28" width="20" height="8" fill="#e2e8f0" rx="2" />
          {/* Bicep muscle glow */}
          <circle cx="98" cy="45" r="6" fill="#e6b800" />
          {/* Legs */}
          <path d="M85 85L75 115M85 85L95 115" stroke="#4a5568" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'plank':
      return (
        <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="10" y1="95" x2="190" y2="95" stroke="#2d3748" strokeWidth="3" />
          {/* Plank figure */}
          <circle cx="155" cy="62" r="8" fill="#e6b800" />
          {/* Straight Torso */}
          <line x1="45" y1="80" x2="150" y2="70" stroke="#f3f4f6" strokeWidth="7" strokeLinecap="round" />
          {/* Core highlight */}
          <line x1="85" y1="74" x2="125" y2="71" stroke="#ff9900" strokeWidth="9" strokeLinecap="round" opacity="0.8" />
          {/* Arms at front */}
          <path d="M145 70L145 95L160 95" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Feet at back */}
          <path d="M45 80L35 95" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'deadlift':
    default:
      return (
        <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="20" y1="105" x2="180" y2="105" stroke="#2d3748" strokeWidth="3" />
          {/* Figure in hinge */}
          <circle cx="125" cy="30" r="8" fill="#e6b800" />
          <path d="M125 38L90 60" stroke="#f3f4f6" strokeWidth="7" strokeLinecap="round" />
          <path d="M90 60L110 105" stroke="#f3f4f6" strokeWidth="6" strokeLinecap="round" />
          <path d="M90 60L75 105" stroke="#f3f4f6" strokeWidth="5" strokeLinecap="round" />
          {/* Barbell near shins */}
          <line x1="45" y1="85" x2="145" y2="85" stroke="#e2e8f0" strokeWidth="4" />
          <circle cx="50" cy="85" r="14" fill="#e6b800" />
          <circle cx="140" cy="85" r="14" fill="#e6b800" />
          {/* Glute & Hamstring glow */}
          <circle cx="95" cy="62" r="7" fill="#ff9900" opacity="0.8" />
        </svg>
      );
  }
};
