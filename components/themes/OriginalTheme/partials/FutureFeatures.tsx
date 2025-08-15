'use client'

import { useState } from 'react'
import { cn } from '../../../../utils/cn'
import { ComingSoonCard } from '../../../ui/ComingSoonCard'
import { useSettingsStore } from '../../../../stores/settingsStore'
import { useTranslation } from '../../../../hooks/useTranslation'

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
    <div className={cn('w-full max-w-6xl mx-auto mt-8', className)}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          ฟีเจอร์ที่กำลังจะมา
        </h2>
        <p className="text-lg text-foreground/70">
          Future Features Coming Soon
        </p>
        <div className="w-24 h-1 bg-dhuhr-gradient rounded-full mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {futureFeatures.map((feature) => (
          <ComingSoonCard
            key={feature.id}
            title={feature.title}
            titleThai={feature.titleThai}
            description={feature.description}
            icon={feature.icon}
            onClick={() => handleFeatureClick(feature.id)}
            className={cn(
              selectedFeature === feature.id && 'ring-2 ring-warning/50 scale-105'
            )}
          />
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center p-8 rounded-xl bg-development-light border border-development/20">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          ต้องการฟีเจอร์อื่นๆ? 💡
        </h3>
        <p className="text-foreground/70 mb-6">
          แจ้งความต้องการหรือข้อเสนอแนะเพื่อให้เราพัฒนาฟีเจอร์ที่ตรงกับความต้องการของคุณ
        </p>
        <button 
          onClick={() => alert(t.alerts.thankYou)}
          className="px-6 py-3 bg-development text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          แจ้งความต้องการ
        </button>
      </div>
    </div>
  )
}
