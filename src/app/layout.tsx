import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Hackathon Agent App',
  description: 'Multi-agent AI application skeleton',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <Nav />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}
