export type Lang = 'zh' | 'en' | 'ko' | 'ja' | 'es';

export const LANG_LABELS: Record<Lang, string> = {
  en: 'English',
  zh: '简体中文',
  ko: '한국어',
  ja: '日本語',
  es: 'Español',
};

export const locales: Record<string, Record<Lang, string>> = {
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
  resolution: {
    en: 'Resolution', zh: '清晰度', ko: '해상도', ja: '解像度', es: 'Resolución',
  },
  referenceImage: {
    en: 'Reference Image', zh: '参考图片', ko: '참고 이미지', ja: '参照画像', es: 'Imagen de referencia',
  },
  prompt: {
    en: 'Prompt', zh: '提示词', ko: '프롬프트', ja: 'プロンプト', es: 'Indicación',
  },
  generate: {
    en: 'Generate', zh: '生成', ko: '생성', ja: '生成', es: 'Generar',
  },
  caseGallery: {
    en: 'Case Gallery', zh: '案例展示', ko: '사례 갤러리', ja: 'ケースギャラリー', es: 'Galería de casos',
  },
  topics: {
    en: 'Topics', zh: '功能特征', ko: '주요 기능', ja: '特徴', es: 'Características',
  },
  faqTitle: {
    en: 'Frequently Asked Questions', zh: '常见问题', ko: '자주 묻는 질문', ja: 'よくある質問', es: 'Preguntas frecuentes',
  },
  uploadOrSelect: {
    en: 'Click to upload reference image', zh: '点击上传参考图片', ko: '클릭하여 참고 이미지 업로드', ja: 'クリックして参照画像をアップロード', es: 'Haz clic para subir imagen de referencia',
  },
  supportTitle: {
    en: 'Need Help?', zh: '需要帮助？', ko: '도움이 필요하신가요?', ja: 'ヘルプが必要ですか？', es: '¿Necesitas ayuda?',
  },
  supportDesc: {
    en: 'Our team is ready to assist you with any questions about Nano Banana 2.',
    zh: '我们的团队随时准备为您解答关于 Nano Banana 2 的任何问题。',
    ko: 'Nano Banana 2에 대한 모든 질문에 답변해 드리겠습니다.',
    ja: 'Nano Banana 2に関するご質問にお答えします。',
    es: 'Nuestro equipo está listo para ayudarte con cualquier pregunta sobre Nano Banana 2.',
  },
  contactSupport: {
    en: 'Contact Support', zh: '联系支持', ko: '지원 문의', ja: 'サポートに連絡', es: 'Contactar soporte',
  },
  generateNow: {
    en: 'Try Now →', zh: '立即使用 →', ko: '지금 사용 →', ja: '今すぐ使う →', es: 'Usar ahora →',
  },
  modelLabel: {
    en: 'Model', zh: '模型', ko: '모델', ja: 'モデル', es: 'Modelo',
  },
  quantity: {
    en: 'Quantity', zh: '生图数量', ko: '생성 수량', ja: '生成枚数', es: 'Cantidad',
  },
  aspectRatio: {
    en: 'Aspect Ratio', zh: '生图比例', ko: '화면 비율', ja: 'アスペクト比', es: 'Relación de aspecto',
  },
  promptPlaceholder: {
    en: 'Describe the image you want to create...', zh: '描述你想要创建的图像...', ko: '생성할 이미지를 설명하세요...', ja: '作成したい画像を説明してください...', es: 'Describe la imagen que deseas crear...',
  },
  generating: {
    en: 'Generating...', zh: '生成中...', ko: '생성 중...', ja: '生成中...', es: 'Generando...',
  },
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
  nameKey: string;
  descKey: string;
  fields: ModelFieldConfig[];
}

