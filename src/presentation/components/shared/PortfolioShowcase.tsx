"use client";

import { usePromotionStore } from "@/src/presentation/stores/promotionStore";
import { useSettingsStore } from "@/src/presentation/stores/settingsStore";
import { cn } from "@/utils/cn";
import { ExternalLink, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

const PROMOTION_ID = "portfolio_showcase";
const DISMISS_DURATION_DAYS = 7;

export function PortfolioShowcase() {
  const { isPromotionDismissed, dismissPromotion } = usePromotionStore();
  const { settings } = useSettingsStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Delay visibility to not annoy user immediately (3 seconds)
    const timer = setTimeout(() => {
      if (!isPromotionDismissed(PROMOTION_ID, DISMISS_DURATION_DAYS)) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPromotionDismissed]);

  if (!isMounted || !isVisible) return null;

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsVisible(false);
    dismissPromotion(PROMOTION_ID);
  };

  return (
    <div 
      className={cn(
        "fixed bottom-6 right-6 z-50 animate-fade-in-up group",
        "w-[calc(100%-3rem)] sm:w-[380px]"
      )}
    >
      {/* Background with Glassmorphism and Gradient border */}
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-2xl p-4 transition-all duration-500 hover:border-emerald-500/50 hover:shadow-emerald-500/10">
        
        {/* Decorative Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors" />
        
        <div className="relative flex items-start gap-4">
          {/* Icon Area */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-grow pr-6">
            <h3 className="text-sm font-bold text-white mb-1">
              {settings.language === 'th' ? "อยากได้แอปสวยๆ แบบนี้ไหม?" : "Want a premium app like this?"}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-3">
              {settings.language === 'th' 
                ? "สำรวจผลงานคุณภาพจากทีมผู้พัฒนา เพื่อช่วยยกระดับธุรกิจของคุณ" 
                : "Explore high-quality products from our team to elevate your business."}
            </p>
            
            <a 
              href="https://cleancode1986-portfolio.vercel.app/portfolio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-lg text-xs font-bold transition-all duration-300 border border-emerald-500/20"
            >
              {settings.language === 'th' ? "ดูผลงานทั้งหมด" : "Visit Portfolio"}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Close Button */}
          <button 
            onClick={handleDismiss}
            className="absolute -top-1 -right-1 p-2 text-neutral-500 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title={settings.language === 'th' ? "ปิด (ซ่อน 7 วัน)" : "Dismiss (7 days)"}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
