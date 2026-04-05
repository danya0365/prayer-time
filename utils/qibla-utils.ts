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
  // iOS (Safari) - uses webkitCompassHeading directly
  if (event.webkitCompassHeading !== undefined) {
    const heading = event.webkitCompassHeading
    return heading < 0 ? heading + 360 : heading
  }
  
  // Android / Chrome (Absolute Orientation)
  // deviceorientationabsolute event gives absolute alpha relative to North
  // If we have an alpha and it's flagged as absolute, or it's from the absolute event
  if (event.alpha !== null) {
    if (event.absolute === true || ('ondeviceorientationabsolute' in window)) {
      // In deviceorientationabsolute, alpha 0 = North, and it increases counter-clockwise (standard sensor)
      // So heading (clockwise) = 360 - alpha
      const heading = (360 - event.alpha) % 360
      return heading
    }
  }
  
  return null
}

/**
 * Low-pass filter for angles that handles the 0/360 wrap-around issue.
 * @param current The current raw angle from sensor
 * @param last The last smoothed angle
 * @param alpha Smoothing factor (0 to 1). Lower = smoother/slower, Higher = noisier/faster.
 * @returns Smoothed angle
 */
export function smoothAngle(current: number, last: number, alpha: number = 0.15): number {
  if (last === undefined || last === null) return current;

  let diff = current - last;

  // Handle wrap-around (shortest path)
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;

  // Apply smoothing factor
  const result = (last + (diff * alpha) + 360) % 360;
  
  return result;
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
