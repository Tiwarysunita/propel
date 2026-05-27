import Image from 'next/image'
import ContactForm from '@/components/Profile/ContactForm'

export const metadata = {
  title: 'Sunita Tiwary — AI Leader | Agentic AI | Enterprise Transformation',
  description:
    'Senior Director & Global Agentic AI Priority Leader. Builder of production AI agents. 21 years driving enterprise AI adoption, CXO relationships, and $25M+ in net-new AI deal value.',
}

const METRICS = [
  { value: '21', unit: 'yrs', label: 'Enterprise Leadership' },
  { value: '$25M+', unit: '', label: 'Net-New AI Deal Value' },
  { value: '46%', unit: '', label: 'AI Pipeline Growth' },
  { value: '25→84%', unit: '', label: 'D365 Adoption Scaled' },
  { value: '4', unit: '', label: 'AI Agents Shipped' },
  { value: '98%', unit: '', label: 'Leadership Score (WHI)' },
]

const PROTOTYPES = [
  {
    name: 'DealLens',
    subtitle: 'Microsoft Licensing Intelligence Agent',
    stack: ['OpenAI API', 'Lovable'],
    color: 'border-violet-500/30 bg-violet-500/5 hover:border-violet-500/50',
    accent: 'text-violet-400',
    badge: 'bg-violet-500/15 text-violet-300',
    description:
      'LLM-powered commercial intelligence agent for Microsoft account executives. Dynamic health scoring, renewal risk alerts, upsell signal detection, and multi-turn agentic conversation with persistent memory. Proactive alert architecture: Azure Timer Function → Teams Adaptive Card → closed-loop CRM update — running autonomously without manual triggers.',
  },
  {
    name: 'Meridian',
    subtitle: 'CSS Intelligent Operations Platform',
    stack: ['Claude Code', '3-agent architecture'],
    color: 'border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500/50',
    accent: 'text-indigo-400',
    badge: 'bg-indigo-500/15 text-indigo-300',
    description:
      'Three-agent platform targeting Microsoft Customer Success & Support leadership. Meridian (operational variance detection), Signal (product intelligence), Sentinel (churn early warning). Purpose: transform CSS from cost centre into a product intelligence engine that surfaces account risk before it becomes attrition.',
  },
  {
    name: 'Nova',
    subtitle: 'Agentic AI Solution Catalog',
    stack: ['M365 Copilot', 'SharePoint'],
    color: 'border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-500/50',
    accent: 'text-cyan-400',
    badge: 'bg-cyan-500/15 text-cyan-300',
    description:
      'AI commercial intelligence advisor enabling account teams to discover, configure, and deploy AI accelerators via self-service. Built on M365 Copilot and SharePoint — scalable, zero-friction adoption without IT dependency. Designed to differentiate Capgemini in strategic co-sell conversations.',
  },
  {
    name: 'Rule-as-Code',
    subtitle: 'Public Sector Policy Automation',
    stack: ['Python', 'Streamlit', 'OpenFisca', 'OpenAI API'],
    color: 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50',
    accent: 'text-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-300',
    description:
      'Translates regulatory policy rules into executable, auditable code. Built independently on a personal laptop — zero corporate resources. Demonstrated to a public sector account leader; subsequently pitched to AWS partner team with a cloud-consumption model, generating partnership interest. The full arc: prototype → stakeholder proof → ecosystem play.',
  },
]

const EXPERTISE = [
  {
    group: 'AI Leadership',
    icon: '◈',
    items: [
      'Agentic AI Strategy & GTM',
      'LLM Agent Design & Architecture',
      'GenAI Enablement Programs',
      'Context & Prompt Engineering',
      'RAG & Multi-Agent Systems',
      'AI Adoption at Enterprise Scale',
    ],
  },
  {
    group: 'Customer Experience',
    icon: '◎',
    items: [
      'CXO Engagement & Exec Briefings',
      'Enterprise Account Success',
      'AI-Enabled CX Transformation',
      'Proactive & Prevention-Led Models',
      'Critical Situation Leadership',
      'Large Account Management',
    ],
  },
  {
    group: 'Go-to-Market',
    icon: '◉',
    items: [
      'AI GTM Strategy & Co-Sell',
      'Partner Ecosystem Management',
      'Co-Innovation Programme Design',
      'Revenue-Led Thought Leadership',
      'Solution Architecture for Deals',
      'Hyperscaler Alliance Management',
    ],
  },
  {
    group: 'Technical Stack',
    icon: '⬡',
    items: [
      'OpenAI API & Azure OpenAI',
      'Claude / Anthropic (Claude Code)',
      'Microsoft Azure, M365, D365',
      'Python · Streamlit · Lovable',
      'SharePoint · Fabric · Copilot',
      'OpenFisca · RAG architectures',
    ],
  },
]