export const modelConfigs: ModelConfig[] = [
  {
    id: 'nano-banana-2',
    nameKey: 'model_nb2_name',
    descKey: 'model_nb2_desc',
    fields: [
      { type: 'upload', labelKey: 'referenceImage' },
      { type: 'radio', labelKey: 'resolution', options: ['1K', '2K', '4K'], default: '1K' },
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
      { type: 'radio', labelKey: 'resolution', options: ['2K', '4K'], default: '2K' },
      { type: 'radio', labelKey: 'quantity', options: ['1', '2', '3', '4'], default: '1' },
      { type: 'radio', labelKey: 'aspectRatio', options: ['1:1', '3:4', '4:3', '9:16', '16:9'], default: '1:1' },
    ],
  },
];

export const modelLocales: Record<string, Record<Lang, string>> = {
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

/* ── Scenario showcase ── */

export interface ScenarioImage {
  src: string; // will be mapped to import at component level
  alt: string;
  promptKey: string;
}

export interface Scenario {
  id: string;
  nameKey: string;
  images: { altKey: string; promptKey: string }[];
}

export const scenarios: Scenario[] = [
  {
    id: 'search',
    nameKey: 'scenario_search',
    images: [
      { altKey: 'scene_search_1_alt', promptKey: 'scene_search_1_prompt' },
    ],
  },
  {
    id: 'multiangle',
    nameKey: 'scenario_multiangle',
    images: [
      { altKey: 'scene_multi_1_alt', promptKey: 'scene_multi_1_prompt' },
    ],
  },
  {
    id: 'text',
    nameKey: 'scenario_text',
    images: [
      { altKey: 'scene_text_1_alt', promptKey: 'scene_text_1_prompt' },
    ],
  },
  {
    id: 'consistency',
    nameKey: 'scenario_consistency',
    images: [
      { altKey: 'scene_consist_1_alt', promptKey: 'scene_consist_1_prompt' },
    ],
  },
];

export const scenarioLocales: Record<string, Record<Lang, string>> = {
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
  // alts
  scene_search_1_alt: { en: 'AI search grounding dashboard', zh: 'AI搜索驱动面板', ko: 'AI 검색 기반 대시보드', ja: 'AI検索グラウンディングダッシュボード', es: 'Panel de búsqueda AI' },
  scene_search_2_alt: { en: 'AI trending mood board', zh: 'AI趋势情绪板', ko: 'AI 트렌드 무드보드', ja: 'AIトレンドムードボード', es: 'Tablero de tendencias AI' },
  scene_multi_1_alt: { en: 'Multi-angle handbag product shots', zh: '多角度手提包产品图', ko: '다각도 핸드백 제품 사진', ja: 'マルチアングルハンドバッグ製品写真', es: 'Fotos de bolso multiángulo' },
  scene_multi_2_alt: { en: 'Multi-angle sneaker product shots', zh: '多角度运动鞋产品图', ko: '다각도 스니커즈 제품 사진', ja: 'マルチアングルスニーカー製品写真', es: 'Fotos de zapatillas multiángulo' },
  scene_text_1_alt: { en: 'AI text rendering on poster', zh: 'AI海报文字渲染', ko: 'AI 포스터 텍스트 렌더링', ja: 'AIポスターテキストレンダリング', es: 'Renderizado de texto AI en póster' },
  scene_text_2_alt: { en: 'Multilingual packaging text', zh: '多语言包装文字', ko: '다국어 패키지 텍스트', ja: '多言語パッケージテキスト', es: 'Texto multilingüe en empaque' },
  scene_consist_1_alt: { en: 'Character consistency sheet', zh: '角色一致性参考表', ko: '캐릭터 일관성 시트', ja: 'キャラクター一貫性シート', es: 'Hoja de consistencia de personaje' },
  scene_consist_2_alt: { en: 'Mascot in different scenes', zh: '不同场景中的吉祥物', ko: '다양한 장면의 마스코트', ja: '異なるシーンのマスコット', es: 'Mascota en diferentes escenas' },
  // prompts
  scene_search_1_prompt: {
    en: 'Generate trending visual content inspired by current search topics, dashboard style with image grid',
    zh: '根据当前搜索话题生成趋势视觉内容，仪表板风格图片网格',
    ko: '현재 검색 주제에서 영감을 받은 트렌드 시각 콘텐츠 생성, 대시보드 스타일 이미지 그리드',
    ja: '現在の検索トピックからインスパイアされたトレンドビジュアルコンテンツ、ダッシュボードスタイル',
    es: 'Generar contenido visual tendencia inspirado en temas de búsqueda actuales, estilo dashboard',
  },
  scene_search_2_prompt: {
    en: 'Create an AI-curated interior design mood board with trending home decor styles',
    zh: 'AI精选室内设计情绪板，展示流行家居装饰风格',
    ko: 'AI 큐레이션 인테리어 디자인 무드보드, 트렌드 홈 데코 스타일',
    ja: 'AIキュレーションのインテリアデザインムードボード、トレンドホームデコスタイル',
    es: 'Crear un mood board de diseño interior curado por IA con estilos de decoración tendencia',
  },
  scene_multi_1_prompt: {
    en: 'Professional product photography of a luxury black handbag from 6 angles, white studio background',
    zh: '奢华黑色手提包6角度专业产品摄影，白色摄影棚背景',
    ko: '럭셔리 블랙 핸드백 6각도 전문 제품 사진, 흰색 스튜디오 배경',
    ja: '高級ブラックハンドバッグの6アングルプロフェッショナル製品写真、白スタジオ背景',
    es: 'Fotografía profesional de bolso negro de lujo desde 6 ángulos, fondo de estudio blanco',
  },
  scene_multi_2_prompt: {
    en: 'Multi-angle product display of white sneakers with orange accents, 4 views, clean studio',
    zh: '白色运动鞋橙色点缀多角度产品展示，4个视角，简洁摄影棚',
    ko: '오렌지 포인트 화이트 스니커즈 다각도 제품 디스플레이, 4개 뷰, 클린 스튜디오',
    ja: 'オレンジアクセントのホワイトスニーカーマルチアングル製品表示、4ビュー、クリーンスタジオ',
    es: 'Exhibición multiángulo de zapatillas blancas con acentos naranjas, 4 vistas, estudio limpio',
  },
  scene_text_1_prompt: {
    en: 'Creative marketing poster with bold "MARKETING" text overlaid on colorful abstract art background',
    zh: '创意营销海报，大胆的"MARKETING"文字叠加在彩色抽象艺术背景上',
    ko: '컬러풀한 추상 아트 배경에 볼드한 "MARKETING" 텍스트가 있는 크리에이티브 마케팅 포스터',
    ja: 'カラフルな抽象アート背景にボールドな"MARKETING"テキストのクリエイティブマーケティングポスター',
    es: 'Póster de marketing creativo con texto "MARKETING" en negrita sobre fondo de arte abstracto colorido',
  },
  scene_text_2_prompt: {
    en: 'Product packaging with multilingual text rendering in Chinese and Japanese, green and red design',
    zh: '多语言产品包装文字渲染，中日文，绿红配色设计',
    ko: '중국어, 일본어 다국어 텍스트 렌더링 제품 패키지, 녹색 및 빨간색 디자인',
    ja: '中国語と日本語の多言語テキストレンダリング製品パッケージ、緑と赤のデザイン',
    es: 'Empaque de producto con texto multilingüe en chino y japonés, diseño verde y rojo',
  },
  scene_consist_1_prompt: {
    en: 'Character consistency reference sheet, anime style, same character in 5 different outfits and poses',
    zh: '角色一致性参考表，动漫风格，同一角色5种不同服装和姿势',
    ko: '캐릭터 일관성 참조 시트, 애니메이션 스타일, 같은 캐릭터 5가지 다른 의상과 포즈',
    ja: 'キャラクター一貫性リファレンスシート、アニメスタイル、同一キャラクター5つの異なる衣装とポーズ',
    es: 'Hoja de referencia de consistencia de personaje, estilo anime, mismo personaje en 5 atuendos diferentes',
  },
  scene_consist_2_prompt: {
    en: 'Same cute mascot character in 4 different environments: beach, park, city, mountains, maintaining identical design',
    zh: '同一可爱吉祥物角色在4个不同环境中：海滩、公园、城市、山脉，保持一致设计',
    ko: '같은 귀여운 마스코트 캐릭터가 4가지 다른 환경: 해변, 공원, 도시, 산, 동일한 디자인 유지',
    ja: '同じかわいいマスコットキャラクターが4つの異なる環境：ビーチ、公園、都市、山、同一デザインを維持',
    es: 'Mismo personaje mascota en 4 entornos diferentes: playa, parque, ciudad, montañas, manteniendo diseño idéntico',
  },
};

/* ── Feature grid (alternating rows) ── */

export const featureCards: { icon: string; status: string; nameKey: string; descKey: string }[] = [
  { icon: 'Plug', status: 'Available', nameKey: 'feat_api', descKey: 'feat_api_desc' },
  { icon: 'Layers', status: 'Available', nameKey: 'feat_multi', descKey: 'feat_multi_desc' },
  { icon: 'Download', status: 'Available', nameKey: 'feat_export', descKey: 'feat_export_desc' },
  { icon: 'Paintbrush', status: 'New', nameKey: 'feat_style', descKey: 'feat_style_desc' },
  { icon: 'Shield', status: 'Available', nameKey: 'feat_safety', descKey: 'feat_safety_desc' },
  { icon: 'Zap', status: 'Available', nameKey: 'feat_speed', descKey: 'feat_speed_desc' },
  { icon: 'Globe', status: 'New', nameKey: 'feat_i18n', descKey: 'feat_i18n_desc' },
  { icon: 'Settings', status: 'Available', nameKey: 'feat_custom', descKey: 'feat_custom_desc' },
];

export const featureLocales: Record<string, Record<Lang, string>> = {
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
  feat_safety: { en: 'Content Safety', zh: '内容安全', ko: '콘텐츠 안전', ja: 'コンテンツセーフティ', es: 'Seguridad de contenido' },
  feat_safety_desc: {
    en: 'Built-in content moderation in Nano Banana 2 ensures safe and compliant image generation.',
    zh: 'Nano Banana 2 内置内容审核，确保安全合规的图像生成。',
    ko: 'Nano Banana 2의 내장 콘텐츠 검토 기능으로 안전하고 규정을 준수하는 이미지 생성을 보장합니다.',
    ja: 'Nano Banana 2の内蔵コンテンツモデレーションにより、安全でコンプライアンスに準拠した画像生成を保証。',
    es: 'La moderación de contenido integrada en Nano Banana 2 garantiza la generación segura de imágenes.',
  },
  feat_speed: { en: 'High-Speed Rendering', zh: '高速渲染', ko: '고속 렌더링', ja: '高速レンダリング', es: 'Renderizado de alta velocidad' },
  feat_speed_desc: {
    en: 'Nano Banana 2 delivers ultra-fast image generation with optimized GPU acceleration.',
    zh: 'Nano Banana 2 借助优化的 GPU 加速实现超快图像生成。',
    ko: 'Nano Banana 2는 최적화된 GPU 가속을 통해 초고속 이미지 생성을 제공합니다.',
    ja: 'Nano Banana 2は最適化されたGPUアクセラレーションで超高速画像生成を実現。',
    es: 'Nano Banana 2 ofrece generación de imágenes ultrarrápida con aceleración GPU optimizada.',
  },
  feat_i18n: { en: 'Multi-Language Support', zh: '多语言支持', ko: '다국어 지원', ja: '多言語サポート', es: 'Soporte multilingüe' },
  feat_i18n_desc: {
    en: 'Nano Banana 2 supports prompts and interface in 5+ languages for global creative teams.',
    zh: 'Nano Banana 2 支持 5 种以上语言的提示词和界面，服务全球创意团队。',
    ko: 'Nano Banana 2는 글로벌 크리에이티브 팀을 위해 5개 이상의 언어로 프롬프트와 인터페이스를 지원합니다.',
    ja: 'Nano Banana 2はグローバルクリエイティブチームのために5言語以上のプロンプトとインターフェースをサポート。',
    es: 'Nano Banana 2 soporta indicaciones e interfaz en más de 5 idiomas para equipos creativos globales.',
  },
  feat_custom: { en: 'Advanced Customization', zh: '高级自定义', ko: '고급 커스터마이징', ja: '高度なカスタマイズ', es: 'Personalización avanzada' },
  feat_custom_desc: {
    en: 'Configure Nano Banana 2 with custom presets, workflows, and output parameters for your needs.',
    zh: 'Nano Banana 2 支持自定义预设、工作流和输出参数，满足您的个性化需求。',
    ko: 'Nano Banana 2를 사용자 정의 프리셋, 워크플로 및 출력 매개변수로 구성하세요.',
    ja: 'Nano Banana 2をカスタムプリセット、ワークフロー、出力パラメータで構成。',
    es: 'Configura Nano Banana 2 con preajustes personalizados, flujos de trabajo y parámetros de salida.',
  },
};

/* ── FAQ ── */

export const faqData: { qKey: string; aKey: string }[] = [
  { qKey: 'faq_q1', aKey: 'faq_a1' },
  { qKey: 'faq_q2', aKey: 'faq_a2' },
  { qKey: 'faq_q3', aKey: 'faq_a3' },
  { qKey: 'faq_q4', aKey: 'faq_a4' },
  { qKey: 'faq_q5', aKey: 'faq_a5' },
  { qKey: 'faq_q6', aKey: 'faq_a6' },
];

export const faqLocales: Record<string, Record<Lang, string>> = {
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

/* ── Legacy case prompts (kept for backward compat) ── */

export const casePrompts: Record<Lang, string[]> = {
  en: [
    'A cinematic portrait with golden sunset light, flowing hair, soft bokeh background',
    'A serene Japanese zen garden with cherry blossoms, watercolor painting style',
    'A futuristic cyberpunk cityscape at night with neon lights and flying vehicles',
    'A cute cartoon cat wearing a chef hat cooking in a miniature kitchen, kawaii style',
    'A majestic snow-capped mountain landscape at golden hour with crystal clear lake reflection',
  ],
  zh: [
    '金色夕阳下的电影感人像，飘逸长发，柔和虚化背景',
    '宁静的日式禅意花园，樱花盛开，水彩画风格',
    '夜晚的未来赛博朋克城市景观，霓虹灯光和飞行器',
    '戴厨师帽的可爱卡通猫在微型厨房做饭，卡哇伊风格',
    '金色时刻的壮丽雪山景观，清澈湖面倒影',
  ],
  ko: [
    '황금빛 석양 속 시네마틱 인물 사진, 흩날리는 머리카락, 부드러운 보케 배경',
    '벚꽃이 핀 고요한 일본식 정원, 수채화 스타일',
    '네온 조명과 비행체가 있는 야간 미래 사이버펑크 도시 풍경',
    '셰프 모자를 쓴 귀여운 만화 고양이가 미니 주방에서 요리하는 카와이 스타일',
    '골든아워의 장엄한 설산 풍경, 맑은 호수 반영',
  ],
  ja: [
    '黄金色の夕日に照らされた映画的なポートレート、なびく髪、柔らかなボケ背景',
    '桜が咲く静寂な日本の禅庭園、水彩画スタイル',
    'ネオンライトと飛行車両がある夜のサイバーパンク都市景観',
    'シェフ帽をかぶった可愛い漫画の猫がミニキッチンで料理する、カワイイスタイル',
    'ゴールデンアワーの壮大な雪山の風景、澄んだ湖の反射',
  ],
  es: [
    'Retrato cinematográfico con luz dorada del atardecer, cabello al viento, fondo bokeh suave',
    'Jardín zen japonés sereno con flores de cerezo, estilo acuarela',
    'Paisaje urbano cyberpunk futurista nocturno con luces de neón y vehículos voladores',
    'Gato de dibujos animados lindo con gorro de chef cocinando, estilo kawaii',
    'Majestuoso paisaje montañoso nevado al atardecer con reflejo en lago cristalino',
  ],
};
