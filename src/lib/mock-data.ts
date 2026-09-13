// Mock data for all pages - no API calls needed

export const dashboardMetrics = {
  totalCost: 2847692,
  monthlyChange: 156230,
  growthRate: 5.8,
  savingsPotential: 320500,
  providerBreakdown: {
    alibaba: 1520000,
    azure: 1010000,
    k8s: 420000,
  },
  providerGrowth: {
    alibaba: 70000,
    azure: 30000,
    k8s: 56230,
  },
};

export const monthlyTrendData = {
  months: [
    "10月",
    "11月",
    "12月",
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
  ],
  totals: [
    2180000, 2250000, 2320000, 2410000, 2380000, 2520000, 2580000, 2650000,
    2690000, 2750000, 2780000, 2847692,
  ],
  alibaba: [
    1200000, 1240000, 1280000, 1320000, 1300000, 1380000, 1420000, 1450000,
    1470000, 1490000, 1500000, 1520000,
  ],
  azure: [
    780000, 810000, 830000, 870000, 850000, 900000, 920000, 950000, 970000,
    990000, 1000000, 1010000,
  ],
  k8s: [
    200000, 200000, 210000, 220000, 230000, 240000, 240000, 250000, 250000,
    270000, 280000, 420000,
  ],
};

export const providerPieData = [
  { name: "阿里云", value: 1520000, color: "#ff6a00" },
  { name: "Azure", value: 1010000, color: "#0078d4" },
  { name: "K8s", value: 420000, color: "#326ce5" },
];

export const topAppsData = [
  { name: "订单系统", cost: 385000 },
  { name: "用户中心", cost: 312000 },
  { name: "支付网关", cost: 268000 },
  { name: "物流平台", cost: 245000 },
  { name: "营销引擎", cost: 198000 },
  { name: "数据分析", cost: 175000 },
  { name: "消息推送", cost: 152000 },
  { name: "搜索服务", cost: 138000 },
  { name: "推荐系统", cost: 125000 },
  { name: "监控平台", cost: 98000 },
];

export const billingTableData = [
  {
    provider: "阿里云",
    product: "ECS 云服务器",
    cost: 852340,
    percentage: "29.9%",
    change: 12.3,
  },
  {
    provider: "Azure",
    product: "Virtual Machines",
    cost: 623180,
    percentage: "21.9%",
    change: 8.7,
  },
  {
    provider: "阿里云",
    product: "RDS 数据库",
    cost: 415200,
    percentage: "14.6%",
    change: -3.2,
  },
  {
    provider: "K8s",
    product: "ACK 容器服务",
    cost: 368500,
    percentage: "12.9%",
    change: 15.1,
  },
  {
    provider: "Azure",
    product: "SQL Database",
    cost: 245630,
    percentage: "8.6%",
    change: -1.5,
  },
  {
    provider: "阿里云",
    product: "OSS 对象存储",
    cost: 198420,
    percentage: "7.0%",
    change: 4.8,
  },
  {
    provider: "Azure",
    product: "Storage Account",
    cost: 144422,
    percentage: "5.1%",
    change: -6.2,
  },
];

export const alibabaProducts = [
  { name: "ECS 云服务器", value: 852340, color: "#ff6a00" },
  { name: "RDS 数据库", value: 415200, color: "#ff9a40" },
  { name: "OSS 对象存储", value: 198420, color: "#ffc080" },
  { name: "CDN 加速", value: 89000, color: "#ffd9b3" },
  { name: "其他", value: 65040, color: "#ffe6cc" },
];

export const azureProducts = [
  { name: "Virtual Machines", value: 623180, color: "#0078d4" },
  { name: "SQL Database", value: 245630, color: "#40a0e8" },
  { name: "Storage Account", value: 144422, color: "#80c8f4" },
  { name: "App Service", value: 75000, color: "#b3dffa" },
  { name: "其他", value: 21768, color: "#d9effd" },
];

export const monthlyBillingTable = [
  {
    app: "订单系统",
    alibaba: 225000,
    azure: 120000,
    k8s: 40000,
    total: 385000,
    change: 8.5,
  },
  {
    app: "用户中心",
    alibaba: 180000,
    azure: 98000,
    k8s: 34000,
    total: 312000,
    change: -2.1,
  },
  {
    app: "支付网关",
    alibaba: 145000,
    azure: 88000,
    k8s: 35000,
    total: 268000,
    change: 5.3,
  },
  {
    app: "物流平台",
    alibaba: 136000,
    azure: 72000,
    k8s: 37000,
    total: 245000,
    change: 3.2,
  },
  {
    app: "营销引擎",
    alibaba: 105000,
    azure: 58000,
    k8s: 35000,
    total: 198000,
    change: -1.8,
  },
  {
    app: "数据分析",
    alibaba: 95000,
    azure: 52000,
    k8s: 28000,
    total: 175000,
    change: 12.5,
  },
];

export const predictionMetrics = {
  predictedTotal: 3125000,
  confidence: 92,
  riskLevel: "中等",
  endOfMonth: 3380000,
  growthRate: 6.2,
};

export const predictionData = {
  months: [
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月(预)",
    "11月(预)",
    "12月(预)",
  ],
  actual: [2580000, 2650000, 2690000, 2750000, 2780000, null, null, null, null],
  predicted: [null, null, null, null, null, 2847692, 2960000, 3080000, 3125000],
  bounds: [
    null,
    null,
    null,
    null,
    null,
    [2750000, 2950000],
    [2850000, 3100000],
    [2950000, 3200000],
    [3000000, 3300000],
  ],
};

export const multiPredictionData = {
  months: ["10月(预)", "11月(预)", "12月(预)"],
  alibaba: [1620000, 1680000, 1720000],
  azure: [1080000, 1120000, 1160000],
  k8s: [260000, 280000, 245000],
};

