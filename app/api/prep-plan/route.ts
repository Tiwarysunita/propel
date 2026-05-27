import { NextRequest, NextResponse } from 'next/server'
import { analyseGaps, buildPrepPlan } from '@/lib/anthropic'
import { CareerLevel, Gap } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { trueGapKeywords, jdText, careerLevel, jobTitle, existingGaps } = body as {
      trueGapKeywords: string[]
      jdText: string
      careerLevel: CareerLevel
      jobTitle: string
      existingGaps?: Gap[]
    }

    const gaps = existingGaps ?? await analyseGaps(trueGapKeywords, jdText, careerLevel)
    const prepPlan = await buildPrepPlan(gaps, careerLevel, jobTitle)
    return NextResponse.json({ gaps, prepPlan })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Prep plan generation failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
