import { NextRequest, NextResponse } from 'next/server'

// Call the buffett-api for AI responses
// In production, this would call the actual buffett-api endpoint
// For now, return a placeholder response

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json()

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }

    // In production, call buffett-api:
    // const response = await fetch('https://your-buffett-api.com/api/ask', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ question }),
    // })

    // For demo, return a simple response
    const answer = `Thank you for your question about "${question}".

Based on our knowledge base, this relates to core value investing principles. The answer would draw from Buffett, Munger, and other investment masters' teachings.

For detailed information, please browse our wiki pages on:
- Investment Masters (Warren Buffett, Charlie Munger)
- Core Concepts (Moat, Margin of Safety, Circle of Competence)
- Company Profiles

The AI assistant will be fully connected to the buffett-api in production.`

    return NextResponse.json({ answer })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}