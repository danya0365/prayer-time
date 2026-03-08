'use client'

import { ComingSoonCard } from '@/src/presentation/components/ui/ComingSoonCard'
import { useTranslation } from '@/src/presentation/hooks/useTranslation'
import { useSettingsStore } from '@/src/presentation/stores/settingsStore'
import { cn } from '@/utils/cn'
import { useState } from 'react'

interface FutureFeaturesProps {
  className?: string
}

export function FutureFeatures({ className }: FutureFeaturesProps) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const { settings } = useSettingsStore()
  const { t } = useTranslation({ language: settings.language })

  const futureFeatures = [
    {
      id: 'prayer-tracker',
      title: 'Prayer Tracker',
      titleThai: 'บันทึกการละหมาด',
      description: 'Track your daily prayers, build streaks, and see your prayer statistics over time.',
      icon: '📊'
    },
    {
      id: 'duas-supplications',
      title: 'Duas & Supplications',
      titleThai: 'ดุอาและคำอธิษฐาน',
      description: 'Collection of authentic duas for after prayers, daily life, and special occasions.',
      icon: '🤲'
    },
    {
      id: 'quran-reader',
      title: 'Quran Reader',
      titleThai: 'อ่านอัลกุรอาน',
      description: 'Read the Holy Quran with Arabic text, translations, and audio recitations.',
      icon: '📖'
    },
    {
      id: 'mosque-finder',
      title: 'Mosque Finder',
      titleThai: 'ค้นหามัสยิด',
      description: 'Find nearby mosques with prayer times, directions, and contact information.',
      icon: '🕌'
    },
    {
      id: 'tasbih-counter',
      title: 'Digital Tasbih',
      titleThai: 'ตัสบีห์ดิจิตอล',
      description: 'Digital prayer beads counter with different dhikr options and progress tracking.',
      icon: '📿'
    },
    {
      id: 'islamic-calendar-full',
      title: 'Full Islamic Calendar',
      titleThai: 'ปฏิทินอิสลามเต็มรูปแบบ',
      description: 'Complete Islamic calendar with all important dates, events, and reminders.',
      icon: '📅'
    },
    {
      id: 'adhan-sounds',
      title: 'Adhan & Sounds',
      titleThai: 'เสียงอาซานและเสียงธรรมชาติ',
      description: 'Beautiful adhan calls and nature sounds for prayer and meditation.',
      icon: '🔊'
    },
    {
      id: 'community-features',
      title: 'Community Features',
      titleThai: 'ฟีเจอร์ชุมชน',
      description: 'Connect with local Muslim community, share prayer times, and join events.',
      icon: '👥'
    },
    {
      id: 'offline-mode',
      title: 'Offline Mode',
      titleThai: 'โหมดออฟไลน์',
      description: 'Use the app without internet connection with cached prayer times and content.',
      icon: '📱'
    }
  ]

  const handleFeatureClick = (featureId: string) => {
    setSelectedFeature(featureId)
    // Show a toast or modal with more details
    alert(`${featureId} ${t.alerts.featureComingSoon}`)
  }

  return (
    <div className={cn('w-full max-w-6xl mx-auto px-4', className)}>
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
          ฟีเจอร์ที่กำลังจะมา
        </h2>
        <p className="text-[#D4AF37]/70 font-bold tracking-widest uppercase text-xs sm:text-sm">
          Exploring the Future of Spiritual Connection
        </p>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {futureFeatures.map((feature) => (
          <div key={feature.id} className="relative group/feature-card">
            {/* Glow Wrap */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-[2.5rem] blur opacity-0 group-hover/feature-card:opacity-100 transition duration-500" />
            
            <ComingSoonCard
              title={feature.title}
              titleThai={feature.titleThai}
              description={feature.description}
              icon={feature.icon}
              onClick={() => handleFeatureClick(feature.id)}
              className={cn(
                "h-full relative bg-[#022c22]/40 backdrop-blur-md border border-[#D4AF37]/10 hover:border-[#D4AF37]/60 transition-all duration-500 rounded-[2rem] overflow-hidden",
                selectedFeature === feature.id && 'ring-2 ring-[#D4AF37] scale-[1.02]'
              )}
            />
            {/* Corner Ornament on hover */}
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#D4AF37]/40 rounded-tr-lg opacity-0 group-hover/feature-card:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Premium Call to Action */}
      <div className="mt-20 relative overflow-hidden group/cta">
        <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b] to-[#022c22] rounded-[3rem] border border-[#D4AF37]/20 shadow-2xl" />
        
        {/* Geometric Background for CTA */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
           <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L35 25 L60 30 L35 35 L30 60 L25 35 L0 30 L25 25 Z' fill='%23D4AF37'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative z-10 px-8 py-12 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6 border border-[#D4AF37]/20 group-hover/cta:border-[#D4AF37]/50 transition-colors duration-500 shadow-xl">
             <span className="text-4xl">💡</span>
          </div>
          <h3 className="text-3xl font-black text-white mb-4">
            ต้องการฟีเจอร์อื่นๆ?
          </h3>
          <p className="text-white/60 max-w-xl text-lg font-medium mb-10 leading-relaxed">
            แจ้งความต้องการหรือข้อเสนอแนะเพื่อให้เราพัฒนาฟีเจอร์ที่ตรงกับความต้องการของคุณ <br/>
            Let us build the tools you need for your spiritual journey.
          </p>
          
          <button 
            onClick={() => alert(t.alerts.thankYou)}
            className="group relative px-10 py-5 bg-[#D4AF37] text-[#022c22] font-black rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative z-10 uppercase tracking-widest">แจ้งความต้องการ</span>
          </button>
        </div>
      </div>
    </div>
  )
}
