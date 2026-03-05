# Nano Banana 2 — Nuxt 4 交互文档

> 本文档由当前 React + Vite 工程逆向整理，目标技术栈为 **Nuxt 4**。  
> 所有文本内容均从源码原封不动复制，Mock 数据结构完整保留，供开发人员按规范迁移。

---

## 一、技术栈与工程配置

### 1.1 核心依赖

| 包名 | 用途 | 备注 |
|---|---|---|
| nuxt@^4 | 主框架 | `nitro.preset: 'bun'`；vue / vue-router 等自动关联，无需单独声明 |
| @nuxt/ui | 主 UI 框架 | 所有可用组件优先使用，不手写实现 |
| @nuxtjs/sitemap | 生成 sitemap.xml | 包含 `lastmod` 和 `priority`（默认 1） |
| @nuxtjs/robots | 生成 robots.txt | 生产环境允许抓取，其他环境禁止 |
| @nuxt/scripts | 引入第三方 JS | — |
| @nuxt/eslint | 代码校验 & 格式化 | 标准级别，commit 时校验，保存时格式化 |
| @pinia/nuxt | 状态管理 | — |
| bun | runtime & 包管理 | — |
| bun-types | Bun 类型包 | 防止 TS 报错 |
| pm2 | 部署 | cluster 模式，`instances: 'max'`，config 文件放 `docker/` |

### 1.2 Nuxt DevTools

仅在开发环境展示，`nuxt.config.ts` 中配置 `devtools: { enabled: process.dev }`。

---

## 二、全局规范

### 2.1 CSS 主题变量

> 只允许修改以下指定变量，其他变量使用 Tailwind CSS 默认值，不得擅自修改。

#### Light Mode（默认）

```css
:root {
  --primary: 240 73.9% 61%;
  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  --border: 240 15% 88%;
}
```

#### Dark Mode

```css
.dark {
  --primary: 240 73.9% 61%;
  --background: 240 6.7% 20.6%;
  --foreground: 0 0% 100%;
  --border: 240 16% 94%;
}
```

> **注意**：CSS 变量格式需符合 @nuxt/ui 的要求。不允许直接修改 `main.css` 文件，如需修改请给出清单由开发人员手动操作。页面级样式按页面文件名单独创建 CSS 文件，放在 `assets/css/` 文件夹内。

### 2.2 字体

```
Display Font: 'Space Grotesk', sans-serif  — 用于 h1~h6
Body Font:    'Inter', sans-serif          — 用于正文
```

通过 `@nuxt/scripts` 或 `@nuxt/fonts` 引入 Google Fonts。

### 2.3 通用交互规范

1. **所有可点击元素**必须加 hover 效果
2. 可点击按钮和 `<a>` 标签 hover 时鼠标样式为 `cursor: pointer`
3. 所有页面支持亮色/暗色模式切换能力（非特意说明不展示切换按钮）
4. `input` 元素 focus 状态**不加 shadow 效果**（除非特殊说明）
5. 图片元素无法获取地址时，直接使用 `src` 为空的 `<img>` 标签并设正确 `width` / `height` 占位，不自由发挥
6. 文本内容从本文档原封不动复制，不自由发挥

### 2.4 组件目录规范

```
components/
  index/           ← 首页组件
    HeroSection.vue
    ConfigPanel.vue
    ScenarioShowcase.vue
    FeatureGrid.vue
    HowItWorks.vue
    Testimonials.vue
    FAQSection.vue
```

> 所有组件必须放入以调用该组件的**页面名命名**的文件夹下，不允许直接放在 `components/` 根目录。

### 2.5 Server 端规范

- 避免使用 Node.js 专有 API，优先使用 Bun 提供的能力
- 其次使用二者都支持的方法
- 无法实现的功能请给出清单，由研发人员介入

---

## 三、页面结构与组件树

### 3.1 页面路由

| 路由 | 页面文件 | 说明 |
|---|---|---|
| `/` | `pages/index.vue` | 首页（唯一页面） |

### 3.2 首页组件树

```
pages/index.vue
├── <IndexHeroSection />          ← 标题区
├── <IndexConfigPanel />          ← 左侧配置面板（sticky）
├── <IndexScenarioShowcase />     ← 右侧场景展示区（含 Tabs）
├── <IndexFeatureGrid />          ← 功能特性（交替图文）
├── <IndexHowItWorks />           ← 使用步骤（3 卡片）
├── <IndexTestimonials />         ← 用户评价（6 卡片）
└── <IndexFAQSection />           ← 常见问题（手风琴）
```

