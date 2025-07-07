'use client'

import { motion } from 'framer-motion'
import { ProjectList } from '@/components/project-list'
import Link from 'next/link'
import { FAQAccordion } from "@/components/faq-accordion"

export function ProjectsContent() {
  return (
    <>
      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold text-foreground sm:text-6xl text-center mb-12"
          >
            Our Projects
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-16"
          >
            <Link
              href="/#contact"
              className="text-primary hover:text-primary/90 underline text-lg"
            >
              Get in touch to start your project →
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto"
          >
            Explore some of our recent projects and see how We&apos;ve helped businesses transform their digital presence.
          </motion.p>
          <ProjectList />
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FAQAccordion />
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/estimator"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md transition-colors"
          >
            Get an Estimate
          </Link>
          <Link
            href="/#faq"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-primary hover:text-primary/90 transition-colors"
          >
            View More FAQs
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </Link>
        </div>
    </>
  )
} 