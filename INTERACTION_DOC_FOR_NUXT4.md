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

## 四、国际化 (i18n)

默认语言：**zh**（简体中文）

支持语言：

| code | 名称 |
|---|---|
| `zh` | 简体中文 |
| `en` | English |
| `ko` | 한국어 |
| `ja` | 日本語 |
| `es` | Español |

> 建议使用 `@nuxtjs/i18n` 管理；当前源码中所有文案以 `Record<string, Record<Lang, string>>` 格式定义在 `locales.ts` 中。以下 Mock 数据已包含全量翻译文本。

---

## 五、Mock 数据结构

### 5.1 通用 UI 文案 (`locales`)

```ts
type Lang = 'zh' | 'en' | 'ko' | 'ja' | 'es';

const locales: Record<string, Record<Lang, string>> = {
  heroTitle: {
    en: 'Nano Banana 2: Professional AI Image Creator',
    zh: 'Nano Banana 2：专业 AI 图像创作工具',
    ko: 'Nano Banana 2: 전문 AI 이미지 크리에이터',
    ja: 'Nano Banana 2：プロフェッショナルAI画像クリエイター',
    es: 'Nano Banana 2: Creador Profesional de Imágenes IA',
  },
  heroSubtitle: {
    en: 'Empowering Limitless Creativity: High-performance multi-model AI image generation for professionals.',
    zh: '释放无限创造力：面向专业人士的高性能多模型 AI 图像生成。',
    ko: '무한한 창의성 실현: 전문가를 위한 고성능 다중 모델 AI 이미지 생성.',
    ja: '無限のクリエイティビティを解放：プロフェッショナル向け高性能マルチモデルAI画像生成。',
    es: 'Potenciando la creatividad sin límites: generación de imágenes IA multimodelo de alto rendimiento para profesionales.',
  },
  resolution: { en: 'Resolution', zh: '清晰度', ko: '해상도', ja: '解像度', es: 'Resolución' },
  referenceImage: { en: 'Reference Image', zh: '参考图片', ko: '참고 이미지', ja: '参照画像', es: 'Imagen de referencia' },
  prompt: { en: 'Prompt', zh: '提示词', ko: '프롬프트', ja: 'プロンプト', es: 'Indicación' },
  generate: { en: 'Generate', zh: '生成', ko: '생성', ja: '生成', es: 'Generar' },
  generating: { en: 'Generating...', zh: '生成中...', ko: '생성 중...', ja: '生成中...', es: 'Generando...' },
  faqTitle: { en: 'Frequently Asked Questions', zh: '常见问题', ko: '자주 묻는 질문', ja: 'よくある質問', es: 'Preguntas frecuentes' },
  uploadOrSelect: { en: 'Click to upload reference image', zh: '点击上传参考图片', ko: '클릭하여 참고 이미지 업로드', ja: 'クリックして参照画像をアップロード', es: 'Haz clic para subir imagen de referencia' },
  generateNow: { en: 'Try Now →', zh: '立即使用 →', ko: '지금 사용 →', ja: '今すぐ使う →', es: 'Usar ahora →' },
  modelLabel: { en: 'Model', zh: '模型', ko: '모델', ja: 'モデル', es: 'Modelo' },
  quantity: { en: 'Quantity', zh: '生图数量', ko: '생성 수량', ja: '生成枚数', es: 'Cantidad' },
  aspectRatio: { en: 'Aspect Ratio', zh: '生图比例', ko: '화면 비율', ja: 'アスペクト比', es: 'Relación de aspecto' },
  promptPlaceholder: { en: 'Describe the image you want to create...', zh: '描述你想要创建的图像...', ko: '생성할 이미지를 설명하세요...', ja: '作成したい画像を説明してください...', es: 'Describe la imagen que deseas crear...' },
};
```

### 5.2 模型配置 (`modelConfigs`)

