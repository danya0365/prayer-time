'use client'

import { cn } from '../../utils/cn'

interface ComingSoonCardProps {
  title: string
  titleThai?: string
  description: string
  icon: string
  className?: string
  onClick?: () => void
}

export function ComingSoonCard({ 
  title, 
  titleThai,
  description, 
  icon, 
  className,
  onClick 
}: ComingSoonCardProps) {
  return (
    <div 
      className={cn(
        'relative p-6 rounded-xl bg-card-bg border border-card-border cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg overflow-hidden',
        className
      )}
      onClick={onClick}
    >
      {/* Coming Soon Badge */}
      <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-full">
        <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
          กำลังพัฒนา
        </span>
      </div>

      {/* Icon */}
      <div className="text-4xl mb-4">{icon}</div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title}
        {titleThai && (
          <span className="block text-sm font-normal text-foreground/70 mt-1">
            {titleThai}
          </span>
        )}
      </h3>

      {/* Description */}
      <p className="text-sm text-foreground/70 mb-4">
        {description}
      </p>

      {/* Progress indicator */}
      <div className="w-full bg-card-border rounded-full h-2 mb-2">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full w-1/3 animate-pulse" />
      </div>
      <p className="text-xs text-foreground/50">
        อยู่ระหว่างการพัฒนา...
      </p>

      {/* Decorative elements */}
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-tl from-orange-500/10 to-yellow-500/10 rounded-full opacity-50" />
      <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full opacity-30" />
    </div>
  )
}
