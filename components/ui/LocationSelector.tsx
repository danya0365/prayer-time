"use client";

import { useState, useEffect, useRef } from 'react';
import { X, Search, MapPin, Navigation } from 'lucide-react';
import { useLocationStore, LocationData } from '../../stores/locationStore';

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationSelector({ isOpen, onClose }: LocationSelectorProps) {
  const { currentLocation, setLocation, requestGeolocation } = useLocationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(currentLocation);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Search for locations using a geocoding service
  const searchLocations = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // For demo purposes, we'll use a simple search that returns some common cities
      // In a real app, you'd use a proper geocoding service like Google Maps, Mapbox, etc.
      const commonCities = [
        { latitude: 13.7563, longitude: 100.5018, address: 'Bangkok, Thailand', city: 'Bangkok', country: 'Thailand' },
        { latitude: 21.0285, longitude: 105.8542, address: 'Hanoi, Vietnam', city: 'Hanoi', country: 'Vietnam' },
        { latitude: 1.3521, longitude: 103.8198, address: 'Singapore', city: 'Singapore', country: 'Singapore' },
        { latitude: 3.1390, longitude: 101.6869, address: 'Kuala Lumpur, Malaysia', city: 'Kuala Lumpur', country: 'Malaysia' },
        { latitude: -6.2088, longitude: 106.8456, address: 'Jakarta, Indonesia', city: 'Jakarta', country: 'Indonesia' },
        { latitude: 14.5995, longitude: 120.9842, address: 'Manila, Philippines', city: 'Manila', country: 'Philippines' },
        { latitude: 35.6762, longitude: 139.6503, address: 'Tokyo, Japan', city: 'Tokyo', country: 'Japan' },
        { latitude: 37.5665, longitude: 126.9780, address: 'Seoul, South Korea', city: 'Seoul', country: 'South Korea' },
        { latitude: 39.9042, longitude: 116.4074, address: 'Beijing, China', city: 'Beijing', country: 'China' },
        { latitude: 28.6139, longitude: 77.2090, address: 'New Delhi, India', city: 'New Delhi', country: 'India' },
        { latitude: 24.7136, longitude: 46.6753, address: 'Riyadh, Saudi Arabia', city: 'Riyadh', country: 'Saudi Arabia' },
        { latitude: 25.2048, longitude: 55.2708, address: 'Dubai, UAE', city: 'Dubai', country: 'UAE' },
        { latitude: 51.5074, longitude: -0.1278, address: 'London, UK', city: 'London', country: 'UK' },
        { latitude: 48.8566, longitude: 2.3522, address: 'Paris, France', city: 'Paris', country: 'France' },
        { latitude: 40.7128, longitude: -74.0060, address: 'New York, USA', city: 'New York', country: 'USA' }
      ];

      const filtered = commonCities.filter(city => 
        city.address.toLowerCase().includes(query.toLowerCase()) ||
        city.city.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filtered);
    } catch (error) {
      console.error('Error searching locations:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input change with debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchLocations(searchQuery);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      setLocation(selectedLocation);
      onClose();
    }
  };

  const handleUseCurrentLocation = async () => {
    await requestGeolocation();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Select Prayer Times Location
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {/* Current Location Button */}
          <button
            onClick={handleUseCurrentLocation}
            className="w-full flex items-center gap-3 p-4 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
          >
            <Navigation className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-gray-100">Use Current Location</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically detect your location for accurate prayer times
              </p>
            </div>
          </button>

          {/* Search */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a city or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Search Results */}
            {isSearching && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-emerald-500 border-t-transparent"></div>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {searchResults.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(location)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                      selectedLocation?.latitude === location.latitude && selectedLocation?.longitude === location.longitude
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {location.address}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {searchQuery && !isSearching && searchResults.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No locations found for &quot;{searchQuery}&quot;
              </div>
            )}
          </div>

          {/* Selected Location */}
          {selectedLocation && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Selected Location</h3>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="text-gray-900 dark:text-gray-100">{selectedLocation.address}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveLocation}
            disabled={!selectedLocation}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            Save Location
          </button>
        </div>
      </div>
    </div>
  );
}
