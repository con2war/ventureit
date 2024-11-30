'use client'

import { useEffect, useRef } from 'react' 
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        key="hero-video" // Add a key
        autoPlay
        loop
        muted
        playsInline // Add playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
        preload="auto" // Add preload
      >
        <source src="/hero-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8">
        <motion.h1 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="block text-white">Transform Your Business</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-lg mx-auto text-xl text-gray-300 sm:max-w-3xl"
        >
          We deliver cutting-edge tech solutions to help your business thrive in the digital world.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center"
        >
          <Button 
            asChild
            className="bg-[#ff5757] hover:bg-[#ff5757]/90 text-white transition-colors text-lg py-6 px-8"
          >
            <a href="/estimator">Get Started</a>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}


