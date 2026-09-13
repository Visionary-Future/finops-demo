'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface ChartCardProps {
  title: string;
  chartId: string;
  height?: number;
  option: echarts.EChartsOption | null;
  meta?: React.ReactNode;
  children?: React.ReactNode;
}

export default function ChartCard({
  title,
  chartId,
  height = 340,
  option,
  meta,
  children,
}: ChartCardProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current || !option) return;

    if (instanceRef.current) {
      instanceRef.current.dispose();
      instanceRef.current = null;
    }

    const timer = setTimeout(() => {
      if (!chartRef.current) return;
      const instance = echarts.init(chartRef.current);
      instance.setOption(option);
      instanceRef.current = instance;
    }, 0);

    const handleResize = () => instanceRef.current?.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      instanceRef.current?.dispose();
      instanceRef.current = null;
    };
  }, [option]);

  return (
    <div className="bg-card border border-border rounded-lg mb-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
          {meta}
        </div>
      </div>
      <div className="px-5 pb-4">
        {children}
        <div ref={chartRef} style={{ width: '100%', height: `${height}px` }} />
      </div>
    </div>
  );
}