'use client';

import React, { useState, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TagsView from '@/components/TagsView';
import Dashboard from '@/components/Dashboard';
import Billing from '@/components/Billing';
import MonthlyBilling from '@/components/MonthlyBilling';
import Prediction from '@/components/Prediction';
import Optimization from '@/components/Optimization';
import Budget from '@/components/Budget';
import K8sCost from '@/components/K8sCost';
import {
  AppOverview, ProductManage, CloudAccount, CloudSecret,
  AlertManage, AutoTagging, UserManage, RoleManage, MenuManage,
} from '@/components/Tables';

const SectionContent: React.FC<{ section: string }> = ({ section }) => {
  switch (section) {
    case 'dashboard': return <Dashboard />;
    case 'billing': return <Billing />;
    case 'monthly': return <MonthlyBilling />;
    case 'prediction': return <Prediction />;
    case 'optimization': return <Optimization />;
    case 'budget': return <Budget />;
    case 'k8s': return <K8sCost />;
    case 'app': return <AppOverview />;
    case 'product': return <ProductManage />;
    case 'cloudAccount': return <CloudAccount />;
    case 'cloudSecret': return <CloudSecret />;
    case 'alert': return <AlertManage />;
    case 'autoTagging': return <AutoTagging />;
    case 'user': return <UserManage />;
    case 'role': return <RoleManage />;
    case 'menu': return <MenuManage />;
    default: return <Dashboard />;
  }
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [openedTabs, setOpenedTabs] = useState<string[]>(['dashboard']);

  const handleNavigate = useCallback((section: string) => {
    setActiveSection(section);
    setOpenedTabs((prev) => (prev.includes(section) ? prev : [...prev, section]));
  }, []);

  const handleTabClose = useCallback(
    (section: string) => {
      setOpenedTabs((prev) => {
        const next = prev.filter((t) => t !== section);
        if (next.length === 0) return ['dashboard'];
        if (activeSection === section) {
          setActiveSection(next[Math.min(prev.indexOf(section), next.length - 1)]);
        }
        return next;
      });
    },
    [activeSection]
  );

  return (
    <div className="flex h-screen w-full bg-zinc-50">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header activeSection={activeSection} />
        <TagsView
          activeSection={activeSection}
          openedTabs={openedTabs}
          onTabClick={handleNavigate}
          onTabClose={handleTabClose}
        />
        <main className="flex-1 overflow-auto p-3">
          <div className="w-full min-h-full bg-card border border-border rounded-lg overflow-auto animate-fade-in">
            <div className="p-5">
              <SectionContent section={activeSection} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}