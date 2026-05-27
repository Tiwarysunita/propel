'use client'

import { ExcavatedSkill } from '@/types'
import { Card } from '@/components/UI'
import { Pickaxe, ArrowRight } from 'lucide-react'

export default function ExcavationPanel({ excavated }: { excavated: ExcavatedSkill[] }) {
  if (excavated.length === 0) return null

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
          <Pickaxe className="w-3.5 h-3.5 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {excavated.length} skill{excavated.length !== 1 ? 's' : ''} recovered from your library
          </p>
          <p className="text-xs text-slate-500">These exist in your history — not gaps, just forgotten.</p>
        </div>
      </div>

      <div className="space-y-3">
        {excavated.map((skill, i) => (
          <div key={i} className="p-3 rounded-xl bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                {skill.keyword}
              </span>
              <span className="text-xs text-slate-400">from {skill.sourceCV}</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-0.5">Original</p>
                <p className="text-xs text-slate-600 italic">"{skill.originalBullet}"</p>
              </div>
              {skill.rewrittenBullet && (
                <>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-4" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-0.5">Tailored</p>
                    <p className="text-xs text-slate-800">"{skill.rewrittenBullet}"</p>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
