'use client'
import { useState } from 'react'
import FeatureGate from '@/components/FeatureGate'
import AgentChat from '@/components/AgentChat'

export default function AgentsPage() {
  const [mode, setMode] = useState<'single' | 'multi'>('single')

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Agents</h1>
          <p className="text-slate-500 mt-1">Chat with a single agent or a team of specialists</p>
        </div>

        <FeatureGate feature="MULTI_AGENT">
          <div className="flex gap-2 bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setMode('single')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'single' ? 'bg-white shadow text-brand-700' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Single Agent
            </button>
            <button
              onClick={() => setMode('multi')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'multi' ? 'bg-white shadow text-brand-700' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Multi-Agent
            </button>
          </div>
        </FeatureGate>
      </div>

      {mode === 'single' ? (
        <FeatureGate feature="CHAT" fallback={<p className="text-slate-400 text-center py-16">Chat is disabled.</p>}>
          <AgentChat
            endpoint="/api/agent"
            placeholder="Ask the AI assistant anything…"
            title="🤖 AI Assistant"
          />
        </FeatureGate>
      ) : (
        <FeatureGate feature="MULTI_AGENT" fallback={<p className="text-slate-400 text-center py-16">Multi-agent is disabled.</p>}>
          <AgentChat
            endpoint="/api/multi-agent"
            placeholder="Describe a complex task for the agent team…"
            title="🧠 Multi-Agent Team"
          />
        </FeatureGate>
      )}

      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
        <strong>Multi-agent pattern:</strong> an orchestrator agent breaks your task into sub-tasks and dispatches specialist agents in parallel, then combines their responses.
      </div>
    </div>
  )
}
