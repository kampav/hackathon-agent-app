import { NextRequest, NextResponse } from 'next/server'
import { runAgent } from '@/lib/anthropic'

const SYSTEM_PROMPT = `You are a helpful AI assistant for a hackathon demo application.
Answer questions clearly and concisely. Be enthusiastic and helpful.`

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    if (!message) return NextResponse.json({ error: 'message required' }, { status: 400 })

    const response = await runAgent(SYSTEM_PROMPT, message)
    return NextResponse.json({ response })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Agent error' }, { status: 500 })
  }
}
