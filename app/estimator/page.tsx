'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProjectEstimator } from '@/components/project-estimator'
import { FAQAccordion } from "@/components/faq-accordion"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function EstimatorPage() {
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
              Project Estimator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto"
            >
              Estimate the cost of your website project in a few simple steps.
            </motion.p>
            <ProjectEstimator />
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FAQAccordion />
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-muted-foreground">
            Still have questions? Contact our team for a detailed discussion about your project requirements.
          </p>
          <Link href="/#contact">
            <Button
              className="bg-[#5ce1e6] hover:bg-[#5ce1e6]/90 text-black"
            >
              Contact Us
            </Button>
          </Link>
        </div>  
      </main>
      <Footer />
    </div>
  )
}

