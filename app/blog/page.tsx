import { prisma } from '@/lib/prisma'
import { Header } from '@/components/header'
import { BlogGrid } from '@/components/blog-grid'
import { NewsletterSection } from '@/components/newsletter-section'
import Link from 'next/link'
import { Footer } from '@/components/footer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <BlogGrid posts={posts} />
        </div>
      </main>
      <NewsletterSection />
      <Footer />
    </>
  )
} 