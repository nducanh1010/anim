# DESIGN.md — next_anim (NDA-aware revision, current palette kept)

## Identity sentence

A small, considered personal site for an independent builder. Editorial
cadence (generous whitespace, restrained palette, system-serif body),
animated just enough to feel alive without becoming a showpiece. Reads like
a folio or journal kept by hand — not a SaaS landing page, not a portfolio
reel.

## Reference direction

**Olivier Larose** ([olivierlarose.com](https://www.olivierlarose.com)) is the
single visual reference. Borrow the **craft**, not the palette:

- Massive mixed-voice display type (serif + script italic + pixel)
- `mix-blend-mode: difference` on hero text against a localized dark band
- One-line project list (4-col row: title / description / category / year)
  with hover invert
- Documentary image strip per project (3 images, no cards)
- Snappy ease `cubic-bezier(0.3, 0.2, 0.2, 0.8)`
- Wavy nav: per-letter spans, hover wave
- Locomotive-style smooth scroll (project already has `lenis`)

Do **not** clone his committed-dark monochrome strategy. next_anim stays on
the warm-ochre paper palette; the reference informs technique, not color.

## Color

- **Strategy:** Restrained. Teal accent ≤ 10% of surface. No gradients.
- **Tokens (already in `app/globals.css`):**
  - Surfaces: `--surface-0` paper-0, `--surface-1` paper-1, `--surface-2` paper-2
  - Ink: `--ink-strong`, `--ink`, `--ink-mute`, `--ink-faint`
  - Accent: `--accent` teal-5, `--accent-soft` teal-3, `--accent-ink`
  - Signature: `--signature` saffron (for the handwritten role only)
- **New commitment for this revision:** introduce a `--surface-invert`
  near-black surface (`oklch(14% 0.010 80)`) used **only** behind hero text
  with `mix-blend-mode: difference` and as the project-row hover target.
  The site stays paper-0 by default; this token exists for two specific
  moments of contrast.

## Typography

System stacks already in `app/globals.css`. This revision:

- **Display role:** sans display for bulk, script italic for flourish
  words, mono uppercase for tag-style eyebrows (three voices).
- **Hero scale:** push ceiling. Current `--text-display` clamps to `5.5rem`
  — raise to `clamp(3rem, 1.5rem + 9vw, 9rem)` so mixed-voice hero reads
  as the dominant element on the page.
- **Italic flourish:** saffron `--signature` color, vertical-align -0.05em.
- **Tracking:** tight on display (-0.02em), caps on eyebrows (+0.08em).

## Layout

- **Container:** keep 80rem max. Body prose at 65ch.
- **Hero:** full-bleed top band. Massive heading at left edge, body
  paragraph under it at `--text-lead`. No CTA button. Mix-blend-mode
  creates the inverted feel against any future light section.
- **Project list:** single `<a>` per project, 4-col grid on desktop
  (title 35% / description 45% / client 15% / year 5%). Hover inverts to
  light surface with dark text (the "quiet reveal" — color flip, not
  scale).
- **Image strip:** flex row of 3 images at `flex: 1 1 32%`, no rounded
  corners, no shadow. Aspect-ratio 4/3, mobile stacks.
- **Spacing rhythm:** `--space-9` top of hero, `--space-7` between
  sections, `--space-4` between project rows.

## Motion

- **Signature ease:** `--ease-olivier: cubic-bezier(0.3, 0.2, 0.2, 0.8)`.
  Snappy start, smooth settle. Use on project-row hover, image fade-ins,
  the wavy nav, any element that needs the "alive but not bouncy" feel.
- **Durations:** keep existing scale. Hero entrance at `--dur-entrance`
  (640ms) with `--ease-olivier`.
- **Scroll trigger:** `lenis` smooth scroll already in place. Hero text
  parallax at `scrub: 1` via gsap-scrolltrigger. Image strip per project
  fades in on enter with `stagger: 0.06`.
- **Wavy nav (CSS-only):** per-letter spans with `--i` custom property;
  hover stagger delay `calc(var(--i) * 22ms)`.

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
