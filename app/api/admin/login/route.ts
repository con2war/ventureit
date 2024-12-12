import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { signToken } from '@/lib/jwt'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (password === process.env.ADMIN_PASSWORD) {
      // Create a proper JWT token
      const token = await signToken({ 
        role: 'admin'
      })

      // Set the token in cookies
      cookies().set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
} 