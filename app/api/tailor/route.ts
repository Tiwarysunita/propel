import { NextRequest, NextResponse } from 'next/server'
import { tailorCV } from '@/lib/anthropic'
import { CareerLevel } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { primaryCVText, libraryCVTexts, jdText, careerLevel } = body as {
      primaryCVText: string
      libraryCVTexts: { name: string; text: string }[]
      jdText: string
      careerLevel: CareerLevel
    }

    if (!primaryCVText || !jdText || !careerLevel) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await tailorCV(primaryCVText, libraryCVTexts ?? [], jdText, careerLevel)
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Tailoring failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
