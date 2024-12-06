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
} 