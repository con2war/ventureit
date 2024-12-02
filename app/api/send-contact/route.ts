import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    try {
      // Log to verify environment variables are available
      console.log('Email User exists:', !!process.env.EMAIL_USER)
      console.log('Email Password exists:', !!process.env.EMAIL_APP_PASSWORD)
      
      const body = await request.json()
      console.log('Received request body:', body)
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
        debug: true, // Enable debug logging
      })

      // Verify transporter configuration
      try {
        await transporter.verify()
        console.log('Transporter verified successfully')
      } catch (verifyError) {
        console.error('Transporter verification failed:', verifyError)
        throw verifyError
      }

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'conorward00@gmail.com',
        subject: `New Contact Form Submission - ${body.enquiryType}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Enquiry Type:</strong> ${body.enquiryType}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message}</p>
        `,
      }

      console.log('Attempting to send email with options:', {
        ...mailOptions,
        auth: '**hidden**' // Don't log auth details
      })

      const info = await transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', info)

      return NextResponse.json({ 
        success: true, 
        message: "Thank you for your message. We will be in touch shortly!" 
      })
    } catch (error) {
      console.error('Detailed error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      )
    }
}