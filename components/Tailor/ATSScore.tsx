'use client'

import { TailoredResult } from '@/types'
import { Card } from '@/components/UI'
import { clsx } from 'clsx'

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="10" />
      <circle
        cx="50" cy="50" r={radius} fill="none"
        stroke={color} strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000"
      />
      <text
        x="50" y="50"
        textAnchor="middle" dominantBaseline="middle"
        className="rotate-90" style={{ transformOrigin: '50px 50px' }}
        fill={color} fontSize="20" fontWeight="700"
      >
        {score}
      </text>
    </svg>
  )
}

function BreakdownBar({ label, value }: { label: string; value: number }) {
  const color = value >= 75 ? 'bg-emerald-500' : value >= 50 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-600">{label}</span>
        <span className="text-xs font-medium text-slate-900">{value}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={clsx('h-full rounded-full transition-all duration-700', color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default function ATSScore({ result }: { result: TailoredResult }) {
  const lift = result.atsScore - result.atsScoreBeforeExcavation

  return (
    <Card className="p-5">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">ATS Compatibility</p>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <ScoreRing score={result.atsScore} />
          {lift > 0 && (
            <span className="text-xs text-emerald-600 font-medium">+{lift} from excavation</span>
          )}
        </div>
        <div className="flex-1 space-y-3">
          <BreakdownBar label="Keyword match" value={result.keywordBreakdown.keywords} />
          <BreakdownBar label="Skills match" value={result.keywordBreakdown.skillsMatch} />
          <BreakdownBar label="Experience relevance" value={result.keywordBreakdown.experience} />
          <BreakdownBar label="Format & structure" value={result.keywordBreakdown.format} />
        </div>
      </div>
    </Card>
  )
}
