import { NextRequest, NextResponse } from 'next/server'

// 在系統邊界驗證輸入：限制型別、長度，避免把過大或惡意 payload 轉發到 webhook。
const str = (v: unknown, max: number) =>
  typeof v === 'string' ? v.slice(0, max).trim() : ''

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const name = str(body?.name, 60)
    const contact = str(body?.contact, 120)
    const note = str(body?.note, 1000)
    const level = str(body?.level, 20)
    const goal = str(body?.goal, 40)
    const subjects = Array.isArray(body?.subjects)
      ? body.subjects.filter((s: unknown) => typeof s === 'string').slice(0, 10).map((s: string) => s.slice(0, 20))
      : []

    if (!name || !contact) {
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
