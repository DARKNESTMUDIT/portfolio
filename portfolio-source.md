# Mudit Agarwal — Portfolio Source Document

> **Purpose of this file:** structured, factual source material to feed into a website-builder.
> Positioning: **AI / automation engineer**. Depth: **case-study**. Every claim below is grounded
> in the actual repos on Mudit's machine (git history, source, shipped artifacts) — not marketing.
> Placeholders are marked `[[NEEDS: ...]]` — fill or delete before publishing.

---

## 0. Metadata for the website builder

- **Owner:** Mudit Agarwal
- **Primary angle:** AI/automation engineer who ships. Lead with the technology; the student story is the credibility twist, not the headline.
- **Tone:** precise, technical, understated. No hype words ("revolutionary", "cutting-edge"). Let the artifacts carry it.
- **Suggested site sections:** Hero → Featured Work (case studies) → Full Project List → Skills/Stack → How I Work → About → Contact
- **Featured order (strongest first for this angle):** eyedropper → Sift → wisprlocal → Idea Miner → Dish2Cart → GoldBot
- **Secondary/mention:** Reddit Pain Miner (prototype of Idea Miner), Instagram build-in-public series, foundational/older work
- **Per-project schema used below:** tagline · one-liner · problem · approach · key technical decisions · stack · status · what it proves · timeline · links

---

## 1. Hero / positioning

**Name:** Mudit Agarwal

**Headline options (pick one for the site):**
- "I build AI systems that run — on-device models, MCP servers, and multi-agent pipelines."
- "AI/automation engineer. I ship the thing, not the demo."
- "Six months ago I'd never written production code. This is what I've shipped since."

**Sub-headline:**
First-year commerce student. No CS degree. Working out of Claude Code as my only environment,
I've shipped a live SaaS product with its own MCP server, a signed Android app doing on-device
semantic search, a fully-local Mac dictation tool in daily use, and a multi-agent research
pipeline — all in one summer.

**The one-line hook (bio):**
Self-taught AI/automation engineer building real, shippable systems — on-device ML, MCP
integrations, and agentic pipelines — as a first-year commerce student.

---

## 2. About (long form)

Mudit is a first-year BCom (Honours) student at Hansraj College, University of Delhi, currently on
summer break and interning at Ivory Stays (a hospitality startup) in lead generation. No computer
science background. The entire body of work below was built between late June and mid-July 2026,
learning by shipping.

The through-line across every project: **build the real thing, not a tutorial clone, and be honest
about what works.** Where most beginner portfolios show toy apps, these are signed release builds,
live deployments, and systems that make deliberate engineering trade-offs — a safety kernel before
any feature, on-device inference to avoid uploading user data, honest reporting of a trading strategy
that showed *no* edge rather than cherry-picking a good backtest.

He works entirely inside Claude Code as his development environment and treats AI as an actual
engineering unlock (on-device CLIP, local Whisper, MCP servers, multi-agent validation), not as
decoration bolted onto a CRUD app.

**Currently:** exploring occasion-based lead generation for Ivory Stays, running a build-in-public
content series, and using his own Idea Miner tool to pick what to build next.

---

## 3. Featured projects (case-study depth)

### 3.1 eyedropper — design system as a service for AI agents  ⭐ FLAGSHIP

- **Tagline:** One source of truth. Visible to designers, callable by agents.
- **One-liner:** A team's design system and inspiration boards, served to AI coding agents over MCP so generated UI is on-brand on the first try.
- **Status:** **Shipped and live** — public deploy, public repo.
- **Live:** https://eyedropper-coral.vercel.app
- **Repo:** https://github.com/DARKNESTMUDIT/eyedropper (public)

**Problem.** When a developer tells an AI coding agent "build a settings page," the agent has no
idea what the team's colors, type scale, or component conventions are — so someone ends up pasting
hex codes and font names into prompts every time, and the output still drifts off-brand.

