import { NextResponse } from 'next/server'

export async function GET() {
  // Check if environment variables are set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({
      success: false,
      message: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.'
    })
  }

  // Only import and test if environment variables are available
  try {
    const { testSupabaseConnection } = await import('../../../lib/supabase')
    const result = await testSupabaseConnection()
    return NextResponse.json(result)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { success: false, message: `Test failed: ${errorMessage}` },
      { status: 500 }
    )
  }
}