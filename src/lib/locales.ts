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
    en: 'Resolution', zh: '分辨率', ko: '해상도', ja: '解像度', es: 'Resolución',
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
    en: 'Upload or select a case', zh: '上传或选择案例', ko: '업로드 또는 사례 선택', ja: 'アップロードまたはケースを選択', es: 'Sube o selecciona un caso',
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
};

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
  feat_api: { en: 'API Integration', zh: 'API 集成', ko: 'API 통합', ja: 'API統合', es: 'Integración API' },
  feat_api_desc: {
    en: 'Nano Banana 2 offers seamless RESTful API integration for automated image generation workflows.',
    zh: 'Nano Banana 2 提供无缝的 RESTful API 集成，实现自动化图像生成工作流。',
    ko: 'Nano Banana 2는 자동화된 이미지 생성 워크플로를 위한 원활한 RESTful API 통합을 제공합니다.',
    ja: 'Nano Banana 2は、自動画像生成ワークフローのためのシームレスなRESTful API統合を提供します。',
    es: 'Nano Banana 2 ofrece integración API RESTful sin interrupciones para flujos de trabajo automatizados.',
  },
  feat_multi: { en: 'Multi-Model Engine', zh: '多模型引擎', ko: '다중 모델 엔진', ja: 'マルチモデルエンジン', es: 'Motor multimodelo' },
  feat_multi_desc: {
    en: 'Switch between multiple AI models in Nano Banana 2 to achieve different visual styles and outputs.',
    zh: '在 Nano Banana 2 中切换多个 AI 模型，实现不同的视觉风格和输出效果。',
    ko: 'Nano Banana 2에서 여러 AI 모델을 전환하여 다양한 시각적 스타일과 결과물을 생성하세요.',
    ja: 'Nano Banana 2で複数のAIモデルを切り替え、異なるビジュアルスタイルと出力を実現。',
    es: 'Cambia entre múltiples modelos de IA en Nano Banana 2 para lograr diferentes estilos visuales.',
  },
  feat_export: { en: 'Bulk Image Export', zh: '批量图像导出', ko: '대량 이미지 내보내기', ja: '一括画像エクスポート', es: 'Exportación masiva' },
  feat_export_desc: {
    en: 'Nano Banana 2 supports bulk image export in multiple formats including PNG, JPEG, and WebP.',
    zh: 'Nano Banana 2 支持批量导出 PNG、JPEG 和 WebP 等多种格式的图像。',
    ko: 'Nano Banana 2는 PNG, JPEG, WebP를 포함한 다양한 형식의 대량 이미지 내보내기를 지원합니다.',
    ja: 'Nano Banana 2はPNG、JPEG、WebPなど複数形式での一括画像エクスポートをサポート。',
    es: 'Nano Banana 2 soporta exportación masiva en múltiples formatos incluyendo PNG, JPEG y WebP.',
  },
  feat_style: { en: 'Style Fine-tuning', zh: '风格微调', ko: '스타일 미세 조정', ja: 'スタイルファインチューニング', es: 'Ajuste de estilo' },
  feat_style_desc: {
    en: 'Fine-tune visual styles with Nano Banana 2 advanced parameter controls for precise creative output.',
    zh: 'Nano Banana 2 高级参数控制进行视觉风格微调，实现精确的创意输出。',
    ko: 'Nano Banana 2의 고급 매개변수 제어를 통해 시각적 스타일을 미세 조정하여 정밀한 창작물을 생성하세요.',
    ja: 'Nano Banana 2の高度なパラメータ制御でビジュアルスタイルをファインチューニング。',
    es: 'Ajusta los estilos visuales con los controles avanzados de Nano Banana 2 para una salida creativa precisa.',
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
  faq_q2: { en: 'How many AI models does Nano Banana 2 support?', zh: 'Nano Banana 2 支持多少个 AI 模型？', ko: 'Nano Banana 2는 몇 개의 AI 모델을 지원하나요?', ja: 'Nano Banana 2はいくつのAIモデルをサポートしていますか？', es: '¿Cuántos modelos de IA soporta Nano Banana 2?' },
  faq_a2: {
    en: 'Nano Banana 2 currently supports 5+ state-of-the-art image generation models with regular updates.',
    zh: 'Nano Banana 2 目前支持 5 种以上的前沿图像生成模型，并定期更新。',
    ko: 'Nano Banana 2는 현재 5개 이상의 최첨단 이미지 생성 모델을 지원하며 정기적으로 업데이트됩니다.',
    ja: 'Nano Banana 2は現在5つ以上の最先端画像生成モデルをサポートし、定期的に更新されます。',
    es: 'Nano Banana 2 actualmente soporta más de 5 modelos de generación de imágenes de última generación con actualizaciones regulares.',
  },
  faq_q3: { en: 'Can I use Nano Banana 2 via API?', zh: '我可以通过 API 使用 Nano Banana 2 吗？', ko: 'API를 통해 Nano Banana 2를 사용할 수 있나요?', ja: 'APIでNano Banana 2を使用できますか？', es: '¿Puedo usar Nano Banana 2 a través de API?' },
  faq_a3: {
    en: 'Yes, Nano Banana 2 provides a full RESTful API for seamless integration into your existing workflows.',
    zh: '是的，Nano Banana 2 提供完整的 RESTful API，可无缝集成到您现有的工作流中。',
    ko: '네, Nano Banana 2는 기존 워크플로에 원활하게 통합할 수 있는 완전한 RESTful API를 제공합니다.',
    ja: 'はい、Nano Banana 2は既存のワークフローにシームレスに統合できるRESTful APIを提供します。',
    es: 'Sí, Nano Banana 2 proporciona una API RESTful completa para integración sin interrupciones en tus flujos de trabajo existentes.',
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
    es: 'El ajuste de estilo en Nano Banana 2 te permite ajustar parámetros como la temperatura de color, el estilo artístico y el nivel de detalle para lograr un control creativo preciso.',
  },
};
