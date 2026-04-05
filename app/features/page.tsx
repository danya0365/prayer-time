"use client";

import { AdditionalFeatures } from "@/src/presentation/components/features/AdditionalFeatures";
import { FutureFeatures } from "@/src/presentation/components/features/FutureFeatures";
import { MockupShowcase } from "@/src/presentation/components/features/MockupShowcase";
import { useTranslation } from "@/src/presentation/hooks/useTranslation";
import { useSettingsStore } from "@/src/presentation/stores/settingsStore";
import { useLocationStore } from "@/src/presentation/stores/locationStore";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function FeaturesPage() {
  const { settings } = useSettingsStore();
  const { currentLocation } = useLocationStore();
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

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header with Back Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[#D4AF37]/20 pb-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <Link 
              href="/"
              className="group flex items-center gap-2 px-6 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#022c22] rounded-full transition-all duration-300 font-bold border border-[#D4AF37]/30"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              {t.ui.backToDashboard || "Back to Dashboard"}
            </Link>
            
            <div>
              <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                <Sparkles className="w-8 h-8 text-[#D4AF37] animate-pulse" />
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  {t.ui.additionalFeatures || "Additional Features"}
                </h1>
              </div>
              <p className="text-[#D4AF37]/70 font-medium text-lg max-w-2xl">
                Explore our experimental features and upcoming tools designed to enhance your spiritual journey.
              </p>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="w-32 h-32 bg-[#D4AF37]/20 rounded-[2.5rem] flex items-center justify-center border border-[#D4AF37]/40 shadow-2xl rotate-12 animate-float">
               <span className="text-6xl">💡</span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <section className="animate-slide-up">
           <AdditionalFeatures 
             latitude={currentLocation?.latitude}
             longitude={currentLocation?.longitude}
             language={settings.language}
           />
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent mx-auto w-full max-w-4xl" />

        <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <MockupShowcase />
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent mx-auto w-full max-w-4xl" />

        <section className="animate-slide-up pb-12" style={{ animationDelay: '0.4s' }}>
          <FutureFeatures />
        </section>
      </div>
    </main>
  );
}
