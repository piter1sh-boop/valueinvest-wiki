import Link from 'next/link'
import { getAllPagesMeta } from '@/lib/markdown'

export default async function LettersPage() {
  const letters = getAllPagesMeta('letters')

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
          <h1 className="text-4xl font-bold mb-4">Berkshire Hathaway Shareholder Letters</h1>
          <p className="text-xl text-gray-600">
            Warren Buffett's annual letters to shareholders from 1970 to present,
            documenting Berkshire's evolution and investment philosophy.
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 mb-8">
          <h2 className="font-bold text-lg mb-2">The Buffett Letters</h2>
          <p className="text-gray-700">
            Since 1971, Buffett has written annual letters to Berkshire shareholders.
            These letters are considered the most important investment writing of the 20th century.
          </p>
        </div>

        <div className="grid gap-4">
          {letters
            .filter((l) => l.slug !== 'index')
            .sort((a, b) => {
              // Sort by year descending
              const yearA = parseInt(a.slug.replace(/\D/g, '')) || 0
              const yearB = parseInt(b.slug.replace(/\D/g, '')) || 0
              return yearB - yearA
            })
            .map((letter) => (
              <Link
                key={letter.slug}
                href={`/letters/${letter.slug}`}
                className="block p-5 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-amber-300 transition-all"
              >
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  {letter.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{letter.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {letter.tags.slice(0, 3).map((tag) => (
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
          <h2 className="text-xl font-bold mb-4">About These Letters</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-amber-50 rounded-lg">
              <h3 className="font-bold text-amber-900 mb-2">Investment Philosophy</h3>
              <p className="text-sm text-amber-800">
                Buffett explains intrinsic value, margin of safety, and the importance of long-term thinking.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-900 mb-2">Business Analysis</h3>
              <p className="text-sm text-green-800">
                Deep dives into Berkshire's insurance operations, acquisitions, and capital allocation.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2">Historical Record</h3>
              <p className="text-sm text-blue-800">
                50+ years of documented investment thinking and business judgment.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-bold text-purple-900 mb-2">Must-Read</h3>
              <p className="text-sm text-purple-800">
                The 2008 and 2020 letters are especially relevant for crisis investing.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
