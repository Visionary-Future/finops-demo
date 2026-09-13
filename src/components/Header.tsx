'use client';

import React from 'react';
import { useT } from '@/lib/i18n';

interface HeaderProps {
  activeSection: string;
  getTagKey: (section: string) => string;
}

export default function Header({ activeSection, getTagKey }: HeaderProps) {
  const { t, locale, setLocale } = useT();

  return (
    <header className="h-[50px] bg-white flex items-center justify-between flex-shrink-0 border-b border-border px-4">
      <div className="flex items-center gap-2 text-[13px]">
        <span className="text-muted-foreground">{t('breadcrumb.home')}</span>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-foreground font-medium">
          {t(`menu.${getTagKey(activeSection)}`)}
        </span>
      </div>

      <div className="flex items-center gap-4 text-[13px] text-muted-foreground">
        <div className="flex items-center border border-border rounded-md overflow-hidden">
          <button
            onClick={() => setLocale('zh')}
            className={`px-2 py-0.5 text-xs transition-colors ${locale === 'zh' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
          >中</button>
          <button
            onClick={() => setLocale('en')}
            className={`px-2 py-0.5 text-xs transition-colors ${locale === 'en' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
          >EN</button>
        </div>
        <span>{t('header.date')}</span>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">S</div>
          <span className="text-foreground text-[13px]">{t('header.user')}</span>
        </div>
      </div>
    </header>
  );
}