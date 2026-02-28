import { useRef, useState } from 'react';
import { Lang, locales, modelConfigs, modelLocales, scenarios, scenarioLocales, type ModelConfig } from '@/lib/locales';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Sparkles, Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';

// Scenario images
import sceneSearch1 from '@/assets/scene-search-1.jpg';
import sceneSearch2 from '@/assets/scene-search-2.jpg';
import sceneMulti1 from '@/assets/scene-multiangle-1.jpg';
import sceneMulti2 from '@/assets/scene-multiangle-2.jpg';
import sceneText1 from '@/assets/scene-text-1.jpg';
import sceneText2 from '@/assets/scene-text-2.jpg';
import sceneConsist1 from '@/assets/scene-consistency-1.jpg';
import sceneConsist2 from '@/assets/scene-consistency-2.jpg';

const scenarioImageMap: Record<string, string[]> = {
  search: [sceneSearch1, sceneSearch2],
  multiangle: [sceneMulti1, sceneMulti2],
  text: [sceneText1, sceneText2],
  consistency: [sceneConsist1, sceneConsist2],
};

const MainExperience = ({ lang }: { lang: Lang }) => {
  const [selectedModelId, setSelectedModelId] = useState(modelConfigs[0].id);
  const [refImage, setRefImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [fieldValues, setFieldValues] = useState<Record<string, string | number>>({});
  const [selectedSceneImg, setSelectedSceneImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentModel: ModelConfig = modelConfigs.find((m) => m.id === selectedModelId) || modelConfigs[0];

  const getFieldValue = (labelKey: string, defaultVal?: string | number) => {
    return fieldValues[labelKey] ?? defaultVal ?? '';
  };

  const setFieldValue = (labelKey: string, val: string | number) => {
    setFieldValues((prev) => ({ ...prev, [labelKey]: val }));
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRefImage(url);
    }
  };

  const handleSceneClick = (scenarioId: string, imgIdx: number) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (!scenario) return;
    const imgData = scenario.images[imgIdx];
    const imgSrc = scenarioImageMap[scenarioId]?.[imgIdx];
    if (imgSrc) {
      setRefImage(imgSrc);
      setSelectedSceneImg(imgSrc);
    }
    if (imgData) {
      setPrompt(scenarioLocales[imgData.promptKey]?.[lang] || '');
    }
  };

  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left: Config Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm lg:w-[35%]"
        >
          {/* Model Selector */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {locales.modelLabel[lang]}
            </label>
            <Select value={selectedModelId} onValueChange={setSelectedModelId}>
              <SelectTrigger className="w-full border-border bg-background">
                <SelectValue>
                  {modelLocales[currentModel.nameKey][lang]}
                </SelectValue>
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
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div
                    onClick={handleFileUpload}
                    className="relative flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-secondary transition-colors hover:bg-secondary/80"
                  >
                    {refImage ? (
                      <>
                        <img src={refImage} alt="Reference image preview" className="h-full w-full object-cover" />
                        <button
                          onClick={(e) => { e.stopPropagation(); setRefImage(null); setSelectedSceneImg(null); }}
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

          {/* Fixed: Prompt */}
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

          {/* Fixed: Generate Button */}
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Sparkles className="mr-2 h-4 w-4" />
            {locales.generate[lang]}
          </Button>
        </motion.div>

        {/* Right: Scenario Showcase */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-[65%]"
        >
          <Tabs defaultValue={scenarios[0].id} className="w-full">
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

            {scenarios.map((s) => (
              <TabsContent key={s.id} value={s.id}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {s.images.map((imgData, imgIdx) => {
                    const imgSrc = scenarioImageMap[s.id]?.[imgIdx];
                    if (!imgSrc) return null;
                    return (
                      <button
                        key={imgIdx}
                        onClick={() => handleSceneClick(s.id, imgIdx)}
                        className={`overflow-hidden rounded-xl transition-all duration-200 ${
                          selectedSceneImg === imgSrc
                            ? 'ring-2 ring-primary shadow-md'
                            : 'ring-1 ring-border hover:ring-primary/50'
                        }`}
                      >
                        <img
                          src={imgSrc}
                          alt={scenarioLocales[imgData.altKey]?.[lang] || ''}
                          className="h-48 w-full object-cover sm:h-56"
                          loading="lazy"
                        />
                      </button>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default MainExperience;
