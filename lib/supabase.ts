import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create client only if environment variables are set
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Test connection function (optional - for development)
export async function testSupabaseConnection() {
  if (!supabase) {
    return { success: false, message: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.' }
  }

  try {
    // First, test basic connectivity by getting the current user (should work even without tables)
    const { data, error } = await supabase.auth.getUser()

    // If we get here without error, connection is working
    // Note: getUser() might return an error if no user is logged in, but that's expected
    if (error && error.message !== 'Auth session missing!') {
      throw error
    }

    return { success: true, message: 'Supabase connection successful' }
  } catch (error) {
    console.error('Supabase connection error:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return { success: false, message: `Supabase connection failed: ${errorMessage}` }
  }
}