```ts
interface ModelFieldConfig {
  type: 'upload' | 'select' | 'number' | 'radio';
  labelKey: string;       // 对应 locales 中的 key
  options?: string[];
  default?: string | number;
}

interface ModelConfig {
  id: string;
  nameKey: string;
  descKey: string;
  fields: ModelFieldConfig[];
}

const modelConfigs: ModelConfig[] = [
  {
    id: 'nano-banana-2',
    nameKey: 'model_nb2_name',
    descKey: 'model_nb2_desc',
    fields: [
      { type: 'upload', labelKey: 'referenceImage' },
      { type: 'radio', labelKey: 'resolution', options: ['1K', '2K', '4K'], default: '2K' },
      { type: 'radio', labelKey: 'quantity', options: ['1', '2', '3', '4'], default: '1' },
      { type: 'radio', labelKey: 'aspectRatio', options: ['1:1', '3:4', '4:3', '9:16', '16:9'], default: '1:1' },
    ],
  },
  {
    id: 'nano-banana-pro',
    nameKey: 'model_nbpro_name',
    descKey: 'model_nbpro_desc',
    fields: [
      { type: 'upload', labelKey: 'referenceImage' },
      { type: 'radio', labelKey: 'resolution', options: ['2K', '4K'], default: '4K' },
      { type: 'radio', labelKey: 'quantity', options: ['1', '2', '3', '4'], default: '1' },
      { type: 'radio', labelKey: 'aspectRatio', options: ['1:1', '3:4', '4:3', '9:16', '16:9'], default: '1:1' },
    ],
  },
];

const modelLocales: Record<string, Record<Lang, string>> = {
  model_nb2_name: {
    en: 'Nano Banana 2', zh: 'Nano Banana 2', ko: 'Nano Banana 2', ja: 'Nano Banana 2', es: 'Nano Banana 2',
  },
  model_nb2_desc: {
    en: 'Versatile multi-style AI image generation with high-resolution output.',
    zh: '多风格 AI 图像生成，支持高分辨率输出。',
    ko: '다양한 스타일의 AI 이미지 생성, 고해상도 출력 지원.',
    ja: '多彩なスタイルのAI画像生成、高解像度出力をサポート。',
    es: 'Generación de imágenes IA multistilo versátil con salida de alta resolución.',
  },
  model_nbpro_name: {
    en: 'Nano Banana Pro', zh: 'Nano Banana Pro', ko: 'Nano Banana Pro', ja: 'Nano Banana Pro', es: 'Nano Banana Pro',
  },
  model_nbpro_desc: {
    en: 'Professional-grade model with enhanced detail, consistency and 4K rendering.',
    zh: '专业级模型，增强细节、一致性和 4K 渲染。',
    ko: '향상된 디테일, 일관성 및 4K 렌더링의 프로급 모델.',
    ja: 'ディテール強化、一貫性向上、4Kレンダリングのプロフェッショナルモデル。',
    es: 'Modelo profesional con detalle mejorado, consistencia y renderizado 4K.',
  },
};
```

### 5.3 场景标签页 (`scenarios`)

```ts
interface Scenario {
  id: string;
  nameKey: string;
  images: { altKey: string; promptKey: string }[];
}

const scenarios: Scenario[] = [
  {
    id: 'search',
    nameKey: 'scenario_search',
    images: [{ altKey: 'scene_search_1_alt', promptKey: 'scene_search_1_prompt' }],
  },
  {
    id: 'multiangle',
    nameKey: 'scenario_multiangle',
    images: [{ altKey: 'scene_multi_1_alt', promptKey: 'scene_multi_1_prompt' }],
  },
  {
    id: 'text',
    nameKey: 'scenario_text',
    images: [{ altKey: 'scene_text_1_alt', promptKey: 'scene_text_1_prompt' }],
  },
  {
    id: 'consistency',
    nameKey: 'scenario_consistency',
    images: [{ altKey: 'scene_consist_1_alt', promptKey: 'scene_consist_1_prompt' }],
  },
];

const scenarioLocales: Record<string, Record<Lang, string>> = {
  scenario_search: {
    en: 'Search Grounding & Trends', zh: '搜索驱动 & 趋势', ko: '검색 기반 & 트렌드', ja: '検索グラウンディング＆トレンド', es: 'Búsqueda y Tendencias',
  },
  scenario_multiangle: {
    en: 'Multi-angle Display', zh: '多角度展示', ko: '다각도 디스플레이', ja: 'マルチアングル表示', es: 'Visualización Multiángulo',
  },
  scenario_text: {
    en: 'Text Rendering & Translation', zh: '文字渲染 & 翻译', ko: '텍스트 렌더링 & 번역', ja: 'テキストレンダリング＆翻訳', es: 'Renderizado de Texto y Traducción',
  },
  scenario_consistency: {
    en: 'Consistency', zh: '一致性', ko: '일관성', ja: '一貫性', es: 'Consistencia',
  },
  // Alt 文本
  scene_search_1_alt: { en: 'AI search grounding dashboard', zh: 'AI搜索驱动面板', ko: 'AI 검색 기반 대시보드', ja: 'AI検索グラウンディングダッシュボード', es: 'Panel de búsqueda AI' },
  scene_multi_1_alt: { en: 'Multi-angle handbag product shots', zh: '多角度手提包产品图', ko: '다각도 핸드백 제품 사진', ja: 'マルチアングルハンドバッグ製品写真', es: 'Fotos de bolso multiángulo' },
  scene_text_1_alt: { en: 'AI text rendering on poster', zh: 'AI海报文字渲染', ko: 'AI 포스터 텍스트 렌더링', ja: 'AIポスターテキストレンダリング', es: 'Renderizado de texto AI en póster' },
  scene_consist_1_alt: { en: 'Character consistency sheet', zh: '角色一致性参考表', ko: '캐릭터 일관성 시트', ja: 'キャラクター一貫性シート', es: 'Hoja de consistencia de personaje' },
  // Prompt 文本
  scene_search_1_prompt: {
    en: 'Generate trending visual content inspired by current search topics, dashboard style with image grid',
    zh: '根据当前搜索话题生成趋势视觉内容，仪表板风格图片网格',
    ko: '현재 검색 주제에서 영감을 받은 트렌드 시각 콘텐츠 생성, 대시보드 스타일 이미지 그리드',
    ja: '現在の検索トピックからインスパイアされたトレンドビジュアルコンテンツ、ダッシュボードスタイル',
    es: 'Generar contenido visual tendencia inspirado en temas de búsqueda actuales, estilo dashboard',
  },
  scene_multi_1_prompt: {
    en: 'Professional product photography of a luxury black handbag from 6 angles, white studio background',
    zh: '奢华黑色手提包6角度专业产品摄影，白色摄影棚背景',
    ko: '럭셔리 블랙 핸드백 6각도 전문 제품 사진, 흰색 스튜디오 배경',
    ja: '高級ブラックハンドバッグの6アングルプロフェッショナル製品写真、白スタジオ背景',
    es: 'Fotografía profesional de bolso negro de lujo desde 6 ángulos, fondo de estudio blanco',
  },
  scene_text_1_prompt: {
    en: 'Creative marketing poster with bold "MARKETING" text overlaid on colorful abstract art background',
    zh: '创意营销海报，大胆的"MARKETING"文字叠加在彩色抽象艺术背景上',
    ko: '컬러풀한 추상 아트 배경에 볼드한 "MARKETING" 텍스트가 있는 크리에이티브 마케팅 포스터',
    ja: 'カラフルな抽象アート背景にボールドな"MARKETING"テキストのクリエイティブマーケティングポスター',
    es: 'Póster de marketing creativo con texto "MARKETING" en negrita sobre fondo de arte abstracto colorido',
  },
  scene_consist_1_prompt: {
    en: 'Character consistency reference sheet, anime style, same character in 5 different outfits and poses',
    zh: '角色一致性参考表，动漫风格，同一角色5种不同服装和姿势',
    ko: '캐릭터 일관성 참조 시트, 애니메이션 스타일, 같은 캐릭터 5가지 다른 의상과 포즈',
    ja: 'キャラクター一貫性リファレンスシート、アニメスタイル、同一キャラクター5つの異なる衣装とポーズ',
    es: 'Hoja de referencia de consistencia de personaje, estilo anime, mismo personaje en 5 atuendos diferentes',
  },
};
```

