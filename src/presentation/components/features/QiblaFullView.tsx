"use client";

import { calculateQiblaDirection, getCompassDirection, getAbsoluteHeading, QiblaInfo } from "@/utils/qibla-utils";
import { cn } from "@/utils/cn";
import { Navigation, Info, ShieldCheck, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocationStore } from "../../stores/locationStore";
import { useTranslation } from "../../hooks/useTranslation";
import { useSettingsStore } from "../../stores/settingsStore";

interface QiblaFullViewProps {
  className?: string;
}

export function QiblaFullView({ className }: QiblaFullViewProps) {
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });
  const { currentLocation } = useLocationStore();
  const [qiblaInfo, setQiblaInfo] = useState<QiblaInfo | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [isStaticMode, setIsStaticMode] = useState<boolean>(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (currentLocation?.latitude && currentLocation?.longitude) {
      const info = calculateQiblaDirection(currentLocation.latitude, currentLocation.longitude);
      setQiblaInfo(info);
    }
  }, [currentLocation]);

  useEffect(() => {
    if (!mounted) return;

    const requestOrientationPermission = async () => {
      const DeviceEvent = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<"granted" | "denied">;
      };

      if (typeof DeviceEvent.requestPermission === "function") {
        try {
          const permission = await DeviceEvent.requestPermission();
          const granted = permission === "granted";
          setPermissionGranted(granted);
          if (granted) setIsStaticMode(false);
        } catch (error) {
          console.error("Error requesting device orientation permission:", error);
        }
      } else if (typeof DeviceOrientationEvent !== "undefined") {
        // Non-iOS or older Android
        setPermissionGranted(true);
        // We'll set static mode false later if we actually get data
      }
    };

    requestOrientationPermission();
  }, [mounted]);

  useEffect(() => {
    if (!permissionGranted || !mounted) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const heading = getAbsoluteHeading(event);
      if (heading !== null) {
        setDeviceHeading(heading);
        if (isStaticMode) setIsStaticMode(false);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    if ("ondeviceorientationabsolute" in window) {
      window.addEventListener("deviceorientationabsolute", handleOrientation);
    }
    
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("deviceorientationabsolute", handleOrientation);
    };
  }, [permissionGranted, mounted, isStaticMode]);

  if (!mounted) return null;

  const qiblaRelativeAngle = qiblaInfo ? qiblaInfo.direction - deviceHeading : 0;
  const compassDirection = qiblaInfo ? getCompassDirection(qiblaInfo.direction) : "";

  // Normalizing angle to -180 to 180 for easier calculations
  const normalizedRelativeAngle = ((((qiblaRelativeAngle + 180) % 360) + 360) % 360) - 180;
  const isAligned = Math.abs(normalizedRelativeAngle) < 3;

  return (
    <div className={cn("w-full max-w-4xl mx-auto flex flex-col gap-12", className)}>
      {/* Immersive Compass Section */}
      <div className={cn(
        "relative flex flex-col items-center justify-center py-20 rounded-[4rem] transition-all duration-700 overflow-hidden group",
        isAligned 
          ? "bg-[#064e3b]/80 border-emerald-500/40 shadow-[0_0_80px_rgba(16,185,129,0.15)]" 
          : "bg-[#022c22]/60 border-[#D4AF37]/20 shadow-2xl"
      )}>
        {/* Animated Background Glow */}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          isAligned 
            ? "bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2)_0%,transparent_70%)]" 
            : "bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1)_0%,transparent_70%)] opacity-30"
        )} />
        
        {/* State Badge */}
        <div className="absolute top-12 z-20 flex flex-col items-center gap-2">
          {isStaticMode && (
            <div className="px-4 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full flex items-center gap-2 animate-fade-in">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">{t.qibla.staticReference}</span>
            </div>
          )}
          
          {isAligned && (
            <div className="px-6 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center gap-3 animate-bounce shadow-lg backdrop-blur-md">
              <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span className="text-emerald-400 text-xs font-black uppercase tracking-[0.2em]">{t.qibla.meccaAligned}</span>
            </div>
          )}
        </div>

        {/* Compass UI */}
        <div className="relative z-10 transition-transform duration-500">
          <div className={cn(
            "relative w-72 h-72 md:w-96 md:h-96 transition-all duration-700",
            isAligned ? "scale-105" : ""
          )}>
            {/* Outer Ring with Ornaments */}
            <div className={cn(
               "absolute inset-0 rounded-full border-4 transition-colors duration-700",
               isAligned ? "border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.2)]" : "border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]"
            )} />
            <div className="absolute -inset-4 rounded-full border border-white/5" />
            
            {/* Degree Markings */}
            <div className="absolute inset-0">
               {[...Array(12)].map((_, i) => (
                 <div 
                   key={i} 
                   className={cn(
                     "absolute top-0 left-1/2 w-0.5 h-4 origin-bottom transition-colors duration-700",
                     isAligned ? "bg-emerald-500/40" : "bg-[#D4AF37]/40"
                   )} 
                   style={{ 
                     height: i % 3 === 0 ? '16px' : '8px',
                     transform: `translateX(-50%) rotate(${i * 30}deg) translateY(-340%)` 
                   }} 
                 />
               ))}
            </div>

            {/* Compass Circle */}
            <div className={cn(
              "absolute inset-4 rounded-full transition-all duration-700 border-2 flex items-center justify-center shadow-inner",
              isAligned 
                ? "bg-gradient-to-br from-[#064e3b] to-[#014737] border-emerald-400/50" 
                : "bg-gradient-to-br from-[#064e3b] to-[#022c22] border-[#D4AF37]/40"
            )}>
               {/* Cardinal Directions */}
               <div className={cn("absolute top-6 font-black text-2xl transition-colors", isAligned ? "text-emerald-400" : "text-[#D4AF37]/80")}>N</div>
               <div className="absolute right-6 font-black text-2xl text-white/5">E</div>
               <div className="absolute bottom-6 font-black text-2xl text-white/5">S</div>
               <div className="absolute left-6 font-black text-2xl text-white/5">W</div>

               {/* Central Kaaba Icon */}
               <div className={cn(
                 "text-6xl z-20 transition-all duration-700",
                 isAligned ? "scale-125 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "hover:scale-110"
               )}>🕋</div>

               {/* Qibla Indicator Arrow */}
               <div 
                 className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out z-10"
                 style={{ transform: `rotate(${qiblaRelativeAngle}deg)` }}
               >
                 <div className="relative w-2 h-48 md:h-64 flex flex-col items-center">
                    {/* Arrow Head */}
                    <div className={cn(
                      "w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] transition-colors duration-700",
                      isAligned ? "border-b-emerald-400" : "border-b-[#D4AF37]"
                    )} />
                    <div className={cn(
                      "w-1.5 h-full rounded-full transition-all duration-700",
                      isAligned 
                        ? "bg-gradient-to-b from-emerald-400 to-transparent shadow-[0_0_25px_rgba(52,211,153,0.8)]" 
                        : "bg-gradient-to-b from-[#D4AF37] to-transparent shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                    )} />
                 </div>
               </div>
            </div>
            
            {/* Center Hub Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#022c22] border-2 border-[#D4AF37]/40 flex items-center justify-center blur-[1px] opacity-20" />
          </div>
        </div>

        {/* Direction Text Overlay */}
        <div className="relative z-10 mt-12 flex flex-col items-center gap-2">
          <div className={cn(
            "text-5xl font-black tracking-tighter transition-colors duration-700",
            isAligned ? "text-emerald-400" : "text-white"
          )}>
            {qiblaInfo ? `${Math.round(qiblaInfo.direction)}°` : "--°"}
          </div>
          <div className={cn(
            "font-black tracking-[0.3em] uppercase transition-colors duration-700",
            isAligned ? "text-emerald-400/80" : "text-[#D4AF37]"
          )}>
            {isAligned ? t.qibla.stopOrientation : (compassDirection || t.qibla.calibrating)}
          </div>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Location Info */}
        <div className="p-8 rounded-[2.5rem] bg-[#022c22]/40 backdrop-blur-xl border border-[#D4AF37]/20 flex flex-col gap-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center border border-[#D4AF37]/20">
                <MapPin className="text-[#D4AF37] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{t.qibla.yourLocation}</h3>
           </div>
           
           <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[#D4AF37]/10">
                 <span className="text-white/40 font-medium">{t.qibla.latitude}</span>
                 <span className="text-white font-mono">{currentLocation?.latitude?.toFixed(4) || "---"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#D4AF37]/10">
                 <span className="text-white/40 font-medium">{t.qibla.longitude}</span>
                 <span className="text-white font-mono">{currentLocation?.longitude?.toFixed(4) || "---"}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                 <span className="text-white/40 font-medium">{t.qibla.city}</span>
                 <span className="text-[#D4AF37] font-bold">{currentLocation?.city || t.qibla.unknownLocation}</span>
              </div>
           </div>
        </div>

        {/* Qibla Details */}
        <div className="p-8 rounded-[2.5rem] bg-[#022c22]/40 backdrop-blur-xl border border-[#D4AF37]/20 flex flex-col gap-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center border border-[#D4AF37]/20">
                <Navigation className="text-[#D4AF37] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{t.qibla.qiblaStats}</h3>
           </div>

           <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[#D4AF37]/10">
                 <span className="text-white/40 font-medium">{t.qibla.distance}</span>
                 <span className="text-white font-bold">{qiblaInfo ? `${Math.round(qiblaInfo.distance).toLocaleString()} km` : "--- km"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#D4AF37]/10">
                 <span className="text-white/40 font-medium">{t.qibla.precision}</span>
                 <span className="text-emerald-400 font-bold">{t.qibla.standardFormula}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                 <span className="text-white/40 font-medium">{t.qibla.orientation}</span>
                 <span className={cn("font-bold", isStaticMode ? "text-amber-400" : "text-emerald-400")}>
                   {isStaticMode ? t.qibla.staticReference : t.qibla.realTimeSensor}
                 </span>
              </div>
           </div>
        </div>
      </div>

      {/* Instructions & Calibration */}
      <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#064e3b]/30 to-[#022c22]/30 backdrop-blur-xl border border-[#D4AF37]/10">
         <div className="flex items-start gap-6">
            <div className="w-12 h-12 shrink-0 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
               <Info className="text-[#D4AF37] w-6 h-6" />
            </div>
            <div className="space-y-4">
               <h4 className="text-lg font-bold text-white">{t.qibla.howToFind}</h4>
               <ul className="space-y-3">
                  {isStaticMode ? (
                    t.qibla.desktopSteps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-white/60 text-sm font-medium">
                         <span className="text-[#D4AF37] font-bold">{i + 1}.</span>
                         {step}
                      </li>
                    ))
                  ) : (
                    t.qibla.calibrationSteps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-white/60 text-sm font-medium">
                         <span className="text-[#D4AF37] font-bold">{i + 1}.</span>
                         {step}
                      </li>
                    ))
                  )}
               </ul>
            </div>
         </div>
      </div>

      {/* Device Permission Banner if not granted and NOT on Desktop */}
      {!permissionGranted && mounted && !isStaticMode && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-6 flex justify-center">
           <div className="bg-[#D4AF37] text-[#022c22] p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-6 max-w-4xl border-4 border-[#022c22]">
              <div className="w-16 h-16 bg-[#022c22]/10 rounded-full flex items-center justify-center">
                 <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="text-center md:text-left">
                 <h5 className="text-xl font-black mb-1">{t.qibla.permissionRequired}</h5>
                 <p className="font-bold opacity-80">{t.qibla.permissionDesc}</p>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-[#022c22] text-white rounded-2xl font-black hover:scale-105 transition-transform"
              >
                {t.qibla.enableNow}
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
