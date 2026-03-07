import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/stores/themeStore';
import { useLocationStore } from '@/stores/locationStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { formatDisplayDate } from '@/utils/date-formatting';

interface ClassicHeaderProps {
  onLocationClick: () => void;
}

export function ClassicHeader({ onLocationClick }: ClassicHeaderProps) {
  const { themeConfig } = useThemeStore();
  const { settings } = useSettingsStore();
  const { currentLocation } = useLocationStore();
  const { t } = useTranslation({ language: settings.language });

  return (
    <div className={`${themeConfig.colors.primary} text-white relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20zM0 20c0-11.046 8.954-20 20-20v40c-11.046 0-20-8.954-20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className={`relative ${themeConfig.styles.spacing} text-center`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <div className="text-6xl mb-2">🕌</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2 font-serif">
              {t.dashboard.title}
            </h1>
            <div className="w-24 h-1 bg-white mx-auto opacity-60"></div>
          </div>
          <p className="text-lg opacity-90 font-serif">
            {formatDisplayDate(new Date(), settings.language)}
          </p>
          
          {currentLocation && (
            <div className="mt-4">
              <button
                onClick={onLocationClick}
                className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg border border-white/20 backdrop-blur-sm font-serif"
                title="คลิกเพื่อเปลี่ยนตำแหน่ง"
              >
                <span>📍</span>
                <span className="text-base">
                  {currentLocation.city || 'Unknown'}, {currentLocation.country || 'Unknown'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
