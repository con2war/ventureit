import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { prisma } from '@/lib/prisma'
import { ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react'
import { CardContent } from '@/components/ui/card'

async function getLatestPosts() {
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
      upvotes: true,
      downvotes: true,
    }
  })
  return posts
}

export async function ByteByByte() {
  const posts = await getLatestPosts()

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
            Byte by Byte
          </h2>
          <p className="max-w-[900px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore our latest insights and discoveries in technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group relative bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
            >
              {post.imageUrl && (
                <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <CardContent className="p-6">
                <h3 className="text-xl font-medium text-white mb-2">{post.title}</h3>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-400">
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
                  className="text-gray-300 line-clamp-2 mb-4 text-sm"
                  dangerouslySetInnerHTML={{ 
                    __html: post.content.substring(0, 150) + '...'
                  }}
                />
                <div className="flex items-center text-[#5ce1e6] font-medium group-hover:underline">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-black bg-[#5ce1e6] rounded-lg hover:bg-[#5ce1e6]/90 transition-colors"
          >
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
} 