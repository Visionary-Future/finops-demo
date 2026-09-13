'use client';

import React from 'react';
import { useT } from '@/lib/i18n';
import { monthlyBillingTable, formatPriceFull } from '@/lib/mock-data';

export default function MonthlyBilling() {
  const { t } = useT();
  return (
    <div>
      <div className="flex items-end gap-3 flex-wrap mb-4 p-4 bg-card border border-border rounded-lg">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">{t('monthly.period')}</label>
          <select className="h-9 px-3 border border-input rounded-md text-sm bg-background text-foreground min-w-[140px] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 appearance-none cursor-pointer"><option>2026-08</option><option>2026-09</option></select>
        </div>
        <button className="inline-flex items-center h-9 px-4 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">{t('monthly.query')}</button>
      </div>

      <div className="bg-card border border-border rounded-lg mb-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-border"><h3 className="text-sm font-semibold text-foreground">{t('monthly.detailTitle')}</h3></div>
        <div className="p-0">
          <table className="table-shadcn"><thead><tr><th>{t('monthly.appName')}</th><th>{t('monthly.alibaba')}</th><th>{t('monthly.azure')}</th><th>{t('monthly.k8s')}</th><th>{t('monthly.total')}</th><th>{t('monthly.change')}</th></tr></thead>
            <tbody>{monthlyBillingTable.map((r,i)=>(<tr key={i}><td>{r.app}</td><td>¥{formatPriceFull(r.alibaba)}</td><td>¥{formatPriceFull(r.azure)}</td><td>¥{formatPriceFull(r.k8s)}</td><td>¥{formatPriceFull(r.total)}</td><td><span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${r.change>=0?'bg-red-50 text-red-600':'bg-emerald-50 text-emerald-600'}`}>{r.change>=0?'+':''}{r.change}%</span></td></tr>))}</tbody></table>
        </div>
      </div>
    </div>
  );
}