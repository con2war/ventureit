'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram, Twitter, X } from 'lucide-react'
import Link from 'next/link'

const locations = [
  { name: 'Belfast', slug: 'belfast' },
  { name: 'Bangor', slug: 'bangor' },
  { name: 'Newry', slug: 'newry' },
  { name: 'Lisburn', slug: 'lisburn' },
  { name: 'Derry', slug: 'derry' },
  { name: 'Northern Ireland', slug: 'northern-ireland' },
  { name: 'Ireland', slug: 'ireland' },
  { name: 'UK', slug: 'UK' },
]

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
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <div className="flex justify-center space-x-6 md:order-2">
            <a 
              href="https://www.instagram.com/venture.it/" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a 
              href="https://x.com/_ventureit"  // Replace with your actual X profile URL
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="X (Twitter)"
            >
              <span className="sr-only">X (Twitter)</span>
              <Twitter className="h-6 w-6" />
            </a>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link href="/estimator" className="text-muted-foreground hover:text-primary transition-colors">
                  Project Calculator
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Web Design Services
            </h3>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/web-design/${location.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors block"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left md:order-1">
            <p className="text-base text-muted-foreground">
              &copy; {new Date().getFullYear()} Venture IT Solutions. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}



