'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How accurate is the project estimate?",
    answer: "Our project calculator provides an initial estimate based on common project requirements and industry standards. While it gives a good baseline, the final cost may vary depending on specific requirements, custom features, and complexity. We recommend scheduling a consultation for a detailed, personalized quote."
  },
  {
    question: "What factors affect the project cost?",
    answer: "Several factors influence project costs, including: website complexity, number of pages, custom functionality requirements, e-commerce features, third-party integrations, content management needs, responsive design requirements, and ongoing maintenance plans."
  },
  {
    question: "How long does a typical web development project take?",
    answer: "Project timelines vary based on scope and complexity. Simple websites typically take 4-6 weeks, while complex e-commerce or custom web applications may take 3-6 months. We'll provide a detailed timeline during our initial consultation based on your specific requirements. However we promise to deliver a prototype the next day following agreement."
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes, we offer 24/7 365 comprehensive support and maintenance packages to ensure your website remains secure, up-to-date, and performing optimally. This includes regular updates, security monitoring, backup management, and technical support."
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern, industry-standard technologies including React, Next.js, TypeScript, and various other tools depending on project requirements. Our tech stack is chosen to ensure optimal performance, security, and maintainability."
  },
  {
    question: "Do you provide hosting services?",
    answer: "Yes, we offer reliable hosting solutions tailored to your project's needs. Our hosting packages include SSL certificates, regular backups, security monitoring, and performance optimization."
  },
  {
    question: "What happens after I receive my estimate?",
    answer: "After receiving your estimate, we'll schedule a consultation to discuss your project in detail. This allows us to understand your specific needs, refine the estimate, and create a tailored development plan."
  },
  {
    question: "Can you help with existing websites?",
    answer: "Yes, we can help improve, update, or redesign existing websites. We'll assess your current site and recommend improvements to enhance performance, security, and user experience."
  }
]

export function FAQAccordion() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        Frequently Asked Questions
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