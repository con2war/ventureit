import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type VoteType = 'upvote' | 'downvote'

interface VoteRequest {
  type: VoteType
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json(
      { error: 'Post ID is required' },
      { status: 400 }
    )
  }

  try {
    const body = await request.json() as VoteRequest
    const { type } = body

    if (!type || (type !== 'upvote' && type !== 'downvote')) {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      )
    }

    const post = await prisma.blogPost.findUnique({
      where: {
        id: params.id
      }
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const updatedPost = await prisma.blogPost.update({
      where: {
        id: params.id
      },
      data: {
        [type === 'upvote' ? 'upvotes' : 'downvotes']: {
          increment: 1
        }
      }
    })

    return NextResponse.json({
      success: true,
      post: updatedPost
    })
  } catch (error) {
    console.error('Vote error:', error)
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    )
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
} 