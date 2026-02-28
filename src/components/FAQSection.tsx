import { Lang, locales, faqData, faqLocales } from '@/lib/locales';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/* ── MOCK DATA ── */
const MOCK_DATA = {
  /** FAQ items sourced from locales — replace with API response */
  items: faqData,
};

/* ── State Machine ── */
export type FAQState = 'loading' | 'success' | 'empty' | 'error';

interface FAQSectionProps {
  lang: Lang;
  state?: FAQState;
}

const FAQSection = ({ lang, state = 'success' }: FAQSectionProps) => {
  if (state === 'loading') {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto h-8 w-48 animate-pulse rounded-lg bg-muted mb-8" />
        <div className="mx-auto max-w-3xl space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 w-full animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </section>
    );
  }

  if (state === 'error') {
    return (
      <section className="container mx-auto px-4 py-16 text-center">
        <p className="text-destructive">Failed to load FAQ.</p>
      </section>
    );
  }

  if (state === 'empty') return null;

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="mb-8 text-center font-display text-2xl font-bold text-foreground">{locales.faqTitle[lang]}</h2>
      <Accordion type="single" collapsible className="mx-auto max-w-3xl">
        {MOCK_DATA.items.map((item, idx) => (
          <AccordionItem key={idx} value={`faq-${idx}`}>
            <AccordionTrigger className="text-left font-body text-sm font-medium text-foreground">
              {faqLocales[item.qKey][lang]}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {faqLocales[item.aKey][lang]}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
