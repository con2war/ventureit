'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from 'framer-motion'

export function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const NavItems = () => (
    <>
      <button onClick={() => handleNavigation('/')} className="text-left text-lg font-medium text-white hover:text-[#5ce1e6] transition-colors">
        Home
      </button>
      <button onClick={() => handleNavigation('/projects')} className="text-left text-lg font-medium text-white hover:text-[#5ce1e6] transition-colors">
        Projects
      </button>
      <button onClick={() => handleNavigation('/#services')} className="text-left text-lg font-medium text-white hover:text-[#5ce1e6] transition-colors">
        Services
      </button>
      <button onClick={() => handleNavigation('/estimator')} className="text-left text-lg font-medium text-white hover:text-[#5ce1e6] transition-colors">
        Estimator
      </button>
      <button onClick={() => handleNavigation('/#contact')} className="text-left text-lg font-medium text-white hover:text-[#5ce1e6] transition-colors">
        Contact
      </button>
    </>
  )

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/venture_logo.png"
                alt="Venture IT Solutions"
                width={220}
                height={60}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <NavItems />
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-8 w-8" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black">
                <nav className="flex flex-col space-y-4 mt-8">
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

