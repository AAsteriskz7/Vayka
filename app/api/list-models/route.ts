import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
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
      return NextResponse.json(
        { error: `ListModels failed: ${response.status} ${err}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    const models = data.models || []

    // Filter for embedding models
    const embeddingModels = models.filter((m: any) =>
      m.name.toLowerCase().includes('embed')
    )

    return NextResponse.json({
      totalModels: models.length,
      embeddingModels: embeddingModels.map((m: any) => ({
        name: m.name,
        displayName: m.displayName,
        supportedMethods: m.supportedGenerationMethods || [],
      })),
      allModelNames: models.map((m: any) => m.name),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { error: `Failed to list models: ${message}` },
      { status: 500 }
    )
  }
}
