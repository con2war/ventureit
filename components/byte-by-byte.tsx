'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatDate, stripHtmlTags } from '@/lib/utils'
import { ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import type { BlogPost } from '@/types/blog'

interface ByteByByteProps {
  posts: BlogPost[]
}

export function ByteByByte({ posts = [] }: ByteByByteProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const getPreviewText = (content: string) => {
    // First strip the HTML tags
    const plainText = stripHtmlTags(content)
    // Then truncate if necessary
    return plainText.length > 150 
      ? `${plainText.substring(0, 150)}...` 
      : plainText
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">No posts available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="bg-white/5 hover:bg-white/10 transition-colors h-full flex flex-col">
                    <CardContent className="p-6 flex flex-col flex-grow">
                      {post.imageUrl && (
                        <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={posts.indexOf(post) === 0}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-medium text-white mb-2 text-left">{post.title}</h3>
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
                      <div className="flex items-center space-x-2 mb-4">
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
                      <p className="text-gray-300 line-clamp-2 mb-4 text-sm text-left flex-grow">
                        {post.metaDescription || getPreviewText(post.content)}
                      </p>
                      <div className="flex items-center text-[#5ce1e6] font-medium group-hover:underline mt-auto">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 