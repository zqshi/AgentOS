# AgentOS 产品设计规范文档

**文档版本：** V1.0
**更新日期：** 2026-01-09
**适用范围：** 灵枢、无影、智核三大产品线

---

## 目录

1. [整体设计理念](#1-整体设计理念)
2. [设计系统基础](#2-设计系统基础)
3. [灵枢设计规范](#3-灵枢设计规范)
4. [无影设计规范](#4-无影设计规范)
5. [智核设计规范](#5-智核设计规范)
6. [通用组件库](#6-通用组件库)
7. [交互逻辑规范](#7-交互逻辑规范)
8. [响应式设计](#8-响应式设计)
9. [可访问性规范](#9-可访问性规范)
10. [技术实现指南](#10-技术实现指南)

---

## 1. 整体设计理念  

### 1.1 产品定位与设计哲学

| 产品 | 定位 | 设计哲学 | 核心隐喻 |
|------|------|---------|---------|
| **灵枢** | 企业智能中枢平台 | 理性、专业、数据驱动 | 大脑与神经网络 |
| **无影** | 集成赋能套件 | 科技、连接、流动 | 网络拓扑与数据流 |
| **智核** | 智能工作台 | 人性化、对话优先、协作 | 智能助手与知识伙伴 |

### 1.2 设计原则

1. **产品独特性**：每个产品有独立的视觉识别系统，但共享基础设计语言
2. **功能优先**：视觉服务于功能，避免过度设计
3. **渐进增强**：从基础功能到高级交互逐步展开
4. **一致性**：同一产品内保持视觉和交互一致性
5. **性能优先**：优先使用CSS动画，避免过度使用JavaScript

---

## 2. 设计系统基础

### 2.1 色彩系统

#### 2.1.1 灵枢色彩

```css
:root {
  /* 主色调 */
  --lingshi-primary: #3b82f6;           /* 蓝色 - 主要操作 */
  --lingshi-secondary: #8b5cf6;         /* 紫色 - 辅助强调 */

  /* 功能色 */
  --lingshi-success: #10b981;           /* 成功/正常状态 */
  --lingshi-warning: #f59e0b;           /* 警告 */
  --lingshi-danger: #ef4444;            /* 错误/危险 */
  --lingshi-neutral: #6b7280;           /* 中性/禁用 */

  /* 浅色变体 */
  --lingshi-primary-light: #dbeafe;
  --lingshi-secondary-light: #ede9fe;
  --lingshi-success-light: #d1fae5;
  --lingshi-warning-light: #fef3c7;
  --lingshi-danger-light: #fee2e2;

  /* 背景 */
  --lingshi-bg: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  --lingshi-card-bg: #ffffff;
}
```

#### 2.1.2 无影色彩

```css
:root {
  /* 主色调 */
  --wuying-primary: #06b6d4;            /* 霓虹青色 - 连接/数据流 */
  --wuying-secondary: #a855f7;          /* 电子紫 - 智能节点 */

  /* 深色背景 */
  --wuying-bg-deep: #0a1929;            /* 深蓝背景 */
  --wuying-bg-card: #0f172a;            /* 卡片背景 */
  --wuying-bg-card-gradient: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);

  /* 功能色 */
  --wuying-success: #10b981;
  --wuying-warning: #f59e0b;
  --wuying-danger: #ef4444;

  /* 文本 */
  --wuying-text-primary: #e2e8f0;
  --wuying-text-secondary: #94a3b8;
  --wuying-text-muted: #64748b;
}
```

#### 2.1.3 智核色彩

```css
:root {
  /* 主色调 - 紫色系 */
  --zhihe-primary: #8b5cf6;             /* AI紫 - 主要操作 */
  --zhihe-secondary: #3b82f6;           /* 智能蓝 - 辅助 */
  --zhihe-accent: #ec4899;              /* 活力粉 - 强调 */

  /* 背景 */
  --zhihe-bg: linear-gradient(135deg, #f8f7ff 0%, #e9e4ff 50%, #f0ebff 100%);
  --zhihe-card-bg: rgba(255, 255, 255, 0.95);

  /* 功能色 */
  --zhihe-success: #10b981;
  --zhihe-warning: #f59e0b;
  --zhihe-danger: #ef4444;

  /* 浅色变体 */
  --zhihe-purple-light: #f5f3ff;
  --zhihe-blue-light: #eff6ff;
  --zhihe-pink-light: #fdf2f8;
}
```

### 2.2 字体系统

#### 2.2.1 灵枢字体

```css
/* 标题/UI元素 */
font-family: 'Inter', system-ui, sans-serif;
font-weight: 400 | 500 | 600 | 700;

/* 字号规范 */
--text-xs: 0.75rem;     /* 12px - 辅助信息 */
--text-sm: 0.875rem;    /* 14px - 正文、表格 */
--text-base: 1rem;      /* 16px - 标准正文 */
--text-lg: 1.125rem;    /* 18px - 次级标题 */
--text-xl: 1.25rem;     /* 20px - 卡片标题 */
--text-2xl: 1.5rem;     /* 24px - 页面标题 */
--text-3xl: 1.875rem;   /* 30px - 数据展示 */
```

#### 2.2.2 无影字体

```css
/* 标题 - 科技感 */
font-family: 'Orbitron', sans-serif;
font-weight: 400 | 500 | 700 | 900;

/* 正文 */
font-family: 'IBM Plex Sans', sans-serif;
font-weight: 300 | 400 | 500 | 600;

/* 应用场景 */
.logo, .page-title, .section-header {
  font-family: 'Orbitron', sans-serif;
}

.body-text, .table-text, .button-text {
  font-family: 'IBM Plex Sans', sans-serif;
}
```

#### 2.2.3 智核字体

```css
/* 标题 - 圆润友好 */
font-family: 'Quicksand', sans-serif;
font-weight: 300 | 400 | 500 | 600 | 700;

/* 正文 - 中文优化 */
font-family: 'Noto Sans SC', sans-serif;
font-weight: 300 | 400 | 500 | 700;

/* 应用场景 */
.logo, .nav-title, .card-title {
  font-family: 'Quicksand', sans-serif;
}

.body-text, .chat-text, .description {
  font-family: 'Noto Sans SC', sans-serif;
}
```

### 2.3 间距系统

```css
/* 统一间距规范（8pt网格系统）*/
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
```

### 2.4 圆角系统

```css
--radius-sm: 0.375rem;   /* 6px - 小按钮、徽章 */
--radius-md: 0.5rem;     /* 8px - 卡片、输入框 */
--radius-lg: 0.75rem;    /* 12px - 大卡片 */
--radius-xl: 1rem;       /* 16px - 特殊卡片 */
--radius-2xl: 1.5rem;    /* 24px - 智核对话气泡 */
--radius-full: 9999px;   /* 圆形 - 头像、徽章 */
```

### 2.5 阴影系统

```css
/* 灵枢 */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 8px 32px rgba(59, 130, 246, 0.2);

/* 无影 */
--shadow-glow: 0 0 20px rgba(6, 182, 212, 0.3);
--shadow-card: 0 8px 32px rgba(6, 182, 212, 0.2);

/* 智核 */
--shadow-soft: 0 4px 20px rgba(139, 92, 246, 0.08);
--shadow-hover: 0 12px 40px rgba(139, 92, 246, 0.15);
```

---

## 3. 灵枢设计规范

### 3.1 设计风格定义

**核心关键词：** 专业、数据驱动、清晰、可靠

**视觉特征：**
- 淡蓝灰渐变背景，营造科技氛围
- 白色卡片布局，信息层次清晰
- 蓝紫色系，体现智能与数据
- 数据可视化突出，图表为核心

### 3.2 布局结构

```
┌─────────────────────────────────────────────────────┐
│  侧边导航栏 (w-64)    │  主内容区 (flex-1)         │
│  ├─ Logo + 标题       │  ├─ 顶部工具栏             │
│  ├─ 核心功能导航      │  ├─ 面包屑导航             │
│  │  ├─ 智能仪表盘     │  ├─ 页面标题 + 操作按钮    │
│  │  ├─ 本体论工厂     │  ├─ 统计卡片区 (4列)       │
│  │  ├─ 知识熔炉       │  ├─ 图表区 (2列)           │
│  │  ├─ 知识图谱       │  ├─ 数据表格区             │
│  │  ├─ 智能体工厂     │  └─ 底部分页器             │
│  │  └─ 进化治理       │                            │
│  └─ 系统管理          │                            │
└─────────────────────────────────────────────────────┘
```

### 3.3 核心组件

#### 3.3.1 导航栏 (Sidebar)

```css
.sidebar {
  width: 16rem; /* 256px */
  background: white;
  border-right: 1px solid #e2e8f0;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
}

.nav-item {
  padding: 0.75rem 1rem;
  border-left: 2px solid transparent;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: #f8fafc;
  border-left-color: #3b82f6;
}

.nav-item.active {
  background-color: #dbeafe;
  border-left-color: #3b82f6;
  font-weight: 500;
}
```

#### 3.3.2 统计卡片 (Stat Card)

```html
<div class="card rounded-lg p-6 bg-white border border-gray-200">
  <!-- 图标区 -->
  <div class="flex items-center justify-between mb-4">
    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
      <i class="fa fa-icon text-blue-600"></i>
    </div>
    <span class="badge">标签</span>
  </div>

  <!-- 数据区 -->
  <h3 class="text-3xl font-bold text-gray-900">数值</h3>
  <p class="text-sm text-gray-600 mt-2">描述文字</p>

  <!-- 趋势区 -->
  <div class="flex items-center mt-3 text-sm">
    <i class="fa fa-arrow-up text-green-500 mr-1"></i>
    <span class="text-green-500">+12%</span>
    <span class="text-gray-500 ml-2">本月</span>
  </div>
</div>
```

**交互规范：**
- 悬停时：卡片上浮2px，阴影加深
- 过渡时间：0.3s cubic-bezier(0.4, 0, 0.2, 1)
- 点击时：可跳转到详情页面

#### 3.3.3 数据表格 (Data Table)

```css
.table-container {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
}

.table-header {
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  letter-spacing: 0.05em;
}

.table-row {
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.2s ease;
}

.table-row:hover {
  background: #f8fafc;
}
```

**规范：**
- 表头固定高度：48px
- 数据行高度：64px
- 文字大小：14px（正文）、12px（辅助）
- 操作按钮间距：8px

#### 3.3.4 图表组件 (Chart)

```javascript
// Chart.js 通用配置
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        boxWidth: 6,
        font: {
          family: 'Inter',
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1f2937',
      bodyColor: '#6b7280',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#6b7280', font: { size: 11 } }
    },
    y: {
      grid: { color: 'rgba(0, 0, 0, 0.05)' },
      ticks: { color: '#6b7280', font: { size: 11 } }
    }
  }
};
```

**图表类型与应用场景：**
- 折线图：趋势分析（知识增长、数据处理）
- 饼图/环形图：占比分布（数据来源、节点类型）
- 柱状图：对比分析（智能体活动、模块使用）
- 仪表盘：实时监控（CPU、内存、存储）

### 3.4 交互动效

#### 3.4.1 卡片悬停

```css
.card {
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}
```

#### 3.4.2 按钮点击

```css
.btn {
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}
```

#### 3.4.3 加载动画

```css
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(59, 130, 246, 0.1);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### 3.5 状态系统

| 状态 | 颜色 | 图标 | 应用场景 |
|------|------|------|---------|
| 正常 | 绿色 #10b981 | ✓ | 系统运行、同步成功 |
| 警告 | 橙色 #f59e0b | ⚠ | 性能预警、配额接近 |
| 错误 | 红色 #ef4444 | ✕ | 连接失败、数据异常 |
| 处理中 | 蓝色 #3b82f6 | ⟳ | 同步中、计算中 |
| 禁用 | 灰色 #6b7280 | - | 功能不可用 |

---

## 4. 无影设计规范

### 4.1 设计风格定义

**核心关键词：** 科技、连接、流动、网络拓扑

**视觉特征：**
- 深蓝黑背景，营造科技暗黑风
- 霓虹青色作为主色，象征数据流
- Canvas网络动画背景，视觉冲击力强
- 发光效果、扫光动画突出科技感

### 4.2 布局结构

```
┌─────────────────────────────────────────────────────┐
│  侧边导航栏 (w-64)    │  主内容区 (flex-1)         │
│  深色背景             │  深色背景 + Canvas动画     │
│  ├─ Logo (发光)       │  ├─ 顶部工具栏             │
│  ├─ 核心模块          │  ├─ 页面标题 (发光文字)    │
│  │  ├─ 集成仪表盘     │  ├─ 指标卡片区 (4列脉冲)   │
│  │  ├─ 连接器工厂     │  ├─ 图表区 (2列)           │
│  │  ├─ API网关        │  ├─ 连接器列表表格         │
│  │  ├─ 安全审计       │  └─ 系统健康度 (3列)       │
│  │  └─ 开发者中心     │                            │
│  └─ 系统设置          │                            │
└─────────────────────────────────────────────────────┘
```

### 4.3 核心组件

#### 4.3.1 网络背景动画

```javascript
// Canvas网络拓扑动画
class NetworkBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodes = [];
    this.nodeCount = 50;
    this.maxDistance = 150;

    this.init();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    for (let i = 0; i < this.nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }

    this.animate();
  }

  drawConnections() {
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.maxDistance) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
          this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
          this.ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - distance / this.maxDistance)})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawConnections();

    this.nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// 使用
const canvas = document.getElementById('network-bg');
new NetworkBackground(canvas);
```

#### 4.3.2 状态指示灯

```html
<span class="status-dot active"></span>
```

```css
.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
}

.status-dot.active {
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.status-dot.active::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: inherit;
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.status-dot.error {
  background: #ef4444;
  box-shadow: 0 0 10px #ef4444;
}

.status-dot.inactive {
  background: #6b7280;
}
```

#### 4.3.3 脉冲卡片

```css
.stat-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid rgba(6, 182, 212, 0.3);
  position: relative;
  overflow: hidden;
}

.stat-card::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}
```

#### 4.3.4 扫光效果

```css
.card {
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.1), transparent);
  transition: left 0.6s ease;
}

.card:hover::before {
  left: 100%;
}
```

### 4.4 图标与徽章

```html
<!-- 连接器类型徽章 -->
<span class="badge badge-info">办公协作</span>
<span class="badge badge-success">业务系统</span>
<span class="badge badge-warning">研发工具</span>
```

```css
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-info {
  background: rgba(6, 182, 212, 0.2);
  color: #06b6d4;
  border: 1px solid #06b6d4;
}

.badge-success {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid #10b981;
}

.badge-warning {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}
```

### 4.5 性能指标可视化

```html
<!-- 进度条 -->
<div class="progress-bar">
  <div class="progress-fill" style="width: 68%"></div>
</div>
<p class="text-xs text-gray-500 mt-1">配额使用: 68%</p>
```

```css
.progress-bar {
  background: #1e293b;
  border-radius: 9999px;
  overflow: hidden;
  height: 8px;
}

.progress-fill {
  background: linear-gradient(90deg, #06b6d4 0%, #0891b2 100%);
  height: 100%;
  transition: width 1s ease;
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
}
```

---

## 5. 智核设计规范

### 5.1 设计风格定义

**核心关键词：** 人性化、对话优先、协作、温暖

**视觉特征：**
- 浅紫色渐变背景，柔和舒适
- 紫色系主色调，体现AI智能
- 浮动气泡背景，动态有趣
- 对话气泡设计，自然交互

### 5.2 布局结构

```
┌─────────────────────────────────────────────────────┐
│  侧边导航栏 (w-64)    │  主内容区 (flex-1)         │
│  白色半透明           │  浅紫渐变背景 + 气泡动画   │
│  ├─ Logo (脉冲发光)   │  ├─ 顶部工具栏 + 用户头像  │
│  ├─ 核心功能          │  ├─ 今日智能摘要 (3卡片)   │
│  │  ├─ 主工作台       │  ├─ 对话区 (左2/3)         │
│  │  ├─ 智能知识库     │  │  ├─ AI消息气泡          │
│  │  ├─ 情境知识       │  │  ├─ 用户消息气泡        │
│  │  ├─ 智能体市场     │  │  ├─ 输入框 + 快捷操作   │
│  │  └─ 团队空间       │  ├─ 侧边面板 (右1/3)       │
│  ├─ 个人中心          │  │  ├─ 活跃智能体          │
│  └─ 设置              │  │  └─ 最近浏览            │
│                       │  └─ 智能体市场 (4卡片)     │
└─────────────────────────────────────────────────────┘
```

### 5.3 核心组件

#### 5.3.1 浮动气泡背景

```html
<div class="floating-bubbles">
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
  <div class="bubble"></div>
</div>
```

```css
.floating-bubbles {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(139, 92, 246, 0.2),
    rgba(59, 130, 246, 0.1)
  );
  animation: float 20s infinite ease-in-out;
}

.bubble:nth-child(1) {
  width: 300px;
  height: 300px;
  left: 10%;
  top: 10%;
  animation-delay: 0s;
}

.bubble:nth-child(2) {
  width: 200px;
  height: 200px;
  right: 15%;
  top: 20%;
  animation-delay: 5s;
}

.bubble:nth-child(3) {
  width: 250px;
  height: 250px;
  left: 60%;
  bottom: 10%;
  animation-delay: 10s;
}

.bubble:nth-child(4) {
  width: 180px;
  height: 180px;
  right: 5%;
  bottom: 20%;
  animation-delay: 15s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0) scale(1);
  }
  25% {
    transform: translateY(-30px) translateX(20px) scale(1.05);
  }
  50% {
    transform: translateY(-50px) translateX(-20px) scale(0.95);
  }
  75% {
    transform: translateY(-30px) translateX(20px) scale(1.05);
  }
}
```

#### 5.3.2 对话气泡

```html
<!-- AI消息 -->
<div class="message ai">
  <div class="flex items-start space-x-3">
    <div class="agent-avatar">
      <i class="fa fa-magic"></i>
    </div>
    <div class="flex-1">
      <div class="bubble">
        <p class="text-sm">这是AI回复的内容</p>
      </div>
      <p class="text-xs text-gray-400 mt-1">刚刚</p>
    </div>
  </div>
