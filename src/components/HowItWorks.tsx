import { motion } from 'framer-motion';
import { Lang, locales } from '@/lib/locales';

import stepUpload from '@/assets/step-upload.jpg';
import stepPrompt from '@/assets/step-prompt.jpg';
import stepGenerate from '@/assets/step-generate.jpg';

interface Step {
  image: string;
  titleKey: string;
  descKey: string;
}

const MOCK_DATA = {
  sectionTitle: {
    en: 'How to Generate 4K Images Online with Nano Banana 2',
    zh: '如何使用 Nano Banana 2 在线生成 4K 图像',
    ko: 'Nano Banana 2로 4K 이미지를 온라인으로 생성하는 방법',
    ja: 'Nano Banana 2でオンライン4K画像を生成する方法',
    es: 'Cómo generar imágenes 4K en línea con Nano Banana 2',
  } as Record<Lang, string>,
  sectionDesc: {
    en: 'Follow these three simple steps to create or edit images with Nano Banana 2. This high-speed AI image model helps you turn ideas into sharp 4K images through text prompts and optional image input.',
    zh: '按照以下三个简单步骤，使用 Nano Banana 2 创建或编辑图像。这款高速 AI 图像模型帮助您通过文字提示和可选的图片输入，将创意转化为清晰的 4K 图像。',
    ko: '다음 세 가지 간단한 단계로 Nano Banana 2로 이미지를 생성하거나 편집하세요. 이 고속 AI 이미지 모델은 텍스트 프롬프트와 선택적 이미지 입력을 통해 아이디어를 선명한 4K 이미지로 변환합니다.',
    ja: 'この3つの簡単なステップでNano Banana 2で画像を作成・編集しましょう。この高速AIモデルは、テキストプロンプトとオプションの画像入力で、アイデアを鮮明な4K画像に変換します。',
    es: 'Sigue estos tres sencillos pasos para crear o editar imágenes con Nano Banana 2. Este modelo de IA de alta velocidad convierte tus ideas en imágenes 4K nítidas.',
  } as Record<Lang, string>,
  steps: [
    { image: stepUpload, titleKey: 'step1_title', descKey: 'step1_desc' },
    { image: stepPrompt, titleKey: 'step2_title', descKey: 'step2_desc' },
    { image: stepGenerate, titleKey: 'step3_title', descKey: 'step3_desc' },
  ] as Step[],
  stepLocales: {
    step1_title: { en: 'Step 1: Upload Image (Optional)', zh: '第一步：上传图片（可选）', ko: '1단계: 이미지 업로드 (선택)', ja: 'ステップ1：画像をアップロード（任意）', es: 'Paso 1: Subir imagen (Opcional)' },
    step1_desc: { en: 'To optimize or modify an existing image, upload one. Nano Banana 2 supports image editing and style transfer. You can also skip this step and generate a new image directly from text.', zh: '如需优化或修改现有图片，请上传一张图片。Nano Banana 2 支持图像编辑和风格转换。您也可以跳过此步骤，直接通过文字描述生成全新图像。', ko: '기존 이미지를 최적화하거나 수정하려면 업로드하세요. 스타일 전환도 지원합니다. 이 단계를 건너뛰고 텍스트에서 직접 새 이미지를 생성할 수도 있습니다.', ja: '既存の画像を最適化または修正するにはアップロードしてください。スタイル変換もサポートします。このステップをスキップしてテキストから直接生成することもできます。', es: 'Para optimizar o modificar una imagen existente, súbala. También puede omitir este paso y generar directamente desde texto.' },
    step2_title: { en: 'Step 2: Enter Your Prompt', zh: '第二步：输入提示词', ko: '2단계: 프롬프트 입력', ja: 'ステップ2：プロンプトを入力', es: 'Paso 2: Ingresa tu indicación' },
    step2_desc: { en: 'Enter a clear description of what you want to create. Nano Banana 2 understands detailed instructions — add objects, adjust styles, or render precise text within images.', zh: '输入清晰的描述说明您想要创建的内容。Nano Banana 2 能理解详细指令，可在图像中添加对象、调整风格或渲染精准文字。', ko: '만들고 싶은 것을 명확하게 설명하세요. Nano Banana 2는 상세한 지시를 이해하며 객체 추가, 스타일 조정, 텍스트 렌더링이 가능합니다.', ja: '作成したい内容を明確に記述してください。Nano Banana 2は詳細な指示を理解し、オブジェクトの追加、スタイルの調整、正確なテキストのレンダリングが可能です。', es: 'Ingresa una descripción clara de lo que quieres crear. Nano Banana 2 entiende instrucciones detalladas.' },
    step3_title: { en: 'Step 3: Generate & Download', zh: '第三步：生成并下载', ko: '3단계: 생성 및 다운로드', ja: 'ステップ3：生成とダウンロード', es: 'Paso 3: Generar y descargar' },
    step3_desc: { en: 'Click generate and wait a few seconds. Nano Banana 2 will output a sharp 4K image. Review the result, then download for design, social media, or marketing.', zh: '点击生成，等待几秒钟。Nano Banana 2 将输出清晰的 4K 图像。查看结果后，下载最终文件，用于设计、社交媒体发布或营销推广。', ko: '생성을 클릭하고 몇 초만 기다리세요. Nano Banana 2가 선명한 4K 이미지를 출력합니다. 결과를 확인한 후 디자인, SNS, 마케팅에 활용하세요.', ja: '生成をクリックして数秒待つと、Nano Banana 2が鮮明な4K画像を出力します。結果を確認後、デザインやSNS、マーケティングにダウンロードしましょう。', es: 'Haga clic en generar y espere unos segundos. Descargue el resultado para diseño, redes sociales o marketing.' },
  } as Record<string, Record<Lang, string>>,
};

