# README_FOR_CURSOR.md — Dev Handoff Document

> Auto-generated architecture reference for Rita project.  
> All UI components follow the **MOCK_DATA + State Machine + TODO Slot** pattern.

---

## Architecture Pattern

Every component follows this structure:

```
1. MOCK_DATA (top of file)    → All dynamic data as constants
2. State Machine type         → 'loading' | 'success' | 'empty' | 'error'
3. TODO Slots                 → async functions with // TODO comments
4. Component                  → Reads from MOCK_DATA, switches on state prop
```

To switch a component's state, pass the `state` prop:
```tsx
<HeroSection lang="zh" state="loading" />
```

---

## MOCK_DATA Structures

### `HeroSection.tsx`
| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.title(lang)` | `string` | Hero H1 title |
| `MOCK_DATA.subtitle(lang)` | `string` | Hero H2 subtitle |

### `MainExperience.tsx`
| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.scenarioImageMap` | `Record<string, string>` | Tab ID → image URL mapping for scenario previews |
| `MOCK_DATA.mockGenerateDelay` | `number` | Simulated API delay in ms (currently 3000) |

### `FeatureGrid.tsx`
| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.rows[]` | `Array<{ icon, nameKey, descKey, image, alt }>` | Feature card data (4 items) |

### `HowItWorks.tsx`
| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.sectionTitle` | `Record<Lang, string>` | Section heading |
| `MOCK_DATA.sectionDesc` | `Record<Lang, string>` | Section description |
| `MOCK_DATA.steps[]` | `Array<{ image, titleKey, descKey }>` | 3 step cards |
| `MOCK_DATA.stepLocales` | `Record<string, Record<Lang, string>>` | i18n strings for steps |

### `Testimonials.tsx`
| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.sectionTitle` | `Record<Lang, string>` | Section heading |
| `MOCK_DATA.sectionDesc` | `Record<Lang, string>` | Section description |
| `MOCK_DATA.testimonials[]` | `Array<{ rating, avatar, name, role, comment }>` | 6 testimonial cards |

### `FAQSection.tsx`
| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.items[]` | `Array<{ qKey, aKey }>` | FAQ items referencing `faqLocales` |

### `FooterSupport.tsx`
| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.title(lang)` | `string` | Footer heading |
| `MOCK_DATA.desc(lang)` | `string` | Footer description |
| `MOCK_DATA.ctaLabel(lang)` | `string` | Contact button label |
| `MOCK_DATA.copyright` | `string` | Copyright text |

---

## API Slots (TODO Locations)

| File | Function | Squad | Description |
|------|----------|-------|-------------|
| `MainExperience.tsx` | `handleGenerate()` | Generation Squad | `POST /api/generate` — replace mock setTimeout with real API call |
| `MainExperience.tsx` | `handleUploadToStorage()` | Storage Squad | Upload reference image to cloud storage |
| `FeatureGrid.tsx` | `handleTryNow()` | Navigation Squad | Navigate to generation page or scroll to top |
| `FooterSupport.tsx` | `handleContactSupport()` | Support Squad | Open live chat widget or contact form |

---

## State Machine Reference

All components accept an optional `state` prop:

| State | Behavior |
|-------|----------|
| `'loading'` | Shows skeleton/pulse animation placeholders |
| `'success'` | Renders content from MOCK_DATA (default) |
| `'empty'` | Returns `null` (hides section) |
| `'error'` | Shows error message in `text-destructive` |

### MainExperience uses a different state model:

| State | Behavior |
|-------|----------|
| `'idle'` | Default, waiting for user input |
| `'generating'` | Shows loading animation in preview area |
| `'success'` | Shows generated image |
| `'error'` | (To be implemented) Show generation error |

---

## i18n Data Source

All localized strings are in `src/lib/locales.ts`:
- `locales` — General UI strings
- `featureLocales` — Feature grid content
- `faqLocales` — FAQ Q&A pairs
- `modelLocales` — Model names & descriptions
- `scenarioLocales` — Scenario tab labels & alt texts

Supported languages: `zh` | `en` | `ko` | `ja` | `es`

---

## Quick Start for Devs

1. **Replace MOCK_DATA** → Swap constants with API response data
2. **Wire TODO functions** → Search `// TODO:` across components
3. **Control state** → Pass `state="loading"` while fetching, `state="error"` on failure
4. **Test states** → Each component renders correctly in all 4 states
