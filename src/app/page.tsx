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
  DeptManage, MsgCenter, WhiteList, SystemConfig, Dictionary,
  AreaManage, FileManage, LoginLog, OperationLog,
} from '@/components/Tables';

// Placeholder for pages not yet implemented
const Placeholder: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
    {title} - coming soon
  </div>
);

const SectionContent: React.FC<{ section: string }> = ({ section }) => {
  switch (section) {
    // 费用分析
    case 'billdashboard': return <Dashboard />;
    case 'bill': return <Billing />;
    case 'product': return <ProductManage />;
    case 'monthlyBilling': return <MonthlyBilling />;
    case 'billAnalysis': return <MonthlyBilling />;
    // 预算管理
    case 'budget': return <Budget />;
    case 'implement': return <Placeholder title="实施运维费" />;
    // K8s
    case 'kubeCost': return <K8sCost />;
    // 费用预测
    case 'prediction': return <Prediction />;
    case 'monthlyDetailsPrediction': return <Placeholder title="预测明细" />;
    // 云账号
    case 'cloudAccount': return <CloudAccount />;
    case 'cloudSecret': return <CloudSecret />;
    // 应用管理
    case 'app': return <AppOverview />;
    // 合同管理
    case 'po': return <Placeholder title="合同管理" />;
    // 定时任务
    case 'taskManage': return <Placeholder title="任务管理" />;
    // 规则引擎
    case 'autoTagging': return <AutoTagging />;
    // 系统管理
    case 'menu': return <MenuManage />;
    case 'dept': return <DeptManage />;
    case 'role': return <RoleManage />;
    case 'user': return <UserManage />;
    case 'messageCenter': return <MsgCenter />;
    case 'whiteList': return <WhiteList />;
    // 常规配置
    case 'config': return <SystemConfig />;
    case 'dictionary': return <Dictionary />;
    case 'areas': return <AreaManage />;
    case 'file': return <FileManage />;
    // 日志管理
    case 'loginLog': return <LoginLog />;
    case 'operationLog': return <OperationLog />;
    default: return <Dashboard />;
  }
};

const TAG_KEYS: Record<string, string> = {
  billdashboard: 'billdashboard', bill: 'bill', product: 'product',
  monthlyBilling: 'monthlyBilling', billAnalysis: 'billAnalysis',
  budget: 'budget', implement: 'implement',
  kubeCost: 'kubeCost',
  prediction: 'prediction', monthlyDetailsPrediction: 'monthlyDetailsPrediction',
  cloudAccount: 'cloudAccount', cloudSecret: 'cloudSecret',
  app: 'app', po: 'po', taskManage: 'taskManage',
  autoTagging: 'autoTagging',
  menu: 'menu', dept: 'dept', role: 'role', user: 'user',
  messageCenter: 'messageCenter', whiteList: 'whiteList',
  config: 'config', dictionary: 'dictionary', areas: 'areas', file: 'file',
  loginLog: 'loginLog', operationLog: 'operationLog',
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('billdashboard');
  const [openedTabs, setOpenedTabs] = useState<string[]>(['billdashboard']);

  const handleNavigate = useCallback((section: string) => {
    setActiveSection(section);
    setOpenedTabs((prev) => (prev.includes(section) ? prev : [...prev, section]));
  }, []);

  const handleTabClose = useCallback(
    (section: string) => {
      setOpenedTabs((prev) => {
        const next = prev.filter((t) => t !== section);
        if (next.length === 0) return ['billdashboard'];
        if (activeSection === section) {
          setActiveSection(next[Math.min(prev.indexOf(section), next.length - 1)]);
        }
        return next;
      });
    },
    [activeSection]
  );

  const getTagKey = (tab: string) => TAG_KEYS[tab] || tab;

  return (
    <div className="flex h-screen w-full bg-zinc-50">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header activeSection={activeSection} getTagKey={getTagKey} />
        <TagsView
          activeSection={activeSection}
          openedTabs={openedTabs}
          onTabClick={handleNavigate}
          onTabClose={handleTabClose}
          getTagKey={getTagKey}
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