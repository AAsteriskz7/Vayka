import { NextResponse } from 'next/server'
import {
  clearKnowledgeBase,
  getKnowledgeBaseSummary,
  reloadKnowledgeBase,
} from '../../../lib/knowledge-base'
import { recordRequestMetric } from '../../../lib/monitoring'
import { safelyAppendUsageLog } from '../../../lib/usage-logs'

export async function GET() {
  const startedAt = Date.now()

  try {
    const summary = await getKnowledgeBaseSummary()
    recordRequestMetric({
      endpoint: '/api/knowledge-base',
      method: 'GET',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })
    await safelyAppendUsageLog({
      endpoint: '/api/knowledge-base',
      method: 'GET',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })
    return NextResponse.json({ success: true, summary })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown knowledge base error.'
    recordRequestMetric({
      endpoint: '/api/knowledge-base',
      method: 'GET',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    await safelyAppendUsageLog({
      endpoint: '/api/knowledge-base',
      method: 'GET',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}

export async function DELETE() {
  const startedAt = Date.now()

  try {
    const result = await clearKnowledgeBase()
    recordRequestMetric({
      endpoint: '/api/knowledge-base',
      method: 'DELETE',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })
    await safelyAppendUsageLog({
      endpoint: '/api/knowledge-base',
      method: 'DELETE',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown clear error.'
    recordRequestMetric({
      endpoint: '/api/knowledge-base',
      method: 'DELETE',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    await safelyAppendUsageLog({
      endpoint: '/api/knowledge-base',
      method: 'DELETE',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const startedAt = Date.now()

  try {
    const body = await req.json().catch(() => ({}))
    const action = body?.action

    if (action !== 'reload') {
      recordRequestMetric({
        endpoint: '/api/knowledge-base',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 400,
        errorMessage: 'Unsupported action.',
      })
      await safelyAppendUsageLog({
        endpoint: '/api/knowledge-base',
        method: 'POST',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 400,
        errorMessage: 'Unsupported action.',
      })
      return NextResponse.json(
        { success: false, message: 'Unsupported action.' },
        { status: 400 }
      )
    }

    const result = await reloadKnowledgeBase()
    recordRequestMetric({
      endpoint: '/api/knowledge-base',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })
    await safelyAppendUsageLog({
      endpoint: '/api/knowledge-base',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown reload error.'
    recordRequestMetric({
      endpoint: '/api/knowledge-base',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    await safelyAppendUsageLog({
      endpoint: '/api/knowledge-base',
      method: 'POST',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
