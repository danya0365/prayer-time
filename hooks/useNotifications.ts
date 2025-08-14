'use client'

import { useEffect, useRef } from 'react'
import { PrayerInfo } from '../utils/prayer-utils'

interface UseNotificationsProps {
  enabled: boolean
  nextPrayer: PrayerInfo
  timeUntilNext: number
  notificationMinutes?: number // Minutes before prayer to notify
}

export function useNotifications({ 
  enabled, 
  nextPrayer, 
  timeUntilNext, 
  notificationMinutes = 15 
}: UseNotificationsProps) {
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const prayerTimeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear existing timeouts
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current)
    }
    if (prayerTimeTimeoutRef.current) {
      clearTimeout(prayerTimeTimeoutRef.current)
    }

    if (!enabled || !('Notification' in window) || Notification.permission !== 'granted') {
      return
    }

    // Calculate notification time (X minutes before prayer)
    const notificationTime = timeUntilNext - (notificationMinutes * 60 * 1000)
    
    // Set notification for X minutes before prayer
    if (notificationTime > 0) {
      notificationTimeoutRef.current = setTimeout(() => {
        new Notification(`${nextPrayer.displayName} Prayer Reminder`, {
          body: `${nextPrayer.displayName} prayer is in ${notificationMinutes} minutes`,
          icon: '/favicon.ico',
          tag: 'prayer-reminder'
        })
      }, notificationTime)
    }

    // Set notification for exact prayer time
    if (timeUntilNext > 0) {
      prayerTimeTimeoutRef.current = setTimeout(() => {
        new Notification(`${nextPrayer.displayName} Prayer Time`, {
          body: `It's time for ${nextPrayer.displayName} prayer ${nextPrayer.emoji}`,
          icon: '/favicon.ico',
          tag: 'prayer-time',
          requireInteraction: true // Keep notification visible until user interacts
        })
      }, timeUntilNext)
    }

    // Cleanup function
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current)
      }
      if (prayerTimeTimeoutRef.current) {
        clearTimeout(prayerTimeTimeoutRef.current)
      }
    }
  }, [enabled, nextPrayer, timeUntilNext, notificationMinutes])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current)
      }
      if (prayerTimeTimeoutRef.current) {
        clearTimeout(prayerTimeTimeoutRef.current)
      }
    }
  }, [])
}
