# Graph Report - anim  (2026-11-25)

## Corpus Check
- 88 files · ~139,714 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 19 file(s) not represented in the graph (top: .css 5, .avif 5, .ico 4)

## Summary
- 788 nodes · 1768 edges · 42 communities (39 shown, 3 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 38 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b6ca5654`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- modern-screenshot.umd.js
- ripple/components/Model.jsx
- desktop-container.tsx
- live-accept.mjs
- live-browser.js
- next
- handleClick
- design-parser.mjs
- live-server.mjs
- resumeSession
- package.json
- impeccable-paths.mjs
- dependencies
- live-session-store.mjs
- barPaletteForTheme
- compilerOptions
- updateBarContent
- createLiveBrowserSessionState
- live-inject.mjs
- refreshParamsPanel
- renderAllPins
- cleanup-deprecated.mjs
- critique-storage.mjs
- ref_node_path
- pin.mjs
- ref_node_fs
- readLiveServerInfo
- live.mjs
- sendEvent
- eslint.config.mjs
- live-poll.mjs
- image-distortion/app/page.js
- scripts
- image-distortion/app/layout.js
- postcss.config.mjs
- react-dom@^19.0.0
- image-distortion/components/Model.jsx
- layout.tsx
- model.tsx
- nav.tsx
- visitors/page.tsx

## God Nodes (most connected - your core abstractions)
1. `react` - 38 edges
2. `handleClick()` - 18 edges
3. `handleKeyDown()` - 18 edges
4. `resumeSession()` - 18 edges
5. `createLiveBrowserSessionState()` - 16 edges
6. `updateBarContent()` - 16 edges
7. `next` - 16 edges
8. `compilerOptions` - 16 edges
9. `renderDesignVisual()` - 15 edges
10. `el()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `generateStaticParams()` --calls--> `getAllPosts()`  [EXTRACTED]
  app/blog/[slug]/page.tsx → lib/posts.ts
- `generateMetadata()` --calls--> `getPostBySlug()`  [EXTRACTED]
  app/blog/[slug]/page.tsx → lib/posts.ts
- `RootLayout()` --calls--> `Header()`  [EXTRACTED]
  app/layout.tsx → components/header.tsx
- `DesktopContainerProps` --references--> `Post`  [EXTRACTED]
  components/os/desktop-container.tsx → lib/posts.ts
- `DesktopIconProps` --references--> `WindowId`  [EXTRACTED]
  components/os/desktop-icon.tsx → lib/os/types.ts

## Import Cycles
- None detected.

## Communities (42 total, 3 thin omitted)

### Community 0 - "react"
Cohesion: 0.18
Nodes (6): Home(), Header, Framer(), index(), framer-motion, react

### Community 1 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (53): ae(), be(), bt(), Ce(), Ct(), de(), dt(), _e() (+45 more)

### Community 2 - "ripple/components/Model.jsx"
Cohesion: 0.22
Nodes (10): Model(), setNewWave(), trackMousePos(), Scene(), useDimension(), useMouse(), fragment, vertex (+2 more)

### Community 3 - "desktop-container.tsx"
Cohesion: 0.05
Nodes (64): BlogIndex(), metadata, formatDate(), generateMetadata(), generateStaticParams(), Params, PostPage(), Home() (+56 more)

### Community 4 - "live-accept.mjs"
Cohesion: 0.10
Nodes (38): hasGeneratedHeader(), HEADER_MARKERS, isGeneratedFile(), isGitIgnored(), acceptCli(), argVal(), deindentContent(), detectCommentSyntax() (+30 more)

### Community 5 - "live-browser.js"
Cohesion: 0.11
Nodes (36): buildCollapsible(), buildColorModels(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), copyToClipboard(), cssSafe(), escapeHtml() (+28 more)

### Community 6 - "next"
Cohesion: 0.12
Nodes (8): inter, metadata, Home(), Scene, inter, metadata, nextConfig, next

### Community 7 - "handleClick"
Cohesion: 0.13
Nodes (35): cleanup(), clearAnnotations(), clearScrollY(), clearSession(), closeTunePopover(), connectSSE(), desc(), scheduleAcceptCleanup() (+27 more)

### Community 8 - "design-parser.mjs"
Cohesion: 0.16
Nodes (31): buildColor(), CANONICAL_SECTIONS, collectBullets(), collectColorValues(), collectParagraphs(), detectFormat(), extractColors(), extractComponents() (+23 more)

### Community 9 - "live-server.mjs"
Cohesion: 0.10
Nodes (26): acknowledgePendingEvent(), annotRoot, args, broadcast(), CONTEXT_DIR, createRequestHandler(), { detectScript, sessionPath, livePath }, __dirname (+18 more)

### Community 10 - "resumeSession"
Cohesion: 0.14
Nodes (23): checkpointPayload(), clearHandled(), compileShader(), cycleVariant(), extractContext(), handleGo(), hideShaderOverlay(), id8() (+15 more)

### Community 11 - "package.json"
Cohesion: 0.13
Nodes (20): devDependencies, eslint@^9, eslint-config-next@15.1.5, postcss@^8, tailwindcss@^3.4.1, @types/node@^20, @types/react@^19, @types/react-dom@^19 (+12 more)

### Community 12 - "impeccable-paths.mjs"
Cohesion: 0.16
Nodes (19): CRITIQUE_DIR, firstExisting(), getDesignSidecarCandidates(), getDesignSidecarPath(), getImpeccableDir(), getLegacyLiveConfigPath(), getLegacyLiveServerPath(), getLiveAnnotationsDir() (+11 more)

### Community 13 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, framer-motion@^12.42.2, geist@^1.3.1, gray-matter@^4.0.3, gsap@^3.12.7, @gsap/react@^2.1.2, next@15.1.5, react@^19.0.0 (+12 more)

### Community 14 - "live-session-store.mjs"
Cohesion: 0.18
Nodes (15): getLegacyLiveSessionsDir(), parseArgs(), resumeCli(), applyEvent(), baseSnapshot(), COMPLETED_PHASES, createLiveSessionStore(), getReadableJournalPath() (+7 more)

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
Cohesion: 0.21
Nodes (16): appendOriginToDirective(), buildTagBlock(), commentClose(), commentOpen(), CONFIG_PATH, __dirname, findCspMetaTags(), getAttr() (+8 more)

### Community 20 - "refreshParamsPanel"
Cohesion: 0.22
Nodes (15): applyParamDefaults(), applyParamValue(), buildParamsPanel(), closedClipPath(), formatRangeValue(), getVisibleVariantEl(), hideParamsPanel(), openTunePopover() (+7 more)

### Community 21 - "renderAllPins"
Cohesion: 0.24
Nodes (15): beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), finalizeEditingPin(), initAnnotOverlay(), localCoords(), onAnnotDown() (+7 more)

