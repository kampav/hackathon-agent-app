'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { features } from '@/config/features'

const links = [
  { href: '/', label: 'Home' },
  ...(features.DASHBOARD  ? [{ href: '/dashboard', label: 'Dashboard' }] : []),
  ...(features.CHAT       ? [{ href: '/agents',    label: 'Agents' }]    : []),
]

export default function Nav() {
  const path = usePathname()
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="font-bold text-brand-700 text-lg">⚡ AgentApp</span>
        <div className="flex gap-6">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                path === l.href
                  ? 'text-brand-600 border-b-2 border-brand-600 pb-0.5'
                  : 'text-slate-600 hover:text-brand-600'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
