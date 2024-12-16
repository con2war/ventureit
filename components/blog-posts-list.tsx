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
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Latest Blog Posts
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Stay updated with our latest insights and news
          </p>
        </div>
        <BlogGrid posts={posts} />
      </div>
    </section>
  )
}

