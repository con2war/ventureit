import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Testimonials } from '@/components/testimonials'
import { BlogPostsList } from '@/components/blog-posts-list'
import { ContactForm } from '@/components/contact-form'
import { HomeFAQ } from '@/components/home-faq'
import { Footer } from '@/components/footer'
import { Metadata } from 'next'
import { locations } from '@/config/locations'

export async function generateStaticParams() {
  return locations.map((location) => ({
    location: location,
  }))
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { location: string } }): Promise<Metadata> {
  const location = params.location.replace(/-/g, ' ')
  const capitalizedLocation = location.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `Web Design ${capitalizedLocation} | Professional Web Development Services`,
    description: `Professional web design services in ${capitalizedLocation}. Custom websites, e-commerce solutions, and web applications for local businesses. Contact us today!`,
    keywords: `web design ${location}, web development ${location}, website designer ${location}, ecommerce website ${location}, business website ${location}`,
  }
}

export default function LocationPage({ params }: { params: { location: string } }) {
  const location = params.location.replace(/-/g, ' ')
  const capitalizedLocation = location.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Hero 
          title={`Web Design ${capitalizedLocation}`}
          subtitle={`Professional web design services for businesses in ${capitalizedLocation}. Custom websites, e-commerce solutions, and web applications tailored for your business.`}
          location={capitalizedLocation}
        />
        <Services location={capitalizedLocation} />
        <Testimonials location={capitalizedLocation} />
        <ContactForm location={capitalizedLocation} />
        <HomeFAQ location={capitalizedLocation} />
      </main>
      <Footer />
    </div>
  )
} 