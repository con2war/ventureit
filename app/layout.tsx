import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CookieConsent } from "@/components/cookie-consent";
import { structuredData } from './structured-data'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Venture IT Solutions | Web Development Northern Ireland',
  description: 'Professional web development and design services in Northern Ireland. Expert website developers in Belfast, Dublin & across Ireland. Custom web applications, e-commerce solutions & responsive design.',
  keywords: 'web development northern ireland, website design belfast, web developer ireland, custom web applications ni, ecommerce websites ireland, responsive web design belfast, web development company ireland, website development ni, digital solutions northern ireland, web app development belfast',
  openGraph: {
    title: 'Venture IT Solutions | Web Development Northern Ireland',
    description: 'Professional web development and design services in Northern Ireland. Expert website developers in Belfast, Dublin & across Ireland.',
    images: ['/images/venture_logo.png'],
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.ventureit-solutions.com'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="geo.region" content="GB-NIR" />
        <meta name="geo.placename" content="Belfast" />
        <meta name="geo.position" content="54.597285;-5.93012" />
        <meta name="ICBM" content="54.597285, -5.93012" />
        <meta name="description" content="Professional web development services in Northern Ireland." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Toaster />
        <div id="cookie-consent-container">
          <CookieConsent />
        </div>
      </body>
    </html>
  )
}
