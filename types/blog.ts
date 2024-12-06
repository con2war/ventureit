export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  imageUrl?: string
  upvotes: number
  downvotes: number
  createdAt: Date
  updatedAt: Date
} 