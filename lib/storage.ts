import { JobApplication } from '@/types'

const KEY = 'propel_applications'

function read(): JobApplication[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as JobApplication[]) : []
  } catch {
    return []
  }
}

function write(applications: JobApplication[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(applications))
}

export function saveApplication(application: JobApplication): void {
  const existing = read()
  const idx = existing.findIndex(a => a.id === application.id)
  if (idx >= 0) {
    existing[idx] = application
  } else {
    existing.unshift(application)
  }
  write(existing)
}

export function getApplications(): JobApplication[] {
  return read()
}

export function getApplication(id: string): JobApplication | null {
  return read().find(a => a.id === id) ?? null
}

export function updateApplication(id: string, updates: Partial<JobApplication>): void {
  const existing = read()
  const idx = existing.findIndex(a => a.id === id)
  if (idx >= 0) {
    existing[idx] = { ...existing[idx], ...updates, updatedAt: new Date().toISOString() }
    write(existing)
  }
}

export function deleteApplication(id: string): void {
  write(read().filter(a => a.id !== id))
}
