'use client'

import { cn } from '../../utils/cn'

interface SettingsButtonProps {
  onClick: () => void
  className?: string
  variant?: 'default' | 'light'
}

export function SettingsButton({ onClick, className, variant = 'default' }: SettingsButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2',
        variant === 'light' 
          ? 'bg-white/20 hover:bg-white/30 border border-white/30 focus:ring-white/20 backdrop-blur-sm'
          : 'border border-card-border bg-card-bg backdrop-blur-sm hover:shadow-lg focus:ring-foreground/20',
        className
      )}
      title="Settings"
      aria-label="Open settings"
    >
      <svg
        className={cn(
          'h-4 w-4',
          variant === 'light' ? 'text-white' : 'text-foreground'
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </button>
  )
}
