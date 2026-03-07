'use client'

import { PrayerTrackerMockup } from '@/src/presentation/components/mockups/PrayerTrackerMockup'
import { QuranReaderMockup } from '@/src/presentation/components/mockups/QuranReaderMockup'
import { TasbihCounterMockup } from '@/src/presentation/components/mockups/TasbihCounterMockup'
import { cn } from '@/utils/cn'
import { useState } from 'react'

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
    <div className={cn('w-full max-w-5xl mx-auto px-4', className)}>
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          ตัวอย่างฟีเจอร์ที่กำลังพัฒนา
        </h2>
        <p className="text-[#D4AF37]/70 font-medium tracking-wide">
          Feature Mockups in Development
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full mt-4" />
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-3 mb-10 p-2 bg-[#022c22]/60 backdrop-blur-md rounded-[2rem] border border-[#D4AF37]/20 shadow-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 min-w-[120px] py-4 px-6 rounded-2xl text-sm font-bold transition-all duration-500 relative overflow-hidden group/tab',
              activeTab === tab.id
                ? 'bg-[#D4AF37] text-[#022c22] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                : 'text-white/60 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
            )}
          >
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-2xl mb-1">{tab.icon}</span>
              <div className="text-center">
                <div className="leading-tight">{tab.label}</div>
                <div className={cn("text-[10px] uppercase tracking-tighter opacity-80", activeTab === tab.id ? "text-[#022c22]/80" : "text-[#D4AF37]/60")}>{tab.thai}</div>
              </div>
            </div>
            {activeTab === tab.id && (
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[#022c22]/20" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content Wrapper */}
      <div className="relative bg-[#022c22]/40 backdrop-blur-xl rounded-[3rem] border border-[#D4AF37]/20 p-1 shadow-2xl overflow-hidden group/content transition-all duration-700 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]">
        {/* Subtle Shine */}
        <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-gradient-to-br from-white/5 via-transparent to-transparent rotate-45 pointer-events-none group-hover/content:animate-shine" />
        
        <div className="relative z-10 p-4 sm:p-8">
          {activeTab === 'tracker' && <PrayerTrackerMockup />}
          {activeTab === 'quran' && <QuranReaderMockup />}
          {activeTab === 'tasbih' && <TasbihCounterMockup />}
        </div>
      </div>

      {/* Development Status Card */}
      <div className="mt-12 p-8 rounded-[2.5rem] bg-gradient-to-br from-[#064e3b]/40 to-[#022c22]/60 backdrop-blur-xl border border-[#D4AF37]/20 relative overflow-hidden group/status">
        <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 rotate-12 transition-transform duration-700 group-hover/status:rotate-0 group-hover/status:scale-[1.7]">
           <span className="text-8xl">🏗️</span>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center shrink-0 border border-[#D4AF37]/40 shadow-xl">
             <span className="text-4xl text-[#D4AF37]">👨‍💻</span>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold text-white mb-2">สถานะการพัฒนา</h4>
            <p className="text-white/60 font-medium">
              ฟีเจอร์เหล่านี้อยู่ในระหว่างการออกแบบและพัฒนา คาดว่าจะเปิดให้ใช้งานในเร็วๆ นี้
            </p>
          </div>
        </div>
        
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
          {[
            { label: 'UI Design', value: '30%', color: 'from-[#D4AF37] to-[#B8962E]' },
            { label: 'Development', value: '15%', color: 'from-[#D4AF37]/60 to-[#D4AF37]/40' },
            { label: 'Testing', value: '0%', color: 'from-white/10 to-white/5' }
          ].map((stat, i) => (
            <div key={i} className="relative group/stat overflow-hidden p-6 rounded-2xl bg-[#022c22]/40 border border-[#D4AF37]/10 transition-all duration-300 hover:border-[#D4AF37]/30">
               <div className="relative z-10 flex flex-col items-center">
                 <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                 <div className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]/80">{stat.label}</div>
               </div>
               {/* Progress Bar Background */}
               <div className="absolute bottom-0 inset-x-0 h-1 bg-white/5" />
               <div className={cn("absolute bottom-0 left-0 h-1 bg-gradient-to-r transition-all duration-1000", stat.color)} style={{ width: stat.value }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