### Community 22 - "cleanup-deprecated.mjs"
Cohesion: 0.30
Nodes (11): buildTargetNames(), cleanSkillsLock(), cleanup(), DEPRECATED_NAMES, findProjectRoot(), findSkillsDirs(), HARNESS_DIRS, isImpeccableSkill() (+3 more)

### Community 23 - "critique-storage.mjs"
Cohesion: 0.36
Nodes (11): kebab(), listSnapshotsForSlug(), main(), nowFilenameStamp(), parseFrontmatter(), readLatestSnapshot(), readTrend(), serializeFrontmatter() (+3 more)

### Community 24 - "ref_node_path"
Cohesion: 0.18
Nodes (10): detectCsp(), INLINE_HEADER_SIGNALS, LAYOUT_EXTS, MONOREPO_HELPER_SIGNALS, NUXT_ROUTE_RULES_SIGNALS, NUXT_SECURITY_SIGNALS, SCAN_EXTS, SKIP_DIRS (+2 more)

### Community 25 - "pin.mjs"
Cohesion: 0.23
Nodes (9): __dirname, findHarnessDirs(), generatePinnedSkill(), HARNESS_DIRS, loadCommandMetadata(), pin(), root, unpin() (+1 more)

### Community 26 - "ref_node_fs"
Cohesion: 0.27
Nodes (9): cli(), DESIGN_NAMES, FALLBACK_DIRS, firstExisting(), LEGACY_NAMES, loadContext(), PRODUCT_NAMES, resolveContextDir() (+1 more)