### 5.4 功能特性 (`featureGrid`)

每行由「文字块 + 图片块」组成，奇偶行图文交替方向。

```ts
const featureRows = [
  {
    icon: 'Plug',               // @nuxt/ui 对应 icon name: i-lucide-plug
    nameKey: 'feat_api',
    descKey: 'feat_api_desc',
    image: 'feat-api.jpg',      // assets/images/feat-api.jpg
    alt: 'Nano Banana 2 API integration workflow dashboard',
  },
  {
    icon: 'Layers',             // i-lucide-layers
    nameKey: 'feat_multi',
    descKey: 'feat_multi_desc',
    image: 'feat-models.jpg',
    alt: 'Nano Banana 2 multi-model AI image outputs',
  },
  {
    icon: 'Download',           // i-lucide-download
    nameKey: 'feat_export',
    descKey: 'feat_export_desc',
    image: 'feat-export.jpg',
    alt: 'Nano Banana 2 bulk image export interface',
  },
  {
    icon: 'Paintbrush',         // i-lucide-paintbrush
    nameKey: 'feat_style',
    descKey: 'feat_style_desc',
    image: 'feat-style.jpg',
    alt: 'Nano Banana 2 style fine-tuning controls',
  },
];
```

**featureLocales**（完整文案）：

```ts
const featureLocales: Record<string, Record<Lang, string>> = {
  feat_api: { en: 'Free, Fast & Professional 4K Image Generation', zh: '免费高速与专业级 4K 图像生成能力', ko: '무료, 고속, 전문가급 4K 이미지 생성', ja: '無料・高速・プロ品質の4K画像生成', es: 'Generación 4K gratuita, rápida y profesional' },
  feat_api_desc: {
    en: 'Nano Banana 2, powered by Gemini 3.1 Flash, lets you rapidly create, edit, and blend 4K images. Enjoy precise text rendering, multi-image editing, and professional-grade capabilities — all for free.',
    zh: 'Nano Banana 2 基于 Gemini 3.1 Flash，让您快速创建、编辑和融合 4K 图像。精准文字渲染、多图编辑，免费享受专业级能力。',
    ko: 'Gemini 3.1 Flash 기반의 Nano Banana 2로 4K 이미지를 빠르게 생성, 편집, 블렌딩하세요. 정밀한 텍스트 렌더링, 다중 이미지 편집, 전문가급 기능을 무료로 즐기세요.',
    ja: 'Gemini 3.1 Flashを搭載したNano Banana 2で、4K画像の作成・編集・ブレンドを高速に。正確なテキストレンダリング、マルチ画像編集、プロ品質の機能をすべて無料で。',
    es: 'Nano Banana 2, con Gemini 3.1 Flash, le permite crear, editar y fusionar imágenes 4K rápidamente. Renderizado de texto preciso, edición multi-imagen y capacidades profesionales, todo gratis.',
  },
  feat_multi: { en: 'Stable Characters, Fast Speed, Great Value', zh: '角色稳定、速度快、性价比高', ko: '캐릭터 안정성, 빠른 속도, 높은 가성비', ja: 'キャラクター安定性・高速・コスパ', es: 'Personajes estables, rápido y económico' },
  feat_multi_desc: {
    en: 'Nano Banana 2 maintains consistency for up to 5 characters and 14 objects across multiple images. It generates 4K images quickly at half the cost of Nano Banana Pro.',
    zh: 'Nano Banana 2 可在多张图像中保持最多 5 个角色和 14 个对象的一致性。它快速生成 4K 图像，成本仅为 Nano Banana Pro 的一半。这种速度、稳定性和实惠的价格，使其成为需要可靠专业成果的创作者的理想选择。',
    ko: 'Nano Banana 2는 여러 이미지에서 최대 5개의 캐릭터와 14개의 객체 일관성을 유지합니다. Nano Banana Pro의 절반 비용으로 4K 이미지를 빠르게 생성합니다.',
    ja: 'Nano Banana 2は複数の画像で最大5つのキャラクターと14のオブジェクトの一貫性を維持します。Nano Banana Proの半分のコストで4K画像を高速生成します。',
    es: 'Nano Banana 2 mantiene la consistencia de hasta 5 personajes y 14 objetos en múltiples imágenes. Genera imágenes 4K rápidamente a la mitad del costo de Nano Banana Pro.',
  },
  feat_export: { en: 'Professional Text Rendering & Translation', zh: '专业文字渲染与翻译', ko: '전문 텍스트 렌더링 및 번역', ja: 'プロフェッショナルテキストレンダリング＆翻訳', es: 'Renderizado y traducción de texto profesional' },
  feat_export_desc: {
    en: 'Text in images is clear and accurate. Nano Banana 2 fixes common AI issues like misspellings, broken logos, and garbled labels. Add titles, chart annotations, or translate text while maintaining font, layout, and style consistency.',
    zh: '图像中的文字清晰准确。Nano Banana 2 修复 AI 常见的拼写错误、Logo 损坏和标签混乱等问题。您可以添加标题、图表标注，或进行文字翻译，同时保持字体、排版和风格的一致性，适用于营销材料或演示文稿。',
    ko: '이미지의 텍스트가 선명하고 정확합니다. Nano Banana 2는 맞춤법 오류, 로고 손상, 라벨 혼란 등 일반적인 AI 문제를 수정합니다.',
    ja: '画像内のテキストは鮮明で正確です。Nano Banana 2はスペルミス、ロゴ破損、ラベル混乱などの一般的なAI問題を修正します。',
    es: 'El texto en las imágenes es claro y preciso. Nano Banana 2 corrige errores comunes de IA como faltas de ortografía, logos rotos y etiquetas confusas.',
  },
  feat_style: { en: 'What is Nano Banana 2?', zh: '什么是 Nano Banana 2？', ko: 'Nano Banana 2란?', ja: 'Nano Banana 2とは？', es: '¿Qué es Nano Banana 2?' },
  feat_style_desc: {
    en: 'Nano Banana 2 is a high-speed AI image model based on Gemini 3.1 Flash. It lets you quickly create, edit, and blend 4K images with powerful professional-grade capabilities. With real-time search augmentation, Nano Banana 2 understands the latest devices and trends, making results authentic rather than guesswork. It also supports precise text rendering, fixing spelling errors and typography issues within images. While maintaining consistency of up to 5 characters and 14 objects, it runs fast at half the cost of Nano Banana Pro. For more options, try Nano Banana Pro or Nano Banana.',
    zh: 'Nano Banana 2 是一款基于 Gemini 3.1 Flash 的高速 AI 图像模型。它让您能够快速创建、编辑和融合 4K 图像，并具备强大的专业级能力。借助实时搜索增强技术，Nano Banana 2 能够理解最新设备和流行趋势，让生成结果真实可信而非凭空猜测。它还支持精准的文字渲染，修复图像内的拼写错误和排版问题。在保持最多 5 个角色和 14 个对象一致性的同时，运行速度快，成本仅为 Nano Banana Pro 的一半。如需更多选择，欢迎尝试 Nano Banana Pro 或 Nano Banana。',
    ko: 'Nano Banana 2는 Gemini 3.1 Flash 기반의 고속 AI 이미지 모델입니다. 강력한 전문가급 기능으로 4K 이미지를 빠르게 생성, 편집, 블렌딩할 수 있습니다. 실시간 검색 증강 기술을 통해 최신 기기와 트렌드를 이해하여 사실적인 결과를 제공합니다. 정밀한 텍스트 렌더링으로 이미지 내 오탈자와 타이포그래피 문제를 수정합니다. 최대 5명의 캐릭터와 14개의 객체 일관성을 유지하면서 Nano Banana Pro의 절반 비용으로 빠르게 작동합니다.',
    ja: 'Nano Banana 2はGemini 3.1 Flashベースの高速AI画像モデルです。強力なプロフェッショナルグレードの機能で4K画像を素早く作成・編集・ブレンドできます。リアルタイム検索拡張技術により、最新デバイスやトレンドを理解し、リアルな結果を提供します。正確なテキストレンダリングで画像内のスペルミスやタイポグラフィの問題を修正します。最大5キャラクター・14オブジェクトの一貫性を保ちながら、Nano Banana Proの半分のコストで高速動作します。',
    es: 'Nano Banana 2 es un modelo de imagen IA de alta velocidad basado en Gemini 3.1 Flash. Permite crear, editar y fusionar imágenes 4K rápidamente con potentes capacidades profesionales. Con búsqueda aumentada en tiempo real, comprende los últimos dispositivos y tendencias, generando resultados auténticos. Soporta renderizado de texto preciso, corrigiendo errores ortográficos y tipográficos en imágenes. Mantiene la consistencia de hasta 5 personajes y 14 objetos, funcionando rápidamente a la mitad del costo de Nano Banana Pro.',
  },
};
```

