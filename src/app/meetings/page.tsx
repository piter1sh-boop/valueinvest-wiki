import Link from 'next/link'
import { getAllPagesMeta } from '@/lib/markdown'

export default async function MeetingsPage() {
  const meetings = getAllPagesMeta('meetings')

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
          <h1 className="text-4xl font-bold mb-4">Berkshire Hathaway Annual Meetings (1985-2024)</h1>
          <p className="text-xl text-gray-600">
            Warren Buffett and Charlie Munger's annual shareholder meetings in Omaha,
            featuring decades of investment wisdom, business analysis, and Q&A sessions.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 mb-8">
          <h2 className="font-bold text-lg mb-2">The "Woodstock of Capitalism"</h2>
          <p className="text-gray-700">
            Berkshire's Annual Meeting has been called the "Woodstock of Capitalism."
            Tens of thousands of shareholders gather annually in Omaha to hear Buffett and Munger
            share their thoughts on business, investing, and life.
          </p>
        </div>

        <div className="grid gap-4">
          {meetings
            .filter((m) => m.slug !== 'index')
            .sort((a, b) => b.slug.localeCompare(a.slug))
            .map((meeting) => (
              <Link
                key={meeting.slug}
                href={`/meetings/${meeting.slug}`}
                className="block p-5 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  {meeting.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{meeting.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {meeting.tags.slice(0, 3).map((tag) => (
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
          <h2 className="text-xl font-bold mb-4">About Berkshire Annual Meetings</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-amber-50 rounded-lg">
              <h3 className="font-bold text-amber-900 mb-2">Investment Wisdom</h3>
              <p className="text-sm text-amber-800">
                Decades of insights on value investing, intrinsic value, moats, and long-term thinking.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-900 mb-2">Business Analysis</h3>
              <p className="text-sm text-green-800">
                Deep dives into Berkshire's operating businesses, insurance operations, and capital allocation.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2">Q&A Sessions</h3>
              <p className="text-sm text-blue-800">
                Shareholders ask anything — from specific stocks to life philosophy.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-bold text-purple-900 mb-2">Munger Partnership</h3>
              <p className="text-sm text-purple-800">
                Charlie Munger co-hosted meetings from 1978 until his passing in 2023.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
