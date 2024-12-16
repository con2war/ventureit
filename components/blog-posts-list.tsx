import { prisma } from '@/lib/prisma'
import { BlogGrid } from '@/components/blog-grid'

export async function BlogPostsList() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 3
  })

  return (
    <section className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogGrid posts={posts} />
      </div>
    </section>
  )
}

