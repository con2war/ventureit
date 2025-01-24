import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Testimonials } from '@/components/testimonials'
import { BlogPostsList } from '@/components/blog-posts-list'
import { ContactForm } from '@/components/contact-form'
import { Suspense } from 'react'
import { Footer } from '@/components/footer'
import { HomeFAQ } from '@/components/home-faq'
import { ServicesContent } from '@/components/services-content'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ServicesContent   />
        <Testimonials />
        <ContactForm />
        <Suspense fallback={
          <div className="bg-background py-24">
            <div className="max-w-7xl mx-auto px-4">Loading posts...</div>
          </div>
        }>
          {/* @ts-expect-error Async Server Component */}
          <BlogPostsList />
        </Suspense>
        <HomeFAQ />
      </main>
      <Footer />
    </div>
  )
}

