'use client'

import { useState, FormEvent, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from 'react-hot-toast'

interface GeoLocation {
  city: string;
  region: string;
  country: string;
}

const websiteTypes = [
    { id: 'portfolio', name: 'Portfolio', basePriceGBP: 1000, basePriceAUD: 1900 },
    { id: 'blog', name: 'Blog', basePriceGBP: 1500, basePriceAUD: 2850 },
    { id: 'ecommerce', name: 'E-commerce', basePriceGBP: 2000, basePriceAUD: 3800 },
    { id: 'booking', name: 'Booking Manager', basePriceGBP: 2000, basePriceAUD: 3800 },
    { id: 'cms', name: 'Content Managed Website', basePriceGBP: 2000, basePriceAUD: 3800 },
    { id: 'other', name: 'Other', basePriceGBP: 1500, basePriceAUD: 2850 },
]

const additionalFeatures = [
    { id: 'domain', name: 'Domain Name Registration', priceGBP: 15, priceAUD: 30 },
    { id: 'hosting', name: 'Web Hosting (per year)', priceGBP: 150, priceAUD: 285 },
    { id: 'seo', name: 'SEO Work', priceGBP: 250, priceAUD: 475 },
    { id: 'logo', name: 'Logo Creation', priceGBP: 100, priceAUD: 190 },
    { id: 'photography', name: 'Photography Session', priceGBP: 500, priceAUD: 950 },
]

export function ProjectEstimator() {
    const [step, setStep] = useState(1)
    const [websiteType, setWebsiteType] = useState('')
    const [pages, setPages] = useState(1)
    const [features, setFeatures] = useState({
        contactForm: false,
        gallery: false,
        newsletter: false,
    })
    const [selectedAdditionalFeatures, setSelectedAdditionalFeatures] = useState<string[]>([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [showQuote, setShowQuote] = useState(false)
    const [userLocation, setUserLocation] = useState<GeoLocation | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const [error, setError] = useState('')

    useEffect(() => {
        // Fetch user's location from IP
        const fetchLocation = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/')
                const data = await response.json()
                setUserLocation({
                    city: data.city,
                    region: data.region,
                    country: data.country_name
                })
            } catch (error) {
                console.error('Error fetching location:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchLocation()
    }, [])

    // Determine if user is in Australia
    const isAustralianUser = userLocation?.country === "Australia"

    const handleNextStep = () => {
        if (step === 1 && !websiteType) {
            setError('Please select a website type to continue')
            return
        }

        setStep(step + 1)
    }

    const handlePrevStep = () => {
        setStep(step - 1)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const quoteDetails = {
            websiteType: websiteTypes.find(type => type.id === websiteType)?.name,
            pages,
            features: Object.entries(features).filter(([, value]) => value).map(([key]) => key),
            additionalFeatures: selectedAdditionalFeatures.map(id => additionalFeatures.find(f => f.id === id)?.name),
            totalCost: calculateTotalCost(),
            name,
            email,
            phone
        }

        try {
            const response = await fetch('/api/send-estimate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quoteDetails),
            })

            if (!response.ok) {
                throw new Error('Failed to send email')
            }

            toast.success('Your request has been submitted successfully!')
            setShowQuote(true)
        } catch (error) {
            console.error('Error submitting quote:', error)
            toast.error('There was an error submitting your request. Please try again.')
        }
    }

    const calculateTotalCost = () => {
        const selectedWebsiteType = websiteTypes.find(type => type.id === websiteType)
        const basePrice = isAustralianUser ? (selectedWebsiteType?.basePriceAUD || 0) : (selectedWebsiteType?.basePriceGBP || 0)
        const pagesCost = (pages - 1) * (isAustralianUser ? 190 : 100)
        const featuresCost = Object.values(features).filter(Boolean).length * (isAustralianUser ? 380 : 200)
        const additionalFeaturesCost = selectedAdditionalFeatures.reduce((total, featureId) => {
            const feature = additionalFeatures.find(f => f.id === featureId)
            return total + (isAustralianUser ? (feature?.priceAUD || 0) : (feature?.priceGBP || 0))
        }, 0)

        return basePrice + pagesCost + featuresCost + additionalFeaturesCost
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Card className="bg-card border-border">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Step 1: Choose Website Type</h2>
                            <RadioGroup value={websiteType} onValueChange={(value) => {
                                setWebsiteType(value)
                                setError('')
                            }}>
                                {websiteTypes.map((type) => (
                                    <div key={type.id} className="flex items-center space-x-2 mb-2">
                                        <RadioGroupItem value={type.id} id={type.id} />
                                        <Label htmlFor={type.id} className="text-foreground">{type.name}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                            {error && (
                                <p className="mt-2 text-destructive text-sm">
                                    {error}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                )
            case 2:
                return (
                    <Card className="bg-card border-border">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Step 2: Complexity</h2>
                            <div className="mb-4">
                                <Label htmlFor="pages" className="text-foreground">Number of Pages</Label>
                                <Input
                                    id="pages"
                                    type="number"
                                    min="1"
                                    value={pages}
                                    onChange={(e) => setPages(parseInt(e.target.value))}
                                    className="bg-background text-foreground"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">Required Features</h3>
                            {Object.entries(features).map(([key, value]) => (
                                <div key={key} className="flex items-center space-x-2 mb-2">
                                    <Checkbox
                                        id={key}
                                        checked={value}
                                        onCheckedChange={(checked) => setFeatures(prev => ({ ...prev, [key]: checked }))}
                                    />
                                    <Label htmlFor={key} className="text-foreground">
                                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                    </Label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )
            case 3:
                return (
                    <Card className="bg-card border-border">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Step 3: Additional Features</h2>
                            {additionalFeatures.map((feature) => (
                                <div key={feature.id} className="flex items-center space-x-2 mb-2">
                                    <Checkbox
                                        id={feature.id}
                                        checked={selectedAdditionalFeatures.includes(feature.id)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedAdditionalFeatures(prev => [...prev, feature.id])
                                            } else {
                                                setSelectedAdditionalFeatures(prev => prev.filter(id => id !== feature.id))
                                            }
                                        }}
                                    />
                                    <Label htmlFor={feature.id} className="text-foreground">{feature.name}</Label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )
            case 4:
                return (
                    <Card className="bg-card border-border">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name" className="text-foreground">Name</Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="bg-background text-foreground"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email" className="text-foreground">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-background text-foreground"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        className="bg-background text-foreground"
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-[#] hover:bg-primary/90 text-primary-foreground">
                                    Get Quote!
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )
            default:
                return null
        }
    }

    const renderQuote = () => {
        return (
            <Card className="bg-card border-border">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Project Estimate Summary</h2>
                    <div className="space-y-2 text-foreground">
                        <p><strong>Website Type:</strong> {websiteTypes.find(type => type.id === websiteType)?.name}</p>
                        <p><strong>Number of Pages:</strong> {pages}</p>
                        <p><strong>Features:</strong> {Object.entries(features).filter(([, value]) => value).map(([key]) => key).join(', ') || 'None'}</p>
                        <p><strong>Additional Features:</strong> {selectedAdditionalFeatures.map(id => additionalFeatures.find(f => f.id === id)?.name).join(', ') || 'None'}</p>
                        <p className="text-2xl font-bold mt-4">
                            Estimated Total: {isAustralianUser ? `$${calculateTotalCost().toLocaleString()}` : `£${calculateTotalCost().toLocaleString()}`}
                        </p>
                        {!isLoading && (
                            <p className="text-sm text-muted-foreground mt-2">
                                {isAustralianUser ? "Prices in AUD" : "Prices in GBP"}
                            </p>
                        )}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">This is an estimate. Final pricing may vary based on specific project requirements.</p>
                    <p className="mt-4 text-foreground">Thank you for your interest, {name}. We'll be in touch with you soon at {email} or {phone}.</p>
                    <Button onClick={() => {
                        setShowQuote(false)
                        setStep(1)
                        setWebsiteType('')
                        setPages(1)
                        setFeatures({ contactForm: false, gallery: false, newsletter: false })
                        setSelectedAdditionalFeatures([])
                        setName('')
                        setEmail('')
                        setPhone('')
                    }} className="mt-6 w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Start New Estimate
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {showQuote ? renderQuote() : renderStep()}
            {!showQuote && (
                <div className="mt-6 flex justify-between">
                    {step > 1 && (
                        <Button onClick={handlePrevStep} variant="outline" className="bg-[#ff5757] hover:bg-[#ff5757]/90 text-white">
                            Previous
                        </Button>
                    )}
                    {step < 4 && (
                        <Button
                            onClick={handleNextStep}
                            className="ml-auto bg-[#ff5757] hover:bg-[#ff5757]/90 text-white"
                        >
                            Next
                        </Button>
                    )}
                </div>
            )}
        </motion.div>
    )
}





