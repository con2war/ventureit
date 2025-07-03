export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Venture IT Solutions",
  "description": "Professional web development services in Sydney and Northern Ireland. Custom websites, e-commerce solutions, and web applications for businesses globally.",
  "url": "https://www.ventureitsolutions.co.uk",
  "canonicalUrl": "https://www.ventureitsolutions.co.uk",
  "logo": "https://www.ventureitsolutions.co.uk/images/venture_logo.png",
  "image": "https://www.ventureitsolutions.co.uk/images/venture_logo.png",
  "foundingDate": "2023",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "New South Wales",
    "addressLocality": "Sydney",
    "addressCountry": "AU"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "info@ventureitsolutions.co.uk",
    "areaServed": ["IE", "GB", "AU"],
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://www.instagram.com/venture.it/",
    // Add other social media URLs if available
  ],
  "areaServed": [
    {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-33.8688",
        "longitude": "151.2093"
      },
      "geoRadius": "500"
    },
    {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "54.5973",
        "longitude": "5.9301"
      },
      "geoRadius": "500"
    }
  ],
  "knowsAbout": [
    "Web Development",
    "E-commerce Solutions",
    "Custom Web Applications",
    "Website Design",
    "React Development",
    "Next.js",
    "TypeScript",
    "Database Design",
    "API Development",
    "SEO Optimization"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Website Development",
          "description": "Bespoke website development using modern technologies"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "E-commerce Solutions",
          "description": "Custom e-commerce websites with secure payment processing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Application Development",
          "description": "Custom web applications and software solutions"
        }
      }
    ]
  }
} 