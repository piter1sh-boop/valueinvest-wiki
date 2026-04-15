import { NextRequest, NextResponse } from 'next/server'

// Call the buffett-api for AI responses

const BUFFETT_API_URL = process.env.BUFFETT_API_URL || 'https://cn.valueinvest.wiki'

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json()

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }

    // Call buffett-api
    const response = await fetch(`${BUFFETT_API_URL}/api/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, user_id: 'web-frontend' }),
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json({ answer: data.answer || 'I apologize, I could not process that question.' })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { answer: 'I apologize, the AI service is temporarily unavailable. Please try again later.' },
      { status: 500 }
    )
  }
}