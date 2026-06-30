import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { subjects, level, goal, name, contact, note } = body

    if (!name || typeof name !== 'string' || !contact || typeof contact !== 'string') {
      return NextResponse.json({ error: '缺少必填欄位' }, { status: 400 })
    }

    // Forward to Google Apps Script webhook if configured
    const webhookUrl = process.env.INQUIRY_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjects, level, goal, name, contact, note,
          timestamp: new Date().toISOString() }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (_) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
