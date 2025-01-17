'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RichTextEditor } from '@/components/rich-text-editor'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BlogPost {
  id: string
  title: string
  content: string
  imageUrl: string | null
  slug: string
  upvotes: number
  downvotes: number
  metaDescription: string | null
  keywords: string | null
  canonicalUrl: string | null
  ogImage: string | null
  ogTitle: string | null
  ogDescription: string | null
  category: string | null
  readTime: string | null
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
          imageUrl: post.imageUrl,
          metaDescription: post.metaDescription,
          keywords: post.keywords,
          canonicalUrl: post.canonicalUrl,
          ogImage: post.ogImage,
          ogTitle: post.ogTitle,
          ogDescription: post.ogDescription,
          category: post.category,
          readTime: post.readTime,
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
    return <div className="p-8 dark:text-white">Loading...</div>
  }

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Edit Blog Post
        </h1>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="edit" className="space-y-6">
            <TabsList className="bg-gray-100 dark:bg-gray-800">
              <TabsTrigger 
                value="edit"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                Edit
              </TabsTrigger>
              <TabsTrigger 
                value="seo"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                SEO
              </TabsTrigger>
              <TabsTrigger 
                value="social"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
              >
                Social
              </TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="space-y-6">
              <div>
                <Input
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  placeholder="Post title"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                  required
                />
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <RichTextEditor
                  content={post.content}
                  onChange={(value) => setPost({ ...post, content: value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Meta Description
                </label>
                <Input
                  value={post.metaDescription || ''}
                  onChange={(e) => setPost({ ...post, metaDescription: e.target.value })}
                  placeholder="Enter meta description"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                  maxLength={160}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {(post.metaDescription || '').length}/160 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Keywords
                </label>
                <Input
                  value={post.keywords || ''}
                  onChange={(e) => setPost({ ...post, keywords: e.target.value })}
                  placeholder="Enter keywords separated by commas"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Canonical URL
                </label>
                <Input
                  value={post.canonicalUrl || ''}
                  onChange={(e) => setPost({ ...post, canonicalUrl: e.target.value })}
                  placeholder="Enter canonical URL if this is a republished post"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                />
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Social Image
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const formData = new FormData()
                      formData.append('image', file)
                      try {
                        const response = await fetch('/api/upload', {
                          method: 'POST',
                          body: formData,
                        })
                        if (!response.ok) throw new Error('Upload failed')
                        const { url } = await response.json()
                        setPost({ ...post, ogImage: url })
                      } catch (error) {
                        toast.error('Failed to upload image')
                      }
                    }
                  }}
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                />
                {post.ogImage && (
                  <img src={post.ogImage} alt="Social preview" className="mt-2 max-w-md rounded" />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Social Title
                </label>
                <Input
                  value={post.ogTitle || ''}
                  onChange={(e) => setPost({ ...post, ogTitle: e.target.value })}
                  placeholder="Enter social media title"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Social Description
                </label>
                <Input
                  value={post.ogDescription || ''}
                  onChange={(e) => setPost({ ...post, ogDescription: e.target.value })}
                  placeholder="Enter social media description"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button 
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}