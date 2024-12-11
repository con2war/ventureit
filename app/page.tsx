import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Testimonials } from '@/components/testimonials'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'
import { BlogPostsList } from '@/components/blog-posts-list'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Testimonials />
        <Suspense fallback={<div>Loading...</div>}>
          <BlogPostsList />
        </Suspense>
        <section id="contact" className="bg-black py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl text-center">
                Contact Us
              </h2>
              <p className="mt-4 text-lg text-gray-300 text-center">
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

