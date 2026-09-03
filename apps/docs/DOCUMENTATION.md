# Docs coverage tracker

Living tracker for documenting the Gecko Elements docs site. Work happens on `docs-documentation`.

**Active phase:** 2.5 — complete (cluster-level product interrogation + guides close-out)  
**Next:** 2.5b — granular per-component pass  
**Parked:** Phase 3 (AI-ready files — blocked on 2.5b)

Update the status column when a page ships. Do not expand the template in Phase 1.

---

## Status values

| Status      | Meaning                                                                                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Done**    | Overview, Usage, Import, Composition, basic example, and all variants/controls. Live demo + matching copy-paste snippet. TOC in `component-sections.ts` updated. |
| **Partial** | Some of the template exists (often Overview + composition) but Usage, Import, or variants are incomplete.                                                        |
| **Todo**    | Gallery-style: short blurb + examples only.                                                                                                                      |

Gold standard pages: [Accordion](src/pages/accordion/index.tsx), [Alert](src/pages/alert/index.tsx), [Activity feed](src/pages/activity-feed/index.tsx) (Phase 1). Phase 2 gold: [Button](src/pages/button/index.tsx).

---

## Phase 1 template (required)

Every component page needs:

1. **Overview** — what it is (`PageOverviewHeader`)
2. **Usage** — when to use and when not to
3. **Import** — exact `@gecko/ui/components/...` snippet
4. **Composition** — ASCII tree of subcomponents (or state that there are none)
5. **Basic example** — live demo + snippet that matches (no empty placeholders)
6. **Variants / controls** — each real `variant` / `size` / behaviour prop, with “use this when”, demo, and snippet

Use `PageSection`, `PageSectionHeader`, `PageSubsectionHeader`, `ComponentExample`, `Code`.

**Not in Phase 1:** API tables, Related, Do/Don’t, styling-contract page, decision trees.

### Writing rules

