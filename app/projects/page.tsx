import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProjectList } from '@/components/project-list'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQAccordion } from "@/components/faq-accordion"
import { Metadata } from 'next'
import { ProjectsContent } from '@/components/projects-content'

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
        <ProjectsContent />
      </main>
      <Footer />
    </div>
  )
}



