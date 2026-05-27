'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, role, message }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
      setName(''); setCompany(''); setEmail(''); setRole(''); setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please email directly.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/8 p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white font-semibold mb-1">Message sent</p>
        <p className="text-slate-400 text-sm">I&apos;ll be in touch shortly. Thank you for reaching out.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 text-xs text-slate-500 hover:text-slate-300 underline underline-offset-2 transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name *">
          <input
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className={inputCls}
          />
        </Field>
        <Field label="Company">
          <input
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="Company"
            className={inputCls}
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Email *">
          <input
            required
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={inputCls}
          />
        </Field>
        <Field label="Your role">
          <input
            value={role}
            onChange={e => setRole(e.target.value)}
            placeholder="e.g. VP Engineering"
            className={inputCls}
          />
        </Field>
      </div>
      <Field label="Message *">
        <textarea
          required
          rows={4}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Tell me about the opportunity or what you have in mind…"
          className={`${inputCls} resize-none`}
        />
      </Field>

      {status === 'error' && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors shadow-lg shadow-violet-900/30"
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-slate-500 mb-1.5 font-medium">{label}</label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500/50 transition-colors'
