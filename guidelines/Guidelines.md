**Add your own guidelines here**
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

## Anti-AI-Slop Design Skill
Triggered when working on UI components, pages, or design suggestions. Enforces polished, human-quality design.

### Rules
- **Design Consistency**: Use existing design tokens (`--color-*`, `--radius-*`, `--spacing-*`). No ad-hoc sizes/colors/fonts.
- **Accessibility (WCAG AA)**: Contrast ≥ 4.5:1, visible keyboard focus, descriptive alt text, associated form labels, semantic HTML.
- **Intentional Layout**: Meaningful hierarchy, consistent alignment, no filler placeholders or repetitive generic cards.
- **Visual Refinement**: Polished variants from design system, consistent icon sizing, designed empty/loading/error states.
- **Avoid Excessive Gradients**: Minimize heavy gradients (especially purple→pink). Prefer tokenized solid colors.
- **Performance & Size**: SVG/optimized images, purposeful animations with `prefers-reduced-motion` respect, lazy-load below-fold.
- **Content Quality**: Realistic copy or `// TODO:` comments, action-oriented button labels, human-readable error messages.

### Compliance Checklist
Include with each UI change: [ ] Design tokens used  [ ] Contrast OK  [ ] Alt text present  [ ] Focus indicators  [ ] Semantic HTML  [ ] No excessive gradients  [ ] No filler content  [ ] Performance note  [ ] Consistent spacing


# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
