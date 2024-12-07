import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface NewsletterRequest {
  email: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as NewsletterRequest
    const { email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email }
    })

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }

    // Create new subscriber
    const subscriber = await prisma.newsletter.create({
      data: { email }
    })

    return NextResponse.json({
      success: true,
      subscriber
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    // Check for Prisma-specific errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}

// Handle GET request to check subscription status
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const subscriber = await prisma.newsletter.findUnique({
      where: { email }
    })

    return NextResponse.json({
      isSubscribed: !!subscriber
    })
  } catch (error) {
    console.error('Newsletter check error:', error)
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    )
  }
} 