### 3.3 首页布局

```vue
<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-background">
    <!-- 上半区：左右分栏 -->
    <div class="container mx-auto px-4 pt-8 md:pt-12">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-start">
        <!-- 左侧：配置面板，sticky -->
        <div class="w-full lg:w-[35%] lg:sticky lg:top-8">
          <IndexConfigPanel />
        </div>
        <!-- 右侧：Hero + 场景展示 -->
        <div class="w-full lg:w-[65%] flex flex-col" style="gap: clamp(1rem, 2vh, 2rem)">
          <IndexHeroSection />
          <IndexScenarioShowcase />
        </div>
      </div>
    </div>

    <!-- 下半区：全宽区块 -->
    <IndexFeatureGrid />
    <IndexHowItWorks />
    <IndexTestimonials />
    <IndexFAQSection />
  </div>
</template>
```

---

## 四、Mock 数据结构

> **注意：本项目不需要多语言支持，所有文案仅使用中文。**

### 4.1 通用 UI 文案

```ts
const locales = {
  heroTitle: 'Nano Banana 2：专业 AI 图像创作工具',
  heroSubtitle: '释放无限创造力：面向专业人士的高性能多模型 AI 图像生成。',
  resolution: '清晰度',
  referenceImage: '参考图片',
  prompt: '提示词',
  generate: '生成',
  generating: '生成中...',
  faqTitle: '常见问题',
  uploadOrSelect: '点击上传参考图片',
  generateNow: '立即使用 →',
  modelLabel: '模型',
  quantity: '生图数量',
  aspectRatio: '生图比例',
  promptPlaceholder: '描述你想要创建的图像...',
};
```

### 4.2 模型配置

```ts
interface ModelFieldConfig {
  type: 'upload' | 'select' | 'number' | 'radio';
  labelKey: string;
  options?: string[];
  default?: string | number;
}

interface ModelConfig {
  id: string;
  name: string;
  desc: string;
  fields: ModelFieldConfig[];
}

const modelConfigs: ModelConfig[] = [
  {
    id: 'nano-banana-2',
    name: 'Nano Banana 2',
    desc: '多风格 AI 图像生成，支持高分辨率输出。',
    fields: [
      { type: 'upload', labelKey: 'referenceImage' },
      { type: 'radio', labelKey: 'resolution', options: ['1K', '2K', '4K'], default: '2K' },
      { type: 'radio', labelKey: 'quantity', options: ['1', '2', '3', '4'], default: '1' },
      { type: 'radio', labelKey: 'aspectRatio', options: ['1:1', '3:4', '4:3', '9:16', '16:9'], default: '1:1' },
    ],
  },
  {
    id: 'nano-banana-pro',
    name: 'Nano Banana Pro',
    desc: '专业级模型，增强细节、一致性和 4K 渲染。',
    fields: [
      { type: 'upload', labelKey: 'referenceImage' },
      { type: 'radio', labelKey: 'resolution', options: ['2K', '4K'], default: '4K' },
      { type: 'radio', labelKey: 'quantity', options: ['1', '2', '3', '4'], default: '1' },
      { type: 'radio', labelKey: 'aspectRatio', options: ['1:1', '3:4', '4:3', '9:16', '16:9'], default: '1:1' },
    ],
  },
];
```

### 4.3 场景标签页

```ts
interface Scenario {
  id: string;
  name: string;
  images: { alt: string; prompt: string }[];
}

const scenarios: Scenario[] = [
  {
    id: 'search',
    name: '搜索驱动 & 趋势',
    images: [{
      alt: 'AI搜索驱动面板',
      prompt: '根据当前搜索话题生成趋势视觉内容，仪表板风格图片网格',
    }],
  },
  {
    id: 'multiangle',
    name: '多角度展示',
    images: [{
      alt: '多角度手提包产品图',
      prompt: '奢华黑色手提包6角度专业产品摄影，白色摄影棚背景',
    }],
  },
  {
    id: 'text',
    name: '文字渲染 & 翻译',
    images: [{
      alt: 'AI海报文字渲染',
      prompt: '创意营销海报，大胆的"MARKETING"文字叠加在彩色抽象艺术背景上',
    }],
  },
  {
    id: 'consistency',
    name: '一致性',
    images: [{
      alt: '角色一致性参考表',
      prompt: '角色一致性参考表，动漫风格，同一角色5种不同服装和姿势',
    }],
  },
];
```

