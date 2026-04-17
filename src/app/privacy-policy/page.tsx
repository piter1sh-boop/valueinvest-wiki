export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#1a1a2e' }}>
        Privacy Policy
      </h1>
      <div className="prose prose-slate max-w-none">
        <p className="text-gray-600 mb-6">Last updated: April 17, 2026</p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          ValueInvest.Wiki does not collect personal information. This is a static
          educational website providing investment knowledge resources.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Third-Party Services</h2>
        <p className="text-gray-700 mb-4">
          We use Google Analytics to understand website traffic patterns and
          Google AdSense to support website operations. These services may
          collect anonymized usage data according to their respective privacy policies.
        </p>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
          <li>
            <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>
          </li>
          <li>
            <a href="https://policies.google.com/technologies/partner-sites" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              How Google uses information from sites using Google services
            </a>
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">Cookies</h2>
        <p className="text-gray-700 mb-4">
          Our website may use cookies for site analytics and advertising.
          You can control cookie preferences through your browser settings.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">External Links</h2>
        <p className="text-gray-700 mb-4">
          Our website contains links to external resources including annual reports,
          letters, and original sources. We are not responsible for the privacy
          practices of external sites.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Children Under 13</h2>
        <p className="text-gray-700 mb-4">
          Our website is not intended for children under 13 years of age,
          and we do not knowingly collect information from children.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Changes to This Policy</h2>
        <p className="text-gray-700 mb-4">
          We may update this privacy policy periodically. Changes will be
          posted on this page with an updated revision date.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Contact</h2>
        <p className="text-gray-700">
          For privacy-related questions, please contact us via our{' '}
          <a href="/contact" className="text-blue-600 hover:underline">contact page</a>.
        </p>
      </div>
    </div>
  )
}
