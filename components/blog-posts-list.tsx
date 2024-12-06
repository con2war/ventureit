import { prisma } from '@/lib/prisma'
import { ByteByByte } from './byte-by-byte'

async function getLatestPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        upvotes: true,
        downvotes: true,
      }
    })
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function BlogPostsList() {
  const posts = await getLatestPosts()
  return <ByteByByte posts={posts} />
} 