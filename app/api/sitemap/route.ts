import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Define the locations you want to target
const locations = [
  'belfast',
  'derry',
  'lisburn',
  'newry',
  'bangor',
  'northern-ireland'
]

export async function GET() {
  try {
    // Fetch all blog posts
    const posts = await prisma.blogPost.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    // Define static pages
    const staticPages = [
      {
        loc: 'https://www.ventureitsolutions.co.uk',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '1.0',
      },
      {
        loc: 'https://www.ventureitsolutions.co.uk/projects',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.8',
      },
      {
        loc: 'https://www.ventureitsolutions.co.uk/estimator',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.8',
      },
      {
        loc: 'https://www.ventureitsolutions.co.uk/blog',
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8',
      },
    ]

    // Generate location pages
    const locationPages = locations.map(location => ({
      loc: `https://www.ventureitsolutions.co.uk/web-design/${location}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.9',
    }))

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages.map(page => `
        <url>
          <loc>${page.loc}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `).join('')}
      ${locationPages.map(page => `
        <url>
          <loc>${page.loc}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `).join('')}
      ${posts.map(post => `
        <url>
          <loc>https://www.ventureitsolutions.co.uk/blog/${post.slug}</loc>
          <lastmod>${post.updatedAt.toISOString().split('T')[0]}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.6</priority>
        </url>
      `).join('')}
    </urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
} 