### 4.4 功能特性

每行由「文字块 + 图片块」组成，奇偶行图文交替方向。

```ts
const featureRows = [
  {
    icon: 'Plug',               // @nuxt/ui 对应 icon name: i-lucide-plug
    name: '免费高速与专业级 4K 图像生成能力',
    desc: 'Nano Banana 2 基于 Gemini 3.1 Flash，让您快速创建、编辑和融合 4K 图像。精准文字渲染、多图编辑，免费享受专业级能力。',
    image: 'feat-api.jpg',
    alt: 'Nano Banana 2 API integration workflow dashboard',
  },
  {
    icon: 'Layers',             // i-lucide-layers
    name: '角色稳定、速度快、性价比高',
    desc: 'Nano Banana 2 可在多张图像中保持最多 5 个角色和 14 个对象的一致性。它快速生成 4K 图像，成本仅为 Nano Banana Pro 的一半。这种速度、稳定性和实惠的价格，使其成为需要可靠专业成果的创作者的理想选择。',
    image: 'feat-models.jpg',
    alt: 'Nano Banana 2 multi-model AI image outputs',
  },
  {
    icon: 'Download',           // i-lucide-download
    name: '专业文字渲染与翻译',
    desc: '图像中的文字清晰准确。Nano Banana 2 修复 AI 常见的拼写错误、Logo 损坏和标签混乱等问题。您可以添加标题、图表标注，或进行文字翻译，同时保持字体、排版和风格的一致性，适用于营销材料或演示文稿。',
    image: 'feat-export.jpg',
    alt: 'Nano Banana 2 bulk image export interface',
  },
  {
    icon: 'Paintbrush',         // i-lucide-paintbrush
    name: '什么是 Nano Banana 2？',
    desc: 'Nano Banana 2 是一款基于 Gemini 3.1 Flash 的高速 AI 图像模型。它让您能够快速创建、编辑和融合 4K 图像，并具备强大的专业级能力。借助实时搜索增强技术，Nano Banana 2 能够理解最新设备和流行趋势，让生成结果真实可信而非凭空猜测。它还支持精准的文字渲染，修复图像内的拼写错误和排版问题。在保持最多 5 个角色和 14 个对象一致性的同时，运行速度快，成本仅为 Nano Banana Pro 的一半。如需更多选择，欢迎尝试 Nano Banana Pro 或 Nano Banana。',
    image: 'feat-style.jpg',
    alt: 'Nano Banana 2 style fine-tuning controls',
  },
];
```

### 4.5 使用步骤

```ts
const howItWorksSectionTitle = '如何使用 Nano Banana 2 在线生成 4K 图像';
const howItWorksSectionDesc = '按照以下三个简单步骤，使用 Nano Banana 2 创建或编辑图像。这款高速 AI 图像模型帮助您通过文字提示和可选的图片输入，将创意转化为清晰的 4K 图像。';

const steps = [
  {
    image: 'step-upload.jpg',
    title: '第一步：上传图片（可选）',
    desc: '如需优化或修改现有图片，请上传一张图片。Nano Banana 2 支持图像编辑和风格转换。您也可以跳过此步骤，直接通过文字描述生成全新图像。',
  },
  {
    image: 'step-prompt.jpg',
    title: '第二步：输入提示词',
    desc: '输入清晰的描述说明您想要创建的内容。Nano Banana 2 能理解详细指令，可在图像中添加对象、调整风格或渲染精准文字。',
  },
  {
    image: 'step-generate.jpg',
    title: '第三步：生成并下载',
    desc: '点击生成，等待几秒钟。Nano Banana 2 将输出清晰的 4K 图像。查看结果后，下载最终文件，用于设计、社交媒体发布或营销推广。',
  },
];
```

### 4.6 用户评价

