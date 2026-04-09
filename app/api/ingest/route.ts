import { NextResponse } from 'next/server'
import { ingestDocument } from '../../../lib/ingest'
import { recordRequestMetric } from '../../../lib/monitoring'

export async function POST(req: Request) {
  const startedAt = Date.now()

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const geminiApiKey = process.env.GEMINI_API_KEY

    if (!supabaseUrl || !supabaseAnonKey || !geminiApiKey) {
      recordRequestMetric({
        endpoint: '/api/ingest',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 500,
        errorMessage: 'Missing required environment variables for Supabase or Gemini.',
      })
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
      recordRequestMetric({
        endpoint: '/api/ingest',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 400,
        errorMessage: 'Source and content are required for ingestion.',
      })
      return NextResponse.json(
        {
          success: false,
          message: 'Source and content are required for ingestion.',
        },
        { status: 400 }
      )
    }

    const result = await ingestDocument({ source, content, metadata })
    recordRequestMetric({
      endpoint: '/api/ingest',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown ingestion error.'
    recordRequestMetric({
      endpoint: '/api/ingest',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
