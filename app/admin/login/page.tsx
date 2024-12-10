'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include',
      })

      if (res.ok) {
        router.push('/admin/blog/manage')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Invalid password')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full space-y-8 p-8 bg-white/5 rounded-lg">
        <div>
          <h2 className="text-2xl font-bold text-center text-white">Admin Login</h2>
          {error && (
            <p className="mt-2 text-red-500 text-center text-sm">{error}</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="bg-white/10 text-white border-[#5ce1e6]/20"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>
          <Button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#5ce1e6] hover:bg-[#5ce1e6]/90 text-black"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  )
} 