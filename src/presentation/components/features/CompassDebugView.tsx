'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// ─── Type augmentation ────────────────────────────────────────────────────────

/** iOS Safari extends DeviceOrientationEvent with webkitCompassHeading */
interface DeviceOrientationEventWithWebkit extends DeviceOrientationEvent {
  readonly webkitCompassHeading: number | null
}

/**
 * iOS 13+ requires explicit permission before reading orientation sensors.
 * This interface describes the static side of DeviceOrientationEvent on iOS.
 */
interface DeviceOrientationEventStatic {
  new (type: string, eventInitDict?: DeviceOrientationEventInit): DeviceOrientationEvent
  requestPermission?: () => Promise<PermissionState>
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DIRECTIONS = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
] as const

function getDirection(deg: number): string {
  return DIRECTIONS[Math.round(deg / 22.5) % 16]
}

function shortestPath(from: number, to: number): number {
  const diff = ((to - from + 540) % 360) - 180
  return from + diff
}

function hasRequestPermission(
  ctor: typeof DeviceOrientationEvent,
): ctor is typeof DeviceOrientationEvent & DeviceOrientationEventStatic {
  return typeof (ctor as unknown as DeviceOrientationEventStatic).requestPermission === 'function'
}

function isWebkitEvent(e: DeviceOrientationEvent): e is DeviceOrientationEventWithWebkit {
  return 'webkitCompassHeading' in e
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = 'idle' | 'active' | 'error' | 'permission'

interface Tick {
  x1: number; y1: number
  x2: number; y2: number
  isMajor: boolean
  isMed: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Compass() {
  const [heading, setHeading] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
  const [statusMsg, setStatusMsg] = useState('Initializing...')
  const [needsPermission, setNeedsPermission] = useState(false)

  const needleRef = useRef<HTMLDivElement>(null)
  const currentAngle = useRef(0)
  const targetAngle = useRef(0)
  const rafRef = useRef<number>(0)
  const receivedData = useRef(false)

  const updateHeading = useCallback((alpha: number) => {
    const h = Math.round((360 - alpha + 360) % 360)
    setHeading(h)
    targetAngle.current = shortestPath(currentAngle.current, 360 - alpha)
    if (!receivedData.current) {
      receivedData.current = true
      setStatus('active')
      setStatusMsg('Live · Device sensor')
    }
  }, [])

  const startListening = useCallback(() => {
    const onAbsolute = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) updateHeading(e.alpha)
    }

    const onOrientation = (e: DeviceOrientationEvent) => {
      if (isWebkitEvent(e) && e.webkitCompassHeading !== null) {
        updateHeading(360 - e.webkitCompassHeading)
      } else if (e.alpha !== null) {
        updateHeading(e.alpha)
      }
    }

    window.addEventListener('deviceorientationabsolute', onAbsolute, true)
    window.addEventListener('deviceorientation', onOrientation, true)

    const timer = setTimeout(() => {
      if (!receivedData.current) {
        setStatus('error')
        setStatusMsg('No sensor detected on this device')
      }
    }, 3000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('deviceorientationabsolute', onAbsolute, true)
      window.removeEventListener('deviceorientation', onOrientation, true)
    }
  }, [updateHeading])

  // RAF animation loop
  useEffect(() => {
    const loop = () => {
      const diff = targetAngle.current - currentAngle.current
      currentAngle.current += diff * 0.1
      if (needleRef.current) {
        needleRef.current.style.transform = `rotate(${currentAngle.current}deg)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Init sensor
  useEffect(() => {
    if (typeof DeviceOrientationEvent === 'undefined') {
      setStatus('error')
      setStatusMsg('DeviceOrientation not supported')
      return
    }

    if (hasRequestPermission(DeviceOrientationEvent)) {
      setStatus('permission')
      setStatusMsg('Tap to enable compass')
      setNeedsPermission(true)
      return
    }

    setStatusMsg('Waiting for sensor...')
    return startListening()
  }, [startListening])

  const requestPermission = async () => {
    if (!hasRequestPermission(DeviceOrientationEvent)) return

    try {
      const ctor = DeviceOrientationEvent as unknown as DeviceOrientationEventStatic
      const result = await ctor.requestPermission!()
      if (result === 'granted') {
        setNeedsPermission(false)
        setStatusMsg('Waiting for sensor...')
        startListening()
      } else {
        setStatus('error')
        setStatusMsg('Sensor permission denied')
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error'
      setStatus('error')
      setStatusMsg(`Permission error: ${msg}`)
    }
  }

  const dir = getDirection(heading)
  const isNorth = dir === 'N'

  const ticks: Tick[] = Array.from({ length: 72 }, (_, i) => {
    const angle = i * 5
    const rad = (angle * Math.PI) / 180
    const cx = 160, cy = 160, r = 148
    const isMajor = i % 9 === 0
    const isMed = i % 3 === 0
    const len = isMajor ? 20 : isMed ? 12 : 7
    return {
      x1: cx + r * Math.sin(rad),
      y1: cy - r * Math.cos(rad),
      x2: cx + (r - len) * Math.sin(rad),
      y2: cy - (r - len) * Math.cos(rad),
      isMajor,
      isMed,
    }
  })

  const cardinals = [
    { label: 'N', x: 160, y: 26, color: '#c9a96e' },
    { label: 'S', x: 160, y: 300, color: '#3a3830' },
    { label: 'E', x: 299, y: 165, color: '#3a3830' },
    { label: 'W', x: 21, y: 165, color: '#3a3830' },
  ] as const

  const intercardinals = [
    { label: 'NE', angle: 45 },
    { label: 'SE', angle: 135 },
    { label: 'SW', angle: 225 },
    { label: 'NW', angle: 315 },
  ] as const

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#0a0a0f',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Mono', 'Courier New', monospace",
      color: '#e8e4d9',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      padding: '2rem 1rem',
      gap: '2.5rem',
    }}>

      {/* Top info bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        width: '100%',
        maxWidth: 360,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: 56,
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: isNorth ? '#c9a96e' : '#e8e4d9',
            transition: 'color 0.4s ease',
          }}>{dir}</div>
          <div style={{
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#4a4845',
            textTransform: 'uppercase',
            marginTop: 4,
          }}>direction</div>
        </div>

        <div style={{ width: 1, height: 60, background: '#1e1e28' }} />

        <div>
          <div style={{
            fontSize: 56,
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {String(heading).padStart(3, '0')}
            <span style={{ fontSize: 28, color: '#4a4845', marginLeft: 2 }}>°</span>
          </div>
          <div style={{
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#4a4845',
            textTransform: 'uppercase',
            marginTop: 4,
          }}>heading</div>
        </div>
      </div>

      {/* Compass dial */}
      <div style={{ position: 'relative', width: 320, height: 320, flexShrink: 0 }}>
        <div style={{
          position: 'absolute',
          inset: -8,
          borderRadius: '50%',
          background: 'radial-gradient(circle, transparent 60%, rgba(201,169,110,0.04) 100%)',
          pointerEvents: 'none',
        }} />

        <svg
          width="320" height="320"
          viewBox="0 0 320 320"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', inset: 0 }}
        >
          <circle cx="160" cy="160" r="156" fill="none" stroke="#1a1a24" strokeWidth="1" />
          <circle cx="160" cy="160" r="150" fill="#0d0d16" stroke="#252530" strokeWidth="0.5" />
          <circle cx="160" cy="160" r="120" fill="none" stroke="#1a1a24" strokeWidth="0.5" />

          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={t.isMajor ? '#3a3830' : t.isMed ? '#252525' : '#1c1c20'}
              strokeWidth={t.isMajor ? 1.5 : 1}
            />
          ))}

          {cardinals.map((c) => (
            <text
              key={c.label}
              x={c.x} y={c.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="15"
              fontWeight="500"
              fontFamily="'DM Mono', monospace"
              letterSpacing="0.05em"
              fill={c.color}
            >
              {c.label}
            </text>
          ))}

          {intercardinals.map((c) => {
            const rad = (c.angle * Math.PI) / 180
            const r2 = 132
            return (
              <text
                key={c.label}
                x={160 + r2 * Math.sin(rad)}
                y={160 - r2 * Math.cos(rad)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fontFamily="'DM Mono', monospace"
                letterSpacing="0.05em"
                fill="#28282e"
              >
                {c.label}
              </text>
            )
          })}

          <circle cx="160" cy="160" r="5" fill="#1a1a24" stroke="#3a3830" strokeWidth="1" />
        </svg>

        {/* Rotating needle */}
        <div
          ref={needleRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform',
          }}
        >
          <svg width="32" height="220" viewBox="0 0 32 220" xmlns="http://www.w3.org/2000/svg">
            <polygon points="16,6 22,110 16,100 10,110" fill="#c9a96e" />
            <polygon points="16,6 10,110 16,100 22,110" fill="#a8885a" />
            <polygon points="16,214 22,110 16,120 10,110" fill="#2a2a32" />
            <polygon points="16,214 10,110 16,120 22,110" fill="#1e1e26" />
            <circle cx="16" cy="110" r="6" fill="#0d0d16" stroke="#3a3830" strokeWidth="1.5" />
            <circle cx="16" cy="110" r="2.5" fill="#c9a96e" />
          </svg>
        </div>

        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{
            width: 50, height: 50,
            borderRadius: '50%',
            border: '0.5px solid #1e1e28',
          }} />
        </div>
      </div>

      {/* Status */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 12,
          letterSpacing: '0.12em',
          color: status === 'active' ? '#5a7a5a' : status === 'error' ? '#7a4a4a' : '#3a3830',
        }}>
          <div style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: status === 'active' ? '#4a9e6a' : status === 'error' ? '#9e4a4a' : '#3a3830',
            boxShadow: status === 'active' ? '0 0 8px rgba(74,158,106,0.5)' : 'none',
            animation: status === 'active' ? 'pulse 2s infinite' : 'none',
          }} />
          {statusMsg}
        </div>

        {needsPermission && (
          <button
            onClick={requestPermission}
            style={{
              padding: '10px 28px',
              background: 'transparent',
              border: '1px solid #2a2a38',
              borderRadius: 2,
              color: '#c9a96e',
              fontSize: 12,
              letterSpacing: '0.15em',
              fontFamily: 'inherit',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#14141e' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            Enable Sensor
          </button>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}