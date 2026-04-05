import { Coordinates, Qibla } from 'adhan'

/**
 * Qibla direction utilities
 * Calculate the direction to Mecca (Kaaba) from any location using industry-standard adhan library.
 */

export interface QiblaInfo {
  direction: number // Degrees from North (0-360)
  distance: number // Distance in kilometers
}

/**
 * Calculate Qibla direction from given coordinates using Adhan library
 */
export function calculateQiblaDirection(
  latitude: number,
  longitude: number
): QiblaInfo {
  const coordinates = new Coordinates(latitude, longitude)
  const bearing = Qibla(coordinates)

  // Calculate distance using Haversine formula (Standard practice)
  const KAABA_COORDINATES = {
    latitude: 21.4225,
    longitude: 39.8262
  }

  const R = 6371 // Earth's radius in kilometers
  const lat1 = toRadians(latitude)
  const lon1 = toRadians(longitude)
  const lat2 = toRadians(KAABA_COORDINATES.latitude)
  const lon2 = toRadians(KAABA_COORDINATES.longitude)

  const dLat = lat2 - lat1
  const dLon = lon2 - lon1

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return {
    direction: Math.round(bearing),
    distance: Math.round(distance)
  }
}

/**
 * Resolves the absolute compass heading (degrees from North) across different browsers/OS.
 * @param event The DeviceOrientationEvent
 * @returns The absolute heading in degrees (0-360), where 0 is true North.
 */
export function getAbsoluteHeading(event: any): number | null {
  // iOS (Safari)
  if (event.webkitCompassHeading !== undefined) {
    return event.webkitCompassHeading
  }
  
  // Android / Chrome (Absolute Orientation)
  // Check for 'absolute' property which signifies absolute orientation relative to Earth's magnetic North
  if (event.absolute && event.alpha !== null) {
    return 360 - event.alpha
  }

  // Fallback for alpha if no absolute property (might be relative on some devices)
  if (event.alpha !== null) {
    return 360 - event.alpha
  }
  
  return null
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Get compass direction name from degrees
 */
export function getCompassDirection(degrees: number): string {
  const directions = [
    'N', 'NNE', 'NE', 'ENE',
    'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW'
  ]
  
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}
