'use client'

import { useState } from 'react'
import { Link, FileText } from 'lucide-react'
import { Card, Button } from '@/components/UI'
import { CareerLevel } from '@/types'
import { clsx } from 'clsx'

interface JDInputProps {
  jdText: string
  jdUrl: string
  careerLevel: CareerLevel
  onJDTextChange: (text: string) => void
  onJDUrlChange: (url: string) => void
  onCareerLevelChange: (level: CareerLevel) => void
}

const LEVELS: { key: CareerLevel; label: string; sub: string; years: string }[] = [
  { key: 'entry', label: 'Entry', sub: 'Graduate / Junior', years: '0–3 years' },
  { key: 'mid', label: 'Mid', sub: 'Specialist / IC', years: '3–8 years' },
  { key: 'director', label: 'Director / VP', sub: 'Head of Function', years: '8–15 years' },
  { key: 'cxo', label: 'CXO / MD', sub: 'C-Suite / Partner', years: '15+ years' },
]

export default function JDInput({
  jdText, jdUrl, careerLevel,
  onJDTextChange, onJDUrlChange, onCareerLevelChange
}: JDInputProps) {
  const [tab, setTab] = useState<'paste' | 'url'>('paste')

  return (
    <div className="space-y-5">
      {/* Career level selector */}
      <Card className="p-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Career level</p>
        <div className="grid grid-cols-4 gap-2">
          {LEVELS.map(l => (
            <button
              key={l.key}
              onClick={() => onCareerLevelChange(l.key)}
              className={clsx(
                'flex flex-col items-center text-center p-3 rounded-xl border-2 transition-all duration-150',
                careerLevel === l.key
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              )}
            >
              <span className="font-semibold text-sm">{l.label}</span>
              <span className={clsx('text-xs mt-0.5', careerLevel === l.key ? 'text-slate-300' : 'text-slate-400')}>
                {l.years}
              </span>
              <span className={clsx('text-xs', careerLevel === l.key ? 'text-slate-300' : 'text-slate-500')}>
                {l.sub}
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* JD input */}
      <Card className="p-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Job description</p>
        <div className="flex border border-slate-200 rounded-xl overflow-hidden mb-3">
          {(['paste', 'url'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={clsx(
                'flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium transition-colors',
                tab === t ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700'
              )}
            >
              {t === 'paste' ? <FileText className="w-3.5 h-3.5" /> : <Link className="w-3.5 h-3.5" />}
              {t === 'paste' ? 'Paste JD' : 'Job URL'}
            </button>
          ))}
        </div>

        {tab === 'paste' ? (
          <textarea
            value={jdText}
            onChange={e => onJDTextChange(e.target.value)}
            placeholder="Paste the full job description here…"
            rows={10}
            className="w-full text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        ) : (
          <div>
            <input
              type="url"
              value={jdUrl}
              onChange={e => onJDUrlChange(e.target.value)}
              placeholder="https://linkedin.com/jobs/view/…"
              className="w-full text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
            <p className="mt-2 text-xs text-slate-400">Paste the URL and also paste the JD text above — URL is saved for reference.</p>
          </div>
        )}

        {jdText && (
          <p className="mt-2 text-xs text-slate-400">{jdText.length.toLocaleString()} characters · ~{Math.round(jdText.split(' ').length / 200)} min read</p>
        )}
      </Card>
    </div>
  )
}
