'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram } from 'lucide-react'

export function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="md:flex md:items-center md:justify-between"
        >
          <div className="flex justify-center space-x-6 md:order-2">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-muted-foreground">
              &copy; {new Date().getFullYear()} Venture IT Solutions. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}



