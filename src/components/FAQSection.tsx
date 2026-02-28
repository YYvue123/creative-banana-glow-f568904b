import { Lang, locales, faqData, faqLocales } from '@/lib/locales';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection = ({ lang }: { lang: Lang }) => (
  <section className="container mx-auto px-4 py-16">
    <h2 className="mb-8 font-display text-2xl font-bold text-foreground">{locales.faqTitle[lang]}</h2>
    <Accordion type="single" collapsible className="mx-auto max-w-3xl">
      {faqData.map((item, idx) => (
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

export default FAQSection;
