'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('bg-white rounded-2xl border border-slate-200 shadow-sm', className)}>
      {children}
    </div>
  )
}

export function Badge({ children, variant = 'default' }: {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variant === 'default' && 'bg-slate-100 text-slate-700',
      variant === 'success' && 'bg-emerald-50 text-emerald-700',
      variant === 'warning' && 'bg-amber-50 text-amber-700',
      variant === 'error' && 'bg-red-50 text-red-700',
      variant === 'info' && 'bg-blue-50 text-blue-700',
    )}>
      {children}
    </span>
  )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: ReactNode
}

export function Button({
  children, variant = 'primary', size = 'md', loading, className, disabled, ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        variant === 'primary' && 'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950',
        variant === 'secondary' && 'bg-slate-100 text-slate-900 hover:bg-slate-200',
        variant === 'ghost' && 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        variant === 'danger' && 'bg-red-50 text-red-700 hover:bg-red-100',
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={clsx('animate-spin text-slate-400', className)} />
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
  )
}

export function EmptyState({ icon, title, subtitle }: {
  icon: ReactNode; title: string; subtitle: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 text-slate-400">
        {icon}
      </div>
      <h3 className="text-base font-medium text-slate-800">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 max-w-xs">{subtitle}</p>
    </div>
  )
}

export function ProgressBar({ value, max = 100, className }: {
  value: number; max?: number; className?: string
}) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className={clsx('h-2 bg-slate-100 rounded-full overflow-hidden', className)}>
      <div
        className="h-full bg-slate-900 rounded-full transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
