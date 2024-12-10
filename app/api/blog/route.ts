import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/utils'
import { cookies } from 'next/headers'

export const maxDuration = 60
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
    // Validate admin authentication
    const cookieStore = cookies()
    const adminToken = cookieStore.get('admin-token')
    const adminSecret = process.env.ADMIN_SECRET

    if (!adminToken || adminToken.value !== adminSecret) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { title, content, imageUrl } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Generate slug
    const slug = slugify(title)

    // Create the post using the existing prisma instance
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        imageUrl: imageUrl || null,
      },
    })

    return NextResponse.json({ success: true, post }, { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      }
    })

  } catch (error) {
    console.error('Blog post creation error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      env: {
        hasDbUrl: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV
      }
    })

    return NextResponse.json(
      { error: 'Failed to create blog post. Please try again.' },
      { status: 500 }
    )
  }
} 