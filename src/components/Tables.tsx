"use client";

import React from "react";
import { useT } from "@/lib/i18n";
import {
  appListData,
  productListData,
  cloudAccountData,
  cloudSecretData,
  formatPriceFull,
} from "@/lib/mock-data";

const Th: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <th className="font-medium text-[13px] text-muted-foreground text-left px-4 py-3 border-b border-border bg-transparent">
    {children}
  </th>
);
const Td: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <td
    className={`px-4 py-2.5 text-sm text-foreground border-b border-border ${className || ""}`}
  >
    {children}
  </td>
);

const Badge: React.FC<{
  variant: "success" | "danger" | "warning" | "default";
  children: React.ReactNode;
}> = ({ variant, children }) => {
  const colors = {
    success: "bg-emerald-50 text-emerald-600",
    danger: "bg-red-50 text-red-600",
    warning: "bg-amber-50 text-amber-600",
    default: "bg-zinc-100 text-zinc-500",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[variant]}`}
    >
      {children}
    </span>
  );
};

const CardHeader: React.FC<{ title: string; action?: React.ReactNode }> = ({
  title,
  action,
}) => (
  <div className="px-5 py-4 border-b border-border flex justify-between items-center">
    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    {action}
  </div>
);
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-card border border-border rounded-lg mb-0 overflow-hidden">
    {children}
  </div>
);

const FilterSelect: React.FC<{
  label: string;
  defaultValue?: string;
  options: string[];
}> = ({ label, defaultValue, options }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    <select
      defaultValue={defaultValue || options[0]}
      className="h-9 px-3 border border-input rounded-md text-sm bg-background text-foreground min-w-[140px] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 appearance-none cursor-pointer"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

function Btn({
  children,
  primary,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <button
      className={`inline-flex items-center h-9 px-4 rounded-md text-sm font-medium transition-colors ${primary ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-background border border-input text-foreground hover:bg-accent"}`}
    >
      {children}
    </button>
  );
}

