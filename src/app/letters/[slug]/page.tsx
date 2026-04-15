import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPageBySlug, getAllPagesMeta } from '@/lib/markdown'
import fs from 'fs'
import path from 'path'

export async function generateStaticParams() {
  const letters = getAllPagesMeta('letters')
  return letters
    .filter((l) => l.slug !== 'index')
    .map((l) => ({ slug: l.slug }))
}

export default async function LetterPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getPageBySlug('letters', slug)

  if (!page) {
    notFound()
  }

  // Try to read raw content
  const rawFilePath = path.join(process.cwd(), '..', 'valueinvest-wiki-content', 'raw', 'Yestoday-main', 'Warren_Buffett', 'Berkshire_Hathaway_Letters', `${slug.replace('letter-', '')}_Letter_to_Berkshire_Shareholders.md`)
  let rawContent = ''
  try {
    rawContent = fs.readFileSync(rawFilePath, 'utf-8')
  } catch (e) {
    // Try alternative path
    try {
      const altPath = path.join(process.cwd(), '..', 'valueinvest-wiki-content', 'raw', 'letters', `${slug.replace('letter-', '')}ltr.pdf`)
      rawContent = '' // PDF files handled differently
    } catch (e2) {
      rawContent = ''
    }
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
            <Link href="/articles" className="nav-link">Articles</Link>
            <Link href="/ai" className="nav-link">AI Assistant</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/letters"
          className="text-sm text-gray-500 hover:text-amber-700 mb-6 inline-block"
        >
          ← Back to Letters
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
