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
      // Prepare the data object with type checking
      const postData = {
        title: String(title),
        content: String(content),
        slug: String(slug),
        imageUrl: previewImageUrl ? String(previewImageUrl) : null,
        upvotes: 0,
        downvotes: 0,
        category: body.category ? String(body.category) : 'web-development',
        readTime: body.readTime ? String(body.readTime) : '5',
        metaDescription: body.metaDescription ? String(body.metaDescription) : null,
        keywords: body.keywords ? String(body.keywords) : null,
        canonicalUrl: body.canonicalUrl ? String(body.canonicalUrl) : null,
        ogImage: body.ogImage ? String(body.ogImage) : null,
        ogTitle: body.ogTitle ? String(body.ogTitle) : null,
        ogDescription: body.ogDescription ? String(body.ogDescription) : null,
        author: body.author || null
      }

      console.log('Attempting to create post with data:', postData)

      // Create the blog post
      const post = await prisma.blogPost.create({
        data: postData
      })

      console.log('Created post:', post)
      return NextResponse.json({ success: true, post })
    } catch (error) {
      console.error('Detailed database error:', error)
      // Return more specific error information
      return NextResponse.json(
        { 
          error: 'Failed to create post in database',
          details: error instanceof Error ? error.message : 'Unknown error',
          data: body 
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal Server Error',
        details: error instanceof Error ? error.stack : 'No stack trace available'
      },
      { status: 500 }
    )
  }
} 