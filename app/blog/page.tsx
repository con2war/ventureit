import { prisma } from '@/lib/prisma'
import { Header } from '@/components/header'
import { BlogGrid } from '@/components/blog-grid'
import { NewsletterSection } from '@/components/newsletter-section'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import type { BlogPost } from '@/types/blog'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const POSTS_PER_PAGE = 6

async function getPosts(page: number = 1) {
  try {
    const posts = (await prisma.blogPost.findMany({
      take: POSTS_PER_PAGE,
      skip: (page - 1) * POSTS_PER_PAGE,
      orderBy: {
        createdAt: 'desc'
      }
    })) as unknown as BlogPost[]
    
    const totalPosts = await prisma.blogPost.count()
    
    return {
      posts,
      hasMore: totalPosts > page * POSTS_PER_PAGE,
      totalPages: Math.ceil(totalPosts / POSTS_PER_PAGE)
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return { posts: [], hasMore: false, totalPages: 0 }
  }
}

export default async function BlogPage({
  searchParams
}: {
  searchParams: { page?: string }
}) {
  const currentPage = Number(searchParams.page) || 1
  const { posts, hasMore, totalPages } = await getPosts(currentPage)

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <BlogGrid posts={posts} />
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-4">
            {currentPage > 1 && (
              <Button
                variant="outline"
                asChild
              >
                <a href={`/blog?page=${currentPage - 1}`}>
                  Previous Page
                </a>
              </Button>
            )}
            
            {hasMore && (
              <Button
                variant="outline"
                asChild
              >
                <a href={`/blog?page=${currentPage + 1}`}>
                  Next Page
                </a>
              </Button>
            )}
          </div>
          
          {/* Page indicator */}
          <div className="mt-4 text-center text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </main>
      <NewsletterSection />
      <Footer />
    </>
  )
} 