export const accuracyData = {
  months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  rates: [91.2, 92.5, 91.8, 93.1, 92.8, 92.3],
};

export const optimizationTable = [
  {
    id: "i-bp1xxx001",
    type: "ECS",
    provider: "阿里云",
    suggestion: "释放闲置实例",
    saving: 45200,
    priority: "高",
  },
  {
    id: "vm-prod-042",
    type: "VM",
    provider: "Azure",
    suggestion: "降配至标准型",
    saving: 32800,
    priority: "中",
  },
  {
    id: "oss-bucket-logs",
    type: "OSS",
    provider: "阿里云",
    suggestion: "迁移至低频存储",
    saving: 28500,
    priority: "中",
  },
  {
    id: "rds-xxx-018",
    type: "RDS",
    provider: "阿里云",
    suggestion: "升级预留实例",
    saving: 18500,
    priority: "中",
  },
  {
    id: "vm-staging-12",
    type: "VM",
    provider: "Azure",
    suggestion: "非工作时间关机",
    saving: 15300,
    priority: "低",
  },
];

export const budgetOverview = {
  total: 3000000,
  spent: 2847692,
  remaining: 152308,
  usageRate: 94.9,
  warnCount: 2,
};

export const budgetDetails = [
  {
    provider: "阿里云",
    budget: 1600000,
    spent: 1520000,
    rate: 95.0,
    status: "预警",
  },
  {
    provider: "Azure",
    budget: 1100000,
    spent: 1010000,
    rate: 91.8,
    status: "预警",
  },
  {
    provider: "K8s",
    budget: 300000,
    spent: 420000,
    rate: 140.0,
    status: "超预算",
  },
];

export const k8sMetrics = {
  totalCost: 486300,
  clusterCount: 12,
  namespaceCount: 86,
  optimizationSavings: 98500,
};

export const clusterTrendData = {
  months: ["4月", "5月", "6月", "7月", "8月", "9月"],
  clusters: {
    "prod-beijing": [85000, 88000, 92000, 95000, 98000, 102000],
    "prod-shanghai": [65000, 68000, 70000, 72000, 75000, 78000],
    "prod-guangzhou": [45000, 48000, 50000, 52000, 54000, 56000],
    staging: [25000, 26000, 28000, 29000, 30000, 32000],
  },
};

export const namespaceTop10 = [
  { name: "order-service", cost: 48500 },
  { name: "payment-gateway", cost: 39200 },
  { name: "user-center", cost: 35800 },
  { name: "logistics", cost: 31200 },
  { name: "marketing", cost: 28500 },
  { name: "data-analytics", cost: 25300 },
  { name: "message-queue", cost: 22100 },
  { name: "search-engine", cost: 19800 },
  { name: "recommendation", cost: 17500 },
  { name: "monitoring", cost: 15200 },
];

export const resourceTypeData = [
  { name: "CPU", value: 185000, color: "#5470c6" },
  { name: "内存", value: 142000, color: "#91cc75" },
  { name: "存储", value: 98000, color: "#fac858" },
  { name: "网络", value: 61300, color: "#ee6666" },
];

export const appListData = [
  {
    name: "订单系统",
    dept: "电商事业部",
    owner: "张三",
    cost: 385000,
    status: "运行中",
  },
  {
    name: "用户中心",
    dept: "平台事业部",
    owner: "李四",
    cost: 312000,
    status: "运行中",
  },
  {
    name: "支付网关",
    dept: "支付事业部",
    owner: "王五",
    cost: 268000,
    status: "运行中",
  },
  {
    name: "物流平台",
    dept: "物流事业部",
    owner: "赵六",
    cost: 245000,
    status: "运行中",
  },
  {
    name: "营销引擎",
    dept: "营销事业部",
    owner: "孙七",
    cost: 198000,
    status: "运行中",
  },
];

export const productListData = [
  {
    name: "ECS 云服务器",
    type: "计算",
    provider: "阿里云",
    apps: 24,
    cost: 852340,
  },
  {
    name: "Virtual Machines",
    type: "计算",
    provider: "Azure",
    apps: 18,
    cost: 623180,
  },
  {
    name: "RDS 数据库",
    type: "数据库",
    provider: "阿里云",
    apps: 15,
    cost: 415200,
  },
];

export const cloudAccountData = [
  {
    name: "生产主账号",
    provider: "阿里云",
    id: "aliyun-prod-001",
    apps: 32,
    cost: 1200000,
    status: "正常",
  },
  {
    name: "Azure 生产订阅",
    provider: "Azure",
    id: "sub-prod-azure",
    apps: 28,
    cost: 1010000,
    status: "正常",
  },
  {
    name: "测试账号",
    provider: "阿里云",
    id: "aliyun-test-001",
    apps: 12,
    cost: 320000,
    status: "正常",
  },
];

export const cloudSecretData = [
  {
    name: "AK-生产只读",
    provider: "阿里云",
    account: "aliyun-prod-001",
    created: "2026-06-15",
    status: "有效",
  },
  {
    name: "SP-Azure-Billing",
    provider: "Azure",
    account: "sub-prod-azure",
    created: "2026-05-20",
    status: "有效",
  },
  {
    name: "AK-测试环境",
    provider: "阿里云",
    account: "aliyun-test-001",
    created: "2026-07-01",
    status: "有效",
  },
];

export function formatPrice(value: number): string {
  if (value >= 10000) {
    return (
      (value / 10000).toFixed(0) +
      "." +
      Math.floor((value % 10000) / 1000) +
      " 万"
    );
  }
  return value.toLocaleString("zh-CN");
}

export function formatPriceFull(value: number): string {
  return value.toLocaleString("zh-CN");
}
