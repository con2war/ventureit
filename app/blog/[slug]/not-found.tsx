import Link from 'next/link'
import { Header } from '@/components/header'

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Post Not Found
          </h2>
          <p className="text-gray-400 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            href="/blog"
            className="text-[#5ce1e6] hover:underline"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </>
  )
} 