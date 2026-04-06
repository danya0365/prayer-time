"use client";

import { cn } from "@/utils/cn";
import { Translations } from "@/src/domain/types/translation";

interface QiblaCalibrationOverlayProps {
  t: Translations;
  progress: number;
  onSkip: () => void;
}

export function QiblaCalibrationOverlay({ t, progress, onSkip }: QiblaCalibrationOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#022c22]/90 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative w-full max-w-md p-10 rounded-[3rem] bg-white/5 border border-white/10 shadow-2xl flex flex-col items-center text-center gap-8 overflow-hidden group">
        {/* Animated Background Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D4AF37]/5 blur-[100px] rounded-full animate-pulse" />

        <div className="space-y-3 z-10">
          <h2 className="text-3xl font-black text-white tracking-tight">{t.qibla.calibrationTitle}</h2>
          <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs mx-auto">
            {t.qibla.calibrationDesc}
          </p>
        </div>

        {/* Figure-8 Animation Container */}
        <div className="relative w-48 h-48 flex items-center justify-center z-10">
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-white/5"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="46"
              cx="50"
              cy="50"
            />
            <circle
              className="text-[#D4AF37] transition-all duration-500 ease-out"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 46}
              strokeDashoffset={2 * Math.PI * 46 * (1 - progress / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="46"
              cx="50"
              cy="50"
            />
          </svg>

          {/* SVG Phone Animation */}
          <div className="relative w-full h-full flex items-center justify-center">
             <svg viewBox="0 0 100 100" className="w-32 h-32 text-[#D4AF37]">
                {/* The Path */}
                <path 
                  d="M50,50 C50,10 90,10 90,50 C90,90 50,90 50,50 C50,10 10,10 10,50 C10,90 50,90 50,50" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.5" 
                  strokeDasharray="2 2"
                  className="opacity-20"
                />
                {/* Animated Phone Shape */}
                <g className="animate-figure-8">
                   <rect x="42" y="38" width="16" height="24" rx="2" fill="currentColor" opacity="0.8" />
                   <rect x="43" y="39" width="14" height="22" rx="1.5" fill="#022c22" />
                   <circle cx="50" cy="59" r="1" fill="currentColor" />
                </g>
             </svg>
          </div>
        </div>

        {/* Progress Text */}
        <div className="space-y-4 z-10 w-full">
           <div className="flex justify-between items-center px-4 mb-2">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                {t.qibla.calibrationStatus.replace('{progress}', progress.toString())}
              </span>
              <span className="text-xl font-black text-[#D4AF37] tabular-nums">{progress}%</span>
           </div>
           
           <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-[#D4AF37] transition-all duration-700 ease-out shadow-[0_0_15px_rgba(212,175,55,0.5)]" 
                style={{ width: `${progress}%` }}
              />
           </div>
        </div>

        <button
          onClick={onSkip}
          className="z-10 mt-4 px-10 py-4 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-white/5"
        >
          {t.qibla.skipCalibration}
        </button>
      </div>
      
      <style jsx>{`
        .animate-figure-8 {
          offset-path: path("M50,50 C50,10 90,10 90,50 C90,90 50,90 50,50 C50,10 10,10 10,50 C10,90 50,90 50,50");
          animation: figure-8 3s infinite linear;
        }
        @keyframes figure-8 {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }
      `}</style>
    </div>
  );
}
