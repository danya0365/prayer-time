'use client'

import { useState, useEffect } from 'react'
import { calculateQiblaDirection, getAbsoluteHeading, getCompassDirection, QiblaInfo } from '@/utils/qibla-utils'

interface UseQiblaProps {
  latitude?: number
  longitude?: number
}

export function useQibla({ latitude, longitude }: UseQiblaProps) {
  const [qiblaInfo, setQiblaInfo] = useState<QiblaInfo | null>(null)
  const [deviceHeading, setDeviceHeading] = useState<number>(0)
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)
  const [isStaticMode, setIsStaticMode] = useState<boolean>(true)
  const [manualHeading, setManualHeading] = useState<number>(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (latitude && longitude) {
      const info = calculateQiblaDirection(latitude, longitude)
      setQiblaInfo(info)
    }
  }, [latitude, longitude])

  useEffect(() => {
    if (!mounted) return

    const requestOrientationPermission = async () => {
      const DeviceEvent = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied'>;
      }

      if (typeof DeviceEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceEvent.requestPermission()
          const granted = permission === 'granted'
          setPermissionGranted(granted)
          if (granted) setIsStaticMode(false)
        } catch (error) {
          console.error('Error requesting device orientation permission:', error)
        }
      } else if (typeof DeviceOrientationEvent !== 'undefined') {
        setPermissionGranted(true)
      }
    }

    requestOrientationPermission()
  }, [mounted])

  useEffect(() => {
    if (!permissionGranted || !mounted) return

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const heading = getAbsoluteHeading(event)
      if (heading !== null) {
        setDeviceHeading(heading)
        if (isStaticMode) setIsStaticMode(false)
      }
    }

    window.addEventListener('deviceorientation', handleOrientation)
    if ('ondeviceorientationabsolute' in window) {
      window.addEventListener('deviceorientationabsolute', handleOrientation)
    }
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
      window.removeEventListener('deviceorientationabsolute', handleOrientation)
    }
  }, [permissionGranted, mounted, isStaticMode])

  const currentHeading = isStaticMode ? manualHeading : deviceHeading
  const compassDirection = qiblaInfo ? getCompassDirection(qiblaInfo.direction) : ""
  
  // Calculate relative angle normalized to -180 to 180
  const qiblaRelativeAngle = qiblaInfo ? qiblaInfo.direction - currentHeading : 0
  const normalizedRelativeAngle = ((((qiblaRelativeAngle + 180) % 360) + 360) % 360) - 180
  const isAligned = Math.abs(normalizedRelativeAngle) < 3

  return {
    qiblaInfo,
    deviceHeading,
    isStaticMode,
    manualHeading,
    setManualHeading,
    permissionGranted,
    currentHeading,
    isAligned,
    compassDirection,
    mounted
  }
}
