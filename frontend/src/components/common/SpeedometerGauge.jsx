import React from 'react';

export default function SpeedometerGauge({ score = 85, size = 180 }) {
  // Semi-circle from -180 to 0 degrees
  const radius = 68;
  const strokeWidth = 12;
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  
  // Circumference of semi-circle: pi * radius
  const arcLength = Math.PI * radius;
  const strokeDashoffset = arcLength - (arcLength * normalizedScore) / 100;

  // Needle angle: from -180 deg (0%) to 0 deg (100%)
  const needleAngle = -180 + (normalizedScore * 180) / 100;

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size * 0.58 }}>
      <svg
        viewBox="0 0 160 95"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background track arc */}
        <path
          d="M 12 85 A 68 68 0 0 1 148 85"
          fill="none"
          stroke="currentColor"
          className="text-slate-200 dark:text-[#1e293b]"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Animated Active arc */}
        <path
          d="M 12 85 A 68 68 0 0 1 148 85"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={arcLength}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter="url(#gaugeGlow)"
          className="transition-all duration-1000 ease-out"
        />

        {/* Needle indicator pivot center */}
        <circle cx="80" cy="85" r="4" fill="#64748b" />
        
        {/* Needle hand */}
        <g transform={`rotate(${needleAngle} 80 85)`} className="transition-transform duration-1000 ease-out">
          <line
            x1="80"
            y1="85"
            x2="28"
            y2="85"
            stroke="currentColor"
            className="text-slate-800 dark:text-slate-200"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="28" cy="85" r="3" fill="#34d399" />
        </g>
      </svg>
    </div>
  );
}

