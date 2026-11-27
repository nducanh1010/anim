# Graph Report - next_anim  (2026-11-27)

## Corpus Check
- 94 files · ~129,786 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 19 file(s) not represented in the graph (top: .css 5, .avif 5, .ico 4)

## Summary
- 825 nodes · 1836 edges · 37 communities (33 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7c0cf6da`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sync-agents-skills.mjs
- modern-screenshot.umd.js
- react
- posts.ts
- live-accept.mjs
- live-browser.js
- next
- handleClick
- design-parser.mjs
- live-server.mjs
- resumeSession
- package.json
- [slug]/page.tsx
- dependencies
- live-session-store.mjs
- barPaletteForTheme
- compilerOptions
- updateBarContent
- createLiveBrowserSessionState
- live-inject.mjs
- refreshParamsPanel
- renderAllPins
- next-view-transitions
- hello.tsx
- theme-toggle.tsx
- ripple/app/layout.js
- sendEvent
- eslint.config.mjs
- image-distortion/app/page.js
- scripts
- image-distortion/app/layout.js
- postcss.config.mjs
- desktop-container.tsx
- layout.tsx
- nav.tsx
- visitors/page.tsx
- ripple/app/page.js

## God Nodes (most connected - your core abstractions)
1. `react` - 42 edges
2. `resumeSession()` - 18 edges
3. `handleClick()` - 18 edges
4. `handleKeyDown()` - 18 edges
5. `next` - 17 edges
6. `compilerOptions` - 16 edges
7. `updateBarContent()` - 16 edges
8. `createLiveBrowserSessionState()` - 16 edges
9. `renderDesignVisual()` - 15 edges
10. `useWindowManager()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `generateStaticParams()` --calls--> `getAllPosts()`  [EXTRACTED]
  app/blog/[slug]/page.tsx → lib/posts.ts
- `generateMetadata()` --calls--> `getPostBySlug()`  [EXTRACTED]
  app/blog/[slug]/page.tsx → lib/posts.ts
- `BlogIndex()` --calls--> `getAllPosts()`  [EXTRACTED]
  app/blog/page.tsx → lib/posts.ts
- `Home()` --calls--> `getAllPosts()`  [EXTRACTED]
  app/page.tsx → lib/posts.ts
- `RootLayout()` --calls--> `Header()`  [EXTRACTED]
  app/layout.tsx → components/header.tsx

## Import Cycles
- None detected.

## Communities (37 total, 4 thin omitted)

### Community 0 - "sync-agents-skills.mjs"
Cohesion: 0.13
Nodes (21): AGENTS_DIR, buildPlaceholders(), CLAUDE_DIR, DRY_RUN, DST_RULES, DST_SKILLS, ensureDir(), loadCommandNames() (+13 more)

### Community 1 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (53): ae(), be(), bt(), Ce(), Ct(), de(), dt(), _e() (+45 more)

### Community 2 - "react"
Cohesion: 0.06
Nodes (33): RippleShader, RippleShaderComponent(), RippleShaderProps, Model(), setNewWave(), trackMousePos(), ModelProps, fragmentShader (+25 more)

### Community 3 - "posts.ts"
Cohesion: 0.23
Nodes (11): generateStaticParams(), getAllPosts(), getPostSlugs(), normalizeDate(), PostFrontmatter, POSTS_DIR, PostWithHtml, readPostFile() (+3 more)

### Community 4 - "live-accept.mjs"
Cohesion: 0.10
Nodes (38): hasGeneratedHeader(), HEADER_MARKERS, isGeneratedFile(), isGitIgnored(), acceptCli(), argVal(), deindentContent(), detectCommentSyntax() (+30 more)

### Community 5 - "live-browser.js"
Cohesion: 0.11
Nodes (36): buildCollapsible(), buildColorModels(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), copyToClipboard(), cssSafe(), escapeHtml() (+28 more)

### Community 6 - "next"
Cohesion: 0.18
Nodes (5): inter, metadata, nextConfig, next@15.1.5, next

### Community 7 - "handleClick"
Cohesion: 0.13
Nodes (35): cleanup(), clearAnnotations(), clearScrollY(), clearSession(), closeTunePopover(), connectSSE(), desc(), scheduleAcceptCleanup() (+27 more)

### Community 8 - "design-parser.mjs"
Cohesion: 0.16
Nodes (31): buildColor(), CANONICAL_SECTIONS, collectBullets(), collectColorValues(), collectParagraphs(), detectFormat(), extractColors(), extractComponents() (+23 more)

### Community 9 - "live-server.mjs"
Cohesion: 0.06
Nodes (56): kebab(), listSnapshotsForSlug(), main(), nowFilenameStamp(), parseFrontmatter(), readLatestSnapshot(), readTrend(), serializeFrontmatter() (+48 more)

### Community 10 - "resumeSession"
Cohesion: 0.14
Nodes (23): checkpointPayload(), clearHandled(), compileShader(), cycleVariant(), extractContext(), handleGo(), hideShaderOverlay(), id8() (+15 more)

### Community 11 - "package.json"
Cohesion: 0.13
Nodes (20): devDependencies, eslint@^9, eslint-config-next@15.1.5, postcss@^8, tailwindcss@^3.4.1, @types/node@^20, @types/react@^19, @types/react-dom@^19 (+12 more)

### Community 12 - "[slug]/page.tsx"
Cohesion: 0.36
Nodes (7): formatDate(), generateMetadata(), Params, PostPage(), PostBody(), Props, getPostBySlug()

### Community 13 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, framer-motion@^12.42.2, geist@^1.3.1, gray-matter@^4.0.3, react@^19.0.0, react-dom@^19.0.0, @react-three/drei@^10.7.7, @react-three/fiber@^9.6.1 (+7 more)

### Community 14 - "live-session-store.mjs"
Cohesion: 0.06
Nodes (50): buildTargetNames(), cleanSkillsLock(), cleanup(), DEPRECATED_NAMES, findProjectRoot(), findSkillsDirs(), HARNESS_DIRS, isImpeccableSkill() (+42 more)

### Community 15 - "barPaletteForTheme"
Cohesion: 0.18
Nodes (17): barPaletteForTheme(), buildDesignHeader(), defangOutsideHandlers(), designPanelCss(), detectPageTheme(), fetchDesignSystem(), initActionPicker(), initBar() (+9 more)

### Community 16 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 17 - "updateBarContent"
Cohesion: 0.22
Nodes (17): actionLabel(), buildConfigureRow(), buildConfirmedRow(), buildCyclingRow(), buildDots(), buildGeneratingRow(), buildSavingRow(), el() (+9 more)

### Community 18 - "createLiveBrowserSessionState"
Cohesion: 0.20
Nodes (14): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+6 more)

