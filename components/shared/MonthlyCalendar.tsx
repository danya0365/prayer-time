"use client";

import { format, getDay, isSameDay } from "date-fns";
import { enUS, th } from "date-fns/locale";
import { Calendar, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useMonthlyPrayerTimes } from "../../hooks/useMonthlyPrayerTimes";
import { useTranslation } from "../../hooks/useTranslation";
import { Language } from "../../types/translation";

interface MonthlyCalendarProps {
  language?: Language;
}

const localeMap = { en: enUS, th: th, ar: enUS } as const;

export default function MonthlyCalendar({
  language = "en",
}: MonthlyCalendarProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const { t } = useTranslation({ language });

  const days = useMonthlyPrayerTimes({ year, month, language });

  const goToPreviousMonth = useCallback(() => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  }, []);

  const monthLabel = format(new Date(year, month), "MMMM yyyy", {
    locale: localeMap[language],
  });

  const dayHeaders = [
    t.calendar.sun,
    t.calendar.mon,
    t.calendar.tue,
    t.calendar.wed,
    t.calendar.thu,
    t.calendar.fri,
    t.calendar.sat,
  ];

  // Calculate empty cells before the first day
  const firstDayOfWeek = days.length > 0 ? getDay(days[0].date) : 0;

  const prayerLabels = [
    { key: "fajr" as const, emoji: "🌅", label: t.prayers.fajr },
    { key: "dhuhr" as const, emoji: "☀️", label: t.prayers.dhuhr },
    { key: "asr" as const, emoji: "🌤️", label: t.prayers.asr },
    { key: "maghrib" as const, emoji: "🌆", label: t.prayers.maghrib },
    { key: "isha" as const, emoji: "🌙", label: t.prayers.isha },
  ];

  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  return (
    <section className="w-full max-w-6xl mx-auto mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {t.calendar.monthlyCalendar}
          </h2>
          <Link
            href="/calendar"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
                       bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {t.calendar.viewFullCalendar}
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {!isCurrentMonth && (
            <button
              onClick={goToToday}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {t.calendar.today}
            </button>
          )}
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg card-bg border border-border hover:bg-primary/10 transition-colors"
            aria-label={t.calendar.previousMonth}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="min-w-[140px] text-center font-semibold text-foreground capitalize">
            {monthLabel}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg card-bg border border-border hover:bg-primary/10 transition-colors"
            aria-label={t.calendar.nextMonth}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop/Tablet: Grid Calendar */}
      <div className="hidden md:block rounded-2xl border border-border overflow-hidden card-bg card-shadow">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {dayHeaders.map((d, i) => (
            <div
              key={i}
              className={`py-3 text-center text-sm font-semibold uppercase tracking-wider ${
                i === 5
                  ? "text-primary bg-primary/5"
                  : "text-muted"
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="min-h-[130px] border-b border-r border-border/50"
            />
          ))}

          {days.map((day) => {
            const isToday = isSameDay(day.date, today);
            const isFriday = getDay(day.date) === 5;
            return (
              <div
                key={day.date.toISOString()}
                className={`min-h-[130px] border-b border-r border-border/50 p-2 transition-colors ${
                  isToday
                    ? "bg-primary/8 ring-2 ring-primary/30 ring-inset"
                    : isFriday
                    ? "bg-primary/3"
                    : "hover:bg-muted-light/50"
                }`}
              >
                {/* Day number */}
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-sm font-bold leading-none ${
                      isToday
                        ? "bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center"
                        : "text-foreground"
                    }`}
                  >
                    {format(day.date, "d")}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-semibold text-primary uppercase tracking-wide">
                      {t.calendar.today}
                    </span>
                  )}
                </div>

                {/* Prayer times */}
                <div className="space-y-0.5">
                  {prayerLabels.map((p) => (
                    <div
                      key={p.key}
                      className="flex items-center justify-between text-[10px] leading-tight"
                    >
                      <span className="text-muted truncate">
                        {p.emoji}
                      </span>
                      <span className="font-mono text-foreground/80">
                        {day[p.key]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: List/Card layout */}
      <div className="md:hidden space-y-3">
        {days.map((day) => {
          const isToday = isSameDay(day.date, today);
          const dayName = format(day.date, "EEE", {
            locale: localeMap[language],
          });
          return (
            <div
              key={day.date.toISOString()}
              className={`rounded-xl border p-4 transition-all ${
                isToday
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border card-bg card-shadow"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-lg font-bold ${
                      isToday
                        ? "bg-primary text-white w-9 h-9 rounded-full flex items-center justify-center"
                        : "text-foreground"
                    }`}
                  >
                    {format(day.date, "d")}
                  </span>
                  <span className="text-sm text-muted capitalize">
                    {dayName}
                  </span>
                </div>
                {isToday && (
                  <span className="text-xs font-semibold bg-primary text-white px-2.5 py-0.5 rounded-full">
                    {t.calendar.today}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-5 gap-1">
                {prayerLabels.map((p) => (
                  <div
                    key={p.key}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <span className="text-[10px] text-muted">
                      {p.emoji}
                    </span>
                    <span className="text-xs font-mono text-foreground/80">
                      {day[p.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted">
        {prayerLabels.map((p) => (
          <span key={p.key} className="flex items-center gap-1">
            {p.emoji} {p.label}
          </span>
        ))}
      </div>
    </section>
  );
}
