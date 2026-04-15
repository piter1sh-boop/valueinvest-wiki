import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ValueInvest.Wiki - Value Investing Knowledge Base",
  description: "Free knowledge base for value investors. Learn from Buffett, Munger, Graham and master concepts like Moat, Margin of Safety, and Circle of Competence.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}