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
  title: 'Venture IT Solutions | Web Design Sydney & Northern Ireland',
  description: 'Professional web development services in Sydney and Northern Ireland. Custom websites, e-commerce solutions, and web applications for businesses globally.',
  keywords: 'web development sydney, web design sydney, web developer sydney, web design bondi, web design coogee, web design randwick, web design eastern suburbs, web design inner east, web design inner west, web design north shore, web design northern beaches, custom web design sydney, ecommerce websites sydney, responsive web design sydney, web development company sydney, website development sydney, digital solutions sydney, web development bondi, web development coogee, web development randwick, web design northern ireland, web design belfast, web developer ni, web design ni, custom web design ni, ecommerce websites ireland, responsive web design belfast, web development company ireland, website development ni, digital solutions northern ireland, web development belfast',
  openGraph: {
    title: 'Venture IT Solutions | Web Development Sydney & Northern Ireland',
    description: 'Professional web development and design services in Sydney and Northern Ireland. Expert website developers in Bondi, Coogee, Randwick, Eastern Suburbs & across Sydney and Ireland.',
    images: ['/images/venture_logo.png'],
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
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
