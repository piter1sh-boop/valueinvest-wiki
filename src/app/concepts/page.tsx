import Link from 'next/link'
import { getAllPagesMeta } from '@/lib/markdown'

export default function ConceptsPage() {
  const concepts = getAllPagesMeta('concepts')

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold" style={{ color: '#1a1a2e' }}>
            ValueInvest<span style={{ color: '#c9a227' }}>.Wiki</span>
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/people" className="nav-link">Masters</Link>
            <Link href="/concepts" className="nav-link font-bold" style={{ color: '#c9a227' }}>Concepts</Link>
            <Link href="/companies" className="nav-link">Companies</Link>
            <Link href="/ai" className="nav-link">AI Assistant</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Investment Concepts</h1>
        <p className="text-gray-600 mb-8">Master the core principles of value investing.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((concept) => (
            <Link
              key={concept.slug}
              href={`/concepts/${concept.slug}`}
              className="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-amber-300 transition-all"
            >
              <h2 className="font-bold text-lg mb-2">{concept.title}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{concept.description}</p>
              <div className="flex flex-wrap gap-2">
                {concept.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ background: '#dbeafe', color: '#1e40af' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}