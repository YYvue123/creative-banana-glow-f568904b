import { useRef, useState, useCallback, createContext, useContext } from 'react';
import { Lang, locales, modelConfigs, modelLocales, scenarios, scenarioLocales, type ModelConfig } from '@/lib/locales';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Sparkles, Upload, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import sceneSearch1 from '@/assets/scene-search-1.jpg';
import sceneMulti1 from '@/assets/scene-multiangle-1.jpg';
import sceneText1 from '@/assets/scene-text-1.jpg';
import sceneConsist1 from '@/assets/scene-consistency-1.jpg';

/* ── MOCK DATA ── */
const MOCK_DATA = {
  scenarioImageMap: {
    search: sceneSearch1,
    multiangle: sceneMulti1,
    text: sceneText1,
    consistency: sceneConsist1,
  } as Record<string, string>,

  /** Simulated generation delay (ms) */
  mockGenerateDelay: 3000,
};

/* ── State Machine ── */
export type ExperienceUIState = 'idle' | 'generating' | 'success' | 'error';

/* ── Shared state context ── */
interface ExperienceState {
  selectedModelId: string;
  setSelectedModelId: (id: string) => void;
  refImage: string | null;
  setRefImage: (img: string | null) => void;
  prompt: string;
  setPrompt: (p: string) => void;
  fieldValues: Record<string, string | number>;
  setFieldValue: (key: string, val: string | number) => void;
  getFieldValue: (key: string, defaultVal?: string | number) => string | number;
  uiState: ExperienceUIState;
  generatedImage: string | null;
  activeTab: string;
  handleTabChange: (tab: string) => void;
  handleGenerate: () => void;
  handleFileUpload: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  currentModel: ModelConfig;
  lang: Lang;
}

const ExperienceContext = createContext<ExperienceState | null>(null);

export const ExperienceProvider = ({ lang, children }: { lang: Lang; children: React.ReactNode }) => {
  const [selectedModelId, setSelectedModelIdRaw] = useState(modelConfigs[0].id);
  const setSelectedModelId = (id: string) => {
    setSelectedModelIdRaw(id);
    const model = modelConfigs.find((m) => m.id === id);
    if (model) {
      const defaults: Record<string, string | number> = {};
      model.fields.forEach((field) => {
        if (field.default !== undefined) {
          defaults[field.labelKey] = field.default;
        } else if (field.options?.length) {
          defaults[field.labelKey] = field.options[0];
        }
      });
      setFieldValues(defaults);
    }
  };
  const [refImage, setRefImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [fieldValues, setFieldValues] = useState<Record<string, string | number>>({});
  const [uiState, setUiState] = useState<ExperienceUIState>('idle');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(scenarios[0].id);
  const fileInputRef = useRef<HTMLInputElement>(null!);

  const currentModel = modelConfigs.find((m) => m.id === selectedModelId) || modelConfigs[0];

  const getFieldValue = (key: string, defaultVal?: string | number) => fieldValues[key] ?? defaultVal ?? '';
  const setFieldValue = (key: string, val: string | number) => setFieldValues((prev) => ({ ...prev, [key]: val }));

  const handleFileUpload = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setRefImage(URL.createObjectURL(file));
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setGeneratedImage(null);
    setUiState('idle');
  };

  const handleGenerate = useCallback(async () => {
    setUiState('generating');
    setGeneratedImage(null);

    try {
      const aspectRatio = String(fieldValues['aspectRatio'] || '1:1');
      const resolution = String(fieldValues['resolution'] || '2K');

      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: {
          prompt: prompt || scenarioLocales[`scene_${activeTab}_1_prompt`]?.zh || 'Generate a beautiful 4K image',
          refImage: refImage,
          aspectRatio,
          resolution,
        },
      });

      if (error) {
        console.error('Edge function error:', error);
        toast.error('生成失败，请稍后重试');
        setUiState('idle');
        return;
      }

      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setUiState('success');
      } else {
        // Fallback to scenario image if no image returned
        console.warn('No image in response, using fallback. Response:', data);
        toast.info('模型未返回图片，已使用示例图片');
        setGeneratedImage(MOCK_DATA.scenarioImageMap[activeTab] || sceneSearch1);
        setUiState('success');
      }
    } catch (err) {
      console.error('Generate error:', err);
      toast.error('生成请求失败');
      setUiState('idle');
    }
  }, [activeTab, prompt, refImage]);

  return (
    <ExperienceContext.Provider value={{
      selectedModelId, setSelectedModelId, refImage, setRefImage, prompt, setPrompt,
      fieldValues, setFieldValue, getFieldValue, uiState, generatedImage,
      activeTab, handleTabChange, handleGenerate, handleFileUpload, handleFileChange,
      fileInputRef, currentModel, lang,
    }}>
      {children}
    </ExperienceContext.Provider>
  );
};

const useExperience = () => {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error('useExperience must be used within ExperienceProvider');
  return ctx;
};

