'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

type CookiePreferences = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

export function CookieConsent() {
  const [mounted, setMounted] = useState(false)
  const [showConsent, setShowConsent] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  // Handle initial mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check cookie consent after component is mounted
  useEffect(() => {
    if (mounted) {
      const consent = localStorage.getItem('cookieConsent')
      if (!consent) {
        setShowConsent(true)
      } else {
        try {
          setPreferences(JSON.parse(consent))
        } catch (error) {
          console.error('Error parsing cookie consent:', error)
          setShowConsent(true)
        }
      }
    }
  }, [mounted])

  if (!mounted) return null

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true }
    setPreferences(allAccepted)
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted))
    setShowConsent(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences))
    setShowConsent(false)
    setShowPreferences(false)
  }

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Necessary cookies can't be toggled
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-[#5ce1e6]/20 p-4 z-[9999]"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <p className="text-white mb-4 md:mb-0 md:mr-4">
              We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setShowPreferences(true)}>
                Manage Preferences
              </Button>
              <Button className="bg-[#5ce1e6] hover:bg-[#5ce1e6]/90 text-black" onClick={handleAcceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {showPreferences && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black border border-[#5ce1e6]/20 rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Cookie Preferences</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowPreferences(false)}>
                <X className="h-6 w-6 text-white" />
              </Button>
            </div>
            <div className="space-y-4">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-white capitalize">{key}</span>
                  <Button
                    variant={value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTogglePreference(key as keyof CookiePreferences)}
                    disabled={key === 'necessary'}
                    className={value ? "bg-[#5ce1e6] hover:bg-[#5ce1e6]/90 text-black" : ""}
                  >
                    {value ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-6 bg-[#5ce1e6] hover:bg-[#5ce1e6]/90 text-black" 
              onClick={handleSavePreferences}
            >
              Save Preferences
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}