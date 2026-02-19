"use client";

import { Coordinates } from "adhan";
import {
    eachDayOfInterval,
    endOfMonth,
    startOfMonth,
} from "date-fns";
import { useMemo } from "react";
import { useLocationStore } from "../stores/locationStore";
import { useSettingsStore } from "../stores/settingsStore";
import { Language } from "../types/translation";
import { formatTimeWithLocale } from "../utils/date-formatting";
import { getPrayerTimes } from "../utils/prayer-utils";

export interface DayPrayerTimes {
  date: Date;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

interface UseMonthlyPrayerTimesOptions {
  year: number;
  month: number; // 0-indexed (JS Date convention)
  language?: Language;
}

export function useMonthlyPrayerTimes({
  year,
  month,
  language = "en",
}: UseMonthlyPrayerTimesOptions): DayPrayerTimes[] {
  const { currentLocation } = useLocationStore();
  const { settings } = useSettingsStore();

  const days = useMemo(() => {
    const firstDay = startOfMonth(new Date(year, month));
    const lastDay = endOfMonth(new Date(year, month));
    const allDays = eachDayOfInterval({ start: firstDay, end: lastDay });

    const coordinates = currentLocation
      ? new Coordinates(currentLocation.latitude, currentLocation.longitude)
      : undefined;

    return allDays.map((date) => {
      const pt = getPrayerTimes(
        date,
        coordinates,
        settings.calculationMethod,
        settings.adjustments
      );
      return {
        date,
        fajr: formatTimeWithLocale(pt.fajr, language),
        dhuhr: formatTimeWithLocale(pt.dhuhr, language),
        asr: formatTimeWithLocale(pt.asr, language),
        maghrib: formatTimeWithLocale(pt.maghrib, language),
        isha: formatTimeWithLocale(pt.isha, language),
      };
    });
  }, [year, month, currentLocation, settings, language]);

  return days;
}
