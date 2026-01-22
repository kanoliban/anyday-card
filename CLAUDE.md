# CLAUDE.md - AnyDayCard

AI-powered personalized greeting cards with a wizard flow that captures recipient details to generate meaningful messages.

## Build Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # ESLint
```

## Product Overview

**Core flow:** Occasion → Recipient → Questions → Template → AI Message → Preview → Checkout

The wizard collects personalization data (name, relationship, occasion, vibe, traits) and generates AI-powered messages tailored to each recipient. Cards can be purchased as digital downloads or print-and-ship.

**Note:** The `/stamps` route is a placeholder/showcase feature. The real product is the card wizard at `/create`.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/create` | **Core product** - Wizard flow for card personalization |
| `/card` | Card gallery |
| `/card/[slug]` | Individual card detail |
| `/shop` | Shopping cart |
| `/shop/checkout` | Checkout flow |
| `/shop/checkout/success` | Order confirmation |
| `/stamps` | Placeholder/showcase (not core product) |
| `/about` | About page |

## Architecture

```
src/app/
├── create/                   # Core product - wizard flow
│   ├── wizard/              # Wizard components
│   │   ├── WizardShell.tsx  # Main wizard container
│   │   ├── questions.ts     # Question configs & step logic
│   │   ├── AnswerSummary.tsx
│   │   └── inputs/          # Input components (GridSelect, TextInput, etc.)
│   ├── components/          # Card display
│   │   ├── CanvasGrid/      # Card grid display
│   │   └── MetadataTable/
│   ├── constants.ts         # Card definitions
│   ├── models.ts            # Types (WizardStep, Card, WizardAnswers)
│   └── page.tsx
├── (main)/                  # Landing pages & shop
│   ├── card/               # Card gallery & detail pages
│   ├── shop/               # Cart, checkout, success
│   └── components/         # Shared UI (ThemeSwitcher, etc.)
├── api/                     # API routes
│   ├── generate/           # AI message generation (Gemini)
│   ├── checkout/session/   # Stripe checkout session creation
│   ├── webhooks/stripe/    # Stripe webhook handler
│   ├── feedback/
│   ├── analytics/
│   ├── sketches/
│   └── stats/
└── stamps/                  # Placeholder/showcase (not core product)
```

## Key Files

| Purpose | Location |
|---------|----------|
| Wizard questions & step logic | `src/app/create/wizard/questions.ts` |
| Wizard shell | `src/app/create/wizard/WizardShell.tsx` |
| Type definitions | `src/app/create/models.ts` |
| Card definitions | `src/app/create/constants.ts` |
| AI message generation | `src/app/api/generate/route.ts` |
| Stripe checkout | `src/app/api/checkout/session/route.ts` |
| Stripe webhooks | `src/app/api/webhooks/stripe/route.ts` |
| Stripe client | `src/lib/stripe.ts` |
| Input components | `src/app/create/wizard/inputs/` |

## Tech Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **State:** Zustand
- **Payments:** Stripe (checkout sessions + webhooks)
- **AI:** Google Gemini (message generation via `@google/generative-ai`)
- **Database:** Supabase
- **Animation:** Framer Motion
- **UI:** Radix primitives

## Wizard Flow

Steps defined in `questions.ts`:
1. `name` — Recipient's name (text input)
2. `relationship` — Who they are (grid select)
3. `occasion` — What's the occasion (grid select)
4. `vibe` — Tone of card (multi-select, max 2)
5. `humorType` — Type of humor (conditional, if vibe=funny)
6. `heartfeltDepth` — How deep (conditional, if vibe=heartfelt only)
7. `quickTraits` — Personality chips (optional)
8. `preview` — Generated message + card selection

Conditional logic via `showIf` functions. Navigation via `getNextStep`/`getPrevStep`.

## External Integrations

**Active:**
- **AI:** Google Gemini (message generation)
- **Payments:** Stripe (checkout + webhooks configured)
- **Database:** Supabase (orders table)

**Planned:**
- **Print Fulfillment:** Lob API (keys in `.env.local`)
- **Email:** SendGrid (for digital card delivery)
- **Analytics:** PostHog, Umami

## PRD Reference

Full product spec at:
`~/Desktop/Desktop/A Very Serious Company/AnyDay Card/PRD/`

Use the PRD for detailed feature specs, user flows, and business requirements.

## Development Notes

- Follow existing Tailwind patterns
- Use Zustand for wizard state
- Match wizard input component patterns in `wizard/inputs/`
- Card pricing: physical + digital variants with USD currency
- Wizard answers typed as `WizardAnswers` interface

---

## Context Persistence Protocol

**How new Claude Code sessions stay up to date:**

1. **This file (CLAUDE.md)** is auto-loaded when starting Claude Code in this directory
2. **Update the "Current Status" section below** at end of each session with:
   - What was accomplished
   - What's in progress
   - Known issues or blockers
3. **Commit CLAUDE.md changes** so context persists across machines/sessions

**Starting a new session:**
```bash
cd ~/Projects/anyday-card && claude
```

Claude automatically reads this file — no need for `git status` to "sync" context.

---

## Current Status

**Last updated:** 2025-01-22

**Recent changes:**
- Switched AI generation from Anthropic to Google Gemini (`gemini-2.0-flash`)
- Configured Stripe webhook handler (`/api/webhooks/stripe`)
- Added `STRIPE_WEBHOOK_SECRET` to `.env.local`
- Fixed Turbopack root configuration (prevents compilation hangs)
- Updated CLAUDE.md to reflect current architecture

**Completed features:**
- Wizard flow at `/create` (name, relationship, occasion, vibe, traits)
- AI message generation (Gemini with fallback templates)
- Card gallery at `/card`
- Shopping cart and Stripe checkout
- Webhook handler saves orders to Supabase

**Next up:**
- Lob integration for physical card printing
- Email delivery for digital cards
- End-to-end purchase flow testing

**Known issues:**
- Gemini API quota may be exceeded (fallback messages will be used)
- `Libertinus Serif` font fallback warning (cosmetic, doesn't affect functionality)

**Local development:**
```bash
npm run dev                    # Start Next.js dev server
stripe listen --forward-to localhost:3000/api/webhooks/stripe  # Webhook testing
```
