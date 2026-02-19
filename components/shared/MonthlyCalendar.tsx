"use client";

import { format, getDay, isSameDay } from "date-fns";
import { enUS, th } from "date-fns/locale";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    LayoutGrid,
    List,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useMonthlyPrayerTimes } from "../../hooks/useMonthlyPrayerTimes";
import { useTranslation } from "../../hooks/useTranslation";
import { Language } from "../../types/translation";

type DisplayMode = "grid" | "list";

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
  const [displayMode, setDisplayMode] = useState<DisplayMode>("grid");
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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
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
          {/* Display mode toggle */}
          <div className="flex items-center rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setDisplayMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                displayMode === "grid"
                  ? "bg-primary text-white"
                  : "card-bg text-muted hover:text-foreground"
              }`}
              aria-label={t.calendar.gridView}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              {t.calendar.gridView}
            </button>
            <button
              onClick={() => setDisplayMode("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                displayMode === "list"
                  ? "bg-primary text-white"
                  : "card-bg text-muted hover:text-foreground"
              }`}
              aria-label={t.calendar.listView}
            >
              <List className="w-3.5 h-3.5" />
              {t.calendar.listView}
            </button>
          </div>

          {/* Month navigation */}
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

      {/* ═══════════════════════  GRID MODE  ═══════════════════════ */}
      {displayMode === "grid" && (
        <>
          {/* Desktop/Tablet: Grid Calendar */}
          <div className="hidden md:block rounded-2xl border border-border overflow-hidden card-bg card-shadow">
            <div className="grid grid-cols-7 border-b border-border">
              {dayHeaders.map((d, i) => (
                <div
                  key={i}
                  className={`py-3 text-center text-sm font-semibold uppercase tracking-wider ${
                    i === 5 ? "text-primary bg-primary/5" : "text-muted"
                  }`}
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
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
                    <div className="space-y-0.5">
                      {prayerLabels.map((p) => (
                        <div
                          key={p.key}
                          className="flex items-center justify-between text-[10px] leading-tight"
                        >
                          <span className="text-muted truncate">{p.emoji}</span>
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

          {/* Mobile: Card layout */}
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
        </>
      )}

      {/* ═══════════════════════  LIST MODE  ═══════════════════════ */}
      {displayMode === "list" && (
        <div className="rounded-2xl overflow-hidden border-2 border-amber-700/30 shadow-xl">
          {/* Islamic-styled decorative header */}
          <div
            className="relative py-5 px-6 text-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #1a472a 0%, #0d3320 40%, #1a472a 60%, #2d5a3e 100%)",
            }}
          >
            {/* Geometric Islamic pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3Cpath d='M30 10L50 30L30 50L10 30Z'/%3E%3Ccircle cx='30' cy='30' r='8'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            />
            {/* Crescent & Star decoration */}
            <div className="text-3xl mb-1">☪</div>
            <h3
              className="text-xl md:text-2xl font-bold text-amber-100 capitalize tracking-wide"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
            >
              {monthLabel}
            </h3>
            <p
              className="text-amber-200/70 text-sm mt-1"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
            >
              {t.calendar.monthlyCalendar}
            </p>
            {/* Gold decorative border at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Column header */}
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(180deg, #f5f0e1 0%, #ede4cc 100%)",
                  }}
                >
                  <th className="py-3 px-3 text-center text-xs font-bold uppercase tracking-wider text-amber-900/80 border-b-2 border-amber-700/30 w-12">
                    #
                  </th>
                  <th className="py-3 px-3 text-center text-xs font-bold uppercase tracking-wider text-amber-900/80 border-b-2 border-amber-700/30 w-16">
                    {language === "th" ? "วัน" : language === "ar" ? "يوم" : "Day"}
                  </th>
                  {prayerLabels.map((p) => (
                    <th
                      key={p.key}
                      className="py-3 px-3 text-center text-xs font-bold uppercase tracking-wider border-b-2 border-amber-700/30"
                      style={{
                        color:
                          p.key === "maghrib"
                            ? "#9f1239"
                            : p.key === "fajr"
                            ? "#312e81"
                            : "#78350f",
                      }}
                    >
                      <span className="block text-base leading-none mb-0.5">
                        {p.emoji}
                      </span>
                      {p.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {days.map((day, idx) => {
                  const isToday = isSameDay(day.date, today);
                  const isFriday = getDay(day.date) === 5;
                  const dayName = format(day.date, "EEE", {
                    locale: localeMap[language],
                  });

                  return (
                    <tr
                      key={day.date.toISOString()}
                      className={`transition-colors border-b border-amber-700/10 ${
                        isToday
                          ? "bg-emerald-50 dark:bg-emerald-950/30"
                          : isFriday
                          ? "bg-amber-50/60 dark:bg-amber-950/20"
                          : idx % 2 === 0
                          ? "bg-white dark:bg-gray-900/50"
                          : "bg-stone-50/80 dark:bg-gray-800/30"
                      } hover:bg-amber-100/50 dark:hover:bg-amber-900/20`}
                    >
                      {/* Date number */}
                      <td className="py-2.5 px-3 text-center border-r border-amber-700/10">
                        <span
                          className={`inline-flex items-center justify-center text-sm font-bold ${
                            isToday
                              ? "bg-emerald-600 text-white w-8 h-8 rounded-full shadow-md shadow-emerald-600/30"
                              : isFriday
                              ? "text-amber-800 dark:text-amber-400"
                              : "text-foreground"
                          }`}
                        >
                          {format(day.date, "d")}
                        </span>
                      </td>

                      {/* Day name */}
                      <td
                        className={`py-2.5 px-3 text-center text-xs font-medium capitalize border-r border-amber-700/10 ${
                          isFriday
                            ? "text-emerald-700 dark:text-emerald-400 font-bold"
                            : "text-muted"
                        }`}
                      >
                        {dayName}
                        {isToday && (
                          <span className="block text-[9px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5 uppercase">
                            {t.calendar.today}
                          </span>
                        )}
                      </td>

                      {/* Prayer times */}
                      {prayerLabels.map((p) => (
                        <td
                          key={p.key}
                          className={`py-2.5 px-3 text-center font-mono text-sm border-r border-amber-700/10 last:border-r-0 ${
                            isToday
                              ? "text-emerald-800 dark:text-emerald-300 font-semibold"
                              : p.key === "maghrib"
                              ? "text-rose-700 dark:text-rose-400 font-semibold"
                              : p.key === "fajr"
                              ? "text-indigo-700 dark:text-indigo-400"
                              : "text-foreground/80"
                          }`}
                        >
                          {day[p.key]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer with Islamic decorative border */}
          <div
            className="py-3 px-4 text-center"
            style={{
              background:
                "linear-gradient(180deg, #ede4cc 0%, #f5f0e1 100%)",
            }}
          >
            <div className="flex items-center justify-center gap-4 text-xs text-amber-800/70">
              {prayerLabels.map((p) => (
                <span key={p.key} className="flex items-center gap-1">
                  {p.emoji} {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Legend (only in grid mode) */}
      {displayMode === "grid" && (
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted">
          {prayerLabels.map((p) => (
            <span key={p.key} className="flex items-center gap-1">
              {p.emoji} {p.label}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