export function AppOverview() {
  const { t } = useT();
  return (
    <div>
      <div className="flex items-end gap-3 flex-wrap mb-4 p-4 bg-card border border-border rounded-lg">
        <FilterSelect
          label={t("table.appStatus")}
          options={[t("table.all"), t("status.running"), t("status.disabled")]}
        />
        <Btn primary>{t("billing.query")}</Btn>
      </div>
      <Card>
        <CardHeader title={t("table.appList")} />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>{t("table.name")}</Th>
                <Th>{t("table.dept")}</Th>
                <Th>{t("table.owner")}</Th>
                <Th>{t("table.cost")}</Th>
                <Th>{t("billing.status") || "Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {appListData.map((r, i) => (
                <tr key={i}>
                  <Td>{r.name}</Td>
                  <Td>{r.dept}</Td>
                  <Td>{r.owner}</Td>
                  <Td>¥{formatPriceFull(r.cost)}</Td>
                  <Td>
                    <Badge variant="success">{t("status.running")}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function ProductManage() {
  const { t } = useT();
  return (
    <div>
      <Card>
        <CardHeader title={t("table.productList")} />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>{t("table.name")}</Th>
                <Th>{t("table.type")}</Th>
                <Th>{t("billing.provider")}</Th>
                <Th>{t("table.apps")}</Th>
                <Th>{t("table.cost")}</Th>
              </tr>
            </thead>
            <tbody>
              {productListData.map((r, i) => (
                <tr key={i}>
                  <Td>{r.name}</Td>
                  <Td>{r.type}</Td>
                  <Td>{r.provider}</Td>
                  <Td>{r.apps}</Td>
                  <Td>¥{formatPriceFull(r.cost)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function CloudAccount() {
  const { t } = useT();
  return (
    <div>
      <Card>
        <CardHeader
          title={t("table.cloudAccountList")}
          action={
            <button className="inline-flex items-center h-8 px-3 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              {t("table.addAccount")}
            </button>
          }
        />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>{t("table.accountName")}</Th>
                <Th>{t("billing.provider")}</Th>
                <Th>{t("table.accountId")}</Th>
                <Th>{t("table.apps")}</Th>
                <Th>{t("table.thisMonth")}</Th>
                <Th>{t("billing.status") || "Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {cloudAccountData.map((r, i) => (
                <tr key={i}>
                  <Td>{r.name}</Td>
                  <Td>{r.provider}</Td>
                  <Td className="font-mono text-xs">{r.id}</Td>
                  <Td>{r.apps}</Td>
                  <Td>¥{formatPriceFull(r.cost)}</Td>
                  <Td>
                    <Badge variant="success">{t("status.normal")}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function CloudSecret() {
  const { t } = useT();
  return (
    <div>
      <Card>
        <CardHeader title={t("table.cloudSecretList")} />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>{t("table.credentialName")}</Th>
                <Th>{t("billing.provider")}</Th>
                <Th>{t("table.accountName")}</Th>
                <Th>{t("table.created")}</Th>
                <Th>{t("billing.status") || "Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {cloudSecretData.map((r, i) => (
                <tr key={i}>
                  <Td>{r.name}</Td>
                  <Td>{r.provider}</Td>
                  <Td>{r.account}</Td>
                  <Td>{r.created}</Td>
                  <Td>
                    <Badge variant="success">{t("status.valid")}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function AlertManage() {
  const { t } = useT();
  const data = [
    {
      name: "月度成本超限告警",
      metric: "月度总消费",
      threshold: "¥3,000,000",
      level: "danger" as const,
      status: "success" as const,
      time: "2026-01-15",
    },
    {
      name: "单产品费用异常",
      metric: "产品日消费",
      threshold: "日增幅 > 20%",
      level: "warning" as const,
      status: "success" as const,
      time: "2026-03-20",
    },
    {
      name: "K8s 集群超配",
      metric: "CPU/Mem 使用率",
      threshold: "< 30%",
      level: "default" as const,
      status: "default" as const,
      time: "2026-05-10",
    },
  ];
  const levelLabels: Record<string, string> = {
    danger: t("status.critical"),
    warning: t("status.warning"),
    default: t("status.info"),
  };
  const statusLabels: Record<string, string> = {
    success: t("status.enabled"),
    default: t("status.disabled"),
  };
  return (
    <div>
      <Card>
        <CardHeader title={t("table.alertRules")} />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>{t("table.ruleName")}</Th>
                <Th>{t("table.metric")}</Th>
                <Th>{t("table.threshold")}</Th>
                <Th>{t("table.level")}</Th>
                <Th>{t("billing.status") || "Status"}</Th>
                <Th>{t("table.created")}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td>{r.name}</Td>
                  <Td>{r.metric}</Td>
                  <Td>{r.threshold}</Td>
                  <Td>
                    <Badge variant={r.level}>{levelLabels[r.level]}</Badge>
                  </Td>
                  <Td>
                    <Badge variant={r.status}>{statusLabels[r.status]}</Badge>
                  </Td>
                  <Td>{r.time}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function AutoTagging() {
  const { t } = useT();
  const data = [
    {
      name: "按产品类型标签",
      condition: '产品名称包含 "ECS"',
      tag: "type:compute",
      priority: "danger" as const,
      status: "success" as const,
    },
    {
      name: "按部门标签",
      condition: "应用归属部门",
      tag: "dept:auto",
      priority: "warning" as const,
      status: "success" as const,
    },
    {
      name: "按环境标签",
      condition: '资源名称含 "prod"',
      tag: "env:production",
      priority: "danger" as const,
      status: "success" as const,
    },
  ];
  const priorityLabels: Record<string, string> = {
    danger: t("status.high"),
    warning: t("status.medium"),
  };
  return (
    <div>
      <Card>
        <CardHeader title={t("table.autoTagRules")} />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>{t("table.ruleName")}</Th>
                <Th>{t("table.condition")}</Th>
                <Th>{t("table.targetTag")}</Th>
                <Th>{t("optimization.priority")}</Th>
                <Th>{t("billing.status") || "Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td>{r.name}</Td>
                  <Td>{r.condition}</Td>
                  <Td>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {r.tag}
                    </code>
                  </Td>
                  <Td>
                    <Badge variant={r.priority}>
                      {priorityLabels[r.priority]}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge variant={r.status}>{t("status.enabled")}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function UserManage() {
  const { t } = useT();
  const data = [
    {
      user: "admin",
      name: "超级管理员",
      dept: "技术部",
      role: "超级管理员",
      status: "success" as const,
      time: "2025-12-01",
    },
    {
      user: "zhangsan",
      name: "张三",
      dept: "电商事业部",
      role: "部门管理员",
      status: "success" as const,
      time: "2026-01-15",
    },
    {
      user: "lisi",
      name: "李四",
      dept: "平台事业部",
      role: "普通用户",
      status: "success" as const,
      time: "2026-02-20",
    },
  ];
  return (
    <div>
      <Card>
        <CardHeader
          title={t("table.userList")}
          action={
            <button className="inline-flex items-center h-8 px-3 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              {t("table.addUser")}
            </button>
          }
        />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>{t("table.username")}</Th>
                <Th>{t("table.name")}</Th>
                <Th>{t("table.dept")}</Th>
                <Th>{t("table.role")}</Th>
                <Th>{t("billing.status") || "Status"}</Th>
                <Th>{t("table.created")}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td>{r.user}</Td>
                  <Td>{r.name}</Td>
                  <Td>{r.dept}</Td>
                  <Td>{r.role}</Td>
                  <Td>
                    <Badge variant={r.status}>{t("status.normal")}</Badge>
                  </Td>
                  <Td>{r.time}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function RoleManage() {
  const { t } = useT();
  const data = [
    {
      name: "超级管理员",
      key: "admin",
      desc: "系统全部权限",
      users: 1,
      status: "success" as const,
    },
    {
      name: "部门管理员",
      key: "dept_admin",
      desc: "部门数据管理权限",
      users: 5,
      status: "success" as const,
    },
    {
      name: "普通用户",
      key: "user",
      desc: "查看权限",
      users: 32,
      status: "success" as const,
    },
  ];
  return (
    <div>
      <Card>
        <CardHeader
          title={t("table.roleList")}
          action={
            <button className="inline-flex items-center h-8 px-3 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              {t("table.addRole")}
            </button>
          }
        />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>{t("table.roleName")}</Th>
                <Th>{t("table.roleKey")}</Th>
                <Th>{t("table.description")}</Th>
                <Th>{t("table.userCount")}</Th>
                <Th>{t("billing.status") || "Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td>{r.name}</Td>
                  <Td>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {r.key}
                    </code>
                  </Td>
                  <Td>{r.desc}</Td>
                  <Td>{r.users}</Td>
                  <Td>
                    <Badge variant={r.status}>{t("status.enabled")}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function MenuManage() {
  const { t } = useT();
  const data = [
    { name: "成本分析", path: "/cost", order: 1 },
    { name: "应用管理", path: "/app", order: 2 },
    { name: "容器成本", path: "/k8s", order: 3 },
    { name: "云资源管理", path: "/cloud", order: 4 },
    { name: "智能运维", path: "/ops", order: 5 },
    { name: "系统管理", path: "/system", order: 6 },
  ];
  return (
    <div>
      <Card>
        <CardHeader title={t("table.menuList")} />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>{t("table.menuName")}</Th>
                <Th>{t("table.route")}</Th>
                <Th>{t("table.order")}</Th>
                <Th>{t("billing.status") || "Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td className="font-medium">{r.name}</Td>
                  <Td>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {r.path}
                    </code>
                  </Td>
                  <Td>{r.order}</Td>
                  <Td>
                    <Badge variant="success">{t("status.show")}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function DeptManage() {
  const { t } = useT();
  const data = [
    { name: "技术部", code: "tech", leader: "张三", users: 12 },
    { name: "电商事业部", code: "ecom", leader: "李四", users: 8 },
    { name: "平台事业部", code: "platform", leader: "王五", users: 15 },
  ];
  return (
    <div>
      <Card>
        <CardHeader
          title={t("menu.deptMgmt")}
          action={
            <button className="inline-flex items-center h-8 px-3 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              添加部门
            </button>
          }
        />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>{t("table.name")}</Th>
                <Th>部门编码</Th>
                <Th>{t("table.owner")}</Th>
                <Th>{t("table.userCount")}</Th>
                <Th>{t("billing.status") || "Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td>{r.name}</Td>
                  <Td>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {r.code}
                    </code>
                  </Td>
                  <Td>{r.leader}</Td>
                  <Td>{r.users}</Td>
                  <Td>
                    <Badge variant="success">{t("status.normal")}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function MsgCenter() {
  const { t } = useT();
  const data = [
    {
      title: "系统升级通知",
      type: "系统消息",
      sender: "系统",
      time: "2026-09-10 09:00",
      status: "success" as const,
    },
    {
      title: "预算超限预警",
      type: "告警消息",
      sender: "系统",
      time: "2026-09-09 14:30",
      status: "danger" as const,
    },
    {
      title: "新版本发布",
      type: "通知",
      sender: "Admin",
      time: "2026-09-08 10:00",
      status: "success" as const,
    },
  ];
  const typeBadge: Record<string, string> = {
    系统消息: "default",
    告警消息: "danger",
    通知: "warning",
  };
  return (
    <div>
      <Card>
        <CardHeader title={t("menu.msgCenter")} />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>标题</Th>
                <Th>类型</Th>
                <Th>发送者</Th>
                <Th>时间</Th>
                <Th>{t("billing.status") || "Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td>{r.title}</Td>
                  <Td>
                    <Badge variant={(typeBadge[r.type] as any) || "default"}>
                      {r.type}
                    </Badge>
                  </Td>
                  <Td>{r.sender}</Td>
                  <Td>{r.time}</Td>
                  <Td>
                    <Badge variant={r.status}>
                      {r.status === "success" ? t("status.enabled") : "未读"}
                    </Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function WhiteList() {
  const { t } = useT();
  const data = [
    { url: "/api/system/user/", method: "GET", desc: "用户查询接口" },
    { url: "/api/system/role/", method: "GET", desc: "角色查询接口" },
    {
      url: "/api/cloud_services/bill_dashboard/",
      method: "GET",
      desc: "账单仪表盘",
    },
  ];
  return (
    <div>
      <Card>
        <CardHeader
          title={t("menu.apiWhiteList")}
          action={
            <button className="inline-flex items-center h-8 px-3 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              添加
            </button>
          }
        />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>接口URL</Th>
                <Th>请求方法</Th>
                <Th>描述</Th>
                <Th>{t("billing.status") || "Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {r.url}
                    </code>
                  </Td>
                  <Td>
                    <Badge
                      variant={
                        r.method === "GET"
                          ? "success"
                          : r.method === "POST"
                            ? "warning"
                            : "default"
                      }
                    >
                      {r.method}
                    </Badge>
                  </Td>
                  <Td>{r.desc}</Td>
                  <Td>
                    <Badge variant="success">{t("status.enabled")}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function SystemConfig() {
  const { t } = useT();
  const data = [
    { key: "SITE_NAME", value: "FinOps 多云成本平台", desc: "站点名称" },
    { key: "DEFAULT_LANG", value: "zh-CN", desc: "默认语言" },
    { key: "PAGE_SIZE", value: "20", desc: "默认分页大小" },
  ];
  return (
    <div>
      <Card>
        <CardHeader title={t("menu.sysConfig")} />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>配置键</Th>
                <Th>配置值</Th>
                <Th>描述</Th>
                <Th>{t("billing.status") || "Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {r.key}
                    </code>
                  </Td>
                  <Td>{r.value}</Td>
                  <Td>{r.desc}</Td>
                  <Td>
                    <Badge variant="success">{t("status.enabled")}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function Dictionary() {
  const { t } = useT();
  const data = [
    { code: "app_status", name: "应用状态", values: "运行中,已停止,维护中" },
    { code: "provider", name: "云服务商", values: "阿里云,Azure,AWS" },
    { code: "priority", name: "优先级", values: "高,中,低" },
  ];
  return (
    <div>
      <Card>
        <CardHeader
          title={t("menu.dictMgmt")}
          action={
            <button className="inline-flex items-center h-8 px-3 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              添加字典
            </button>
          }
        />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>字典编码</Th>
                <Th>字典名称</Th>
                <Th>字典值</Th>
                <Th>{t("billing.status") || "Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {r.code}
                    </code>
                  </Td>
                  <Td>{r.name}</Td>
                  <Td className="text-xs text-muted-foreground">{r.values}</Td>
                  <Td>
                    <Badge variant="success">{t("status.enabled")}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function AreaManage() {
  const { t } = useT();
  const data = [
    { name: "北京市", code: "110000", level: "直辖市", children: 16 },
    { name: "上海市", code: "310000", level: "直辖市", children: 16 },
    { name: "广东省", code: "440000", level: "省", children: 21 },
  ];
  return (
    <div>
      <Card>
        <CardHeader title={t("menu.areaMgmt")} />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>{t("table.name")}</Th>
                <Th>编码</Th>
                <Th>级别</Th>
                <Th>下级数量</Th>
                <Th>{t("billing.status") || "Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td>{r.name}</Td>
                  <Td>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {r.code}
                    </code>
                  </Td>
                  <Td>{r.level}</Td>
                  <Td>{r.children}</Td>
                  <Td>
                    <Badge variant="success">{t("status.enabled")}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function FileManage() {
  const { t } = useT();
  const data = [
    {
      name: "report-202609.xlsx",
      size: "2.3 MB",
      type: "xlsx",
      uploader: "Admin",
      time: "2026-09-11",
    },
    {
      name: "invoice-aug.pdf",
      size: "1.1 MB",
      type: "pdf",
      uploader: "张三",
      time: "2026-09-01",
    },
    {
      name: "logo.png",
      size: "45 KB",
      type: "image",
      uploader: "Admin",
      time: "2026-08-15",
    },
  ];
  return (
    <div>
      <Card>
        <CardHeader
          title={t("menu.fileMgmt")}
          action={
            <button className="inline-flex items-center h-8 px-3 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              上传
            </button>
          }
        />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>文件名</Th>
                <Th>大小</Th>
                <Th>类型</Th>
                <Th>上传者</Th>
                <Th>{t("table.created")}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td>{r.name}</Td>
                  <Td className="text-xs text-muted-foreground">{r.size}</Td>
                  <Td>
                    <Badge variant="default">{r.type}</Badge>
                  </Td>
                  <Td>{r.uploader}</Td>
                  <Td>{r.time}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function LoginLog() {
  const { t } = useT();
  const data = [
    {
      user: "admin",
      ip: "192.168.1.100",
      location: "北京",
      browser: "Chrome 120",
      os: "macOS",
      time: "2026-09-13 08:30",
      status: "success" as const,
    },
    {
      user: "zhangsan",
      ip: "10.0.0.52",
      location: "上海",
      browser: "Safari 17",
      os: "macOS",
      time: "2026-09-13 07:45",
      status: "success" as const,
    },
    {
      user: "unknown",
      ip: "172.16.5.8",
      location: "未知",
      browser: "Firefox 121",
      os: "Windows",
      time: "2026-09-13 02:10",
      status: "danger" as const,
    },
  ];
  return (
    <div>
      <Card>
        <CardHeader title={t("menu.loginLog")} />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>{t("table.username")}</Th>
                <Th>IP</Th>
                <Th>地址</Th>
                <Th>浏览器</Th>
                <Th>操作系统</Th>
                <Th>时间</Th>
                <Th>{t("billing.status") || "Status"}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td>{r.user}</Td>
                  <Td>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {r.ip}
                    </code>
                  </Td>
                  <Td>{r.location}</Td>
                  <Td className="text-xs">{r.browser}</Td>
                  <Td className="text-xs">{r.os}</Td>
                  <Td className="text-xs">{r.time}</Td>
                  <Td>
                    <Badge variant={r.status}>
                      {r.status === "success" ? "成功" : "失败"}
                    </Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function OperationLog() {
  const { t } = useT();
  const data = [
    {
      user: "admin",
      action: "新增用户",
      module: "系统管理",
      target: "用户 lisi",
      time: "2026-09-13 09:15",
    },
    {
      user: "zhangsan",
      action: "修改预算",
      module: "预算管理",
      target: "阿里云预算",
      time: "2026-09-12 16:20",
    },
    {
      user: "admin",
      action: "删除告警规则",
      module: "告警管理",
      target: "CPU告警规则",
      time: "2026-09-12 14:00",
    },
  ];
  return (
    <div>
      <Card>
        <CardHeader title={t("menu.opLog")} />
        <div className="p-0">
          <table className="table-shadcn">
            <thead>
              <tr>
                <Th>{t("table.username")}</Th>
                <Th>操作</Th>
                <Th>模块</Th>
                <Th>目标</Th>
                <Th>时间</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <Td>{r.user}</Td>
                  <Td>{r.action}</Td>
                  <Td>{r.module}</Td>
                  <Td>{r.target}</Td>
                  <Td className="text-xs">{r.time}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
