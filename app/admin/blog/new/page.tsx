'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RichTextEditor } from '@/components/rich-text-editor'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { ThemeToggle } from '@/components/theme-toggle'

export default function CreateBlogPost() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [previewImage, setPreviewImage] = useState<File | null>(null)
    const [previewImageUrl, setPreviewImageUrl] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            let uploadedImageUrl = ''

            if (previewImage) {
                const formData = new FormData()
                formData.append('image', previewImage)

                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                    credentials: 'same-origin',
                })

                if (!uploadResponse.ok) {
                    const error = await uploadResponse.json()
                    throw new Error(error.error || 'Failed to upload image')
                }

                const imageData = await uploadResponse.json()
                uploadedImageUrl = imageData.url
            }

            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    title,
                    content,
                    previewImageUrl: uploadedImageUrl,
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to create post')
            }

            toast.success('Blog post created successfully')
            router.push('/admin/blog/manage')
            router.refresh()
        } catch (error) {
            console.error('Error creating post:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to create post')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 bg-black">
            <div className="flex items-center justify-between mb-8">
                <Link 
                    href="/admin/blog/manage" 
                    className="inline-flex items-center text-white hover:text-[#5ce1e6] transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Blog Management
                </Link>
            </div>

            <h1 className="text-3xl font-bold text-white mb-8">Create New Blog Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                        Title
                    </label>
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post title"
                        className="bg-white/5 text-white border-gray-600 focus:border-[#5ce1e6] focus:ring-[#5ce1e6]"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-white mb-2">
                        Content
                    </label>
                    <div className="prose-wrapper bg-white/5 rounded-lg border border-gray-600">
                        <RichTextEditor content={content} onChange={setContent} />
                    </div>
                </div>

                <div className="space-y-4">
                    <label htmlFor="previewImage" className="block text-sm font-medium text-white">
                        Preview Image (Optional)
                    </label>
                    <Input
                        id="previewImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                                setPreviewImage(file)
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                    setPreviewImageUrl(reader.result as string)
                                }
                                reader.readAsDataURL(file)
                            }
                        }}
                        className="bg-white/5 text-white border-gray-600 file:bg-white/10 file:text-white 
                            file:border-0 file:mr-4 file:py-2 file:px-4 hover:file:bg-white/20"
                    />
                    {previewImageUrl && (
                        <div className="relative mt-4 rounded-lg overflow-hidden">
                            <img
                                src={previewImageUrl}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#5ce1e6] hover:bg-[#5ce1e6]/90 text-black font-medium"
                >
                    {isSubmitting ? 'Creating...' : 'Create Post'}
                </Button>
            </form>
        </div>
    )
}