**Approach.** eyedropper is the single home for a team's inspiration boards and design system, and —
unlike a Figma file or a mood board — it's built to be *read by agents*, not just humans. A coding
agent connects over MCP and, at build time, pulls the workspace's real design tokens (`design.md`)
and pinned reference images. The output looks like the team's own work with nobody copy-pasting a
color into a prompt.

**Key technical decisions.**
- **MCP server as the core product surface** — three read-only tools plus a raw-file resource, exposed to any MCP-speaking agent (Claude Code, Cursor).
- **Per-user, revocable bearer tokens; rate-limited; workspace-isolated by construction** — auth and multi-tenancy designed in, not bolted on.
- **Live design-system rendering** — paste a `design.md` (YAML token front-matter + markdown component library) and see it rendered faithfully to exactly what gets served over MCP (swatches, type scale, spacing/radius, component gallery).
- **Vision-model bootstrap** — point a vision model at pinned board images and get a first-draft `design.md` back, editable before saving. Bridges "we have references" to "we have a system."
- **Team-first, not individual accounts** — backed by Clerk Organizations; boards and systems belong to the workspace.
- Shipped as a full product lifecycle: PRD → five phases → public deploy (see `docs/` in repo).

**Stack:** Next.js · Convex · Clerk (Organizations) · MCP server (bearer-token auth) · vision model for design-system generation · Vercel.

**What it proves:** Can design and ship an entire multi-tenant SaaS product — auth, real-time backend,
a protocol server, a public deploy — and understands MCP deeply enough to *build the server*, not just
consume one. This is the strongest single artifact for the AI-engineer positioning.

**Timeline:** built ~2026-07-02.

---

### 3.2 Sift — private, on-device semantic photo search (Android)  ⭐

- **Tagline:** Find any photo by describing it. Nothing leaves your phone.
- **One-liner:** Conversational semantic search over your phone's photos, with automatic folder organization and duplicate/junk detection — CLIP running on-device, no uploads.
- **Status:** **Shipped — signed 1.1.0 release** (versionCode 3). Distributed as an APK directly to users; not on the Play Store.
- **Repo:** local/private `[[NEEDS: is the Sift repo public? add link or mark private]]`
- **Download:** `[[NEEDS: confirm GitHub Releases APK URL + builds-site link — landing page at ~/builds-site/]]`

**Problem.** A phone can recognize a face in a hundredth of a second but can't find a picture of a
receipt. The only apps that solve semantic photo search do it by uploading your entire library to a
server. Mudit didn't want that trade.

**Approach.** Describe what you want ("that receipt from last week", "photos with my ID card") instead
of scrolling. Semantic matching runs against on-device CLIP embeddings; a text-only, bring-your-own-key
Gemini layer powers the conversational assistant — images never leave the device, only text queries
about them do. Adds automatic smart folders (Phone/WhatsApp → festivals, people, receipts, by year),
perceptual-hash duplicate/junk detection, and a safety kernel so no feature can hard-delete a file.

**Key technical decisions.**
- **Safety kernel first, before any feature.** Delete = move to `.sift_trash/` via checksum-verified copy-then-remove, single-use confirmation tokens, crash-safe journaling, one-tap undo. All destructive paths forced through one `SafeDeleteUseCase` chokepoint. The "easy" implementation (just delete the file) was explicitly rejected.
- **On-device ML:** OpenCLIP ViT-B/32 (LAION), int8-quantized via LiteRT — real semantic search with zero network.
- **Cloud layer is text-only and BYOK** (Gemini) — a hard privacy boundary, not a toggle.
- **MVVM + clean architecture** (ui → domain → data), Hilt DI, WorkManager for background indexing.
- **1.1.0 additions over 1.0:** smart folder tree (festivals/people/receipts → years); one-tap "Get a free key" onboarding for the assistant; select-all buckets, reachable action bars, index-now on home.

**Stack:** Kotlin · Jetpack Compose · Material 3 · Hilt · WorkManager · OpenCLIP ViT-B/32 (int8, LiteRT) · on-device OCR + FTS + vector store · perceptual hashing (DCT) · Gemini (text-only, BYOK).

