# UI/UX Redesign - TODO

## Phase 1 — Design Foundation
- [x] Update `src/styles/theme.css`:
  - [x] Set Navy Blue as primary brand color
  - [x] Set Blue as accent/accent buttons/links
  - [x] Keep White (and soft off-white) for backgrounds/cards
  - [x] Tune border, muted, input backgrounds, ring/focus colors
  - [ ] Normalize radius + define subtle enterprise shadow approach (if used by components)
  - [x] Improve typography base defaults (heading/body/labels) for BI readability
  - [x] Ensure dark mode surfaces use deep navy (no generic black)

## Phase 2 — Core UI Primitives
- [ ] Update `Button` (`src/app/components/ui/button.tsx`) to remove AI-slop motion (reduce `transition-all`)
- [ ] Update `Card` (`src/app/components/ui/card.tsx`) to unify radius + spacing density
- [ ] Update `Input` (`src/app/components/ui/input.tsx`) to align radius + subtle transitions
- [ ] Update `Badge` (`src/app/components/ui/badge.tsx`) to reduce decorative motion

## Phase 3 — Shared Layout System
- [ ] Standardize page containers + section spacing patterns (UI-only)

## Phase 4 — Page-Level Refactor
- [ ] Apply layout/spacing consistency across:
  - Dashboard
  - Analytics
  - Campaigns
  - Content Studio
  - Landing page
  - Auth + onboarding screens
- [ ] Ensure empty/loading/feedback states remain consistent

## Phase 5 — QA & Visual Verification
- [ ] Run app and verify desktop/tablet/mobile
- [ ] Check accessibility contrast + focus visibility
- [ ] Review empty/loading states and table usability
