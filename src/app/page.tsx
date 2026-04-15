import Link from 'next/link'
import { getAllPagesMeta } from '@/lib/markdown'

export default function Home() {
  const people = getAllPagesMeta('people')
  const concepts = getAllPagesMeta('concepts')
  const companies = getAllPagesMeta('companies')

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold" style={{ color: '#1a1a2e' }}>
            ValueInvest<span style={{ color: '#c9a227' }}>.Wiki</span>
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/people" className="nav-link">Masters</Link>
            <Link href="/concepts" className="nav-link">Concepts</Link>
            <Link href="/companies" className="nav-link">Companies</Link>
            <Link href="/ai" className="nav-link">AI Assistant</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6" style={{ color: '#1a1a2e' }}>
            The Value Investing Knowledge Base
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Everything you need to know about value investing—from Buffett and Munger to moats and margin of safety.
            Verified, comprehensive, free.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/ai"
              className="px-6 py-3 rounded-lg font-medium text-white transition-colors"
              style={{ background: '#c9a227' }}
            >
              Ask AI Assistant
            </Link>
            <Link
              href="/concepts"
              className="px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors hover:border-gray-400"
            >
              Browse Concepts
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold" style={{ color: '#c9a227' }}>{people.length}</div>
            <div className="text-gray-600 text-sm mt-1">Investment Masters</div>
          </div>
          <div>
            <div className="text-3xl font-bold" style={{ color: '#c9a227' }}>{concepts.length}</div>
            <div className="text-gray-600 text-sm mt-1">Core Concepts</div>
          </div>
          <div>
            <div className="text-3xl font-bold" style={{ color: '#c9a227' }}>{companies.length}</div>
            <div className="text-gray-600 text-sm mt-1">Company Profiles</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Masters */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span style={{ color: '#c9a227' }}>👤</span> Investment Masters
              </h2>
              <ul className="space-y-2 text-sm">
                {people.slice(0, 5).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/people/${p.slug}`} className="text-gray-600 hover:text-amber-700">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/people" className="text-sm font-medium mt-4 inline-block" style={{ color: '#c9a227' }}>
                View all →
              </Link>
            </div>

            {/* Concepts */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span style={{ color: '#c9a227' }}>📚</span> Core Concepts
              </h2>
              <ul className="space-y-2 text-sm">
                {concepts.slice(0, 5).map((c) => (
                  <li key={c.slug}>
                    <Link href={`/concepts/${c.slug}`} className="text-gray-600 hover:text-amber-700">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/concepts" className="text-sm font-medium mt-4 inline-block" style={{ color: '#c9a227' }}>
                View all →
              </Link>
            </div>

            {/* Companies */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span style={{ color: '#c9a227' }}>🏢</span> Company Profiles
              </h2>
              <ul className="space-y-2 text-sm">
                {companies.slice(0, 5).map((c) => (
                  <li key={c.slug}>
                    <Link href={`/companies/${c.slug}`} className="text-gray-600 hover:text-amber-700">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/companies" className="text-sm font-medium mt-4 inline-block" style={{ color: '#c9a227' }}>
                View all →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Featured Concepts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/concepts/moat" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-amber-300 transition-colors">
              <h3 className="font-bold text-lg mb-2">Economic Moat</h3>
              <p className="text-gray-600 text-sm">
                The competitive advantage that protects a business from competitors—Buffett's most important concept.
              </p>
            </Link>
            <Link href="/concepts/margin-of-safety" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-amber-300 transition-colors">
              <h3 className="font-bold text-lg mb-2">Margin of Safety</h3>
              <p className="text-gray-600 text-sm">
                The foundational principle of value investing—buy securities at prices significantly below intrinsic value.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>ValueInvest.Wiki — Free knowledge base for value investors</p>
        <p className="mt-2">Built with Next.js · Content verified from primary sources</p>
      </footer>
    </div>
  )
}