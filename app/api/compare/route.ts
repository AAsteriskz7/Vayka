import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'
import { getGeminiEmbedding } from '../../../lib/embeddings'

interface PoiResult {
  place_name: string
  city: string
  type: string
  famous_for: string
  similarity: number
}

export async function POST(req: NextRequest) {
  try {
    const { destinations } = await req.json()
    if (!Array.isArray(destinations) || destinations.length < 2) {
      return NextResponse.json({ error: 'Need at least 2 destinations' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    const chatModel = process.env.GEMINI_CHAT_MODEL || 'gemini-2.5-flash'
    const backupModel = process.env.GEMINI_CHAT_BACKUP_MODEL || ''

    if (!apiKey || !supabase) {
      return NextResponse.json({ error: 'Missing config' }, { status: 500 })
    }

    // 1. Retrieve POIs + knowledge-base docs for each destination in parallel
    const destData: Record<string, string[]> = {}
    const poiData: Record<string, PoiResult[]> = {}

    for (const dest of destinations) {
      try {
        const embedding = await getGeminiEmbedding(dest)

        // Existing document retrieval (kept intact)
        const { data: docs } = await supabase.rpc('match_documents', {
          query_embedding: embedding,
          match_threshold: 0.35,
          match_count: 5,
        })
        destData[dest] = (docs || []).map((d: { content: string }) => d.content)

        // POI retrieval (graceful fallback if table/function not ready)
        try {
          const { data: pois } = await supabase.rpc('match_pois', {
            query_embedding: embedding,
            match_count: 10,
          })
          poiData[dest] = (pois as PoiResult[]) || []
        } catch {
          poiData[dest] = []
        }
      } catch (err) {
        console.error('RAG retrieval failed for destination:', dest, err)
        destData[dest] = []
        poiData[dest] = []
      }
    }

    // 2. Build context block — POIs first, then knowledge-base docs
    let contextBlock = ''
    for (const dest of destinations) {
      const pois = poiData[dest]
      const docs = destData[dest]

      if (pois.length > 0) {
        contextBlock += `\n\nReal attractions in ${dest}:\n`
        contextBlock += pois.map(p => `- ${p.place_name} (${p.type}): ${p.famous_for}`).join('\n')
      }
      if (docs.length > 0) {
        contextBlock += `\n\nKnowledge base data for ${dest}:\n${docs.join('\n')}`
      }
      if (pois.length === 0 && docs.length === 0) {
        contextBlock += `\n\nNo database data found for ${dest}. Use your general knowledge.`
      }
    }

    const prompt = `You are comparing these travel destinations: ${destinations.join(', ')}.
${contextBlock}

Use the real attractions listed above when describing what each destination offers.

Based on the data above (and your general knowledge where data is missing), output a comparison in EXACTLY this format. Each line must have values separated by | characters, one value per destination in the same order (${destinations.join(', ')}):

COST: value1 | value2${destinations.length > 2 ? ' | value3' : ''}
BEST_TIME: value1 | value2${destinations.length > 2 ? ' | value3' : ''}
ACTIVITIES: value1 | value2${destinations.length > 2 ? ' | value3' : ''}
WEATHER: value1 | value2${destinations.length > 2 ? ' | value3' : ''}
SAFETY: value1 | value2${destinations.length > 2 ? ' | value3' : ''}
STAY_COST: value1 | value2${destinations.length > 2 ? ' | value3' : ''}
FOOD: value1 | value2${destinations.length > 2 ? ' | value3' : ''}
BEST_FOR: value1 | value2${destinations.length > 2 ? ' | value3' : ''}
VERDICT: A single paragraph about which destination might suit different types of travelers and why.

Keep each value short (under 15 words). Do not use markdown. Do not add extra categories.`

    async function callModel(model: string) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
      return fetch(`${url}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          generationConfig: { temperature: 0.3, maxOutputTokens: 1024 },
          contents: [{ parts: [{ text: prompt }] }],
        }),
      })
    }
    console.log("Calling Gemini model:", chatModel)
    let res = await callModel(chatModel)
    console.log("Gemini response status:", res.status, res.statusText)

    if (!res.ok && backupModel && backupModel !== chatModel) {
      console.log("Trying backup model:", backupModel)
      res = await callModel(backupModel)
      console.log("Backup model response status:", res.status, res.statusText)
    }
    if (!res.ok) {
      const errorText = await res.text()
      console.error("Gemini API failed:", {
        status: res.status,
        statusText: res.statusText,
        chatModel,
        backupModel,
        errorText,
      })

      return NextResponse.json(
        {
          error: 'AI service unavailable',
          details: errorText,
          status: res.status,
          model: chatModel,
        },
        { status: 503 }
      )
    }

    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''

    return NextResponse.json({ raw: text, destinations })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
