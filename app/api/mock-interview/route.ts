import { NextRequest, NextResponse } from 'next/server'
import { generateMockQuestions } from '@/lib/anthropic'
import { CareerLevel, Gap } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { gaps, careerLevel, jobTitle, primaryCVText } = body as {
      gaps: Gap[]
      careerLevel: CareerLevel
      jobTitle: string
      primaryCVText: string
    }

    const questions = await generateMockQuestions(gaps, careerLevel, jobTitle, primaryCVText)
    return NextResponse.json({ questions })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Question generation failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
