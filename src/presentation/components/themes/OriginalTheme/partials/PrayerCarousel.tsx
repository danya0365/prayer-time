"use client";

import { Language } from "@/src/domain/types/translation";
import { useTranslation } from "@/src/presentation/hooks/useTranslation";
import { cn } from "@/utils/cn";
import { PrayerInfo, formatPrayerTime } from "@/utils/prayer-utils";
import { animated, config, useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useEffect, useState, useRef } from "react";

interface PrayerCarouselProps {
  prayers: PrayerInfo[];
  currentPrayer: PrayerInfo | null;
  language: Language;
}

export default function PrayerCarousel({
  prayers,
  currentPrayer,
  language,
}: PrayerCarouselProps) {
  const { t } = useTranslation({ language });
  
  // Constants for carousel layout
  const CARD_WIDTH = 120; // Matches the spacing used in effects
  
  // Find index of current prayer or default to 0
  const initialIndex = prayers.findIndex(p => p.name === currentPrayer?.name);
  const [activeIndex, setActiveIndex] = useState(initialIndex !== -1 ? initialIndex : 0);
  
  // ref to track dragging state to prevent clicks during drag
  const isDragging = useRef(false);
  
  // Update active index if current prayer changes externally
  useEffect(() => {
    if (currentPrayer) {
      const idx = prayers.findIndex(p => p.name === currentPrayer.name);
      if (idx !== -1) setActiveIndex(idx);
    }
  }, [currentPrayer, prayers]);

  const [springs, api] = useSprings(prayers.length, (index) => {
    const offset = index - activeIndex;
    
    return {
      x: offset * CARD_WIDTH,
      scale: 1,
      opacity: 1,
      zIndex: index === activeIndex ? 10 : 1,
      config: config.gentle,
    };
  }, [activeIndex]);

  // Handle drag gestures
  const bind = useDrag(({ active, movement: [mx], direction: [xDir], distance: [dx], cancel }) => {
    if (active) {
      isDragging.current = dx > 5;
      api.start((i) => {
        const offset = i - activeIndex;
        return { 
          x: offset * CARD_WIDTH + mx, 
          scale: 1,
          zIndex: i === activeIndex ? 10 : 1,
          immediate: true 
        };
      });
    } else {
      // On release, determine if we should snap to a new index
      setTimeout(() => { isDragging.current = false; }, 0);
      
      let nextIndex = activeIndex;
      const swipeThreshold = CARD_WIDTH / 3;
      
      if (Math.abs(mx) > swipeThreshold) {
        nextIndex = mx > 0 ? activeIndex - 1 : activeIndex + 1;
      }
      
      // Clamp index
      nextIndex = Math.max(0, Math.min(prayers.length - 1, nextIndex));
      setActiveIndex(nextIndex);
    }
  }, {
    axis: 'x',
    filterTaps: true,
  });

  // Update springs when activeIndex changes
  useEffect(() => {
    api.start((index) => {
      const offset = index - activeIndex;
      
      return {
        x: offset * CARD_WIDTH,
        scale: 1,
        opacity: 1,
        zIndex: index === activeIndex ? 10 : 1,
        immediate: false,
        config: config.gentle,
      };
    });
  }, [activeIndex, api]);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Carousel Container */}
      <div 
        {...bind()}
        className="relative w-full h-[150px] sm:h-[200px] flex items-center justify-center overflow-hidden px-4 touch-pan-y select-none cursor-grab active:cursor-grabbing"
      >
        {/* Animated Cards */}
        <div className="relative flex items-center justify-center w-full pointer-events-none">
          {springs.map((style, i) => {
            const prayer = prayers[i];
            const isCenter = i === activeIndex;
            // More reliable check for active prayer status
            const isPrayerActive = prayer.isCurrent || (currentPrayer && prayer.name === currentPrayer.name);

            return (
              <animated.div
                key={prayer.name}
                style={style}
                className="absolute"
              >
                <div 
                  onClick={() => {
                    if (!isDragging.current) {
                      setActiveIndex(i);
                    }
                  }}
                  className={cn(
                    "w-24 h-36 sm:w-28 sm:h-40 rounded-[1.5rem] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 relative bg-[#064e3b] border border-[#D4AF37]/20 shadow-xl overflow-hidden pointer-events-auto"
                  )}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider mb-2 text-[#D4AF37]">
                    {t.prayers[prayer.name as keyof typeof t.prayers]}
                  </span>
                  
                  <span className="text-xl font-black mb-1 text-white">
                    {formatPrayerTime(prayer.time, language)}
                  </span>

                  {/* Icon Overlay */}
                  <div className="mt-2 text-xl opacity-90">
                    {prayer.emoji}
                  </div>

                  {/* Active Text Badge inside - Pulse Animated as requested */}
                  {isPrayerActive && (
                    <div className="mt-3 px-2 py-0.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                       <p className="text-[#D4AF37] text-[7px] font-black uppercase tracking-tighter">
                         {t.ui.current}
                       </p>
                    </div>
                  )}
                </div>
              </animated.div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center gap-2 mt-4">
        {prayers.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === activeIndex 
                ? "w-6 bg-[#A855F7] shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                : "w-1.5 bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
