"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full relative"
    >
      <Sun 
        className={`h-[1.2rem] w-[1.2rem] transition-all text-black dark:text-white
          ${theme === 'dark' ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`}
      />
      <Moon 
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all text-white dark:text-white
          ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 