import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Testimonials } from '@/components/testimonials'
import { BlogPostsList } from '@/components/blog-posts-list'
import { ContactForm } from '@/components/contact-form'
import { Suspense } from 'react'
import { Footer } from '@/components/footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Suspense fallback={
          <div className="bg-background py-24">
            <div className="max-w-7xl mx-auto px-4">Loading posts...</div>
          </div>
        }>
          {/* @ts-expect-error Async Server Component */}
          <BlogPostsList />
        </Suspense>
        <Testimonials />
        <section id="contact" className="bg-background py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl text-center">
                Contact Us
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-center">
                Ready to transform your business? Get in touch with us today.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

