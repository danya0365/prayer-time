"use client";

import MonthlyCalendar from "@/components/shared/MonthlyCalendar";
import FloatingSettingsButton from "@/components/ui/FloatingSettingsButton";
import { useTranslation } from "@/hooks/useTranslation";
import { useSettingsStore } from "@/stores/settingsStore";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CalendarPageClient() {
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Top navigation bar */}
      <div className="max-w-6xl mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                     card-bg border border-border card-shadow
                     hover:bg-primary/10 hover:border-primary/30 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
          <span className="text-muted group-hover:text-primary transition-colors">
            {t.dashboard.title}
          </span>
        </Link>
      </div>

      {/* Calendar section — full-width dedicated view */}
      <MonthlyCalendar language={settings.language} />

      <FloatingSettingsButton />
    </div>
  );
}
