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
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
        <span className="text-muted">Getting location...</span>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className={`flex items-center gap-2 ${compact ? 'text-sm' : ''}`}>
        <MapPin className="h-4 w-4 text-error" />
        <span className="text-error">{locationError}</span>
        <button
          onClick={handleGetCurrentLocation}
          className="text-primary hover:text-primary-dark text-sm underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!currentLocation) {
    return (
      <div className={`flex items-center gap-2 ${compact ? 'text-sm' : ''}`}>
        <MapPin className="h-4 w-4 text-muted" />
        <span className="text-muted">No location set</span>
        <button
          onClick={handleGetCurrentLocation}
          className="text-primary hover:text-primary-dark text-sm underline"
        >
          Get location
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${compact ? 'text-sm' : ''}`}>
      <MapPin className="h-4 w-4 text-primary" />
      <div className="flex-1 min-w-0">
        <p className="text-foreground font-medium truncate">
          {currentLocation.address || `${currentLocation.latitude.toFixed(4)}, ${currentLocation.longitude.toFixed(4)}`}
        </p>
        {!compact && currentLocation.city && currentLocation.country && (
          <span className="text-muted truncate">
            {currentLocation.city}, {currentLocation.country}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-1">
        <button
          onClick={handleGetCurrentLocation}
          className="p-1.5 text-muted hover:text-primary transition-colors rounded-md hover:bg-muted-light"
          title="Change location"
        >
          <Navigation className="h-4 w-4" />
        </button>
        
        {showEditButton && onOpenLocationSelector && (
          <button
            onClick={onOpenLocationSelector}
            className="p-1.5 text-muted hover:text-primary transition-colors rounded-md hover:bg-muted-light"
            title="Change location"
          >
            <Settings className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