### 5.5 使用步骤 (`HowItWorks`)

```ts
const howItWorksSectionTitle: Record<Lang, string> = {
  en: 'How to Generate 4K Images Online with Nano Banana 2',
  zh: '如何使用 Nano Banana 2 在线生成 4K 图像',
  ko: 'Nano Banana 2로 4K 이미지를 온라인으로 생성하는 방법',
  ja: 'Nano Banana 2でオンライン4K画像を生成する方法',
  es: 'Cómo generar imágenes 4K en línea con Nano Banana 2',
};

const howItWorksSectionDesc: Record<Lang, string> = {
  en: 'Follow these three simple steps to create or edit images with Nano Banana 2. This high-speed AI image model helps you turn ideas into sharp 4K images through text prompts and optional image input.',
  zh: '按照以下三个简单步骤，使用 Nano Banana 2 创建或编辑图像。这款高速 AI 图像模型帮助您通过文字提示和可选的图片输入，将创意转化为清晰的 4K 图像。',
  ko: '다음 세 가지 간단한 단계로 Nano Banana 2로 이미지를 생성하거나 편집하세요. 이 고속 AI 이미지 모델은 텍스트 프롬프트와 선택적 이미지 입력을 통해 아이디어를 선명한 4K 이미지로 변환합니다.',
  ja: 'この3つの簡単なステップでNano Banana 2で画像を作成・編集しましょう。この高速AIモデルは、テキストプロンプトとオプションの画像入力で、アイデアを鮮明な4K画像に変換します。',
  es: 'Sigue estos tres sencillos pasos para crear o editar imágenes con Nano Banana 2. Este modelo de IA de alta velocidad convierte tus ideas en imágenes 4K nítidas.',
};

const steps = [
  { image: 'step-upload.jpg', titleKey: 'step1_title', descKey: 'step1_desc' },
  { image: 'step-prompt.jpg', titleKey: 'step2_title', descKey: 'step2_desc' },
  { image: 'step-generate.jpg', titleKey: 'step3_title', descKey: 'step3_desc' },
];

const stepLocales: Record<string, Record<Lang, string>> = {
  step1_title: {
    en: 'Step 1: Upload Image (Optional)',
    zh: '第一步：上传图片（可选）',
    ko: '1단계: 이미지 업로드 (선택)',
    ja: 'ステップ1：画像をアップロード（任意）',
    es: 'Paso 1: Subir imagen (Opcional)',
  },
  step1_desc: {
    en: 'To optimize or modify an existing image, upload one. Nano Banana 2 supports image editing and style transfer. You can also skip this step and generate a new image directly from text.',
    zh: '如需优化或修改现有图片，请上传一张图片。Nano Banana 2 支持图像编辑和风格转换。您也可以跳过此步骤，直接通过文字描述生成全新图像。',
    ko: '기존 이미지를 최적화하거나 수정하려면 업로드하세요. 스타일 전환도 지원합니다. 이 단계를 건너뛰고 텍스트에서 직접 새 이미지를 생성할 수도 있습니다.',
    ja: '既存の画像を最適化または修正するにはアップロードしてください。スタイル変換もサポートします。このステップをスキップしてテキストから直接生成することもできます。',
    es: 'Para optimizar o modificar una imagen existente, súbala. También puede omitir este paso y generar directamente desde texto.',
  },
  step2_title: {
    en: 'Step 2: Enter Your Prompt',
    zh: '第二步：输入提示词',
    ko: '2단계: 프롬프트 입력',
    ja: 'ステップ2：プロンプトを入力',
    es: 'Paso 2: Ingresa tu indicación',
  },
  step2_desc: {
    en: 'Enter a clear description of what you want to create. Nano Banana 2 understands detailed instructions — add objects, adjust styles, or render precise text within images.',
    zh: '输入清晰的描述说明您想要创建的内容。Nano Banana 2 能理解详细指令，可在图像中添加对象、调整风格或渲染精准文字。',
    ko: '만들고 싶은 것을 명확하게 설명하세요. Nano Banana 2는 상세한 지시를 이해하며 객체 추가, 스타일 조정, 텍스트 렌더링이 가능합니다.',
    ja: '作成したい内容を明確に記述してください。Nano Banana 2は詳細な指示を理解し、オブジェクトの追加、スタイルの調整、正確なテキストのレンダリングが可能です。',
    es: 'Ingresa una descripción clara de lo que quieres crear. Nano Banana 2 entiende instrucciones detalladas.',
  },
  step3_title: {
    en: 'Step 3: Generate & Download',
    zh: '第三步：生成并下载',
    ko: '3단계: 생성 및 다운로드',
    ja: 'ステップ3：生成とダウンロード',
    es: 'Paso 3: Generar y descargar',
  },
  step3_desc: {
    en: 'Click generate and wait a few seconds. Nano Banana 2 will output a sharp 4K image. Review the result, then download for design, social media, or marketing.',
    zh: '点击生成，等待几秒钟。Nano Banana 2 将输出清晰的 4K 图像。查看结果后，下载最终文件，用于设计、社交媒体发布或营销推广。',
    ko: '생성을 클릭하고 몇 초만 기다리세요. Nano Banana 2가 선명한 4K 이미지를 출력합니다. 결과를 확인한 후 디자인, SNS, 마케팅에 활용하세요.',
    ja: '生成をクリックして数秒待つと、Nano Banana 2が鮮明な4K画像を出力します。結果を確認後、デザインやSNS、マーケティングにダウンロードしましょう。',
    es: 'Haga clic en generar y espere unos segundos. Descargue el resultado para diseño, redes sociales o marketing.',
  },
};
```