```ts
const testimonialsSectionTitle = '用户怎么说';
const testimonialsSectionDesc = '来自不同行业的创作者正在使用 Nano Banana 2 提升他们的视觉创作效率';

interface Testimonial {
  rating: number;
  avatar: string;
  name: string;
  role: string;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=1',
    name: '李明',
    role: '平面设计师',
    comment: 'Nano Banana 2 的 4K 输出质量令人惊叹，文字渲染精准度远超预期。现在我的设计工作流提速了至少 3 倍，强烈推荐给所有创意工作者。',
  },
  {
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=5',
    name: '张雪',
    role: '电商运营经理',
    comment: '我们团队用它批量生成商品主图和广告素材，效果非常专业。多角度展示功能特别实用，节省了大量拍摄成本。',
  },
  {
    rating: 4,
    avatar: 'https://i.pravatar.cc/80?img=3',
    name: '王浩',
    role: '自由插画师',
    comment: '风格一致性功能让我能快速生成系列角色设计，保持统一的视觉语言。免费版的功能已经非常强大，性价比极高。',
  },
  {
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=8',
    name: '陈婷',
    role: '社交媒体编辑',
    comment: '每天都在用 Nano Banana 2 制作社交媒体配图，生成速度很快，图片质量完全满足发布需求。提示词理解能力也很出色。',
  },
  {
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=12',
    name: '赵凯',
    role: '品牌策划总监',
    comment: '作为品牌方，我们需要高质量且风格统一的视觉素材。Nano Banana 2 完美满足了这个需求，大幅降低了设计外包成本。',
  },
  {
    rating: 4,
    avatar: 'https://i.pravatar.cc/80?img=9',
    name: '刘芳',
    role: '独立游戏开发者',
    comment: '用来生成游戏概念图和场景参考非常方便，4K 分辨率的细节表现力很强。API 接入也很顺畅，已经集成到我们的工作管线中。',
  },
];
```

### 4.7 常见问题

```ts
const faqItems = [
  {
    q: '什么是 Nano Banana 2？',
    a: 'Nano Banana 2 是专业级 AI 图像生成平台，支持多模型并提供高性能渲染。',
  },
  {
    q: 'Nano Banana 2 能准确处理图像中的文字吗？',
    a: '是的，Nano Banana 2 在图像中渲染文字方面表现出色，精准度极高。它支持多语言文字生成，能够制作海报、包装和营销素材中的清晰可读文字——这是大多数 AI 图像生成器难以实现的能力。',
  },
  {
    q: '在多张图像中能保持角色和对象的一致性吗？',
    a: '完全可以。Nano Banana 2 拥有先进的一致性技术，能够在多张生成图像中保持相同的角色外貌、服装细节和对象设计。这对于创建角色设定图、产品系列、品牌吉祥物以及连续叙事的视觉内容非常理想。',
  },
  {
    q: 'Nano Banana 2 支持导出哪些图像格式？',
    a: 'Nano Banana 2 支持 PNG、JPEG、WebP 和 TIFF 格式，并可自定义质量设置。',
  },
  {
    q: 'Nano Banana 2 有免费试用吗？',
    a: '是的，Nano Banana 2 提供每日有限次数的免费使用额度，方便您在订阅前体验。',
  },
  {
    q: 'Nano Banana 2 的风格微调是如何工作的？',
    a: 'Nano Banana 2 的风格微调功能允许您调整色温、艺术风格和细节级别等参数，实现精确的创意控制。',
  },
];
```

---

## 五、组件交互详情

### 5.1 HeroSection — 标题区

**位置**：右侧面板顶部，居中对齐

| 元素 | 标签 | 样式要求 |
|---|---|---|
| 主标题 | `<h1>` | `font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl`，入场动画：opacity 0→1 + y 20→0（0.6s） |
| 副标题 | `<h2>` | `font-body text-base font-light text-muted-foreground sm:text-lg`，入场动画同上 delay 0.15s |

> Nuxt 替代方案：使用 `@nuxt/ui` 的 `<UContainer>` 或手写 Tailwind 实现入场动画（可用 `@vueuse/motion` 替代 framer-motion）。

### 5.2 ConfigPanel — 左侧配置面板

**位置**：左栏 35%宽，`sticky top-8`，最大高度 `calc(100vh - 6rem)`

**UI 结构**（从上到下）：

1. **模型选择器**（Select 下拉）
   - 使用 `@nuxt/ui` 的 `<USelect>` 或 `<USelectMenu>`
   - 选项包含模型名 + 描述

