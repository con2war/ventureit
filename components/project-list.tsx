'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react' // Import the external link icon

const projects = [
  {
    name: "Channel Manager, booking dashboard and payment processing",
    company: "Craig View Luxury Glamping",
    description: "Logo design and website development for a luxury glamping site with payment processing. Bespoke channel manager for Airbnb and Booking.com integration with a booking dashboard and real time statistics",
    image: "/images/sunnysidepod_g.jpg?height=200&width=300",
    tags: ["Web Development", "UI/UX Design", "SEO"],
    url: "https://craigviewluxuryglampingni.com"
  },
  {
    name: "Long term rental holiday rental property management",
    company: "Keeran Glen Holiday Rentals",
    description: "Developed a website and app for a long term holiday rental property which also required logo creation and photography for the company",
    image: "/images/K.png?height=200&width=300",
    tags: ["Web Development", "SEO", "Content Management"],
    url: "https://keeranglenholidayrental.com"
  },
  {
    name: "Logo Design and Photography",
    company: "Drone and Camera Photography",
    description: "Created company logo and photography for website and social media",
    image: "/images/dgn_park.jpg?height=200&width=3s00",
    tags: ["SEO", "Content Marketing", "Analytics"],
  },
  {
    name: "Channel Manager",
    company: "p0rtals",
    description: "A channel manager for Airbnb and Booking.com and many other channels to prevent double booking with a booking dashboard and payment processing",
    image: "/images/p0rtals.png?height=200&width=300",
    tags: ["SEO", "Content Marketing", "Analytics"],
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
          <Card className="bg-white/5 border-[#5ce1e6]/20 overflow-hidden group hover:border-[#5ce1e6]/40 transition-colors">
            <div className="relative">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold text-white mb-2">{project.name}</h3>
              <p className="text-[#5ce1e6] text-lg mb-4">{project.company}</p>
              <p className="text-gray-300 text-lg mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="bg-[#ff5757] text-white text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              {project.url && (  // Only render button if URL exists
                <Button 
                  asChild
                  className="w-full bg-[#5ce1e6] hover:bg-[#5ce1e6]/90 text-black transition-colors"
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