</div>

<!-- 用户消息 -->
<div class="message user">
  <div class="flex items-start space-x-3 justify-end">
    <div class="flex-1 text-right">
      <div class="bubble">
        <p class="text-sm">这是用户发送的内容</p>
      </div>
      <p class="text-xs text-gray-400 mt-1">1分钟前</p>
    </div>
    <div class="user-avatar">李</div>
  </div>
</div>
```

```css
.message {
  margin-bottom: 1rem;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* AI消息气泡 */
.message.ai .bubble {
  background: white;
  color: #1f2937;
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 18px 18px 18px 4px;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.1);
  padding: 0.75rem 1rem;
  display: inline-block;
  max-width: 28rem;
}

/* 用户消息气泡 */
.message.user .bubble {
  background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
  color: white;
  border-radius: 18px 18px 4px 18px;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  padding: 0.75rem 1rem;
  display: inline-block;
  max-width: 28rem;
}

/* 智能体头像 */
.agent-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  flex-shrink: 0;
}

/* 用户头像 */
.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  flex-shrink: 0;
}
```

#### 5.3.3 打字指示器

```html
<div class="typing-indicator">
  <div class="typing-dot"></div>
  <div class="typing-dot"></div>
  <div class="typing-dot"></div>
</div>
```

```css
.typing-indicator {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0.5rem 1rem;
}

