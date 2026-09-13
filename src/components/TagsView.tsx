'use client';

import React from 'react';
import { useT } from '@/lib/i18n';

interface TagsViewProps {
  activeSection: string;
  openedTabs: string[];
  onTabClick: (section: string) => void;
  onTabClose: (section: string) => void;
  getTagKey: (section: string) => string;
}

export default function TagsView({ activeSection, openedTabs, onTabClick, onTabClose, getTagKey }: TagsViewProps) {
  const { t } = useT();
  if (openedTabs.length === 0) return null;

  return (
    <div className="h-[34px] bg-white flex-shrink-0 flex items-center overflow-x-auto border-b border-border px-2 gap-1">
      {openedTabs.map((tab) => {
        const isActive = tab === activeSection;
        return (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`flex items-center h-[26px] px-3 text-xs rounded-sm shrink-0 transition-colors duration-150 cursor-pointer select-none ${
              isActive ? 'bg-primary text-primary-foreground' : 'bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            <span>{t(`menu.${getTagKey(tab)}`)}</span>
            {isActive && (
              <span onClick={(e) => { e.stopPropagation(); onTabClose(tab); }} className="ml-1.5 text-[10px] opacity-60 hover:opacity-100">✕</span>
            )}
          </button>
        );
      })}
    </div>
  );
}