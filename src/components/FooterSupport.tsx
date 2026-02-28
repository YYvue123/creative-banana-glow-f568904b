import { Lang, locales } from '@/lib/locales';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const FooterSupport = ({ lang }: { lang: Lang }) => (
  <footer className="border-t border-border bg-secondary/50 py-12">
    <div className="container mx-auto px-4 text-center">
      <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
        {locales.supportTitle[lang]}
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">{locales.supportDesc[lang]}</p>
      <Button variant="outline" className="border-primary text-primary-foreground bg-primary hover:bg-primary/90">
        <MessageCircle className="mr-2 h-4 w-4" />
        {locales.contactSupport[lang]}
      </Button>
      <p className="mt-8 text-xs text-muted-foreground">
        © 2026 Nano Banana 2. All rights reserved.
      </p>
    </div>
  </footer>
);

export default FooterSupport;
