import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'
import { getGeminiEmbedding } from '../../../lib/embeddings'

export async function GET(req: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ destinations: [] })
  }

  const searchQuery = req.nextUrl.searchParams.get('q') || ''
  const budget = req.nextUrl.searchParams.get('budget') || ''

  try {
    // If there's a search query, do vector search
    if (searchQuery.trim()) {
      const embedding = await getGeminiEmbedding(searchQuery)
      const { data, error } = await supabase.rpc('match_documents', {
        query_embedding: embedding,
        match_threshold: 0.3,
        match_count: 20,
      })
      if (error) throw error

      const destinations = extractDestinations(data || [], budget)
      return NextResponse.json({ destinations })
    }

    // Otherwise fetch all documents and extract unique destinations
    const { data, error } = await supabase
      .from('documents')
      .select('id, content, source, metadata')
      .order('created_at', { ascending: false })
      .limit(200)

    if (error) throw error

    const destinations = extractDestinations(data || [], budget)
    return NextResponse.json({ destinations })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ destinations: [], error: message }, { status: 500 })
  }
}

interface DocRow {
  id: string
  content: string
  source: string
  metadata?: Record<string, unknown> | null
  similarity?: number
}

interface Destination {
  name: string
  region: string
  description: string
  budget: string
  tags: string[]
  source: string
}

function extractDestinations(docs: DocRow[], budgetFilter: string): Destination[] {
  const seen = new Map<string, Destination>()

  for (const doc of docs) {
    const content = doc.content || ''
    const lower = content.toLowerCase()

    // Try to extract destination name from content
    const destMatch = content.match(/(?:Destination|destination|City|city|Place|place):\s*([^.,:]+)/i)
    let name = destMatch ? destMatch[1].trim() : ''

    // Fallback: look for known patterns
    if (!name) {
      const locationMatch = content.match(/(?:trip to|visit|travel(?:ed)? to|in)\s+([A-Z][a-zA-Z\s]+?)(?:\.|,|\s+(?:is|was|for|from|and|with|which|that))/i)
      if (locationMatch) name = locationMatch[1].trim()
    }

    if (!name || name.length < 2 || name.length > 50) continue
    if (seen.has(name.toLowerCase())) continue

    // Extract region
    const regionMatch = content.match(/(?:Region|Country|Location|region|country):\s*([^.,:]+)/i)
    const region = regionMatch ? regionMatch[1].trim() : ''

    // Extract budget
    const budgetMatch = content.match(/(?:Budget|budget|Cost|cost):\s*([^.,:]+)/i)
    const budgetLevel = budgetMatch ? budgetMatch[1].trim() : ''

    // Apply budget filter
    if (budgetFilter && budgetLevel) {
      if (!budgetLevel.toLowerCase().includes(budgetFilter.toLowerCase())) continue
    }

    // Extract tags/keywords
    const tags: string[] = []
    const tagPatterns = [
      /(?:Best for|best for|Type|type|Category|category|Activities|activities):\s*([^.]+)/i,
      /(?:Highlights|highlights|Features|features):\s*([^.]+)/i,
    ]
    for (const pattern of tagPatterns) {
      const match = content.match(pattern)
      if (match) {
        const extracted = match[1].split(/[,;]/).map(t => t.trim()).filter(t => t.length > 1 && t.length < 30)
        tags.push(...extracted.slice(0, 4))
      }
    }

    // Build description snippet
    const sentences = content.split(/[.!]/).filter(s => s.trim().length > 20)
    const description = sentences.slice(0, 2).join('. ').trim() + '.'

    seen.set(name.toLowerCase(), {
      name,
      region,
      description: description.length > 200 ? description.slice(0, 200) + '...' : description,
      budget: budgetLevel,
      tags: [...new Set(tags)].slice(0, 4),
      source: doc.source,
    })
  }

  return Array.from(seen.values())
}
