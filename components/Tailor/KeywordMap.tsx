'use client'

import { useState } from 'react'
import { KeywordMatch } from '@/types'
import { Card } from '@/components/UI'
import { clsx } from 'clsx'

interface KeywordMapProps {
  keywords: KeywordMatch[]
}

const STATUS_CONFIG = {
  'in-primary': { label: 'In your CV', dot: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  'in-library': { label: 'Recovered from library', dot: 'bg-amber-500', pill: 'bg-amber-50 text-amber-700 border border-amber-200' },
  'missing': { label: 'True gaps', dot: 'bg-red-400', pill: 'bg-red-50 text-red-700 border border-red-200' },
}

type FilterStatus = 'all' | 'in-primary' | 'in-library' | 'missing'

export default function KeywordMap({ keywords }: KeywordMapProps) {
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const counts = {
    'in-primary': keywords.filter(k => k.status === 'in-primary').length,
    'in-library': keywords.filter(k => k.status === 'in-library').length,
    'missing': keywords.filter(k => k.status === 'missing').length,
  }

  const visible = filter === 'all' ? keywords : keywords.filter(k => k.status === filter)

  return (
    <Card className="p-5">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Keyword Map</p>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={clsx(
            'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
            filter === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
          )}
        >
          All {keywords.length}
        </button>
        {(Object.entries(STATUS_CONFIG) as [keyof typeof STATUS_CONFIG, typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG]][]).map(([status, cfg]) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
              filter === status ? cfg.pill + ' font-semibold' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            )}
          >
            <span className={clsx('w-2 h-2 rounded-full', cfg.dot)} />
            {cfg.label} · {counts[status]}
          </button>
        ))}
      </div>

      {/* Keyword chips */}
      <div className="flex flex-wrap gap-2">
        {visible.map(k => {
          const cfg = STATUS_CONFIG[k.status]
          const isOpen = expanded === k.keyword
          const hasDetail = k.originalBullet || k.sourceCV
          return (
            <div key={k.keyword} className="relative">
              <button
                onClick={() => setExpanded(isOpen ? null : k.keyword)}
                className={clsx(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all',
                  cfg.pill,
                  hasDetail && 'cursor-pointer hover:shadow-sm'
                )}
              >
                <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', cfg.dot)} />
                {k.keyword}
              </button>
              {isOpen && hasDetail && (
                <div className="absolute z-10 top-full left-0 mt-1 w-72 bg-white rounded-xl border border-slate-200 shadow-lg p-3 text-xs">
                  {k.sourceCV && (
                    <p className="text-slate-500 mb-1">Source: <span className="font-medium text-slate-700">{k.sourceCV}</span></p>
                  )}
                  {k.originalBullet && (
                    <p className="text-slate-600 italic">"{k.originalBullet}"</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
