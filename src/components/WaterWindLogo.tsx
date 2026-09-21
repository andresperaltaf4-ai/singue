import React from 'react';

interface WaterWindLogoProps {
  className?: string;
  size?: number;
}

export const WaterWindLogo: React.FC<WaterWindLogoProps> = ({ 
  className = "w-9 h-9", 
  size = 36 
}) => {
  return (
    <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-950/80 via-[#0a2339] to-sky-950/70 p-1 border border-cyan-500/30 shadow-lg shadow-cyan-950/50 group-hover:border-cyan-400/60 group-hover:shadow-cyan-500/20 transition duration-300 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(6,182,212,0.6)]"
      >
        <defs>
          {/* Water gradient */}
          <linearGradient id="waterFlow" x1="4" y1="44" x2="36" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          {/* Wind gradient */}
          <linearGradient id="windBreeze" x1="8" y1="8" x2="44" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="40%" stopColor="#7dd3fc" />
            <stop offset="80%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Water droplet glow */}
          <linearGradient id="dropletGlow" x1="28" y1="6" x2="36" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* Outer subtle fluid ripple aura */}
        <circle cx="24" cy="24" r="21" stroke="url(#windBreeze)" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.35" />

        {/* WATER: Flowing tidal wave curling up */}
        <path
          d="M8 35C13 35 15 31 19 27C23 23 27 21 32 23C35.5 24.5 37 28 35 31.5C33.2 34.6 29.5 35.8 26 34.5C23.5 33.5 22.5 31 24.5 29C26.5 27 29 28 29.5 29.5"
          stroke="url(#waterFlow)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Second deeper ocean water wave */}
        <path
          d="M6 40C12 40 16 36 21 33C26 30 31 30 36 34C39 36.5 42 37 44 36"
          stroke="url(#waterFlow)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />

        {/* WIND: Dynamic swirling breeze gusts intertwining from top */}
        <path
          d="M6 14C12 14 17 10 23 10C30 10 36 14 38 20C39.5 24.5 37 29 32 29C28 29 25.5 26 27 22.5C28.5 19 32 19 33.5 21"
          stroke="url(#windBreeze)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Wind gust accent trail */}
        <path
          d="M10 20C15 20 19 16 25 16C31 16 35 18 39 16"
          stroke="url(#windBreeze)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />

        {/* Swirling wind vortex tip */}
        <path
          d="M14 8C19 8 23 6 28 6C32 6 34 8 36 7.5"
          stroke="url(#windBreeze)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />

        {/* Droplets / Breeze Sparkles */}
        <circle cx="39" cy="11" r="2" fill="url(#dropletGlow)" />
        <circle cx="43" cy="19" r="1.3" fill="#7dd3fc" />
        <circle cx="27" cy="42" r="1.5" fill="#38bdf8" />
        <circle cx="11" cy="27" r="1" fill="#bae6fd" />
      </svg>
    </div>
  );
};
