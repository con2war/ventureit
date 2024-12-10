import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '9')
    const search = searchParams.get('search') || ''
    
    const skip = (page - 1) * limit

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where: {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({
        where: {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        },
      }),
    ])
    
    return NextResponse.json({
      posts,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error('Blog posts fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Log the start of the request
    console.log('Starting blog post creation...')

    // Validate request body
    const body = await request.json()
    const { title, content, imageUrl } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Log the data being processed
    console.log('Processing blog post data:', {
      title,
      slug: slugify(title),
      contentLength: content.length,
      hasImage: !!imageUrl
    })

    // Verify Prisma connection
    await prisma.$connect()
    console.log('Prisma connection established')

    // Create the post
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: slugify(title),
        content,
        imageUrl: imageUrl || null,
      },
    })
    
    console.log('Blog post created successfully:', post.id)
    
    return NextResponse.json({
      success: true,
      post
    })
  } catch (error) {
    // Detailed error logging
    console.error('Blog post creation error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    })

    // Check for specific error types
    if (error instanceof Error) {
      if (error.message.includes('Prisma')) {
        return NextResponse.json(
          { error: 'Database connection error. Please try again.' },
          { status: 500 }
        )
      }
      if (error.message.includes('unique constraint')) {
        return NextResponse.json(
          { error: 'A post with this title already exists.' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to create blog post. Please try again later.' },
      { status: 500 }
    )
  } finally {
    // Always disconnect Prisma in production
    if (process.env.NODE_ENV === 'production') {
      await prisma.$disconnect()
    }
  }
} 