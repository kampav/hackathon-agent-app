import Anthropic from '@anthropic-ai/sdk'

export const MODEL = 'claude-sonnet-4-6'

// Create client lazily so process.env is read at request time, not module load
function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
}

export async function runAgent(systemPrompt: string, userMessage: string): Promise<string> {
  const response = await getClient().messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  })
  const block = response.content[0]
  return block.type === 'text' ? block.text : ''
}