.typing-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #8b5cf6;
  animation: typing 1.4s infinite;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}
```

#### 5.3.4 智能体卡片

```html
<div class="agent-card rounded-xl p-5 cursor-pointer">
  <div class="flex items-start justify-between mb-3">
    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl">
      <i class="fa fa-gavel"></i>
    </div>
    <span class="badge badge-purple">热门</span>
  </div>
  <h4 class="font-bold text-gray-800 mb-2">合同审查官</h4>
  <p class="text-xs text-gray-600 mb-3">智能识别合同风险条款，提供优化建议</p>
  <div class="flex items-center justify-between">
    <div class="flex items-center text-xs text-gray-500">
      <i class="fa fa-star text-yellow-400 mr-1"></i>
      <span>4.8</span>
    </div>
    <span class="text-xs text-gray-500">2.3K使用</span>
  </div>
</div>
```

```css
.agent-card {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
}

.agent-card:hover {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  transform: scale(1.02);
}
```

#### 5.3.5 知识卡片

```css
.knowledge-card {
  background: white;
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-left: 4px solid #8b5cf6;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.knowledge-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.05), transparent);
  transition: left 0.5s ease;
}

.knowledge-card:hover::before {
  left: 100%;
}

.knowledge-card:hover {
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
  transform: translateY(-2px);
}
```

#### 5.3.6 输入框

```css
.chat-input {
  background: white;
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 24px;
  padding: 12px 20px;
  transition: all 0.3s ease;
  width: 100%;
  font-size: 0.875rem;
  outline: none;
}

