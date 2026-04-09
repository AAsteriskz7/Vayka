import { NextResponse } from 'next/server'
import { ingestDocument } from '../../../lib/ingest'

export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const geminiApiKey = process.env.GEMINI_API_KEY

  if (!supabaseUrl || !supabaseAnonKey || !geminiApiKey) {
    return NextResponse.json(
      {
        success: false,
        message: 'Missing required environment variables for Supabase or Gemini.',
      },
      { status: 500 }
    )
  }

  const body = await req.json()
  const { source, content, metadata } = body ?? {}

  if (!source || !content) {
    return NextResponse.json(
      {
        success: false,
        message: 'Source and content are required for ingestion.',
      },
      { status: 400 }
    )
  }

  try {
    const result = await ingestDocument({ source, content, metadata })
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown ingestion error.'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
