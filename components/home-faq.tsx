'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"

const faqCategories = [
  {
    category: "Web Design Sydney Services",
    faqs: [
      {
        question: "What web design services do you offer in Sydney?",
        answer: "As a leading web design agency in Sydney, we offer comprehensive website design services including custom website development, e-commerce solutions, responsive design, and CMS integration. Our Sydney-based team specializes in creating modern, user-friendly websites that drive business growth and enhance your online presence across Australia."
      },
      {
        question: "How much does website design in Sydney cost?",
        answer: "Our Website Design Sydney prices start from $950 for professional business websites. E-commerce websites start from $1,900, and custom web development projects from $2,850. Each package includes responsive design, SEO optimization, and content management systems. We offer competitive pricing while maintaining high-quality standards for businesses across Sydney."
      },
      {
        question: "Do you provide freelance web designer services in Sydney?",
        answer: "Yes, we operate as professional freelance web designers in Sydney, offering flexible and personalized web design services. This allows us to provide competitive rates while maintaining direct communication and high-quality results. Our freelance web design service includes custom designs, regular updates, and ongoing support."
      }
    ]
  },
  {
    category: "Website Design Eastern Suburbs",
    faqs: [
      {
        question: "What makes your website design services unique in the Eastern Suburbs?",
        answer: "As a dedicated website design company in Sydney's Eastern Suburbs, we combine local expertise with international design standards. We understand the specific needs of Eastern Suburbs businesses and create websites that resonate with local audiences while competing globally. Our services include custom design, local SEO optimization, and ongoing support."
      },
      {
        question: "Can you help with e-commerce website design in the Eastern Suburbs?",
        answer: "Absolutely! We specialize in creating e-commerce websites for Eastern Suburbs businesses. Our solutions include secure payment gateways, inventory management systems, and mobile-responsive designs. We ensure your online store is optimized for both local and international customers, with features tailored to your specific business needs."
      },
      {
        question: "Do you offer website maintenance services across the Eastern Suburbs?",
        answer: "Yes, we provide comprehensive website maintenance services throughout Sydney's Eastern Suburbs. This includes regular updates, security monitoring, content updates, and technical support. We offer various maintenance packages to ensure your website remains secure, up-to-date, and performing optimally."
      }
    ]
  },
  {
    category: "Front End Web Design Sydney",
    faqs: [
      {
        question: "What front-end technologies do you use for web design in Sydney?",
        answer: "Our front web design Sydney services utilize the latest technologies including React, Next.js, and modern CSS frameworks. We focus on creating responsive, fast-loading websites with excellent user experiences. Our front-end development ensures your website looks great and performs well on all devices."
      },
      {
        question: "How do you ensure website performance for Sydney businesses?",
        answer: "We optimize every aspect of front-end development, including image optimization, code minification, and caching strategies. Our Sydney web design team focuses on achieving fast loading speeds, smooth animations, and responsive layouts that work perfectly across all devices and browsers."
      },
      {
        question: "What support do you offer after website launch?",
        answer: "We provide comprehensive post-launch support for all our Sydney web design clients. This includes performance monitoring, regular updates, content management training, and technical support. Our team is always available to help with any questions or updates you need."
      }
    ]
  },
  {
    category: "Custom Web Solutions",
    faqs: [
      {
        question: "Can you create custom functionality for my website?",
        answer: "Yes, we specialize in developing custom web solutions tailored to your specific business needs. Whether you need advanced booking systems, custom CRM integration, or unique e-commerce features, our Sydney-based development team can create bespoke solutions that perfectly match your requirements."
      },
      {
        question: "How do you handle website security?",
        answer: "Security is paramount in our web design process. We implement multiple security measures including SSL certificates, secure authentication systems, regular security updates, and protection against common vulnerabilities. We also provide ongoing security monitoring and maintenance for websites across Sydney."
      },
      {
        question: "What is your web design process?",
        answer: "Our web design process in Sydney includes: 1) Initial consultation and requirements gathering, 2) Design concept creation, 3) Development phase, 4) Testing and quality assurance, 5) Launch and deployment, 6) Post-launch support. We maintain clear communication throughout each stage and deliver results that exceed expectations."
      }
    ]
  }
]

interface HomeFAQProps {
  location?: string;
}

export function HomeFAQ({ location }: HomeFAQProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="faq" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Web Design Sydney - Frequently Asked Questions
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            Find answers to common questions about our web design services in Sydney and across the Eastern Suburbs
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          {faqCategories.map((category, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold">
                {category.category}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem 
                    key={faqIndex} 
                    value={`${index}-${faqIndex}`}
                  >
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 