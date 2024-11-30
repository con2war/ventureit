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
  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about our services.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/5 border-[#5ce1e6]/20">
              <CardContent className="p-6">
                <QuoteIcon className="h-8 w-8 text-[#5ce1e6] mb-4" />
                <p className="text-white mb-4">{testimonial.quote}</p>
                <div className="text-sm text-gray-400">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p>{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
