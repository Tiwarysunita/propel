# Propel — Career Accelerator

## What this is
A web and mobile app that helps users tailor CVs to job descriptions using a dual-source CV
strategy. It excavates skills from a library of past CVs that may be missing from the current
one, scores ATS compatibility, identifies true skill gaps, generates personalised prep plans
with study resources, and runs mock interviews.

## Core concept: dual-source CV logic
- **Primary CV** — one file chosen by the user, used as the structural base for tailored output
- **CV Library** — all other CVs in the connected folder, scanned to excavate skills and
  achievements that exist in the user's history but are absent from the primary CV
- A keyword found in the library but not the primary CV is RECOVERED — not a gap
- A keyword found in neither is a TRUE GAP — only these require actual learning/prep

## Integrity principles — non-negotiable

### What Propel will never do
- Invent, fabricate, or imply experience the user does not have
- Add a skill, tool, or achievement that appears in neither the primary CV nor any library CV
- Inflate scope — e.g. change "contributed to" to "led" without evidence
- Manufacture metrics — no numbers that aren't already in the user's CVs
- Use weasel phrases that imply experience indirectly ("exposure to", "familiar with")
  unless that phrasing was already in the user's own CV

### What Propel actively does
- **Lateral leverage** — recognise when existing experience is directly transferable to the
  target role even if the terminology differs
- **Vocabulary translation** — update terminology to match current JD language as long as
  the underlying experience is the same thing
- **CXO register** — outcomes over activities, scale always explicit, no personal pronouns

### Lateral leverage type in the data model
```typescript
type LateralBridge = {
  tailoredBullet: string
  sourceExperience: string
  bridgeRationale: string
  requiresUserConfirmation: boolean
  userApproved?: boolean
}
```
`TailoredResult` must include a `lateralBridges: LateralBridge[]` array.
The UI must show these to the user for explicit approval before the CV is exported.

### System prompt prefix for all CV-related Claude calls
```
You are Propel, a career accelerator for senior leaders and CXO-level professionals.
Your output will be used in real job applications. Integrity is the foundation of this product.

STRICT RULES:
1. Never invent experience, skills, metrics, or achievements not present in the provided CV texts.
2. Never inflate scope or seniority beyond what the evidence supports.
3. You MAY identify lateral bridges — label explicitly, state source + rationale, set requiresUserConfirmation: true
4. Write exclusively in CXO register: outcomes over activities, scale always explicit, no personal pronouns, no "responsible for".
5. If a required skill or experience is absent from ALL provided CVs, classify it as a true gap.
```

## Career level system

```typescript
type CareerLevel =
  | 'entry'       // 0–3 years, graduate / junior
  | 'mid'         // 3–8 years, individual contributor, specialist
  | 'director'    // 8–15 years, people manager, department head, VP
  | 'cxo'         // 15+ years, C-suite, MD, Group Head, President, Partner
```

### Level selector UI
Displayed as four labelled cards (not a dropdown):
```
[ Entry level ]     [ Mid level ]     [ Director / VP ]     [ CXO / MD ]
  0–3 years           3–8 years          8–15 years           15+ years
```

## Platform strategy
- **Web**: Next.js PWA — works in browser, installable on Android
- **Mobile**: Capacitor wrapper → Android APK / iOS
- **Folder access on web**: HTML folder picker using `webkitdirectory`
- **Folder access on mobile**: `@capacitor/filesystem` plugin

## Tech stack
- **Framework**: Next.js 14 (App Router), TypeScript
- **Styling**: Tailwind CSS
- **AI**: Claude via OpenRouter — model `anthropic/claude-sonnet-4-5`, using `@anthropic-ai/sdk` pointed at `https://openrouter.ai/api/v1`
- **File parsing**: `pdf-parse` (PDFs), `mammoth` (DOCX) — server-side only
- **CV export**: `docx` npm library — tailored CV downloaded as .docx
- **Persistence**: localStorage (dev) → Supabase (future). All reads/writes go through `lib/storage.ts` so the swap is a one-file change.
- **PWA**: `next-pwa` — service worker, web manifest, offline support
- **Mobile**: Capacitor — Android and iOS native wrapper
- **Package manager**: npm

