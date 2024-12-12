'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RichTextEditor } from '@/components/rich-text-editor'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface BlogPost {
  id: string
  title: string
  content: string
  imageUrl: string | null
  slug: string
  upvotes: number
  downvotes: number
}

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch post')
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Error fetching post:', error)
        toast.error('Failed to fetch post')
      }
    }

    fetchPost()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!post) return

    setLoading(true)

    try {
      const response = await fetch(`/api/blog/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          imageUrl: post.imageUrl
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update post')
      }

      toast.success('Blog post updated successfully')
      router.push('/admin/blog/manage')
      router.refresh()
    } catch (error) {
      console.error('Error updating post:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to update post')
    } finally {
      setLoading(false)
    }
  }

  if (!post) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen p-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Edit Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              placeholder="Post title"
              className="bg-white/10 text-white border-[#5ce1e6]/20"
              required
            />
          </div>
          <div>
            <RichTextEditor
              content={post.content}
              onChange={(value) => setPost({ ...post, content: value })}
            />
          </div>
          <Button 
            type="submit"
            disabled={loading}
            className="bg-[#5ce1e6] hover:bg-[#5ce1e6]/90 text-black"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </div>
  )
}