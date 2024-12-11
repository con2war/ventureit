import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types/blog'

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div>
      <div className="lg:text-center mb-12">
        <h2 className="text-xl text-[#5ce1e6] font-semibold tracking-wide uppercase">
          Blog
        </h2>
        <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-white sm:text-5xl">
          Byte by Byte
        </p>
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
            <article className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition">
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
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#5ce1e6] transition">
                  {post.title}
                </h2>
                <time className="text-sm text-gray-400">
                  {formatDate(post.createdAt)}
                </time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
} 