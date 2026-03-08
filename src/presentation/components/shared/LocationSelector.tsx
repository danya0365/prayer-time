"use client";

import { useTranslation } from "@/src/presentation/hooks/useTranslation";
import { LocationData, useLocationStore } from "@/src/presentation/stores/locationStore";
import { useSettingsStore } from "@/src/presentation/stores/settingsStore";
import { MapPin, Navigation, Search, X } from "lucide-react";
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useMemo, useRef, useState } from "react";
import Map, { Marker, ViewStateChangeEvent } from "react-map-gl/maplibre";

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationSelector({
  isOpen,
  onClose,
}: LocationSelectorProps) {
  const { currentLocation, setLocation } =
    useLocationStore();
  const { settings } = useSettingsStore();
  const { t } = useTranslation({ language: settings.language });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    currentLocation
  );
  
  const [viewState, setViewState] = useState({
    longitude: currentLocation?.longitude || 100.5018,
    latitude: currentLocation?.latitude || 13.7563,
    zoom: 5
  });

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
        {
          latitude: 13.7563,
          longitude: 100.5018,
          address: "Bangkok, Thailand",
          city: "Bangkok",
          country: "Thailand",
        },
        {
          latitude: 18.7883,
          longitude: 98.9853,
          address: "Chiang Mai, Thailand",
          city: "Chiang Mai",
          country: "Thailand",
        },
        {
          latitude: 7.8804,
          longitude: 98.3923,
          address: "Phuket, Thailand",
          city: "Phuket",
          country: "Thailand",
        },
        {
          latitude: 21.0285,
          longitude: 105.8542,
          address: "Hanoi, Vietnam",
          city: "Hanoi",
          country: "Vietnam",
        },
        {
          latitude: 1.3521,
          longitude: 103.8198,
          address: "Singapore",
          city: "Singapore",
          country: "Singapore",
        },
        {
          latitude: 3.139,
          longitude: 101.6869,
          address: "Kuala Lumpur, Malaysia",
          city: "Kuala Lumpur",
          country: "Malaysia",
        },
        {
          latitude: -6.2088,
          longitude: 106.8456,
          address: "Jakarta, Indonesia",
          city: "Jakarta",
          country: "Indonesia",
        },
        {
          latitude: 14.5995,
          longitude: 120.9842,
          address: "Manila, Philippines",
          city: "Manila",
          country: "Philippines",
        },
      ];

      const filtered = commonCities.filter(
        (city) =>
          city.address.toLowerCase().includes(query.toLowerCase()) ||
          city.city.toLowerCase().includes(query.toLowerCase()) ||
          city.country.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filtered);
    } catch (error) {
      console.error("Error searching locations:", error);
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

  useEffect(() => {
    if (selectedLocation) {
      setViewState(prev => ({
        ...prev,
        longitude: selectedLocation.longitude,
        latitude: selectedLocation.latitude,
      }));
    }
  }, [selectedLocation]);

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      setLocation(selectedLocation);
      onClose();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  const handleUseCurrentLocation = async () => {
    setIsSearching(true);
    try {
      if (!navigator.geolocation) return;

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        });
      });

      const { latitude, longitude } = position.coords;

      setViewState((prev) => ({
        ...prev,
        longitude,
        latitude,
        zoom: 12,
      }));

      // Force map to pan/zoom
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 12,
          duration: 2000,
        });
      }

      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );

        if (response.ok) {
          const data = await response.json();
          setSelectedLocation({
            latitude,
            longitude,
            address: data.locality || data.city || "Current Location",
            city: data.city || data.locality,
            country: data.countryName,
          });
        } else {
          setSelectedLocation({
            latitude,
            longitude,
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
        }
      } catch {
        setSelectedLocation({
          latitude,
          longitude,
          address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        });
      }
    } catch (error) {
      console.error("Error getting current location:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const mapStyle = useMemo(() => ({
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap contributors',
      },
    },
    layers: [
      {
        id: 'osm-tiles',
        type: 'raster',
        source: 'osm',
        minzoom: 0,
        maxzoom: 19,
      },
    ],
  }), []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {t.location.selectLocation}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-muted hover:text-muted-dark rounded-md hover:bg-muted-light"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
          
          {/* Left panel: List & Search */}
          <div className="w-full md:w-1/3 p-6 space-y-6 overflow-y-auto border-r border-border min-h-0">
            <button
              onClick={handleUseCurrentLocation}
              className="w-full flex items-center gap-3 p-4 border border-primary-light rounded-lg hover:bg-primary-light/20 transition-colors"
            >
              <Navigation className="h-5 w-5 text-primary shrink-0" />
              <div className="text-left min-w-0">
                <p className="font-medium text-foreground truncate">
                  {t.location.useCurrentLocation}
                </p>
                <p className="text-sm text-muted truncate">
                  {t.location.useCurrentLocationDesc}
                </p>
              </div>
            </button>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
                <input
                  type="text"
                  placeholder={t.location.searchLocationPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground bg-background"
                />
              </div>

              {/* Search Results */}
              {isSearching && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {searchResults.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => handleLocationSelect(location)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                        selectedLocation?.latitude === location.latitude &&
                        selectedLocation?.longitude === location.longitude
                          ? "border-primary bg-primary-light/20"
                          : "border-border hover:bg-muted-light"
                      }`}
                    >
                      <MapPin className="h-4 w-4 text-muted flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground truncate">
                          {location.address}
                        </p>
                        <p className="text-sm text-muted truncate">
                          {location.latitude.toFixed(4)},{" "}
                          {location.longitude.toFixed(4)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {searchQuery && !isSearching && searchResults.length === 0 && (
                <div className="text-center py-8 text-muted">
                  {t.location.noLocationsFound.replace(
                    "{searchQuery}",
                    searchQuery
                  )}
                </div>
              )}
            </div>

            {/* Selected Location Summary */}
            {selectedLocation && (
              <div className="border border-border rounded-lg p-4 bg-muted-light/30">
                <h3 className="font-medium text-foreground mb-2">
                  {t.location.selectedLocation}
                </h3>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-foreground break-words">{selectedLocation.address || "Custom Location"}</p>
                    <p className="text-sm text-muted">
                      {selectedLocation.latitude.toFixed(4)},{" "}
                      {selectedLocation.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right panel: Map */}
          <div className="w-full md:w-2/3 h-64 md:h-auto min-h-[300px] relative bg-muted">
            <Map
              ref={mapRef}
              {...viewState}
              onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              mapStyle={mapStyle as any}
              onClick={async (e) => {
                const lng = e.lngLat.lng;
                const lat = e.lngLat.lat;

                // Set temporary state while searching
                setSelectedLocation({
                  latitude: lat,
                  longitude: lng,
                  address: "Loading location...",
                  city: "",
                  country: "Thailand",
                });
                setIsSearching(true);

                try {
                  const response = await fetch(
                    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
                  );

                  if (response.ok) {
                    const data = await response.json();
                    setSelectedLocation({
                      latitude: lat,
                      longitude: lng,
                      address: data.locality || data.city || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
                      city: data.city || data.locality,
                      country: data.countryName || "Unknown",
                    });
                  } else {
                    setSelectedLocation({
                      latitude: lat,
                      longitude: lng,
                      address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
                    });
                  }
                } catch {
                  setSelectedLocation({
                    latitude: lat,
                    longitude: lng,
                    address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
                  });
                } finally {
                  setIsSearching(false);
                }
              }}
              cursor="crosshair"
            >
              {/* Marker for selected location */}
              {selectedLocation && (
                <Marker longitude={selectedLocation.longitude} latitude={selectedLocation.latitude}>
                  <div className="text-primary transform -translate-y-1/2">
                    <MapPin className="h-8 w-8 fill-primary stroke-background" strokeWidth={1} />
                  </div>
                </Marker>
              )}
            </Map>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 md:p-6 border-t border-border mt-auto">
          <button
            onClick={onClose}
            className="px-4 py-2 text-muted-dark hover:text-foreground transition-colors"
          >
            {t.ui.cancel}
          </button>
          <button
            onClick={handleSaveLocation}
            disabled={!selectedLocation}
            className="px-6 py-2 bg-primary hover:bg-primary-dark disabled:bg-muted disabled:cursor-not-allowed text-white rounded-lg transition-colors shadow-sm"
          >
            {t.location.saveLocation}
          </button>
        </div>
      </div>
    </div>
  );
}
