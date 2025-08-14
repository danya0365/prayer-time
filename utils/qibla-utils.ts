/**
 * Qibla direction utilities
 * Calculate the direction to Mecca (Kaaba) from any location
 */

export interface QiblaInfo {
  direction: number // Degrees from North (0-360)
  distance: number // Distance in kilometers
}

// Kaaba coordinates in Mecca, Saudi Arabia
const KAABA_COORDINATES = {
  latitude: 21.4225,
  longitude: 39.8262
}

/**
 * Calculate Qibla direction from given coordinates
 */
export function calculateQiblaDirection(
  latitude: number,
  longitude: number
): QiblaInfo {
  const lat1 = toRadians(latitude)
  const lon1 = toRadians(longitude)
  const lat2 = toRadians(KAABA_COORDINATES.latitude)
  const lon2 = toRadians(KAABA_COORDINATES.longitude)

  const deltaLon = lon2 - lon1

  const y = Math.sin(deltaLon) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon)

  let bearing = Math.atan2(y, x)
  bearing = toDegrees(bearing)
  bearing = (bearing + 360) % 360 // Normalize to 0-360

  // Calculate distance using Haversine formula
  const R = 6371 // Earth's radius in kilometers
  const dLat = lat2 - lat1
  const dLon = deltaLon

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
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Convert radians to degrees
 */
function toDegrees(radians: number): number {
  return radians * (180 / Math.PI)
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