.chat-input:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
}

.chat-input::placeholder {
  color: #9ca3af;
}
```

### 5.4 进度可视化

```html
<div>
  <div class="flex items-center justify-between mb-2">
    <span class="text-sm text-gray-700">产品管理</span>
    <span class="text-sm font-bold text-ai-purple">75%</span>
  </div>
  <div class="w-full bg-purple-100 rounded-full h-2">
    <div class="bg-gradient-to-r from-ai-purple to-ai-blue h-2 rounded-full" style="width: 75%"></div>
  </div>
</div>
```

---

## 6. 通用组件库

### 6.1 按钮组件

#### 6.1.1 主按钮 (Primary Button)

```html
<button class="btn-primary px-6 py-3 rounded-lg text-white font-medium">
  <i class="fa fa-plus mr-2"></i>新建
</button>
```

**产品适配：**

```css
/* 灵枢 */
.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* 无影 */
.btn-primary {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
}

/* 智核 */
.btn-primary {
  background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

/* 通用悬停 */
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}
```

#### 6.1.2 次按钮 (Secondary Button)

```html
<button class="btn-secondary px-4 py-2 rounded-lg font-medium">
  <i class="fa fa-filter mr-2"></i>筛选
</button>
```

```css
.btn-secondary {
  background: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(var(--primary-rgb), 0.1);
  box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.3);
}
```

#### 6.1.3 图标按钮

```html
<button class="btn-icon w-10 h-10 rounded-lg flex items-center justify-center">
  <i class="fa fa-edit"></i>
