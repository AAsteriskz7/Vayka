import Link from 'next/link';
import KnowledgeBaseManager from '../../components/KnowledgeBaseManager';
import KnowledgeBaseControls from '../../components/KnowledgeBaseControls';
import { getMonitoringSnapshot } from '../../lib/monitoring'

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
                  <span className="text-secondary font-medium">Failed Requests</span>
                  <span className="font-bold text-primary">{metrics.totals.failureCount}</span>
                </div>
                <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${Math.min(metrics.totals.failureRate, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-secondary font-medium">Latest Request</span>
                  <span className="font-bold text-primary">
                    {metrics.latestRequest ? `${metrics.latestRequest.method} ${metrics.latestRequest.endpoint}` : 'No traffic'}
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-full rounded-full"></div>
                </div>
              </div>
              
              <div className="pt-6">
                <h4 className="text-sm font-label text-secondary font-bold mb-4 uppercase tracking-widest">Recent Failures</h4>
                <div className="rounded-2xl bg-surface-container p-5 border border-white shadow-inner">
                  {metrics.recentFailures.length > 0 ? (
                    <div className="space-y-4">
                      {metrics.recentFailures.map((failure) => (
                        <div key={`${failure.timestamp}-${failure.endpoint}`} className="rounded-2xl bg-surface-container-lowest p-4">
                          <p className="font-bold text-primary text-sm">{failure.method} {failure.endpoint}</p>
                          <p className="text-xs text-secondary mt-1">
                            {failure.statusCode} at {formatTimestamp(failure.timestamp)} in {Math.round(failure.durationMs)} ms
                          </p>
                          <p className="text-xs text-secondary mt-2">{failure.errorMessage || 'Unknown error'}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-secondary">No failures recorded in the current monitoring window.</p>
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

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[800px] space-y-3">
                {/* Table Header */}
                <div className="grid grid-cols-12 px-6 py-4 text-xs font-label font-bold text-secondary uppercase tracking-[0.2em] opacity-80 border-b border-surface-variant">
                  <div className="col-span-5">Source Name</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Last Updated</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>
                
                {/* Row 1 */}
                <div className="grid grid-cols-12 px-6 py-5 bg-surface-container-low rounded-2xl items-center transition-all hover:bg-surface-container-high group border border-transparent hover:border-black/5 hover:shadow-sm cursor-pointer">
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined">description</span>
                    </div>
                    <div>
                      <p className="font-bold text-primary">Mediterranean_Destinations_2024.pdf</p>
                      <p className="text-xs text-secondary font-medium mt-1">3,420 vectors indexed</p>
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-secondary font-medium">PDF Document</div>
                  <div className="col-span-2 text-sm text-secondary font-medium bg-surface px-3 py-1.5 rounded-full inline-block max-w-fit">2 hours ago</div>
                  <div className="col-span-2">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-tertiary-container/10 text-tertiary-container rounded-full text-xs font-bold border border-tertiary-container/20">
                      <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                      Synced
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-surface-container rounded-full outline-none">
                      <span className="material-symbols-outlined text-secondary">more_vert</span>
                    </button>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-12 px-6 py-5 bg-transparent rounded-2xl items-center transition-all hover:bg-surface-container-low group cursor-pointer border border-transparent hover:border-black/5">
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-tertiary-fixed-dim rounded-2xl flex items-center justify-center text-tertiary shadow-sm">
                      <span className="material-symbols-outlined">public</span>
                    </div>
                    <div>
                      <p className="font-bold text-primary">Kyoto_Tourism_Portal_Crawler</p>
                      <p className="text-xs text-secondary font-medium mt-1">Automated Web Sync</p>
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-secondary font-medium">Web Crawler</div>
                  <div className="col-span-2 text-sm text-secondary font-medium bg-surface px-3 py-1.5 rounded-full inline-block max-w-fit">Just now</div>
                  <div className="col-span-2">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold border border-primary/20">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      Updating
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-surface-container rounded-full outline-none">
                      <span className="material-symbols-outlined text-secondary">more_vert</span>
                    </button>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-12 px-6 py-5 bg-surface-container-low rounded-2xl items-center transition-all hover:bg-surface-container-high group cursor-pointer border border-transparent hover:border-black/5">
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined">csv</span>
                    </div>
                    <div>
                      <p className="font-bold text-primary">Luxury_Hotel_Feedback_2023.csv</p>
                      <p className="text-xs text-secondary font-medium mt-1">Sentiment analysis layer enabled</p>
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-secondary font-medium">Structured Data</div>
                  <div className="col-span-2 text-sm text-secondary font-medium bg-surface px-3 py-1.5 rounded-full inline-block max-w-fit">Oct 12, 2023</div>
                  <div className="col-span-2">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-tertiary-container/10 text-tertiary-container rounded-full text-xs font-bold border border-tertiary-container/20">
                      <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                      Synced
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-surface-container rounded-full outline-none">
                      <span className="material-symbols-outlined text-secondary">more_vert</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
