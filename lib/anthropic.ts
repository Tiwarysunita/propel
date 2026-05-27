import Anthropic from '@anthropic-ai/sdk'
import { CareerLevel, TailoredResult, Gap, PrepPlanItem, MockQuestion } from '@/types'

const client = new Anthropic({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api',
  defaultHeaders: {
    'HTTP-Referer': 'https://propel.app',
    'X-Title': 'Propel Career Accelerator',
  },
})

const MODEL = 'anthropic/claude-sonnet-4-5'

const BASE_INTEGRITY_PROMPT = `You are Propel, a career accelerator for senior leaders and CXO-level professionals.
Your output will be used in real job applications. Integrity is the foundation of this product.

STRICT RULES:
1. Never invent experience, skills, metrics, or achievements not present in the provided CV texts.
2. Never inflate scope or seniority beyond what the evidence supports.
3. You MAY identify lateral bridges — where existing experience is genuinely transferable to the target role under a different title or framing. When you do, you MUST:
   - Label it explicitly as a lateral bridge in the JSON output
   - State the source experience and the bridge rationale
   - Set requiresUserConfirmation: true
4. Write exclusively in CXO register: outcomes over activities, scale always explicit, transformation language, no personal pronouns, no "responsible for".
5. If a required skill or experience is absent from ALL provided CVs, classify it as a true gap. Do not work around it.`

function buildSystemPrompt(level: CareerLevel): string {
  const levelPrompts: Record<CareerLevel, string> = {
    entry: `
This CV is for an entry-level candidate (0–3 years experience).
- Lead with education and projects if experience is limited
- Tools, languages, and certifications are primary signals — list them
- 1 page maximum
- Show learning velocity and initiative, not just task completion
- Optimise fully for ATS — keyword density is the primary filter at this level
`,
    mid: `
This CV is for a mid-level professional (3–8 years experience).
- Own the work — "built" not "helped build"
- Show progression across roles — scope expansion, seniority increase
- Metrics and outcomes expected for every significant contribution
- Tools support outcomes — do not lead with them
- 1.5–2 pages acceptable
- Optimise aggressively for ATS
`,
    director: `
This CV is for a Director or VP level leader (8–15 years experience).
- Every team achievement must establish personal accountability
- People leadership must be explicit: org size, hiring, restructuring
- Budget and P&L ownership must appear prominently if present
- Remove tool lists unless the role is explicitly technical
- Eliminate: "responsible for", "helped", "supported", "worked on"
- 2 pages maximum
- ATS matters for portal applications; narrative matters for search firm pipelines
`,
    cxo: `
This CV is for a CXO, MD, or Group Head level leader (15+ years experience).
- Structure: Executive Summary → Core Competencies → Experience → Board Roles → Education → Other
- No personal pronouns anywhere. No "responsible for". Ever.
- Surface P&L, board, investor, and regulatory experience prominently
- Eliminate all mid-level signals: tool lists, process ownership, team achievements without personal accountability
- Metrics from source CVs only. Never invent numbers.
- Roles older than 15 years: one line under Early Career, no bullets
- 2 pages maximum. Flag and trim if longer.
- Narrative strength over ATS keyword density
`
  }
  return BASE_INTEGRITY_PROMPT + levelPrompts[level]
}

async function chat(systemPrompt: string, userPrompt: string, maxTokens: number): Promise<string> {
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  })
  const block = message.content[0]
  return block.type === 'text' ? block.text : ''
}

function cleanJSON(raw: string): string {
  return raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
}

export async function tailorCV(
  primaryCVText: string,
  libraryCVTexts: { name: string; text: string }[],
  jdText: string,
  careerLevel: CareerLevel
): Promise<TailoredResult> {
  const librarySection = libraryCVTexts.length > 0
    ? libraryCVTexts.map(cv => `\n\n--- LIBRARY CV: ${cv.name} ---\n${cv.text}`).join('')
    : '\n\n(No library CVs provided)'

  const userPrompt = `Tailor this CV for the job description below. Return ONLY valid JSON — no markdown fences, no explanation.

=== PRIMARY CV ===
${primaryCVText}

=== LIBRARY CVs (excavation only — do not fabricate) ===
${librarySection}

=== JOB DESCRIPTION ===
${jdText}

Return JSON matching this exact structure:
{
  "atsScore": <number 0-100>,
  "atsScoreBeforeExcavation": <number 0-100>,
  "keywordBreakdown": {
    "keywords": <number 0-100>,
    "format": <number 0-100>,
    "skillsMatch": <number 0-100>,
    "experience": <number 0-100>
  },
  "keywords": [{ "keyword": string, "status": "in-primary"|"in-library"|"missing", "sourceCV": string|null, "originalBullet": string|null }],
  "excavated": [{ "keyword": string, "sourceCV": string, "originalBullet": string, "rewrittenBullet": string }],
  "lateralBridges": [{ "tailoredBullet": string, "sourceExperience": string, "bridgeRationale": string, "requiresUserConfirmation": true }],
  "trueGaps": [string],
  "tailoredCVText": string,
  "exportBlocked": boolean
}`

  const raw = await chat(buildSystemPrompt(careerLevel), userPrompt, 4000)
  return JSON.parse(cleanJSON(raw)) as TailoredResult
}

export async function analyseGaps(
  trueGapKeywords: string[],
  jdText: string,
  careerLevel: CareerLevel
): Promise<Gap[]> {
  const userPrompt = `Analyse these skill gaps in context of the job description.

Career level: ${careerLevel}
True gaps (absent from ALL CVs): ${trueGapKeywords.join(', ')}

Job description:
${jdText}

Return ONLY valid JSON:
[{ "skill": string, "severity": "critical"|"medium"|"minor", "jdContext": string }]`

  const raw = await chat('You are a career strategist.', userPrompt, 2000)
  return JSON.parse(cleanJSON(raw)) as Gap[]
}

export async function buildPrepPlan(
  gaps: Gap[],
  careerLevel: CareerLevel,
  jobTitle: string
): Promise<PrepPlanItem[]> {
  const userPrompt = `Build a personalised prep plan for a ${careerLevel}-level candidate applying for ${jobTitle}.

Gaps:
${gaps.map(g => `- ${g.skill} (${g.severity}): ${g.jdContext}`).join('\n')}

Return ONLY valid JSON:
[{
  "skill": string,
  "daysRequired": number,
  "resources": [{ "title": string, "url": string, "type": "article"|"course"|"concept-note"|"practice-questions" }]
}]

For director/cxo levels, prefer HBR, McKinsey, board-level frameworks. Use real, publicly accessible URLs.`

  const raw = await chat('You are a career coach.', userPrompt, 1500)
  return JSON.parse(cleanJSON(raw)) as PrepPlanItem[]
}

export async function generateMockQuestions(
  gaps: Gap[],
  careerLevel: CareerLevel,
  jobTitle: string,
  primaryCVText: string
): Promise<MockQuestion[]> {
  const userPrompt = `Generate targeted interview questions for a ${careerLevel}-level candidate applying for ${jobTitle}.

Gaps to test:
${gaps.map(g => `- ${g.skill} (${g.severity})`).join('\n')}

Candidate background (do not fabricate beyond this):
${primaryCVText.substring(0, 1000)}

Return ONLY valid JSON — 10–15 questions:
[{ "question": string, "type": "behavioural"|"case"|"technical"|"situational", "skill": string, "hint": string, "sampleAnswer": null }]`

  const raw = await chat('You are an executive interviewer.', userPrompt, 1000)
  return JSON.parse(cleanJSON(raw)) as MockQuestion[]
}
