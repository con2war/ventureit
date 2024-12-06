'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/use-debounce'

export function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') || '')
  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedValue) {
      params.set('search', debouncedValue)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`/blog?${params.toString()}`)
  }, [debouncedValue])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search posts..."
        className="pl-10 bg-white/10 text-white border-[#5ce1e6]/20"
      />
    </div>
  )
} 