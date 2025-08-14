'use client'

import { cn } from '../../utils/cn'

interface QuranReaderMockupProps {
  className?: string
}

export function QuranReaderMockup({ className }: QuranReaderMockupProps) {
  const mockVerse = {
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    transliteration: 'Bismillahi r-rahmani r-raheem',
    translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
    surah: 'Al-Fatiha',
    ayah: 1
  }

  return (
    <div className={cn('p-6 rounded-xl bg-card-bg border border-card-border relative overflow-hidden', className)}>
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📖</div>
          <div className="text-lg font-semibold text-white mb-1">กำลังพัฒนา</div>
          <div className="text-sm text-white/80">Coming Soon</div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span>📖</span>
        Quran Reader
        <span className="text-sm font-normal text-foreground/70">อ่านอัลกุรอาน</span>
      </h3>

      {/* Surah Info */}
      <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
        <div className="text-center">
          <h4 className="font-semibold text-emerald-700 dark:text-emerald-400">
            سُورَة الفَاتِحَة
          </h4>
          <p className="text-sm text-emerald-600 dark:text-emerald-300">
            Surah Al-Fatiha (The Opening)
          </p>
        </div>
      </div>

      {/* Arabic Text */}
      <div className="mb-4 p-4 rounded-lg bg-background/50 text-center">
        <div className="text-2xl text-foreground mb-2 font-arabic leading-loose" dir="rtl">
          {mockVerse.arabic}
        </div>
        <div className="text-sm text-foreground/70 italic">
          {mockVerse.transliteration}
        </div>
      </div>

      {/* Translation */}
      <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <p className="text-foreground text-center">
          &ldquo;{mockVerse.translation}&rdquo;
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-card-border hover:bg-foreground/10 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-2 rounded-lg bg-green-500/20 text-green-600 hover:bg-green-500/30 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-2 rounded-lg bg-card-border hover:bg-foreground/10 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="text-sm text-foreground/70">
          آية {mockVerse.ayah}
        </div>
      </div>

      {/* Features List */}
      <div className="mt-4 pt-4 border-t border-card-border">
        <div className="text-xs text-foreground/60 space-y-1">
          <div>✓ Arabic text with Tajweed</div>
          <div>✓ Multiple translations</div>
          <div>✓ Audio recitations</div>
          <div>✓ Bookmarks & notes</div>
        </div>
      </div>
    </div>
  )
}
