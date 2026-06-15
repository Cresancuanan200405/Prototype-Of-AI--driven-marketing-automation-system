Gradient & Color Scan Report

Summary
- Matches found: 159
- Common problematic pattern: `bg-gradient-to-* from-blue-500 to-purple-600` (used as primary button/background) and various `from-*-to-*` gradients including purple→pink, purple→blue, orange→red, and others.

Top affected files (high priority)
- src/app/pages/AIGenerator.tsx
- src/app/pages/HolidayMarketing.tsx
- src/app/pages/ContentStudio.tsx
- src/app/pages/CalendarScheduler.tsx
- src/app/pages/LandingPage.tsx
- src/app/pages/Profile.tsx
- src/app/pages/MissedPostRecovery.tsx
- src/app/pages/SocialPublishing.tsx
- src/app/pages/auth/Login.tsx
- src/app/pages/auth/Register.tsx
- src/app/pages/auth/Subscription.tsx
- src/app/pages/onboarding/* (multiple files)

Recommended replacements
1) Buttons
- Replace raw class-based gradients for action buttons with the `Button` component and the `variant="default"` or `variant="secondary"`.
  - Example: Replace
    - `className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg ..."`
    - with `<Button className="w-full" >Action</Button>` or `<Button variant="default">Action</Button>`
  - If a subtle gradient is desired, define `--gradient-primary` in `theme.css` and create a class `.bg-gradient-primary { background: linear-gradient(...); }` that uses tokenized colors.

2) Decorative icons / avatars
- Prefer `bg-accent` or `bg-secondary` tokenized solid fills. Replace small gradient circles with `bg-secondary` or `bg-accent` to avoid noise.

3) Large hero sections / landing backgrounds
- Replace full-section flashy gradients with `bg-primary` with an optional subtle overlay (low-opacity accent) or a tokenized gradient variable (e.g., `--gradient-hero`). Keep contrast and simplicity.

4) Todo / Codemod Suggestions
- Automated replace rule (grep & replace) for the most common pattern:
  - Find: `bg-gradient-to-(r|br|b) from-blue-500 to-purple-600`
  - Replace: `bg-primary text-primary-foreground` (for buttons) or `bg-card`/`bg-background` for sections.
- For other gradients (purple→pink, purple→blue), review by hand and replace with appropriate tokenized solid or subtle gradient.

Next actions
- Option A (safe): Create PRs per high-priority page converting button gradients to `Button` component usage and replacing small decorative gradients with `bg-secondary` or `bg-accent`.
- Option B (automated): Run a focused codemod to replace the `from-blue-500 to-purple-600` gradient pattern with tokenized classes (faster but higher risk).

I can proceed with Option A and refactor pages in priority order (AIGenerator, HolidayMarketing, ContentStudio, CalendarScheduler) — confirm and I will start editing the first page (`AIGenerator.tsx`).
