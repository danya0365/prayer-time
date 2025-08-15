'use client'

import { useState } from 'react'
import { cn } from '../../../../utils/cn'
import { PrayerTrackerMockup } from '../../../mockups/PrayerTrackerMockup'
import { QuranReaderMockup } from '../../../mockups/QuranReaderMockup'
import { TasbihCounterMockup } from '../../../mockups/TasbihCounterMockup'

interface MockupShowcaseProps {
  className?: string
}

export function MockupShowcase({ className }: MockupShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'tracker' | 'quran' | 'tasbih'>('tracker')

  const tabs = [
    { id: 'tracker' as const, label: 'Prayer Tracker', icon: '📊', thai: 'บันทึกการละหมาด' },
    { id: 'quran' as const, label: 'Quran Reader', icon: '📖', thai: 'อ่านอัลกุรอาน' },
    { id: 'tasbih' as const, label: 'Digital Tasbih', icon: '📿', thai: 'ตัสบีห์ดิจิตอล' }
  ]

  return (
    <div className={cn('w-full max-w-4xl mx-auto mt-8', className)}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          ตัวอย่างฟีเจอร์ที่กำลังพัฒนา
        </h2>
        <p className="text-foreground/70">
          Feature Mockups in Development
        </p>
        <div className="w-16 h-1 bg-dhuhr-gradient rounded-full mx-auto mt-2" />
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-card-bg rounded-lg border border-card-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 min-w-0 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === tab.id
                ? 'bg-dhuhr-gradient text-white shadow-lg'
                : 'text-foreground/70 hover:text-foreground hover:bg-background/50'
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg">{tab.icon}</span>
              <div className="hidden sm:block">
                <div className="font-semibold">{tab.label}</div>
                <div className="text-xs opacity-80">{tab.thai}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative">
        {activeTab === 'tracker' && <PrayerTrackerMockup />}
        {activeTab === 'quran' && <QuranReaderMockup />}
        {activeTab === 'tasbih' && <TasbihCounterMockup />}
      </div>

      {/* Development Status */}
      <div className="mt-6 p-4 rounded-lg bg-info-light border border-info/20">
        <div className="flex items-center gap-3">
          <div className="text-2xl">👨‍💻</div>
          <div>
            <h4 className="font-semibold text-foreground">สถานะการพัฒนา</h4>
            <p className="text-sm text-foreground/70">
              ฟีเจอร์เหล่านี้อยู่ในระหว่างการออกแบบและพัฒนา คาดว่าจะเปิดให้ใช้งานในเร็วๆ นี้
            </p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-background/30">
            <div className="text-lg font-bold text-development">30%</div>
            <div className="text-xs text-foreground/70">UI Design</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-background/30">
            <div className="text-lg font-bold text-warning">15%</div>
            <div className="text-xs text-foreground/70">Development</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-background/30">
            <div className="text-lg font-bold text-success">0%</div>
            <div className="text-xs text-foreground/70">Testing</div>
          </div>
        </div>
      </div>
    </div>
  )
}
