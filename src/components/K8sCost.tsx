'use client';

import React, { useMemo } from 'react';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import { IconServer, IconGrid, IconDoc, IconMoney } from './Icons';
import { useT } from '@/lib/i18n';
import { k8sMetrics, clusterTrendData, namespaceTop10, resourceTypeData, formatPriceFull } from '@/lib/mock-data';

const COLORS = ['#18181b', '#f97316', '#22c55e', '#a1a1aa'];

export default function K8sCost() {
  const { t } = useT();
  const clusterOption = useMemo(() => ({
    color: COLORS, tooltip: { trigger: 'axis' as const, backgroundColor: '#fff', borderColor: '#e4e4e7', textStyle: { color: '#18181b', fontSize: 13 } },
    legend: { data: Object.keys(clusterTrendData.clusters), top: 8, type: 'scroll' as const, textStyle: { fontSize: 12 } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '20%', containLabel: true },
    xAxis: { type: 'category' as const, data: clusterTrendData.months, axisLabel: { fontSize: 11, color: '#737373' } },
    yAxis: { type: 'value' as const, axisLabel: { formatter: (v: number) => '¥' + (v / 10000).toFixed(0) + '万', fontSize: 11 }, splitLine: { lineStyle: { color: '#f4f4f5' } } },
    series: Object.entries(clusterTrendData.clusters).map(([name, data]) => ({ name, type: 'line' as const, data, smooth: true, symbol: 'none' })),
  }), []);

  const namespaceOption = useMemo(() => ({
    color: [COLORS[0]], tooltip: { trigger: 'axis' as const, axisPointer: { type: 'shadow' as const }, backgroundColor: '#fff', borderColor: '#e4e4e7', textStyle: { color: '#18181b', fontSize: 13 } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: { type: 'value' as const, axisLabel: { formatter: (v: number) => '¥' + (v / 10000).toFixed(1) + '万', fontSize: 11 }, splitLine: { lineStyle: { color: '#f4f4f5' } } },
    yAxis: { type: 'category' as const, data: [...namespaceTop10].reverse().map(d=>d.name), axisLabel: { fontSize: 11, color: '#52525b' }, axisLine: { show: false }, axisTick: { show: false } },
    series: [{ type: 'bar' as const, data: [...namespaceTop10].reverse().map(d=>d.cost), barWidth: 14, itemStyle: { borderRadius: [0,4,4,0] } }],
  }), []);

  const resourceOption = useMemo(() => ({
    color: resourceTypeData.map(d=>d.color), tooltip: { trigger: 'item' as const, formatter: '{b}: ¥{c} ({d}%)' },
    series: [{ type: 'pie' as const, radius: ['50%','75%'], center: ['50%','50%'], itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 }, data: resourceTypeData.map(d=>({ name: d.name, value: d.value })) }],
  }), []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-4 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
        <MetricCard icon={<IconServer size={16} />} title={t('k8s.totalCost')} value={<><span className="text-base font-medium text-muted-foreground">¥</span>{formatPriceFull(k8sMetrics.totalCost)}</>} subtitle={t('k8s.totalCostSub')} />
        <MetricCard icon={<IconGrid size={16} />} title={t('k8s.clusterCount')} value={<>{k8sMetrics.clusterCount}<span className="text-base"> </span></>} subtitle={t('k8s.clusterSub')} />
        <MetricCard icon={<IconDoc size={16} />} title={t('k8s.namespaceCount')} value={<>{k8sMetrics.namespaceCount}<span className="text-base"> </span></>} subtitle={t('k8s.namespaceSub')} />
        <MetricCard icon={<IconMoney size={16} />} title={t('k8s.optimizationSavings')} value={<><span className="text-base font-medium text-muted-foreground">¥</span>{formatPriceFull(k8sMetrics.optimizationSavings)}</>} subtitle={t('k8s.optimizationSub')} />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <ChartCard title={t('k8s.clusterTrend')} chartId="chart-cluster" height={340} option={clusterOption} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-0 max-[1200px]:grid-cols-1">
        <ChartCard title={t('k8s.namespaceTop10')} chartId="chart-ns" height={300} option={namespaceOption} />
        <ChartCard title={t('k8s.resourceType')} chartId="chart-res" height={300} option={resourceOption} />
      </div>
    </div>
  );
}