</button>
```

```css
.btn-icon {
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #6b7280;
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background: var(--primary-light);
  border-color: var(--primary-color);
  color: var(--primary-color);
}
```

### 6.2 表单组件

#### 6.2.1 输入框

```html
<input type="text" class="form-input" placeholder="请输入...">
```

```css
.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

/* 错误状态 */
.form-input.error {
  border-color: #ef4444;
}

.form-input.error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

#### 6.2.2 下拉选择

```html
<select class="form-select">
  <option>选项1</option>
  <option>选项2</option>
</select>
```

```css
.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
}
```

#### 6.2.3 搜索框

```html
<div class="search-box">
  <i class="fa fa-search"></i>
  <input type="text" placeholder="搜索...">
</div>
```

```css
.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box i {
  position: absolute;
  left: 1rem;
  color: #9ca3af;
}

.search-box input {
  padding-left: 3rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
}
```

### 6.3 通知组件

```javascript
// 通知系统
class NotificationSystem {
  constructor() {
    this.container = this.createContainer();
  }

  createContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
    `;
    document.body.appendChild(container);
    return container;
  }

  show(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    const icons = {
      success: 'check-circle',
      error: 'times-circle',
      warning: 'exclamation-triangle',
      info: 'info-circle'
    };

    notification.innerHTML = `
      <i class="fa fa-${icons[type]} mr-3"></i>
      <span>${message}</span>
      <button class="notification-close ml-auto">
        <i class="fa fa-times"></i>
      </button>
    `;

    this.container.appendChild(notification);

    // 动画进入
    setTimeout(() => notification.classList.add('show'), 10);

    // 关闭按钮
    notification.querySelector('.notification-close').addEventListener('click', () => {
      this.remove(notification);
    });

    // 自动关闭
    if (duration > 0) {
      setTimeout(() => this.remove(notification), duration);
    }
  }

  remove(notification) {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }
}

