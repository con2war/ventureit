'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', {
        method: 'POST',
      })

      if (res.ok) {
        router.push('/admin/login')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="text-red-500 hover:bg-red-500/20"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  )
} 