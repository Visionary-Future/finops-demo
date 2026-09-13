"use client";

import React from "react";

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  subtitleColor?: string;
  children?: React.ReactNode;
}

export default function MetricCard({
  icon,
  title,
  value,
  subtitle,
  subtitleColor,
  children,
}: MetricCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 hover:shadow-sm transition-shadow duration-200">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-foreground">
          {icon}
        </div>
        <span className="text-[13px] font-medium text-muted-foreground">
          {title}
        </span>
      </div>
      <div className="text-[28px] font-bold tracking-tight text-foreground mb-1">
        {value}
      </div>
      {subtitle && (
        <div className={`text-xs ${subtitleColor || "text-muted-foreground"}`}>
          {subtitle}
        </div>
      )}
      {children}
    </div>
  );
}
