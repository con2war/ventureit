'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/logout-button"
import { formatDate } from '@/lib/utils'
import { Pencil, Trash2, Plus } from 'lucide-react'
import type { BlogPost } from '@/types/blog'

export default function ManageBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog')
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setPosts(posts.filter(post => post.id !== id))
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-black p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Manage Blog Posts</h1>
          <div className="flex items-center space-x-4">
            <Button asChild className="bg-[#5ce1e6] hover:bg-[#5ce1e6]/90 text-black">
              <Link href="/admin/blog">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Link>
            </Button>
            <LogoutButton />
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No blog posts yet. Create your first post!
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div 
                key={post.id}
                className="bg-white/5 rounded-lg p-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  {post.imageUrl && (
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-white">{post.title}</h2>
                    <p className="text-gray-400">{formatDate(post.createdAt)}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="hover:bg-white/10"
                  >
                    <Link href={`/admin/blog/edit/${post.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-red-500/20 hover:text-red-500"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 