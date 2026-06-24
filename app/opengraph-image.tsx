import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

export const alt = SITE.name
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const domain = (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'tradecraftlabs.vercel.app'
  ).replace('https://', '').replace('http://', '')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FAFAF8',
          position: 'relative',
        }}
      >
        {/* Left navy accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 10,
            backgroundColor: '#1E3A5F',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            paddingLeft: 80,
            paddingRight: 80,
            paddingTop: 72,
            paddingBottom: 72,
          }}
        >
          {/* Top: wordmark + descriptor */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span
              style={{
                fontSize: 20,
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                color: '#1E3A5F',
                letterSpacing: 4,
              }}
            >
              {SITE.name.toUpperCase()}
            </span>
            <div
              style={{
                width: 1,
                height: 18,
                backgroundColor: '#D1D5DB',
                marginLeft: 4,
                marginRight: 4,
              }}
            />
            <span
              style={{
                fontSize: 16,
                color: '#5E6779',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Independent Research
            </span>
          </div>

          {/* Mission statement */}
          <div style={{ display: 'flex', maxWidth: 1000 }}>
            <span
              style={{
                fontSize: 48,
                fontFamily: 'Georgia, serif',
                fontWeight: 400,
                color: '#1A1A1A',
                lineHeight: 1.28,
              }}
            >
              {SITE.mission.full}
            </span>
          </div>

          {/* Bottom: domain */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 36,
                height: 3,
                backgroundColor: '#1E3A5F',
              }}
            />
            <span
              style={{
                fontSize: 18,
                color: '#5E6779',
                fontFamily: 'system-ui, sans-serif',
                letterSpacing: 0.5,
              }}
            >
              {domain}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
