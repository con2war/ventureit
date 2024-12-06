import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { VoteButtons } from '@/components/vote-buttons'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Head from 'next/head'
import { generateExcerpt } from '@/lib/utils'

async function getBlogPost(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      createdAt: true,
      upvotes: true,
      downvotes: true,
    },
  })
  return post
}

export default async function BlogPostPage({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const excerpt = generateExcerpt(post.content)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  return (
    <>
      <Head>
        <title>{post.title} | Your Blog Name</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={post.imageUrl || '/default-image.jpg'} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}/blog/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": excerpt,
            "image": post.imageUrl,
            "datePublished": post.createdAt,
            "url": `${siteUrl}/blog/${slug}`,
            "author": {
              "@type": "Person",
              "name": "Author Name"
            }
          })}
        </script>
      </Head>
      <Header />
      <div className="min-h-screen bg-black pt-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {post.imageUrl && (
            <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-white">{post.title}</h1>
            <div className="flex items-center justify-between">
              <p className="text-gray-400">
                {formatDate(post.createdAt)}
              </p>
              <VoteButtons
                postId={post.id}
                initialUpvotes={post.upvotes}
                initialDownvotes={post.downvotes}
              />
            </div>
          </div>
          <div 
            className="prose prose-invert max-w-none text-white [&>*]:text-white [&_p]:text-white [&_li]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_blockquote]:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-16 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="group hover:bg-[#5ce1e6]/10 hover:text-[#5ce1e6] hover:border-[#5ce1e6]"
            >
              <Link href="/blog" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Blog Posts</span>
              </Link>
            </Button>
          </div>
        </article>
      </div>
      <Footer />
    </>
  )
} 