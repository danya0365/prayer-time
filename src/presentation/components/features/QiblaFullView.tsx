"use client";

import { calculateQiblaDirection, getCompassDirection, getAbsoluteHeading, QiblaInfo } from "@/utils/qibla-utils";
import { cn } from "@/utils/cn";
import { Navigation, Info, ShieldCheck, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocationStore } from "../../stores/locationStore";

interface QiblaFullViewProps {
  className?: string;
}

export function QiblaFullView({ className }: QiblaFullViewProps) {
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

  return (
    <div className={cn("w-full max-w-4xl mx-auto flex flex-col gap-12", className)}>
      {/* Immersive Compass Section */}
      <div className="relative flex flex-col items-center justify-center py-20 rounded-[4rem] bg-[#022c22]/60 backdrop-blur-3xl border border-[#D4AF37]/20 shadow-2xl overflow-hidden group">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1)_0%,transparent_70%)] animate-pulse" />
        
        {/* Static Mode Badge */}
        {isStaticMode && (
          <div className="absolute top-12 px-4 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full flex items-center gap-2 animate-fade-in z-20">
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
            <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">Static Mode (Reference)</span>
          </div>
        )}

        {/* Compass UI */}
        <div className="relative z-10">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Outer Ring with Ornaments */}
            <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]" />
            <div className="absolute -inset-4 rounded-full border border-[#D4AF37]/10" />
            
            {/* Degree Markings */}
            <div className="absolute inset-0">
               {[...Array(12)].map((_, i) => (
                 <div 
                   key={i} 
                   className="absolute top-0 left-1/2 w-0.5 h-4 bg-[#D4AF37]/40 origin-bottom" 
                   style={{ 
                     height: i % 3 === 0 ? '16px' : '8px',
                     transform: `translateX(-50%) rotate(${i * 30}deg) translateY(-340%)` 
                   }} 
                 />
               ))}
            </div>

            {/* Compass Circle */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#064e3b] to-[#022c22] border-2 border-[#D4AF37]/40 flex items-center justify-center shadow-inner">
               {/* Cardinal Directions */}
               <div className="absolute top-6 font-black text-2xl text-[#D4AF37]/80">N</div>
               <div className="absolute right-6 font-black text-2xl text-[#D4AF37]/40">E</div>
               <div className="absolute bottom-6 font-black text-2xl text-[#D4AF37]/40">S</div>
               <div className="absolute left-6 font-black text-2xl text-[#D4AF37]/40">W</div>

               {/* Central Kaaba Icon */}
               <div className="text-6xl z-20 hover:scale-110 transition-transform cursor-pointer">🕋</div>

               {/* Qibla Indicator Arrow */}
               <div 
                 className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out z-10"
                 style={{ transform: `rotate(${qiblaRelativeAngle}deg)` }}
               >
                 <div className="relative w-2 h-48 md:h-64 flex flex-col items-center">
                    {/* Arrow Head */}
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-[#D4AF37]" />
                    <div className="w-1.5 h-full bg-gradient-to-b from-[#D4AF37] to-transparent rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                 </div>
               </div>
            </div>
            
            {/* Center Hub Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#022c22] border-2 border-[#D4AF37]/40 flex items-center justify-center blur-[1px] opacity-20" />
          </div>
        </div>

        {/* Direction Text Overlay */}
        <div className="relative z-10 mt-12 flex flex-col items-center gap-2">
          <div className="text-5xl font-black text-white tracking-tighter">
            {qiblaInfo ? `${Math.round(qiblaInfo.direction)}°` : "--°"}
          </div>
          <div className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase">
            {compassDirection || "Calibrating..."}
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
              <h3 className="text-xl font-bold text-white">Your Location</h3>
           </div>
           
           <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[#D4AF37]/10">
                 <span className="text-white/40 font-medium">Latitude</span>
                 <span className="text-white font-mono">{currentLocation?.latitude?.toFixed(4) || "---"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#D4AF37]/10">
                 <span className="text-white/40 font-medium">Longitude</span>
                 <span className="text-white font-mono">{currentLocation?.longitude?.toFixed(4) || "---"}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                 <span className="text-white/40 font-medium">City</span>
                 <span className="text-[#D4AF37] font-bold">{currentLocation?.city || "Unknown Location"}</span>
              </div>
           </div>
        </div>

        {/* Qibla Details */}
        <div className="p-8 rounded-[2.5rem] bg-[#022c22]/40 backdrop-blur-xl border border-[#D4AF37]/20 flex flex-col gap-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center border border-[#D4AF37]/20">
                <Navigation className="text-[#D4AF37] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Qibla Stats</h3>
           </div>

           <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-[#D4AF37]/10">
                 <span className="text-white/40 font-medium">Distance</span>
                 <span className="text-white font-bold">{qiblaInfo ? `${Math.round(qiblaInfo.distance).toLocaleString()} km` : "--- km"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-[#D4AF37]/10">
                 <span className="text-white/40 font-medium">Precision</span>
                 <span className="text-emerald-400 font-bold">Standard Formula</span>
              </div>
              <div className="flex justify-between items-center py-3">
                 <span className="text-white/40 font-medium">Orientation</span>
                 <span className={cn("font-bold", isStaticMode ? "text-amber-400" : "text-emerald-400")}>
                   {isStaticMode ? "Static Reference" : "Real-time Sensor"}
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
               <h4 className="text-lg font-bold text-white">How to find Qibla</h4>
               <ul className="space-y-3">
                  {isStaticMode ? (
                    [
                      "MacBooks do not have built-in compass sensors",
                      "The compass above assumes the Top of your screen is True North",
                      "Align your MacBook so the screen points toward North",
                      "The arrow will then accurately show the direction to Mecca"
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3 text-white/60 text-sm font-medium">
                         <span className="text-[#D4AF37] font-bold">{i + 1}.</span>
                         {step}
                      </li>
                    ))
                  ) : (
                    [
                      "Lay your phone flat on a level surface away from magnets",
                      "Keep the device at a distance from electronic interference",
                      "If the direction seems off, move your phone in a 'figure 8' pattern",
                      "The compass arrow shows the final direction relative to magnetic North"
                    ].map((step, i) => (
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
                 <h5 className="text-xl font-black mb-1">Compass Permission Required</h5>
                 <p className="font-bold opacity-80">Enable motion sensors to use the real-time compass features.</p>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-[#022c22] text-white rounded-2xl font-black hover:scale-105 transition-transform"
              >
                Enable Now
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
