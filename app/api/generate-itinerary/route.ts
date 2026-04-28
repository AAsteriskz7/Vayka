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

async function fetchPoisForDestination(destination: string): Promise<PoiResult[]> {
  if (!supabase) return []
  try {
    const embedding = await getGeminiEmbedding(destination)
    const { data, error } = await supabase.rpc('match_pois', {
      query_embedding: embedding,
      match_count: 15,
    })
    if (error) throw error
    return (data as PoiResult[]) || []
  } catch (err) {
    // Non-fatal: fall back to AI general knowledge
    console.warn('POI retrieval failed, proceeding without:', err instanceof Error ? err.message : err)
    return []
  }
}

export async function POST(req: NextRequest) {
  try {
    const { destination, days, budget, interests } = await req.json()

    if (!destination || !days) {
      return NextResponse.json({ error: 'destination and days are required' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 })
    }

    const model = process.env.GEMINI_CHAT_MODEL || 'gemini-2.5-flash'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    // Retrieve real-world POIs for this destination to ground the AI's output
    const pois = await fetchPoisForDestination(destination)
    const poiSection =
      pois.length > 0
        ? `\n\nReal verified attractions for ${destination} (prioritise these):\n` +
          pois.map(p => `- ${p.place_name} (${p.type}): ${p.famous_for}`).join('\n')
        : ''

    const prompt = `Create a detailed ${days}-day travel itinerary for ${destination}.
Budget level: ${budget || 'Moderate'}
Interests: ${interests || 'sightseeing, food, culture, local experiences'}
${poiSection}

Return ONLY a valid JSON object with exactly this structure — no markdown, no code blocks, no extra text:
{
  "destination": "Full destination name",
  "summary": "2-3 sentence trip overview",
  "days": [
    {
      "day": 1,
      "title": "Descriptive day title",
      "stayArea": "Neighborhood or area to be based in",
      "activities": [
        {
          "time": "09:00",
          "title": "Activity name",
          "description": "2-3 sentences with specific details and tips",
          "type": "activity",
          "estimatedCost": "$20"
        }
      ],
      "restaurants": [
        {
          "name": "Restaurant name",
          "meal": "breakfast",
          "cuisine": "Cuisine type",
          "priceRange": "$$",
          "description": "What to order and why it is good"
        }
      ]
    }
  ]
}

Constraints:
- Include exactly ${days} day objects
- Each day: 4-6 activities with sequential realistic times (e.g. 08:30, 10:00, 13:00, 15:30, 19:00)
- Each day: exactly 3 restaurants with meal values "breakfast", "lunch", "dinner"
- type must be one of: "activity", "transport", "hotel", "meal"
- priceRange must be one of: "$", "$$", "$$$", "$$$$"
- estimatedCost is optional; include for paid activities
- Prioritise real attractions from the list above; supplement with your knowledge for restaurants and logistics`

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
        },
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Gemini error:', errText)

      let msg = 'Failed to generate itinerary'
      if (res.status === 429) msg = 'AI service is busy — please wait a moment and try again'
      else if (res.status === 503 || res.status === 502) msg = 'AI service is temporarily unavailable'

      return NextResponse.json({ error: msg }, { status: res.status })
    }

    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 })
    }

    let itinerary
    try {
      itinerary = JSON.parse(text)
    } catch {
      console.error('JSON parse error, raw text:', text.slice(0, 500))
      return NextResponse.json({ error: 'AI returned malformed data — please try again' }, { status: 500 })
    }

    if (!Array.isArray(itinerary?.days) || itinerary.days.length === 0) {
      return NextResponse.json({ error: 'AI returned incomplete itinerary — please try again' }, { status: 500 })
    }

    return NextResponse.json({ itinerary })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('Generate itinerary error:', msg)
    return NextResponse.json({ error: 'Something went wrong — please try again' }, { status: 500 })
  }
}
