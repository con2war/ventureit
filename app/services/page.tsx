import { Header } from '@/components/header'
import { ServicesHero } from '@/components/services-hero'
import { ServicesContent } from '@/components/services-content'
import { LocationsGrid } from '@/components/locations-grid'
import { Footer } from '@/components/footer'

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <ServicesContent />
        <LocationsGrid />
      </main>
      <Footer />
    </>
  )
} 