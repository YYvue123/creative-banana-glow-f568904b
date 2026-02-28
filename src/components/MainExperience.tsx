import { useRef, useState, useCallback } from 'react';
import { Lang, locales, modelConfigs, modelLocales, scenarios, scenarioLocales, type ModelConfig } from '@/lib/locales';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Sparkles, Upload, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Scenario images (one per scenario)
import sceneSearch1 from '@/assets/scene-search-1.jpg';
import sceneMulti1 from '@/assets/scene-multiangle-1.jpg';
import sceneText1 from '@/assets/scene-text-1.jpg';
import sceneConsist1 from '@/assets/scene-consistency-1.jpg';

const scenarioImageMap: Record<string, string> = {
  search: sceneSearch1,
  multiangle: sceneMulti1,
  text: sceneText1,
  consistency: sceneConsist1,
};

const MainExperience = ({ lang }: { lang: Lang }) => {
  const [selectedModelId, setSelectedModelId] = useState(modelConfigs[0].id);
  const [refImage, setRefImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [fieldValues, setFieldValues] = useState<Record<string, string | number>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(scenarios[0].id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentModel: ModelConfig = modelConfigs.find((m) => m.id === selectedModelId) || modelConfigs[0];

  const getFieldValue = (labelKey: string, defaultVal?: string | number) => {
    return fieldValues[labelKey] ?? defaultVal ?? '';
  };

  const setFieldValue = (labelKey: string, val: string | number) => {
    setFieldValues((prev) => ({ ...prev, [labelKey]: val }));
  };

  const handleFileUpload = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRefImage(url);
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setGeneratedImage(null);
    setIsGenerating(false);
  };

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    setGeneratedImage(null);
    // Simulate generation (3s)
    setTimeout(() => {
      // Use the current scenario image as "generated" result for demo
      setGeneratedImage(scenarioImageMap[activeTab] || sceneSearch1);
      setIsGenerating(false);
    }, 3000);
  }, [activeTab]);

  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Left: Config Panel — sticky */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-20 lg:w-[35%] lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto"
        >
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

          {/* Dynamic fields from model config */}
          {currentModel.fields.map((field) => {
            if (field.type === 'upload') {
              return (
                <div key={field.labelKey}>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    {locales[field.labelKey]?.[lang] || field.labelKey}
                  </label>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  <div
                    onClick={handleFileUpload}
                    className="relative flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-secondary transition-colors hover:bg-secondary/80"
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
                <div key={field.labelKey}>
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
                        className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
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
                <div key={field.labelKey}>
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

          {/* Generate Button */}
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            {isGenerating ? locales.generating[lang] : locales.generate[lang]}
          </Button>
        </motion.div>

        {/* Right: Scenario Showcase — single 16:9 image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-[65%] flex flex-col justify-center"
        >
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            {!isGenerating && !generatedImage && (
              <TabsList className="mb-4 flex w-full flex-wrap gap-1 bg-secondary">
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
              const imgSrc = scenarioImageMap[s.id];
              const altText = scenarioLocales[s.images[0]?.altKey]?.[lang] || '';
              return (
                <TabsContent key={s.id} value={s.id} className="mt-0">
                  <div className="relative w-full overflow-hidden rounded-xl bg-secondary" style={{ aspectRatio: '16/9' }}>
                    <AnimatePresence mode="wait">
                      {isGenerating && activeTab === s.id ? (
                        /* Generating placeholder */
                        <motion.div
                          key="generating"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-secondary"
                        >
                          {/* Shimmer skeleton */}
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
                        /* Generated result */
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
                        /* Default scenario image */
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
      </div>
    </section>
  );
};

export default MainExperience;
