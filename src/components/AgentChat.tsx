'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  agent?: string
}

interface Props {
  endpoint: '/api/agent' | '/api/multi-agent'
  placeholder?: string
  title?: string
}

export default function AgentChat({ endpoint, placeholder = 'Ask something…', title = 'Agent Chat' }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()

      if (Array.isArray(data.responses)) {
        // multi-agent: each sub-agent response
        data.responses.forEach((r: { agent: string; content: string }) => {
          setMessages(prev => [...prev, { role: 'assistant', content: r.content, agent: r.agent }])
        })
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Error reaching agent. Check your API key.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="px-6 py-4 border-b border-slate-100 font-semibold text-slate-700">{title}</div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-slate-400 text-sm text-center pt-8">Send a message to start the conversation</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
              m.role === 'user'
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-800'
            }`}>
              {m.agent && (
                <p className="text-xs font-semibold text-brand-600 mb-1">{m.agent}</p>
              )}
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-2xl px-4 py-3 text-slate-400 text-sm animate-pulse">Thinking…</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-xl px-5 py-2 text-sm font-medium transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  )
}
