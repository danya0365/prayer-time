import { useEffect, useState } from 'react';
import { useLocationStore } from '../stores/locationStore';

// Haversine formula to calculate distance between two coordinates
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function useLocationMismatch(thresholdKm: number = 50) {
  const { currentLocation, lastLocationWarningDismissedAt } = useLocationStore();
  const [isMismatch, setIsMismatch] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    // If dismissed within the last 24 hours, don't show the mismatch warning
    if (
      lastLocationWarningDismissedAt &&
      Date.now() - lastLocationWarningDismissedAt < 24 * 60 * 60 * 1000
    ) {
      setIsMismatch(false);
      return;
    }

    if (!currentLocation || !navigator.geolocation) {
      setIsMismatch(false);
      return;
    }

    const checkLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const dist = getDistanceFromLatLonInKm(
            currentLocation.latitude,
            currentLocation.longitude,
            latitude,
            longitude
          );

          setDistance(dist);
          setIsMismatch(dist > thresholdKm);
        },
        (error) => {
          console.warn("Could not get device location for mismatch check:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    };

    // Check permissions first to gracefully degrade if denied, minimizing intrusive prompts
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted' || result.state === 'prompt') {
          checkLocation();
        }
      }).catch(() => {
        // Fallback if permissions API fails
        checkLocation();
      });
    } else {
      checkLocation();
    }
  }, [currentLocation, thresholdKm, lastLocationWarningDismissedAt]);

  return { isMismatch, distance };
}
