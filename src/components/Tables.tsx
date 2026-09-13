'use client';

import React from 'react';
import { useT } from '@/lib/i18n';
import { appListData, productListData, cloudAccountData, cloudSecretData, formatPriceFull } from '@/lib/mock-data';

const Th: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <th className="font-medium text-[13px] text-muted-foreground text-left px-4 py-3 border-b border-border bg-transparent">{children}</th>
);
const Td: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <td className={`px-4 py-2.5 text-sm text-foreground border-b border-border ${className || ''}`}>{children}</td>
);

const Badge: React.FC<{ variant: 'success' | 'danger' | 'warning' | 'default'; children: React.ReactNode }> = ({ variant, children }) => {
  const colors = { success: 'bg-emerald-50 text-emerald-600', danger: 'bg-red-50 text-red-600', warning: 'bg-amber-50 text-amber-600', default: 'bg-zinc-100 text-zinc-500' };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[variant]}`}>{children}</span>;
};

const CardHeader: React.FC<{ title: string; action?: React.ReactNode }> = ({ title, action }) => (
  <div className="px-5 py-4 border-b border-border flex justify-between items-center"><h3 className="text-sm font-semibold text-foreground">{title}</h3>{action}</div>
);
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-card border border-border rounded-lg mb-0 overflow-hidden">{children}</div>
);

const FilterSelect: React.FC<{ label: string; defaultValue?: string; options: string[] }> = ({ label, defaultValue, options }) => (
  <div className="flex flex-col gap-1.5"><label className="text-xs font-medium text-muted-foreground">{label}</label><select defaultValue={defaultValue || options[0]} className="h-9 px-3 border border-input rounded-md text-sm bg-background text-foreground min-w-[140px] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 appearance-none cursor-pointer">{options.map((o) => <option key={o}>{o}</option>)}</select></div>
);

function Btn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return <button className={`inline-flex items-center h-9 px-4 rounded-md text-sm font-medium transition-colors ${primary ? 'bg-primary text-primary-foreground hover:opacity-90' : 'bg-background border border-input text-foreground hover:bg-accent'}`}>{children}</button>;
}

export function AppOverview() {
  const { t } = useT();
  return (
    <div>
      <div className="flex items-end gap-3 flex-wrap mb-4 p-4 bg-card border border-border rounded-lg">
        <FilterSelect label={t('table.appStatus')} options={[t('table.all'), t('status.running'), t('status.disabled')]} />
        <Btn primary>{t('billing.query')}</Btn>
      </div>
      <Card><CardHeader title={t('table.appList')} /><div className="p-0"><table className="table-shadcn"><thead><tr><Th>{t('table.name')}</Th><Th>{t('table.dept')}</Th><Th>{t('table.owner')}</Th><Th>{t('table.cost')}</Th><Th>{t('billing.status') || 'Status'}</Th></tr></thead><tbody>{appListData.map((r,i)=>(<tr key={i}><Td>{r.name}</Td><Td>{r.dept}</Td><Td>{r.owner}</Td><Td>¥{formatPriceFull(r.cost)}</Td><Td><Badge variant="success">{t('status.running')}</Badge></Td></tr>))}</tbody></table></div></Card>
    </div>
  );
}

export function ProductManage() {
  const { t } = useT();
  return (<div><Card><CardHeader title={t('table.productList')} /><div className="p-0"><table className="table-shadcn"><thead><tr><Th>{t('table.name')}</Th><Th>{t('table.type')}</Th><Th>{t('billing.provider')}</Th><Th>{t('table.apps')}</Th><Th>{t('table.cost')}</Th></tr></thead><tbody>{productListData.map((r,i)=>(<tr key={i}><Td>{r.name}</Td><Td>{r.type}</Td><Td>{r.provider}</Td><Td>{r.apps}</Td><Td>¥{formatPriceFull(r.cost)}</Td></tr>))}</tbody></table></div></Card></div>);
}

export function CloudAccount() {
  const { t } = useT();
  return (<div><Card><CardHeader title={t('table.cloudAccountList')} action={<button className="inline-flex items-center h-8 px-3 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">{t('table.addAccount')}</button>} /><div className="p-0"><table className="table-shadcn"><thead><tr><Th>{t('table.accountName')}</Th><Th>{t('billing.provider')}</Th><Th>{t('table.accountId')}</Th><Th>{t('table.apps')}</Th><Th>{t('table.thisMonth')}</Th><Th>{t('billing.status') || 'Status'}</Th></tr></thead><tbody>{cloudAccountData.map((r,i)=>(<tr key={i}><Td>{r.name}</Td><Td>{r.provider}</Td><Td className="font-mono text-xs">{r.id}</Td><Td>{r.apps}</Td><Td>¥{formatPriceFull(r.cost)}</Td><Td><Badge variant="success">{t('status.normal')}</Badge></Td></tr>))}</tbody></table></div></Card></div>);
}

export function CloudSecret() {
  const { t } = useT();
  return (<div><Card><CardHeader title={t('table.cloudSecretList')} /><div className="p-0"><table className="table-shadcn"><thead><tr><Th>{t('table.credentialName')}</Th><Th>{t('billing.provider')}</Th><Th>{t('table.accountName')}</Th><Th>{t('table.created')}</Th><Th>{t('billing.status') || 'Status'}</Th></tr></thead><tbody>{cloudSecretData.map((r,i)=>(<tr key={i}><Td>{r.name}</Td><Td>{r.provider}</Td><Td>{r.account}</Td><Td>{r.created}</Td><Td><Badge variant="success">{t('status.valid')}</Badge></Td></tr>))}</tbody></table></div></Card></div>);
}

export function AlertManage() {
  const { t } = useT();
  const data = [
    { name:'月度成本超限告警', metric:'月度总消费', threshold:'¥3,000,000', level:'danger' as const, status:'success' as const, time:'2026-01-15' },
    { name:'单产品费用异常', metric:'产品日消费', threshold:'日增幅 > 20%', level:'warning' as const, status:'success' as const, time:'2026-03-20' },
    { name:'K8s 集群超配', metric:'CPU/Mem 使用率', threshold:'< 30%', level:'default' as const, status:'default' as const, time:'2026-05-10' },
  ];
  const levelLabels: Record<string, string> = { danger: t('status.critical'), warning: t('status.warning'), default: t('status.info') };
  const statusLabels: Record<string, string> = { success: t('status.enabled'), default: t('status.disabled') };
  return (<div><Card><CardHeader title={t('table.alertRules')} /><div className="p-0"><table className="table-shadcn"><thead><tr><Th>{t('table.ruleName')}</Th><Th>{t('table.metric')}</Th><Th>{t('table.threshold')}</Th><Th>{t('table.level')}</Th><Th>{t('billing.status') || 'Status'}</Th><Th>{t('table.created')}</Th></tr></thead><tbody>{data.map((r,i)=>(<tr key={i}><Td>{r.name}</Td><Td>{r.metric}</Td><Td>{r.threshold}</Td><Td><Badge variant={r.level}>{levelLabels[r.level]}</Badge></Td><Td><Badge variant={r.status}>{statusLabels[r.status]}</Badge></Td><Td>{r.time}</Td></tr>))}</tbody></table></div></Card></div>);
}

export function AutoTagging() {
  const { t } = useT();
  const data = [
    { name:'按产品类型标签', condition:'产品名称包含 "ECS"', tag:'type:compute', priority:'danger' as const, status:'success' as const },
    { name:'按部门标签', condition:'应用归属部门', tag:'dept:auto', priority:'warning' as const, status:'success' as const },
    { name:'按环境标签', condition:'资源名称含 "prod"', tag:'env:production', priority:'danger' as const, status:'success' as const },
  ];
  const priorityLabels: Record<string, string> = { danger: t('status.high'), warning: t('status.medium') };
  return (<div><Card><CardHeader title={t('table.autoTagRules')} /><div className="p-0"><table className="table-shadcn"><thead><tr><Th>{t('table.ruleName')}</Th><Th>{t('table.condition')}</Th><Th>{t('table.targetTag')}</Th><Th>{t('optimization.priority')}</Th><Th>{t('billing.status') || 'Status'}</Th></tr></thead><tbody>{data.map((r,i)=>(<tr key={i}><Td>{r.name}</Td><Td>{r.condition}</Td><Td><code className="text-xs bg-muted px-1 py-0.5 rounded">{r.tag}</code></Td><Td><Badge variant={r.priority}>{priorityLabels[r.priority]}</Badge></Td><Td><Badge variant={r.status}>{t('status.enabled')}</Badge></Td></tr>))}</tbody></table></div></Card></div>);
}

export function UserManage() {
  const { t } = useT();
  const data = [
    { user:'admin', name:'超级管理员', dept:'技术部', role:'超级管理员', status:'success' as const, time:'2025-12-01' },
    { user:'zhangsan', name:'张三', dept:'电商事业部', role:'部门管理员', status:'success' as const, time:'2026-01-15' },
    { user:'lisi', name:'李四', dept:'平台事业部', role:'普通用户', status:'success' as const, time:'2026-02-20' },
  ];
  return (<div><Card><CardHeader title={t('table.userList')} action={<button className="inline-flex items-center h-8 px-3 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">{t('table.addUser')}</button>} /><div className="p-0"><table className="table-shadcn"><thead><tr><Th>{t('table.username')}</Th><Th>{t('table.name')}</Th><Th>{t('table.dept')}</Th><Th>{t('table.role')}</Th><Th>{t('billing.status') || 'Status'}</Th><Th>{t('table.created')}</Th></tr></thead><tbody>{data.map((r,i)=>(<tr key={i}><Td>{r.user}</Td><Td>{r.name}</Td><Td>{r.dept}</Td><Td>{r.role}</Td><Td><Badge variant={r.status}>{t('status.normal')}</Badge></Td><Td>{r.time}</Td></tr>))}</tbody></table></div></Card></div>);
}

export function RoleManage() {
  const { t } = useT();
  const data = [
    { name:'超级管理员', key:'admin', desc:'系统全部权限', users:1, status:'success' as const },
    { name:'部门管理员', key:'dept_admin', desc:'部门数据管理权限', users:5, status:'success' as const },
    { name:'普通用户', key:'user', desc:'查看权限', users:32, status:'success' as const },
  ];
  return (<div><Card><CardHeader title={t('table.roleList')} action={<button className="inline-flex items-center h-8 px-3 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">{t('table.addRole')}</button>} /><div className="p-0"><table className="table-shadcn"><thead><tr><Th>{t('table.roleName')}</Th><Th>{t('table.roleKey')}</Th><Th>{t('table.description')}</Th><Th>{t('table.userCount')}</Th><Th>{t('billing.status') || 'Status'}</Th></tr></thead><tbody>{data.map((r,i)=>(<tr key={i}><Td>{r.name}</Td><Td><code className="text-xs bg-muted px-1 py-0.5 rounded">{r.key}</code></Td><Td>{r.desc}</Td><Td>{r.users}</Td><Td><Badge variant={r.status}>{t('status.enabled')}</Badge></Td></tr>))}</tbody></table></div></Card></div>);
}

export function MenuManage() {
  const { t } = useT();
  const data = [
    { name:'成本分析', path:'/cost', order:1 }, { name:'应用管理', path:'/app', order:2 },
    { name:'容器成本', path:'/k8s', order:3 }, { name:'云资源管理', path:'/cloud', order:4 },
    { name:'智能运维', path:'/ops', order:5 }, { name:'系统管理', path:'/system', order:6 },
  ];
  return (<div><Card><CardHeader title={t('table.menuList')} /><div className="p-0"><table className="table-shadcn"><thead><tr><Th>{t('table.menuName')}</Th><Th>{t('table.route')}</Th><Th>{t('table.order')}</Th><Th>{t('billing.status') || 'Status'}</Th></tr></thead><tbody>{data.map((r,i)=>(<tr key={i}><Td className="font-medium">{r.name}</Td><Td><code className="text-xs bg-muted px-1 py-0.5 rounded">{r.path}</code></Td><Td>{r.order}</Td><Td><Badge variant="success">{t('status.show')}</Badge></Td></tr>))}</tbody></table></div></Card></div>);
}