// 使用
const notifications = new NotificationSystem();
notifications.show('操作成功！', 'success');
notifications.show('请检查输入', 'error');
```

```css
.notification {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-left: 4px solid;
  transform: translateX(400px);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification.show {
  transform: translateX(0);
  opacity: 1;
}

.notification-success {
  border-left-color: #10b981;
  color: #059669;
}

.notification-error {
  border-left-color: #ef4444;
  color: #dc2626;
}

.notification-warning {
  border-left-color: #f59e0b;
  color: #d97706;
}

.notification-info {
  border-left-color: #3b82f6;
  color: #2563eb;
}

.notification-close {
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s ease;
}

.notification-close:hover {
  color: #6b7280;
}
```

### 6.4 模态框组件

```html
<div class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h3 class="modal-title">标题</h3>
      <button class="modal-close">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <div class="modal-body">
      内容区域
    </div>
    <div class="modal-footer">
      <button class="btn-secondary">取消</button>
      <button class="btn-primary">确定</button>
    </div>
  </div>
</div>
```

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal {
  background: white;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.modal-close {
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  transition: color 0.2s ease;
}

.modal-close:hover {
  color: #6b7280;
}

.modal-body {
  padding: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 7. 交互逻辑规范

### 7.1 导航交互

```javascript
// 侧边栏导航切换
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();

      // 移除所有active状态
      navItems.forEach(nav => {
        nav.classList.remove('active');
        const icon = nav.querySelector('i');
        icon.classList.remove('text-primary');
        icon.classList.add('text-gray-400');
      });

      // 添加active到当前项
      this.classList.add('active');
      const icon = this.querySelector('i');
      icon.classList.remove('text-gray-400');
      icon.classList.add('text-primary');

      // 切换内容区
      const section = this.dataset.section;
      showSection(section);
    });
  });
}

function showSection(sectionId) {
  // 隐藏所有section
  document.querySelectorAll('[id$="-section"]').forEach(section => {
    section.classList.add('hidden');
  });

  // 显示目标section
  const targetSection = document.getElementById(`${sectionId}-section`);
  if (targetSection) {
    targetSection.classList.remove('hidden');
    targetSection.classList.add('fade-in');
  }
}
```

### 7.2 表格交互

```javascript
// 表格排序
function initTableSort() {
  const headers = document.querySelectorAll('.table-header th[data-sortable]');

  headers.forEach(header => {
    header.style.cursor = 'pointer';
    header.innerHTML += ' <i class="fa fa-sort ml-2 text-gray-400"></i>';

    header.addEventListener('click', function() {
      const column = this.dataset.sortable;
      const currentOrder = this.dataset.order || 'asc';
      const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

      // 更新图标
      const icon = this.querySelector('i');
      icon.className = `fa fa-sort-${newOrder === 'asc' ? 'up' : 'down'} ml-2 text-primary`;

      this.dataset.order = newOrder;

      // 执行排序
      sortTable(column, newOrder);
    });
  });
}

