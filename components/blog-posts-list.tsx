import { prisma } from '@/lib/prisma'
import { BlogGrid } from '@/components/blog-grid'
import type { BlogPost } from '@/types/blog'

export async function BlogPostsList() {
  try {
    const posts = (await prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 3
    })) as unknown as BlogPost[]

    return (
      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogGrid posts={posts} />
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error fetching posts:', error)
    return null
  }
}

