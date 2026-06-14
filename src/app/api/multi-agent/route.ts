import { NextRequest, NextResponse } from 'next/server'
import { runAgent } from '@/lib/anthropic'

// --- Sub-agent definitions ---
// On hackathon day: replace these with domain-specific specialists
const SUB_AGENTS = [
  {
    name: 'Analyst',
    system: 'You are a data analyst. Given a topic or question, provide data-driven insights, patterns, and key statistics. Be concise — 3-5 bullet points.',
  },
  {
    name: 'Advisor',
    system: 'You are a strategic advisor. Given a topic or question, provide actionable recommendations and next steps. Be concise — 3-5 bullet points.',
  },
  {
    name: 'Summariser',
    system: 'You are a communications expert. Given a topic or question, produce a crisp executive summary suitable for leadership. 2-3 sentences max.',
  },
]

// Orchestrator decides which sub-agents to run and with what sub-task
async function orchestrate(userMessage: string): Promise<string[]> {
  const orchestratorPrompt = `You are an orchestrator. The user sent: "${userMessage}".
Decompose this into exactly ${SUB_AGENTS.length} sub-tasks, one per line, each tailored to the agent:
${SUB_AGENTS.map((a, i) => `${i + 1}. ${a.name}`).join('\n')}
Return ONLY the ${SUB_AGENTS.length} sub-task lines, nothing else.`

  const raw = await runAgent('You are an orchestration engine.', orchestratorPrompt)
  const lines = raw.trim().split('\n').filter(Boolean)

  // Fallback: if orchestrator doesn't produce clean lines, use the original message
  return SUB_AGENTS.map((_, i) => lines[i]?.replace(/^\d+\.\s*/, '') ?? userMessage)
}

export async function POST(req: NextRequest) {
  const { message } = await req.json()
  if (!message) return NextResponse.json({ error: 'message required' }, { status: 400 })

  const subTasks = await orchestrate(message)

  const responses = await Promise.all(
    SUB_AGENTS.map((agent, i) => runAgent(agent.system, subTasks[i]).then(content => ({
      agent: agent.name,
      content,
    })))
  )

  return NextResponse.json({ responses })
}
