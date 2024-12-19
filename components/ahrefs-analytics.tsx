'use client'

import Script from 'next/script'

export function AhrefsAnalytics() {
  return (
    <Script
      src="https://analytics.ahrefs.com/analytics.js"
      data-key="DIlWBTipc1V/4vmR9a75OA"
      strategy="afterInteractive"
    />
  )
} 