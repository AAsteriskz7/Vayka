import { supabase } from './supabase'

export interface UsageLogEntryInput {
  endpoint: string
  method: string
  statusCode: number
  durationMs: number
  ok: boolean
  errorMessage?: string
}

export interface UsageLogRow {
  id: string
  endpoint: string
  method: string
  status_code: number
  duration_ms: number
  ok: boolean
  error_message: string | null
  created_at: string
}

export interface UsageLogsSnapshot {
  configured: boolean
  available: boolean
  errorMessage: string | null
  totalCount: number
  failureCount: number
  averageLatencyMs: number
  recentLogs: UsageLogRow[]
}

export async function appendUsageLog(entry: UsageLogEntryInput) {
  if (!supabase) {
    return
  }

  const { error } = await supabase.from('usage_logs').insert([
    {
      endpoint: entry.endpoint,
      method: entry.method,
      status_code: entry.statusCode,
      duration_ms: entry.durationMs,
      ok: entry.ok,
      error_message: entry.errorMessage ?? null,
    },
  ])

  if (error) {
    throw new Error(error.message)
  }
}

export async function safelyAppendUsageLog(entry: UsageLogEntryInput) {
  try {
    await appendUsageLog(entry)
  } catch (error) {
    console.error('Failed to persist usage log:', error)
  }
}

export async function clearUsageLogs() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Check your environment variables.')
  }

  const { count, error: countError } = await supabase
    .from('usage_logs')
    .select('*', { count: 'exact', head: true })

  if (countError) {
    throw new Error(countError.message)
  }

  const { error } = await supabase
    .from('usage_logs')
    .delete()
    .not('id', 'is', null)

  if (error) {
    throw new Error(error.message)
  }

  return {
    success: true,
    clearedLogs: count ?? 0,
  }
}

export async function getUsageLogsSnapshot(limit = 12): Promise<UsageLogsSnapshot> {
  if (!supabase) {
    return {
      configured: false,
      available: false,
      errorMessage: 'Supabase is not configured.',
      totalCount: 0,
      failureCount: 0,
      averageLatencyMs: 0,
      recentLogs: [],
    }
  }

  try {
    const [{ count, error: countError }, { data, error: dataError }] = await Promise.all([
      supabase.from('usage_logs').select('*', { count: 'exact', head: true }),
      supabase
        .from('usage_logs')
        .select('id, endpoint, method, status_code, duration_ms, ok, error_message, created_at')
        .order('created_at', { ascending: false })
        .limit(limit),
    ])

    if (countError) {
      throw new Error(countError.message)
    }
    if (dataError) {
      throw new Error(dataError.message)
    }

    const recentLogs = (data || []) as UsageLogRow[]
    const failureCount = recentLogs.filter((log) => !log.ok).length
    const averageLatencyMs =
      recentLogs.length === 0
        ? 0
        : recentLogs.reduce((sum, log) => sum + log.duration_ms, 0) / recentLogs.length

    return {
      configured: true,
      available: true,
      errorMessage: null,
      totalCount: count ?? recentLogs.length,
      failureCount,
      averageLatencyMs,
      recentLogs,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown usage log error.'
    return {
      configured: true,
      available: false,
      errorMessage: message,
      totalCount: 0,
      failureCount: 0,
      averageLatencyMs: 0,
      recentLogs: [],
    }
  }
}
