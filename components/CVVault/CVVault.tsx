'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Upload, FolderOpen, Star, Library, Trash2, FileText, CheckCircle2, AlertCircle } from 'lucide-react'
import { CVFile, CVRole } from '@/types'
import { Card, Button, Badge, SectionHeader, EmptyState } from '@/components/UI'
import { clsx } from 'clsx'

interface CVVaultProps {
  cvFiles: CVFile[]
  onCVsChange: (files: CVFile[]) => void
}

const ROLE_LABELS: Record<CVRole, { label: string; color: string; icon: typeof Star }> = {
  primary: { label: 'Primary', color: 'text-slate-900 bg-slate-900 border-slate-900', icon: Star },
  library: { label: 'Library', color: 'text-blue-700 bg-blue-50 border-blue-300', icon: Library },
  unassigned: { label: 'Unassigned', color: 'text-slate-400 bg-slate-50 border-slate-200', icon: FileText },
}

function RoleChip({ role, onClick }: { role: CVRole; onClick?: () => void }) {
  const config = ROLE_LABELS[role]
  const Icon = config.icon
  return (
    <button
      onClick={onClick}
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all',
        role === 'primary' && 'bg-slate-900 text-white border-slate-900',
        role === 'library' && 'bg-blue-50 text-blue-700 border-blue-200',
        role === 'unassigned' && 'bg-white text-slate-400 border-slate-200',
        onClick && 'hover:opacity-80 cursor-pointer'
      )}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </button>
  )
}

export default function CVVault({ cvFiles, onCVsChange }: CVVaultProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const folderRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (folderRef.current) {
      folderRef.current.setAttribute('webkitdirectory', '')
      folderRef.current.setAttribute('directory', '')
    }
  }, [])

  const hasPrimary = cvFiles.some(f => f.role === 'primary')

  const processFiles = useCallback(async (files: File[]) => {
    setUploading(true)
    const existing = new Set(cvFiles.map(f => f.name))
    const newFiles: CVFile[] = []

    for (const file of files) {
      if (existing.has(file.name)) continue
      const formData = new FormData()
      formData.append('file', file)
      try {
        const res = await fetch('/api/parse-cv', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.text) {
          newFiles.push({
            name: file.name,
            role: !hasPrimary && newFiles.length === 0 ? 'primary' : 'library',
            text: data.text,
            sizeKB: Math.round(file.size / 1024),
            lastModified: file.lastModified,
          })
        }
      } catch {
        // skip failed files silently
      }
    }

    onCVsChange([...cvFiles, ...newFiles])
    setUploading(false)
  }, [cvFiles, hasPrimary, onCVsChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files).filter(f =>
      f.name.endsWith('.pdf') || f.name.endsWith('.docx') || f.name.endsWith('.txt')
    )
    if (files.length) processFiles(files)
  }, [processFiles])

  const setRole = (name: string, role: CVRole) => {
    let updated = cvFiles.map(f => {
      if (role === 'primary' && f.name !== name && f.role === 'primary') {
        return { ...f, role: 'library' as CVRole }
      }
      if (f.name === name) return { ...f, role }
      return f
    })
    onCVsChange(updated)
  }

  const removeFile = (name: string) => {
    onCVsChange(cvFiles.filter(f => f.name !== name))
  }

  const cycleRole = (name: string, current: CVRole) => {
    const next: Record<CVRole, CVRole> = { primary: 'library', library: 'unassigned', unassigned: 'primary' }
    setRole(name, next[current])
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="CV Vault"
        subtitle="Upload your CVs. Assign one as Primary — this becomes the structural base. All others feed the library."
      />

      {/* Upload zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        className={clsx(
          'border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-150',
          dragOver
            ? 'border-slate-400 bg-slate-50 scale-[1.01]'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={e => {
            const files = Array.from(e.target.files ?? [])
            if (files.length) processFiles(files)
            e.target.value = ''
          }}
        />
        <input
          ref={folderRef}
          type="file"
          multiple
          className="hidden"
          onChange={e => {
            const files = Array.from(e.target.files ?? []).filter(f =>
              f.name.endsWith('.pdf') || f.name.endsWith('.docx') || f.name.endsWith('.txt')
            )
            if (files.length) processFiles(files)
            e.target.value = ''
          }}
        />
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
          {uploading ? (
            <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-900 rounded-full animate-spin" />
          ) : (
            <Upload className="w-5 h-5 text-slate-500" />
          )}
        </div>
        <p className="text-sm font-medium text-slate-700">
          {uploading ? 'Parsing CVs…' : 'Drop CVs here or click to browse'}
        </p>
        <p className="mt-1 text-xs text-slate-400">PDF, DOCX, or TXT · Multiple files supported</p>
        <div className="mt-4 flex items-center gap-3" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Select Files
          </button>
          <button
            onClick={() => folderRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <FolderOpen className="w-4 h-4" />
            Select Folder
          </button>
        </div>
      </div>

      {/* Legend */}
      {cvFiles.length > 0 && (
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="font-medium text-slate-600">Click role badge to cycle:</span>
          <RoleChip role="primary" />
          <RoleChip role="library" />
          <RoleChip role="unassigned" />
        </div>
      )}

      {/* Status bar */}
      {cvFiles.length > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
          {hasPrimary ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="text-sm text-slate-700">
                <strong>{cvFiles.find(f => f.role === 'primary')?.name}</strong> is your Primary CV ·{' '}
                <span className="text-slate-500">{cvFiles.filter(f => f.role === 'library').length} library CVs</span>
              </span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span className="text-sm text-slate-600">Assign one CV as <strong>Primary</strong> to continue</span>
            </>
          )}
        </div>
      )}

      {/* File list */}
      {cvFiles.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-6 h-6" />}
          title="No CVs yet"
          subtitle="Upload your most recent CV first — Propel will auto-assign it as Primary."
        />
      ) : (
        <div className="space-y-2">
          {cvFiles.map(file => (
            <Card key={file.name} className={clsx(
              'flex items-center gap-3 px-4 py-3',
              file.role === 'primary' && 'ring-2 ring-slate-900 ring-offset-1'
            )}>
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                <p className="text-xs text-slate-400">{file.sizeKB} KB · {file.text.length.toLocaleString()} chars parsed</p>
              </div>
              <RoleChip role={file.role} onClick={() => cycleRole(file.name, file.role)} />
              <button
                onClick={() => removeFile(file.name)}
                className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
