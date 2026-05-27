'use client'

import { Gap, ExcavatedSkill } from '@/types'
import { Card, Badge, SectionHeader, EmptyState } from '@/components/UI'
import { AlertTriangle, CheckCircle2, Pickaxe, TrendingDown } from 'lucide-react'
import { clsx } from 'clsx'

interface GapAnalysisProps {
  trueGaps: Gap[]
  excavated: ExcavatedSkill[]
}

const SEVERITY_CONFIG = {
  critical: { label: 'Critical', classes: 'bg-red-50 border-red-200', badge: 'error' as const },
  medium: { label: 'Medium', classes: 'bg-amber-50 border-amber-200', badge: 'warning' as const },
  minor: { label: 'Minor', classes: 'bg-slate-50 border-slate-200', badge: 'default' as const },
}

export default function GapAnalysis({ trueGaps, excavated }: GapAnalysisProps) {
  const criticalCount = trueGaps.filter(g => g.severity === 'critical').length
  const mediumCount = trueGaps.filter(g => g.severity === 'medium').length
  const minorCount = trueGaps.filter(g => g.severity === 'minor').length

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gap Analysis"
        subtitle="Recovered skills came from your library. True gaps are genuinely missing — these need your attention."
      />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
          <p className="text-xs text-slate-500 mt-0.5">Critical gaps</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{mediumCount}</p>
          <p className="text-xs text-slate-500 mt-0.5">Medium gaps</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{excavated.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Recovered</p>
        </Card>
      </div>

      {/* True gaps */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-4 h-4 text-red-500" />
          <p className="text-sm font-semibold text-slate-900">True Gaps</p>
          <span className="ml-auto text-xs text-slate-400">{trueGaps.length} skills absent from all CVs</span>
        </div>

        {trueGaps.length === 0 ? (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <p className="text-sm text-emerald-700">No true gaps — all JD keywords found in your CVs!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {['critical', 'medium', 'minor'].map(sev =>
              trueGaps.filter(g => g.severity === sev).map(gap => {
                const cfg = SEVERITY_CONFIG[gap.severity]
                return (
                  <div key={gap.skill} className={clsx('p-3 rounded-xl border', cfg.classes)}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-slate-900">{gap.skill}</p>
                          <Badge variant={cfg.badge}>{cfg.label}</Badge>
                        </div>
                        <p className="text-xs text-slate-600">{gap.jdContext}</p>
                      </div>
                      <AlertTriangle className={clsx(
                        'w-4 h-4 flex-shrink-0 mt-0.5',
                        gap.severity === 'critical' ? 'text-red-500' : gap.severity === 'medium' ? 'text-amber-500' : 'text-slate-400'
                      )} />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </Card>

      {/* Recovered */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Pickaxe className="w-4 h-4 text-blue-500" />
          <p className="text-sm font-semibold text-slate-900">Recovered from Library</p>
          <span className="ml-auto text-xs text-slate-400">{excavated.length} skills</span>
        </div>

        {excavated.length === 0 ? (
          <EmptyState
            icon={<Pickaxe className="w-5 h-5" />}
            title="Nothing excavated"
            subtitle="Add more CVs to your library to surface hidden experience."
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {excavated.map(skill => (
              <div key={skill.keyword} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-xs">
                <CheckCircle2 className="w-3 h-3 text-blue-600" />
                <span className="font-medium text-blue-700">{skill.keyword}</span>
                <span className="text-blue-400">· {skill.sourceCV}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
