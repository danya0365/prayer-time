"use client";

import { useLocationMismatch } from "@/src/presentation/hooks/useLocationMismatch";
import { useTranslation } from "@/src/presentation/hooks/useTranslation";
import { useSettingsStore } from "@/src/presentation/stores/settingsStore";
import { cn } from "@/utils/cn";
import { AlertCircle, MapPin } from "lucide-react";

interface LocationWarningBannerProps {
  onUpdateLocation?: () => void;
  className?: string;
  variant?: "floating" | "inline";
}

export function LocationWarningBanner({ 
  onUpdateLocation, 
  className,
  variant = "floating"
}: LocationWarningBannerProps) {
  const { isMismatch, distance } = useLocationMismatch(50);
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });

  if (!isMismatch) return null;

  const content = (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
      <div className="flex items-center gap-3">
        <div className="bg-red-500/20 p-2 rounded-full shrink-0">
          <AlertCircle className="w-5 h-5 text-red-400" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-white">
            {settings.language === 'th' 
              ? "ดูเหมือนคุณจะเดินทางไปยังพื้นที่อื่น" 
              : "It looks like you are in a different location"}
          </p>
          <p className="text-xs text-white/70">
            {settings.language === 'th' 
              ? `พิกัดปัจจุบันห่างจากที่ตั้งค่าไว้ประมาณ ${Math.round(distance || 0)} กม. เวลาละหมาดอาจคลาดเคลื่อน` 
              : `Current location is ${Math.round(distance || 0)}km from settings. Prayer times may be inaccurate.`}
          </p>
        </div>
      </div>
      
      <button
        onClick={onUpdateLocation}
        className="flex items-center justify-center gap-2 whitespace-nowrap bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors w-full sm:w-auto shadow-lg shadow-red-500/20"
      >
        <MapPin className="w-4 h-4" />
        {settings.language === 'th' ? "อัปเดตสถานที่" : "Update Location"}
      </button>
    </div>
  );

  if (variant === "inline") {
    return (
      <div className={cn(
        "w-full bg-red-950/40 border border-red-500/30 rounded-2xl p-4 backdrop-blur-md animate-fade-in-up",
        className
      )}>
        {content}
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50 bg-neutral-900/90 border border-red-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-fade-in-down",
      className
    )}>
      {content}
    </div>
  );
}
