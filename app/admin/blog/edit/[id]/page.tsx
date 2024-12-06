'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RichTextEditor } from "@/components/rich-text-editor"
import Image from 'next/image'
import type { BlogPost } from '@/types/blog'

export default function EditBlogPost({
  params: { id }
}: {
  params: { id: string }
}) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/blog/${id}`)
      const data = await res.json()
      setPost(data)
      setTitle(data.title)
      setContent(data.content)
      setImagePreview(data.imageUrl)
    } catch (error) {
      console.error('Error fetching post:', error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = post?.imageUrl || ''
      if (image) {
        const formData = new FormData()
        formData.append('file', image)
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const { url } = await uploadRes.json()
        imageUrl = url
      }

      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          imageUrl,
        }),
      })

      if (res.ok) {
        router.push('/admin/blog/manage')
      }
    } catch (err) {
      console.error('Error updating post:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!post) {
    return <div className="min-h-screen bg-black p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen p-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Edit Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="bg-white/10 text-white border-[#5ce1e6]/20"
            />
          </div>
          <div>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
          <div className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-white/10 text-white border-[#5ce1e6]/20"
            />
            {imagePreview && (
              <div className="relative h-48 w-full rounded-lg overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
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