const EXPERIENCE = [
  {
    role: 'Senior Director — Global Agentic AI Priority Leader',
    company: 'Capgemini',
    period: 'Nov 2023 – Present',
    isCurrent: true,
    gradient: 'from-violet-500 to-indigo-500',
    highlights: [
      "Lead Agentic AI charter for Technology & Digital clients globally — direct CIO/CTO/CEO engagement on AI transformation roadmaps, driving ~10% YoY new business growth",
      'Influenced >$25M in net-new AI deal value; delivered ~46% growth in qualified AI pipeline through GenAI and Agentic AI GTM initiatives',
      'Built 4 production-grade AI agents (DealLens, Meridian, Nova, Rule-as-Code) — hands-on technical credibility in front of engineering stakeholders',
      'Designed Telefónica Agentic AI value framework across the full telecom value chain (network ops, CX, BSS/OSS) with measurable business value anchors',
      "Published Capgemini's Agentic AI thought leadership voice: 'Who Leads in the Agentic Era', 'Agentification of AI', 'Small Is the New Big'",
      'Graduated Global Pacesetters Leadership Programme — Capgemini University, Paris (top-talent recognition programme for high performers)',
    ],
  },
  {
    role: 'Senior Business Development Manager — Strategic Growth Partnership',
    company: 'Microsoft India',
    period: 'Jun 2022 – Oct 2023',
    isCurrent: false,
    gradient: 'from-blue-500 to-cyan-500',
    highlights: [
      "Owned India's most strategic co-innovation partnership — managing CXO stakeholder engagement, co-innovation roadmap, and joint GTM execution across Microsoft and partner leadership",
      'Led end-to-end product lifecycle for M365 SMB adoption tooling: market research → ideation → design → development → launch',
      'Co-led Business Steering Committee governing KPI tracking and strategic alignment at C-suite level',
      'Developed India-specific co-selling motions, coordinating across Microsoft partner, legal, and finance teams',
    ],
  },
  {
    role: 'Delivery Management Manager — Dynamics 365 Global Programs',
    company: 'Microsoft',
    period: 'Feb 2019 – Jun 2022',
    isCurrent: false,
    gradient: 'from-blue-500 to-cyan-500',
    highlights: [
      'Scaled D365 programme adoption from 25% to 84% across regions in 36 months — 500+ projects, 75,000 billed hours annually, expansion into zero-footprint markets',
      'Led 20 project managers globally across a complex matrix organisation; achieved 98% Work Health Index leadership score',
      'Drove cross-functional alignment across competing priorities, stakeholder expectations, fiscal planning, and resource capacity at global scale',
      'Championed D&I and structured capability development across a distributed, high-performance team',
    ],
  },
  {
    role: 'Solution Architect — Data Intelligence',
    company: 'Accenture',
    period: 'Jun 2016 – Feb 2019',
    isCurrent: false,
    gradient: 'from-purple-500 to-pink-500',
    highlights: [
      'Secured $50M+ in healthcare data and analytics deals through end-to-end solution architecture, executive engagement, and competitive differentiation',
      'Owned full product lifecycle for Intelligent Data Suite and Project Governance Dashboard — ideation through delivery with leadership and technical teams',
      'Led team of 6 Business Analysts; managed roadmap, prioritisation, and GTM strategy for new product offerings',
    ],
  },
  {
    role: 'Client Solutions Manager — Data & Analytics',
    company: 'Infosys',
    period: 'May 2015 – May 2016',
    isCurrent: false,
    gradient: 'from-teal-500 to-emerald-500',
    highlights: [
      'Responded to 40+ RFPs/RFIs across BFSI and Healthcare; 2:5 win ratio; secured $40M+ in deal value',
      'Led deal qualification, winning strategy, commercial structure, and cross-functional coordination through close',
    ],
  },
  {
    role: 'Senior Consultant — Insights & Data (Presales & Delivery)',
    company: 'Capgemini',
    period: 'Jun 2007 – May 2015',
    isCurrent: false,
    gradient: 'from-violet-500 to-indigo-500',
    highlights: [
      '8-year tenure; single point of accountability for Data Masking & Compliance Transformation at a top-tier UK financial services client — onsite in the United Kingdom for 2.5 years',
      'Presales lead securing $15M+ deals and contributing to $50M+ pipeline for the Data & Insights practice',
    ],
  },
  {
    role: 'Software Engineer — DW & BI Practice',
    company: 'Hexaware Technologies',
    period: 'Jan 2005 – Jun 2007',
    isCurrent: false,
    gradient: 'from-slate-500 to-slate-400',
    highlights: [
      'Developed Claims Datamart for one of the largest US insurance companies — awarded Star Performer',
      'ACE Award for Best Performance (2006)',
    ],
  },
]

