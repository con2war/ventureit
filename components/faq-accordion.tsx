'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What are your web design Belfast prices?",
    answer: "Our web design Belfast prices are competitive and transparent. Basic business websites start from £599, e-commerce websites from £999, and custom web development solutions from £1,499. Each package includes responsive design, SEO optimization, and a content management system. As a local Belfast web design agency, we offer flexible payment plans to suit different budgets."
  },
  {
    question: "Why choose a freelance web designer in Belfast?",
    answer: "Working with a freelance web designer in Belfast offers several advantages: personalized attention, direct communication, competitive rates, and faster turnaround times. Our freelance web design service combines professional expertise with local understanding, ensuring your website perfectly represents your business while maintaining cost-effectiveness."
  },
  {
    question: "What makes your website design Northern Ireland services unique?",
    answer: "Our website design Northern Ireland services stand out through our comprehensive approach. We combine local business understanding with international design standards. Our services include custom responsive design, local SEO optimization, e-commerce solutions, and ongoing support. We serve businesses across Northern Ireland, from Belfast to Derry, delivering websites that drive real business results."
  },
  {
    question: "What front web design Belfast technologies do you use?",
    answer: "Our front web design Belfast team specializes in modern technologies including React, Next.js, and advanced CSS frameworks. We focus on creating fast-loading, responsive websites with excellent user experiences. Our front-end development ensures optimal performance across all devices, with special attention to mobile responsiveness and accessibility."
  },
  {
    question: "Do you offer ongoing website maintenance?",
    answer: "Yes, we provide comprehensive website maintenance services across Belfast and Northern Ireland. This includes regular updates, security monitoring, content updates, and technical support. Our maintenance packages start from £49/month, ensuring your website remains secure, up-to-date, and performing optimally."
  },
  {
    question: "What's included in your web design packages?",
    answer: "Our Belfast web design packages include: responsive design for all devices, SEO optimization, content management system, SSL certificate, hosting setup, and post-launch support. For e-commerce websites, we also include secure payment integration, product management systems, and inventory tracking features."
  },
  {
    question: "How long does a website design project take?",
    answer: "Project timelines vary based on complexity. Basic websites typically take 2-4 weeks, while e-commerce or custom web applications may take 4-8 weeks. As a dedicated web design agency in Belfast, we provide clear project timelines and regular updates throughout the development process."
  },
  {
    question: "Can you help with existing website redesign?",
    answer: "Yes, we specialize in website redesign projects across Northern Ireland. Our team can modernize your existing website while preserving SEO value and improving user experience. We analyze your current site, identify improvement areas, and implement modern design principles to enhance your online presence."
  },
  {
    question: "Do you provide web hosting services?",
    answer: "Yes, we offer reliable web hosting solutions for businesses in Belfast and across Northern Ireland. Our hosting packages include SSL certificates, regular backups, security monitoring, and performance optimization. We ensure your website remains fast, secure, and accessible 24/7."
  },
  {
    question: "What support do you offer after website launch?",
    answer: "As your local Belfast web design partner, we provide comprehensive post-launch support including: technical assistance, content updates, performance monitoring, and regular maintenance. Our support team is based in Belfast, offering quick response times and personalized service to all clients."
  },
  {
    question: "How do you optimize websites for search engines?",
    answer: "Our Belfast SEO strategy includes local optimization, ensuring your website ranks well for relevant searches in Northern Ireland. We implement technical SEO best practices, optimize content for local keywords, and ensure mobile responsiveness. This helps improve your visibility in Belfast and across Northern Ireland."
  },
  {
    question: "What makes a good business website?",
    answer: "A successful business website combines professional design, fast loading speeds, easy navigation, and clear calls-to-action. As experienced web designers in Belfast, we ensure your website not only looks great but also drives business results through effective user experience design and conversion optimization."
  }
]

export function FAQAccordion() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        Web Design Belfast - Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
} 