- **Usage is human, not technical.** Follow Accordion: when to use it, when to avoid it. Do not explain props, `htmlFor`, or implementation in Usage.
- **Example and variant copy names the prop.** Follow Accordion First open: what it does using `<Code>propName</Code>`, then “Use this when…”. Engineers need the implementation hook without turning Usage into an API table.
- **Composition is optional.** Skip it for single primitives (Label). Include it only for compound components.
- **Do not add examples.** Keep the existing demos. No new variants or sections without explicit consent.
- **Example snippets are the component only.** No `import` lines in example code. Imports belong only in the Import subsection.
- **Shadcn-based** (no Custom badge): lean on [shadcn/ui docs](https://ui.shadcn.com/docs/components) for intent. Rewrite into Gecko voice, Gecko imports, and **our** variants/props. Do not copy Shadcn guidance that restyles chrome with `className`.
- **Custom** (listed in `src/config/custom-component-paths.ts`): write from `packages/ui/src/components/{name}.tsx` and the existing demos.
- **Do not invent product use cases.** Describe behaviour only. Do not name features, objects, or flows we have not confirmed. Specific purpose and usage will be filled in later, component by component.
- **Link recommended components.** If copy tells people to use another component, wrap the name in `DocsPageLink` to that page.

Always check the Gecko source before documenting variants — they often differ from Shadcn.

---

## Phase 1 batches

Tick a batch when every page in it is **Done**. Deferred pages do not block the tick.

- [x] **1 — Forms** — Field, Label, Input, Textarea, Checkbox, Radio group, Switch, Select, Combobox, Native select
- [x] **2 — Actions + feedback** — Button, Badge, Toast, Empty, Alert dialog, Spinner, Progress
- [x] **3 — Overlays** — Dialog, Sheet, Popover, Dropdown menu, Context menu, Command, Tooltip
- [x] **4 — Remaining Shadcn** — Direction and Kbd deferred
- [x] **5 — Custom components** — Chat bubble deprecated
- [x] **6 — Structure** — Page Container, Page Header, App Header, and App Sidebar done

Core (Color, Typography, Spacing, Radius, Shadows, Icons) stays as-is in Phase 1.

---

## Component pages

Source: `src/pages/gallery-data.ts`. Kind: Custom = `src/config/custom-component-paths.ts`.

### Done

| Page             | Kind     | Notes                                        |
| ---------------- | -------- | -------------------------------------------- |
| Accordion        | Shadcn   | Phase 1 gold; Phase 2                        |
| Activity feed    | Custom   | Phase 1 gold; Phase 2                        |
| Alert            | Shadcn   | Phase 1 gold; Phase 2                        |
| Alert dialog     | Shadcn   | Phase 2                                      |
| Attachment       | Shadcn   | Phase 2                                      |
| Avatar           | Shadcn   | Phase 2                                      |
| Avatar group     | Custom   | Phase 2                                      |
| Badge            | Shadcn   | Phase 2                                      |
| Breadcrumb       | Shadcn   | Phase 2                                      |
| Bubble           | Custom\* | Phase 2                                      |
| Button           | Shadcn   | Phase 2 gold                                 |
| Button group     | Shadcn   | Phase 2                                      |
| Calendar         | Shadcn   | Phase 2                                      |
| Card             | Shadcn   | Phase 2                                      |
| Charts           | Shadcn   | Phase 2 (Recharts)                           |
| Chat head        | Custom   | Phase 2                                      |
| Checkbox         | Shadcn   | Phase 2                                      |
| Code snippet     | Custom   | Phase 2                                      |
| Colour field     | Custom   | Phase 2                                      |
| Combobox         | Shadcn   | Phase 2                                      |
| Command          | Shadcn   | Phase 2 (cmdk; no Base UI)                   |
| Context menu     | Shadcn   | Phase 2                                      |
| Counter          | Custom   | Phase 2                                      |
| Data table       | Shadcn   | Phase 2 (TanStack; no Base UI)               |
| Date field       | Custom   | Phase 2                                      |
| Date picker      | Shadcn   | Phase 2 (Popover + Calendar)                 |
| Dialog           | Shadcn   | Phase 2                                      |
| Sortable list    | Custom   | Phase 2                                      |
| Drop zone        | Custom   | Phase 2                                      |
| Dropdown menu    | Shadcn   | Phase 2 (Base UI Menu)                       |
| Emoji picker     | Custom   | Phase 2                                      |
| Empty            | Shadcn   | Phase 2                                      |
| Field            | Shadcn   | Phase 2 (layout wrappers; no Base UI Field)  |
| File field       | Custom   | Phase 2                                      |
| File tree        | Custom   | Phase 2                                      |
| Filters          | Custom   | Phase 2                                      |
| Inline edit      | Custom   | Phase 2                                      |
| Input field      | Shadcn   | Phase 2                                      |
| Input group      | Shadcn   | Phase 2                                      |
| Label            | Shadcn   | Phase 2                                      |
| Marker           | Shadcn   | Phase 2                                      |
| Native select    | Shadcn   | Phase 2                                      |
| OTP field        | Shadcn   | Phase 2 (`input-otp`; not Base UI OTP Field) |
| Pagination       | Shadcn   | Phase 2                                      |
| Popover          | Shadcn   | Phase 2                                      |
| Progress         | Shadcn   | Phase 2                                      |
| Radio group      | Shadcn   | Phase 2                                      |
| Scroll area      | Shadcn   | Phase 2                                      |
| Select           | Shadcn   | Phase 2                                      |
| Separator        | Shadcn   | Phase 2                                      |
| Sheet            | Shadcn   | Phase 2 (Base UI Dialog, not Drawer)         |
| Sidebar          | Shadcn   | Phase 2                                      |
| Spinner          | Shadcn   | Phase 2                                      |
| Switch           | Shadcn   | Phase 2                                      |
| Table            | Shadcn   | Phase 2                                      |
| Tabs             | Shadcn   | Phase 2                                      |
| Textarea field   | Shadcn   | Phase 2                                      |
| Toast            | Shadcn   | Phase 2 (Base UI Toast)                      |
| Toggle           | Shadcn   | Phase 2                                      |
| Toggle group     | Shadcn   | Phase 2                                      |
| Tooltip          | Shadcn   | Phase 2                                      |
| Message          | Custom\* | Phase 2                                      |
| Message scroller | Custom\* | Phase 2                                      |
| Metric card      | Custom   | Phase 2                                      |
| Number field     | Custom   | Phase 2                                      |
| Reply box        | Custom   | Phase 2                                      |
| Search           | Custom   | Phase 2                                      |
| Sensitive field  | Custom   | Phase 2                                      |
| Telephone field  | Custom   | Phase 2                                      |
| Typing indicator | Custom   | Phase 2                                      |
| Page Container   | Custom   | Phase 2                                      |
| Page Header      | Custom   | Phase 2                                      |
| App Header       | Custom   | Compound `@gecko/ui` component               |
| App Sidebar      | Custom   | Compound `@gecko/ui` component               |

\*Not in `custom-component-paths.ts` but Gecko-specific. Treat as Custom for writing.

### Deferred

| Page      | Kind   | Notes                 |
| --------- | ------ | --------------------- |
| Direction | Shadcn | Batch 4 — not for now |
| Kbd       | Shadcn | Batch 4 — not for now |

### Deprecated

| Page             | Notes                                                                |
| ---------------- | -------------------------------------------------------------------- |
| Chat bubble      | Replaced by Message. Routed but not in the gallery. Do not document. |
| Menu (structure) | Replaced by AppSidebar. `/structure/menu` redirects.                 |

---

## Phase 2 template (required)

Follow [Button](src/pages/button/index.tsx). Talk as Gecko. Do not explain the Base UI split on the page.

1. **Do and don’t** — 3–6 pairs that match the demos on the page. Chrome, semantics, and labels. Use `DocsDoDont`.
2. **API** — one table of behaviour props on the Gecko component (`DocsApiTable`). One line linking to the [Base UI](https://base-ui.com/react/components) primitive for everything else. Do not split Gecko vs inherited tables. Do not dump `className` / `style` / HTML passthrough. If there are no behaviour props, omit the API section (and its TOC entry).
3. **Related** — “use X instead when…”, with `DocsPageLink`.

Use `DocsExternalLink` for Base UI. Base UI is the source of truth for inherited behaviour agents may need. Shadcn is composition and intent only — never copy chrome restyling.

Shared layout: `docs-do-dont.tsx`, `docs-api-table.tsx`, `docs-external-link.tsx`.

Guides section: `/guides/styling`, `/guides/choosing-components`, `/guides/recipes`.

---

## Phase 2 — complete

Gold: [Button](src/pages/button/index.tsx). Copy this page for every other component.

- [x] Button — Do/Don’t, API, Related (gold)
- [x] Accordion, Alert, Alert dialog, Attachment, Avatar
- [x] Activity feed, Avatar group
- [x] Badge, Breadcrumb, Bubble, Calendar, Card, Charts, Checkbox
- [x] Combobox, Command, Context menu, Data table, Date picker, Dialog, Dropdown menu, Empty
- [x] Field, Input, Label, Marker, Message, Message scroller, Native select, Pagination
- [x] Popover, Progress, Radio group, Scroll area, Select, Separator, Sheet, Sidebar
- [x] Spinner, Switch, Table, Tabs, Textarea, Toast, Tooltip, OTP
- [x] Remaining custom component pages, Header, and Container (same three sections)
- [x] Guides: Styling contract, Choosing components, Recipes

---

## Phase 2.5 — product interrogation

Phases 1–2 describe **what each component does**. They deliberately avoid product use cases ("Specific purpose and usage will be filled in later, component by component"). Phase 2.5 fills that gap before AI extraction.

### What this phase produces

For each cluster, interrogate real Gecko usage and update the existing pages:

- **Usage** — rewrite with product context: where it appears, which screens, which flows.
- **Do and don't** — replace generic component hygiene with Gecko-specific product decisions.
- **Related** — update with real composition rules ("Reply box always appears below a Message scroller").
- **Guides** — update Styling, Choosing components, and Recipes with any product-level rules discovered.

### Clusters

Work one cluster per session. Each covers 5–15 component pages.

- [x] **Conversation** — Chat head, Message, Message scroller, Reply box, Typing indicator, Bubble, Emoji picker
- [x] **Forms** — Field, Input, Textarea, Checkbox, Radio group, Switch, Select, Combobox, Native select, Number field, Date field, Date picker, Colour field, Telephone field, Sensitive field, Inline edit, OTP field, Attachment, Drop zone
- [x] **Page structure** — Header, Container, Sidebar, Tabs, Breadcrumb, Pagination, Scroll area, Separator
- [x] **Feedback** — Toast, Alert, Alert dialog, Empty, Spinner, Progress
- [x] **Data** — Table, Data table, Metric card, Charts, Filters, Search, Card, Sortable list, File tree
- [x] **Overlays & menus** — Dialog, Sheet, Popover, Dropdown menu, Context menu, Command, Tooltip
- [x] **Actions & status** — Button, Badge, Avatar, Avatar group, Counter, Marker, Accordion, Activity feed, Code snippet, Calendar, Label, File field

Still deferred / out of Phase 2.5: Direction, Kbd, Chat bubble (deprecated).

### Rules

- Do not invent use cases. Every product claim must come from the user or from confirmed Gecko usage.
- Treat the component pages and examples in `apps/docs` as evidence of intended usage and proper implementation. Cross-check them against the `packages/ui` source, and surface contradictions rather than silently choosing one.
- Do not use prototype implementations in `apps/projects/*` or `apps/sandbox` as evidence of intended component usage. These predate the documentation direction and may not reflect canonical placement, composition, variants, props, or styling.
- Update existing sections in place. Do not add new sections or examples without explicit consent.
- Components that appear in multiple clusters are updated once, in the cluster where they matter most.

Product context is captured in `CONTEXT.md` at the repo root.

**2.5 close-out (done):** Choosing components and Recipes guides updated with locked product decision rules and composition recipes. Forms spot-check confirmed Usage already matches `CONTEXT.md` for Field specials (Native select, Attachment / File field / Drop zone, Date field / Date picker, Colour field, Label); Native select / Select pairing clarified.

---

## Phase 2.5b — granular product pass

Phase 2.5 captures cluster-level product truth. It does not go deep enough for AI extraction on its own — variants, props, and per-demo Do/Don't still need a component-by-component pass.

### What this phase produces

For **each component page**, one focused session:

1. **Placement** — screens and flows where it appears (1–2 sentences).
2. **Canonical config** — default variant, size, and props in that context.
3. **Variant matrix** — each variant on the page: when in Gecko / when not.
4. **Props that matter** — behaviour props that change product meaning (not `className`).
5. **Do/Don't tied to demos** — each pair maps to something shown on the page.
6. **Related with composition rules** — real pairing rules, not generic alternatives.

Update existing sections in place. Do not add new demo sections without explicit consent.

### Order

Revisit after the Phase 2.5 cluster sweep. Priority:

1. Conversation components (most Gecko-specific)
2. Forms field specials and Field itself
3. Page structure
4. Feedback and Data
5. Remaining — Overlays & menus, Actions & status

### Rules

- Same as Phase 2.5: no invented use cases; every claim from the user or confirmed usage.
- Use `apps/docs` as the primary documentation evidence for each component, alongside its `packages/ui` implementation and `CONTEXT.md`.
- Exclude `apps/projects/*` and `apps/sandbox` when gathering product-usage evidence unless the user explicitly identifies a specific implementation as canonical.
- One component per session keeps the pass reviewable.
- Mark a page done in this section when all six outputs above are reflected on the page.

### Progress

- [x] Accordion — canonical `packages/ui/docs/accordion.md` created and the docs page and guides reconciled.
- [x] Activity feed — consolidated data interface and controlled pagination implemented; canonical package docs and human docs reconciled.
- [x] Alert — Shadcn action composition restored; Gecko variants, icons, dismissal, accessibility, package docs, human docs, and guides reconciled.
- [ ] Conversation — Chat head, Message, Message scroller, Reply box, Typing indicator, Bubble, Emoji picker
- [ ] Forms — Field and field specials (see Forms cluster list)
- [ ] Page structure — Header, Container, Sidebar, Tabs, Breadcrumb, Pagination, Scroll area, Separator
- [ ] Feedback — Toast, Alert, Alert dialog, Empty, Spinner, Progress
- [ ] Data — Table, Data table, Metric card, Charts, Filters, Card, Sortable list, File tree
- [ ] Remaining — Overlays & menus; Actions & status (cluster-level done in 2.5; granular pass still needed)

---

## Phase 3 — parked (AI-ready)

**Blocked on Phase 2.5b.** Cluster-level product context (2.5) is complete. Do not extract until the granular pass exists on each page.

| Deliverable                             | Role                                                  |
| --------------------------------------- | ----------------------------------------------------- |
| `packages/ui/AGENTS.md`                 | Styling contract, Field wrapping, no chrome overrides |
| `packages/ui/llms.txt`                  | Component picker + links                              |
| `packages/ui/docs/components/{name}.md` | Short per-component spec                              |
| `packages/ui/docs/recipes/*.md`         | Forms, overlays, feedback                             |
| Cursor / repo rule                      | Point agents at those files                           |
| Optional CI                             | Every UI component has a docs page + llm file         |

Parent index + one file per component. Keep files short. Source of truth remains the docs pages from Phases 1–2.

---

## Out of scope

- Changing component APIs
- Dual-writing TSX pages and LLM files in Phase 1
- Relying on the live docs URL as the agent knowledge base
- Deprecated components (Chat bubble)