**What it proves:** Ships native Android to a signed release, deploys real ML models on a phone (not
just API calls), and designs deliberately for irreversible actions. 31 commits over ~a week, five phases.

**Timeline:** 2026-07-06 → 2026-07-13 (1.0.0), 1.1.0 shortly after.

---

### 3.3 wisprlocal — fully-local Wispr Flow replica for macOS  ⭐

- **Tagline:** System-wide voice dictation. 100% on-device. No subscription, no cloud.
- **One-liner:** Hold a hotkey anywhere on the Mac, speak, release — clean, punctuated text is typed into whatever field is focused. Nothing touches the network.
- **Status:** **Working, in daily use.** Packaged as an installable `.app` with login-item auto-start.
- **Repo:** local/private `[[NEEDS: is wisprlocal repo public? add link or mark private]]`

**Problem.** Wispr Flow-style dictation is excellent but sends audio to the cloud and costs a
subscription. Mudit wanted the same magic, fully local — no audio leaving the machine, no per-use cost.

**Approach.** A menu-bar app running a small state machine (IDLE → RECORDING → TRANSCRIBING →
FILTERING → INJECTING). Hold Right-Option, speak, release: mic → local Whisper (STT) → local LLM
cleanup → paste at cursor. Models load once at startup and stay warm so each dictation feels instant.

**Key technical decisions.**
- **Two-stage local pipeline:** mlx-whisper (`whisper-large-v3-turbo`, Apple-Silicon-optimized STT) → local Ollama (`llama3.2:3b`) that strips fillers, fixes punctuation/grammar, and honors "new line"/"bullet point" while *never* changing meaning.
- **Zero cloud dependency by design** — both stages run on-device; no API keys, no network after the one-time model download.
- **Packaged as a real `.app`** (py2app) so it runs without a terminal and auto-starts at login — with the correct understanding that a packaged bundle gets its own macOS permission identity (Microphone, Input Monitoring, Accessibility) separate from the dev host process.
- **Latency engineering:** per-stage timing instrumentation (record/STT/LLM/paste) to actually measure and tune speed-vs-quality instead of guessing.
- **Environment discipline:** pins a Python 3.12 venv via `uv` because system Python 3.14 outran the ML wheels — the single biggest gotcha, handled explicitly.

**Stack:** Python 3.12 (uv) · mlx-whisper (MLX, Apple Silicon) · Ollama (`llama3.2:3b`) · pynput (global hotkey) · rumps (menu bar) · NSPasteboard injection · py2app packaging · pytest.

**What it proves:** Comfortable with macOS systems programming (global hotkeys, accessibility
permissions, clipboard injection, app packaging), runs local ML inference on Apple Silicon, and
measures latency rather than eyeballing it. It's the one he uses himself every day — the strongest
signal a tool actually works.

**Timeline:** 2026-07-02 → 2026-07-11.

---

### 3.4 Idea Miner — multi-agent pain-point research pipeline

- **Tagline:** Point it at a market, get back validated, buildable problem statements with evidence.
- **One-liner:** Scrapes 8 platforms for real user complaints, then runs a multi-agent validation panel to surface problems worth building — the tool that picks every other project.
- **Status:** **Built and working** (CLI). Local. Has produced real runs and generated build specs.
- **Repo:** local/private `[[NEEDS: is Idea Miner repo public? add link or mark private]]`
- **Note:** the earlier `reddit-pain-miner` (single-source prototype) evolved into this. Present *this* as the project; reddit-pain-miner is the v0.

**Problem.** "What should I build next?" — answered with vibes instead of evidence. Mudit wanted a
repeatable pipeline that finds recurring, real, unmet needs with source-quoted proof.

**Approach.** Give it a topic (e.g. "train ticket booking") or a preset India daily-life domain
(commute, healthcare, education, personal-finance, housing, government-services…). It scrapes the
right sources in parallel, extracts signals, deepens them into underlying problems, then runs a
**validation panel of 3 parallel critics (reality · persistence · impact) plus an adjudicator** that
resolves disagreements — and outputs structured problem cards with who/context/trigger/cost, why the
problem persists, and an AI-native solution, each grounded in a real quote.

