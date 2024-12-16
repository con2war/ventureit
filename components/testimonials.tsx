'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from 'lucide-react'

const testimonials = [
  {
    quote: "Venture IT Solutions transformed our online presence. Their web development expertise is unmatched!",
    author: "Stephen Mullin",
    company: "Craig View Luxury Glamping"
  },
  {
    quote: "The mobile app they developed for us exceeded all expectations. Highly recommended!",
    author: "Peter Monaghan",
    company: "Keeran Glen Holiday Rentals"
  },
  {
    quote: "Their SEO work significantly improved our search rankings. We've seen a notable increase in organic traffic.",
    author: "Emily Brown",
    company: "Source Business Solutions"
  }
]

export function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="bg-background py-24">
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
            Testimonials
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-foreground sm:text-5xl"
          >
            What Our Clients Say
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto"
          >
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about our services.
          </motion.p>
        </motion.div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.8 }}
              >
                <Card className="bg-card hover:bg-card/90 transition-colors h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <QuoteIcon className="h-8 w-8 text-primary mb-4" />
                    <p className="text-foreground mb-4 flex-grow">{testimonial.quote}</p>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p>{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

