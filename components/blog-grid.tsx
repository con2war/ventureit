import Link from 'next/link'
import Image from 'next/image'
import { formatDate, stripHtmlTags } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/types/blog'

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  const getPreviewText = (content: string) => {
    // First strip the HTML tags
    const plainText = stripHtmlTags(content)
    // Then truncate if necessary
    return plainText.length > 150 
      ? `${plainText.substring(0, 150)}...` 
      : plainText
  }

  return (
    <div>
      <div className="lg:text-center mb-12">
        <h1 className="mt-2 text-4xl leading-8 font-extrabold tracking-tight sm:text-5xl">
          Bit by Bit
        </h1>
        <p className="mt-4 max-w-2xl text-xl lg:mx-auto">
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={posts.indexOf(post) === 0}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 mb-2">
                  {post.category && (
                    <span className="bg-[#5ce1e6]/10 text-[#5ce1e6] text-xs px-2 py-1 rounded">
                      {post.category}
                    </span>
                  )}
                  {post.readTime && (
                    <span className="text-gray-400 text-xs">
                      {post.readTime} min read
                    </span>
                  )}
                </div>
                
                <h2 className="text-xl font-bold mb-2 group-hover:text-[#5ce1e6] transition">
                  {post.title}
                </h2>
                
                <time className="text-sm text-gray-400 mb-4">
                  {formatDate(post.createdAt)}
                </time>
                
                <p className="mb-4 line-clamp-3 text-sm">
                  {post.metaDescription || getPreviewText(post.content)}
                </p>

                {post.author && (
                  <div className="flex items-center mb-4">
                    {post.author.image && (
                      <Image
                        src={post.author.image}
                        alt={post.author.name || 'Author'}
                        width={24}
                        height={24}
                        className="rounded-full mr-2"
                      />
                    )}
                    <span className="text-sm text-gray-400">
                      {post.author.name}
                    </span>
                  </div>
                )}
                
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