import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

const contentDirectory = path.join(process.cwd(), 'src/content')

export interface WikiPage {
  slug: string
  title: string
  description: string
  type: 'people' | 'concepts' | 'companies' | 'letters'
  tags: string[]
  created: string
  updated: string
  content: string
  source?: string
}

export interface WikiMeta {
  slug: string
  title: string
  description: string
  type: 'people' | 'concepts' | 'companies' | 'letters'
  tags: string[]
}

export async function getPageBySlug(
  type: WikiPage['type'],
  slug: string
): Promise<WikiPage | null> {
  try {
    const fullPath = path.join(contentDirectory, type, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert Obsidian-style [[links]] to markdown links
    const contentWithLinks = content
      .replace(/\[\[([^\]|]+)\]\]/g, (_, slug) => {
        const displayText = slug.trim()
        const linkSlug = slug.trim().toLowerCase().replace(/\s+/g, '-')
        return `[${displayText}](/${linkSlug})`
      })
      .replace(/\[\[([^|]+)\|([^\]]+)\]\]/g, (_, slug, display) => {
        const linkSlug = slug.trim().toLowerCase().replace(/\s+/g, '-')
        return `[${display.trim()}](/${linkSlug})`
      })

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .use(remarkGfm)
      .process(contentWithLinks)

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      type,
      tags: data.tags || [],
      created: data.created || '',
      updated: data.updated || '',
      content: processedContent.toString(),
      source: data.source,
    }
  } catch {
    return null
  }
}

export function getAllPagesMeta(type: WikiPage['type']): WikiMeta[] {
  const directory = path.join(contentDirectory, type)

  if (!fs.existsSync(directory)) {
    return []
  }

  const files = fs.readdirSync(directory).filter((f) => f.endsWith('.md'))

  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    const fullPath = path.join(directory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      type,
      tags: data.tags || [],
    }
  })
}

export function getAllPages(): WikiMeta[] {
  const types: WikiPage['type'][] = ['people', 'concepts', 'companies', 'letters']
  return types.flatMap((type) => getAllPagesMeta(type))
}