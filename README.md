# FinOps - 多云成本分析平台

多云环境下的云成本管理与分析平台 Demo。

## 功能概览

- **成本分析** — 总览仪表盘、账单分析、月度账单、成本预测、成本优化、预算管理
- **应用管理** — 应用总览、产品管理
- **容器成本** — K8s 成本分析
- **云资源管理** — 云账号管理、云凭证管理
- **智能运维** — 告警管理、自动标签规则
- **系统管理** — 用户管理、角色管理、菜单管理

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS + CSS Variables
- **图表**: ECharts 5.5.0
- **语言**: TypeScript
- **部署**: Vercel (静态导出)

设计参照 [dvadmin FinOps 平台](https://github.com/visionary-future/web)，全部接口数据 Mock 本地化。

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:3000

## 构建

```bash
npm run build
```

静态文件输出到 `out/` 目录。

## 部署

项目配置了 `vercel.json`，可直接通过 Vercel 部署。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 项目结构

```
src/
├── app/
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页面（路由状态管理）
│   └── globals.css        # 全局样式 & Design Tokens
├── components/
│   ├── Sidebar.tsx         # 左侧导航菜单
│   ├── Header.tsx          # 顶部面包屑栏
│   ├── TagsView.tsx        # 标签页导航
│   ├── Dashboard.tsx       # 仪表盘页面
│   ├── Billing.tsx         # 账单分析页面
│   ├── MonthlyBilling.tsx  # 月度账单页面
│   ├── Prediction.tsx      # 成本预测页面
│   ├── Optimization.tsx    # 成本优化页面
│   ├── Budget.tsx          # 预算管理页面
│   ├── K8sCost.tsx         # K8s 成本分析页面
│   ├── Tables.tsx          # 表格类页面集合
│   ├── MetricCard.tsx      # 指标卡片组件
│   └── ChartCard.tsx       # 图表卡片组件
└── lib/
    └── mock-data.ts        # 全部 Mock 数据
```