'use client'

import { cn } from '../../utils/cn'

interface PrayerTrackerMockupProps {
  className?: string
}

export function PrayerTrackerMockup({ className }: PrayerTrackerMockupProps) {
  const mockData = {
    streak: 7,
    todayPrayers: [
      { name: 'Fajr', completed: true, time: '05:30' },
      { name: 'Dhuhr', completed: true, time: '12:15' },
      { name: 'Asr', completed: false, time: '15:45' },
      { name: 'Maghrib', completed: false, time: '18:30' },
      { name: 'Isha', completed: false, time: '19:45' }
    ],
    weeklyStats: [85, 90, 75, 95, 80, 100, 70] // Percentage for each day
  }

  return (
    <div className={cn('p-6 rounded-xl bg-card-bg border border-card-border relative overflow-hidden', className)}>
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🚧</div>
          <div className="text-lg font-semibold text-white mb-1">กำลังพัฒนา</div>
          <div className="text-sm text-white/80">Coming Soon</div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span>📊</span>
        Prayer Tracker
        <span className="text-sm font-normal text-foreground/70">บันทึกการละหมาด</span>
      </h3>

      {/* Streak Counter */}
      <div className="mb-6 p-4 rounded-lg bg-success-light border border-success/20">
        <div className="text-center">
          <div className="text-3xl font-bold text-success">
            {mockData.streak}
          </div>
          <div className="text-sm text-success">
            วันติดต่อกัน 🔥
          </div>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-3">วันนี้</h4>
        <div className="space-y-2">
          {mockData.todayPrayers.map((prayer, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-4 h-4 rounded-full border-2',
                  prayer.completed 
                    ? 'bg-success border-success' 
                    : 'border-foreground/30'
                )}>
                  {prayer.completed && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={cn(
                  'font-medium',
                  prayer.completed ? 'text-success' : 'text-foreground'
                )}>
                  {prayer.name}
                </span>
              </div>
              <span className="text-sm text-foreground/70">{prayer.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Chart */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">สัปดาห์นี้</h4>
        <div className="flex items-end justify-between gap-2 h-20">
          {mockData.weeklyStats.map((percentage, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-isha-gradient rounded-t-sm"
                style={{ height: `${percentage}%` }}
              />
              <div className="text-xs text-foreground/70 mt-1">
                {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'][index]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