## Project structure
```
propel/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── api/
│       ├── parse-cv/route.ts
│       ├── tailor/route.ts
│       ├── prep-plan/route.ts
│       ├── mock-interview/route.ts
│       └── export-docx/route.ts
├── components/
│   ├── CVVault/CVVault.tsx
│   ├── Tailor/
│   │   ├── JDInput.tsx
│   │   ├── ATSScore.tsx
│   │   ├── KeywordMap.tsx
│   │   ├── ExcavationPanel.tsx
│   │   ├── LateralBridgePanel.tsx
│   │   └── TailoredCVPreview.tsx
│   ├── GapAnalysis/GapAnalysis.tsx
│   ├── PrepPlan/PrepPlan.tsx
│   ├── MockInterview/MockInterview.tsx
│   ├── ApplicationTracker/ApplicationTracker.tsx
│   └── UI/index.tsx
├── lib/
│   ├── parseCV.ts
│   ├── anthropic.ts              # Claude via OpenRouter
│   ├── exportDocx.ts
│   ├── storage.ts                # Persistence wrapper — localStorage now, Supabase later
│   └── platform.ts
└── types/index.ts
```

## Persistence layer — lib/storage.ts

`lib/storage.ts` is the single interface for all application persistence.
Current implementation uses localStorage under key `propel_applications`.
Future: swap to Supabase by rewriting only this file — all call sites stay the same.

```typescript
saveApplication(application: JobApplication): void
getApplications(): JobApplication[]
getApplication(id: string): JobApplication | null
updateApplication(id: string, updates: Partial<JobApplication>): void
deleteApplication(id: string): void
```

All components and pages must call `lib/storage.ts` — never touch localStorage directly.

## Claude API usage rules
- All Anthropic API calls happen in `/app/api/` route handlers — NEVER from client components
- No raw CV files are stored on the server — only parsed text is passed to Claude
- Always ask Claude to return structured JSON. Strip markdown fences before JSON.parse()
- Wrap all Claude calls in try/catch. Return a typed error response on failure.
- Model: `anthropic/claude-sonnet-4-5` via OpenRouter
- max_tokens: 4000 for tailoring, 2000 for gap analysis, 1500 for prep plan, 1000 for questions

## Environment variables
```
OPENROUTER_API_KEY=sk-or-v1-...
```

## Build order
- [x] 1. Scaffold Next.js project with Tailwind, TypeScript
- [x] 2. CVVault component — folder picker, file list, Primary/Library role assignment
- [x] 3. CV parsing API route — pdf-parse + mammoth, returns plain text
- [x] 4. JD input component — paste text + URL field + career level selector
- [x] 5. Claude tailoring API route — dual-source prompt, returns TailoredResult JSON
- [x] 6. Tailor tab UI — ATS score, keyword map, lateral bridge panel, excavation panel, tailored CV preview
- [x] 7. .docx export — tailored CV text → downloadable Word document
- [x] 8. Gap analysis tab — true gaps vs recovered skills
- [x] 9. Persistence layer — localStorage wrapper in lib/storage.ts, migrate to Supabase later
- [x] 10. Prep plan tab — per-gap resources, concept note + practice question generation
- [x] 11. Mock interview tab — question bank + live one-question-at-a-time session
- [x] 12. Application tracker — list of saved applications with status management
- [ ] 13. PWA polish — manifest, icons, offline handling, install prompt
- [ ] 14. Capacitor setup — Android build, file system plugin, Play Store prep

## Commands
```bash
npm run dev          # dev server on localhost:3000
npm run build        # production build
npm run lint         # ESLint
npx cap add android  # add Android platform
npx cap sync         # sync web assets into Capacitor
npx cap run android  # run on Android device/emulator
```

## Future — Supabase schema (not yet implemented)

When replacing localStorage with Supabase, apply this schema and rewrite `lib/storage.ts`:

```sql
create table profiles (
  id uuid references auth.users primary key,
  display_name text,
  default_career_level text default 'mid',
  created_at timestamptz default now()
);

create table applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  job_title text,
  company text,
  jd_text text,
  jd_url text,
  primary_cv_name text,
  library_cv_names text[],
  career_level text,
  tailored_result jsonb,
  true_gaps jsonb,
  prep_plan jsonb,
  status text default 'drafting',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

## Future integrations (post-MVP)
- Browser extension — capture JD from LinkedIn / Naukri / Indeed
- LinkedIn profile optimiser
- Google Calendar — interview scheduling
- Job alert engine — match saved prep profile against new listings
