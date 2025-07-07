import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProjectEstimator } from '@/components/project-estimator'
import { FAQAccordion } from "@/components/faq-accordion"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import { EstimatorContent } from '@/components/estimator-content'

export const metadata: Metadata = {
  title: 'Project Estimator | Venture IT Solutions',
  description: 'Get an instant estimate for your website project. Our project estimator provides transparent pricing for web design services in Sydney and Northern Ireland.',
  alternates: {
    canonical: 'https://www.ventureitsolutions.co.uk/estimator',
  },
}

export default function EstimatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-24">
        <EstimatorContent />
      </main>
      <Footer />
    </div>
  )
}

