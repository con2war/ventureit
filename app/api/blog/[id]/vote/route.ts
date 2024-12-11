import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { type } = await request.json()

    if (!['upvote', 'downvote'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      )
    }

    const updateData = type === 'upvote'
      ? { upvotes: { increment: 1 } }
      : { downvotes: { increment: 1 } }

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      upvotes: post.upvotes,
      downvotes: post.downvotes
    })

  } catch (error) {
    console.error('Vote error:', error)
    return NextResponse.json(
      { error: 'Failed to update vote' },
      { status: 500 }
    )
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
} 