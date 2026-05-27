'use client'

import { useState } from 'react'
import { TailoredResult } from '@/types'
import { Card, Button } from '@/components/UI'
import { Download, Copy, AlertTriangle, CheckCircle2, Eye } from 'lucide-react'
import { clsx } from 'clsx'

interface TailoredCVPreviewProps {
  result: TailoredResult
  jobTitle: string
  company: string
}

export default function TailoredCVPreview({ result, jobTitle, company }: TailoredCVPreviewProps) {
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const filename = `${jobTitle.replace(/\s+/g, '-')}-${company.replace(/\s+/g, '-')}-CV`.toLowerCase()

  const copy = async () => {
    await navigator.clipboard.writeText(result.tailoredCVText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const download = async () => {
    setDownloading(true)
    try {
      const res = await fetch('/api/export-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText: result.tailoredCVText, filename })
      })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.docx`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setDownloading(false)
    }
  }

  const pendingBridges = result.lateralBridges.filter(b => b.requiresUserConfirmation && !b.userApproved)

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-slate-500" />
          <p className="text-sm font-semibold text-slate-900">Tailored CV Preview</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={copy}>
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            size="sm"
            onClick={download}
            loading={downloading}
            disabled={result.exportBlocked && pendingBridges.length > 0}
          >
            <Download className="w-3.5 h-3.5" />
            Download .docx
          </Button>
        </div>
      </div>

      {result.exportBlocked && pendingBridges.length > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 mb-4">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <p className="text-xs text-amber-700">
            Export is blocked until {pendingBridges.length} lateral bridge{pendingBridges.length !== 1 ? 's are' : ' is'} reviewed above.
          </p>
        </div>
      )}

      <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 max-h-[600px] overflow-y-auto">
        <pre className="text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed">
          {result.tailoredCVText}
        </pre>
      </div>
    </Card>
  )
}
