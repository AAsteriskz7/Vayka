'use client';

import React, { useState } from 'react';
import type { UsageLogsSnapshot } from '../lib/usage-logs';
import UsageLogControls from './UsageLogControls';

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString();
}

export default function AnalyticsTab({ usageLogs }: { usageLogs: UsageLogsSnapshot }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  const filteredLogs = usageLogs.recentLogs.filter(log => {
    const matchesSearch = log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (log.error_message && log.error_message.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!matchesSearch) return false;
    
    if (statusFilter === 'success') return log.ok;
    if (statusFilter === 'error') return !log.ok;
    
    return true;
  });

  return (
    <section className="col-span-1 bg-surface-container-highest rounded-3xl p-8 lg:p-10 flex flex-col shadow-sm border border-surface-variant/50">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h3 className="font-headline text-3xl text-primary font-bold mb-2">Usage Analytics</h3>
          <p className="text-secondary">Monitor API requests, latencies, and errors across the system.</p>
        </div>
        <div className="flex gap-4">
          <UsageLogControls />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface-container p-6 rounded-2xl border border-surface-variant">
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
        <div className="bg-surface-container p-6 rounded-2xl border border-surface-variant">
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
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input 
          type="text"
          placeholder="Search endpoints or errors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-2xl border border-surface-variant bg-surface px-4 py-3 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-2xl border border-surface-variant bg-surface px-4 py-3 text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 w-full md:w-48"
        >
          <option value="all">All Statuses</option>
          <option value="success">Success (2xx)</option>
          <option value="error">Errors (4xx, 5xx)</option>
        </select>
      </div>

      {/* Log Table */}
      <div className="bg-surface-container rounded-2xl border border-surface-variant overflow-hidden">
        {!usageLogs.configured ? (
          <div className="p-8 text-center text-secondary">Supabase is not configured for this environment.</div>
        ) : !usageLogs.available ? (
          <div className="p-8 text-center text-error">{usageLogs.errorMessage}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-surface-variant/30 text-secondary">
                <tr>
                  <th className="px-6 py-4 font-label font-bold tracking-wider uppercase text-xs">Status</th>
                  <th className="px-6 py-4 font-label font-bold tracking-wider uppercase text-xs">Method & Endpoint</th>
                  <th className="px-6 py-4 font-label font-bold tracking-wider uppercase text-xs">Latency</th>
                  <th className="px-6 py-4 font-label font-bold tracking-wider uppercase text-xs">Timestamp</th>
                  <th className="px-6 py-4 font-label font-bold tracking-wider uppercase text-xs">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant/50">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <React.Fragment key={log.id}>
                      <tr className="hover:bg-surface-variant/20 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${log.ok ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
                            {log.status_code}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-primary mr-2">{log.method}</span>
                          <span className="text-secondary">{log.endpoint}</span>
                        </td>
                        <td className="px-6 py-4 text-secondary">{Math.round(log.duration_ms)} ms</td>
                        <td className="px-6 py-4 text-secondary">{formatTimestamp(log.created_at)}</td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
                            className="text-primary hover:underline font-medium text-xs flex items-center gap-1"
                          >
                            {selectedLog === log.id ? 'Hide' : 'Inspect'}
                            <span className="material-symbols-outlined text-sm">{selectedLog === log.id ? 'expand_less' : 'expand_more'}</span>
                          </button>
                        </td>
                      </tr>
                      {selectedLog === log.id && (
                        <tr key={`detail-${log.id}`}>
                          <td colSpan={5} className="px-6 py-4 bg-surface-container-lowest">
                            <div className="rounded-xl border border-surface-variant p-4 space-y-3">
                              <h4 className="font-headline font-bold text-primary text-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">data_object</span>
                                Request Details
                              </h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                <div>
                                  <span className="text-secondary block mb-1">Status</span>
                                  <span className={`font-bold ${log.ok ? 'text-primary' : 'text-error'}`}>{log.status_code} {log.ok ? 'OK' : 'Error'}</span>
                                </div>
                                <div>
                                  <span className="text-secondary block mb-1">Method</span>
                                  <span className="font-bold text-on-surface">{log.method}</span>
                                </div>
                                <div>
                                  <span className="text-secondary block mb-1">Endpoint</span>
                                  <span className="font-bold text-on-surface">{log.endpoint}</span>
                                </div>
                                <div>
                                  <span className="text-secondary block mb-1">Latency</span>
                                  <span className="font-bold text-on-surface">{Math.round(log.duration_ms)} ms</span>
                                </div>
                              </div>
                              <div>
                                <span className="text-secondary text-xs block mb-1">Timestamp</span>
                                <span className="text-on-surface text-xs">{formatTimestamp(log.created_at)}</span>
                              </div>
                              {log.error_message ? (
                                <div>
                                  <span className="text-error text-xs font-bold block mb-1">Error Message</span>
                                  <div className="bg-error/5 text-error p-3 rounded-lg font-mono text-xs whitespace-pre-wrap break-all max-h-40 overflow-y-auto">
                                    {log.error_message}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-secondary text-xs italic">Request completed successfully. No error payload.</div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-secondary">No logs found matching your filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </section>
  );
}
