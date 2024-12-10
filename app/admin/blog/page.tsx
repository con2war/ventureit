'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RichTextEditor } from "@/components/rich-text-editor"
import Image from 'next/image'
import { toast } from 'sonner'

export default function CreateBlogPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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
    
    if (!title || !content) {
      toast.error('Title and content are required')
      return
    }

    setLoading(true)

    try {
      let imageUrl = ''
      if (image) {
        const formData = new FormData()
        formData.append('file', image)
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        
        if (!uploadRes.ok) {
          throw new Error('Failed to upload image')
        }
        
        const uploadData = await uploadRes.json()
        imageUrl = uploadData.url
      }

      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title,
          content,
          imageUrl,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to create post')
      }

      toast.success('Blog post created successfully')
      router.push('/admin/blog/manage')
      router.refresh()
    } catch (err) {
      console.error('Error creating post:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Create Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="bg-white/10 text-white border-[#5ce1e6]/20"
              required
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
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Post'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
} 