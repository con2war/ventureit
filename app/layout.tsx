import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CookieConsent } from "@/components/cookie-consent";
import { NewsletterPopup } from '@/components/newsletter-popup'
import { ThemeProvider } from "@/components/theme-provider"
import { AhrefsAnalytics } from '@/components/ahrefs-analytics'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
          <CookieConsent />
          <NewsletterPopup />
        </ThemeProvider>
        <AhrefsAnalytics />
      </body>
    </html>
  )
}
