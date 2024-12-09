import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Header } from '@/components/header'
import { ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react'
import { NewsletterSection } from '@/components/newsletter-section'
import type { BlogPost } from '@/types/blog'

async function getBlogPosts() {
  try {
    return await prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-white mb-12">Blog Posts</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: BlogPost) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group relative bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
              >
                {post.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#5ce1e6] transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-400 text-sm">
                      {formatDate(post.createdAt)}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.upvotes ?? 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsDown className="h-4 w-4" />
                        <span>{post.downvotes ?? 0}</span>
                      </div>
                    </div>
                  </div>
                  <div 
                    className="text-gray-300 line-clamp-2 mb-4"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content.substring(0, 150) + '...'
                    }}
                  />
                  <div className="flex items-center text-[#5ce1e6] font-medium group-hover:underline">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <NewsletterSection />
      </div>
    </>
  )
} 