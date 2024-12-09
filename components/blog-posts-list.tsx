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
  return (
    <div className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-white sm:text-5xl">
            Bit by Bit
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
            Stay updated with our latest insights and developments in tech
          </p>
        </div>
        <ByteByByte posts={posts} />
      </div>
    </div>
  )
} 