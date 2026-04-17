export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#1a1a2e' }}>
        Contact Us
      </h1>
      <div className="prose prose-slate max-w-none">
        <p className="text-gray-700 mb-8 text-lg">
          We welcome questions, feedback, corrections, and content contributions.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Content Corrections</h2>
        <p className="text-gray-700 mb-4">
          Found an error in our investment knowledge base? Please let us know
          with the specific page URL and the correction needed.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Content Contributions</h2>
        <p className="text-gray-700 mb-4">
          We accept contributions of investment wisdom from public sources.
          If you have access to transcripts, letters, or interviews that
          would benefit the value investing community, reach out.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4">Collaboration</h2>
        <p className="text-gray-700 mb-4">
          For academic partnerships, media inquiries, or licensing questions,
          please use the channels below.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <h3 className="font-semibold mb-4">Primary Contact</h3>
          <p className="text-gray-700 mb-2">
            <strong>GitHub Issues</strong> — For content corrections and suggestions:
          </p>
          <a
            href="https://github.com/piter1sh-boop/valueinvest-wiki/issues"
            className="text-blue-600 hover:underline inline-block mb-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open an Issue on GitHub
          </a>

          <p className="text-gray-700 mb-2 mt-4">
            <strong>Email</strong> — For general inquiries:
          </p>
          <a
            href="mailto:contact@valueinvest.wiki"
            className="text-blue-600 hover:underline"
          >
            contact@valueinvest.wiki
          </a>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">Response Time</h2>
        <p className="text-gray-700">
          We review messages periodically. For urgent matters or time-sensitive
          corrections, GitHub Issues are monitored more frequently.
        </p>
      </div>
    </div>
  )
}