const PUBLICATIONS = [
  { title: 'Who Leads in the Agentic Era', outlet: 'Capgemini LinkedIn' },
  { title: 'Agentification of AI', outlet: 'Capgemini LinkedIn' },
  { title: 'Small Is the New Big: The Rise of Small Language Models', outlet: 'Capgemini' },
  { title: 'GenAI: Empowering Software Developer Experience', outlet: 'Capgemini' },
  { title: 'Has GenAI for Software Lived Up to the Hype?', outlet: 'Capgemini Insights Research Library' },
]

const CERTS = [
  { name: 'Azure AI', issuer: 'Microsoft Certified' },
  { name: 'Azure Cloud', issuer: 'Microsoft Certified' },
  { name: 'Azure Data', issuer: 'Microsoft Certified' },
  { name: 'Dynamics 365', issuer: 'Microsoft Certified' },
  { name: 'Python Programming', issuer: 'University of Michigan' },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#09090e] text-white antialiased" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-violet-700/12 blur-[120px]" />
          <div className="absolute top-[100px] left-[10%] w-[300px] h-[300px] rounded-full bg-indigo-700/8 blur-[80px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-20">
          {/* Availability badge */}
          <div className="flex justify-center md:justify-start mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Open to VP · EVP · Global Head · CXO roles in AI
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Photo */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative w-44 h-44 rounded-3xl overflow-hidden shadow-2xl shadow-violet-950/60"
                   style={{ boxShadow: '0 0 0 1px rgba(139,92,246,0.2), 0 25px 60px rgba(0,0,0,0.5)' }}>
                <Image src="/sunita.jpg" alt="Sunita Tiwary" fill className="object-cover" priority />
              </div>
            </div>

            {/* Copy */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-1">
                Sunita Tiwary
              </h1>
              <p className="text-lg text-violet-300 font-semibold mb-5">
                Senior Director · Global Agentic AI Priority Leader
              </p>

              {/* First-person hero statement */}
              <div className="space-y-3 text-slate-300 text-base leading-relaxed mb-7 max-w-2xl">
                <p>
                  I build AI agents and deploy them at enterprise scale. At Capgemini I lead the
                  Global Agentic AI charter — engaging CIOs, CTOs, and CEOs on transformation
                  roadmaps while shipping working prototypes on <span className="text-white font-medium">Claude Code</span>, OpenAI API,
                  and M365 Copilot to prove the concept before a single slide is written.
                </p>
                <p>
                  Five years inside Microsoft — across Dynamics 365 global delivery and
                  India&apos;s most strategic co-innovation partnership — gave me a ground-level
                  understanding of how enterprise customers experience AI platforms, and what it
                  takes to convert a technical relationship into a long-term strategic one.
                </p>
                <p>
                  21 years. $25M+ in net-new AI deal value. 4 agents shipped. Published voice in
                  Agentic AI. Graduated Global Pacesetters Leadership Programme, Capgemini
                  University Paris.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a href="#contact"
                   className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-violet-900/40">
                  Get in touch
                </a>
                <a href="https://linkedin.com/in/sunita-tiwary" target="_blank" rel="noopener noreferrer"
                   className="px-5 py-2.5 rounded-xl bg-white/8 hover:bg-white/12 border border-white/10 text-white text-sm font-semibold transition-colors">
                  LinkedIn
                </a>
                <a href="mailto:tiwarysunita@gmail.com"
                   className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/8 text-slate-400 hover:text-white text-sm transition-colors">
                  tiwarysunita@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS ──────────────────────────────────────────────── */}
      <div className="border-y border-white/8 bg-white/3">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {METRICS.map(m => (
              <div key={m.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {m.value}<span className="text-slate-500 text-lg">{m.unit}</span>
                </p>
                <p className="text-xs text-slate-500 mt-1 leading-tight">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── AI PROTOTYPES ────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <Label>Built, not theorised</Label>
        <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-3">AI Agents I&apos;ve Shipped</h2>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl mb-10">
          Four production-grade AI applications — each demonstrating a distinct deployment pattern,
          each built to earn credibility with engineering and commercial stakeholders alike.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROTOTYPES.map(p => (
            <div key={p.name} className={`rounded-2xl border p-6 transition-all ${p.color}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className={`text-xl font-bold ${p.accent}`}>{p.name}</p>
                  <p className="text-sm text-white/75 font-medium mt-0.5">{p.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end shrink-0">
                  {p.stack.map(s => (
                    <span key={s} className={`text-xs px-2 py-0.5 rounded-md font-medium ${p.badge}`}>{s}</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERTISE ────────────────────────────────────────────── */}
      <section className="border-y border-white/8 bg-white/3">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Label>What I bring</Label>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-3">Expertise</h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mb-10">
            A rare combination of hands-on AI building, enterprise customer experience leadership,
            and revenue-generating GTM execution — across the Microsoft, Google, and Capgemini ecosystems.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {EXPERTISE.map(g => (
              <div key={g.group} className="rounded-2xl border border-white/8 bg-white/4 p-5 hover:border-violet-500/25 transition-colors">
                <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="text-base">{g.icon}</span> {g.group}
                </p>
                <ul className="space-y-2.5">
                  {g.items.map(s => (
                    <li key={s} className="flex items-start gap-2 text-sm text-slate-300 leading-snug">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-500/70 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <Label>21 years of impact</Label>
        <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-3">Career Timeline</h2>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl mb-10">
          From software engineer in data warehousing to global AI priority leader —
          every layer is real, every number is from the record.
        </p>

        <div className="space-y-4">
          {EXPERIENCE.map((job, i) => (
            <div key={i} className={`rounded-2xl border p-6 transition-colors ${job.isCurrent ? 'border-violet-500/30 bg-violet-500/5' : 'border-white/8 bg-white/3 hover:border-white/15'}`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {job.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-medium">
                        Current
                      </span>
                    )}
                    <span className={`text-xs font-semibold bg-gradient-to-r ${job.gradient} bg-clip-text text-transparent`}>
                      {job.company}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white leading-snug">{job.role}</h3>
                </div>
                <span className="text-xs text-slate-500 whitespace-nowrap flex-shrink-0 mt-1">{job.period}</span>
              </div>
              <ul className="space-y-2">
                {job.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full bg-violet-500/50 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── THOUGHT LEADERSHIP ───────────────────────────────────── */}
      <section className="border-y border-white/8 bg-white/3">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Label>Published voice</Label>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-3">Thought Leadership</h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mb-10">
            Writing that earns trust before the meeting — establishing Agentic AI credibility
            with enterprise customers, analysts, and hyperscaler partners.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PUBLICATIONS.map((pub, i) => (
              <div key={i} className="rounded-2xl border border-white/8 bg-white/4 p-5 flex gap-3 hover:border-violet-500/25 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white font-medium leading-snug">{pub.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{pub.outlet}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Certifications */}
          <div>
            <Label>Credentials</Label>
            <h2 className="text-2xl font-bold mt-2 mb-8">Certifications</h2>
            <ul className="space-y-3">
              {CERTS.map(c => (
                <li key={c.name} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-violet-500/15 border border-violet-500/25 flex-shrink-0 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  </span>
                  <div>
                    <span className="text-sm text-white font-medium">{c.name}</span>
                    <span className="text-xs text-slate-500 ml-2">· {c.issuer}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Education + Pacesetters */}
          <div>
            <Label>Foundation</Label>
            <h2 className="text-2xl font-bold mt-2 mb-8">Education & Recognition</h2>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
                <p className="text-sm font-semibold text-white">Bachelor of Engineering — Medical Electronics</p>
                <p className="text-xs text-slate-400 mt-1">Visvesvaraya Technological University (VTU) · 2004</p>
              </div>
              <div className="rounded-2xl border border-violet-500/25 bg-violet-500/8 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">★</span>
                  <div>
                    <p className="text-sm font-semibold text-white">Global Pacesetters Leadership Programme</p>
                    <p className="text-xs text-violet-300 mt-0.5">Top-performer recognition · Capgemini University, Paris</p>
                    <p className="text-xs text-slate-500 mt-2">
                      One-year immersive leadership programme for Capgemini&apos;s identified high-potential leaders.
                      Selected from a global pool; completed at Capgemini University, Paris.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="border-t border-white/8 bg-white/3">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: copy */}
            <div>
              <Label>Let&apos;s talk</Label>
              <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4">Get in Touch</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Available for VP, EVP, Global Head, and CXO conversations — primarily with AI-native companies
                and enterprise AI advisory. Based in Mumbai, India. Open to relocation to Bengaluru.
                Willing to travel 50%+ for customer and executive engagement.
              </p>
              <div className="space-y-3">
                <a href="mailto:tiwarysunita@gmail.com"
                   className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  tiwarysunita@gmail.com
                </a>
                <a href="https://linkedin.com/in/sunita-tiwary" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </span>
                  linkedin.com/in/sunita-tiwary
                </a>
                <span className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </span>
                  Mumbai, India · +91-97169-00356
                </span>
              </div>
            </div>

            {/* Right: form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="border-t border-white/8">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© 2026 Sunita Tiwary · Mumbai, India</p>
          <p className="text-xs text-slate-700">VP · EVP · Global Head · CXO · AI Leadership</p>
        </div>
      </footer>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest">{children}</p>
  )
}
