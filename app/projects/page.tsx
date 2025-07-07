'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProjectList } from '@/components/project-list'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQAccordion } from "@/components/faq-accordion"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Projects | Venture IT Solutions',
  description: 'Explore our recent web design and development projects. See how we\'ve helped businesses in Sydney and Northern Ireland transform their digital presence.',
  alternates: {
    canonical: 'https://www.ventureitsolutions.co.uk/projects',
  },
}

const projectsFAQs = [
  {
    question: "Why choose a Sydney based web design company?",
    answer: "Working with a local Sydney web design team means face-to-face meetings, understanding of the local market, and support in your timezone. We combine local expertise with global web design standards to deliver exceptional results for businesses across Sydney and the Eastern Suburbs."
  },
  {
    question: "What types of businesses in Sydney do you work with?",
    answer: "We serve businesses of all sizes across Sydney, from Bondi startups to established enterprises in the Eastern Suburbs, Inner West, and North Shore. Our portfolio includes retail, hospitality, professional services, and tech companies throughout Sydney."
  },
  {
    question: "What makes your web design services unique in Sydney?",
    answer: "We combine cutting-edge technology with local market insights. Our websites are built with Next.js and React, ensuring fast, responsive designs that work perfectly for the Sydney market while competing globally."
  },
  {
    question: "What is the investment for a professional website in Sydney?",
    answer: "Our web design packages are tailored to Sydney businesses, with solutions starting from $1,900. Each project is quoted based on specific requirements, ensuring you get exactly what your business needs within your budget."
  },
  {
    question: "How long does it take to build a website for my Sydney business?",
    answer: "Most projects for Sydney businesses are completed within 6-8 weeks. This includes discovery, design, development, and testing phases. We maintain clear communication throughout, with regular meetings in Sydney or online."
  }
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-24">
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
      </main >
    <Footer />
    </div >
  )
}



