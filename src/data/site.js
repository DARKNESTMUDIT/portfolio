// ─────────────────────────────────────────────────────────────────────────
// SITE CONTENT — single source of truth for all text/links on the site.
// Sourced from portfolio-source.md. Edit here, never in components.
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Mudit Agarwal',
  firstName: 'Mudit',
  role: 'AI / Automation Engineer',
  location: 'New Delhi, India',
  headline:
    'I build AI systems that run — on-device models, MCP servers, and multi-agent pipelines.',
  shortHook:
    'AI/automation engineer. I ship the thing, not the demo.',
  tagline:
    'Self-taught AI/automation engineer building real, shippable systems — on-device ML, MCP integrations, and agentic pipelines — as a first-year commerce student.',
  about: [
    'First-year BCom (Honours) student at Hansraj College, University of Delhi. No computer science background. Everything below was built between late June and mid-July 2026, learning by shipping.',
    'The through-line across every project: build the real thing, not a tutorial clone, and be honest about what works. These are signed release builds, live deployments, and systems that make deliberate engineering trade-offs — a safety kernel before any feature, on-device inference so user data never leaves the device, honest reporting of a trading strategy that showed no edge rather than cherry-picking a good backtest.',
    'I work entirely inside Claude Code and treat AI as an actual engineering unlock — on-device CLIP, local Whisper, MCP servers, multi-agent validation — not decoration bolted onto a CRUD app.',
  ],
  currently:
    'Exploring occasion-based lead generation at Ivory Stays, running a build-in-public series, and using my own Idea Miner tool to pick what to build next.',
  email: 'mudit.agarwal10000@gmail.com',
  resumeUrl: '/assets/CV.pdf',
}

