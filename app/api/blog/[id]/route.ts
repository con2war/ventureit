import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
  }

  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: params.id }
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
  }

  try {
    const { type } = await request.json()
    
    if (type !== 'upvote' && type !== 'downvote') {
      return NextResponse.json({ error: 'Invalid vote type' }, { status: 400 })
    }

    const updateData = type === 'upvote' 
      ? { upvotes: { increment: 1 } }
      : { downvotes: { increment: 1 } }

    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: updateData
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.blogPost.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
} 