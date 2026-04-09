export interface RequestMetric {
  endpoint: string
  method: string
  durationMs: number
  ok: boolean
  statusCode: number
  timestamp: string
  errorMessage?: string
}

interface MonitoringStore {
  requests: RequestMetric[]
}

export interface EndpointMetrics {
  endpoint: string
  method: string
  requestCount: number
  failureCount: number
  averageLatencyMs: number
  latestStatusCode: number
  latestTimestamp: string
}

export interface MonitoringSnapshot {
  totals: {
    requestCount: number
    failureCount: number
    averageLatencyMs: number
    failureRate: number
  }
  endpointMetrics: EndpointMetrics[]
  recentFailures: RequestMetric[]
  latestRequest: RequestMetric | null
}

const MAX_REQUEST_HISTORY = 200

declare global {
  var __vaykaMonitoringStore__: MonitoringStore | undefined
}

function getMonitoringStore() {
  if (!globalThis.__vaykaMonitoringStore__) {
    globalThis.__vaykaMonitoringStore__ = {
      requests: [],
    }
  }

  return globalThis.__vaykaMonitoringStore__
}

export function recordRequestMetric(metric: Omit<RequestMetric, 'timestamp'>) {
  const store = getMonitoringStore()

  store.requests.unshift({
    ...metric,
    timestamp: new Date().toISOString(),
  })

  if (store.requests.length > MAX_REQUEST_HISTORY) {
    store.requests.length = MAX_REQUEST_HISTORY
  }
}

function buildEndpointMetrics(requests: RequestMetric[]) {
  const endpointMap = new Map<string, EndpointMetrics>()

  for (const request of requests) {
    const key = `${request.method}:${request.endpoint}`
    const existing = endpointMap.get(key)

    if (!existing) {
      endpointMap.set(key, {
        endpoint: request.endpoint,
        method: request.method,
        requestCount: 1,
        failureCount: request.ok ? 0 : 1,
        averageLatencyMs: request.durationMs,
        latestStatusCode: request.statusCode,
        latestTimestamp: request.timestamp,
      })
      continue
    }

    const nextCount = existing.requestCount + 1
    existing.averageLatencyMs =
      (existing.averageLatencyMs * existing.requestCount + request.durationMs) / nextCount
    existing.requestCount = nextCount
    existing.failureCount += request.ok ? 0 : 1
  }

  return [...endpointMap.values()].sort((a, b) => b.requestCount - a.requestCount)
}

export function getMonitoringSnapshot(): MonitoringSnapshot {
  const store = getMonitoringStore()
  const requests = store.requests
  const requestCount = requests.length
  const failureCount = requests.filter((request) => !request.ok).length
  const averageLatencyMs =
    requestCount === 0
      ? 0
      : requests.reduce((sum, request) => sum + request.durationMs, 0) / requestCount
  const failureRate = requestCount === 0 ? 0 : (failureCount / requestCount) * 100

  return {
    totals: {
      requestCount,
      failureCount,
      averageLatencyMs,
      failureRate,
    },
    endpointMetrics: buildEndpointMetrics(requests),
    recentFailures: requests.filter((request) => !request.ok).slice(0, 5),
    latestRequest: requests[0] ?? null,
  }
}
