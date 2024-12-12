import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/types/blog'

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div>
      <div className="lg:text-center mb-12">
        <h1 className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-white sm:text-5xl">
          Bit by Bit
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
          Stay updated with our latest insights and developments in tech
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/blog/${post.slug}`}
            className="group"
          >
            <article className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition h-full flex flex-col">
              {post.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#5ce1e6] transition">
                  {post.title}
                </h2>
                <time className="text-sm text-gray-400 mb-4">
                  {formatDate(post.createdAt)}
                </time>
                <div 
                  className="text-gray-300 mb-4 line-clamp-3 text-sm"
                  dangerouslySetInnerHTML={{ 
                    __html: post.content.substring(0, 150) + '...'
                  }}
                />
                <div className="mt-auto flex items-center text-[#5ce1e6] font-medium group-hover:underline">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
} 