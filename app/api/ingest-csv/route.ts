import { NextResponse } from 'next/server'
import { ingestDocument } from '../../../lib/ingest'
import { recordRequestMetric } from '../../../lib/monitoring'
import { safelyAppendUsageLog } from '../../../lib/usage-logs'
import { buildGenericCsvIngestItem, parseCsvRecords } from '../../../lib/travel-csv'

export async function POST(req: Request) {
  const startedAt = Date.now()

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const geminiApiKey = process.env.GEMINI_API_KEY

    if (!supabaseUrl || !supabaseAnonKey || !geminiApiKey) {
      const message = 'Missing required environment variables for Supabase or Gemini.'
      recordRequestMetric({
        endpoint: '/api/ingest-csv',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 500,
        errorMessage: message,
      })
      await safelyAppendUsageLog({
        endpoint: '/api/ingest-csv',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 500,
        errorMessage: message,
      })
      return NextResponse.json({ success: false, message }, { status: 500 })
    }

    const formData = await req.formData()
    const file = formData.get('file')
    const source = String(formData.get('source') || '').trim()
    const description = String(formData.get('description') || '').trim()

    if (!(file instanceof File)) {
      const message = 'A CSV file is required.'
      recordRequestMetric({
        endpoint: '/api/ingest-csv',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 400,
        errorMessage: message,
      })
      await safelyAppendUsageLog({
        endpoint: '/api/ingest-csv',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 400,
        errorMessage: message,
      })
      return NextResponse.json({ success: false, message }, { status: 400 })
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      const message = 'Only CSV uploads are supported.'
      recordRequestMetric({
        endpoint: '/api/ingest-csv',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 400,
        errorMessage: message,
      })
      await safelyAppendUsageLog({
        endpoint: '/api/ingest-csv',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 400,
        errorMessage: message,
      })
      return NextResponse.json({ success: false, message }, { status: 400 })
    }

    const csvText = await file.text()
    const records = parseCsvRecords(csvText)
    const effectiveSource = source || file.name

    let ingestedRows = 0
    let ingestedChunks = 0

    for (const [index, record] of records.entries()) {
      const item = buildGenericCsvIngestItem(record, index)
      if (!item) {
        continue
      }

      const result = await ingestDocument({
        source: `${effectiveSource} (CSV)`,
        content: item.content,
        metadata: {
          ...item.metadata,
          description: description || undefined,
          originalFilename: file.name,
        },
      })

      ingestedRows += 1
      ingestedChunks += result.chunkCount
    }

    recordRequestMetric({
      endpoint: '/api/ingest-csv',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })
    await safelyAppendUsageLog({
      endpoint: '/api/ingest-csv',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })

    return NextResponse.json({
      success: true,
      source: `${effectiveSource} (CSV)`,
      parsedRowCount: records.length,
      rowCount: ingestedRows,
      chunkCount: ingestedChunks,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown CSV ingestion error.'
    recordRequestMetric({
      endpoint: '/api/ingest-csv',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    await safelyAppendUsageLog({
      endpoint: '/api/ingest-csv',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
