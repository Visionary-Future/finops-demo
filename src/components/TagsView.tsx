'use client';

import React from 'react';
import { useT } from '@/lib/i18n';

const TAG_KEYS: Record<string, string> = {
  dashboard: 'dashboard', billing: 'billing', monthly: 'monthly',
  prediction: 'prediction', optimization: 'optimization', budget: 'budget',
  k8s: 'k8s', app: 'app', product: 'product',
  cloudAccount: 'cloudAccount', cloudSecret: 'cloudSecret',
  alert: 'alert', autoTagging: 'autoTagging',
  user: 'user', role: 'role', menu: 'menu',
};

interface TagsViewProps {
  activeSection: string;
  openedTabs: string[];
  onTabClick: (section: string) => void;
  onTabClose: (section: string) => void;
}

export default function TagsView({ activeSection, openedTabs, onTabClick, onTabClose }: TagsViewProps) {
  const { t } = useT();
  if (openedTabs.length === 0) return null;

  return (
    <div className="h-[34px] bg-white flex-shrink-0 flex items-center overflow-x-auto border-b border-border px-2 gap-1">
      {openedTabs.map((tab) => {
        const isActive = tab === activeSection;
        const key = TAG_KEYS[tab] || 'dashboard';
        return (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`flex items-center h-[26px] px-3 text-xs rounded-sm shrink-0 transition-colors duration-150 cursor-pointer select-none ${
              isActive ? 'bg-primary text-primary-foreground' : 'bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <span>{t(`tags.${key}`)}</span>
            {isActive && (
              <span onClick={(e) => { e.stopPropagation(); onTabClose(tab); }} className="ml-1.5 text-[10px] opacity-60 hover:opacity-100">
                ✕
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}