import { Lang, LANG_LABELS } from '@/lib/locales';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

interface Props {
  lang: Lang;
  onChange: (lang: Lang) => void;
}

const LanguageSelector = ({ lang, onChange }: Props) => (
  <Select value={lang} onValueChange={(v) => onChange(v as Lang)}>
    <SelectTrigger className="w-[140px] border-border bg-background text-foreground">
      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
        <SelectItem key={l} value={l}>{LANG_LABELS[l]}</SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default LanguageSelector;
