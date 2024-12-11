'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { toast } from 'sonner'

interface VoteButtonsProps {
  postId: string
  initialUpvotes: number
  initialDownvotes: number
}

export function VoteButtons({ postId, initialUpvotes = 0, initialDownvotes = 0 }: VoteButtonsProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [downvotes, setDownvotes] = useState(initialDownvotes)
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async (type: 'upvote' | 'downvote') => {
    if (isVoting) return
    
    setIsVoting(true)
    try {
      const res = await fetch(`/api/blog/${postId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to vote')
      }

      const data = await res.json()
      setUpvotes(data.upvotes)
      setDownvotes(data.downvotes)
      
      toast.success(`Successfully ${type}d the post`)
    } catch (err) {
      console.error('Vote error:', err)
      toast.error('Failed to vote. Please try again.')
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => handleVote('upvote')}
        disabled={isVoting}
        className="flex items-center space-x-1 text-gray-400 hover:text-[#5ce1e6] transition-colors disabled:opacity-50"
      >
        <ThumbsUp className="h-5 w-5" />
        <span>{upvotes}</span>
      </button>
      <button
        onClick={() => handleVote('downvote')}
        disabled={isVoting}
        className="flex items-center space-x-1 text-gray-400 hover:text-[#5ce1e6] transition-colors disabled:opacity-50"
      >
        <ThumbsDown className="h-5 w-5" />
        <span>{downvotes}</span>
      </button>
    </div>
  )
} 