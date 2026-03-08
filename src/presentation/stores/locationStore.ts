import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  country?: string;
}

interface LocationState {
  currentLocation: LocationData | null;
  isLocationLoading: boolean;
  locationError: string | null;
  setLocation: (location: LocationData) => void;
  setLocationLoading: (loading: boolean) => void;
  setLocationError: (error: string | null) => void;
  clearLocation: () => void;
  requestGeolocation: () => Promise<void>;
}

// Default location (Bangkok, Thailand)
const DEFAULT_LOCATION: LocationData = {
  latitude: 13.7563,
  longitude: 100.5018,
  address: 'Bangkok, Thailand',
  city: 'Bangkok',
  country: 'Thailand'
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      currentLocation: DEFAULT_LOCATION,
      isLocationLoading: false,
      locationError: null,

      setLocation: (location: LocationData) => {
        set({ 
          currentLocation: location, 
          locationError: null,
          isLocationLoading: false 
        });
      },

      setLocationLoading: (loading: boolean) => {
        set({ isLocationLoading: loading });
      },

      setLocationError: (error: string | null) => {
        set({ 
          locationError: error, 
          isLocationLoading: false 
        });
      },

      clearLocation: () => {
        set({ 
          currentLocation: DEFAULT_LOCATION,
          locationError: null,
          isLocationLoading: false 
        });
      },

      requestGeolocation: async () => {
        if (!navigator.geolocation) {
          set({ locationError: 'geolocationNotSupported' });
          return;
        }

        set({ isLocationLoading: true, locationError: null });

        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 300000 // 5 minutes
            });
          });

          const { latitude, longitude } = position.coords;

          // Try to get address from coordinates using reverse geocoding
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            
            if (response.ok) {
              const data = await response.json();
              const location: LocationData = {
                latitude,
                longitude,
                address: data.locality || data.city || 'Unknown location',
                city: data.city || data.locality,
                country: data.countryName
              };
              
              get().setLocation(location);
            } else {
              // Fallback without address
              get().setLocation({
                latitude,
                longitude,
                address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
              });
            }
          } catch {
            // Fallback without address
            get().setLocation({
              latitude,
              longitude,
              address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
            });
          }
        } catch (error) {
          const errorCode = error instanceof GeolocationPositionError 
            ? error.code
            : 0;
          
          let errorMessage = 'geolocationErrorUnknown';
          switch (errorCode) {
            case GeolocationPositionError.PERMISSION_DENIED:
              errorMessage = 'geolocationErrorPermissionDenied';
              break;
            case GeolocationPositionError.POSITION_UNAVAILABLE:
              errorMessage = 'geolocationErrorUnavailable';
              break;
            case GeolocationPositionError.TIMEOUT:
              errorMessage = 'geolocationErrorTimeout';
              break;
          }
          get().setLocationError(errorMessage);
        }
      }
    }),
    {
      name: 'prayer-location-storage',
      partialize: (state) => ({ 
        currentLocation: state.currentLocation 
      })
    }
  )
);


