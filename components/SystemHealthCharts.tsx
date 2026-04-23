'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { MonitoringSnapshot } from '../lib/monitoring';

export default function SystemHealthCharts({ metrics }: { metrics: MonitoringSnapshot }) {
  const endpointData = metrics.endpointMetrics.map(em => ({
    name: em.endpoint.split('/').pop() || em.endpoint,
    latency: Math.round(em.averageLatencyMs),
    requests: em.requestCount
  }));

  const failureData = [
    { name: 'Success', value: metrics.totals.requestCount - metrics.totals.failureCount },
    { name: 'Failure', value: metrics.totals.failureCount }
  ];

  const COLORS = ['#00502b', '#b3261e'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {/* Stat Card 1: Latency */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-black/5 flex flex-col justify-between h-56">
        <div>
          <p className="text-secondary text-sm font-medium mb-1">Latency</p>
          <h4 className="text-4xl font-headline text-primary font-bold">{Math.round(metrics.totals.averageLatencyMs)}<span className="text-lg opacity-50 ml-1 font-body">ms</span></h4>
        </div>
        <div className="mt-4 h-24 w-full">
          {endpointData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={endpointData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${value} ms`, 'Latency']}
                />
                <Bar dataKey="latency" fill="#00502b" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-end gap-1.5 h-full opacity-50">
               <div className="w-full bg-primary/20 rounded-t-sm h-1/2 rounded-full"></div>
               <div className="w-full bg-primary/20 rounded-t-sm h-3/4 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Stat Card 2: Failure Rate */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-black/5 flex flex-col justify-between h-56">
        <div>
          <p className="text-secondary text-sm font-medium mb-1">Failure Rate</p>
          <h4 className="text-4xl font-headline text-primary font-bold">{metrics.totals.failureRate.toFixed(1)}<span className="text-lg opacity-50 ml-1 font-body">%</span></h4>
        </div>
        <div className="mt-4 h-24 w-full">
           {metrics.totals.requestCount > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={failureData}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {failureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
           ) : (
              <svg className="w-full h-full drop-shadow-md opacity-50" viewBox="0 0 100 40">
                <path className="text-tertiary-container" d="M0,35 Q25,32 50,38 T100,30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></path>
              </svg>
           )}
        </div>
      </div>
      
      {/* Stat Card 3: Requests Observed */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-black/5 flex flex-col justify-between h-56">
        <div>
          <p className="text-secondary text-sm font-medium mb-1">Requests Observed</p>
          <h4 className="text-4xl font-headline text-primary font-bold">{metrics.totals.requestCount}<span className="text-lg opacity-50 ml-1 font-body">req</span></h4>
        </div>
        <div className="mt-4 h-24 w-full">
           {endpointData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={endpointData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [value, 'Requests']}
                />
                <Bar dataKey="requests" fill="#c3e8d1" radius={[4, 4, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-end gap-1.5 h-full opacity-50">
              <div className="w-full bg-secondary-container rounded-t-sm h-1/2 rounded-full"></div>
              <div className="w-full bg-secondary-container rounded-t-sm h-2/3 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
