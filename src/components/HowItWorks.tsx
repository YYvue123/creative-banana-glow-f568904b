import { motion } from 'framer-motion';
import { Upload, MessageSquareText, Download } from 'lucide-react';
import { Lang } from '@/lib/locales';

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Upload,
    title: '第一步：上传图片（可选）',
    description:
      '如需优化或修改现有图片，请上传一张图片。Nano Banana 2 支持图像编辑和风格转换。您也可以跳过此步骤，直接通过文字描述生成全新图像。',
  },
  {
    icon: MessageSquareText,
    title: '第二步：输入提示词',
    description:
      '输入清晰的描述说明您想要创建的内容。Nano Banana 2 能理解详细指令，可在图像中添加对象、调整风格或渲染精准文字。',
  },
  {
    icon: Download,
    title: '第三步：生成并下载',
    description:
      '点击生成，等待几秒钟。Nano Banana 2 将输出清晰的 4K 图像。查看结果后，下载最终文件，用于设计、社交媒体发布或营销推广。',
  },
];

const StepCard = ({ step, index }: { step: Step; index: number }) => {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30"
    >
      {/* Illustration area */}
      <div className="mb-5 flex h-[240px] items-center justify-center rounded-xl bg-secondary">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <span className="text-sm font-semibold text-muted-foreground">
            Step {index + 1}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-lg font-bold leading-snug text-foreground">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {step.description}
      </p>
    </motion.div>
  );
};

const HowItWorks = ({ lang: _lang }: { lang: Lang }) => (
  <section className="bg-secondary/40 py-20">
    <div className="container mx-auto max-w-[1280px] px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center md:mb-14"
      >
        <h2 className="mb-4 font-display text-3xl font-extrabold text-foreground sm:text-4xl md:text-[44px] md:leading-tight">
          如何使用 Nano Banana 2 在线生成 4K 图像
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg" style={{ lineHeight: 1.6 }}>
          按照以下三个简单步骤，使用 Nano Banana 2 创建或编辑图像。这款高速 AI
          图像模型帮助您通过文字提示和可选的图片输入，将创意转化为清晰的 4K 图像。
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
          <StepCard key={i} step={step} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
