import { NextRequest, NextResponse } from 'next/server'
import { exportToDocx } from '@/lib/exportDocx'

export async function POST(req: NextRequest) {
  try {
    const { cvText, filename } = await req.json()
    if (!cvText) return NextResponse.json({ error: 'No CV text provided' }, { status: 400 })

    const buffer = await exportToDocx(cvText, filename ?? 'tailored-cv')
    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${filename ?? 'tailored-cv'}.docx"`,
      }
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Export failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
