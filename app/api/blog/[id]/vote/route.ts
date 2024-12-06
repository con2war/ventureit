import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { type } = await req.json()
    
    const updateData = type === 'up'
      ? { upvotes: { increment: 1 } }
      : { downvotes: { increment: 1 } }
    
    const post = await prisma.blogPost.update({
      where: { id: params.id },
      data: updateData,
    })
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Vote error:', error)
    return NextResponse.json(
      { error: 'Failed to update vote' },
      { status: 500 }
    )
  }
}