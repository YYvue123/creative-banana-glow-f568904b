import { locales } from '@/lib/locales';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export type FooterState = 'loading' | 'success' | 'empty' | 'error';

interface FooterSupportProps {
  state?: FooterState;
}

/** @slot Open support chat / contact form */
const handleContactSupport = async () => {
  // TODO: [Support Squad] Connect to API by Dev
};

const FooterSupport = ({ state = 'success' }: FooterSupportProps) => {
  if (state === 'loading') {
    return (
      <footer className="border-t border-border bg-secondary/50 py-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="mx-auto h-6 w-32 animate-pulse rounded bg-muted" />
          <div className="mx-auto h-4 w-64 animate-pulse rounded bg-muted" />
        </div>
      </footer>
    );
  }

  if (state === 'error' || state === 'empty') return null;

  return (
    <footer className="border-t border-border bg-secondary/50 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-2 font-display text-xl font-semibold text-foreground">
          {locales.supportTitle}
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">{locales.supportDesc}</p>
        <Button
          variant="outline"
          className="border-primary text-primary-foreground bg-primary hover:bg-primary/90"
          onClick={handleContactSupport}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          {locales.contactSupport}
        </Button>
        <p className="mt-8 text-xs text-muted-foreground">
          © 2026 Nano Banana 2. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSupport;
