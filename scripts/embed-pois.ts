/**
 * Generates and stores Gemini embeddings for all POIs that don't have one yet.
 *
 * Prerequisites:
 *   1. Run supabase/pois-embeddings.sql in the Supabase SQL editor.
 *   2. Add SUPABASE_SERVICE_ROLE_KEY to .env.local (Settings → API in Supabase dashboard).
 *
 * Run with:
 *   npx tsx scripts/embed-pois.ts
 */

import * as path from 'path'
import * as dotenv from 'dotenv'

// Must run before any other import that reads process.env
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'

interface Poi {
  id: number
  place_name: string
  city: string
  country: string
  type: string
  famous_for: string
  best_visit_month: string
}

async function run() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    console.error(
      'Missing env vars. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local'
    )
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, serviceKey)

  // Dynamic import so dotenv.config() runs first
  const { getGeminiEmbedding } = await import('../lib/embeddings')

  // Fetch only POIs that have no embedding yet so we can re-run safely
  const { data: pois, error } = await supabase
    .from('pois')
    .select('id, place_name, city, country, type, famous_for, best_visit_month')
    .is('embedding', null)

  if (error) {
    console.error('Failed to fetch POIs:', error.message)
    process.exit(1)
  }

  if (!pois || pois.length === 0) {
    console.log('All POIs already have embeddings. Nothing to do.')
    return
  }

  console.log(`Generating embeddings for ${pois.length} POIs…`)

  let done = 0
  let failed = 0

  for (const poi of pois as Poi[]) {
    const text =
      `${poi.place_name} in ${poi.city}, ${poi.country}. ` +
      `Type: ${poi.type}. ` +
      `Famous for: ${poi.famous_for}. ` +
      `Best visit months: ${poi.best_visit_month}.`

    try {
      const embedding = await getGeminiEmbedding(text)

      const { error: updateError } = await supabase
        .from('pois')
        .update({ embedding })
        .eq('id', poi.id)

      if (updateError) {
        console.error(`Save failed for "${poi.place_name}":`, updateError.message)
        failed++
      } else {
        done++
        if (done % 10 === 0) console.log(`  ${done} stored…`)
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`Embedding failed for "${poi.place_name}":`, msg)
      failed++
    }

    // 200 ms gap to stay within Gemini free-tier rate limits
    await new Promise(r => setTimeout(r, 200))
  }

  console.log(`\nComplete. Stored: ${done}  Failed: ${failed}`)
}

run().catch(e => {
  console.error('Fatal error:', e)
  process.exit(1)
})
