'use client'
import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'

interface Props {
  url?: string
}

export default function QRShare({ url }: Props) {
  const [show, setShow] = useState(false)
  const shareUrl = url ?? process.env.NEXT_PUBLIC_APP_URL ?? (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')

  return (
    <>
      <button
        onClick={() => setShow(v => !v)}
        className="fixed bottom-6 right-6 z-50 bg-brand-600 hover:bg-brand-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-2xl"
        title="Share QR Code"
      >
        📱
      </button>

      {show && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-3 border border-slate-200">
          <p className="text-sm font-semibold text-slate-700">Scan to open</p>
          <QRCodeSVG value={shareUrl} size={180} />
          <p className="text-xs text-slate-400 max-w-[180px] text-center break-all">{shareUrl}</p>
          <button onClick={() => setShow(false)} className="text-xs text-slate-400 hover:text-slate-600">Close</button>
        </div>
      )}
    </>
  )
}
