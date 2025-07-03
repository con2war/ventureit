'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    name: "NextRep AI - iOS Workout Generation App",
    company: "NextRep AI",
    description: "Developed an innovative iOS app powered by AI to deliver personalized workout routines tailored to individual goals and performance. Key features include smart exercise recommendations, real-time progress tracking, and adaptive training plans that evolve with the user.",
    image: "/images/app_icon.png?height=100&width=200",
    tags: ["iOS Development", "AI Integration", "Mobile App", "React Native"],
    url: "https://www.nextrepai.com/"
  },
  {
    name: "Channel Manager, booking dashboard and payment processing",
    company: "Craig View Luxury Glamping",
    description: "Logo design and website development for a luxury glamping site with payment processing. Bespoke channel manager for Airbnb and Booking.com integration with a booking dashboard and real time statistics",
    image: "/images/sunnysidepod_g.webp?height=200&width=300",
    tags: ["Web Development", "UI/UX Design", "SEO"],
    url: "https://craigviewluxuryglampingni.com"
  },
  {
    name: "Long term rental holiday rental property management",
    company: "Keeran Glen Holiday Rentals",
    description: "Developed a website and app for a long term holiday rental property which also required logo creation and photography for the company",
    image: "/images/K.webp?height=200&width=300",
    tags: ["Web Development", "SEO", "Content Management"],
    url: "https://keeranglenholidayrental.com"
  },
  {
    name: "Portfolio Website with contact management",
    company: "Darbell Stone",
    description: "A portfolio website for a local stone company with a contact management system, focus was to increase enquiries and sales. We achieved this both in the contact form and a real focus on SEO",
    image: "/images/portfolio_1.png?height=200&width=300",
    tags: ["SEO", "Portfolio", "Contact Form"],
    url: "https://darbellstone.com"
  }
]

export function ProjectList() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        >
          <Card className="bg-card hover:bg-card/90 border-border overflow-hidden group transition-colors">
            <div className="relative">
              <Image
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                loading="lazy"
                quality={75}
                width={300}
                height={200}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-2">{project.name}</h2>
              <p className="text-primary text-lg mb-4">{project.company}</p>
              <p className="text-muted-foreground text-lg mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="bg-secondary text-secondary-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
              {project.url && (
                <Button 
                  asChild
                  className="w-full bg-[#ff5757] hover:bg-[#ff5757]/90 text-pwhite transition-colors"
                >
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Visit Website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

