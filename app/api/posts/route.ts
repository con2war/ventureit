import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'

export async function POST(request: Request) {
  try {
    // Check for admin token in cookies
    const cookieStore = cookies()
    const adminToken = cookieStore.get('admin-token')

    if (!adminToken) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 })
    }

    try {
      const verified = await verifyToken(adminToken.value)
      if (!verified) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
      }
    } catch (error) {
      console.error('Token verification error:', error)
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Get request body
    const body = await request.json()
    const { title, content, previewImageUrl } = body

    console.log('Request body:', body)

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    try {
      // Create the blog post using BlogPost model instead of post
      const post = await prisma.blogPost.create({
        data: {
          title,
          content,
          slug,
          imageUrl: previewImageUrl || null,
          upvotes: 0,
          downvotes: 0,
          category: body.category || 'web-development',
          readTime: body.readTime || '5',
          metaDescription: body.metaDescription,
          keywords: body.keywords,
          canonicalUrl: body.canonicalUrl,
          ogImage: body.ogImage,
          ogTitle: body.ogTitle,
          ogDescription: body.ogDescription
        },
      })

      console.log('Created post:', post)
      return NextResponse.json({ success: true, post })
    } catch (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create post in database' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
} 