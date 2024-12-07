import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface EstimateRequest {
  websiteType: string
  pages: number
  features: string[]
  additionalFeatures: string[]
  totalCost: number
  name: string
  email: string
  phone: string
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json() as EstimateRequest
    const { websiteType, pages, features, additionalFeatures, totalCost, name, email, phone } = body

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Website Project Estimate - ${name}`,
      html: `
        <h2>New Project Estimate Request</h2>
        <p><strong>Client Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Project Details:</h3>
        <p><strong>Website Type:</strong> ${websiteType}</p>
        <p><strong>Number of Pages:</strong> ${pages}</p>
        <p><strong>Features:</strong> ${features.join(', ') || 'None'}</p>
        <p><strong>Additional Features:</strong> ${additionalFeatures.join(', ') || 'None'}</p>
        <p><strong>Estimated Total Cost:</strong> £${totalCost}</p>
      `
    }

    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}
