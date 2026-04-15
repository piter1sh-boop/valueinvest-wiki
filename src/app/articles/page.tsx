import Link from 'next/link'
import { getAllPagesMeta } from '@/lib/markdown'

export default function ArticlesPage() {
  const articles = getAllPagesMeta('articles')

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

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Articles</h1>
        <p className="text-gray-600 mb-8">Original research and analysis on value investing.</p>

        {articles.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl mb-2">No articles yet</p>
            <p className="text-sm">Articles will appear here once published.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-amber-300 transition-all"
              >
                <h2 className="font-bold text-lg mb-2">{article.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.description}</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ background: '#fef3c7', color: '#92400e' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
