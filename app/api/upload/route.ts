import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, GIF, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true // Adds a random suffix to prevent naming conflicts
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error('Error in image upload:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}

// Optionally handle OPTIONS requests for CORS preflight
export async function OPTIONS(req: Request) {
  return NextResponse.json({}, { status: 200 })
} 