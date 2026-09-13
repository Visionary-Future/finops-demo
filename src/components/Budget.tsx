'use client';

import React from 'react';
import MetricCard from './MetricCard';
import { IconDollar, IconChart, IconCheck, IconBell } from './Icons';
import { useT } from '@/lib/i18n';
import { budgetOverview, budgetDetails, formatPriceFull } from '@/lib/mock-data';

export default function Budget() {
  const { t } = useT();
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-4 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
        <MetricCard icon={<IconDollar size={16} />} title={t('budget.totalBudget')} value={<><span className="text-base font-medium text-muted-foreground">¥</span>{formatPriceFull(budgetOverview.total)}</>} subtitle={t('budget.totalBudgetSub')} />
        <MetricCard icon={<IconChart size={16} />} title={t('budget.currentSpend')} value={<><span className="text-base font-medium text-muted-foreground">¥</span>{formatPriceFull(budgetOverview.spent)}</>} subtitle={`${t('budget.usageRate')} ${budgetOverview.usageRate}%`} subtitleColor="text-red-500" />
        <MetricCard icon={<IconCheck size={16} />} title={t('budget.remaining')} value={<><span className="text-base font-medium text-muted-foreground">¥</span>{formatPriceFull(budgetOverview.remaining)}</>} subtitle={t('budget.remainingSub')} />
        <MetricCard icon={<IconBell size={16} />} title={t('budget.warnTitle')} value={<span className="text-amber-500">{budgetOverview.warnCount} {t('table.name') ? '' : ''}</span>} subtitle={t('budget.warnSub')} />
      </div>

      <div className="bg-card border border-border rounded-lg mb-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border"><h3 className="text-sm font-semibold text-foreground">{t('budget.detailTitle')}</h3></div>
        <div className="p-0">
          <table className="table-shadcn"><thead><tr><th>{t('billing.provider')}</th><th>{t('budget.budgetAmount')}</th><th>{t('budget.actualSpend')}</th><th>{t('budget.usageRate')}</th><th>{t('budget.status')}</th></tr></thead>
            <tbody>{budgetDetails.map((r,i)=>(<tr key={i}><td>{r.provider}</td><td>¥{formatPriceFull(r.budget)}</td><td>¥{formatPriceFull(r.spent)}</td><td>{r.rate}%</td><td><span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${r.status==='超预算'?'bg-red-50 text-red-600':'bg-amber-50 text-amber-600'}`}>{r.status==='超预算'?t('budget.overBudget'):t('budget.warning')}</span></td></tr>))}</tbody></table>
        </div>
      </div>
    </div>
  );
}