**Key technical decisions.**
- **8-platform scraping layer** with per-platform modules: Reddit, Reddit India, Hacker News, Product Hunt, GitHub, Bluesky, Play Store (review mining), News India — run concurrently via a thread pool with a live progress UI.
- **Market lenses:** `--market india|global` swaps default sources to where that audience actually voices problems (India sources for Indian consumers, builder forums for global).
- **Multi-agent adjudication**, not a single LLM call — critics score reality/persistence/impact independently, then an adjudicator reconciles. This is real agentic design.
- **Curated India domain presets** bundling topic seed + the exact subreddits + a Play Store query where each pain actually surfaces.
- **Outputs are durable** — timestamped JSON runs saved to `outputs/`, and it has produced full build specs (`specs/` includes the Sift Android build spec and a "10 India problems → AI solutions" doc). The pipeline literally fed downstream projects.

**Stack:** Python · Anthropic Claude (Opus) for extraction/critique/adjudication · FireCrawl + platform-specific scrapers · concurrent futures (thread pool) · rich (terminal UI).

**What it proves:** Designs genuine multi-agent systems (parallel critics + adjudicator), builds
resilient multi-source scraping pipelines, and closes the loop — the tool's output actually drives the
rest of the portfolio. Strong "systems thinking" artifact.

**Timeline:** late June → early July 2026 (runs dated through 2026-07-04).

---

### 3.5 Dish2Cart — recipe to a real Swiggy Instamart cart via MCP

- **Tagline:** Pick a dish and a headcount. Get a ready-to-checkout grocery cart.
- **One-liner:** Turns "I want to cook dal makhani for 6" into your actual Swiggy Instamart cart — live recipe → scaled ingredients → matched products → real cart, over the official Swiggy MCP.
- **Status:** **Working prototype** (demo mode functional). Not yet submitted to Swiggy's production access program.
- **Repo:** local/private `[[NEEDS: is Dish2Cart repo public? add link or mark private]]`
- **Demo:** `[[NEEDS: is the Next.js app deployed? add live demo URL, or note "demo/mock mode"]]`

**Problem.** Cooking a specific dish means manually looking up a recipe and then searching for each
ingredient one at a time. Dish2Cart collapses that into one flow.

**Approach.** Pick a dish + servings → pull a live recipe from YouTube → parse and scale ingredients →
match each to real Instamart products → push the whole thing into the user's real Swiggy cart. The cart
syncs to the actual Swiggy app; prune/checkout from either side.

**Key technical decisions.**
- **No LLM in the core flow** — recipe parsing is rule-based (quantity/unit grammar + a Hindi–English synonym map), with a curated 25-dish cookbook as fallback when YouTube parsing fails. Deliberately *not* reaching for an LLM by default.
- **Real third-party MCP integration** (Swiggy) — OAuth 2.1 + PKCE, Dynamic Client Registration — rather than mocking the cart. A `dev:mock` mode exists for demoing without login.
- **Respects the API contract exactly:** `update_cart` replaces the whole cart, so always `get_cart` + merge first; items are variant-level `spinId`s, not product IDs; checkout requires explicit confirmation and is never auto-retried.

**Stack:** Next.js (API routes, React UI) · Swiggy MCP (OAuth 2.1 + PKCE, DCR) · rule-based NLP (unit/quantity parser, bilingual synonym matching) · unit tests (parser, scaler, cart-merge, pack parsing).

**What it proves:** Integrates a real third-party MCP with correct auth and API discipline (idempotency,
retry/backoff classification, cart-merge logic), and has the judgment to solve NLP with rules when an LLM
is the wrong tool.

**Timeline:** 2026-07-14.

---

### 3.6 GoldBot (algo-god) — XAUUSD pattern-trading bot with honest backtesting

