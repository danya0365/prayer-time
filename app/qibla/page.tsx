"use client";

import { QiblaFullView } from "@/src/presentation/components/features/QiblaFullView";
import { useTranslation } from "@/src/presentation/hooks/useTranslation";
import { useSettingsStore } from "@/src/presentation/stores/settingsStore";
import Link from "next/link";
import { ArrowLeft, Navigation } from "lucide-react";

export default function QiblaPage() {
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });

  return (
    <main className="min-h-screen relative bg-[#022c22] overflow-x-hidden py-12 px-4 dark">
      {/* Background Islamic Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L61.23 38.77 L100 50 L61.23 61.23 L50 100 L38.77 61.23 L0 50 L38.77 38.77 Z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Elegant Radial Gradient for Depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_30%,rgba(6,78,59,0.4)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[#D4AF37]/20 pb-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <div className="flex gap-4">
              <Link 
                href="/"
                className="group flex items-center gap-2 px-6 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#022c22] rounded-full transition-all duration-300 font-bold border border-[#D4AF37]/30"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                {t.ui.backToDashboard}
              </Link>
              
              <Link 
                href="/features"
                className="group flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-full transition-all duration-300 font-bold border border-white/10"
              >
                Features
              </Link>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                <Navigation className="w-8 h-8 text-[#D4AF37] animate-pulse" />
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  Qibla Direction
                </h1>
              </div>
              <p className="text-[#D4AF37]/70 font-medium text-lg max-w-2xl">
                Accurate Qibla calculation based on your current geographical coordinates.
              </p>
            </div>
          </div>

          <div className="hidden lg:block relative text-6xl opacity-20 hover:opacity-100 transition-opacity duration-700 cursor-default">
             🕋
          </div>
        </div>

        {/* Content Section */}
        <section className="animate-slide-up">
           <QiblaFullView />
        </section>

        {/* Footer info */}
        <div className="mt-12 text-center text-white/20 text-xs font-bold uppercase tracking-[0.5em] pb-12">
           Qibla Precision Tool • CleanCode 1986
        </div>
      </div>
    </main>
  );
}
