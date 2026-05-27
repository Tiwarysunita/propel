'use client'

import { LateralBridge } from '@/types'
import { Card, Button } from '@/components/UI'
import { AlertTriangle, CheckCircle2, GitMerge } from 'lucide-react'
import { clsx } from 'clsx'

interface LateralBridgePanelProps {
  bridges: LateralBridge[]
  onApprove: (index: number) => void
  onReject: (index: number) => void
}

export default function LateralBridgePanel({ bridges, onApprove, onReject }: LateralBridgePanelProps) {
  if (bridges.length === 0) return null

  const pendingCount = bridges.filter(b => !b.userApproved).length

  return (
    <Card className="p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
          <GitMerge className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Lateral bridges require your approval</p>
          <p className="text-xs text-slate-500 mt-0.5">
            Propel found {bridges.length} experiences that transfer to this role under a different framing.
            {pendingCount > 0 && <span className="text-amber-600 font-medium"> {pendingCount} pending your review.</span>}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {bridges.map((bridge, i) => (
          <div
            key={i}
            className={clsx(
              'rounded-xl border p-4 space-y-3',
              bridge.userApproved ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'
            )}
          >
            {/* Tailored bullet */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">What will appear in your CV</p>
              <p className="text-sm text-slate-900">"{bridge.tailoredBullet}"</p>
            </div>

            {/* Source */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Source experience</p>
              <p className="text-sm text-slate-700 italic">"{bridge.sourceExperience}"</p>
            </div>

            {/* Rationale */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Bridge rationale</p>
              <p className="text-sm text-slate-600">{bridge.bridgeRationale}</p>
            </div>

            {/* Actions */}
            {bridge.userApproved ? (
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Approved — will be included in export
              </div>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => onApprove(i)}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Approve & include
                </Button>
                <Button size="sm" variant="danger" onClick={() => onReject(i)}>
                  Remove from CV
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