- **Tagline:** Test the strategy with numbers, not vibes.
- **One-liner:** An intraday gold-trading bot with one strategy engine that runs identically across backtest, paper, and live — built to actually measure whether a pattern strategy has an edge. Verdict: honestly, not yet.
- **Status:** **Backtested; no demonstrated edge.** Not paper-trading live. (Deliberately reported as-is.)
- **Repo:** local/private `[[NEEDS: is GoldBot repo public? add link or mark private]]`

**Problem.** "Does this candlestick-pattern strategy actually work?" is usually answered with a hunch.
Mudit built the whole pipeline to answer it with data instead.

**Approach.** Detects double tops/bottoms, head-and-shoulders, and consolidation-box breakouts on the
5-minute XAUUSD chart, filtered by 200 EMAs and session time. The same strategy engine runs unchanged
across backtest (Dukascopy history), paper (replay/TwelveData), and live (MT5) — only the broker adapter
swaps.

**Key technical decisions.**
- **Every fuzzy rule is a numbered knob** in `config.yaml` ("proper V", "near", "away") — never hardcoded. Tuning happens by looking at per-trade PNG charts and adjusting knobs until detections match intent.
- **Every skipped setup is journaled with its veto reason** — always answerable: "why didn't it take that trade?"
- **Guardrails independent of backtest results:** one position at a time, max 3 trades/day, halt at −2R for the day, live orders refused without explicit double opt-in. Only ever needs an MT5 login, never bank details; `.env` gitignored.
- **Adapter pattern for the broker layer** so backtest/paper/live share one engine.

**Findings (reported honestly, not cherry-picked).**
- Jul 2025–Jun 2026, 70,887 candles: with the $7 stoploss cap → 20 trades, 40% win rate, +7.1% net, profit factor 1.16 — explicitly **not** claimed as an edge ("can't distinguish PF 1.16 from 1.0 on 20 trades").
- Removing the stoploss cap actively *lost* money (−24.7% over the year, 74 trades) — the cap is a damage limiter, not an edge dial.
- A second session-momentum strategy wins in trends/crashes but loses more in regime transitions than it earns. Net: **no demonstrated edge in either strategy yet.**

**Stack:** Python · pattern-detection algorithms (swing detection, H&S geometry, box breakout) · Dukascopy tick/candle pipeline with caching · MT5 / TwelveData / replay feeds · matplotlib per-trade chart rendering · 23 unit tests.

**What it proves:** Rigorous backtesting methodology — distinguishing "implemented correctly" from "has
an edge," isolating variables instead of conflating them, and *reporting negative results honestly*
instead of overselling. The intellectual honesty here is a feature, not a weakness — frame it that way.

**Timeline:** 2026-07-10 → 2026-07-11.

---

## 4. Secondary / in-progress

### Instagram — build-in-public series
- **What:** A 6-part, day-by-day build diary of Sift (present-tense storytelling mapped to real commits), using the shipped apps as the credibility base and the next build as the live show. Week 2 = Dish2Cart/Blinkit, genuinely built live.
- **Status:** Week 1 fully scripted (second-by-second, HeyGen-ready); not yet filmed. Account created 2026-07-17, zero followers.
- **Stack:** HeyGen (AI avatar/voice) + real phone screen recordings + CapCut.
- **What it shows:** distribution instinct — turning built work into an audience, and writing about technical decisions for non-technical viewers.
- **Note for site:** probably a "currently" / "what's next" line rather than a portfolio card. `[[NEEDS: include or omit?]]`

### Reddit Pain Miner (prototype → became Idea Miner)
- Single-source (Reddit-only) Python prototype: FireCrawl scrape → Claude structured JSON → ranked terminal output. Superseded by the 8-platform, multi-agent Idea Miner. Mention only as origin story if useful.

---

## 5. Foundational / earlier work

