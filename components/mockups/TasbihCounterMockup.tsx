'use client'

import { cn } from '../../utils/cn'

interface TasbihCounterMockupProps {
  className?: string
}

export function TasbihCounterMockup({ className }: TasbihCounterMockupProps) {
  const mockData = {
    count: 33,
    target: 99,
    currentDhikr: 'سُبْحَانَ اللَّهِ',
    dhikrTranslation: 'Subhan Allah (Glory be to Allah)'
  }

  const dhikrOptions = [
    { arabic: 'سُبْحَانَ اللَّهِ', transliteration: 'Subhan Allah', count: 33 },
    { arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Alhamdulillah', count: 33 },
    { arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu Akbar', count: 34 }
  ]

  return (
    <div className={cn('p-6 rounded-xl bg-card-bg border border-card-border relative overflow-hidden', className)}>
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📿</div>
          <div className="text-lg font-semibold text-white mb-1">กำลังพัฒนา</div>
          <div className="text-sm text-white/80">Coming Soon</div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span>📿</span>
        Digital Tasbih
        <span className="text-sm font-normal text-foreground/70">ตัสบีห์ดิจิตอล</span>
      </h3>

      {/* Current Dhikr */}
      <div className="text-center mb-6">
        <div className="text-3xl text-foreground mb-2 font-arabic" dir="rtl">
          {mockData.currentDhikr}
        </div>
        <div className="text-sm text-foreground/70 italic">
          {mockData.dhikrTranslation}
        </div>
      </div>

      {/* Counter Display */}
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          {/* Progress Circle */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-card-border"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(mockData.count / mockData.target) * 314} 314`}
              className="text-success transition-all duration-300"
            />
          </svg>
          
          {/* Count Number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {mockData.count}
              </div>
              <div className="text-xs text-foreground/70">
                / {mockData.target}
              </div>
            </div>
          </div>
        </div>

        {/* Tap Button */}
        <button className="w-20 h-20 rounded-full bg-success text-white text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95">
          +
        </button>
      </div>

      {/* Dhikr Options */}
      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-semibold text-foreground mb-2">เลือกคำสวด:</h4>
        {dhikrOptions.map((dhikr, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-background/50 text-sm">
            <div>
              <span className="font-arabic text-foreground" dir="rtl">{dhikr.arabic}</span>
              <div className="text-xs text-foreground/70 italic">{dhikr.transliteration}</div>
            </div>
            <div className="text-xs text-foreground/70">
              {dhikr.count}x
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button className="flex-1 py-2 px-3 rounded-lg bg-error-light text-error-dark text-sm hover:bg-error-light/80 transition-colors">
          รีเซ็ต
        </button>
        <button className="flex-1 py-2 px-3 rounded-lg bg-info-light text-info-dark text-sm hover:bg-info-light/80 transition-colors">
          ประวัติ
        </button>
      </div>
    </div>
  )
}
