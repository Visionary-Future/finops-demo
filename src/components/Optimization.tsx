'use client';

import React from 'react';
import MetricCard from './MetricCard';
import { IconDollar, IconServer, IconTrend, IconCloud } from './Icons';
import { useT } from '@/lib/i18n';
import { optimizationTable, formatPriceFull } from '@/lib/mock-data';

export default function Optimization() {
  const { t } = useT();
  const priorityLabels: Record<string, string> = { '高': t('status.high'), '中': t('status.medium'), '低': t('status.low') };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-4 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
        <MetricCard icon={<IconDollar size={16} />} title={t('optimization.totalOpportunity')} value={<><span className="text-base font-medium text-muted-foreground">¥</span>320,500</>} subtitle={t('optimization.totalOpportunitySub')} />
        <MetricCard icon={<IconServer size={16} />} title={t('optimization.idleResources')} value={<><span className="text-base font-medium text-muted-foreground">¥</span>185,200</>} subtitle={t('optimization.idleResourcesSub')} />
        <MetricCard icon={<IconTrend size={16} />} title={t('optimization.sizeOptimization')} value={<><span className="text-base font-medium text-muted-foreground">¥</span>98,300</>} subtitle={t('optimization.sizeOptimizationSub')} />
        <MetricCard icon={<IconCloud size={16} />} title={t('optimization.storageOptimization')} value={<><span className="text-base font-medium text-muted-foreground">¥</span>37,000</>} subtitle={t('optimization.storageOptimizationSub')} />
      </div>

      <div className="bg-card border border-border rounded-lg mb-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border"><h3 className="text-sm font-semibold text-foreground">{t('optimization.suggestionList')}</h3></div>
        <div className="p-0">
          <table className="table-shadcn"><thead><tr><th>{t('optimization.resourceId')}</th><th>{t('optimization.type')}</th><th>{t('billing.provider')}</th><th>{t('optimization.suggestion')}</th><th>{t('optimization.monthlySaving')}</th><th>{t('optimization.priority')}</th></tr></thead>
            <tbody>{optimizationTable.map((r,i)=>(<tr key={i}><td className="font-mono text-xs">{r.id}</td><td>{r.type}</td><td>{r.provider}</td><td>{r.suggestion}</td><td>¥{formatPriceFull(r.saving)}</td><td><span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${r.priority==='高'?'bg-red-50 text-red-600':r.priority==='中'?'bg-amber-50 text-amber-600':'bg-zinc-100 text-zinc-500'}`}>{priorityLabels[r.priority]}</span></td></tr>))}</tbody></table>
        </div>
      </div>
    </div>
  );
}