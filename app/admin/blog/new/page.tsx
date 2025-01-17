'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RichTextEditor } from '@/components/rich-text-editor'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CreateBlogPost() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [previewImage, setPreviewImage] = useState<File | null>(null)
    const [previewImageUrl, setPreviewImageUrl] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [category, setCategory] = useState('web-development')
    const [metaDescription, setMetaDescription] = useState('')
    const [readTime, setReadTime] = useState('5')
    const [keywords, setKeywords] = useState('')
    const [canonicalUrl, setCanonicalUrl] = useState('')
    const [ogImage, setOgImage] = useState<string | null>(null)
    const [ogTitle, setOgTitle] = useState('')
    const [ogDescription, setOgDescription] = useState('')

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
                    category,
                    metaDescription,
                    readTime: parseInt(readTime),
                    keywords,
                    canonicalUrl,
                    ogImage,
                    ogTitle,
                    ogDescription,
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

    const handleSocialImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setOgImage(URL.createObjectURL(file))
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <Link 
                    href="/admin/blog/manage" 
                    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Blog Management
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
            
            <Tabs defaultValue="edit" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="social">Social</TabsTrigger>
                </TabsList>

                <TabsContent value="edit">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                                        Title
                                    </label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter post title"
                                        className="w-full"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium mb-2">
                                        Category
                                    </label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="web-development">Web Development</SelectItem>
                                            <SelectItem value="design">Design</SelectItem>
                                            <SelectItem value="marketing">Marketing</SelectItem>
                                            <SelectItem value="technology">Technology</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label htmlFor="readTime" className="block text-sm font-medium mb-2">
                                        Read Time (minutes)
                                    </label>
                                    <Select value={readTime} onValueChange={setReadTime}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select read time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[3, 5, 8, 10, 15, 20].map((time) => (
                                                <SelectItem key={time} value={time.toString()}>
                                                    {time} minutes
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="previewImage" className="block text-sm font-medium mb-2">
                                    Preview Image
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
                                    className="mb-4"
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
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium mb-2">
                                Content
                            </label>
                            <div className="prose-wrapper rounded-lg border">
                                <RichTextEditor content={content} onChange={setContent} />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Post'}
                        </Button>
                    </form>
                </TabsContent>

                <TabsContent value="preview">
                    <div className="prose max-w-none">
                        <h1>{title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </TabsContent>

                <TabsContent value="seo">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Meta Description</label>
                            <Input
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                placeholder="Enter meta description"
                                maxLength={160}
                            />
                            <p className="text-sm text-muted-foreground mt-1">
                                {metaDescription.length}/160 characters
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Keywords</label>
                            <Input
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder="Enter keywords separated by commas"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Canonical URL</label>
                            <Input
                                value={canonicalUrl}
                                onChange={(e) => setCanonicalUrl(e.target.value)}
                                placeholder="Enter canonical URL if this is a republished post"
                            />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="social">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Social Image</label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleSocialImageUpload}
                            />
                            {ogImage && (
                                <img src={ogImage} alt="Social preview" className="mt-2 max-w-md rounded" />
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Social Title</label>
                            <Input
                                value={ogTitle}
                                onChange={(e) => setOgTitle(e.target.value)}
                                placeholder="Enter social media title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Social Description</label>
                            <Input
                                value={ogDescription}
                                onChange={(e) => setOgDescription(e.target.value)}
                                placeholder="Enter social media description"
                            />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}