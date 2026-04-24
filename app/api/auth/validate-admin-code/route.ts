import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { code } = await req.json()
  const valid = !!(process.env.ADMIN_INVITE_CODE && code === process.env.ADMIN_INVITE_CODE)
  return NextResponse.json({ valid })
}
