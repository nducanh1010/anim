# DESIGN.md — next_anim (Desktop OS GUI Specification)

## Identity sentence

An interactive Desktop Operating System canvas (`100dvh`) for a creative developer, inspired by **bychudy.com** (Mateusz Chudy). Visitors navigate a tactile digital workstation with draggable windows, desktop folders, interactive top menu bar, and rich project previews.

## Reference direction

**Miłosz Chudy** ([bychudy.com](https://www.bychudy.com)) is the primary visual and experiential reference:

- **Desktop OS Metaphor:** Viewport-locked workspace with custom desktop icons (Projects, About, Writings, Trash, Lab).
- **Interactive Window Management:** Multi-window capabilities with drag & drop, active/blur state stacking, traffic light controls (close, minimize, maximize), and smooth boundary-constrained positioning.
- **Top Menu Bar:** System logo, real-time clock (Ho Chi Minh City GMT+7), work status indicator, audio ambient switch, contact shortcuts.
- **Micro-tactility:** Magnetic cursor snaps to buttons, subtle window shadows, blurred translucent title bars, and origin-aware window open/close transitions.
- **Responsive Adaptation:** Full OS experience on desktop/tablet; clean mobile drawer/sheet navigation on smartphones.

## System Architecture

```
┌────────────────────────────────────────────────────────┐
│ Top Menu Bar: [Logo] [Works] [About]  [Time] [Status]  │
├────────────────────────────────────────────────────────┤
│ Desktop Canvas (100dvh - Studio Wallpaper Workspace)   │
│                                                        │
│  [Folder]      ┌─ [Window: Works] ──────────────────┐  │
│  Projects      │ • • •                              │  │
│                │ ---------------------------------  │  │
│  [File]        │ Grid of project cards & previews   │  │
│  About.txt     │ Scrollable content area            │  │
│                └────────────────────────────────────┘  │
│  [Terminal]                                            │
│  Console.app                                           │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Color & Surface Tokens

Uses OKLCH with frosted glass backdrop-filter:

- **Desktop Canvas (Wallpaper):** Minimalist studio neutral `oklch(14% 0.015 260)` with a subtle radial light vignette.
- **Window Chrome:**
  - Active Window: Background `oklch(20% 0.015 260 / 80%)`, border `1px solid oklch(100% 0 0 / 12%)`, backdrop blur `24px`.
  - Inactive Window: Background `oklch(17% 0.010 260 / 60%)`, opacity `0.85`, border `1px solid oklch(100% 0 0 / 6%)`.
  - Window Shadow: Layered elevation `0 24px 64px -12px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08)`.
- **Traffic Light Controls:**
  - Close: `oklch(62% 0.22 25)` (Refined coral red)
  - Minimize: `oklch(78% 0.18 85)` (Amber gold)
  - Maximize: `oklch(74% 0.19 145)` (Emerald mint)
  - Desaturated slightly in inactive state for visual hierarchy.
- **Text & Ink:**
  - System display: `oklch(96% 0.005 260)` (`--ink-strong`)
  - Body: `oklch(80% 0.010 260)` (`--ink`)
  - Muted/Metadata: `oklch(55% 0.010 260)` (`--ink-mute`)

## Typography

- **System UI / Menu Bar / Window Headers:** Clean geometric sans (Geist Sans) or Neo-Grotesk, font size 12px–13px, tracking +0.02em, medium weight.
- **Monospace Elements (Clock, Terminal, Tech specs):** Geist Mono, font size 11px–12px.
- **Project Detail Headings:** Bold editorial display font (`--font-display`), clamp(1.75rem, 3vw, 3rem).

## Motion & Interaction (Emil Kowalski Framework)

1. **Window Dragging:**
   - Powered by Framer Motion `drag` with `dragMomentum={false}` and boundary limits so windows cannot be dragged off-screen.
   - Cursor changes to `grabbing` on drag, `grab` on title bar hover.
2. **Window Stacking (z-index):**
   - Click anywhere on a window to bring it to top (`zIndex = Math.max(...allZ) + 1`).
   - Active window header highlights; inactive windows dim slightly.
3. **Origin-Aware Open/Close:**
   - Double-clicking a desktop icon calculates its viewport `(x, y)` and scales the window outward (`scale: 0.2 -> 1, opacity: 0 -> 1`) with custom spring `damping: 24, stiffness: 300`.
   - Closing animates back toward the icon before unmounting.
4. **Tactile Micro-interactions:**
   - Desktop icon hover: 2px lift, subtle halo glow.
   - Traffic lights: hover reveals tiny symbols (`×`, `−`, `+`), `:active scale(0.92)`.
   - Sticky Cursor & Magnetic pull on clickable interactive elements.

## Mobile Adaptation (<768px)

- Desktop dragging is disabled on mobile viewports.
- Icons display in a clean grid / dock.
- Clicking an icon opens a **Native-feeling Drawer / Bottom Sheet** or **Full-screen Modal** with a top drag-handle to swipe down and dismiss.
## Content structure in Windows

Each window renders a distinct type of content:
1. **Works Window (`Works/`):** List or grid of projects with cover preview, category badges, year, and case detail modals.
2. **About Window (`About.txt`):** Short documentary biography, philosophy, skills/tech stack, links to GitHub, X, LinkedIn.
3. **Journal Window (`Journal/`):** MDX posts / thoughts on engineering, craft, and art direction.
4. **Terminal / Lab Window (`Terminal.app`):** Interactive mini CLI / playground or live experiment selector.

## Content strategy (NDA-aware)

The site is a portfolio for applications. Most work is client-confidential,
so the row taxonomy and data shape must support what can be shown without
breaching NDA.

### Categories (frontmatter `kind`)

| Value     | Source                          | What to show                                                                                         |
| --------- | ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `case`    | Anonymized client engagement    | Role, scope, decisions, measurable outcome. No UI screenshots, no client name. **NDA badge inline.** |
| `project` | Self-initiated                  | Anything goes — screenshots, links, repo.                                                            |
| `writing` | `content/journal/*.md`          | Title + summary + reading time. The journal section.                                                 |
| `tool`    | Self-initiated tool / generator | Title + one-liner + repo link.                                                                       |
| `oss`     | Open source contribution        | Title + repo link + one-line impact.                                                                 |

A row's category is the **only** thing that distinguishes it visually. The
rest of the layout is identical across categories so the page reads as one
folio, not as four sections competing.

### Frontmatter shape

```yaml
---
title: "Onboarding flow for a fintech wallet"
kind: case # case | project | writing | tool | oss
year: 2025
nda: true # only meaningful for kind: case
role: "Lead frontend" # only for case
scope: "5 engineers, 4 mo" # only for case
outcome: "Activation +18%" # only for case
summary: "Reworked signup..."
cover: ["/images/case-fintech-1.jpg", ...] # optional, 0-3 images
---
```

`case` rows render with a small `under NDA — process only` mono eyebrow
next to the role. Not hidden — labeled. Honesty is the brand promise.

### What NOT to show

- ❌ Real client product screenshots
- ❌ Real client names, logos, or identifying copy
- ❌ Internal metrics with company attribution
- ❌ Code from private repos

The interview is where full case studies are shared. The portfolio is the
**invitation** to that interview.

### Counts and rhythm

Typical ranges:

- `case`: 3–6 entries (most are NDA-protected, so quality > quantity)
- `project`: 4–8 entries
- `tool`: 2–5 entries
- `oss`: 2–6 entries
- `writing`: 6+ (grows over time)

Total on the home page: cap at 12 rows initially, more on dedicated
`/work`, `/writing`, `/tools` routes. Home shows the latest 12 across all
categories, mixed (latest first).

## Components

- **Nav:** sticky top, paper surface, dark text. Wordmark left ("anh nd.")
  with teal period. Nav items right (home / journal / now) as wavy
  letters. Theme toggle on the far right.
- **Hero:** massive mixed-voice heading + body paragraph. Optional
  location/now line under the body paragraph in mono uppercase tracked.
- **Project row:** single link, 4-col grid:
  - **35%** title (display sans, weight 600)
  - **45%** description (body serif, 2-line clamp on desktop)
  - **15%** category tag (mono uppercase tracked, faint) + inline NDA
    badge when `kind: case && nda: true`
  - **5%** year (mono, right-aligned, faint)
    Hover inverts surface (light text on dark → dark text on light).
- **Image strip:** `<ul>` of `<li>` with `<Image>` inside, 3-up on desktop,
  stacked on mobile. Each `<li>` starts `opacity: 0` and fades in via
  `is-in` class on scroll enter. Empty state: row with `cover: []`
  renders no strip at all.
- **NDA badge:** mono uppercase `under NDA` in saffron tint, inline with
  the category tag. Same row height — never a separate row.
- **Footer:** "Folio©{year}⚗" signature line in mono.

## Accessibility

- All interactive elements meet 44×44 min tap target.
- `prefers-reduced-motion` floor already in `globals.css`.
- Dark surface + light text: `--ink-strong` on `--surface-0` exceeds AAA
  contrast. Teal accent reserved for non-text roles or paired with
  `--accent-ink` for text uses.
- `mix-blend-mode: difference`: test readability on inverted state; fall
  back to solid dark band if contrast fails.

## Anti-references

Match-and-refuse:

- ❌ Generic SaaS cream + teal CTA
- ❌ Card grids with shadowed rounded rectangles
- ❌ Gradient text / gradient backgrounds
- ❌ Hero metric (big number, small label, supporting stats)
- ❌ Emoji decoration scattered through copy (sparingly used symbols only)
- ❌ Identical card grids (icon + heading + text, repeated)
- ❌ Modal as first interaction
- ❌ Em dashes in copy (use commas, colons, semicolons, periods)
- ❌ Pure `#000` or `#fff` — every neutral tinted toward hue 80 (warm ochre)
- ❌ Teal accent used aggressively (full-bleed backgrounds, large filled
  buttons); teal is restrained ≤10%, mostly link underline / small chips

## Apply via

```bash
# Confirm brief, then implement piece by piece:
# Phase A: tokens (add --ease-olivier, --surface-invert, larger --text-display)
# Phase B: hero (with mix-blend-mode against localized dark band)
# Phase C: project list (4-col row with hover invert to dark)
# Phase D: image strip (with scroll entrance)
# Phase E: nav (wavy letters)
```