### 5.6 用户评价 (`Testimonials`)

```ts
const testimonialsSectionTitle: Record<Lang, string> = {
  en: 'What Users Say', zh: '用户怎么说', ko: '사용자 후기', ja: 'ユーザーの声', es: 'Lo que dicen los usuarios',
};

const testimonialsSectionDesc: Record<Lang, string> = {
  en: 'Creators from various industries are using Nano Banana 2 to boost their visual production efficiency.',
  zh: '来自不同行业的创作者正在使用 Nano Banana 2 提升他们的视觉创作效率',
  ko: '다양한 산업의 크리에이터들이 Nano Banana 2로 시각 제작 효율을 높이고 있습니다.',
  ja: '様々な業界のクリエイターがNano Banana 2でビジュアル制作効率を向上させています。',
  es: 'Creadores de diversas industrias están usando Nano Banana 2 para impulsar su eficiencia de producción visual.',
};

interface Testimonial {
  rating: number;        // 1-5 星
  avatar: string;        // 头像 URL
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

### 5.7 常见问题 (`FAQ`)

```ts
const faqData = [
  { qKey: 'faq_q1', aKey: 'faq_a1' },
  { qKey: 'faq_q2', aKey: 'faq_a2' },
  { qKey: 'faq_q3', aKey: 'faq_a3' },
  { qKey: 'faq_q4', aKey: 'faq_a4' },
  { qKey: 'faq_q5', aKey: 'faq_a5' },
  { qKey: 'faq_q6', aKey: 'faq_a6' },
];

