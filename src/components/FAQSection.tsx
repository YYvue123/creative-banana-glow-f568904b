import { locales, faqData } from '@/lib/locales';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export type FAQState = 'loading' | 'success' | 'empty' | 'error';

interface FAQSectionProps {
  state?: FAQState;
}

const FAQSection = ({ state = 'success' }: FAQSectionProps) => {
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
      <h2 className="mb-8 text-center font-display text-2xl font-bold text-foreground">{locales.faqTitle}</h2>
      <Accordion type="single" collapsible className="mx-auto max-w-3xl">
        {faqData.map((item, idx) => (
          <AccordionItem key={idx} value={`faq-${idx}`}>
            <AccordionTrigger className="text-left font-body text-sm font-medium text-foreground">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
