'use client';

import React, { useState } from 'react';
import { useT } from '@/lib/i18n';
import { getMenuIcon, IconArrow } from './Icons';

const MENU_KEYS = [
  { id: 'cost-analysis', key: 'costAnalysis', icon: 'chart', children: [
    { id: 'dashboard', key: 'dashboard', icon: 'chart' },
    { id: 'billing', key: 'billing', icon: 'doc' },
    { id: 'monthly', key: 'monthly', icon: 'calendar' },
    { id: 'prediction', key: 'prediction', icon: 'trend' },
    { id: 'optimization', key: 'optimization', icon: 'money' },
    { id: 'budget', key: 'budget', icon: 'wallet' },
  ]},
  { id: 'app-mgmt', key: 'appMgmt', icon: 'grid', children: [
    { id: 'app', key: 'app', icon: 'grid' },
    { id: 'product', key: 'product', icon: 'tag' },
  ]},
  { id: 'container-cost', key: 'containerCost', icon: 'server', children: [
    { id: 'k8s', key: 'k8s', icon: 'server' },
  ]},
  { id: 'cloud-resource', key: 'cloudResource', icon: 'cloud', children: [
    { id: 'cloudAccount', key: 'cloudAccount', icon: 'check' },
    { id: 'cloudSecret', key: 'cloudSecret', icon: 'lock' },
  ]},
  { id: 'ops', key: 'ops', icon: 'bell', children: [
    { id: 'alert', key: 'alert', icon: 'bell' },
    { id: 'autoTagging', key: 'autoTagging', icon: 'tag' },
  ]},
  { id: 'system', key: 'system', icon: 'gear', children: [
    { id: 'user', key: 'user', icon: 'user' },
    { id: 'role', key: 'role', icon: 'users' },
    { id: 'menu', key: 'menu', icon: 'menu' },
  ]},
];

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const { t } = useT();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ 'cost-analysis': true });

  const toggleMenu = (id: string) => setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));

  const isChildActive = (children: { id: string }[]) =>
    children.some((c) => c.id === activeSection);

  return (
    <aside
      className="flex-shrink-0 bg-white flex flex-col overflow-hidden z-10 border-r border-border"
      style={{ width: 'var(--sidebar-width, 220px)', height: '100vh' }}
    >
      <div className="flex items-center flex-shrink-0 px-5" style={{ height: 56 }}>
        <span className="text-lg font-semibold tracking-tight text-foreground">FinOps</span>
      </div>
      <div className="h-px bg-border mx-4 mb-1" />

      <div className="flex-1 overflow-y-auto px-3 py-2">
        {MENU_KEYS.map((menu) => {
          const isOpen = openMenus[menu.id] || false;
          const active = isChildActive(menu.children);

          return (
            <div key={menu.id} className="mb-0.5">
              <button
                onClick={() => toggleMenu(menu.id)}
                className={`flex items-center gap-2.5 w-full h-9 text-left text-[13px] font-medium rounded-md px-3 transition-colors duration-150 ${
                  active ? 'text-foreground bg-accent' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <span className="shrink-0">{getMenuIcon(menu.icon, 16)}</span>
                <span className="flex-1">{t(`menu.${menu.key}`)}</span>
                <IconArrow size={12} className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`submenu-enter ${isOpen ? 'open' : ''}`}>
                {menu.children.map((child) => {
                  const isActive = activeSection === child.id;
                  return (
                    <button
                      key={child.id}
                      onClick={() => onNavigate(child.id)}
                      className={`flex items-center gap-2.5 w-full h-9 text-left text-[13px] rounded-md pl-[52px] pr-3 mb-0.5 transition-colors duration-150 ${
                        isActive ? 'text-foreground font-medium bg-accent' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      <span className="shrink-0">{getMenuIcon(child.icon, 14)}</span>
                      <span>{t(`menu.${child.key}`)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}