export type CVRole = 'primary' | 'library' | 'unassigned'
export type CareerLevel = 'entry' | 'mid' | 'director' | 'cxo'

export type CVFile = {
  name: string
  role: CVRole
  text: string
  sizeKB: number
  lastModified?: number
}

export type KeywordMatch = {
  keyword: string
  status: 'in-primary' | 'in-library' | 'missing'
  sourceCV?: string
  originalBullet?: string
}

export type ExcavatedSkill = {
  keyword: string
  sourceCV: string
  originalBullet: string
  rewrittenBullet?: string
}

export type LateralBridge = {
  tailoredBullet: string
  sourceExperience: string
  bridgeRationale: string
  requiresUserConfirmation: boolean
  userApproved?: boolean
}

export type TailoredResult = {
  atsScore: number
  atsScoreBeforeExcavation: number
  keywordBreakdown: {
    keywords: number
    format: number
    skillsMatch: number
    experience: number
  }
  keywords: KeywordMatch[]
  excavated: ExcavatedSkill[]
  lateralBridges: LateralBridge[]
  trueGaps: string[]
  tailoredCVText: string
  exportBlocked: boolean
}

export type Gap = {
  skill: string
  severity: 'critical' | 'medium' | 'minor'
  jdContext: string
}

export type PrepResource = {
  title: string
  url: string
  type: 'article' | 'course' | 'concept-note' | 'practice-questions'
}

export type PrepPlanItem = {
  skill: string
  daysRequired: number
  resources: PrepResource[]
}

export type MockQuestion = {
  question: string
  type: 'behavioural' | 'case' | 'technical' | 'situational'
  skill: string
  hint?: string
  sampleAnswer?: string
}

export type JobApplication = {
  id: string
  jobTitle: string
  company: string
  jdText: string
  jdUrl?: string
  primaryCVUsed: string
  libraryCVsUsed: string[]
  result: TailoredResult
  trueGaps: Gap[]
  prepPlan: PrepPlanItem[]
  careerLevel: CareerLevel
  status: 'drafting' | 'applied' | 'interview' | 'offer' | 'rejected'
  createdAt: string
  updatedAt: string
}

export type AppTab = 'vault' | 'tailor' | 'gaps' | 'prep' | 'mock' | 'tracker'
