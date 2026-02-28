# README_FOR_CURSOR.md — Dev Handoff Document

> Auto-generated architecture reference for Nano Banana 2 project.  
> All UI components follow the **MOCK_DATA + State Machine + TODO Slot** pattern.

---

## 目录

1. [架构模式](#架构模式)
2. [Mock 数据结构总览](#mock-数据结构总览)
3. [待接入 API 插槽](#待接入-api-插槽)
4. [Edge Function（已接入）](#edge-function已接入)
5. [状态机规范](#状态机规范)
6. [i18n 数据源](#i18n-数据源)
7. [快速替换指南](#快速替换指南)

---

## 架构模式

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

## Mock 数据结构总览

每个组件顶部均定义了 `MOCK_DATA` 常量，包含该组件的静态展示数据。接入真实 API 后，用接口返回值替换即可。

### 1. `src/components/HeroSection.tsx`

| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.title(lang)` | `string` | Hero H1 主标题 |
| `MOCK_DATA.subtitle(lang)` | `string` | Hero H2 副标题 |

**数据来源**：`src/lib/locales.ts` → `heroTitle` / `heroSubtitle`

---

### 2. `src/components/MainExperience.tsx`

| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.scenarioImageMap` | `Record<string, string>` | Tab ID → 场景示例图映射（本地 import） |
| `MOCK_DATA.mockGenerateDelay` | `number` | 模拟生成延迟 ms（已弃用，当前使用真实 Edge Function） |

**关联配置数据**（定义在 `src/lib/locales.ts`）：

| 数据 | 说明 |
|------|------|
| `modelConfigs: ModelConfig[]` | 模型列表，含 id、字段配置（upload/radio/select）、默认值 |
| `modelLocales` | 模型名称 & 描述的多语言文案 |
| `scenarios: Scenario[]` | 场景 Tab 列表（search / multiangle / text / consistency） |
| `scenarioLocales` | 场景名称、图片 alt、示例 prompt 的多语言文案 |

---

### 3. `src/components/FeatureGrid.tsx`

| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.rows[]` | `Array<{ icon, nameKey, descKey, image, alt }>` | 功能特性卡片（4 项） |

**数据来源**：`featureLocales`（`src/lib/locales.ts`）提供多语言名称和描述。

---

### 4. `src/components/HowItWorks.tsx`

| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.sectionTitle` | `Record<Lang, string>` | 区块标题（多语言） |
| `MOCK_DATA.sectionDesc` | `Record<Lang, string>` | 区块描述（多语言） |
| `MOCK_DATA.steps[]` | `Array<{ image, titleKey, descKey }>` | 3 个步骤卡片 |
| `MOCK_DATA.stepLocales` | `Record<string, Record<Lang, string>>` | 步骤标题和描述的多语言文案 |

---

### 5. `src/components/Testimonials.tsx`

| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.sectionTitle` | `Record<Lang, string>` | 区块标题 |
| `MOCK_DATA.sectionDesc` | `Record<Lang, string>` | 区块描述 |
| `MOCK_DATA.testimonials[]` | `Array<{ rating, avatar, name, role, comment }>` | 6 条用户评价 |

> ⚠️ 头像使用 `i.pravatar.cc` 占位图，上线前需替换为真实用户头像或 CDN 资源。

---

### 6. `src/components/FAQSection.tsx`

| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.items[]` | `Array<{ qKey, aKey }>` | FAQ 条目，引用 `faqLocales` 多语言文案 |

**数据来源**：`src/lib/locales.ts` → `faqData` + `faqLocales`

---

### 7. `src/components/FooterSupport.tsx`

> ⚠️ 该组件已从页面移除（`Index.tsx` 中不再引用），但文件仍保留。

| Field | Type | Description |
|-------|------|-------------|
| `MOCK_DATA.title(lang)` | `string` | Footer 标题 |
| `MOCK_DATA.desc(lang)` | `string` | Footer 描述 |
| `MOCK_DATA.ctaLabel(lang)` | `string` | 联系按钮文案 |
| `MOCK_DATA.copyright` | `string` | 版权信息 `© 2026 Nano Banana 2` |

---

## 待接入 API 插槽

所有插槽均以 `// TODO: [Squad Name] Connect to API by Dev` 注释标记。

**全局搜索**：`TODO:.*Connect to API`

| # | 文件 | 函数 | Squad | 说明 |
|---|------|------|-------|------|
| 1 | `src/components/MainExperience.tsx` | `handleUploadToStorage()` | Storage Squad | 上传参考图片到云存储，返回 URL。当前使用 `URL.createObjectURL` 本地预览。 |
| 2 | `src/components/FeatureGrid.tsx` | `handleTryNow()` | Navigation Squad | "立即使用"按钮 → 导航到生成页或滚动到页面顶部。 |
| 3 | `src/components/FooterSupport.tsx` | `handleContactSupport()` | Support Squad | 打开在线客服聊天或跳转联系表单。（组件已从页面移除） |

---

## Edge Function（已接入）

### `supabase/functions/generate-image/index.ts`

| 项目 | 详情 |
|------|------|
| **端点** | `POST /generate-image` |
| **依赖密钥** | `YUNWU_API_KEY`（环境变量，已配置） |
| **外部 API** | `https://yunwu.ai/v1/chat/completions`（模型：`gemini-3-pro-image-preview`） |
| **请求体** | `{ prompt: string, refImage?: string, aspectRatio?: string, resolution?: string }` |
| **响应体** | `{ imageUrl: string \| null, text: string \| null, raw: object }` |
| **错误处理** | 429 → 频率限制提示；500 → 模型调用失败 |

**前端调用位置**：`MainExperience.tsx` → `handleGenerate()` 使用 `supabase.functions.invoke('generate-image', { body })`

**用户反馈**：
- 成功 → 绿色 toast：「您的图像已经准备好，可以来查看结果啦」
- 失败 → 红色 toast：「非常抱歉，本次生图没有成功，您可以点击生成按钮重试」+ 错误兜底 UI 含重试按钮

---

## 状态机规范

### 通用组件状态（`state` prop）

| State | Behavior |
|-------|----------|
| `'loading'` | 骨架屏动画占位 |
| `'success'` | 正常渲染 MOCK_DATA 内容（默认值） |
| `'empty'` | 隐藏组件（`return null`） |
| `'error'` | 显示 `text-destructive` 错误提示 |

**支持状态机的组件**：
- `HeroSection` → `HeroState`
- `FeatureGrid` → `FeatureGridState`
- `HowItWorks` → `HowItWorksState`
- `Testimonials` → `TestimonialsState`
- `FAQSection` → `FAQState`
- `FooterSupport` → `FooterState`

### MainExperience 专用状态（`ExperienceUIState`）

| State | Behavior |
|-------|----------|
| `'idle'` | 默认状态，等待用户输入 |
| `'generating'` | 预览区显示加载动画 |
| `'success'` | 显示生成的图片（支持放大、下载、复制） |
| `'error'` | 显示失败兜底 UI + 重试按钮 |

---

## i18n 数据源

所有多语言字符串集中在 `src/lib/locales.ts`：

| 导出 | 说明 |
|------|------|
| `locales` | 通用 UI 文案（按钮、标签、占位符等） |
| `featureLocales` | 功能特性名称 & 描述 |
| `faqData` + `faqLocales` | FAQ 问答对 |
| `modelConfigs` + `modelLocales` | 模型配置 & 名称描述 |
| `scenarios` + `scenarioLocales` | 场景 Tab 标签 & 示例 prompt |

**支持语言**：`zh`（简体中文）| `en` | `ko` | `ja` | `es`

---

## 快速替换指南

1. **搜索所有 Mock 数据** → 全局搜索 `MOCK_DATA`
2. **搜索所有 API 插槽** → 全局搜索 `TODO:.*Connect to API`
3. **替换步骤**：
   - 创建 API service 层（建议 `src/services/`）
   - 用 `@tanstack/react-query` 的 `useQuery` / `useMutation` 替换静态数据
   - 利用已有的 `state` prop 控制 `loading` / `error` / `empty` 状态
   - 删除组件顶部的 `MOCK_DATA` 常量
4. **测试状态** → 每个组件均可通过 `state` prop 单独验证 4 种状态的渲染效果
