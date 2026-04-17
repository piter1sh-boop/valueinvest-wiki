import Link from 'next/link'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#1a1a2e' }}>
        About ValueInvest.Wiki
      </h1>
      <div className="prose prose-slate max-w-none">
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          ValueInvest.Wiki is an open educational resource dedicated to preserving
          and sharing the wisdom of the world&apos;s greatest investors.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          We believe that timeless investment principles should be freely accessible
          to everyone. Our mission is to organize and present the teachings of
          value investing masters in a clear, searchable wiki format.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Content Sources</h2>
        <p className="text-gray-700 mb-4">
          Our content is sourced from publicly available materials including:
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>Berkshire Hathaway annual shareholder letters (1977-present)</li>
          <li>Charlie Munger speeches and interviews</li>
          <li>Daily Journal shareholder meeting transcripts</li>
          <li>Partnership letters from Warren Buffett&apos;s early career (1957-1970)</li>
          <li>Academic papers and investment classics</li>
          <li>Public interviews with leading value investors</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">What We Cover</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/people" className="p-4 border rounded-lg hover:border-yellow-500 transition-colors">
            <h3 className="font-semibold mb-2">Investment Masters</h3>
            <p className="text-sm text-gray-600">Buffett, Munger, Graham, Lynch, Fisher, Klarman</p>
          </Link>
          <Link href="/concepts" className="p-4 border rounded-lg hover:border-yellow-500 transition-colors">
            <h3 className="font-semibold mb-2">Core Concepts</h3>
            <p className="text-sm text-gray-600">Moat, Margin of Safety, Intrinsic Value, Circle of Competence</p>
          </Link>
          <Link href="/companies" className="p-4 border rounded-lg hover:border-yellow-500 transition-colors">
            <h3 className="font-semibold mb-2">Company Analysis</h3>
            <p className="text-sm text-gray-600">GEICO, Coca-Cola, Apple, See&apos;s Candies</p>
          </Link>
          <Link href="/letters" className="p-4 border rounded-lg hover:border-yellow-500 transition-colors">
            <h3 className="font-semibold mb-2">Letters & Meetings</h3>
            <p className="text-sm text-gray-600">Annual letters, partnership letters, shareholder meetings</p>
          </Link>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">Editorial Principles</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li><strong>Accuracy</strong> — Quotes are verified against original sources</li>
          <li><strong>Clarity</strong> — Complex investment concepts explained simply</li>
          <li><strong>Completeness</strong> — Full context preserved, not cherry-picked</li>
          <li><strong>Attribution</strong> — Every claim sourced and cited</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4">Disclaimer</h2>
        <p className="text-gray-700 mb-4">
          This website is for educational purposes only. Nothing on this site
          constitutes investment advice. Past performance does not guarantee
          future results. Always do your own due diligence before investing.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Open to Contributions</h2>
        <p className="text-gray-700">
          This is an open knowledge project. If you find errors or want to
          contribute content, visit our{' '}
          <a href="https://github.com/piter1sh-boop/valueinvest-wiki" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            GitHub repository
          </a>.
        </p>
      </div>
    </div>
  )
}
