#!/usr/bin/env npx ts-node

/**
 * Generate long-tail SEO pages from existing content
 * Run: npx ts-node scripts/generate-long-tail-pages.ts
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'src/content')

// Types
interface WikiMeta {
  slug: string
  title: string
  description: string
  type: string
  tags: string[]
}

// Helper: slugify
function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

// Helper: get all files in a directory
function getFiles(dir: string, ext = '.md'): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter(f => f.endsWith(ext) && f !== 'index.md')
}

// Helper: read markdown frontmatter
function readFrontmatter(filePath: string): { data: Record<string, any>, content: string } {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { data, content }
}

// Helper: extract quotes from content
function extractQuotes(content: string): string[] {
  const quotes: string[] = []
  const quoteRegex = />\s*"([^"]+)"/g
  let match
  while ((match = quoteRegex.exec(content)) !== null) {
    quotes.push(match[1])
  }
  return quotes.slice(0, 10) // Max 10 quotes
}

// Helper: extract key topics/sections from content
function extractSections(content: string): { title: string, content: string }[] {
  const sections: { title: string, content: string }[] = []
  const headingRegex = /^##\s+(.+)$/gm
  const h2Matches = [...content.matchAll(/^##\s+(.+)$/gm)]

  for (let i = 0; i < h2Matches.length; i++) {
    const start = h2Matches[i].index! + h2Matches[i][0].length
    const end = h2Matches[i + 1]?.index || content.length
    const sectionContent = content.slice(start, end).trim()
    sections.push({
      title: h2Matches[i][1],
      content: sectionContent.slice(0, 500) // First 500 chars
    })
  }
  return sections
}

// ============ MEETING PAGES ============

function generateMeetingPages() {
  const meetingsDir = path.join(contentDir, 'meetings')
  const meetings = getFiles(meetingsDir)
  let generated = 0

  for (const file of meetings) {
    const filePath = path.join(meetingsDir, file)
    const { data, content } = readFrontmatter(filePath)
    const year = file.replace('meeting-', '').replace('-kingswell', '').replace('.md', '')
    const isKingswell = file.includes('kingswell')

    // Extract year number for directory naming
    const dirName = file.replace('.md', '')

    // 1. Meeting Summary Page
    const sections = extractSections(content)
    const summarySection = sections.find(s => s.title.toLowerCase().includes('overview'))
    const keyTopics = sections.filter(s => !s.title.toLowerCase().includes('overview'))

    const summaryContent = `---
title: ${data.title} - Summary
description: ${data.description}
type: meetings
tags: [${data.tags?.join(', ') || ''}, summary]
created: ${data.created || new Date().toISOString().split('T')[0]}
updated: ${new Date().toISOString().split('T')[0]}
source: ${data.source || ''}
---

# ${data.title} - Summary

${summarySection?.content || data.description}

## Key Topics Discussed

${keyTopics.map(s => `- [[${dirName}#${slugify(s.title)}|${s.title}]]`).join('\n')}

## Quick Facts

- **Year:** ${year}
- **Type:** ${isKingswell ? 'Kingswell Meeting' : 'Annual Meeting'}
${data.tags ? `\n- **Tags:** ${data.tags.map((t: string) => `\`${t}\``).join(', ')}` : ''}
`

    fs.writeFileSync(path.join(meetingsDir, `${dirName}-summary.md`), summaryContent)
    generated++

    // 2. Famous Quotes Page
    const quotes = extractQuotes(content)
    if (quotes.length > 0) {
      const quotesContent = `---
title: ${data.title} - Famous Quotes
description: Famous quotes from the ${year} Berkshire Hathaway Annual Meeting.
type: meetings
tags: [${data.tags?.join(', ') || ''}, quotes]
created: ${data.created || new Date().toISOString().split('T')[0]}
updated: ${new Date().toISOString().split('T')[0]}
source: ${data.source || ''}
---

# Famous Quotes from ${data.title}

${quotes.map((q, i) => `${i + 1}. > "${q}"`).join('\n\n')}

---

*Source: ${data.source || 'ValueInvest.Wiki'}*
`

      fs.writeFileSync(path.join(meetingsDir, `${dirName}-quotes.md`), quotesContent)
      generated++
    }
  }

  console.log(`Generated ${generated} meeting pages`)
  return generated
}

// ============ CONCEPT PAGES ============

function generateConceptPages() {
  const conceptsDir = path.join(contentDir, 'concepts')
  const concepts = getFiles(conceptsDir)
  let generated = 0

  for (const file of concepts) {
    const filePath = path.join(conceptsDir, file)
    const { data, content } = readFrontmatter(filePath)
    const slug = file.replace('.md', '')
    const sections = extractSections(content)

    // 1. Explained Page (beginner-friendly)
    const intro = sections.find(s => s.title.toLowerCase().includes('what') || s.title === '## Introduction')
    const explainedContent = `---
title: ${data.title} - Explained
description: A beginner-friendly explanation of ${data.title} in value investing.
type: concepts
tags: [${data.tags?.join(', ') || ''}, explained, beginner]
created: ${data.created || new Date().toISOString().split('T')[0]}
updated: ${new Date().toISOString().split('T')[0]}
source: ${data.source || ''}
---

# ${data.title} Explained

${intro?.content || data.description}

## What It Means for Investors

${sections.filter(s => !s.title.toLowerCase().includes('what') && s.title !== '## Introduction').slice(0, 2).map(s => `### ${s.title}\n\n${s.content}`).join('\n\n')}

## Key Takeaway

> ${data.description}

## Related Concepts

${data.tags?.map((t: string) => `- [[${t}]]`).join('\n') || ''}
`

    fs.writeFileSync(path.join(conceptsDir, `${slug}-explained.md`), explainedContent)
    generated++

    // 2. Examples Page
    const typesSection = sections.find(s => s.title.toLowerCase().includes('types') || s.title.toLowerCase().includes('example'))
    if (typesSection) {
      const examplesContent = `---
title: ${data.title} - Examples
description: Real-world examples of ${data.title} in investing.
type: concepts
tags: [${data.tags?.join(', ') || ''}, examples]
created: ${data.created || new Date().toISOString().split('T')[0]}
updated: ${new Date().toISOString().split('T')[0]}
source: ${data.source || ''}
---

# ${data.title} - Examples

## Real-World Examples

${typesSection.content}

---

*Learn more at [[${slug}|${data.title}]]*
`

      fs.writeFileSync(path.join(conceptsDir, `${slug}-examples.md`), examplesContent)
      generated++
    }
  }

  console.log(`Generated ${generated} concept pages`)
  return generated
}

// ============ PEOPLE PAGES ============

function generatePeoplePages() {
  const peopleDir = path.join(contentDir, 'people')
  const people = getFiles(peopleDir)
  let generated = 0

  for (const file of people) {
    const filePath = path.join(peopleDir, file)
    const { data, content } = readFrontmatter(filePath)
    const slug = file.replace('.md', '')
    const quotes = extractQuotes(content)
    const sections = extractSections(content)

    // 1. Famous Quotes Page
    if (quotes.length > 0) {
      const quotesContent = `---
title: ${data.title} - Famous Quotes
description: The most memorable quotes from ${data.title}.
type: people
tags: [${data.tags?.join(', ') || ''}, quotes]
created: ${data.created || new Date().toISOString().split('T')[0]}
updated: ${new Date().toISOString().split('T')[0]}
source: ${data.source || ''}
---

# Famous Quotes from ${data.title}

${quotes.map((q, i) => `${i + 1}. > "${q}"`).join('\n\n')}

---

*Source: ValueInvest.Wiki*
`

      fs.writeFileSync(path.join(peopleDir, `${slug}-quotes.md`), quotesContent)
      generated++
    }

    // 2. Investment Philosophy Page
    const philosophySection = sections.find(s =>
      s.title.toLowerCase().includes('philosophy') ||
      s.title.toLowerCase().includes('approach') ||
      s.title.toLowerCase().includes('strategy')
    )

    if (philosophySection) {
      const philosophyContent = `---
title: ${data.title} - Investment Philosophy
description: The investment philosophy and approach of ${data.title}.
type: people
tags: [${data.tags?.join(', ') || ''}, philosophy, investing]
created: ${data.created || new Date().toISOString().split('T')[0]}
updated: ${new Date().toISOString().split('T')[0]}
source: ${data.source || ''}
---

# ${data.title} - Investment Philosophy

${philosophySection.content}

## Summary

> ${data.description}

---

*Learn more at [[${slug}|${data.title}]]*
`

      fs.writeFileSync(path.join(peopleDir, `${slug}-philosophy.md`), philosophyContent)
      generated++
    }
  }

  console.log(`Generated ${generated} people pages`)
  return generated
}

// ============ COMPANY PAGES ============

function generateCompanyPages() {
  const companiesDir = path.join(contentDir, 'companies')
  const companies = getFiles(companiesDir)
  let generated = 0

  for (const file of companies) {
    const filePath = path.join(companiesDir, file)
    const { data, content } = readFrontmatter(filePath)
    const slug = file.replace('.md', '')
    const sections = extractSections(content)

    // 1. Business Overview Page
    const overviewSection = sections.find(s =>
      s.title.toLowerCase().includes('business') ||
      s.title.toLowerCase().includes('overview') ||
      s.title.toLowerCase().includes('about')
    )

    if (overviewSection) {
      const overviewContent = `---
title: ${data.title} - Business Overview
description: Business overview of ${data.title} and its competitive position.
type: companies
tags: [${data.tags?.join(', ') || ''}, business, overview]
created: ${data.created || new Date().toISOString().split('T')[0]}
updated: ${new Date().toISOString().split('T')[0]}
source: ${data.source || ''}
---

# ${data.title} - Business Overview

${overviewSection.content}

---

*Learn more at [[${slug}|${data.title}]]*
`

      fs.writeFileSync(path.join(companiesDir, `${slug}-overview.md`), overviewContent)
      generated++
    }

    // 2. Investment Thesis Page
    const investmentSection = sections.find(s =>
      s.title.toLowerCase().includes('investment') ||
      s.title.toLowerCase().includes('buffett') ||
      s.title.toLowerCase().includes('why')
    )

    if (investmentSection) {
      const investmentContent = `---
title: ${data.title} - Investment Thesis
description: Why Warren Buffett and Berkshire Hathaway invested in ${data.title}.
type: companies
tags: [${data.tags?.join(', ') || ''}, investment, buffett, thesis]
created: ${data.created || new Date().toISOString().split('T')[0]}
updated: ${new Date().toISOString().split('T')[0]}
source: ${data.source || ''}
---

# ${data.title} - Investment Thesis

${investmentSection.content}

---

*Learn more at [[${slug}|${data.title}]]*
`

      fs.writeFileSync(path.join(companiesDir, `${slug}-thesis.md`), investmentContent)
      generated++
    }
  }

  console.log(`Generated ${generated} company pages`)
  return generated
}

// ============ LETTERS PAGES ============

function generateLetterPages() {
  const lettersDir = path.join(contentDir, 'letters')
  const letters = getFiles(lettersDir)
  let generated = 0

  for (const file of letters) {
    if (file.includes('-summary') || file.includes('-quotes')) continue

    const filePath = path.join(lettersDir, file)
    const { data, content } = readFrontmatter(filePath)
    const slug = file.replace('.md', '')
    const year = slug.replace('letter-', '')

    // Extract year from title if available
    const titleYear = data.title?.match(/\d{4}/)?.[0] || year

    // 1. Letter Summary
    const sections = extractSections(content)
    const overviewSection = sections[0]

    const summaryContent = `---
title: ${data.title} - Summary
description: Key highlights from Buffett's ${titleYear} letter to shareholders.
type: letters
tags: [${data.tags?.join(', ') || ''}, summary, ${titleYear}]
created: ${data.created || new Date().toISOString().split('T')[0]}
updated: ${new Date().toISOString().split('T')[0]}
source: ${data.source || ''}
---

# ${data.title} - Summary

${overviewSection?.content || data.description}

## Topics Covered

${sections.slice(1, 6).map(s => `- ${s.title}`).join('\n')}

---

*Source: [[${slug}|Full Letter]]*
`

    fs.writeFileSync(path.join(lettersDir, `${slug}-summary.md`), summaryContent)
    generated++

    // 2. Key Quotes
    const quotes = extractQuotes(content)
    if (quotes.length > 0) {
      const quotesContent = `---
title: ${data.title} - Key Quotes
description: Memorable quotes from Buffett's ${titleYear} letter.
type: letters
tags: [${data.tags?.join(', ') || ''}, quotes, ${titleYear}]
created: ${data.created || new Date().toISOString().split('T')[0]}
updated: ${new Date().toISOString().split('T')[0]}
source: ${data.source || ''}
---

# Key Quotes from ${data.title}

${quotes.slice(0, 8).map((q, i) => `${i + 1}. > "${q}"`).join('\n\n')}

---

*Source: [[${slug}|Full Letter]]*
`

      fs.writeFileSync(path.join(lettersDir, `${slug}-quotes.md`), quotesContent)
      generated++
    }
  }

  console.log(`Generated ${generated} letter pages`)
  return generated
}

// ============ MAIN ============

function main() {
  console.log('🚀 Generating long-tail SEO pages...\n')

  const meetingPages = generateMeetingPages()
  const conceptPages = generateConceptPages()
  const peoplePages = generatePeoplePages()
  const companyPages = generateCompanyPages()
  const letterPages = generateLetterPages()

  const total = meetingPages + conceptPages + peoplePages + companyPages + letterPages

  console.log(`\n✅ Total: ${total} new pages generated!`)
  console.log(`
Breakdown:
- Meeting pages: ${meetingPages}
- Concept pages: ${conceptPages}
- People pages: ${peoplePages}
- Company pages: ${companyPages}
- Letter pages: ${letterPages}

Next steps:
1. Run 'npm run build' to regenerate static pages
2. Submit sitemap to Google Search Console
3. Monitor indexing in Search Console
`)
}

main()
