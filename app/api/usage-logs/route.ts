import { NextResponse } from 'next/server'
import { clearUsageLogs, getUsageLogsSnapshot } from '../../../lib/usage-logs'
import { recordRequestMetric } from '../../../lib/monitoring'

export async function GET() {
  const startedAt = Date.now()

  try {
    const snapshot = await getUsageLogsSnapshot()
    recordRequestMetric({
      endpoint: '/api/usage-logs',
      method: 'GET',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })
    return NextResponse.json({ success: true, snapshot })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown usage log error.'
    recordRequestMetric({
      endpoint: '/api/usage-logs',
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
    const result = await clearUsageLogs()
    recordRequestMetric({
      endpoint: '/api/usage-logs',
      method: 'DELETE',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown usage log clear error.'
    recordRequestMetric({
      endpoint: '/api/usage-logs',
      method: 'DELETE',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
