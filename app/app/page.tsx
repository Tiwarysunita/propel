'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  FolderOpen, Wand2, BarChart3, BookOpen, MessageSquare, ListTodo,
  ChevronRight, Zap, ArrowRight
} from 'lucide-react'
import { clsx } from 'clsx'
import {
  CVFile, TailoredResult, Gap, PrepPlanItem, MockQuestion,
  JobApplication, AppTab, CareerLevel
} from '@/types'
import CVVault from '@/components/CVVault/CVVault'
import JDInput from '@/components/Tailor/JDInput'
import ATSScore from '@/components/Tailor/ATSScore'
import KeywordMap from '@/components/Tailor/KeywordMap'
import ExcavationPanel from '@/components/Tailor/ExcavationPanel'
import LateralBridgePanel from '@/components/Tailor/LateralBridgePanel'
import TailoredCVPreview from '@/components/Tailor/TailoredCVPreview'
import GapAnalysis from '@/components/GapAnalysis/GapAnalysis'
import PrepPlan from '@/components/PrepPlan/PrepPlan'
import MockInterview from '@/components/MockInterview/MockInterview'
import ApplicationTracker from '@/components/ApplicationTracker/ApplicationTracker'
import { Button, Card } from '@/components/UI'
import { saveApplication, getApplications, updateApplication } from '@/lib/storage'

const TABS: { key: AppTab; label: string; icon: typeof FolderOpen; description: string }[] = [
  { key: 'vault', label: 'CV Vault', icon: FolderOpen, description: 'Upload & organise your CVs' },
  { key: 'tailor', label: 'Tailor', icon: Wand2, description: 'Match your CV to the JD' },
  { key: 'gaps', label: 'Gap Analysis', icon: BarChart3, description: 'True gaps vs recovered skills' },
  { key: 'prep', label: 'Prep Plan', icon: BookOpen, description: 'Personalised study resources' },
  { key: 'mock', label: 'Mock Interview', icon: MessageSquare, description: 'Practise targeted questions' },
  { key: 'tracker', label: 'Applications', icon: ListTodo, description: 'Track your applications' },
]

