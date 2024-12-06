'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { type BlogPost } from '@prisma/client'

interface ByteByByteProps {
  posts: BlogPost[]
}

export function ByteByByte({ posts }: ByteByByteProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="lg:text-center"
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
                  <Card className="bg-white/5 hover:bg-white/10 transition-colors">
                    <CardContent className="p-6">
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