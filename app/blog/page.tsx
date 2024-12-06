import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { SearchInput } from '@/components/search-input'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react'
import { NewsletterSection } from '@/components/newsletter-section'

async function getBlogPosts(searchParams: {
  page?: string
  search?: string
}) {
  const page = parseInt(searchParams.page || '1')
  const limit = 9
  const search = searchParams.search || ''

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.blogPost.count({
      where: {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      },
    }),
  ])

  return {
    posts,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string }
}) {
  const { posts, total, totalPages, currentPage } = await getBlogPosts(searchParams)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Latest Posts</h1>
            <div className="w-72">
              <SearchInput />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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

          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-12">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                asChild
              >
                <Link
                  href={`/blog?page=${currentPage - 1}${
                    searchParams.search ? `&search=${searchParams.search}` : ''
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              </Button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    asChild
                  >
                    <Link
                      href={`/blog?page=${page}${
                        searchParams.search ? `&search=${searchParams.search}` : ''
                      }`}
                    >
                      {page}
                    </Link>
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                asChild
              >
                <Link
                  href={`/blog?page=${currentPage + 1}${
                    searchParams.search ? `&search=${searchParams.search}` : ''
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
        
        <NewsletterSection />
      </div>
      <Footer />
    </>
  )
} 