### Community 19 - "live-inject.mjs"
Cohesion: 0.07
Nodes (42): __dirname, ensureServerRunning(), globToRegex(), appendOriginToDirective(), buildTagBlock(), commentClose(), commentOpen(), CONFIG_PATH (+34 more)

### Community 20 - "refreshParamsPanel"
Cohesion: 0.22
Nodes (15): applyParamDefaults(), applyParamValue(), buildParamsPanel(), closedClipPath(), formatRangeValue(), getVisibleVariantEl(), hideParamsPanel(), openTunePopover() (+7 more)

### Community 21 - "renderAllPins"
Cohesion: 0.24
Nodes (15): beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), finalizeEditingPin(), initAnnotOverlay(), localCoords(), onAnnotDown() (+7 more)

### Community 22 - "next-view-transitions"
Cohesion: 0.36
Nodes (6): BlogIndex(), metadata, formatDate(), PostList(), next-view-transitions@^0.3.5, next-view-transitions

### Community 23 - "hello.tsx"
Cohesion: 0.33
Nodes (5): greetings, gsap@^3.12.7, @gsap/react@^2.1.2, gsap, @gsap/react

### Community 24 - "theme-toggle.tsx"
Cohesion: 0.53
Nodes (5): MoonIcon(), readInitialTheme(), SunIcon(), Theme, ThemeToggle()

### Community 29 - "sendEvent"
Cohesion: 0.22
Nodes (8): bufferToBase64(), captureAndEmit(), captureElementToBlob(), collectFontCssText(), inlineFontUrls(), loadModernScreenshot(), maybePrefetchPage(), sendEvent()

### Community 30 - "eslint.config.mjs"
Cohesion: 0.22
Nodes (6): compat, __dirname, eslintConfig, __filename, @eslint/eslintrc@^3, @eslint/eslintrc

### Community 32 - "image-distortion/app/page.js"
Cohesion: 0.29
Nodes (3): Home(), lenis@^1.1.20, lenis

### Community 33 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, start, sync:agents

### Community 36 - "desktop-container.tsx"
Cohesion: 0.07
Nodes (47): Home(), GlitchText(), GlitchTextProps, SpoilerText(), SpoilerTextProps, DESKTOP_PROJECTS, DesktopCanvas(), DesktopCanvasProps (+39 more)

### Community 38 - "layout.tsx"
Cohesion: 0.24
Nodes (8): dnCursive, metadata, RootLayout(), themeScript, Footer(), links, Hello(), SkipLink()

### Community 40 - "nav.tsx"
Cohesion: 0.24
Nodes (8): Header(), Magnetic, MagneticProps, items, Navbar(), NavItem, StickyCursor(), StickyCursorProps

### Community 41 - "visitors/page.tsx"
Cohesion: 0.53
Nodes (4): metadata, VisitorsPage(), Now(), Section()

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `image-distortion/app/page.js`, `desktop-container.tsx`, `nav.tsx`, `package.json`, `dependencies`, `hello.tsx`, `theme-toggle.tsx`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `handleClick()` (e.g. with `init()` and `teardown()`) actually correct?**
  _`handleClick()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `sync-agents-skills.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `react`, `desktop-container.tsx`, `layout.tsx`, `nav.tsx`, `visitors/page.tsx`, `ripple/app/page.js`, `[slug]/page.tsx`, `package.json`, `ripple/app/layout.js`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `handleKeyDown()` (e.g. with `init()` and `teardown()`) actually correct?**
  _`handleKeyDown()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `modern-screenshot.umd.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08583959899749373 - nodes in this community are weakly interconnected._
- **Why does `next-view-transitions` connect `next-view-transitions` to `desktop-container.tsx`, `layout.tsx`, `nav.tsx`, `package.json`, `[slug]/page.tsx`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._