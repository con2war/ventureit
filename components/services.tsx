'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Code, Globe, Server, Search, LineChart } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    name: 'Web Development',
    description: 'Custom, responsive websites built with modern technologies.',
    icon: Globe,
  },
  {
    name: 'App Development',
    description: 'Native and cross-platform mobile applications.',
    icon: Code,
  },
  {
    name: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment services.',
    icon: Server,
  },
  {
    name: 'SEO Optimization',
    description: 'Improve your visibility and ranking in search engines.',
    icon: Search,
  },
  {
    name: 'Business Insights',
    description: 'Data-driven analytics and business intelligence solutions.',
    icon: LineChart,
  },
]

interface ServicesProps {
  location?: string;
}

export function Services({ location }: ServicesProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="lg:text-center"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-primary font-semibold tracking-wide uppercase"
          >
            Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-foreground sm:text-5xl"
          >
            Comprehensive Tech Solutions
          </motion.p>
        </motion.div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.6 }}
              >
                <Card className="bg-card hover:bg-card/90 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center h-14 w-14 rounded-md bg-primary text-primary-foreground">
                        <service.icon className="h-8 w-8" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-medium text-foreground">{service.name}</h3>
                    </div>
                    <p className="mt-4 text-lg text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}






