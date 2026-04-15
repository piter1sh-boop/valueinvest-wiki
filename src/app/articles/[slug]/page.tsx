import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPageBySlug, getAllPagesMeta } from '@/lib/markdown'

export async function generateStaticParams() {
  const articles = getAllPagesMeta('articles')
  return articles.map((a) => ({ slug: a.slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPageBySlug('articles', slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold" style={{ color: '#1a1a2e' }}>
            ValueInvest<span style={{ color: '#c9a227' }}>.Wiki</span>
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/people" className="nav-link">Masters</Link>
            <Link href="/concepts" className="nav-link">Concepts</Link>
            <Link href="/companies" className="nav-link">Companies</Link>
            <Link href="/interviews" className="nav-link">Interviews</Link>
            <Link href="/articles" className="nav-link font-bold" style={{ color: '#c9a227' }}>Articles</Link>
            <Link href="/ai" className="nav-link">AI Assistant</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/articles" className="text-sm text-gray-500 hover:text-amber-700 mb-6 inline-block">
          ← Back to Articles
        </Link>

        <article>
          <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{page.description}</p>

          <div className="flex gap-2 mb-8 flex-wrap">
            {page.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full"
                style={{ background: '#fef3c7', color: '#92400e' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="wiki-content"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>
      </main>
    </div>
  )
}
