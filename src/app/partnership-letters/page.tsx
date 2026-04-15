import Link from 'next/link'
import { getAllPagesMeta } from '@/lib/markdown'

export default async function PartnershipLettersPage() {
  const letters = getAllPagesMeta('partnership-letters')

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
            <Link href="/articles" className="nav-link">Articles</Link>
            <Link href="/ai" className="nav-link">AI Assistant</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Buffett Partnership Letters (1957-1970)</h1>
          <p className="text-xl text-gray-600">
            Before Berkshire Hathaway, Warren Buffett ran a successful investment partnership from 1956 to 1969.
            These letters document his early investment philosophy, which laid the foundation for his later success.
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 mb-8">
          <h2 className="font-bold text-lg mb-2">The Partnership Years</h2>
          <p className="text-gray-700">
            Buffett formed his first partnership in 1956 with seven family members and friends.
            By 1969, the partnership had grown to $100M+ and was returning 29.5% annually — far ahead of the Dow.
          </p>
        </div>

        <div className="grid gap-6">
          {letters
            .filter((l) => l.slug !== 'index')
            .map((letter) => (
              <Link
                key={letter.slug}
                href={`/partnership-letters/${letter.slug}`}
                className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-amber-300 transition-all"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900">{letter.title}</h3>
                <p className="text-gray-600 mb-4">{letter.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {letter.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4">The Three Categories</h2>
          <p className="text-gray-600 mb-4">
            Buffett classified all investments into three categories, a framework he explained in detail in his 1962 letter.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2">General Issues</h3>
              <p className="text-sm text-blue-800">
                Undervalued securities expected to converge to intrinsic value over time.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-900 mb-2">Work-outs</h3>
              <p className="text-sm text-green-800">
                Investments dependent on corporate actions: mergers, liquidations, tenders, reorganizations.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-bold text-purple-900 mb-2">Controls</h3>
              <p className="text-sm text-purple-800">
                Businesses where the partnership acquired controlling interest.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