2. **动态表单字段**（根据选中模型的 `fields` 配置渲染）
   - `type: 'upload'`：点击上传区，120px 高，虚线边框，含图标 + 文字提示；已上传显示预览 + 右上角删除按钮
   - `type: 'radio'`：横排 radio 按钮组，选中态 `border-primary bg-primary/10 text-primary`，未选中 hover `border-primary/50`，**圆角 `rounded-md`**
   - `type: 'select'`：标准下拉

3. **提示词输入框**（Textarea，4 行，`resize-none`）

4. **生成按钮**（固定在面板底部，`border-t` 分隔）
   - 使用 `@nuxt/ui` 的 `<UButton>`
   - 图标：生成中显示 Loader2 旋转，空闲显示 Sparkles
   - 全宽，`bg-primary text-primary-foreground hover:bg-primary/90`

**间距**：滚动区域 `padding: 20px`，`paddingBottom: 16px`，字段间 `gap: 16px`；按钮区 `padding: 20px`

### 5.3 ScenarioShowcase — 右侧场景展示

**位置**：右栏 65%宽

**UI 结构**：

1. **Tabs 标签栏**（4 个标签，仅在 idle 状态显示）
   - 使用 `@nuxt/ui` 的 `<UTabs>`
   - 选中态：`bg-primary text-primary-foreground`
   - 标签：搜索驱动 & 趋势 / 多角度展示 / 文字渲染 & 翻译 / 一致性

2. **图片展示区**
   - 圆角 `rounded-xl`，背景 `bg-secondary`
   - 宽高比根据选择的 aspectRatio 动态变化，默认 `16/9`，最大高度 `70vh`
   - **4 种状态**：
     - **idle**：显示场景 Mock 图片（`object-cover`）
     - **generating**：脉冲渐变动画 + Loader2 旋转 + "生成中..." 文字
     - **success**：显示生成的图片（`object-contain`）+ hover 显示工具栏（放大/下载/复制）
     - **error**：AlertTriangle 图标 + "生成失败，请重试" + 重试按钮

3. **工具栏**（hover 时底部浮现）
   - 半透明暗色背景 `bg-foreground/70 backdrop-blur-sm`
   - 3 个按钮：放大查看（ZoomIn）、下载（Download）、复制（Copy）
   - 每个按钮 `cursor: pointer`，hover 效果 `hover:bg-foreground/20`

4. **Lightbox**（点击放大后全屏预览）
   - 固定定位，背景 `bg-background/80 backdrop-blur-sm`
   - 图片 `max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl`
   - 右上角关闭按钮

### 5.4 FeatureGrid — 功能特性

**布局**：全宽容器，`py-20`，4 行交替图文

| 行号 | 布局方向 | 说明 |
|---|---|---|
| 0, 2 | 文字左 + 图片右 | `flex-row` |
| 1, 3 | 图片左 + 文字右 | `flex-row-reverse` |

**文字块**：
- 标题：`font-display text-2xl font-bold sm:text-3xl`
- 描述：`text-muted-foreground leading-relaxed max-w-md`
- CTA 按钮：`rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-80 cursor-pointer`

**图片块**：
- 外层：`rounded-[2rem] bg-card p-3 shadow-2xl`
- 图片：`rounded-[1.5rem] object-cover` + `loading="lazy"`

**入场动画**：水平方向交替滑入，`viewport.once = true`

### 5.5 HowItWorks — 使用步骤

**布局**：3 列网格（`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`）

**卡片结构**：
- 图片区：`h-[240px] object-cover bg-secondary`
- 文字区：`p-6`
  - 标题：`text-lg font-bold text-foreground`
  - 描述：`text-sm text-muted-foreground leading-relaxed`
- hover 效果：`hover:-translate-y-1 hover:border-primary/30`
- 边框：`border border-border rounded-2xl bg-card`

### 5.6 Testimonials — 用户评价

**布局**：3 列网格（`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`）

**卡片结构**：
- 星级评分：5 颗星，`fill-primary text-primary`（亮）/ `fill-muted text-muted`（暗）
- 评论文字：`text-sm text-muted-foreground leading-relaxed`，带引号
- 用户信息：头像（40×40 圆形）+ 姓名 + 职位，`border-t border-border pt-4`
- hover 效果：`hover:-translate-y-1 hover:border-primary/30`

### 5.7 FAQSection — 常见问题

**布局**：最大宽度 `max-w-3xl` 居中