// 表格筛选
function initTableFilter() {
  const filterInput = document.querySelector('.table-filter');
  const rows = document.querySelectorAll('.table-row');

  filterInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

// 行选择
function initTableRowSelection() {
  const rows = document.querySelectorAll('.table-row');

  rows.forEach(row => {
    row.addEventListener('click', function(e) {
      // 如果点击的是操作按钮，不触发行选择
      if (e.target.closest('.btn-icon')) return;

      this.classList.toggle('selected');
      updateSelectionCount();
    });
  });
}
```

### 7.3 图表交互

```javascript
// 图表时间范围切换
function initChartTimeRange() {
  const rangeSelector = document.querySelector('.time-range-selector');

  rangeSelector.addEventListener('change', function() {
    const range = this.value;
    updateChartData(range);
  });
}

function updateChartData(range) {
  // 显示加载状态
  showChartLoading();

  // 模拟API请求
  setTimeout(() => {
    const newData = fetchDataByRange(range);
    chart.data.datasets[0].data = newData;
    chart.update('active');
    hideChartLoading();
  }, 500);
}

// 图表导出
function exportChart(chartId, filename) {
  const canvas = document.getElementById(chartId);
  const url = canvas.toDataURL('image/png');

  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = url;
  link.click();
}
```

### 7.4 实时刷新逻辑

```javascript
// 仪表盘数据刷新
class DashboardRefresher {
  constructor(interval = 30000) { // 默认30秒
    this.interval = interval;
    this.timerId = null;
  }

  start() {
    this.refresh();
    this.timerId = setInterval(() => this.refresh(), this.interval);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  async refresh() {
    try {
      // 显示刷新指示器
      showRefreshIndicator();

      // 并行请求多个数据源
      const [stats, charts, activities] = await Promise.all([
        fetchStats(),
        fetchChartData(),
        fetchActivities()
      ]);

      // 更新UI
      updateStats(stats);
      updateCharts(charts);
      updateActivities(activities);

      // 隐藏指示器
      hideRefreshIndicator();

      // 显示成功提示
      showNotification('数据已更新', 'success', 2000);

    } catch (error) {
      console.error('刷新失败:', error);
      showNotification('数据更新失败', 'error');
    }
  }
}

// 使用
const refresher = new DashboardRefresher(30000);
refresher.start();

// 页面卸载时停止
window.addEventListener('beforeunload', () => {
  refresher.stop();
});
```

### 7.5 搜索防抖

```javascript
// 搜索防抖函数
function debounce(func, delay = 300) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 使用
const searchInput = document.querySelector('.search-input');
const debouncedSearch = debounce(performSearch, 300);

searchInput.addEventListener('input', function() {
  const query = this.value;
  debouncedSearch(query);
});

function performSearch(query) {
  if (query.length < 2) return;

  // 显示加载状态
  showSearchLoading();

  // 执行搜索
  fetch(`/api/search?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(results => {
      displaySearchResults(results);
      hideSearchLoading();
    })
    .catch(error => {
      console.error('搜索失败:', error);
      hideSearchLoading();
    });
}
```

---

## 8. 响应式设计

### 8.1 断点系统

```css
/* Tailwind CSS 断点 */
/* sm: 640px */
@media (min-width: 640px) { }

/* md: 768px */
@media (min-width: 768px) { }

/* lg: 1024px */
@media (min-width: 1024px) { }

/* xl: 1280px */
@media (min-width: 1280px) { }

/* 2xl: 1536px */
@media (min-width: 1536px) { }
```

### 8.2 侧边栏响应式

```html
<!-- 移动端汉堡菜单 -->
<button class="mobile-menu-toggle md:hidden">
  <i class="fa fa-bars"></i>
</button>

<!-- 侧边栏 -->
<aside class="sidebar hidden md:block">
  <!-- 导航内容 -->
</aside>
```

```css
/* 移动端侧边栏 */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: -256px;
    height: 100vh;
    z-index: 999;
    transition: left 0.3s ease;
  }

  .sidebar.open {
    left: 0;
  }

  /* 遮罩层 */
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
    display: none;
  }

  .sidebar.open ~ .sidebar-overlay {
    display: block;
  }
}
```

```javascript
// 移动端菜单切换
const menuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// 点击遮罩层关闭
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('sidebar-overlay')) {
    sidebar.classList.remove('open');
  }
});
```

### 8.3 响应式网格

```html
<!-- 响应式统计卡片 -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  <div class="card">卡片1</div>
  <div class="card">卡片2</div>
  <div class="card">卡片3</div>
  <div class="card">卡片4</div>
</div>

<!-- 响应式两列布局 -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div class="card">左侧内容</div>
  <div class="card">右侧内容</div>
</div>

<!-- 响应式三列布局 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="card">列1</div>
  <div class="card">列2</div>
  <div class="card">列3</div>
</div>
```

---

## 9. 可访问性规范

### 9.1 键盘导航

```javascript
// 为交互元素添加键盘支持
document.querySelectorAll('.nav-item, .btn, .card[data-clickable]').forEach(el => {
  // 确保可以被Tab键聚焦
  if (!el.hasAttribute('tabindex')) {
    el.setAttribute('tabindex', '0');
  }

  // 添加Enter/Space键触发
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      el.click();
    }
  });
});

// 焦点可见性
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});
```

```css
/* 键盘导航时显示焦点框 */
.keyboard-nav *:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* 鼠标导航时隐藏焦点框 */
*:focus {
  outline: none;
}
```

### 9.2 ARIA标签

```html
<!-- 导航 -->
<nav aria-label="主导航">
  <a href="#" class="nav-item" aria-current="page">仪表盘</a>
  <a href="#" class="nav-item">数据分析</a>
</nav>

<!-- 按钮 -->
<button aria-label="刷新数据" class="btn-icon">
  <i class="fa fa-refresh" aria-hidden="true"></i>
</button>

<!-- 模态框 -->
<div class="modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
  <h3 id="modal-title">标题</h3>
  <button aria-label="关闭对话框" class="modal-close">
    <i class="fa fa-times" aria-hidden="true"></i>
  </button>
</div>

<!-- 表格 -->
<table role="table" aria-label="连接器列表">
  <thead role="rowgroup">
    <tr role="row">
      <th role="columnheader">名称</th>
      <th role="columnheader">状态</th>
    </tr>
  </thead>
  <tbody role="rowgroup">
    <tr role="row">
      <td role="cell">连接器A</td>
      <td role="cell">正常</td>
    </tr>
  </tbody>
</table>
```

### 9.3 颜色对比度

```css
/* 确保文字与背景对比度至少为4.5:1（正常文本）或3:1（大文本） */

/* 灵枢 - 良好对比度 */
--text-on-white: #1f2937;      /* 对比度 15.8:1 */
--text-secondary: #6b7280;     /* 对比度 5.2:1 */
--primary-on-white: #3b82f6;   /* 对比度 4.6:1 */

/* 无影 - 深色背景 */
--text-on-dark: #e2e8f0;       /* 对比度 12.5:1 */
--text-secondary: #94a3b8;     /* 对比度 6.8:1 */

/* 智核 - 浅色背景 */
--text-on-light: #1f2937;      /* 对比度 15.8:1 */
--purple-on-light: #7c3aed;    /* 对比度 5.1:1 */
```

---

## 10. 技术实现指南

### 10.1 技术栈

```json
{
  "核心框架": "HTML5 + CSS3 + Vanilla JavaScript",
  "CSS框架": "Tailwind CSS 3.x",
  "图表库": "Chart.js 4.x",
  "图标库": "Font Awesome 4.7",
  "字体": {
    "灵枢": "Inter",
    "无影": "Orbitron + IBM Plex Sans",
    "智核": "Quicksand + Noto Sans SC"
  },
  "兼容性": "Chrome 90+, Safari 14+, Edge 90+, Firefox 88+"
}
```

### 10.2 CDN引入

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Font Awesome -->
<link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js"></script>

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 10.3 文件结构

```
product/
├── index.html              # 主HTML文件
├── css/
│   └── style.css          # 自定义样式（补充Tailwind）
├── js/
│   ├── main.js            # 主JavaScript文件
│   ├── charts.js          # 图表初始化
│   ├── navigation.js      # 导航逻辑
│   └── utils.js           # 工具函数
├── assets/
│   ├── images/            # 图片资源
│   └── icons/             # 自定义图标
└── README.md              # 产品说明
```

### 10.4 性能优化

```javascript
// 1. 图片懒加载
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

// 2. 防抖节流
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 3. 虚拟滚动（大列表优化）
class VirtualScroller {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight) + 2;
    this.startIndex = 0;

    this.init();
  }

  init() {
    this.container.style.height = `${this.items.length * this.itemHeight}px`;
    this.container.style.position = 'relative';

    this.render();

    this.container.addEventListener('scroll', throttle(() => {
      this.startIndex = Math.floor(this.container.scrollTop / this.itemHeight);
      this.render();
    }, 50));
  }

  render() {
    const endIndex = Math.min(this.startIndex + this.visibleCount, this.items.length);
    const visibleItems = this.items.slice(this.startIndex, endIndex);

    this.container.innerHTML = visibleItems.map((item, i) => `
      <div style="position: absolute; top: ${(this.startIndex + i) * this.itemHeight}px; height: ${this.itemHeight}px;">
        ${item}
      </div>
    `).join('');
  }
}
```

### 10.5 浏览器兼容性处理

```javascript
// 检测浏览器支持
function checkBrowserSupport() {
  const supports = {
    grid: CSS.supports('display', 'grid'),
    flexbox: CSS.supports('display', 'flex'),
    backdrop: CSS.supports('backdrop-filter', 'blur(10px)'),
    customProperties: window.CSS && CSS.supports('color', 'var(--primary)')
  };

  if (!supports.grid || !supports.flexbox) {
    showBrowserWarning();
  }

  return supports;
}

// Polyfill for IntersectionObserver
if (!('IntersectionObserver' in window)) {
  console.warn('IntersectionObserver not supported, loading polyfill...');
  // 加载 polyfill
}
```

---

## 附录：快速参考

### A. 颜色速查表

| 用途 | 灵枢 | 无影 | 智核 |
|------|------|------|------|
| 主色 | #3b82f6 | #06b6d4 | #8b5cf6 |
| 辅色 | #8b5cf6 | #a855f7 | #3b82f6 |
| 成功 | #10b981 | #10b981 | #10b981 |
| 警告 | #f59e0b | #f59e0b | #f59e0b |
| 错误 | #ef4444 | #ef4444 | #ef4444 |
| 背景 | #f8fafc | #0a1929 | #f8f7ff |

### B. 字号速查表

| 名称 | 大小 | 用途 |
|------|------|------|
| xs | 12px | 辅助信息、时间戳 |
| sm | 14px | 表格内容、次要文本 |
| base | 16px | 正文 |
| lg | 18px | 次级标题 |
| xl | 20px | 卡片标题 |
| 2xl | 24px | 页面标题 |
| 3xl | 30px | 数据展示 |

### C. 间距速查表

| 名称 | 大小 | 用途 |
|------|------|------|
| 1 | 4px | 最小间距 |
| 2 | 8px | 紧凑元素 |
| 3 | 12px | 小间距 |
| 4 | 16px | 标准间距 |
| 6 | 24px | 卡片内边距 |
| 8 | 32px | 区块间距 |

### D. 动画速查表

| 动画 | 时长 | 缓动函数 | 用途 |
|------|------|---------|------|
| 快速 | 0.15s | ease | 按钮点击 |
| 标准 | 0.3s | ease | 悬停效果 |
| 平滑 | 0.4s | cubic-bezier(0.4, 0, 0.2, 1) | 卡片过渡 |
| 缓慢 | 0.6s | ease-out | 页面切换 |

---

**文档维护说明：**

1. 本文档应随产品迭代持续更新
2. 新增组件需补充到通用组件库章节
3. 设计变更需同步更新相关规范
4. 建议每季度进行一次全面审查

**版本历史：**

| 版本 | 日期 | 变更说明 | 作者 |
|------|------|---------|------|
| V1.0 | 2026-01-09 | 初始版本，包含三大产品完整设计规范 | Claude |

---

**联系方式：**

如有疑问或建议，请联系设计团队。
