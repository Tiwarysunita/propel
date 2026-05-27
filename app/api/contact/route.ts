import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, role, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      // Graceful degradation — log to console in dev/preview when key not configured
      console.log('[Contact form submission]', { name, company, email, role, message })
      return NextResponse.json({ ok: true })
    }

    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'Sunita Tiwary Profile <onboarding@resend.dev>',
      to: 'tiwarysunita@gmail.com',
      replyTo: email,
      subject: `Profile enquiry from ${name}${company ? ` · ${company}` : ''}`,
      text: [
        `Name: ${name}`,
        `Company: ${company || '—'}`,
        `Email: ${email}`,
        `Role: ${role || '—'}`,
        '',
        message,
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:600px;color:#1e293b">
          <h2 style="margin-bottom:4px">New profile enquiry</h2>
          <p style="color:#64748b;margin-top:0;font-size:14px">via sunitatiwary.com</p>
          <table style="border-collapse:collapse;width:100%;margin:24px 0;font-size:14px">
            <tr><td style="padding:8px 0;color:#64748b;width:100px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Company</td><td style="padding:8px 0">${company || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#7c3aed">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Role</td><td style="padding:8px 0">${role || '—'}</td></tr>
          </table>
          <div style="background:#f8fafc;border-radius:8px;padding:16px;font-size:14px;white-space:pre-wrap">${message}</div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please email tiwarysunita@gmail.com directly.' },
      { status: 500 }
    )
  }
}
