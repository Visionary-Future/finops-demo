'use client';

import React, { useState } from 'react';
import { useT } from '@/lib/i18n';
import { getMenuIcon, IconArrow } from './Icons';

// Matches real database menu table structure
const MENU_KEYS = [
  { id: 'cloud', key: 'cloudAccount', icon: 'cloud', children: [
    { id: 'cloudAccount', key: 'accountMgmt', icon: 'check' },
    { id: 'cloudSecret', key: 'secretMgmt', icon: 'lock' },
  ]},
  { id: 'app', key: 'appMgmt', icon: 'grid', children: [
    { id: 'app', key: 'appList', icon: 'grid' },
  ]},
  { id: 'bill', key: 'costAnalysis', icon: 'chart', children: [
    { id: 'bill', key: 'appCost', icon: 'doc' },
    { id: 'product', key: 'productCost', icon: 'tag' },
    { id: 'billdashboard', key: 'billDashboard', icon: 'chart' },
    { id: 'monthlyBilling', key: 'billAnalysis2', icon: 'trend' },
    { id: 'billAnalysis', key: 'monthlyBill', icon: 'calendar' },
  ]},
  { id: 'po', key: 'contractMgmt', icon: 'doc', children: [] },
  { id: 'budget', key: 'budgetMgmt', icon: 'wallet', children: [
    { id: 'budget', key: 'budgetReport', icon: 'chart' },
    { id: 'implement', key: 'implFee', icon: 'money' },
  ]},
  { id: 'k8s', key: 'k8sBilling', icon: 'server', children: [
    { id: 'kubeCost', key: 'kubeCostDetail', icon: 'server' },
  ]},
  { id: 'prediction', key: 'prediction2', icon: 'trend', children: [
    { id: 'prediction', key: 'predOverview', icon: 'chart' },
    { id: 'monthlyDetailsPrediction', key: 'predDetail', icon: 'doc' },
  ]},
  { id: 'celery', key: 'celeryMgmt', icon: 'gear', children: [
    { id: 'taskManage', key: 'taskMgmt', icon: 'gear' },
  ]},
  { id: 'rules', key: 'ruleEngine', icon: 'tag', children: [
    { id: 'autoTagging', key: 'autoTagging', icon: 'tag' },
  ]},
  { id: 'system', key: 'systemMgmt', icon: 'gear', children: [
    { id: 'menu', key: 'menuMgmt2', icon: 'menu' },
    { id: 'dept', key: 'deptMgmt', icon: 'users' },
    { id: 'role', key: 'roleMgmt', icon: 'users' },
    { id: 'user', key: 'userMgmt', icon: 'user' },
    { id: 'messageCenter', key: 'msgCenter', icon: 'bell' },
    { id: 'whiteList', key: 'apiWhiteList', icon: 'check' },
  ]},
  { id: 'generalConfig', key: 'generalConfig', icon: 'gear', children: [
    { id: 'config', key: 'sysConfig', icon: 'gear' },
    { id: 'dictionary', key: 'dictMgmt', icon: 'doc' },
    { id: 'areas', key: 'areaMgmt', icon: 'grid' },
    { id: 'file', key: 'fileMgmt', icon: 'doc' },
  ]},
  { id: 'log', key: 'logMgmt', icon: 'doc', children: [
    { id: 'loginLog', key: 'loginLog', icon: 'user' },
    { id: 'operationLog', key: 'opLog', icon: 'doc' },
  ]},
];

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const { t } = useT();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    bill: true,
  });

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
          const hasChildren = menu.children.length > 0;
          const isOpen = openMenus[menu.id] || false;
          const active = hasChildren ? isChildActive(menu.children) : activeSection === menu.id;

          return (
            <div key={menu.id} className="mb-0.5">
              {hasChildren ? (
                <>
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
                </>
              ) : (
                <button
                  onClick={() => onNavigate(menu.id)}
                  className={`flex items-center gap-2.5 w-full h-9 text-left text-[13px] font-medium rounded-md px-3 transition-colors duration-150 ${
                    activeSection === menu.id ? 'text-foreground font-medium bg-accent' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <span className="shrink-0">{getMenuIcon(menu.icon, 16)}</span>
                  <span>{t(`menu.${menu.key}`)}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}