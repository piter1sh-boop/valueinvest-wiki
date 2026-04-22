import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPageBySlug, getAllPagesMeta } from '@/lib/markdown'

// Helper to parse wiki-links like [[letter-2008]], [[letter-2009]]
function parseWikiLinks(source: string): { text: string, href: string }[] {
  const regex = /\[\[([^\]]+)\]\]/g
  const links: { text: string, href: string }[] = []
  let match
  while ((match = regex.exec(source)) !== null) {
    const slug = match[1]
    // Determine the section based on the slug
    let section = 'letters'
    if (slug.startsWith('letter-')) {
      section = 'letters'
    } else if (slug.startsWith('person-')) {
      section = 'people'
    } else if (slug.startsWith('company-')) {
      section = 'companies'
    } else if (slug.startsWith('concept-')) {
      section = 'concepts'
    }
    links.push({
      text: slug,
      href: `/${section}/${slug}`
    })
  }
  return links
}

export async function generateStaticParams() {
  const concepts = getAllPagesMeta('concepts')
  return concepts.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug('concepts', slug)
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

export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPageBySlug('concepts', slug)

  if (!page) {
    notFound()
  }

  const sourceLinks = page.source ? parseWikiLinks(page.source) : []

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
            <Link href="/concepts" className="nav-link font-bold" style={{ color: '#c9a227' }}>Concepts</Link>
            <Link href="/companies" className="nav-link">Companies</Link>
            <Link href="/interviews" className="nav-link">Interviews</Link>
            <Link href="/articles" className="nav-link">Articles</Link>
            <Link href="/ai" className="nav-link">AI Assistant</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/concepts" className="text-sm text-gray-500 hover:text-amber-700 mb-6 inline-block">
          ← Back to Concepts
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

          {sourceLinks.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-sm font-medium text-gray-700">Referenced in: </span>
              <div className="flex gap-2 flex-wrap mt-2">
                {sourceLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="text-sm px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          )}

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
        </article>
      </main>
    </div>
  )
}