`[[NEEDS: Mudit to confirm names, one-liners, dates, and any live links.]]`
From context files, before the July 2026 build sprint:
- **Dentistry website** — `[[NEEDS: details / link]]`
- **Newsletter automation** — `[[NEEDS: details / link]]`
- **FireCrawl web scraper** — `[[NEEDS: details / link]]` (likely the seed for Idea Miner's scraping layer)
- **~2 others** — `[[NEEDS: what were they?]]`

Suggested framing: a small "Foundations" strip — the tutorial-and-first-projects phase that came
before the shipped work. Keep it short; it's context, not the headline.

---

## 6. Skills & capabilities (evidence-backed)

Group these on the site; every item maps to a project above so nothing is claimed without proof.

**AI / ML engineering**
- On-device ML deployment: CLIP (int8/LiteRT) on Android, Whisper (MLX) + local LLM (Ollama) on macOS — *Sift, wisprlocal*
- Multi-agent systems: parallel critics + adjudicator design — *Idea Miner*
- MCP: building an MCP server (bearer auth, tools + resources) and integrating a third-party MCP (OAuth 2.1/PKCE) — *eyedropper, Dish2Cart*
- Vision-model-driven generation (design.md from images) — *eyedropper*
- LLM structured output & judgment on when *not* to use an LLM — *Idea Miner, Dish2Cart*

**Software engineering**
- Native Android (Kotlin, Compose, Material 3, Hilt, WorkManager) to a signed release — *Sift*
- Full-stack web (Next.js, Convex, Clerk orgs, Vercel) — *eyedropper, Dish2Cart*
- macOS systems programming (global hotkeys, accessibility, clipboard injection, app packaging) — *wisprlocal*
- Python data/automation pipelines (concurrent scraping, caching, rich CLIs) — *Idea Miner, GoldBot*
- Clean architecture / MVVM, safety-critical design, adapter patterns — *Sift, GoldBot*

**Engineering judgment (the differentiator)**
- Safety-first design for irreversible actions — *Sift's safety kernel*
- Rigorous, honest experimentation and negative-result reporting — *GoldBot*
- Latency instrumentation over guessing — *wisprlocal*
- Privacy-by-construction (on-device, BYOK boundaries) — *Sift, wisprlocal*

**Domains touched:** consumer mobile, developer tooling, quantitative trading, hospitality lead-gen, content/distribution.

---

## 7. How I work / toolchain

- **Sole environment:** Claude Code — every project above was built through it. `[[Mudit confirmed: only works from Claude Code as of now.]]`
- Treats AI as an engineering unlock (on-device inference, agentic pipelines, MCP), not a wrapper.
- Ships end-to-end: PRD/spec → phased build → signed release / public deploy. Documents decisions and reports results honestly.
- Uses his own tooling to choose work (Idea Miner picks projects; a persistent "wiki" + decision log capture learnings).

---

## 8. Contact & links

- **GitHub:** https://github.com/DARKNESTMUDIT
- **LinkedIn:** https://www.linkedin.com/in/mudit-ag/
- **Email:** mudit.agarwal10000@gmail.com  `[[confirm this is the public-facing address]]`
- **Instagram:** intentionally omitted for now (per Mudit).
- **Live product:** eyedropper — https://eyedropper-coral.vercel.app

---

## 9. Open items before publishing (`[[NEEDS]]` summary)

1. **Repo visibility per project.** Only *eyedropper* is confirmed public. For Sift, wisprlocal, Idea Miner, Dish2Cart, GoldBot: make public + link, or mark "case study only (private repo)."
2. **Sift download:** confirm the GitHub Releases APK URL and whether the `~/builds-site/` landing page is live/public.
3. **Dish2Cart:** is the Next.js app deployed anywhere (demo/mock mode)? If yes, live URL.
4. **Foundational work:** names, one-liners, dates, links for the dentistry site / newsletter automation / FireCrawl scraper / the ~2 others.
5. **Instagram series:** include as a portfolio item, or keep off-site for now?
6. **Email:** confirm mudit.agarwal10000@gmail.com is the address you want public, or supply an alternate/contact form.
7. **Metrics for punch** (optional but strong): real Sift photo-count/receipt-hunt numbers; any download/user counts; eyedropper usage.
8. **Headshot / brand:** any photo, logo, or color preference for the site? `[[NEEDS]]`
