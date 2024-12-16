'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from 'framer-motion'
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const isHomePage = pathname === '/'

  useEffect(() => {
    setMounted(true)
  }, [])

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

  if (!mounted) return null

  const getHeaderBackground = () => {
    if (isScrolled) {
      return theme === 'dark' ? 'bg-black/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'
    }
    if (isHomePage) {
      return 'bg-transparent'
    }
    return theme === 'dark' ? 'bg-black' : 'bg-white'
  }

  const getTextColor = () => {
    if (theme === 'dark') return 'text-white'
    if (isHomePage && !isScrolled) return 'text-white'
    return 'text-black'
  }

  const getLogo = () => {
    if (theme === 'dark') return "/images/venture_logo.png"
    if (isHomePage && !isScrolled) return "/images/venture_logo.png"
    return "/images/venture_logo_light.png"
  }

  const NavItems = () => (
    <>
      <button onClick={() => handleNavigation('/')} className={`text-left text-lg font-medium ${getTextColor()} hover:text-[#5ce1e6] transition-colors`}>
        Web Development
      </button>
      <button onClick={() => handleNavigation('/projects')} className={`text-left text-lg font-medium ${getTextColor()} hover:text-[#5ce1e6] transition-colors`}>
        Our Work
      </button>
      <button onClick={() => handleNavigation('/#services')} className={`text-left text-lg font-medium ${getTextColor()} hover:text-[#5ce1e6] transition-colors`}>
        Development Services
      </button>
      <button onClick={() => handleNavigation('/estimator')} className={`text-left text-lg font-medium ${getTextColor()} hover:text-[#5ce1e6] transition-colors`}>
        Project Calculator
      </button>
      <button onClick={() => handleNavigation('/#contact')} className={`text-left text-lg font-medium ${getTextColor()} hover:text-[#5ce1e6] transition-colors`}>
        Contact Us
      </button>
      <button onClick={() => handleNavigation('/blog')} className={`text-left text-lg font-medium ${getTextColor()} hover:text-[#5ce1e6] transition-colors`}>
        News
      </button>
      <div className={getTextColor()}>
        <ThemeToggle />
      </div>
    </>
  )

  return (
    <motion.header
      className={`fixed w-full z-50 transition-colors duration-300 ${getHeaderBackground()}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <img
                src={getLogo()}
                alt="Venture IT Solutions"
                className="h-16 w-auto"
                style={{ 
                  objectFit: 'contain',
                  aspectRatio: '220/60'
                }}
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <NavItems />
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={getTextColor()}>
                  <Menu className="h-8 w-8" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className={theme === 'dark' ? "w-[300px] sm:w-[400px] bg-black" : "w-[300px] sm:w-[400px] bg-white"}>
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

