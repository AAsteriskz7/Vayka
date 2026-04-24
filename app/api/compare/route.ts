import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'
import { getGeminiEmbedding } from '../../../lib/embeddings'

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

    // 1. Fetch knowledge base data for each destination
    const destData: Record<string, string[]> = {}
    for (const dest of destinations) {
      try {
        const embedding = await getGeminiEmbedding(dest)
        const { data } = await supabase.rpc('match_documents', {
          query_embedding: embedding,
          match_threshold: 0.35,
          match_count: 5,
        })
        destData[dest] = (data || []).map((d: { content: string }) => d.content)
      } catch (err) {
        console.error("RAG retrieval failed for destination:", dest, err)
        destData[dest] = []
      }
    }

    // 2. Build a prompt with the actual data
    let contextBlock = ''
    for (const dest of destinations) {
      const chunks = destData[dest]
      if (chunks.length > 0) {
        contextBlock += `\n\nKnowledge base data for ${dest}:\n${chunks.join('\n')}`
      } else {
        contextBlock += `\n\nNo knowledge base data found for ${dest}. Use your general knowledge.`
      }
    }

    const prompt = `You are comparing these travel destinations: ${destinations.join(', ')}.
${contextBlock}

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
