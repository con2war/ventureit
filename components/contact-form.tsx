'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useToast } from "@/components/ui/use-toast"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: '',
    message: ''
  })

  const enquiryTypes = [
    { value: 'website', label: 'Website Development' },
    { value: 'app', label: 'App Development' },
    { value: 'seo', label: 'SEO Services' },
    { value: 'photography', label: 'Photography Services' },
    { value: 'other', label: 'Other' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message,
          duration: 5000,
        })
        setFormData({
          name: '',
          email: '',
          phone: '',
          enquiryType: '',
          message: ''
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <Input
          placeholder="Name"
          required
          className="bg-white/10 border-[#5ce1e6]/20 text-white"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email"
          required
          className="bg-white/10 border-[#5ce1e6]/20 text-white"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <Input
          type="tel"
          placeholder="Phone Number"
          required
          className="bg-white/10 border-[#5ce1e6]/20 text-white"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <div>
        <Select 
          value={formData.enquiryType}
          onValueChange={(value) => setFormData({ ...formData, enquiryType: value })}
        >
          <SelectTrigger className="bg-white/10 border-[#5ce1e6]/20 text-white">
            <SelectValue placeholder="Select Enquiry Type" />
          </SelectTrigger>
          <SelectContent className="bg-black border-[#5ce1e6]/20">
            {enquiryTypes.map((type) => (
              <SelectItem 
                key={type.value} 
                value={type.value}
                className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
              >
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Textarea
          placeholder="Message"
          required
          className="bg-white/10 border-[#5ce1e6]/20 text-white min-h-[120px]"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-[#ff5757] hover:bg-[#ff5757]/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </motion.form>
  )
}
