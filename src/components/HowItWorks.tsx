import { motion } from 'framer-motion';

import stepUpload from '@/assets/step-upload.jpg';
import stepPrompt from '@/assets/step-prompt.jpg';
import stepGenerate from '@/assets/step-generate.jpg';

interface Step {
  image: string;
  title: string;
  desc: string;
}

const MOCK_DATA = {
  sectionTitle: '如何使用 Nano Banana 2 在线生成 4K 图像',
  sectionDesc: '按照以下三个简单步骤，使用 Nano Banana 2 创建或编辑图像。这款高速 AI 图像模型帮助您通过文字提示和可选的图片输入，将创意转化为清晰的 4K 图像。',
  steps: [
    { image: stepUpload, title: '第一步：上传图片（可选）', desc: '如需优化或修改现有图片，请上传一张图片。Nano Banana 2 支持图像编辑和风格转换。您也可以跳过此步骤，直接通过文字描述生成全新图像。' },
    { image: stepPrompt, title: '第二步：输入提示词', desc: '输入清晰的描述说明您想要创建的内容。Nano Banana 2 能理解详细指令，可在图像中添加对象、调整风格或渲染精准文字。' },
    { image: stepGenerate, title: '第三步：生成并下载', desc: '点击生成，等待几秒钟。Nano Banana 2 将输出清晰的 4K 图像。查看结果后，下载最终文件，用于设计、社交媒体发布或营销推广。' },
  ] as Step[],
};

export type HowItWorksState = 'loading' | 'success' | 'empty' | 'error';

interface HowItWorksProps {
  state?: HowItWorksState;
}

const StepCard = ({ step, index }: { step: Step; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.45, delay: index * 0.12 }}
    className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-primary/30"
  >
    <div className="relative h-[180px] sm:h-[240px] w-full overflow-hidden bg-secondary">
      <img src={step.image} alt={step.title} className="h-full w-full object-cover" loading="lazy" />
    </div>
    <div className="flex flex-1 flex-col p-4 sm:p-6">
      <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-bold leading-snug text-foreground">
        {step.title}
      </h3>
      <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
        {step.desc}
      </p>
    </div>
  </motion.div>
);

const HowItWorks = ({ state = 'success' }: HowItWorksProps) => {
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
            {MOCK_DATA.sectionTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground lg:text-lg" style={{ lineHeight: 1.6 }}>
            {MOCK_DATA.sectionDesc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_DATA.steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
