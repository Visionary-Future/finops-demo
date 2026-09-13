'use client';

import React, { useMemo } from 'react';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import { IconChart, IconCheck, IconBell, IconTrend } from './Icons';
import { useT } from '@/lib/i18n';
import { predictionMetrics, predictionData, multiPredictionData, accuracyData, formatPriceFull } from '@/lib/mock-data';

const COLORS = ['#18181b', '#f59e0b', '#f97316'];

export default function Prediction() {
  const { t } = useT();

  const predOption = useMemo(() => ({
    color: [COLORS[0], COLORS[1]],
    tooltip: { trigger: 'axis' as const, backgroundColor: '#fff', borderColor: '#e4e4e7', textStyle: { color: '#18181b', fontSize: 13 } },
    legend: { data: [t('prediction.actual'), t('prediction.predicted')], top: 8, textStyle: { fontSize: 12 } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: { type: 'category' as const, data: predictionData.months, axisLabel: { rotate: 45, fontSize: 11, color: '#737373' } },
    yAxis: { type: 'value' as const, axisLabel: { formatter: (v: number) => '¥' + (v / 10000).toFixed(0) + '万', fontSize: 11 }, splitLine: { lineStyle: { color: '#f4f4f5' } } },
    series: [
      { name: t('prediction.actual'), type: 'line' as const, data: predictionData.actual, smooth: true, symbol: 'none', lineStyle: { width: 2.5 } },
      { name: t('prediction.predicted'), type: 'line' as const, data: predictionData.predicted, smooth: true, symbol: 'none', lineStyle: { width: 2.5, type: 'dashed' as const } },
    ],
  }), [t]);

  const multiPredOption = useMemo(() => ({
    color: COLORS, tooltip: { trigger: 'axis' as const, backgroundColor: '#fff', borderColor: '#e4e4e7', textStyle: { color: '#18181b', fontSize: 13 } },
    legend: { data: [t('providers.alibaba'), 'Azure', 'K8s'], top: 8, textStyle: { fontSize: 12 } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: { type: 'category' as const, data: multiPredictionData.months, axisLabel: { fontSize: 11 } },
    yAxis: { type: 'value' as const, axisLabel: { formatter: (v: number) => '¥' + (v / 10000).toFixed(0) + '万', fontSize: 11 }, splitLine: { lineStyle: { color: '#f4f4f5' } } },
    series: [
      { name: t('providers.alibaba'), type: 'line' as const, data: multiPredictionData.alibaba, smooth: true, symbol: 'none' },
      { name: 'Azure', type: 'line' as const, data: multiPredictionData.azure, smooth: true, symbol: 'none' },
      { name: 'K8s', type: 'line' as const, data: multiPredictionData.k8s, smooth: true, symbol: 'none' },
    ],
  }), [t]);

  const accuracyOption = useMemo(() => ({
    color: ['#22c55e'], tooltip: { trigger: 'axis' as const, formatter: '{b}: {c}%', backgroundColor: '#fff', borderColor: '#e4e4e7', textStyle: { color: '#18181b', fontSize: 13 } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '8%', containLabel: true },
    xAxis: { type: 'category' as const, data: accuracyData.months, axisLabel: { fontSize: 11, color: '#737373' } },
    yAxis: { type: 'value' as const, min: 85, max: 95, axisLabel: { formatter: '{value}%', fontSize: 11 }, splitLine: { lineStyle: { color: '#f4f4f5' } } },
    series: [{ type: 'line' as const, data: accuracyData.rates, smooth: true, symbol: 'none', areaStyle: { opacity: 0.15 } }],
  }), []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-4 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
        <MetricCard icon={<IconChart size={16} />} title={t('prediction.predictedTotal')} value={<><span className="text-base font-medium text-muted-foreground">¥</span>{formatPriceFull(predictionMetrics.predictedTotal)}</>} subtitle={t('prediction.predictedSub')} />
        <MetricCard icon={<IconCheck size={16} />} title={t('prediction.confidence')} value={<>{predictionMetrics.confidence}<span className="text-base">%</span></>} subtitle={t('prediction.confidenceSub')} />
        <MetricCard icon={<IconBell size={16} />} title={t('prediction.risk')} value={<span className="text-amber-500">{t('prediction.riskMedium')}</span>} subtitle={t('prediction.riskSub')} />
        <MetricCard icon={<IconTrend size={16} />} title={t('prediction.endMonth')} value={<><span className="text-base font-medium text-muted-foreground">¥</span>{formatPriceFull(predictionMetrics.endOfMonth)}</>} subtitle={t('prediction.endMonthSub')} subtitleColor="text-red-500" />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <ChartCard title={t('prediction.predChart')} chartId="chart-pred" height={380} option={predOption} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-0 max-[1200px]:grid-cols-1">
        <ChartCard title={t('prediction.multiChart')} chartId="chart-multi" height={300} option={multiPredOption} />
        <ChartCard title={t('prediction.accuracyChart')} chartId="chart-acc" height={300} option={accuracyOption} />
      </div>
    </div>
  );
}