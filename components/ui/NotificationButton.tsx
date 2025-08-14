'use client'

import { useEffect, useState } from 'react'
import { cn } from '../../utils/cn'

interface NotificationButtonProps {
  onPermissionChange?: (granted: boolean) => void
}

export function NotificationButton({ onPermissionChange }: NotificationButtonProps) {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications')
      return
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      onPermissionChange?.(result === 'granted')
      
      if (result === 'granted') {
        // Test notification
        new Notification('Prayer Times Dashboard', {
          body: 'Notifications enabled! You will receive prayer time alerts.',
          icon: '/favicon.ico'
        })
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error)
    }
  }

  if (!mounted) {
    return (
      <button
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-card-border bg-card-bg backdrop-blur-sm transition-all duration-200"
        disabled
      >
        <div className="h-4 w-4 animate-pulse rounded-full bg-foreground/20" />
      </button>
    )
  }

  const getIcon = () => {
    switch (permission) {
      case 'granted':
        return (
          <svg
            className="h-4 w-4 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-5 5-5-5h5v-8a1 1 0 011-1h4a1 1 0 011 1v8z"
            />
          </svg>
        )
      case 'denied':
        return (
          <svg
            className="h-4 w-4 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
            />
          </svg>
        )
      default:
        return (
          <svg
            className="h-4 w-4 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-5 5-5-5h5v-8a1 1 0 011-1h4a1 1 0 011 1v8z"
            />
          </svg>
        )
    }
  }

  const getTooltip = () => {
    switch (permission) {
      case 'granted':
        return 'Notifications enabled'
      case 'denied':
        return 'Notifications blocked - enable in browser settings'
      default:
        return 'Enable prayer notifications'
    }
  }

  return (
    <button
      onClick={requestPermission}
      disabled={permission === 'denied'}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-card-border bg-card-bg backdrop-blur-sm transition-all duration-200',
        permission === 'denied' 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-foreground/20'
      )}
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      {getIcon()}
    </button>
  )
}
