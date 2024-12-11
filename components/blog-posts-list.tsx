import { prisma } from '@/lib/prisma'
import { ByteByByte } from './byte-by-byte'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getLatestPosts() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 3,
  })
  return posts
}

export async function BlogPostsList() {
  const posts = await getLatestPosts()

  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-xl text-[#5ce1e6] font-semibold tracking-wide uppercase">
            Latest Posts
          </h2>
          <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-white sm:text-5xl">
            Byte by Byte
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
            Stay updated with our latest insights and developments in tech
          </p>
        </div>
        <ByteByByte posts={posts} />
      </div>
    </section>
  )
} 