### Community 27 - "readLiveServerInfo"
Cohesion: 0.36
Nodes (8): readLiveServerInfo(), completeCli(), completeThroughServer(), parseArgs(), readServerInfo(), fetchServerStatus(), readServerInfo(), statusCli()

### Community 28 - "live.mjs"
Cohesion: 0.44
Nodes (8): __dirname, ensureServerRunning(), globToRegex(), resolveFiles(), liveCli(), runScript(), safeParse(), scanForDrift()

### Community 29 - "sendEvent"
Cohesion: 0.22
Nodes (8): bufferToBase64(), captureAndEmit(), captureElementToBlob(), collectFontCssText(), inlineFontUrls(), loadModernScreenshot(), maybePrefetchPage(), sendEvent()

### Community 30 - "eslint.config.mjs"
Cohesion: 0.22
Nodes (6): compat, __dirname, eslintConfig, __filename, @eslint/eslintrc@^3, @eslint/eslintrc

### Community 31 - "live-poll.mjs"
Cohesion: 0.50
Nodes (6): completionAckForAcceptResult(), completionTypeForAcceptResult(), buildPollReplyPayload(), pollCli(), postReply(), readServerInfo()

### Community 32 - "image-distortion/app/page.js"
Cohesion: 0.29
Nodes (3): Home(), lenis@^1.1.20, lenis

### Community 33 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 37 - "image-distortion/components/Model.jsx"
Cohesion: 0.21
Nodes (7): projects, Model(), Scene(), fragment, vertex, useDimension(), useMouse()

### Community 38 - "layout.tsx"
Cohesion: 0.21
Nodes (9): dnCursive, metadata, RootLayout(), themeScript, Footer(), links, greetings, Hello() (+1 more)

### Community 39 - "model.tsx"
Cohesion: 0.21
Nodes (11): RippleShader, RippleShaderComponent(), RippleShaderProps, Model(), setNewWave(), trackMousePos(), ModelProps, fragmentShader (+3 more)

### Community 40 - "nav.tsx"
Cohesion: 0.26
Nodes (8): Header(), Magnetic, MagneticProps, items, Navbar(), NavItem, StickyCursor(), StickyCursorProps

### Community 41 - "visitors/page.tsx"
Cohesion: 0.53
Nodes (4): metadata, VisitorsPage(), Now(), Section()

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `image-distortion/app/page.js`, `ripple/components/Model.jsx`, `desktop-container.tsx`, `image-distortion/components/Model.jsx`, `layout.tsx`, `model.tsx`, `nav.tsx`, `package.json`, `dependencies`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `handleClick()` (e.g. with `init()` and `teardown()`) actually correct?**
  _`handleClick()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `modern-screenshot.umd.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08583959899749373 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `desktop-container.tsx`, `layout.tsx`, `model.tsx`, `nav.tsx`, `visitors/page.tsx`, `package.json`, `dependencies`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `handleKeyDown()` (e.g. with `init()` and `teardown()`) actually correct?**
  _`handleKeyDown()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `desktop-container.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05220883534136546 - nodes in this community are weakly interconnected._
- **Why does `next-view-transitions` connect `desktop-container.tsx` to `nav.tsx`, `package.json`, `layout.tsx`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._