/* ── Config Panel (left side) ── */
export const ConfigPanel = () => {
  const {
    lang, selectedModelId, setSelectedModelId, currentModel, refImage, setRefImage,
    getFieldValue, setFieldValue, prompt, setPrompt, uiState, handleGenerate,
    handleFileUpload, handleFileChange, fileInputRef,
  } = useExperience();

  const isGenerating = uiState === 'generating';

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleFieldFocus = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  /** @slot Upload reference image to storage */
  const handleUploadToStorage = async (_file: File) => {
    // TODO: [Storage Squad] Connect to API by Dev
    // Upload file to cloud storage, return URL
  };
  void handleUploadToStorage;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex flex-col rounded-xl border border-border bg-card shadow-sm overflow-hidden"
      style={{ maxHeight: 'calc(100vh - 6rem)' }}
    >
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto scroll-smooth" style={{ padding: '20px', paddingBottom: '0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Model Selector */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            {locales.modelLabel[lang]}
          </label>
          <Select value={selectedModelId} onValueChange={setSelectedModelId}>
            <SelectTrigger className="w-full border-border bg-background">
              <span className="truncate">{modelLocales[currentModel.nameKey][lang]}</span>
            </SelectTrigger>
            <SelectContent align="start">
              {modelConfigs.map((m) => (
                <SelectItem key={m.id} value={m.id} className="items-start">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium">{modelLocales[m.nameKey][lang]}</span>
                    <span className="text-xs text-muted-foreground">{modelLocales[m.descKey][lang]}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dynamic fields */}
        {currentModel.fields.map((field) => {
          if (field.type === 'upload') {
            return (
              <div key={field.labelKey} onClick={handleFieldFocus}>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  {locales[field.labelKey]?.[lang] || field.labelKey}
                </label>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                <div
                  onClick={handleFileUpload}
                  className="relative flex h-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-secondary transition-colors hover:bg-secondary/80"
                >
                  {refImage ? (
                    <>
                      <img src={refImage} alt="Reference" className="h-full w-full object-cover" />
                      <button
                        onClick={(e) => { e.stopPropagation(); setRefImage(null); }}
                        className="absolute right-2 top-2 rounded-full bg-foreground/70 p-1 text-background transition-opacity hover:opacity-80"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Upload className="h-6 w-6" />
                      <span className="text-xs">{locales.uploadOrSelect[lang]}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          if (field.type === 'radio' && field.options) {
            return (
              <div key={field.labelKey} onClick={handleFieldFocus}>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  {locales[field.labelKey]?.[lang] || field.labelKey}
                </label>
                <RadioGroup
                  value={String(getFieldValue(field.labelKey, field.default))}
                  onValueChange={(v) => setFieldValue(field.labelKey, v)}
                  className="flex flex-wrap gap-2 mt-1.5"
                >
                  {field.options.map((opt) => (
                    <label
                      key={opt}
                      className={`flex cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors ${
                        String(getFieldValue(field.labelKey, field.default)) === opt
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value={opt} className="sr-only" />
                      {opt}
                    </label>
                  ))}
                </RadioGroup>
              </div>
            );
          }

          if (field.type === 'select' && field.options) {
            return (
              <div key={field.labelKey} onClick={handleFieldFocus}>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  {locales[field.labelKey]?.[lang] || field.labelKey}
                </label>
                <Select
                  value={String(getFieldValue(field.labelKey, field.default))}
                  onValueChange={(v) => setFieldValue(field.labelKey, v)}
                >
                  <SelectTrigger className="w-full border-border bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }

          return null;
        })}

        {/* Prompt */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{locales.prompt[lang]}</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="resize-none border-border bg-background text-foreground placeholder:text-muted-foreground"
            placeholder={locales.promptPlaceholder[lang]}
          />
        </div>
      </div>

      {/* Generate Button - always visible at bottom */}
      <div className="border-t border-border" style={{ padding: '20px' }}>
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          {isGenerating ? locales.generating[lang] : locales.generate[lang]}
        </Button>
      </div>
    </motion.div>
  );
};

/* ── Scenario Showcase (right side) ── */
export const ScenarioShowcase = () => {
  const { lang, activeTab, handleTabChange, uiState, generatedImage } = useExperience();

  const isGenerating = uiState === 'generating';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="w-full flex flex-col items-center justify-center"
    >
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        {!isGenerating && !generatedImage && (
          <TabsList className="flex w-full flex-wrap gap-1 bg-secondary" style={{ marginBottom: 'clamp(0.5rem, 1vh, 1rem)' }}>
            {scenarios.map((s) => (
              <TabsTrigger
                key={s.id}
                value={s.id}
                className="flex-1 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {scenarioLocales[s.nameKey][lang]}
              </TabsTrigger>
            ))}
          </TabsList>
        )}

        {scenarios.map((s) => {
          const imgSrc = MOCK_DATA.scenarioImageMap[s.id];
          const altText = scenarioLocales[s.images[0]?.altKey]?.[lang] || '';
          return (
            <TabsContent key={s.id} value={s.id} className="mt-0">
              <div className="relative w-full overflow-hidden rounded-xl bg-secondary" style={{ aspectRatio: '16/9' }}>
                <AnimatePresence mode="wait">
                  {isGenerating && activeTab === s.id ? (
                    <motion.div
                      key="generating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-secondary"
                    >
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-secondary via-muted to-secondary" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                        />
                      </div>
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">
                          {locales.generating[lang]}
                        </span>
                      </div>
                    </motion.div>
                  ) : generatedImage && activeTab === s.id ? (
                    <motion.img
                      key="generated"
                      src={generatedImage}
                      alt="Generated result"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <motion.img
                      key="default"
                      src={imgSrc}
                      alt={altText}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}
                </AnimatePresence>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </motion.div>
  );
};

/* ── Default export kept for backward compat ── */
const MainExperience = ({ lang }: { lang: Lang }) => (
  <ExperienceProvider lang={lang}>
    <section className="container mx-auto px-4 pb-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="w-full lg:w-[35%]">
          <ConfigPanel />
        </div>
        <div className="w-full lg:w-[65%]">
          <ScenarioShowcase />
        </div>
      </div>
    </section>
  </ExperienceProvider>
);

export default MainExperience;
