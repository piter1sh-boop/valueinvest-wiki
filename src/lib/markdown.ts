import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

const contentDirectory = path.join(process.cwd(), 'src/content')

export type WikiType = 'people' | 'concepts' | 'companies' | 'letters' | 'interviews' | 'articles' | 'partnership-letters' | 'meetings' | 'books'

// Build a complete slug -> section mapping for wiki-link resolution
function buildSlugMapping(): Record<string, string> {
  const mapping: Record<string, string> = {}
  const types: WikiType[] = ['people', 'concepts', 'companies', 'letters', 'interviews', 'articles', 'partnership-letters', 'meetings', 'books']

  for (const type of types) {
    const dirPath = path.join(contentDirectory, type)
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md') && f !== 'index.md')
      for (const file of files) {
        const slug = file.replace(/\.md$/, '')
        mapping[slug] = type
      }
    }
  }
  return mapping
}

const slugToSection = buildSlugMapping()

export interface WikiLink {
  slug: string
  text: string
  href: string
}

export interface WikiPage {
  slug: string
  title: string
  description: string
  type: WikiType
  tags: string[]
  created: string
  updated: string
  content: string
  source?: string
  links: WikiLink[]
}

export interface WikiMeta {
  slug: string
  title: string
  description: string
  type: WikiType
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
    // Known prefixes for content types (slugs that need type-based routing)
    const knownPrefixes: Record<string, string> = {
      'letter': 'letters',
      'partnership-letter': 'partnership-letters',
      'meeting': 'meetings',
      'munger': 'interviews',
    }

    // Extract wikilinks for Related Links section
    const links: WikiLink[] = []
    const wikiLinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
    let match
    while ((match = wikiLinkRegex.exec(content)) !== null) {
      const linkSlug = match[1].trim().toLowerCase().replace(/\s+/g, '-')
      const displayText = (match[2] || match[1]).trim()
      let href = `/${linkSlug}`
      if (slugToSection[linkSlug]) {
        href = `/${slugToSection[linkSlug]}/${linkSlug}`
      } else {
        const prefix = Object.keys(knownPrefixes).find(p => linkSlug.startsWith(p + '-'))
        if (prefix) {
          href = `/${knownPrefixes[prefix]}/${linkSlug}`
        }
      }
      links.push({ slug: linkSlug, text: displayText, href })
    }

    const contentWithLinks = content
      .replace(/\[\[([^\]|]+)\]\]/g, (_, slug) => {
        const displayText = slug.trim()
        const linkSlug = slug.trim().toLowerCase().replace(/\s+/g, '-')
        // Check if this slug is in our mapping
        if (slugToSection[linkSlug]) {
          return `[${displayText}](/${slugToSection[linkSlug]}/${linkSlug})`
        }
        // Check if this slug has a known prefix that needs special routing
        const prefix = Object.keys(knownPrefixes).find(p => linkSlug.startsWith(p + '-'))
        if (prefix) {
          return `[${displayText}](/${knownPrefixes[prefix]}/${linkSlug})`
        }
        return `[${displayText}](/${linkSlug})`
      })
      .replace(/\[\[([^|]+)\|([^\]]+)\]\]/g, (_, slug, display) => {
        const linkSlug = slug.trim().toLowerCase().replace(/\s+/g, '-')
        if (slugToSection[linkSlug]) {
          return `[${display.trim()}](/${slugToSection[linkSlug]}/${linkSlug})`
        }
        const prefix = Object.keys(knownPrefixes).find(p => linkSlug.startsWith(p + '-'))
        if (prefix) {
          return `[${display.trim()}](/${knownPrefixes[prefix]}/${linkSlug})`
        }
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
      links,
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
  const types: WikiType[] = ['people', 'concepts', 'companies', 'letters']
  return types.flatMap((type) => getAllPagesMeta(type))
}