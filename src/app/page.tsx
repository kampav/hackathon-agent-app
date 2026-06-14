import Link from 'next/link'
import FeatureGate from '@/components/FeatureGate'
import QRShare from '@/components/QRShare'

const featureCards = [
  {
    feature: 'CHAT' as const,
    icon: '🤖',
    title: 'AI Agent Chat',
    desc: 'Chat with a single Claude agent. Fast, focused, single-turn answers.',
    href: '/agents',
    color: 'bg-blue-50 border-blue-100',
  },
  {
    feature: 'MULTI_AGENT' as const,
    icon: '🧠',
    title: 'Multi-Agent',
    desc: 'An orchestrator dispatches sub-agents in parallel for richer responses.',
    href: '/agents?mode=multi',
    color: 'bg-purple-50 border-purple-100',
  },
  {
    feature: 'DASHBOARD' as const,
    icon: '📊',
    title: 'Dashboard',
    desc: 'Live charts and key metrics powered by Recharts + Supabase.',
    href: '/dashboard',
    color: 'bg-green-50 border-green-100',
  },
]

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          ⚡ Hackathon Skeleton — Ready to Adapt
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Agent-Powered<br />
          <span className="text-brand-600">Application</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-lg mx-auto">
          Full-stack skeleton with multi-agent AI, live charts, feature flags, and public QR sharing.
          Replace the topic on hackathon day.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/agents"
            className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Try the Agents →
          </Link>
          <Link
            href="/dashboard"
            className="border border-slate-200 hover:border-brand-300 text-slate-700 px-6 py-3 rounded-xl font-medium transition-colors"
          >
            View Dashboard
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {featureCards.map(card => (
          <FeatureGate key={card.feature} feature={card.feature}>
            <Link
              href={card.href}
              className={`block rounded-2xl border p-6 hover:shadow-md transition-shadow ${card.color}`}
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="font-semibold text-slate-800 mb-2">{card.title}</h3>
              <p className="text-sm text-slate-500">{card.desc}</p>
            </Link>
          </FeatureGate>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <h2 className="font-semibold text-slate-700 mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Claude API', 'Recharts', 'GCP Cloud Run'].map(t => (
            <span key={t} className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>

      <FeatureGate feature="QR_SHARE">
        <QRShare />
      </FeatureGate>
    </div>
  )
}
