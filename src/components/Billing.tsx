'use client';

import React, { useMemo } from 'react';
import ChartCard from './ChartCard';
import { useT } from '@/lib/i18n';
import { billingTableData, alibabaProducts, azureProducts, formatPriceFull } from '@/lib/mock-data';

const COLORS = ['#f97316', '#3b82f6', '#6366f1'];

export default function Billing() {
  const { t } = useT();
  const trendOption = useMemo(() => ({
    color: COLORS, tooltip: { trigger: 'axis' as const, backgroundColor: '#fff', borderColor: '#e4e4e7', textStyle: { color: '#18181b', fontSize: 13 } },
    legend: { data: [t('providers.alibaba'), 'Azure', 'K8s'], top: 8, textStyle: { fontSize: 12 } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: { type: 'category' as const, data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月'], axisLabel: { fontSize: 11, color: '#737373' } },
    yAxis: { type: 'value' as const, axisLabel: { formatter: (v: number) => '¥' + (v / 10000).toFixed(0) + '万', fontSize: 11 }, splitLine: { lineStyle: { color: '#f4f4f5' } } },
    series: [
      { name: t('providers.alibaba'), type: 'bar' as const, stack: 'total', data: [120,128,132,138,142,145,147,149,152].map(v=>v*10000) },
      { name: 'Azure', type: 'bar' as const, stack: 'total', data: [78,83,87,90,92,95,97,99,101].map(v=>v*10000) },
      { name: 'K8s', type: 'bar' as const, stack: 'total', data: [20,21,22,24,24,25,25,27,42].map(v=>v*10000), itemStyle: { borderRadius: [4,4,0,0] } },
    ],
  }), [t]);

  const alibabaOption = useMemo(() => ({
    color: alibabaProducts.map(d=>d.color), tooltip: { trigger: 'item' as const, formatter: '{b}: ¥{c} ({d}%)' },
    series: [{ type: 'pie' as const, radius: ['50%','75%'], center: ['50%','50%'], itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 }, label: { formatter: '{b}\n{d}%', fontSize: 11 }, data: alibabaProducts.map(d=>({ name: d.name, value: d.value })) }],
  }), []);

  const azureOption = useMemo(() => ({
    color: azureProducts.map(d=>d.color), tooltip: { trigger: 'item' as const, formatter: '{b}: ¥{c} ({d}%)' },
    series: [{ type: 'pie' as const, radius: ['50%','75%'], center: ['50%','50%'], itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 }, label: { formatter: '{b}\n{d}%', fontSize: 11 }, data: azureProducts.map(d=>({ name: d.name, value: d.value })) }],
  }), []);

  return (
    <div>
      <div className="flex items-end gap-3 flex-wrap mb-4 p-4 bg-card border border-border rounded-lg">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">{t('billing.contractPeriod')}</label>
          <select className="h-9 px-3 border border-input rounded-md text-sm bg-background text-foreground min-w-[140px] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 appearance-none cursor-pointer"><option>2025-2026</option><option>2026-2027</option></select>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center h-9 px-4 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">{t('billing.query')}</button>
          <button className="inline-flex items-center h-9 px-4 rounded-md text-sm font-medium bg-background border border-input text-foreground hover:bg-accent transition-colors">{t('billing.refresh')}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <ChartCard title={t('billing.trendTitle')} chartId="chart-billing-trend" height={320} option={trendOption} />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 max-[1200px]:grid-cols-1">
        <ChartCard title={t('billing.alibabaProducts')} chartId="chart-alibaba" height={300} option={alibabaOption} />
        <ChartCard title={t('billing.azureProducts')} chartId="chart-azure" height={300} option={azureOption} />
      </div>

      <div className="bg-card border border-border rounded-lg mb-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border"><h3 className="text-sm font-semibold text-foreground">{t('billing.detailTitle')}</h3></div>
        <div className="p-0">
          <table className="table-shadcn"><thead><tr><th>{t('billing.provider')}</th><th>{t('billing.product')}</th><th>{t('billing.cost')}</th><th>{t('billing.percentage')}</th><th>{t('billing.change')}</th></tr></thead>
            <tbody>{billingTableData.map((r,i)=>(<tr key={i}><td>{r.provider}</td><td>{r.product}</td><td>¥{formatPriceFull(r.cost)}</td><td>{r.percentage}</td><td><span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${r.change>=0?'bg-red-50 text-red-600':'bg-emerald-50 text-emerald-600'}`}>{r.change>=0?'+':''}{r.change}%</span></td></tr>))}</tbody></table>
        </div>
      </div>
    </div>
  );
}