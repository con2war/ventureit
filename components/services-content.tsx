'use client'

import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from "@/components/ui/card"

const serviceFeatures = [
  {
    title: "Professional Web Design Sydney",
    features: [
      "Responsive design for all devices",
      "SEO optimized structure",
      "Fast loading speeds",
      "Modern UI/UX design",
      "Content Management System",
    ]
  },
  {
    title: "E-commerce Website Design",
    features: [
      "Secure payment integration",
      "Product management system",
      "Inventory tracking",
      "Customer accounts",
      "Order management",
    ]
  },
  {
    title: "Custom Web Development",
    features: [
      "Bespoke functionality",
      "API integration",
      "Database design",
      "Advanced features",
      "Scalable architecture",
    ]
  }
]

export function ServicesContent() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">
            Web Design Sydney & Eastern Suburbs
          </h1>
          <p className="text-xl">
            Professional Website Design Services at Competitive Prices
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          <Card className="bg-background/5 hover:bg-background/10 transition-colors">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Freelance Web Designer Sydney
              </h2>
              <p className="mb-6">
                As experienced web designers in Sydney, we provide professional website design services 
                tailored to your business needs. Our front-end web design expertise ensures your 
                website not only looks great but performs excellently across all devices.
              </p>
              <div className="flex flex-wrap gap-2 mb-6 text-[#5ce1e6]">
                <Badge variant="secondary">Responsive Design</Badge>
                <Badge variant="secondary">SEO Optimized</Badge>
                <Badge variant="secondary">Modern UI/UX</Badge>
                <Badge variant="secondary">Fast Loading</Badge>
                <Badge variant="secondary">Mobile First</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background/5 hover:bg-background/10 transition-colors">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Website Design Eastern Suburbs
              </h2>
              <p className="mb-6">
                Serving businesses across Sydney's Eastern Suburbs with professional web design services. 
                We combine creative design with technical expertise to deliver websites that drive 
                results for your business.
              </p>
              <div className="flex flex-wrap gap-2 text-[#5ce1e6]">
                <Badge variant="secondary">Custom Design</Badge>
                <Badge variant="secondary">E-commerce</Badge>
                <Badge variant="secondary">CMS Integration</Badge>
                <Badge variant="secondary">Local SEO</Badge>
                <Badge variant="secondary">Support</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {serviceFeatures.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
            >
              <Card className="bg-background/5 hover:bg-background/10 transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <svg
                          className="h-5 w-5 text-[#5ce1e6] mr-2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold mb-8">
            Front Web Design Sydney - Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background/5 hover:bg-background/10 transition-colors">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Expert Design</h3>
                <p>
                  Professional web designers with years of experience in creating 
                  stunning, functional websites.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background/5 hover:bg-background/10 transition-colors">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
                <p>
                  Transparent pricing structure with packages to suit all budgets 
                  and business needs.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background/5 hover:bg-background/10 transition-colors">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Local Support</h3>
                <p>
                  Based in Sydney, offering personalized support and maintenance 
                  for your website.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 