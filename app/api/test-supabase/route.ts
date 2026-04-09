import { NextResponse } from 'next/server'
import { recordRequestMetric } from '../../../lib/monitoring'

export async function GET() {
  const startedAt = Date.now()

  try {
    // Check if environment variables are set
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      recordRequestMetric({
        endpoint: '/api/test-supabase',
        method: 'GET',
        durationMs: Date.now() - startedAt,
        ok: false,
        statusCode: 500,
        errorMessage:
          'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.',
      })
      return NextResponse.json({
        success: false,
        message: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.'
      })
    }

    // Only import and test if environment variables are available
    const { testSupabaseConnection } = await import('../../../lib/supabase')
    const result = await testSupabaseConnection()
    recordRequestMetric({
      endpoint: '/api/test-supabase',
      method: 'GET',
      durationMs: Date.now() - startedAt,
      ok: result.success,
      statusCode: result.success ? 200 : 500,
      errorMessage: result.success ? undefined : result.message,
    })
    return NextResponse.json(result, { status: result.success ? 200 : 500 })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    recordRequestMetric({
      endpoint: '/api/test-supabase',
      method: 'GET',
      durationMs: Date.now() - startedAt,
      ok: false,
      statusCode: 500,
      errorMessage,
    })
    return NextResponse.json(
      { success: false, message: `Test failed: ${errorMessage}` },
      { status: 500 }
    )
  }
}
