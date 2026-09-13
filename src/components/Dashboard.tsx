'use client';

import React, { useMemo } from 'react';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import { IconDollar, IconTrend, IconChart, IconMoney } from './Icons';
import { useT } from '@/lib/i18n';
import {
  dashboardMetrics, monthlyTrendData, providerPieData,
  topAppsData, formatPriceFull,
} from '@/lib/mock-data';

const COLORS = ['#18181b', '#f97316', '#3b82f6', '#6366f1', '#84cc16', '#ec4899'];

export default function Dashboard() {
  const { t } = useT();

  const trendOption = useMemo(() => ({
    color: COLORS,
    tooltip: {
      trigger: 'axis' as const, backgroundColor: '#fff', borderColor: '#e4e4e7', borderWidth: 1,
      borderRadius: 8, padding: [10, 14],
      textStyle: { fontSize: 13, color: '#18181b', fontFamily: 'Inter, sans-serif' },
      extraCssText: 'box-shadow: 0 4px 16px rgba(0,0,0,0.08);',
    },
    legend: { data: [t('providers.alibaba'), 'Azure', 'K8s'], top: 8, textStyle: { fontSize: 12 } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: { type: 'category' as const, boundaryGap: false, data: monthlyTrendData.months, axisLabel: { fontSize: 11, color: '#737373' }, axisLine: { lineStyle: { color: '#e4e4e7' } } },
    yAxis: { type: 'value' as const, axisLabel: { formatter: (v: number) => '¥' + (v / 10000).toFixed(0) + '万', fontSize: 11, color: '#737373' }, splitLine: { lineStyle: { color: '#f4f4f5' } } },
    series: [
      { name: 'Total', type: 'line' as const, data: monthlyTrendData.totals, smooth: true, symbol: 'none', lineStyle: { width: 2.5 } },
      { name: t('providers.alibaba'), type: 'line' as const, data: monthlyTrendData.alibaba, smooth: true, symbol: 'none', lineStyle: { width: 1.5, type: 'dashed' as const } },
      { name: 'Azure', type: 'line' as const, data: monthlyTrendData.azure, smooth: true, symbol: 'none', lineStyle: { width: 1.5, type: 'dashed' as const } },
      { name: 'K8s', type: 'line' as const, data: monthlyTrendData.k8s, smooth: true, symbol: 'none', lineStyle: { width: 1.5, type: 'dashed' as const } },
    ],
  }), [t]);

  const pieOption = useMemo(() => ({
    color: [COLORS[1], COLORS[2], COLORS[3]],
    tooltip: { trigger: 'item' as const, formatter: '{b}: ¥{c} ({d}%)', backgroundColor: '#fff', borderColor: '#e4e4e7', textStyle: { color: '#18181b', fontSize: 13 } },
    series: [{ type: 'pie' as const, radius: ['50%', '75%'], center: ['40%', '50%'], avoidLabelOverlap: false, itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 }, label: { show: false }, emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' as const } }, data: providerPieData.map((d) => ({ name: d.name, value: d.value })) }],
  }), []);

  const top10Option = useMemo(() => ({
    color: [COLORS[0]],
    tooltip: { trigger: 'axis' as const, axisPointer: { type: 'shadow' as const }, backgroundColor: '#fff', borderColor: '#e4e4e7', textStyle: { color: '#18181b', fontSize: 13 }, formatter: function (params: any) { return `${params[0].name}: ¥${params[0].value.toLocaleString()}`; } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: { type: 'value' as const, axisLabel: { formatter: (v: number) => '¥' + (v / 10000).toFixed(0) + '万', fontSize: 11, color: '#737373' }, splitLine: { lineStyle: { color: '#f4f4f5' } } },
    yAxis: { type: 'category' as const, data: [...topAppsData].reverse().map((d) => d.name), axisLabel: { fontSize: 11, color: '#52525b' }, axisLine: { show: false }, axisTick: { show: false } },
    series: [{ type: 'bar' as const, data: [...topAppsData].reverse().map((d) => d.cost), barWidth: 16, itemStyle: { borderRadius: [0, 4, 4, 0] } }],
  }), []);

  const aliLabel = t('providers.alibaba');

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-4 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
        <MetricCard icon={<IconDollar size={16} />} title={t('dashboard.totalCost')}
          value={<><span className="text-base font-medium text-muted-foreground">¥</span>{formatPriceFull(dashboardMetrics.totalCost)}</>}>
          <div className="flex gap-4 mt-3 pt-3 border-t border-border text-xs">
            {[
              { dot: 'alibaba', label: aliLabel, v: dashboardMetrics.providerBreakdown.alibaba },
              { dot: 'azure', label: 'Azure', v: dashboardMetrics.providerBreakdown.azure },
              { dot: 'k8s', label: 'K8s', v: dashboardMetrics.providerBreakdown.k8s },
            ].map((p) => (
              <div key={p.dot} className="flex items-center gap-1.5">
                <span className={`provider-dot ${p.dot}`} />
                <span className="text-muted-foreground">{p.label}</span>
                <span className="font-medium text-foreground">¥{formatPriceFull(p.v)}</span>
              </div>
            ))}
          </div>
        </MetricCard>

        <MetricCard icon={<IconTrend size={16} />} title={t('dashboard.monthlyChange')}
          value={<><span className="text-base font-medium text-muted-foreground">¥</span>{formatPriceFull(dashboardMetrics.monthlyChange)}</>}
          subtitle={t('dashboard.vsLastMonth') + ' 5.8%'} subtitleColor="text-red-500">
          <div className="flex gap-4 mt-3 pt-3 border-t border-border text-xs text-red-500">
            {[
              { dot: 'alibaba', label: aliLabel, v: dashboardMetrics.providerGrowth.alibaba },
              { dot: 'azure', label: 'Azure', v: dashboardMetrics.providerGrowth.azure },
              { dot: 'k8s', label: 'K8s', v: dashboardMetrics.providerGrowth.k8s },
            ].map((p) => (
              <div key={p.dot} className="flex items-center gap-1.5">
                <span className={`provider-dot ${p.dot}`} /><span>{p.label}</span>
                <span className="font-medium">+¥{formatPriceFull(p.v)}</span>
              </div>
            ))}
          </div>
        </MetricCard>

        <MetricCard icon={<IconChart size={16} />} title={t('dashboard.growthRate')}
          value={<>{dashboardMetrics.growthRate}<span className="text-base">%</span></>}
          subtitle={t('dashboard.vsLastMonthSlow')} subtitleColor="text-emerald-500" />

        <MetricCard icon={<IconMoney size={16} />} title={t('dashboard.savingsPotential')}
          value={<><span className="text-base font-medium text-muted-foreground">¥</span>{formatPriceFull(dashboardMetrics.savingsPotential)}</>}
          subtitle={t('dashboard.potentialSavings')} />
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-4 mb-4 max-[1200px]:grid-cols-1">
        <ChartCard title={t('dashboard.trendChart')} chartId="chart-trend" height={340} option={trendOption} />
        <ChartCard title={t('dashboard.providerPie')} chartId="chart-provider-pie" height={340} option={pieOption} />
      </div>

      <ChartCard title={t('dashboard.topAppTitle')} chartId="chart-top10" height={300} option={top10Option}
        meta={<div className="flex gap-4 text-xs text-muted-foreground"><span>{t('dashboard.billingCycle')}：2026-09</span><span>{t('dashboard.refreshDate')}：2026-09-11</span></div>}>
        <div className="flex gap-6 mb-4 text-sm">
          <div><span className="text-muted-foreground">{t('dashboard.top1')}</span><div className="font-semibold text-foreground">订单系统</div><span className="text-xs text-muted-foreground">¥385,000</span></div>
          <div><span className="text-muted-foreground">{t('dashboard.top10Total')}</span><div className="font-semibold text-foreground">¥2,096,000</div><span className="text-xs text-muted-foreground">10 {t('dashboard.apps')}</span></div>
          <div><span className="text-muted-foreground">{t('dashboard.alibabaTotal')}</span><div className="font-semibold text-foreground">¥1,265,000</div><span className="text-xs text-muted-foreground">{t('dashboard.ofTop10')} 60.4%</span></div>
        </div>
      </ChartCard>
    </div>
  );
}