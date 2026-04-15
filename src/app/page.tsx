import Link from 'next/link'
import { getAllPagesMeta } from '@/lib/markdown'

export default function Home() {
  const people = getAllPagesMeta('people')
  const concepts = getAllPagesMeta('concepts')
  const companies = getAllPagesMeta('companies')
  const interviews = getAllPagesMeta('interviews')
  const articles = getAllPagesMeta('articles')
  const letters = getAllPagesMeta('letters')
  const partnershipLetters = getAllPagesMeta('partnership-letters')
  const meetings = getAllPagesMeta('meetings')

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
            <Link href="/interviews" className="nav-link">Interviews</Link>
            <Link href="/articles" className="nav-link">Articles</Link>
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
              href="/people/warren-buffett"
              className="px-6 py-3 rounded-lg font-medium border border-gray-300 transition-colors hover:border-gray-400"
            >
              Study Buffett
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-7 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold" style={{ color: '#c9a227' }}>{people.length}</div>
            <div className="text-gray-600 text-xs mt-1">Masters</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#c9a227' }}>{concepts.length}</div>
            <div className="text-gray-600 text-xs mt-1">Concepts</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#c9a227' }}>{companies.length}</div>
            <div className="text-gray-600 text-xs mt-1">Companies</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#c9a227' }}>{interviews.length}</div>
            <div className="text-gray-600 text-xs mt-1">Interviews</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#c9a227' }}>{articles.length}</div>
            <div className="text-gray-600 text-xs mt-1">Articles</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#c9a227' }}>{letters.length}</div>
            <div className="text-gray-600 text-xs mt-1">Letters</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#c9a227' }}>{meetings.length}</div>
            <div className="text-gray-600 text-xs mt-1">Meetings</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-7 gap-4">
            {/* Masters */}
            <div className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
                <span>👤</span> Masters
              </h2>
              <ul className="space-y-1 text-xs">
                {people.slice(0, 4).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/people/${p.slug}`} className="text-gray-600 hover:text-amber-700">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/people" className="text-xs font-medium mt-3 inline-block" style={{ color: '#c9a227' }}>
                +{people.length} →
              </Link>
            </div>

            {/* Concepts */}
            <div className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
                <span>📚</span> Concepts
              </h2>
              <ul className="space-y-1 text-xs">
                {concepts.slice(0, 4).map((c) => (
                  <li key={c.slug}>
                    <Link href={`/concepts/${c.slug}`} className="text-gray-600 hover:text-amber-700">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/concepts" className="text-xs font-medium mt-3 inline-block" style={{ color: '#c9a227' }}>
                +{concepts.length} →
              </Link>
            </div>

            {/* Companies */}
            <div className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
                <span>🏢</span> Companies
              </h2>
              <ul className="space-y-1 text-xs">
                {companies.slice(0, 4).map((c) => (
                  <li key={c.slug}>
                    <Link href={`/companies/${c.slug}`} className="text-gray-600 hover:text-amber-700">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/companies" className="text-xs font-medium mt-3 inline-block" style={{ color: '#c9a227' }}>
                +{companies.length} →
              </Link>
            </div>

            {/* Interviews */}
            <div className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
                <span>🎙️</span> Interviews
              </h2>
              <ul className="space-y-1 text-xs">
                {interviews.slice(0, 4).map((i) => (
                  <li key={i.slug}>
                    <Link href={`/interviews/${i.slug}`} className="text-gray-600 hover:text-amber-700">
                      {i.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/interviews" className="text-xs font-medium mt-3 inline-block" style={{ color: '#c9a227' }}>
                +{interviews.length} →
              </Link>
            </div>

            {/* Articles */}
            <div className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
                <span>✍️</span> Articles
              </h2>
              <ul className="space-y-1 text-xs">
                {articles.slice(0, 4).map((a) => (
                  <li key={a.slug}>
                    <Link href={`/articles/${a.slug}`} className="text-gray-600 hover:text-amber-700">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/articles" className="text-xs font-medium mt-3 inline-block" style={{ color: '#c9a227' }}>
                +{articles.length} →
              </Link>
            </div>

            {/* Partnership Letters */}
            <div className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
                <span>📨</span> Partnership
              </h2>
              <ul className="space-y-1 text-xs">
                {partnershipLetters.slice(0, 3).map((l) => (
                  <li key={l.slug}>
                    <Link href={`/partnership-letters/${l.slug}`} className="text-gray-600 hover:text-amber-700">
                      {l.title.replace(' Annual Letter to Partners', '').replace(' Letter', '')}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/partnership-letters" className="text-xs font-medium mt-3 inline-block" style={{ color: '#c9a227' }}>
                +{partnershipLetters.length} →
              </Link>
            </div>

            {/* Berkshire Letters */}
            <div className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
                <span>📋</span> Letters
              </h2>
              <ul className="space-y-1 text-xs">
                {letters.slice(0, 3).map((l) => (
                  <li key={l.slug}>
                    <Link href={`/letters/${l.slug}`} className="text-gray-600 hover:text-amber-700">
                      {l.title.replace(' Shareholder Letter', '').replace(' Letter', '')}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/letters" className="text-xs font-medium mt-3 inline-block" style={{ color: '#c9a227' }}>
                +{letters.length} →
              </Link>
            </div>
          </div>

          {/* Meetings */}
          <div className="mt-6 border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
            <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
              <span>🏛️</span> Annual Meetings (1985-2024) — {meetings.length} meetings
            </h2>
            <div className="flex flex-wrap gap-2">
              {meetings.slice(0, 20).map((m) => (
                <Link
                  key={m.slug}
                  href={`/meetings/${m.slug}`}
                  className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-amber-50 hover:text-amber-700"
                >
                  {m.slug.replace('meeting-', '').replace('-kingswell', ' (K)')}
                </Link>
              ))}
              <Link href="/meetings" className="text-xs font-medium px-2 py-1" style={{ color: '#c9a227' }}>
                View all {meetings.length} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Featured Content</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/concepts/moat" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-amber-300 transition-colors">
              <h3 className="font-bold text-lg mb-2">Economic Moat</h3>
              <p className="text-gray-600 text-sm">
                The competitive advantage that protects a business from competitors.
              </p>
            </Link>
            <Link href="/interviews/munger-caltech-2020" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-amber-300 transition-colors">
              <h3 className="font-bold text-lg mb-2">Munger at Caltech (2020)</h3>
              <p className="text-gray-600 text-sm">
                Career lessons and technology investing insights from Charlie Munger.
              </p>
            </Link>
            <Link href="/concepts/margin-of-safety" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-amber-300 transition-colors">
              <h3 className="font-bold text-lg mb-2">Margin of Safety</h3>
              <p className="text-gray-600 text-sm">
                The foundational principle of value investing.
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