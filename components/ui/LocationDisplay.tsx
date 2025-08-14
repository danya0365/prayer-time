"use client";

import { MapPin, Navigation, Settings } from 'lucide-react';
import { useLocationStore } from '../../stores/locationStore';

interface LocationDisplayProps {
  onOpenLocationSelector?: () => void;
  showEditButton?: boolean;
  compact?: boolean;
}

export default function LocationDisplay({ 
  onOpenLocationSelector, 
  showEditButton = true,
  compact = false 
}: LocationDisplayProps) {
  const { currentLocation, isLocationLoading, locationError, requestGeolocation } = useLocationStore();

  const handleGetCurrentLocation = async () => {
    await requestGeolocation();
  };

  if (isLocationLoading) {
    return (
      <div className={`flex items-center gap-2 ${compact ? 'text-sm' : ''}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-500 border-t-transparent"></div>
        <span className="text-gray-600 dark:text-gray-400">Getting location...</span>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className={`flex items-center gap-2 ${compact ? 'text-sm' : ''}`}>
        <MapPin className="h-4 w-4 text-red-500" />
        <span className="text-red-600 dark:text-red-400">{locationError}</span>
        <button
          onClick={handleGetCurrentLocation}
          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 text-sm underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!currentLocation) {
    return (
      <div className={`flex items-center gap-2 ${compact ? 'text-sm' : ''}`}>
        <MapPin className="h-4 w-4 text-gray-500" />
        <span className="text-gray-600 dark:text-gray-400">No location set</span>
        <button
          onClick={handleGetCurrentLocation}
          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 text-sm underline"
        >
          Get location
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${compact ? 'text-sm' : ''}`}>
      <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 dark:text-gray-100 font-medium truncate">
          {currentLocation.address || `${currentLocation.latitude.toFixed(4)}, ${currentLocation.longitude.toFixed(4)}`}
        </p>
        {!compact && currentLocation.city && currentLocation.country && (
          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {currentLocation.city}, {currentLocation.country}
          </p>
        )}
      </div>
      
      <div className="flex items-center gap-1">
        <button
          onClick={handleGetCurrentLocation}
          className="p-1.5 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Use current location"
        >
          <Navigation className="h-4 w-4" />
        </button>
        
        {showEditButton && onOpenLocationSelector && (
          <button
            onClick={onOpenLocationSelector}
            className="p-1.5 text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Change location"
          >
            <Settings className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
