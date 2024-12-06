'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { toast } from 'sonner'

interface VoteButtonsProps {
  postId: string
  initialUpvotes: number
  initialDownvotes: number
}

export function VoteButtons({ postId, initialUpvotes, initialDownvotes }: VoteButtonsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [downvotes, setDownvotes] = useState(initialDownvotes)
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleVote = async (type: 'up' | 'down') => {
    if (userVote || isLoading) return

    setIsLoading(true)
    try {
      const res = await fetch(`/api/blog/${postId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      })

      if (!res.ok) throw new Error('Failed to vote')

      if (type === 'up') {
        setUpvotes(prev => prev + 1)
      } else {
        setDownvotes(prev => prev + 1)
      }
      setUserVote(type)
      
      // Store vote in localStorage to persist across page refreshes
      if (typeof window !== 'undefined') {
        localStorage.setItem(`vote-${postId}`, type)
      }
      
    } catch (error) {
      console.error('Vote error:', error)
      toast.error('Failed to submit vote. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Check for existing vote on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const existingVote = localStorage.getItem(`vote-${postId}`) as 'up' | 'down' | null
      if (existingVote) {
        setUserVote(existingVote)
      }
    }
  }, [postId])

  return (
    <div className="flex items-center space-x-4 bg-white/5 rounded-lg p-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote('up')}
        disabled={isLoading || userVote !== null}
        className={`flex items-center space-x-2 text-white 
          ${userVote === 'up' ? 'text-green-500' : ''} 
          ${!userVote ? 'hover:text-green-500 hover:bg-green-500/10' : ''}`}
      >
        <ThumbsUp className="h-5 w-5" />
        <span className="text-sm font-medium">{upvotes}</span>
      </Button>

      <div className="h-8 w-px bg-white/10" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote('down')}
        disabled={isLoading || userVote !== null}
        className={`flex items-center space-x-2 text-white
          ${userVote === 'down' ? 'text-red-500' : ''} 
          ${!userVote ? 'hover:text-red-500 hover:bg-red-500/10' : ''}`}
      >
        <ThumbsDown className="h-5 w-5" />
        <span className="text-sm font-medium">{downvotes}</span>
      </Button>
    </div>
  )
} 