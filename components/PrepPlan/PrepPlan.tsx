'use client'

import { useState } from 'react'
import { PrepPlanItem, Gap } from '@/types'
import { Card, Button, Badge, SectionHeader, EmptyState, Spinner } from '@/components/UI'
import { BookOpen, ExternalLink, Clock, Layers, FileText, HelpCircle, BookMarked } from 'lucide-react'
import { clsx } from 'clsx'

interface PrepPlanProps {
  gaps: Gap[]
  prepPlan: PrepPlanItem[]
  jobTitle: string
  careerLevel: string
  onGenerate: () => void
  loading: boolean
}

const TYPE_CONFIG = {
  article: { icon: FileText, label: 'Article', classes: 'text-blue-600 bg-blue-50' },
  course: { icon: Layers, label: 'Course', classes: 'text-purple-600 bg-purple-50' },
  'concept-note': { icon: BookMarked, label: 'Concept', classes: 'text-slate-600 bg-slate-50' },
  'practice-questions': { icon: HelpCircle, label: 'Questions', classes: 'text-amber-600 bg-amber-50' },
}

const SEVERITY_COLORS = {
  critical: 'error',
  medium: 'warning',
  minor: 'default',
} as const

function WeekSchedule({ items }: { items: PrepPlanItem[] }) {
  const totalDays = items.reduce((sum, i) => sum + i.daysRequired, 0)
  const days = Array.from({ length: Math.min(totalDays, 14) }, (_, i) => i + 1)

  let dayCounter = 0
  const daySkill: Record<number, string> = {}
  for (const item of items) {
    for (let d = 0; d < item.daysRequired; d++) {
      daySkill[++dayCounter] = item.skill
    }
  }

  return (
    <Card className="p-5">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
        {totalDays}-Day Schedule
      </p>
      <div className="grid grid-cols-7 gap-1.5">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
          <div key={d} className="text-center text-xs font-medium text-slate-400 py-1">{d}</div>
        ))}
        {days.map(day => (
          <div key={day} className={clsx(
            'aspect-square rounded-lg flex flex-col items-center justify-center text-xs p-1',
            'bg-slate-900 text-white'
          )}>
            <span className="font-bold">{day}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
            <div className="w-3 h-3 rounded bg-slate-900 flex-shrink-0" />
            Day {items.slice(0, i).reduce((s, x) => s + x.daysRequired, 1)}–
            {items.slice(0, i + 1).reduce((s, x) => s + x.daysRequired, 0)}: {item.skill}
          </div>
        ))}
      </div>
    </Card>
  )
}

export default function PrepPlan({ gaps, prepPlan, jobTitle, careerLevel, onGenerate, loading }: PrepPlanProps) {
  const [openSkill, setOpenSkill] = useState<string | null>(null)

  if (gaps.length === 0 && prepPlan.length === 0) {
    return (
      <div className="space-y-6">
        <SectionHeader title="Prep Plan" subtitle="Personalised study plan for your true gaps." />
        <EmptyState
          icon={<BookOpen className="w-6 h-6" />}
          title="No gaps to prep for"
          subtitle="Complete the Tailor tab first to identify your true gaps."
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Prep Plan"
        subtitle={`Personalised study plan for ${jobTitle}. ${prepPlan.length === 0 ? 'Generate your plan below.' : `${prepPlan.reduce((s, i) => s + i.daysRequired, 0)} days total.`}`}
      />

      {prepPlan.length === 0 ? (
        <Card className="p-8 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
            <BookOpen className="w-6 h-6 text-slate-500" />
          </div>
          <p className="text-sm font-medium text-slate-800 mb-1">Ready to build your prep plan</p>
          <p className="text-xs text-slate-500 mb-4">{gaps.length} gap{gaps.length !== 1 ? 's' : ''} to cover · tailored for {careerLevel} level</p>
          <Button onClick={onGenerate} loading={loading}>
            Generate prep plan
          </Button>
        </Card>
      ) : (
        <>
          <WeekSchedule items={prepPlan} />

          <div className="space-y-3">
            {prepPlan.map((item, i) => {
              const gap = gaps.find(g => g.skill === item.skill)
              const isOpen = openSkill === item.skill
              return (
                <Card key={i} className={clsx('overflow-hidden transition-all', isOpen && 'ring-2 ring-slate-900 ring-offset-1')}>
                  <button
                    onClick={() => setOpenSkill(isOpen ? null : item.skill)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-slate-600">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{item.skill}</p>
                      <p className="text-xs text-slate-400">{item.daysRequired} day{item.daysRequired !== 1 ? 's' : ''} · {item.resources.length} resources</p>
                    </div>
                    {gap && <Badge variant={SEVERITY_COLORS[gap.severity]}>{gap.severity}</Badge>}
                    <div className="flex items-center gap-1 text-slate-300">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs">{item.daysRequired}d</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 p-4 space-y-2">
                      {gap && (
                        <p className="text-xs text-slate-500 mb-3 p-2 rounded-lg bg-slate-50">{gap.jdContext}</p>
                      )}
                      {item.resources.map((res, j) => {
                        const cfg = TYPE_CONFIG[res.type]
                        const Icon = cfg.icon
                        return (
                          <a
                            key={j}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group"
                          >
                            <div className={clsx('w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0', cfg.classes)}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900">{res.title}</p>
                              <p className="text-xs text-slate-400">{cfg.label}</p>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 flex-shrink-0" />
                          </a>
                        )
                      })}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
