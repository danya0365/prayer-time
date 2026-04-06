'use client'

import { useState, useEffect } from 'react'
import { calculateQiblaDirection, getAbsoluteHeading, getCompassDirection, QiblaInfo, smoothAngle } from '@/utils/qibla-utils'

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
  const [isManualMode, setIsManualMode] = useState<boolean>(false)
  const [calibrationProgress, setCalibrationProgress] = useState<number>(0)
  const [isCalibrationComplete, setIsCalibrationComplete] = useState<boolean>(false)
  const [visitedBins, setVisitedBins] = useState({
    alpha: new Set<number>(),
    beta: new Set<number>(),
    gamma: new Set<number>()
  })

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
      // Safely check for DeviceOrientationEvent on window
      const DeviceEvent = (window as unknown as Window & { 
        DeviceOrientationEvent?: { 
          requestPermission?: () => Promise<'granted' | 'denied'> 
        } 
      }).DeviceOrientationEvent

      if (DeviceEvent && typeof DeviceEvent.requestPermission === 'function') {
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
        setDeviceHeading(prev => smoothAngle(heading, prev, 0.15))
        if (isStaticMode) setIsStaticMode(false)
      }

      // Calibration logic
      if (!isCalibrationComplete) {
        const { alpha, beta, gamma } = event
        if (alpha !== null && beta !== null && gamma !== null) {
          const alphaBin = Math.floor(alpha / 30) // 12 bins
          const betaBin = Math.floor((beta + 180) / 60) // 6 bins
          const gammaBin = Math.floor((gamma + 90) / 30) // 6 bins

          setVisitedBins(prev => {
            const newAlpha = new Set(prev.alpha).add(alphaBin)
            const newBeta = new Set(prev.beta).add(betaBin)
            const newGamma = new Set(prev.gamma).add(gammaBin)
            
            // Calculate progress: 50% alpha, 25% beta, 25% gamma
            // We want them to visit at least 8 bins of alpha, 3 of beta, 3 of gamma
            const alphaSize = newAlpha.size
            const betaSize = newBeta.size
            const gammaSize = newGamma.size

            const alphaProgress = Math.min(alphaSize / 8, 1) * 50
            const betaProgress = Math.min(betaSize / 3, 1) * 25
            const gammaProgress = Math.min(gammaSize / 3, 1) * 25
            
            const totalProgress = Math.round(alphaProgress + betaProgress + gammaProgress)
            setCalibrationProgress(totalProgress)
            
            if (totalProgress >= 100) {
              setIsCalibrationComplete(true)
            }

            return { alpha: newAlpha, beta: newBeta, gamma: newGamma }
          })
        }
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

  const currentHeading = (isStaticMode || isManualMode) ? manualHeading : deviceHeading
  const compassDirection = qiblaInfo ? getCompassDirection(qiblaInfo.direction) : ""
  
  // Calculate relative angle normalized to -180 to 180
  const qiblaRelativeAngle = qiblaInfo ? qiblaInfo.direction - currentHeading : 0
  const normalizedRelativeAngle = ((((qiblaRelativeAngle + 180) % 360) + 360) % 360) - 180
  const isAligned = Math.abs(normalizedRelativeAngle) < 3

  return {
    qiblaInfo,
    deviceHeading,
    isStaticMode,
    isManualMode,
    setIsManualMode,
    manualHeading,
    setManualHeading,
    permissionGranted,
    currentHeading,
    isAligned,
    compassDirection,
    mounted,
    calibrationProgress,
    isCalibrationComplete,
    skipCalibration: () => setIsCalibrationComplete(true)
  }
}
