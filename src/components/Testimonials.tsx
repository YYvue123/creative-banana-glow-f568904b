import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Lang } from '@/lib/locales';

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

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
      />
    ))}
  </div>
);

const TestimonialCard = ({ item, index }: { item: Testimonial; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30"
  >
    <StarRating rating={item.rating} />
    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
      "{item.comment}"
    </p>
    <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
      <img
        src={item.avatar}
        alt={item.name}
        className="h-10 w-10 rounded-full object-cover"
        loading="lazy"
      />
      <div>
        <p className="text-sm font-semibold text-foreground">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.role}</p>
      </div>
    </div>
  </motion.div>
);

const Testimonials = ({ lang: _lang }: { lang: Lang }) => (
  <section className="py-20">
    <div className="container mx-auto max-w-[1280px] px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center md:mb-14"
      >
        <h2 className="mb-4 font-display text-3xl font-extrabold text-foreground sm:text-4xl md:text-[44px] md:leading-tight">
          用户怎么说
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          来自不同行业的创作者正在使用 Nano Banana 2 提升他们的视觉创作效率
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, i) => (
          <TestimonialCard key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
