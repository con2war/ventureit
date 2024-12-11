import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Testimonials } from '@/components/testimonials'
import { BlogPostsList } from '@/components/blog-posts-list'
import { ContactForm } from '@/components/contact-form'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Testimonials />
        <Suspense fallback={
          <div className="bg-black py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              Loading posts...
            </div>
          </div>
        }>
          {/* @ts-expect-error Async Server Component */}
          <BlogPostsList />
        </Suspense>
        <section id="contact" className="bg-black py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h1 className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-white sm:text-5xl">
                Get In Touch
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
                Have a project in mind? Let's discuss how we can help bring your ideas to life.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  )
}

