export const locales = {
  heroTitle: 'Nano Banana 2：专业 AI 图像创作工具',
  heroSubtitle: '释放无限创造力：面向专业人士的高性能多模型 AI 图像生成。',
  resolution: '清晰度',
  referenceImage: '参考图片',
  prompt: '提示词',
  generate: '生成',
  caseGallery: '案例展示',
  topics: '功能特征',
  faqTitle: '常见问题',
  uploadOrSelect: '点击上传参考图片',
  supportTitle: '需要帮助？',
  supportDesc: '我们的团队随时准备为您解答关于 Nano Banana 2 的任何问题。',
  contactSupport: '联系支持',
  generateNow: '立即使用 →',
  modelLabel: '模型',
  quantity: '生图数量',
  aspectRatio: '生图比例',
  promptPlaceholder: '描述你想要创建的图像...',
  generating: '生成中...',
};

/* ── Model configuration ── */

export interface ModelFieldConfig {
  type: 'upload' | 'select' | 'number' | 'radio';
  labelKey: string;
  options?: string[];
  default?: string | number;
}

export interface ModelConfig {
  id: string;
  name: string;
  desc: string;
  fields: ModelFieldConfig[];
}

export const modelConfigs: ModelConfig[] = [
  {
    id: 'nano-banana-2',
    name: 'Nano Banana 2',
    desc: '多风格 AI 图像生成，支持高分辨率输出。',
    fields: [
      { type: 'upload', labelKey: 'referenceImage' },
      { type: 'radio', labelKey: 'resolution', options: ['1K', '2K', '4K'], default: '1K' },
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
      { type: 'radio', labelKey: 'resolution', options: ['2K', '4K'], default: '2K' },
      { type: 'radio', labelKey: 'quantity', options: ['1', '2', '3', '4'], default: '1' },
      { type: 'radio', labelKey: 'aspectRatio', options: ['1:1', '3:4', '4:3', '9:16', '16:9'], default: '1:1' },
    ],
  },
];

/* ── Scenario showcase ── */

export interface Scenario {
  id: string;
  name: string;
  images: { alt: string; prompt: string }[];
}

export const scenarios: Scenario[] = [
  {
    id: 'search',
    name: '搜索驱动 & 趋势',
    images: [{ alt: 'AI搜索驱动面板', prompt: '根据当前搜索话题生成趋势视觉内容，仪表板风格图片网格' }],
  },
  {
    id: 'multiangle',
    name: '多角度展示',
    images: [{ alt: '多角度手提包产品图', prompt: '奢华黑色手提包6角度专业产品摄影，白色摄影棚背景' }],
  },
  {
    id: 'text',
    name: '文字渲染 & 翻译',
    images: [{ alt: 'AI海报文字渲染', prompt: '创意营销海报，大胆的"MARKETING"文字叠加在彩色抽象艺术背景上' }],
  },
  {
    id: 'consistency',
    name: '一致性',
    images: [{ alt: '角色一致性参考表', prompt: '角色一致性参考表，动漫风格，同一角色5种不同服装和姿势' }],
  },
];

/* ── Feature grid (alternating rows) ── */

export const featureLocales: Record<string, string> = {
  feat_api: '免费高速与专业级 4K 图像生成能力',
  feat_api_desc: 'Nano Banana 2 基于 Gemini 3.1 Flash，让您快速创建、编辑和融合 4K 图像。精准文字渲染、多图编辑，免费享受专业级能力。',
  feat_multi: '角色稳定、速度快、性价比高',
  feat_multi_desc: 'Nano Banana 2 可在多张图像中保持最多 5 个角色和 14 个对象的一致性。它快速生成 4K 图像，成本仅为 Nano Banana Pro 的一半。这种速度、稳定性和实惠的价格，使其成为需要可靠专业成果的创作者的理想选择。',
  feat_export: '专业文字渲染与翻译',
  feat_export_desc: '图像中的文字清晰准确。Nano Banana 2 修复 AI 常见的拼写错误、Logo 损坏和标签混乱等问题。您可以添加标题、图表标注，或进行文字翻译，同时保持字体、排版和风格的一致性，适用于营销材料或演示文稿。',
  feat_style: '什么是 Nano Banana 2？',
  feat_style_desc: 'Nano Banana 2 是一款基于 Gemini 3.1 Flash 的高速 AI 图像模型。它让您能够快速创建、编辑和融合 4K 图像，并具备强大的专业级能力。借助实时搜索增强技术，Nano Banana 2 能够理解最新设备和流行趋势，让生成结果真实可信而非凭空猜测。它还支持精准的文字渲染，修复图像内的拼写错误和排版问题。在保持最多 5 个角色和 14 个对象一致性的同时，运行速度快，成本仅为 Nano Banana Pro 的一半。如需更多选择，欢迎尝试 Nano Banana Pro 或 Nano Banana。',
};

/* ── FAQ ── */

export const faqData: { q: string; a: string }[] = [
  { q: '什么是 Nano Banana 2？', a: 'Nano Banana 2 是专业级 AI 图像生成平台，支持多模型并提供高性能渲染。' },
  { q: 'Nano Banana 2 能准确处理图像中的文字吗？', a: '是的，Nano Banana 2 在图像中渲染文字方面表现出色，精准度极高。它支持多语言文字生成，能够制作海报、包装和营销素材中的清晰可读文字——这是大多数 AI 图像生成器难以实现的能力。' },
  { q: '在多张图像中能保持角色和对象的一致性吗？', a: '完全可以。Nano Banana 2 拥有先进的一致性技术，能够在多张生成图像中保持相同的角色外貌、服装细节和对象设计。这对于创建角色设定图、产品系列、品牌吉祥物以及连续叙事的视觉内容非常理想。' },
  { q: 'Nano Banana 2 支持导出哪些图像格式？', a: 'Nano Banana 2 支持 PNG、JPEG、WebP 和 TIFF 格式，并可自定义质量设置。' },
  { q: 'Nano Banana 2 有免费试用吗？', a: '是的，Nano Banana 2 提供每日有限次数的免费使用额度，方便您在订阅前体验。' },
  { q: 'Nano Banana 2 的风格微调是如何工作的？', a: 'Nano Banana 2 的风格微调功能允许您调整色温、艺术风格和细节级别等参数，实现精确的创意控制。' },
];

/* ── Legacy case prompts ── */

export const casePrompts: string[] = [
  '金色夕阳下的电影感人像，飘逸长发，柔和虚化背景',
  '宁静的日式禅意花园，樱花盛开，水彩画风格',
  '夜晚的未来赛博朋克城市景观，霓虹灯光和飞行器',
  '戴厨师帽的可爱卡通猫在微型厨房做饭，卡哇伊风格',
  '金色时刻的壮丽雪山景观，清澈湖面倒影',
];