export const socials = [
  { label: 'GitHub', url: 'https://github.com/DARKNESTMUDIT' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mudit-ag/' },
  { label: 'Email', url: 'mailto:mudit.agarwal10000@gmail.com' },
]

// Featured order (strongest first): eyedropper → Sift → wisprlocal →
// Idea Miner → Dish2Cart → GoldBot
export const projects = [
  {
    slug: 'eyedropper',
    title: 'eyedropper',
    flagship: true,
    tagline: 'One source of truth. Visible to designers, callable by agents.',
    description:
      'A team’s design system and inspiration boards, served to AI coding agents over MCP so generated UI is on-brand on the first try.',
    caseStudy:
      'MCP server as the core product surface — three read-only tools plus a raw-file resource, exposed to any MCP-speaking agent. Per-user revocable bearer tokens, rate-limited, workspace-isolated by construction. Live design-system rendering from a design.md, vision-model bootstrap from board images, team-first via Clerk Organizations. Shipped as a full product lifecycle: PRD → five phases → public deploy.',
    proves:
      'Can design and ship an entire multi-tenant SaaS product — auth, real-time backend, a protocol server, a public deploy — and understands MCP deeply enough to build the server, not just consume one.',
    tech: ['Next.js', 'Convex', 'Clerk', 'MCP server', 'Vercel'],
    status: 'Shipped · live',
    year: '2026',
    link: 'https://eyedropper-coral.vercel.app',
    repo: 'https://github.com/DARKNESTMUDIT/eyedropper',
    image: '/assets/projects/eyedropper.jpg',
  },
  {
    slug: 'sift',
    title: 'Sift',
    flagship: false,
    tagline: 'Find any photo by describing it. Nothing leaves your phone.',
    description:
      'Conversational semantic search over your phone’s photos with automatic folder organization and duplicate detection — CLIP running on-device, no uploads.',
    caseStudy:
      'Safety kernel first, before any feature: delete = checksum-verified move to trash with single-use confirmation tokens, crash-safe journaling, and one-tap undo — all destructive paths forced through one chokepoint. OpenCLIP ViT-B/32 int8-quantized via LiteRT for real semantic search with zero network. Cloud layer is text-only and BYOK — a hard privacy boundary. MVVM + clean architecture, Hilt DI, WorkManager background indexing.',
    proves:
      'Ships native Android to a signed release, deploys real ML models on a phone (not just API calls), and designs deliberately for irreversible actions.',
    tech: ['Kotlin', 'Jetpack Compose', 'OpenCLIP · LiteRT', 'Hilt', 'Material 3'],
    status: 'Shipped · signed 1.1.0 release',
    year: '2026',
    link: '',
    repo: '',
    image: '/assets/projects/sift.jpg',
  },
  {
    slug: 'wisprlocal',
    title: 'wisprlocal',
    flagship: false,
    tagline: 'System-wide voice dictation. 100% on-device. No subscription.',
    description:
      'Hold a hotkey anywhere on the Mac, speak, release — clean, punctuated text is typed into whatever field is focused. Nothing touches the network.',
    caseStudy:
      'Two-stage local pipeline: mlx-whisper (whisper-large-v3-turbo, Apple-Silicon-optimized) → local Ollama (llama3.2:3b) that strips fillers and fixes punctuation while never changing meaning. Packaged as a real .app with login-item auto-start and correct macOS permission identity. Per-stage latency instrumentation (record/STT/LLM/paste) to tune speed against quality instead of guessing.',
    proves:
      'Comfortable with macOS systems programming — global hotkeys, accessibility permissions, clipboard injection, app packaging — and runs local ML inference on Apple Silicon. In daily use.',
    tech: ['Python', 'mlx-whisper', 'Ollama', 'py2app', 'macOS APIs'],
    status: 'Working · in daily use',
    year: '2026',
    link: '',
    repo: '',
    image: '/assets/projects/wisprlocal.jpg',
  },
  {
    slug: 'idea-miner',
    title: 'Idea Miner',
    flagship: false,
    tagline: 'Point it at a market, get back validated problem statements with evidence.',
    description:
      'Scrapes 8 platforms for real user complaints, then runs a multi-agent validation panel to surface problems worth building — the tool that picks every other project.',
    caseStudy:
      '8-platform scraping layer (Reddit, HN, Product Hunt, GitHub, Bluesky, Play Store reviews, News India…) run concurrently with a live progress UI. Market lenses swap sources to where each audience actually voices problems. Validation is a panel of 3 parallel critics — reality, persistence, impact — plus an adjudicator that resolves disagreements. Outputs are durable, timestamped JSON runs that have generated real build specs downstream.',
    proves:
      'Designs genuine multi-agent systems (parallel critics + adjudicator), builds resilient multi-source scraping pipelines, and closes the loop — its output drives the rest of this portfolio.',
    tech: ['Python', 'Claude (Opus)', 'Firecrawl', 'Multi-agent', 'Rich CLI'],
    status: 'Built · working CLI',
    year: '2026',
    link: '',
    repo: '',
    image: '/assets/projects/idea-miner.jpg',
  },
  {
    slug: 'dish2cart',
    title: 'Dish2Cart',
    flagship: false,
    tagline: 'Pick a dish and a headcount. Get a ready-to-checkout grocery cart.',
    description:
      'Turns “I want to cook dal makhani for 6” into your actual Swiggy Instamart cart — live recipe → scaled ingredients → matched products → real cart, over the official Swiggy MCP.',
    caseStudy:
      'No LLM in the core flow — recipe parsing is rule-based (quantity/unit grammar plus a Hindi–English synonym map) with a curated cookbook fallback. Real third-party MCP integration with OAuth 2.1 + PKCE and Dynamic Client Registration rather than a mocked cart. Respects the API contract exactly: get-then-merge cart updates, variant-level IDs, checkout only on explicit confirmation.',
    proves:
      'Integrates a real third-party MCP with correct auth and API discipline, and has the judgment to solve NLP with rules when an LLM is the wrong tool.',
    tech: ['Next.js', 'Swiggy MCP', 'OAuth 2.1 + PKCE', 'Rule-based NLP'],
    status: 'Working prototype',
    year: '2026',
    link: '',
    repo: '',
    image: '/assets/projects/dish2cart.jpg',
  },
  {
    slug: 'goldbot',
    title: 'GoldBot',
    flagship: false,
    tagline: 'Test the strategy with numbers, not vibes.',
    description:
      'An intraday gold-trading bot with one strategy engine that runs identically across backtest, paper, and live — built to measure whether a pattern strategy has an edge. Verdict: honestly, not yet.',
    caseStudy:
      'Detects double tops/bottoms, head-and-shoulders, and box breakouts on 5-minute XAUUSD, filtered by 200 EMAs and session time. Every fuzzy rule is a numbered knob in config; every skipped setup is journaled with its veto reason. Guardrails independent of results: one position at a time, max 3 trades/day, daily −2R halt. Backtested over 70,887 candles and reported honestly — profit factor 1.16 on 20 trades is not an edge, and the report says so.',
    proves:
      'Rigorous backtesting methodology — distinguishing “implemented correctly” from “has an edge” — and reporting negative results honestly instead of overselling.',
    tech: ['Python', 'MT5 · Dukascopy', 'Pattern detection', 'matplotlib'],
    status: 'Backtested · no edge claimed',
    year: '2026',
    link: '',
    repo: '',
    image: '/assets/projects/goldbot.jpg',
  },
]

export const skills = [
  {
    group: 'AI / ML Engineering',
    items: [
      'On-device ML deployment — CLIP (int8/LiteRT) on Android, Whisper (MLX) + local LLM on macOS',
      'Multi-agent systems — parallel critics + adjudicator design',
      'MCP — building servers (bearer auth, tools + resources) and integrating third-party MCPs (OAuth 2.1/PKCE)',
      'Vision-model-driven generation and LLM structured output',
      'Judgment on when not to use an LLM',
    ],
  },
  {
    group: 'Software Engineering',
    items: [
      'Native Android — Kotlin, Compose, Material 3, Hilt, WorkManager, signed releases',
      'Full-stack web — Next.js, Convex, Clerk Organizations, Vercel',
      'macOS systems programming — hotkeys, accessibility, clipboard injection, packaging',
      'Python pipelines — concurrent scraping, caching, rich CLIs',
      'Clean architecture / MVVM, safety-critical design, adapter patterns',
    ],
  },
  {
    group: 'Engineering Judgment',
    items: [
      'Safety-first design for irreversible actions',
      'Honest experimentation and negative-result reporting',
      'Latency instrumentation over guessing',
      'Privacy-by-construction — on-device, BYOK boundaries',
    ],
  },
]

export const howIWork = [
  'Sole environment: Claude Code — every project here was built through it.',
  'AI as an engineering unlock — on-device inference, agentic pipelines, MCP — not a wrapper.',
  'Ship end-to-end: PRD/spec → phased build → signed release or public deploy.',
  'Document decisions and report results honestly.',
]

export const nav = [
  { label: 'ABOUT', href: '#about' },
  { label: 'WORK', href: '#work' },
  { label: 'CONTACT', href: '#contact' },
]

// Rotating titles in the hero ("An …")
// Hero identity — ghost word stacked above the main word, overlapping
// like the reference so neither ever runs off-screen.
export const heroTitle = { top: 'AUTOMATION', bottom: 'ENGINEER' }

// About section — one bold statement beside the robot bust.
export const aboutStatement =
  'Mudit Agarwal is a first-year BCom (Honours) student at Hansraj College, Delhi University, interning at Ivory Stays in lead generation. With no CS background, he’s spent this summer shipping real systems out of Claude Code. The rule: build the real thing, not a tutorial clone, and report results honestly.'

// Marquee text behind the preloader
export const preloaderMarquee =
  'AI ENGINEER — AUTOMATION — MCP — ON-DEVICE ML — '

// "What I Do" cards
export const whatIDo = [
  {
    title: 'AI ENGINEER',
    subtitle: 'Systems that run, not demos',
    description:
      'On-device ML (CLIP on Android, Whisper on Apple Silicon), MCP servers and integrations, and multi-agent pipelines with critics and adjudicators. LLMs where they help — rules where they don’t.',
  },
  {
    title: 'FULL-STACK',
    subtitle: 'Shipped products, end to end',
    description:
      'Multi-tenant SaaS with Next.js, Convex and Clerk; native Android in Kotlin and Compose to signed releases; macOS systems tools packaged as real apps. PRD to public deploy.',
  },
]

// Career timeline (year rows, latest first)
export const career = [
  {
    year: '2026',
    role: 'AI / Automation Engineer',
    kind: 'Shipping — Summer Sprint',
    description:
      'Shipped six real systems in one summer: a live SaaS with its own MCP server, a signed Android app doing on-device semantic search, a fully-local Mac dictation tool, a multi-agent research pipeline, a Swiggy MCP integration, and an honestly-backtested trading bot.',
  },
  {
    year: '2026',
    role: 'Intern — Ivory Stays',
    kind: 'Lead Generation',
    description:
      'Occasion-based lead generation for a hospitality startup — the domain work that funds and grounds the engineering.',
  },
  {
    year: '2025',
    role: 'BCom (Hons), Hansraj College',
    kind: 'University of Delhi',
    description:
      'CUET 99.7 percentile, AIR 405 of 1.4M+. Chose commerce — then taught myself to ship software anyway.',
  },
  {
    year: '2025',
    role: 'Class XII — 97.6%',
    kind: 'DPS Siliguri · School #1',
    description:
      'Gold Medal for six years of continuous academic excellence. The discipline came first; the code came later.',
  },
  {
    year: '2024',
    role: 'First Experiments',
    kind: 'Begin Learning',
    description:
      'Early websites, newsletter automations and scrapers — the tutorial phase that everything since has outgrown.',
  },
]

// Tech stack grid — name + simple-icons slug (null slug → text tile)
export const techStack = [
  { name: 'Python', slug: 'python' },
  { name: 'Kotlin', slug: 'kotlin' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'React', slug: 'react' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Convex', slug: null },
  { name: 'Clerk', slug: 'clerk' },
  { name: 'Vercel', slug: 'vercel' },
  { name: 'Jetpack Compose', slug: 'jetpackcompose' },
  { name: 'Material 3', slug: 'materialdesign' },
  { name: 'Android', slug: 'android' },
  { name: 'LiteRT', slug: null },
  { name: 'OpenCLIP', slug: null },
  { name: 'Whisper · MLX', slug: null },
  { name: 'Ollama', slug: 'ollama' },
  { name: 'Claude', slug: 'claude' },
  { name: 'MCP', slug: null },
  { name: 'Firecrawl', slug: null },
  { name: 'Swift/macOS', slug: 'apple' },
  { name: 'Git', slug: 'git' },
  { name: 'GitHub', slug: 'github' },
  { name: 'Tailwind', slug: 'tailwindcss' },
  { name: 'matplotlib', slug: null },
  { name: 'Claude Code', slug: null },
]

// Footer / contact
export const footer = {
  location: 'New Delhi, India',
  playWithMe: { label: 'Play With Me', url: 'https://eyedropper-coral.vercel.app' },
  hireMe: { label: 'Hire Me', url: 'mailto:mudit.agarwal10000@gmail.com' },
  socialLinks: [
    { label: 'Github', url: 'https://github.com/DARKNESTMUDIT' },
    { label: 'Linkedin', url: 'https://www.linkedin.com/in/mudit-ag/' },
    { label: 'Email', url: 'mailto:mudit.agarwal10000@gmail.com' },
    { label: 'Resume', url: '/assets/CV.pdf' },
  ],
}

// Work gallery categories (per project, same order as projects)
export const workCategories = {
  eyedropper: 'SaaS / MCP Server',
  sift: 'Android / On-device ML',
  wisprlocal: 'macOS / Local ML',
  'idea-miner': 'Multi-agent Pipeline',
  dish2cart: 'MCP Integration',
  goldbot: 'Quant / Backtesting',
}