function TopNav({ activeTab, onTabChange }: { activeTab: AppTab; onTabChange: (t: AppTab) => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center h-14 gap-6">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-base tracking-tight">Propel</span>
          </div>
          <nav className="flex items-center gap-0.5 overflow-x-auto flex-1 no-scrollbar">
            {TABS.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={clsx(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                    activeTab === tab.key
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  )}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}

function WelcomeBanner({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center bg-slate-50">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 shadow-lg">
        <Zap className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-5xl font-bold text-slate-900 mb-3 tracking-tight">Propel</h1>
      <p className="text-xl text-slate-600 max-w-md mb-2 font-medium">
        The career accelerator that tells the truth.
      </p>
      <p className="text-sm text-slate-400 max-w-sm mb-10 leading-relaxed">
        Upload your CVs. Paste a job description. Get a tailored CV with full integrity — no fabricated skills, ever.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full mb-10">
        {[
          { icon: FolderOpen, title: 'Dual-source CV logic', body: 'Excavates skills from your full career history — not just your latest CV.' },
          { icon: Wand2, title: 'Zero fabrication', body: 'Every claim in your tailored CV maps to real experience you can defend.' },
          { icon: BarChart3, title: 'True gap clarity', body: 'Know exactly what needs learning. Recovered vs genuine gap — crystal clear.' },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-white rounded-2xl border border-slate-200 p-5 text-left shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
              <Icon className="w-4.5 h-4.5 text-slate-600" />
            </div>
            <p className="text-sm font-semibold text-slate-900 mb-1.5">{title}</p>
            <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <Button size="lg" onClick={onStart}>
        Get started <ArrowRight className="w-4 h-4" />
      </Button>
      <p className="mt-4 text-xs text-slate-400">No account needed · Your CVs never leave your browser</p>
    </div>
  )
}

export default function Home() {
  const [started, setStarted] = useState(false)
  const [activeTab, setActiveTab] = useState<AppTab>('vault')
  const [cvFiles, setCVFiles] = useState<CVFile[]>([])
  const [jdText, setJDText] = useState('')
  const [jdUrl, setJDUrl] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [careerLevel, setCareerLevel] = useState<CareerLevel>('mid')
  const [tailorLoading, setTailorLoading] = useState(false)
  const [tailoredResult, setTailoredResult] = useState<TailoredResult | null>(null)
  const [gaps, setGaps] = useState<Gap[]>([])
  const [prepPlan, setPrepPlan] = useState<PrepPlanItem[]>([])
  const [prepLoading, setPrepLoading] = useState(false)
  const [questions, setQuestions] = useState<MockQuestion[]>([])
  const [mockLoading, setMockLoading] = useState(false)
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setApplications(getApplications())
  }, [])

  const primaryCV = cvFiles.find(f => f.role === 'primary')
  const libraryCVs = cvFiles.filter(f => f.role === 'library')
  const canTailor = !!primaryCV && jdText.trim().length > 50

  const runTailor = useCallback(async () => {
    if (!primaryCV || !jdText) return
    setTailorLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryCVText: primaryCV.text,
          libraryCVTexts: libraryCVs.map(cv => ({ name: cv.name, text: cv.text })),
          jdText,
          careerLevel,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setTailoredResult(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Tailoring failed. Check your API key.')
    } finally {
      setTailorLoading(false)
    }
  }, [primaryCV, libraryCVs, jdText, careerLevel])

  const approveBridge = (index: number) => {
    if (!tailoredResult) return
    const bridges = tailoredResult.lateralBridges.map((b, i) =>
      i === index ? { ...b, userApproved: true } : b
    )
    setTailoredResult({
      ...tailoredResult,
      lateralBridges: bridges,
      exportBlocked: bridges.some(b => b.requiresUserConfirmation && !b.userApproved),
    })
  }

  const rejectBridge = (index: number) => {
    if (!tailoredResult) return
    const bridges = tailoredResult.lateralBridges.filter((_, i) => i !== index)
    setTailoredResult({
      ...tailoredResult,
      lateralBridges: bridges,
      exportBlocked: bridges.some(b => b.requiresUserConfirmation && !b.userApproved),
    })
  }

  const runPrepPlan = useCallback(async () => {
    if (!tailoredResult) return
    setPrepLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/prep-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trueGapKeywords: tailoredResult.trueGaps,
          jdText,
          careerLevel,
          jobTitle: jobTitle || 'this role',
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setGaps(data.gaps)
      setPrepPlan(data.prepPlan)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Prep plan failed')
    } finally {
      setPrepLoading(false)
    }
  }, [tailoredResult, jdText, careerLevel, jobTitle])

  const runMock = useCallback(async () => {
    if (!primaryCV || gaps.length === 0) return
    setMockLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gaps,
          careerLevel,
          jobTitle: jobTitle || 'this role',
          primaryCVText: primaryCV.text,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setQuestions(data.questions)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Question generation failed')
    } finally {
      setMockLoading(false)
    }
  }, [primaryCV, gaps, careerLevel, jobTitle])

  const persistApplication = useCallback(() => {
    if (!tailoredResult) return
    const app: JobApplication = {
      id: crypto.randomUUID(),
      jobTitle: jobTitle || 'Untitled role',
      company: company || 'Unknown company',
      jdText,
      jdUrl,
      primaryCVUsed: primaryCV?.name ?? '',
      libraryCVsUsed: libraryCVs.map(cv => cv.name),
      result: tailoredResult,
      trueGaps: gaps,
      prepPlan,
      careerLevel,
      status: 'drafting',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    saveApplication(app)
    setApplications(getApplications())
    setActiveTab('tracker')
  }, [tailoredResult, jobTitle, company, jdText, jdUrl, primaryCV, libraryCVs, gaps, prepPlan, careerLevel])

  if (!started) return <WelcomeBanner onStart={() => setStarted(true)} />

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-4xl mx-auto px-4 pt-20 pb-16">
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
            <p className="text-sm text-red-700">{error}</p>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 text-xs ml-4 flex-shrink-0">Dismiss</button>
          </div>
        )}

        {activeTab === 'vault' && (
          <div className="space-y-6">
            <CVVault cvFiles={cvFiles} onCVsChange={setCVFiles} />
            {cvFiles.some(f => f.role === 'primary') && (
              <Card className="p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Job details</p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Job title</label>
                    <input
                      value={jobTitle}
                      onChange={e => setJobTitle(e.target.value)}
                      placeholder="e.g. Chief Technology Officer"
                      className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Company</label>
                    <input
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      placeholder="e.g. Acme Corp"
                      className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
                <Button onClick={() => setActiveTab('tailor')} className="w-full justify-center">
                  Continue to Job Description <ChevronRight className="w-4 h-4" />
                </Button>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'tailor' && (
          <div className="space-y-5">
            <JDInput
              jdText={jdText} jdUrl={jdUrl} careerLevel={careerLevel}
              onJDTextChange={setJDText} onJDUrlChange={setJDUrl} onCareerLevelChange={setCareerLevel}
            />
            {primaryCV ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <span>Primary: <strong className="text-slate-900">{primaryCV.name}</strong></span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">{libraryCVs.length} library CV{libraryCVs.length !== 1 ? 's' : ''}</span>
                <button onClick={() => setActiveTab('vault')} className="ml-auto text-slate-400 hover:text-slate-700 underline underline-offset-2">Change</button>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700">
                No Primary CV selected. <button onClick={() => setActiveTab('vault')} className="underline font-medium">Go to CV Vault →</button>
              </div>
            )}

            <Button onClick={runTailor} loading={tailorLoading} disabled={!canTailor} size="lg" className="w-full justify-center">
              <Wand2 className="w-4 h-4" />
              {tailorLoading ? 'Tailoring your CV…' : 'Tailor CV to this JD'}
            </Button>

            {!canTailor && !tailorLoading && (
              <p className="text-xs text-center text-slate-400">
                {!primaryCV ? 'Upload and assign a Primary CV first' : 'Paste the full job description above (min 50 characters)'}
              </p>
            )}

            {tailoredResult && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Results</p>
                  <Button size="sm" variant="secondary" onClick={persistApplication}>Save application</Button>
                </div>
                <ATSScore result={tailoredResult} />
                <KeywordMap keywords={tailoredResult.keywords} />
                {tailoredResult.lateralBridges.length > 0 && (
                  <LateralBridgePanel bridges={tailoredResult.lateralBridges} onApprove={approveBridge} onReject={rejectBridge} />
                )}
                <ExcavationPanel excavated={tailoredResult.excavated} />
                <TailoredCVPreview result={tailoredResult} jobTitle={jobTitle} company={company} />
                <div className="flex gap-2 pt-2">
                  <Button variant="secondary" onClick={() => setActiveTab('gaps')} className="flex-1 justify-center">
                    <BarChart3 className="w-4 h-4" /> Gap analysis
                  </Button>
                  <Button variant="secondary" onClick={() => { setActiveTab('prep'); if (prepPlan.length === 0) runPrepPlan() }} className="flex-1 justify-center">
                    <BookOpen className="w-4 h-4" /> Prep plan
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'gaps' && (
          <GapAnalysis
            trueGaps={gaps.length > 0 ? gaps : (tailoredResult?.trueGaps ?? []).map(skill => ({
              skill, severity: 'medium' as const, jdContext: 'Required in the job description.'
            }))}
            excavated={tailoredResult?.excavated ?? []}
          />
        )}

        {activeTab === 'prep' && (
          <PrepPlan
            gaps={gaps} prepPlan={prepPlan}
            jobTitle={jobTitle || 'this role'} careerLevel={careerLevel}
            onGenerate={runPrepPlan} loading={prepLoading}
          />
        )}

        {activeTab === 'mock' && (
          <MockInterview
            gaps={gaps} careerLevel={careerLevel}
            jobTitle={jobTitle || 'this role'} questions={questions}
            onGenerate={runMock} loading={mockLoading}
          />
        )}

        {activeTab === 'tracker' && (
          <ApplicationTracker
            applications={applications}
            onSelect={app => {
              setTailoredResult(app.result)
              setGaps(app.trueGaps)
              setPrepPlan(app.prepPlan)
              setJobTitle(app.jobTitle)
              setCompany(app.company)
              setJDText(app.jdText)
              setCareerLevel(app.careerLevel)
              setActiveTab('tailor')
            }}
            onStatusChange={(id, status) => {
              updateApplication(id, { status })
              setApplications(getApplications())
            }}
          />
        )}
      </main>
    </div>
  )
}
