import Link from 'next/link';
import KnowledgeBaseManager from '../../components/KnowledgeBaseManager';
import KnowledgeBaseControls from '../../components/KnowledgeBaseControls';
import { getMonitoringSnapshot } from '../../lib/monitoring'
import { getUsageLogsSnapshot } from '../../lib/usage-logs'
import { getKnowledgeBaseSources } from '../../lib/knowledge-base'
import type { Metadata } from 'next';
import KnowledgeBaseList from '../../components/KnowledgeBaseList'
import SystemHealthCharts from '../../components/SystemHealthCharts'
import SettingsTab from '../../components/SettingsTab'
import AnalyticsTab from '../../components/AnalyticsTab'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Vayka Admin Dashboard for managing knowledge base, monitoring health, and analyzing usage.",
};

function getSystemStatus(failureRate: number) {
  if (failureRate >= 25) return 'Degraded'
  if (failureRate > 0) return 'Warning'
  return 'Operational'
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminDashboard(props: Props) {
  const resolvedSearchParams = await props.searchParams;
  const currentTab = typeof resolvedSearchParams.tab === 'string' ? resolvedSearchParams.tab : 'health';

  const metrics = getMonitoringSnapshot()
  const systemStatus = getSystemStatus(metrics.totals.failureRate)
  const usageLogs = await getUsageLogsSnapshot(100)
  const sources = await getKnowledgeBaseSources()

  const getTabClass = (tab: string) => {
    if (currentTab === tab) {
      return "flex items-center gap-4 text-teal-900 dark:text-teal-50 font-bold border-l-4 border-teal-900 dark:border-teal-50 pl-4 py-2 bg-teal-500/10 rounded-r-full transition-colors";
    }
    return "flex items-center gap-4 text-teal-700/60 dark:text-teal-200/60 pl-4 py-2 hover:text-teal-900 hover:bg-teal-500/5 rounded-r-full transition-colors border-l-4 border-transparent";
  };

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
            <Link className={getTabClass('health')} href="?tab=health">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-body tracking-tight">System Health</span>
            </Link>
            <Link className={getTabClass('knowledge')} href="?tab=knowledge">
              <span className="material-symbols-outlined">database</span>
              <span className="font-body tracking-tight">Knowledge Base</span>
            </Link>
            <Link className={getTabClass('analytics')} href="?tab=analytics">
              <span className="material-symbols-outlined">monitoring</span>
              <span className="font-body tracking-tight">Usage Analytics</span>
            </Link>
            <Link className={getTabClass('settings')} href="?tab=settings">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-body tracking-tight">Settings</span>
            </Link>
          </div>
        </nav>
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
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-sm">
              <span className="text-white font-headline font-bold">AD</span>
            </div>
          </div>
        </header>

        {/* Content based on selected tab */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* System Health Tab */}
          {currentTab === 'health' && (
            <section className="col-span-1 bg-surface-container rounded-3xl p-8 lg:p-10 relative overflow-hidden shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline text-2xl text-primary font-bold">System Health</h3>
              <div className="flex gap-2">
                <span className="px-4 py-1.5 bg-surface-container-lowest rounded-full text-xs font-label font-bold tracking-wider text-secondary">REAL-TIME</span>
              </div>
            </div>
            
            <SystemHealthCharts metrics={metrics} />

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
          )}

          {/* Usage Analytics Tab */}
          {currentTab === 'analytics' && (
            <AnalyticsTab usageLogs={usageLogs} />
          )}

          {/* Knowledge Base Management Tab */}
          {currentTab === 'knowledge' && (
            <section className="col-span-1 bg-surface-container-lowest rounded-3xl p-8 lg:p-10 shadow-[0px_20px_40px_rgba(26,28,26,0.06)] border border-surface-variant/50">
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
          )}

          {/* Settings Tab */}
          {currentTab === 'settings' && (
            <SettingsTab />
          )}
        </div>
      </main>
    </div>
  );
}
