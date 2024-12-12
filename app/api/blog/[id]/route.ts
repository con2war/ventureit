import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        id: params.id
      }
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin token
    const cookieStore = cookies()
    const adminToken = cookieStore.get('admin-token')

    if (!adminToken) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 })
    }

    const verified = await verifyToken(adminToken.value)
    if (!verified) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, imageUrl } = body

    // Create new slug if title changed
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    // Update the blog post
    const updatedPost = await prisma.blogPost.update({
      where: {
        id: params.id
      },
      data: {
        title,
        content,
        slug,
        imageUrl: imageUrl || null,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin token
    const cookieStore = cookies()
    const adminToken = cookieStore.get('admin-token')

    if (!adminToken) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 })
    }

    const verified = await verifyToken(adminToken.value)
    if (!verified) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    await prisma.blogPost.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
} 