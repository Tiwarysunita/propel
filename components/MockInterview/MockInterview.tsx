'use client'

import { useState } from 'react'
import { MockQuestion, Gap, CareerLevel } from '@/types'
import { Card, Button, Badge, SectionHeader, EmptyState } from '@/components/UI'
import { MessageSquare, ChevronRight, ChevronLeft, Lightbulb, Eye, EyeOff, Mic } from 'lucide-react'
import { clsx } from 'clsx'

interface MockInterviewProps {
  gaps: Gap[]
  careerLevel: CareerLevel
  jobTitle: string
  questions: MockQuestion[]
  onGenerate: () => void
  loading: boolean
}

const TYPE_COLORS = {
  behavioural: 'info',
  case: 'warning',
  technical: 'default',
  situational: 'success',
} as const

function LiveSession({ questions, onExit }: { questions: MockQuestion[]; onExit: () => void }) {
  const [index, setIndex] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const q = questions[index]
  const isFirst = index === 0
  const isLast = index === questions.length - 1

  const next = () => {
    setIndex(i => i + 1)
    setShowHint(false)
    setAnswer('')
    setSubmitted(false)
  }

  const prev = () => {
    setIndex(i => i - 1)
    setShowHint(false)
    setAnswer('')
    setSubmitted(false)
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-slate-900 rounded-full transition-all duration-500"
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-slate-500 flex-shrink-0">{index + 1} / {questions.length}</span>
        <button onClick={onExit} className="text-xs text-slate-400 hover:text-slate-600">Exit</button>
      </div>

      {/* Question card */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant={TYPE_COLORS[q.type]}>{q.type}</Badge>
          <span className="text-xs text-slate-400">· {q.skill}</span>
        </div>
        <p className="text-lg font-medium text-slate-900 leading-relaxed">{q.question}</p>

        {/* Answer area */}
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Type your answer here… or speak it aloud and reflect on the key points."
          rows={6}
          disabled={submitted}
          className="w-full text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50"
        />

        {/* Hint */}
        {q.hint && (
          <div>
            <button
              onClick={() => setShowHint(h => !h)}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              {showHint ? 'Hide hint' : 'Show hint'}
            </button>
            {showHint && (
              <div className="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-100">
                <p className="text-xs text-amber-800">{q.hint}</p>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button size="sm" variant="secondary" onClick={prev} disabled={isFirst}>
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </Button>
          {!submitted ? (
            <Button size="sm" onClick={() => setSubmitted(true)} disabled={!answer.trim()}>
              Submit answer
            </Button>
          ) : (
            <Button size="sm" variant={isLast ? 'secondary' : 'primary'} onClick={isLast ? onExit : next}>
              {isLast ? 'Finish session' : <>Next <ChevronRight className="w-3.5 h-3.5" /></>}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

export default function MockInterview({ gaps, careerLevel, jobTitle, questions, onGenerate, loading }: MockInterviewProps) {
  const [mode, setMode] = useState<'bank' | 'live'>('bank')
  const [filter, setFilter] = useState<string>('all')

  if (gaps.length === 0 && questions.length === 0) {
    return (
      <div className="space-y-6">
        <SectionHeader title="Mock Interview" subtitle="Practice targeted questions based on your gaps." />
        <EmptyState
          icon={<MessageSquare className="w-6 h-6" />}
          title="Complete gap analysis first"
          subtitle="Tailor your CV to generate personalised interview questions."
        />
      </div>
    )
  }

  const skills = ['all', ...Array.from(new Set(questions.map(q => q.skill)))]
  const visible = filter === 'all' ? questions : questions.filter(q => q.skill === filter)

  if (mode === 'live' && questions.length > 0) {
    return <LiveSession questions={visible.length > 0 ? visible : questions} onExit={() => setMode('bank')} />
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Mock Interview"
        subtitle={questions.length === 0 ? 'Generate your personalised question bank.' : `${questions.length} questions across ${skills.length - 1} skill areas.`}
      />

      {questions.length === 0 ? (
        <Card className="p-8 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
            <MessageSquare className="w-6 h-6 text-slate-500" />
          </div>
          <p className="text-sm font-medium text-slate-800 mb-1">Ready to practise</p>
          <p className="text-xs text-slate-500 mb-4">{gaps.length} gaps · {careerLevel} level questions for {jobTitle}</p>
          <Button onClick={onGenerate} loading={loading}>Generate questions</Button>
        </Card>
      ) : (
        <>
          {/* Start session */}
          <Card className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Practice session</p>
              <p className="text-xs text-slate-500">One question at a time · with hints</p>
            </div>
            <Button onClick={() => setMode('live')}>
              <Mic className="w-3.5 h-3.5" /> Start session
            </Button>
          </Card>

          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            {skills.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                  filter === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                )}
              >
                {s === 'all' ? `All ${questions.length}` : s}
              </button>
            ))}
          </div>

          {/* Question bank */}
          <div className="space-y-2">
            {visible.map((q, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-slate-500">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant={TYPE_COLORS[q.type]}>{q.type}</Badge>
                      <span className="text-xs text-slate-400">{q.skill}</span>
                    </div>
                    <p className="text-sm text-slate-800">{q.question}</p>
                    {q.hint && (
                      <p className="mt-2 text-xs text-slate-500 italic">Hint: {q.hint}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
