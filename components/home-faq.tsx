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
    category: "Services & Expertise",
    faqs: [
      {
        question: "What web development services do you offer?",
        answer: "We provide a comprehensive range of web development services including custom website development, e-commerce solutions, web applications, content management systems, API development, and database design. Our expertise spans from simple business websites to complex enterprise applications, all built with modern technologies like React, Next.js, and TypeScript."
      },
      {
        question: "Do you handle both frontend and backend development?",
        answer: "Yes, we offer full-stack development services. Our team is proficient in both frontend technologies (React, Next.js, TypeScript) and backend solutions (Node.js, Python, databases). We ensure seamless integration between all components of your web application."
      },
      {
        question: "Can you help with website redesign projects?",
        answer: "Absolutely! We specialize in modernizing existing websites while preserving their SEO value and improving user experience. Our redesign process includes thorough analysis of your current site, identifying improvement areas, and implementing modern design principles while ensuring minimal disruption to your business."
      }
    ]
  },
  {
    category: "Project Process & Timeline",
    faqs: [
      {
        question: "What is your typical project process?",
        answer: "Our development process follows these key stages: 1) Initial consultation and requirements gathering, 2) Project planning and proposal, 3) Design phase with client feedback, 4) Development with regular updates, 5) Testing and quality assurance, 6) Launch and deployment, 7) Post-launch support and maintenance. We maintain clear communication throughout each stage."
      },
      {
        question: "How long does it take to complete a website?",
        answer: "Project timelines vary based on complexity and requirements. Simple websites typically take 4-6 weeks, while complex e-commerce or custom web applications may take 3-6 months. We provide a detailed timeline during our initial consultation and deliver a prototype within 24 hours of project commencement."
      },
      {
        question: "How do you handle project changes and revisions?",
        answer: "We follow an agile development approach that allows for flexibility and changes throughout the project. Each project includes a set number of revision rounds, and we're transparent about any additional costs for significant scope changes. We prioritize clear communication to ensure your vision is achieved."
      }
    ]
  },
  {
    category: "Technology & Security",
    faqs: [
      {
        question: "What technologies and platforms do you use?",
        answer: "We use modern, industry-leading technologies including React, Next.js, TypeScript, Node.js, and various databases. Our tech stack is chosen based on project requirements to ensure optimal performance, security, and scalability. We stay current with the latest developments in web technology to provide cutting-edge solutions."
      },
      {
        question: "How do you ensure website security?",
        answer: "Security is paramount in our development process. We implement multiple security measures including SSL certificates, secure authentication systems, regular security updates, data encryption, and protection against common vulnerabilities. We also provide ongoing security monitoring and maintenance."
      },
      {
        question: "Do you provide hosting and domain services?",
        answer: "Yes, we offer comprehensive hosting solutions with high uptime guarantees, regular backups, and performance optimization. Our hosting packages include SSL certificates, CDN integration, and 24/7 monitoring. We can also assist with domain registration and management."
      }
    ]
  },
  {
    category: "Support & Maintenance",
    faqs: [
      {
        question: "What kind of support do you offer after launch?",
        answer: "We provide comprehensive post-launch support including: 24/7 technical support, regular maintenance updates, performance monitoring, security patches, content updates, and feature enhancements. Our support packages are tailored to your specific needs and ensure your website remains secure and up-to-date."
      },
      {
        question: "Do you offer training for content management?",
        answer: "Yes, we provide thorough training for your team on how to manage and update your website content. This includes detailed documentation, video tutorials, and hands-on training sessions. We ensure you're comfortable with your content management system before project completion."
      },
      {
        question: "What is your response time for support issues?",
        answer: "We prioritize support issues based on severity. Critical issues are addressed within 1-2 hours, while standard maintenance requests are typically handled within 24-48 hours. All our support packages include guaranteed response times and regular maintenance windows."
      }
    ]
  },
  {
    category: "Pricing & Payments",
    faqs: [
      {
        question: "How do you structure your pricing?",
        answer: "Our pricing is transparent and project-based, determined by factors such as complexity, features required, and development time. We provide detailed quotes breaking down all costs, and offer flexible payment plans. Use our project calculator for an initial estimate, or contact us for a personalized quote."
      },
      {
        question: "Do you offer ongoing maintenance packages?",
        answer: "Yes, we offer several maintenance packages to suit different needs and budgets. These include regular updates, security monitoring, content updates, technical support, and performance optimization. We can customize a maintenance plan to match your specific requirements."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods including bank transfers, credit cards, and scheduled payment plans. For larger projects, we typically structure payments in milestones: initial deposit, development phases, and final payment upon completion."
      }
    ]
  }
]

export function HomeFAQ() {
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
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            Find answers to common questions about our web development services, process, and support
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
                    <AccordionContent className="text-muted-foreground">
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