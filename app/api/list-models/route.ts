import { NextResponse } from 'next/server'
import { recordRequestMetric } from '../../../lib/monitoring'
import { safelyAppendUsageLog } from '../../../lib/usage-logs'

export async function GET() {
  const startedAt = Date.now()
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    recordRequestMetric({
      endpoint: '/api/list-models',
      method: 'GET',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: 'Missing GEMINI_API_KEY',
    })
    await safelyAppendUsageLog({
      endpoint: '/api/list-models',
      method: 'GET',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: 'Missing GEMINI_API_KEY',
    })
    return NextResponse.json(
      { error: 'Missing GEMINI_API_KEY' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
    )

    if (!response.ok) {
      const err = await response.text()
      recordRequestMetric({
        endpoint: '/api/list-models',
        method: 'GET',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: response.status,
        errorMessage: err,
      })
      await safelyAppendUsageLog({
        endpoint: '/api/list-models',
        method: 'GET',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: response.status,
        errorMessage: err,
      })
      return NextResponse.json(
        { error: `ListModels failed: ${response.status} ${err}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    const models = Array.isArray(data.models) ? data.models : []

    // Filter for embedding models
    const embeddingModels = models.filter((model: { name?: string }) =>
      model.name?.toLowerCase().includes('embed')
    )

    recordRequestMetric({
      endpoint: '/api/list-models',
      method: 'GET',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })
    await safelyAppendUsageLog({
      endpoint: '/api/list-models',
      method: 'GET',
      durationMs: Date.now() - startedAt,
      ok: true,
      statusCode: 200,
    })

    return NextResponse.json({
      totalModels: models.length,
      embeddingModels: embeddingModels.map(
        (model: {
          name?: string
          displayName?: string
          supportedGenerationMethods?: string[]
        }) => ({
          name: model.name,
          displayName: model.displayName,
          supportedMethods: model.supportedGenerationMethods || [],
        })
      ),
      allModelNames: models.map((model: { name?: string }) => model.name),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    recordRequestMetric({
      endpoint: '/api/list-models',
      method: 'GET',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    await safelyAppendUsageLog({
      endpoint: '/api/list-models',
      method: 'GET',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage: message,
    })
    return NextResponse.json(
      { error: `Failed to list models: ${message}` },
      { status: 500 }
    )
  }
}
