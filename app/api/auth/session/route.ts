import { NextRequest, NextResponse } from 'next/server'
import { createSession, deleteSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  try {
    const { userId, role, displayName, email } = await req.json()
    if (!userId || !role) {
      return NextResponse.json({ error: 'Missing userId or role' }, { status: 400 })
    }
    await createSession({
      userId,
      role: role as 'user' | 'admin',
      displayName: displayName || 'Traveler',
      email: email || '',
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}

export async function DELETE() {
  await deleteSession()
  return NextResponse.json({ ok: true })
}
