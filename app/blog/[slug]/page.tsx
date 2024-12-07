import { Metadata } from 'next'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Header } from '@/components/header'
import { VoteButtons } from '@/components/vote-buttons'
import { notFound } from 'next/navigation'
import type { BlogPost } from '@/types/blog'

interface PageProps {
  params: {
    slug: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  }
}

async function getPost(slug: string): Promise<BlogPost | null> {
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

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {post.imageUrl && (
            <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          
          <h1 className="text-4xl font-bold text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between mb-8">
            <time className="text-gray-400">
              {formatDate(post.createdAt)}
            </time>
            <VoteButtons
              postId={post.id}
              initialUpvotes={post.upvotes}
              initialDownvotes={post.downvotes}
            />
          </div>
          
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
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