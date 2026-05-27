'use client'

import { JobApplication } from '@/types'
import { Card, Badge, SectionHeader, EmptyState } from '@/components/UI'
import { Briefcase, Building2, Calendar, TrendingUp, Clock } from 'lucide-react'
import { clsx } from 'clsx'

interface ApplicationTrackerProps {
  applications: JobApplication[]
  onSelect: (app: JobApplication) => void
  onStatusChange: (id: string, status: JobApplication['status']) => void
}

const STATUS_CONFIG: Record<JobApplication['status'], { label: string; classes: string }> = {
  drafting: { label: 'Drafting', classes: 'bg-slate-100 text-slate-600' },
  applied: { label: 'Applied', classes: 'bg-blue-50 text-blue-700' },
  interview: { label: 'Interview', classes: 'bg-amber-50 text-amber-700' },
  offer: { label: 'Offer', classes: 'bg-emerald-50 text-emerald-700' },
  rejected: { label: 'Rejected', classes: 'bg-red-50 text-red-600' },
}

const STATUS_ORDER: JobApplication['status'][] = ['drafting', 'applied', 'interview', 'offer', 'rejected']

function StatusPipeline({ current, onchange }: { current: JobApplication['status']; onchange: (s: JobApplication['status']) => void }) {
  return (
    <div className="flex items-center gap-1">
      {STATUS_ORDER.map((s, i) => (
        <div key={s} className="flex items-center">
          <button
            onClick={() => onchange(s)}
            className={clsx(
              'px-2 py-0.5 rounded text-xs font-medium transition-all',
              current === s ? STATUS_CONFIG[s].classes + ' ring-2 ring-offset-1 ring-current' : 'text-slate-300 hover:text-slate-500'
            )}
          >
            {STATUS_CONFIG[s].label}
          </button>
          {i < STATUS_ORDER.length - 1 && (
            <div className="w-4 h-px bg-slate-200 mx-0.5" />
          )}
        </div>
      ))}
    </div>
  )
}

export default function ApplicationTracker({ applications, onSelect, onStatusChange }: ApplicationTrackerProps) {
  const byStatus = STATUS_ORDER.reduce((acc, s) => {
    acc[s] = applications.filter(a => a.status === s).length
    return acc
  }, {} as Record<JobApplication['status'], number>)

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Applications"
        subtitle="Track every application from draft to offer."
      />

      {/* Pipeline summary */}
      {applications.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {STATUS_ORDER.map(s => (
            <Card key={s} className={clsx('p-3 text-center', byStatus[s] > 0 ? '' : 'opacity-40')}>
              <p className={clsx('text-xl font-bold', byStatus[s] > 0 ? 'text-slate-900' : 'text-slate-300')}>
                {byStatus[s]}
              </p>
              <p className="text-xs text-slate-500">{STATUS_CONFIG[s].label}</p>
            </Card>
          ))}
        </div>
      )}

      {applications.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="w-6 h-6" />}
          title="No applications yet"
          subtitle="Tailor a CV to create your first application record."
        />
      ) : (
        <div className="space-y-3">
          {applications.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).map(app => (
            <div key={app.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(app)}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{app.jobTitle}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500">{app.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 flex-shrink-0">
                      <Calendar className="w-3 h-3" />
                      {new Date(app.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                      ATS {app.result.atsScore}
                    </span>
                    <span>{app.trueGaps.length} gaps</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      {app.careerLevel}
                    </span>
                  </div>

                  <div className="mt-3" onClick={e => e.stopPropagation()}>
                    <StatusPipeline
                      current={app.status}
                      onchange={s => onStatusChange(app.id, s)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
