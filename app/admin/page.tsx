import Link from 'next/link';
import KnowledgeBaseManager from '../../components/KnowledgeBaseManager';
import KnowledgeBaseControls from '../../components/KnowledgeBaseControls';
import UsageLogControls from '../../components/UsageLogControls';
import { getMonitoringSnapshot } from '../../lib/monitoring'
import { getUsageLogsSnapshot } from '../../lib/usage-logs'
import { getKnowledgeBaseSources } from '../../lib/knowledge-base'
import KnowledgeBaseList from '../../components/KnowledgeBaseList'

export const dynamic = 'force-dynamic'

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString()
}

function getSystemStatus(failureRate: number) {
  if (failureRate >= 25) return 'Degraded'
  if (failureRate > 0) return 'Warning'
  return 'Operational'
}

export default async function AdminDashboard() {
  const metrics = getMonitoringSnapshot()
  const systemStatus = getSystemStatus(metrics.totals.failureRate)
  const usageLogs = await getUsageLogsSnapshot()
  const sources = await getKnowledgeBaseSources()

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full z-40 flex-col p-8 lg:p-12 overflow-y-auto bg-surface-bright dark:bg-[#1a1c1a] rounded-r-[3rem] w-64 lg:w-80 shadow-xl hidden md:flex border-r border-surface-variant">
        <div className="mb-12">
          <h1 className="font-headline text-primary text-2xl font-bold">Vayka</h1>
          <p className="font-body tracking-tight text-secondary-container-on mt-1 text-xs opacity-60">Admin Dashboard</p>
        </div>
        <nav className="flex-1 space-y-6">
          <div className="space-y-4 flex flex-col">
            <Link className="flex items-center gap-4 text-teal-900 dark:text-teal-50 font-bold border-l-4 border-teal-900 dark:border-teal-50 pl-4 py-2 bg-teal-500/10 rounded-r-full transition-colors" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-body tracking-tight">System Health</span>
            </Link>
            <Link className="flex items-center gap-4 text-teal-700/60 dark:text-teal-200/60 pl-4 py-2 hover:text-teal-900 hover:bg-teal-500/5 rounded-r-full transition-colors" href="#">
              <span className="material-symbols-outlined">database</span>
              <span className="font-body tracking-tight">Knowledge Base</span>
            </Link>
            <Link className="flex items-center gap-4 text-teal-700/60 dark:text-teal-200/60 pl-4 py-2 hover:text-teal-900 hover:bg-teal-500/5 rounded-r-full transition-colors" href="#">
              <span className="material-symbols-outlined">monitoring</span>
              <span className="font-body tracking-tight">Usage Analytics</span>
            </Link>
            <Link className="flex items-center gap-4 text-teal-700/60 dark:text-teal-200/60 pl-4 py-2 hover:text-teal-900 hover:bg-teal-500/5 rounded-r-full transition-colors" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-body tracking-tight">Settings</span>
            </Link>
          </div>
        </nav>
        <div className="mt-auto pt-8">
          <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white rounded-xl py-4 px-4 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">upload_file</span>
            <span className="text-sm">Upload DB</span>
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-0 md:ml-64 lg:ml-80 min-h-screen p-6 md:p-12 lg:p-16">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-secondary font-label text-sm uppercase tracking-widest mb-2 block">System Overview</span>
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold">Vayka Curators</h2>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col text-right mr-4">
              <span className="font-label text-xs text-secondary">System Status</span>
              <span className="font-medium text-tertiary-container flex items-center justify-end gap-2 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container shadow-[0_0_8px_rgba(0,80,43,0.5)] animate-pulse"></span>
                {systemStatus}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-full object-cover" data-alt="professional male profile headshot with neutral background and soft studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNeuzUhYlZkWnQucWlNcwruJkOSyJDgvgOvNf_Q-1p2AplWb18KoUEc-2XinER_S9hBtTPYZT4u7feP4q08tYhJp00kUyTAxrAICmwNfI9cfWgJwGDL1fGU1hlyTeFcM5BlDN5bcZCK84w7Fqfm94ywyRSQuC4m8AYGJANFsYCscI508v9_wdrfdgEUtIyyecA6OEGaAOlqwmH963uAK1HXKGAjGXApdwHQFN_5ToONf2qVvTeRbDSjBdWd2FbAYrYruPL79ogImY4" alt="Admin" />
            </div>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* System Health Section */}
          <section className="col-span-1 xl:col-span-8 bg-surface-container rounded-3xl p-8 lg:p-10 relative overflow-hidden shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline text-2xl text-primary font-bold">System Health</h3>
              <div className="flex gap-2">
                <span className="px-4 py-1.5 bg-surface-container-lowest rounded-full text-xs font-label font-bold tracking-wider text-secondary">REAL-TIME</span>
              </div>
            </div>
            
            {/* Stat Cards - responsive grid avoids overlapping */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Stat Card 1 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-black/5 flex flex-col justify-between">
                <div>
                  <p className="text-secondary text-sm font-medium mb-1">Latency</p>
                  <h4 className="text-4xl font-headline text-primary font-bold">{Math.round(metrics.totals.averageLatencyMs)}<span className="text-lg opacity-50 ml-1 font-body">ms</span></h4>
                </div>
                <div className="mt-8 h-12 w-full flex items-end gap-1.5">
                  <div className="w-full bg-primary/20 rounded-t-sm h-1/2 rounded-full"></div>
                  <div className="w-full bg-primary/20 rounded-t-sm h-3/4 rounded-full"></div>
                  <div className="w-full bg-primary/20 rounded-t-sm h-1/3 rounded-full"></div>
                  <div className="w-full bg-primary/40 rounded-t-sm h-2/3 rounded-full"></div>
                  <div className="w-full bg-primary/80 rounded-t-sm h-full rounded-full"></div>
                  <div className="w-full bg-primary/20 rounded-t-sm h-1/2 rounded-full"></div>
                </div>
              </div>
              
              {/* Stat Card 2 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-black/5 flex flex-col justify-between">
                <div>
                  <p className="text-secondary text-sm font-medium mb-1">Failure Rate</p>
                  <h4 className="text-4xl font-headline text-primary font-bold">{metrics.totals.failureRate.toFixed(1)}<span className="text-lg opacity-50 ml-1 font-body">%</span></h4>
                </div>
                <div className="mt-8 h-12 w-full flex items-end">
                  <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 40">
                    <path className="text-tertiary-container" d="M0,35 Q25,32 50,38 T100,30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></path>
                  </svg>
                </div>
              </div>
              
              {/* Stat Card 3 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-black/5 flex flex-col justify-between">
                <div>
                  <p className="text-secondary text-sm font-medium mb-1">Requests Observed</p>
                  <h4 className="text-4xl font-headline text-primary font-bold">{metrics.totals.requestCount}<span className="text-lg opacity-50 ml-1 font-body">req</span></h4>
                </div>
                <div className="mt-8 h-12 w-full flex items-end gap-1.5">
                  <div className="w-full bg-secondary-container rounded-t-sm h-1/2 rounded-full"></div>
                  <div className="w-full bg-secondary-container rounded-t-sm h-2/3 rounded-full"></div>
                  <div className="w-full bg-secondary-container rounded-t-sm h-1/3 rounded-full"></div>
                  <div className="w-full bg-secondary-container rounded-t-sm h-3/4 rounded-full"></div>
                  <div className="w-full bg-secondary-container rounded-t-sm h-1/2 rounded-full"></div>
                  <div className="w-full bg-secondary-container rounded-t-sm h-4/5 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="text-sm font-label text-secondary font-bold mb-4 uppercase tracking-widest">Endpoint Health</h4>
              <div className="space-y-3">
                {metrics.endpointMetrics.length > 0 ? (
                  metrics.endpointMetrics.map((endpointMetric) => (
                    <div
                      key={`${endpointMetric.method}-${endpointMetric.endpoint}`}
                      className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-black/5 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary bg-primary/5 p-2 rounded-lg">monitoring</span>
                        <div>
                          <span className="font-bold text-primary block">{endpointMetric.method} {endpointMetric.endpoint}</span>
                          <span className="text-xs text-secondary">
                            {endpointMetric.requestCount} req, avg {Math.round(endpointMetric.averageLatencyMs)} ms
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-label font-bold text-tertiary-container bg-tertiary-fixed-dim px-4 py-1.5 rounded-full">
                        {endpointMetric.failureCount} fail
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-surface-container-lowest rounded-xl border border-black/5 shadow-sm text-sm text-secondary">
                    No API activity recorded yet. Use the chat, ingestion, or test endpoints to populate monitoring data.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Usage Analytics Section */}
          <section className="col-span-1 xl:col-span-4 bg-surface-container-highest rounded-3xl p-8 lg:p-10 flex flex-col shadow-sm">
            <h3 className="font-headline text-2xl text-primary font-bold mb-8">Usage Analytics</h3>
            <div className="flex-1 space-y-10">
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-secondary font-medium">Persisted Log Rows</span>
                  <span className="font-bold text-primary">{usageLogs.available ? usageLogs.totalCount : 0}</span>
                </div>
                <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${usageLogs.available ? Math.min((usageLogs.totalCount / Math.max(usageLogs.totalCount, 1)) * 100, 100) : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-secondary font-medium">Average Logged Latency</span>
                  <span className="font-bold text-primary">
                    {usageLogs.available ? `${Math.round(usageLogs.averageLatencyMs)} ms` : 'Unavailable'}
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-full rounded-full"></div>
                </div>
              </div>
              
              <div className="pt-6">
                <h4 className="text-sm font-label text-secondary font-bold mb-4 uppercase tracking-widest">Usage Logs</h4>
                <div className="mb-4">
                  <UsageLogControls />
                </div>
                <div className="rounded-2xl bg-surface-container p-5 border border-white shadow-inner">
                  {!usageLogs.configured ? (
                    <p className="text-sm text-secondary">Supabase is not configured for this environment.</p>
                  ) : !usageLogs.available ? (
                    <p className="text-sm text-secondary">{usageLogs.errorMessage}</p>
                  ) : usageLogs.recentLogs.length > 0 ? (
                    <div className="space-y-4">
                      {usageLogs.recentLogs.map((log) => (
                        <div key={log.id} className="rounded-2xl bg-surface-container-lowest p-4">
                          <p className="font-bold text-primary text-sm">{log.method} {log.endpoint}</p>
                          <p className="text-xs text-secondary mt-1">
                            {log.status_code} at {formatTimestamp(log.created_at)} in {Math.round(log.duration_ms)} ms
                          </p>
                          <p className="text-xs text-secondary mt-2">{log.error_message || 'Request completed successfully.'}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-secondary">No usage logs recorded yet.</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Knowledge Base Management Section */}
          <section className="col-span-1 xl:col-span-12 bg-surface-container-lowest rounded-3xl p-8 lg:p-10 shadow-[0px_20px_40px_rgba(26,28,26,0.06)] border border-surface-variant/50">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
              <div>
                <h3 className="font-headline text-3xl text-primary font-bold">Knowledge Base</h3>
                <p className="text-secondary mt-2 font-medium">Curate and monitor the fluid data feeding the Vayka AI engine.</p>
              </div>
            </div>

            <KnowledgeBaseControls />

            <KnowledgeBaseManager />

            <KnowledgeBaseList initialSources={sources} />

            <div className="mt-8 flex justify-center border-t border-surface-variant pt-8">
              <button className="text-primary font-label text-sm uppercase tracking-widest font-bold hover:bg-primary/5 px-6 py-3 rounded-full transition-all flex items-center gap-2">
                View All Repository Items
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