const faqLocales: Record<string, Record<Lang, string>> = {
  faq_q1: { en: 'What is Nano Banana 2?', zh: '什么是 Nano Banana 2？', ko: 'Nano Banana 2란 무엇인가요?', ja: 'Nano Banana 2とは？', es: '¿Qué es Nano Banana 2?' },
  faq_a1: {
    en: 'Nano Banana 2 is a professional-grade AI image generation platform that supports multiple models and offers high-performance rendering.',
    zh: 'Nano Banana 2 是专业级 AI 图像生成平台，支持多模型并提供高性能渲染。',
    ko: 'Nano Banana 2는 다중 모델을 지원하고 고성능 렌더링을 제공하는 전문가급 AI 이미지 생성 플랫폼입니다.',
    ja: 'Nano Banana 2は、複数のモデルをサポートし、高性能レンダリングを提供するプロフェッショナルグレードのAI画像生成プラットフォームです。',
    es: 'Nano Banana 2 es una plataforma profesional de generación de imágenes IA que soporta múltiples modelos y ofrece renderizado de alto rendimiento.',
  },
  faq_q2: { en: 'Can Nano Banana 2 accurately handle text in images?', zh: 'Nano Banana 2 能准确处理图像中的文字吗？', ko: 'Nano Banana 2는 이미지의 텍스트를 정확하게 처리할 수 있나요?', ja: 'Nano Banana 2は画像内のテキストを正確に処理できますか？', es: '¿Puede Nano Banana 2 manejar texto en imágenes con precisión?' },
  faq_a2: {
    en: 'Yes, Nano Banana 2 excels at rendering text within images with high accuracy. It supports multiple languages and can generate posters, packaging, and marketing materials with precise, legible text — a capability that most AI image generators struggle with.',
    zh: '是的，Nano Banana 2 在图像中渲染文字方面表现出色，精准度极高。它支持多语言文字生成，能够制作海报、包装和营销素材中的清晰可读文字——这是大多数 AI 图像生成器难以实现的能力。',
    ko: '네, Nano Banana 2는 이미지 내 텍스트를 높은 정확도로 렌더링하는 데 뛰어납니다. 다국어를 지원하며 포스터, 패키지, 마케팅 자료에 정확하고 읽기 쉬운 텍스트를 생성할 수 있습니다.',
    ja: 'はい、Nano Banana 2は画像内のテキストレンダリングに優れ、高い精度を実現します。多言語をサポートし、ポスター、パッケージ、マーケティング素材に正確で読みやすいテキストを生成できます。',
    es: 'Sí, Nano Banana 2 destaca en renderizar texto dentro de imágenes con alta precisión. Soporta múltiples idiomas y puede generar pósters, empaques y materiales de marketing con texto preciso y legible.',
  },
  faq_q3: { en: 'Can it maintain character and object consistency across multiple images?', zh: '在多张图像中能保持角色和对象的一致性吗？', ko: '여러 이미지에서 캐릭터와 객체의 일관성을 유지할 수 있나요?', ja: '複数の画像でキャラクターやオブジェクトの一貫性を維持できますか？', es: '¿Puede mantener la consistencia de personajes y objetos en múltiples imágenes?' },
  faq_a3: {
    en: 'Absolutely. Nano Banana 2 features advanced consistency technology that maintains the same character appearance, outfit details, and object design across multiple generated images. This is ideal for creating character sheets, product series, brand mascots, and sequential storytelling visuals.',
    zh: '完全可以。Nano Banana 2 拥有先进的一致性技术，能够在多张生成图像中保持相同的角色外貌、服装细节和对象设计。这对于创建角色设定图、产品系列、品牌吉祥物以及连续叙事的视觉内容非常理想。',
    ko: '물론입니다. Nano Banana 2는 고급 일관성 기술을 통해 여러 생성 이미지에서 동일한 캐릭터 외모, 의상 디테일, 객체 디자인을 유지합니다. 캐릭터 시트, 제품 시리즈, 브랜드 마스코트, 스토리텔링 비주얼 제작에 이상적입니다.',
    ja: 'もちろんです。Nano Banana 2は高度な一貫性技術を備え、複数の生成画像で同じキャラクターの外見、衣装の詳細、オブジェクトデザインを維持します。キャラクターシート、製品シリーズ、ブランドマスコット、連続ストーリーテリングに最適です。',
    es: 'Por supuesto. Nano Banana 2 cuenta con tecnología avanzada de consistencia que mantiene la misma apariencia de personajes, detalles de vestuario y diseño de objetos en múltiples imágenes generadas.',
  },
  faq_q4: { en: 'What image formats does Nano Banana 2 export?', zh: 'Nano Banana 2 支持导出哪些图像格式？', ko: 'Nano Banana 2는 어떤 이미지 형식으로 내보낼 수 있나요?', ja: 'Nano Banana 2はどの画像形式でエクスポートできますか？', es: '¿Qué formatos de imagen exporta Nano Banana 2?' },
  faq_a4: {
    en: 'Nano Banana 2 supports PNG, JPEG, WebP, and TIFF formats with customizable quality settings.',
    zh: 'Nano Banana 2 支持 PNG、JPEG、WebP 和 TIFF 格式，并可自定义质量设置。',
    ko: 'Nano Banana 2는 PNG, JPEG, WebP, TIFF 형식을 지원하며 품질 설정을 사용자 정의할 수 있습니다.',
    ja: 'Nano Banana 2はPNG、JPEG、WebP、TIFF形式をサポートし、品質設定のカスタマイズが可能です。',
    es: 'Nano Banana 2 soporta formatos PNG, JPEG, WebP y TIFF con configuraciones de calidad personalizables.',
  },
  faq_q5: { en: 'Is there a free trial for Nano Banana 2?', zh: 'Nano Banana 2 有免费试用吗？', ko: 'Nano Banana 2의 무료 체험이 있나요?', ja: 'Nano Banana 2の無料トライアルはありますか？', es: '¿Hay una prueba gratuita para Nano Banana 2?' },
  faq_a5: {
    en: 'Yes, Nano Banana 2 offers a generous free tier with limited daily generations so you can try before committing.',
    zh: '是的，Nano Banana 2 提供每日有限次数的免费使用额度，方便您在订阅前体验。',
    ko: '네, Nano Banana 2는 하루 생성 횟수에 제한이 있는 넉넉한 무료 플랜을 제공합니다.',
    ja: 'はい、Nano Banana 2は日次生成数に制限のある寛大な無料プランを提供しています。',
    es: 'Sí, Nano Banana 2 ofrece un generoso plan gratuito con generaciones diarias limitadas para que puedas probar antes de comprometerte.',
  },
  faq_q6: { en: 'How does Style Fine-tuning work in Nano Banana 2?', zh: 'Nano Banana 2 的风格微调是如何工作的？', ko: 'Nano Banana 2에서 스타일 미세 조정은 어떻게 작동하나요?', ja: 'Nano Banana 2のスタイルファインチューニングはどのように機能しますか？', es: '¿Cómo funciona el ajuste de estilo en Nano Banana 2?' },
  faq_a6: {
    en: 'Style Fine-tuning in Nano Banana 2 lets you adjust parameters like color temperature, artistic style, and detail level to achieve precise creative control.',
    zh: 'Nano Banana 2 的风格微调功能允许您调整色温、艺术风格和细节级别等参数，实现精确的创意控制。',
    ko: 'Nano Banana 2의 스타일 미세 조정은 색온도, 예술적 스타일, 디테일 레벨과 같은 매개변수를 조정하여 정밀한 크리에이티브 제어를 가능하게 합니다.',
    ja: 'Nano Banana 2のスタイルファインチューニングでは、色温度、芸術的スタイル、ディテールレベルなどのパラメータを調整して精密なクリエイティブ制御を実現します。',
    es: 'El ajuste de estilo en Nano Banana 2 te permite ajustar parámetros como temperatura de color, estilo artístico y nivel de detalle para lograr un control creativo preciso.',
  },
};
```

---

## 六、组件交互详情

### 6.1 HeroSection — 标题区

**位置**：右侧面板顶部，居中对齐

| 元素 | 标签 | 样式要求 |
|---|---|---|
| 主标题 | `<h1>` | `font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl`，入场动画：opacity 0→1 + y 20→0（0.6s） |
| 副标题 | `<h2>` | `font-body text-base font-light text-muted-foreground sm:text-lg`，入场动画同上 delay 0.15s |

> Nuxt 替代方案：使用 `@nuxt/ui` 的 `<UContainer>` 或手写 Tailwind 实现入场动画（可用 `@vueuse/motion` 替代 framer-motion）。

### 6.2 ConfigPanel — 左侧配置面板

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

### 6.3 ScenarioShowcase — 右侧场景展示

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

### 6.4 FeatureGrid — 功能特性

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

### 6.5 HowItWorks — 使用步骤

**布局**：3 列网格（`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`）

**卡片结构**：
- 图片区：`h-[240px] object-cover bg-secondary`
- 文字区：`p-6`
  - 标题：`text-lg font-bold text-foreground`
  - 描述：`text-sm text-muted-foreground leading-relaxed`
- hover 效果：`hover:-translate-y-1 hover:border-primary/30`
- 边框：`border border-border rounded-2xl bg-card`

### 6.6 Testimonials — 用户评价

**布局**：3 列网格（`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`）

**卡片结构**：
- 星级评分：5 颗星，`fill-primary text-primary`（亮）/ `fill-muted text-muted`（暗）
- 评论文字：`text-sm text-muted-foreground leading-relaxed`，带引号
- 用户信息：头像（40×40 圆形）+ 姓名 + 职位，`border-t border-border pt-4`
- hover 效果：`hover:-translate-y-1 hover:border-primary/30`

### 6.7 FAQSection — 常见问题

**布局**：最大宽度 `max-w-3xl` 居中

**组件**：使用 `@nuxt/ui` 的 `<UAccordion>` （对应原 Radix Accordion）
- 标题：`font-body text-sm font-medium text-foreground`
- 内容：`text-sm text-muted-foreground`
- 单选模式（`type="single" collapsible`）

---

## 七、待接入 API 插槽

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

| 场景 | 类型 | 中文文案 |
|---|---|---|
| 生成成功 | success | 您的图像已经准备好，可以来查看结果啦 |
| 生成失败 | error | 非常抱歉，本次生图没有成功，您可以点击生成按钮重试 |
| 下载成功 | success | 下载成功 |
| 下载失败 | error | 下载失败 |
| 复制成功 | success | 复制成功 |
| 复制失败 | error | 复制失败 |

> Toast 位置：页面顶部居中（`top-center`），使用 `@nuxt/ui` 的 `useToast()` 或 `<UNotifications>`。

---

## 八、图片资源清单

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

## 九、技术栈差异映射表

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

## 十、需研发人员介入的清单

| 项目 | 说明 |
|---|---|
| `main.css` 修改 | 如需修改 @nuxt/ui 默认主题变量，请确认后手动操作 |
| 图片生成 API 接入 | `server/api/generate-image.post.ts` 需对接实际 AI 服务 |
| 文件上传到云存储 | `handleUploadToStorage` 需实现具体存储方案 |
| pm2 + Docker 部署配置 | `docker/ecosystem.config.js` 需根据服务器环境调整 |

---

*文档版本：v1.0 | 生成日期：2026-03-02*
