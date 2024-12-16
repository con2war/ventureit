import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { VoteButtons } from '@/components/vote-buttons'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

async function getPost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug }
    })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }

  // Create a sanitized version of the HTML that allows img tags
  const sanitizedContent = post.content.replace(
    /<img\s+src="([^"]+)"/g,
    '<img src="$1" style="max-width: 100%; height: auto; border-radius: 0.5rem; margin: 2rem 0;"'
  )

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center hover:text-[#5ce1e6] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Link>
        <ThemeToggle />

        {/* Post Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {post.title}
          </h1>
          <div className="flex items-center justify-between">
            <time className="text-gray-400">
              {formatDate(post.createdAt)}
            </time>
            <VoteButtons 
              postId={post.id} 
              initialUpvotes={post.upvotes} 
              initialDownvotes={post.downvotes}
            />
          </div>
        </div>

        {/* Post Content */}
        <div 
          className="text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto  
            [&_p]:text-lg [&_p]:leading-relaxed
            [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-8
            [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-6
            [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-4
            [&_ul]:list-disc [&_ul]:ml-4
            [&_ol]:list-decimal [&_ol]:ml-4
            [&_li]:mb-2
            [&_a]:text-[#5ce1e6] [&_a]:underline
            [&_img]:rounded-lg [&_img]:my-8"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        {/* Optional: Share or Related Posts Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <Link 
              href="/blog" 
              className="text-[#5ce1e6] hover:underline"
            >
              Browse more articles
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

// Generate static params for static site generation
export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      select: { slug: true }
    })
    
    return posts.map((post: { slug: string }) => ({
      slug: post.slug
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0