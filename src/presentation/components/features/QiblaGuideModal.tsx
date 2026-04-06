"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/utils/cn";
import { X, ChevronRight, ChevronLeft, CheckCircle2, Lightbulb } from "lucide-react";
import { Translations } from "@/src/domain/types/translation";

const STORAGE_KEY = "qibla-guide-dismissed";

interface QiblaGuideModalProps {
  t: Translations;
  onClose: () => void;
}

export function QiblaGuideModal({ t, onClose }: QiblaGuideModalProps) {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = welcome screen
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const guide = t.qiblaGuide;
  const totalSteps = guide.steps.length;

  const handleClose = useCallback(() => {
    setIsClosing(true);
    if (dontShowAgain) {
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch { /* ignore */ }
    }
    setTimeout(() => {
      onClose();
    }, 300);
  }, [dontShowAgain, onClose]);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > -1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const step = currentStep >= 0 ? guide.steps[currentStep] : null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 transition-all duration-300",
        isClosing ? "opacity-0" : "opacity-100"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[2.5rem] transition-all duration-500",
          "bg-gradient-to-br from-[#022c22]/95 to-[#0a3d2e]/95 backdrop-blur-2xl",
          "border border-[#D4AF37]/30 shadow-[0_0_80px_rgba(212,175,55,0.1)]",
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        )}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Welcome Screen */}
        {currentStep === -1 && (
          <div className="p-10 flex flex-col items-center text-center gap-8">
            {/* Animated Kaaba Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative text-8xl animate-bounce-slow">🕋</div>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-black text-white tracking-tight">
                {guide.title}
              </h2>
              <p className="text-white/50 text-sm font-medium leading-relaxed max-w-sm mx-auto">
                {guide.subtitle}
              </p>
            </div>

            {/* Step Preview Dots */}
            <div className="flex items-center gap-6">
              {guide.steps.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="text-2xl">{s.icon}</div>
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]/40" />
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 px-8 bg-gradient-to-r from-[#D4AF37] to-[#c9a030] text-[#022c22] rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#D4AF37]/20"
            >
              {guide.startButton}
            </button>

            {/* Don't show again */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={cn(
                "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                dontShowAgain
                  ? "bg-[#D4AF37] border-[#D4AF37]"
                  : "border-white/20 group-hover:border-white/40"
              )}>
                {dontShowAgain && <CheckCircle2 className="w-3.5 h-3.5 text-[#022c22]" />}
              </div>
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="sr-only"
              />
              <span className="text-white/30 text-xs font-bold uppercase tracking-widest group-hover:text-white/50 transition-colors">
                {guide.dontShowAgain}
              </span>
            </label>
          </div>
        )}

        {/* Step Content */}
        {step && (
          <div className="p-10 flex flex-col gap-8">
            {/* Step Progress */}
            <div className="flex items-center gap-1.5">
              {guide.steps.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === currentStep
                      ? "flex-[3] bg-[#D4AF37]"
                      : i < currentStep
                        ? "flex-1 bg-emerald-500/60"
                        : "flex-1 bg-white/10"
                  )}
                />
              ))}
            </div>

            {/* Step Number */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-[#D4AF37]/60 uppercase tracking-[0.3em]">
                {currentStep + 1}/{totalSteps}
              </span>
            </div>

            {/* Icon + Title */}
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-3xl">
                {step.icon}
              </div>
              <div className="space-y-2 pt-1">
                <h3 className="text-2xl font-black text-white leading-tight">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Tips */}
            <div className="space-y-3 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">Tips</span>
              </div>
              {step.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-white/70 text-sm font-medium leading-relaxed">
                    {tip}
                  </span>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all font-bold text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                {guide.prevButton}
              </button>

              <button
                onClick={handleNext}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all",
                  currentStep === totalSteps - 1
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
                    : "bg-[#D4AF37] text-[#022c22] hover:scale-[1.02]"
                )}
              >
                {currentStep === totalSteps - 1 ? guide.doneButton : guide.nextButton}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Don't show again (also on last step) */}
            {currentStep === totalSteps - 1 && (
              <label className="flex items-center justify-center gap-3 cursor-pointer group pt-2">
                <div className={cn(
                  "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                  dontShowAgain
                    ? "bg-[#D4AF37] border-[#D4AF37]"
                    : "border-white/20 group-hover:border-white/40"
                )}>
                  {dontShowAgain && <CheckCircle2 className="w-3.5 h-3.5 text-[#022c22]" />}
                </div>
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="sr-only"
                />
                <span className="text-white/30 text-xs font-bold uppercase tracking-widest group-hover:text-white/50 transition-colors">
                  {guide.dontShowAgain}
                </span>
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Check if the guide should be shown (not dismissed by user)
 */
export function shouldShowQiblaGuide(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) !== "true";
  } catch {
    return true;
  }
}
