import { MetadataRoute } from 'next'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'src/content')

// Get all content slugs for a given type
function getContentSlugs(type: string): string[] {
  const dirPath = path.join(contentDirectory, type)
  if (!fs.existsSync(dirPath)) return []
  return fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .map(f => f.replace('.md', ''))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://valueinvest.wiki'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/people`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/concepts`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/companies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/interviews`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/articles`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/letters`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/meetings`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/books`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/partnership-letters`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/ai`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Dynamic content pages
  const types = ['people', 'concepts', 'companies', 'interviews', 'articles', 'letters', 'meetings', 'partnership-letters', 'books']
  const dynamicPages: MetadataRoute.Sitemap = []

  for (const type of types) {
    const slugs = getContentSlugs(type)
    for (const slug of slugs) {
      // Read frontmatter for lastModified
      const filePath = path.join(contentDirectory, type, `${slug}.md`)
      let lastModified = new Date()
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        if (data.updated) lastModified = new Date(data.updated)
      } catch {}

      dynamicPages.push({
        url: `${baseUrl}/${type}/${slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: type === 'concepts' || type === 'people' || type === 'companies' ? 0.8 : 0.7,
      })
    }
  }

  return [...staticPages, ...dynamicPages]
}
