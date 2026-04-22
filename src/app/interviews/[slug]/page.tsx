import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPageBySlug, getAllPagesMeta } from '@/lib/markdown'
import fs from 'fs'
import path from 'path'

export async function generateStaticParams() {
  const interviews = getAllPagesMeta('interviews')
  return interviews.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug('interviews', slug)
  if (!page) return {}
  return {
    title: `${page.title} | ValueInvest.Wiki`,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      tags: page.tags,
    },
  }
}

export default async function InterviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPageBySlug('interviews', slug)

  if (!page) {
    notFound()
  }

  // Try to read raw content - map slug to source file
  let rawContent = ''
  const sourceFile = page.source || slug

  // Munger interviews
  const mungerFiles: Record<string, string> = {
    'munger-caltech-2020': 'Caltech_Zoom_Talk_2020.md',
    'munger-michigan-2017': 'A_Conversation_with_Charlie_Munger_and_Michigan_Ross_in_2017.md',
    'munger-acquired': 'Acquired_Interviews.md',
    'munger-djco-2013': 'DJCO_Meeting_Detailed_Notes_2013.md',
    'munger-crypto-ban': 'Why_America_Should_Ban_Crypto.md',
  }

  const rawFilePath = path.join(
    process.cwd(),
    '..',
    'valueinvest-wiki-content',
    'raw',
    'Yestoday-main',
    'Charles_Munger',
    mungerFiles[slug] || `${sourceFile}.md`
  )

  try {
    rawContent = fs.readFileSync(rawFilePath, 'utf-8')
  } catch (e) {
    rawContent = ''
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.description,
    author: { '@type': 'Person', name: 'ValueInvest.Wiki' },
    datePublished: page.created,
    dateModified: page.updated,
    keywords: page.tags.join(', '),
    publisher: {
      '@type': 'Organization',
      name: 'ValueInvest.Wiki',
      url: 'https://valueinvest.wiki',
    },
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold" style={{ color: '#1a1a2e' }}>
            ValueInvest<span style={{ color: '#c9a227' }}>.Wiki</span>
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/people" className="nav-link">Masters</Link>
            <Link href="/concepts" className="nav-link">Concepts</Link>
            <Link href="/companies" className="nav-link">Companies</Link>
            <Link href="/interviews" className="nav-link font-bold" style={{ color: '#c9a227' }}>Interviews</Link>
            <Link href="/ai" className="nav-link">AI Assistant</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/interviews" className="text-sm text-gray-500 hover:text-amber-700 mb-6 inline-block">
          ← Back to Interviews
        </Link>

        <article>
          <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{page.description}</p>

          <div className="flex gap-2 mb-8 flex-wrap">
            {page.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full"
                style={{ background: '#dbeafe', color: '#1e40af' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="wiki-content"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />

          {page.links && page.links.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-bold mb-4">Related Links</h2>
              <div className="flex flex-wrap gap-2">
                {page.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="text-sm px-3 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Original Text Section */}
          {rawContent && (
            <details className="mt-12 border border-gray-300 rounded-lg overflow-hidden">
              <summary className="bg-gray-100 px-6 py-4 cursor-pointer font-medium text-gray-700 hover:bg-gray-200">
                📄 Original Text (Click to expand)
              </summary>
              <div className="bg-white p-6">
                <pre className="whitespace-pre-wrap text-sm text-gray-600 font-mono max-h-96 overflow-y-auto">
                  {rawContent}
                </pre>
              </div>
            </details>
          )}
        </article>
      </main>
    </div>
  )
}
