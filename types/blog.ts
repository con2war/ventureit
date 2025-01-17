type Json = any

export interface BlogPost {
  id: string
  title: string
  content: string
  slug: string
  imageUrl: string | null
  upvotes: number
  downvotes: number
  createdAt: Date
  updatedAt: Date
  category: string | null
  readTime: string | null
  metaDescription: string | null
  keywords: string | null
  canonicalUrl: string | null
  ogImage: string | null
  ogTitle: string | null
  ogDescription: string | null
  author: Json | null
} 