export type HowItWorksState = 'loading' | 'success' | 'empty' | 'error';

interface HowItWorksProps {
  lang: Lang;
  state?: HowItWorksState;
}

const StepCard = ({ step, index, lang }: { step: Step; index: number; lang: Lang }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.45, delay: index * 0.12 }}
    className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-primary/30"
  >
    <div className="relative h-[180px] sm:h-[240px] w-full overflow-hidden bg-secondary">
      <img src={step.image} alt={MOCK_DATA.stepLocales[step.titleKey][lang]} className="h-full w-full object-cover" loading="lazy" />
    </div>
    <div className="flex flex-1 flex-col p-4 sm:p-6">
      <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-bold leading-snug text-foreground">
        {MOCK_DATA.stepLocales[step.titleKey][lang]}
      </h3>
      <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
        {MOCK_DATA.stepLocales[step.descKey][lang]}
      </p>
    </div>
  </motion.div>
);

const HowItWorks = ({ lang, state = 'success' }: HowItWorksProps) => {
  if (state === 'loading') {
    return (
      <section className="py-12 sm:py-20">
        <div className="container mx-auto max-w-[1280px] px-4">
          <div className="mb-8 sm:mb-12 text-center">
            <div className="mx-auto h-10 w-2/3 animate-pulse rounded-lg bg-muted" />
            <div className="mx-auto mt-4 h-6 w-1/2 animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="h-[180px] sm:h-[240px] w-full animate-pulse bg-muted" />
                <div className="p-4 sm:p-6 space-y-3">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-16 w-full animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (state === 'error') {
    return (
      <section className="py-12 sm:py-20 text-center">
        <p className="text-destructive">Failed to load steps.</p>
      </section>
    );
  }

  if (state === 'empty') return null;

  return (
    <section className="py-12 sm:py-20">
      <div className="container mx-auto max-w-[1280px] px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12 text-center md:mb-14"
        >
          <h2 className="mb-3 sm:mb-4 font-display text-2xl font-extrabold text-foreground sm:text-3xl md:text-4xl lg:text-[44px] lg:leading-tight">
            {MOCK_DATA.sectionTitle[lang]}
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground lg:text-lg" style={{ lineHeight: 1.6 }}>
            {MOCK_DATA.sectionDesc[lang]}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_DATA.steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
