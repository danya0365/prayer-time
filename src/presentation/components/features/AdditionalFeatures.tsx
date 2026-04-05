import { IslamicCalendar } from "@/src/presentation/components/ui/IslamicCalendar";
import { QiblaCompass } from "@/src/presentation/components/ui/QiblaCompass";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Compass, CalendarRange } from "lucide-react";

interface AdditionalFeaturesProps {
  latitude?: number;
  longitude?: number;
  language?: "en" | "th" | "ar";
  className?: string;
}

export function AdditionalFeatures({
  latitude,
  longitude,
  language = "en",
  className,
}: AdditionalFeaturesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("w-full max-w-4xl mx-auto mt-8", className)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-pulse">
            <div className="h-64 bg-card-bg rounded-xl border border-card-border" />
          </div>
          <div className="animate-pulse">
            <div className="h-64 bg-card-bg rounded-xl border border-card-border" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Qibla Compass Preview Card */}
        <Link
          href="/qibla"
          className="relative group/feature rounded-[2.5rem] bg-[#022c22]/40 backdrop-blur-xl border border-[#D4AF37]/20 p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] hover:border-[#D4AF37]/50 hover:bg-[#022c22]/60"
        >
          {/* Ornaments */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#D4AF37]/30 rounded-tl-xl transition-all group-hover/feature:border-[#D4AF37]/60" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#D4AF37]/30 rounded-tr-xl transition-all group-hover/feature:border-[#D4AF37]/60" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2">
                 <Compass className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                 <h3 className="text-[#D4AF37] text-sm font-black tracking-[0.2em] uppercase">Qibla Direction</h3>
               </div>
               <div className="w-8 h-8 bg-[#D4AF37]/10 rounded-full flex items-center justify-center border border-[#D4AF37]/20 transition-transform group-hover/feature:rotate-45">
                 <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
               </div>
            </div>
            
            <div className="relative mx-auto w-fit transition-transform group-hover/feature:scale-110 duration-700">
               <QiblaCompass
                 latitude={latitude}
                 longitude={longitude}
                 className="h-fit bg-transparent border-0 p-0 shadow-none hover:bg-transparent"
               />
            </div>

            <div className="mt-8 flex justify-center">
               <span className="px-6 py-2 bg-[#D4AF37] text-[#022c22] text-xs font-black rounded-full uppercase tracking-widest opacity-0 group-hover/feature:opacity-100 transition-opacity duration-300">
                 Launch Full Compass
               </span>
            </div>
          </div>
        </Link>

        {/* Islamic Calendar Preview Card */}
        <div className="relative group/feature rounded-[2.5rem] bg-[#022c22]/40 backdrop-blur-xl border border-[#D4AF37]/20 p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:border-[#D4AF37]/40 overflow-hidden cursor-default">
          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 bg-[#022c22]/40 backdrop-blur-[2px] z-20 flex items-center justify-center pointer-events-none">
             <div className="px-6 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em] rotate-12 shadow-2xl">
               Dedicated Page Soon
             </div>
          </div>

          {/* Ornaments */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#D4AF37]/30 rounded-tl-xl" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#D4AF37]/30 rounded-tr-xl" />

          <div className="relative z-10 grayscale-[0.5]">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <CalendarRange className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-[#D4AF37] text-sm font-black tracking-[0.2em] uppercase">Islamic Date</h3>
            </div>
            <IslamicCalendar 
              language={language} 
              className="h-fit bg-transparent border-0 p-0 shadow-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
