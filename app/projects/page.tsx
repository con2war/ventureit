'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProjectList } from '@/components/project-list'

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
      </main>
      <Footer />
    </div>
  )
}