**组件**：使用 `@nuxt/ui` 的 `<UAccordion>` （对应原 Radix Accordion）
- 标题：`font-body text-sm font-medium text-foreground`
- 内容：`text-sm text-muted-foreground`
- 单选模式（`type="single" collapsible`）

---

## 六、待接入 API 插槽

| 插槽位置 | 函数名 | 说明 |
|---|---|---|
| ConfigPanel → 上传 | `handleUploadToStorage()` | 上传参考图片到云存储，返回 URL |
| ConfigPanel → 生成 | `handleGenerate()` | 调用 AI 图像生成 API |
| FeatureGrid → CTA | `handleTryNow()` | 跳转到生成区或滚动到页面顶部 |

### API 请求格式

```ts
// POST /api/generate-image
interface GenerateImageRequest {
  prompt: string;
  refImage?: string;       // 参考图片 URL
  aspectRatio: string;     // '1:1' | '3:4' | '4:3' | '9:16' | '16:9'
  resolution: string;      // '1K' | '2K' | '4K'
}

interface GenerateImageResponse {
  imageUrl: string;
}
```

### Toast 提示

| 场景 | 类型 | 文案 |
|---|---|---|
| 生成成功 | success | 您的图像已经准备好，可以来查看结果啦 |
| 生成失败 | error | 非常抱歉，本次生图没有成功，您可以点击生成按钮重试 |
| 下载成功 | success | 下载成功 |
| 下载失败 | error | 下载失败 |
| 复制成功 | success | 复制成功 |
| 复制失败 | error | 复制失败 |

> Toast 位置：页面顶部居中（`top-center`），使用 `@nuxt/ui` 的 `useToast()` 或 `<UNotifications>`。

---

## 七、图片资源清单

| 文件名 | 用途 | 目标位置 |
|---|---|---|
| scene-search-1.jpg | 场景 Tab：搜索驱动 | `assets/images/` |
| scene-multiangle-1.jpg | 场景 Tab：多角度展示 | `assets/images/` |
| scene-text-1.jpg | 场景 Tab：文字渲染 | `assets/images/` |
| scene-consistency-1.jpg | 场景 Tab：一致性 | `assets/images/` |
| feat-api.jpg | 功能特性第 1 行 | `assets/images/` |
| feat-models.jpg | 功能特性第 2 行 | `assets/images/` |
| feat-export.jpg | 功能特性第 3 行 | `assets/images/` |
| feat-style.jpg | 功能特性第 4 行 | `assets/images/` |
| step-upload.jpg | 使用步骤第 1 步 | `assets/images/` |
| step-prompt.jpg | 使用步骤第 2 步 | `assets/images/` |
| step-generate.jpg | 使用步骤第 3 步 | `assets/images/` |

> 所有图片均已存在于当前 React 工程的 `src/assets/` 中，迁移时复制到 Nuxt 工程的 `assets/images/` 目录即可。

---

## 八、技术栈差异映射表

| React 原实现 | Nuxt 4 替代方案 |
|---|---|
| `framer-motion` | `@vueuse/motion` 或 CSS `@starting-style` + `transition` |
| `react-router-dom` | Nuxt 内置文件路由（自动） |
| `useState` / Context | `@pinia/nuxt` 或 `useState` composable |
| Radix UI (`@radix-ui/*`) | `@nuxt/ui` 内置组件 |
| `shadcn/ui` Button/Select/Tabs/Accordion | `<UButton>` / `<USelect>` / `<UTabs>` / `<UAccordion>` |
| `lucide-react` | `@nuxt/ui` 内置 icon（`i-lucide-*`） |
| `sonner` toast | `@nuxt/ui` `useToast()` / `<UNotifications>` |
| Supabase Edge Functions | Nuxt `server/api/` (Nitro) |
| `.env` + `import.meta.env` | Nuxt `runtimeConfig` |

---

## 九、需研发人员介入的清单

| 项目 | 说明 |
|---|---|
| `main.css` 修改 | 如需修改 @nuxt/ui 默认主题变量，请确认后手动操作 |
| 图片生成 API 接入 | `server/api/generate-image.post.ts` 需对接实际 AI 服务 |
| 文件上传到云存储 | `handleUploadToStorage` 需实现具体存储方案 |
| pm2 + Docker 部署配置 | `docker/ecosystem.config.js` 需根据服务器环境调整 |

---

*文档版本：v1.1 | 生成日期：2026-03-05*
