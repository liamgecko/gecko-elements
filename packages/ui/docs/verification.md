# Verification and coverage

## Commands

Run from the monorepo root with the supported Node version and dependencies installed:

| Command | What it verifies |
| --- | --- |
| `npm run generate:capabilities` | Rebuilds the human and machine indexes from declared contracts, source imports and curated integration boundaries. |
| `npm run check:contracts` | Index drift, recipe contract rules, and negative tests for those rules. |
| `npm run typecheck` | Library and consuming applications. Docs uses `tsc -b` to check its referenced project, including every shared recipe imported by the docs page. |
| `npm run test:recipes` | Fixture/recipe types and real-browser async form, header, navigation guard, remote collection, combobox and upload scenarios. |
| `npm run test:rich-text-editor` | Serializer unit tests and real vendored TinyMCE browser scenarios, including edit/save/remount. |
| `npm run build --workspace docs` | Production documentation build, exact executable examples and runtime assets. |
| `npm run build:package` | Public library JavaScript, declarations and distribution assets. |
| `npm run test:react-compat -- 18` / `-- 19` | Existing packed-consumer React compatibility suite; independent of the application recipes. |
| `npm run test:package:tailwind -- 18` / `-- 19` | Existing Tailwind consumer distribution checks. |

Install Chromium once with `npx playwright install chromium`. Locally, `PLAYWRIGHT_CHANNEL=chrome` selects an already-installed Chrome. Browser tests start their own local Vite server and close it and the browser in cleanup. Screenshots are written under `.artifacts/recipes/` (ignored by Git); CI uploads them. These tests use sample data and simulated API adapters, never customer records.

The Application contracts workflow runs contract checks, types, production docs and browser suites on pull requests. The existing React compatibility workflow continues to cover React 18 and 19. A local pass is not a claim that hosted CI or production has run.

## Automated scenarios

- Form validation focuses the required input; Save and Submit for approval use the same validation. Duplicate save activation creates one request. Edits made during save remain dirty. Failure permits retry. Unmounted actions ignore late completion.
- Known title and all header actions keep their geometry through loading and tab changes; Save is not disabled by tabbing. Dirty tabs open AlertDialog. Cancel preserves edits/focus; Discard restores the baseline and proceeds once. Failed initial content fetch is retryable.
- Remote selection reopens the complete list, ignores stale query completions, retains an operable input after failure and resets when its parent identity changes.
- Unknown usage does not invent table rows. Confirmed and cached empty results render Empty without pagination. Failed refresh preserves known content and offers retry. Remote sorting preserves visible rows.
- Independent uploads block Save until all settle. Failure releases only the corresponding pending state; retry succeeds. A removed file cannot publish a late result into the saved form values.
- Desktop minimum width and dark-mode rendering are captured. Header geometry assertions detect staged action insertion in the example. This is not a comprehensive visual-diff baseline for every component.
- TinyMCE loads real full-page HTML, edits and remounts, preserving head CSS, nested tables, template tokens and Unicode semantically (entity/whitespace normalization is expected). Font menu geometry, read-only state, light/dark chrome, asset failure/retry, independent instances and controlled replacement during startup are exercised. Cleanup runs before iframe detachment; the suite checks for browser exceptions.

## Static rule scope

`scripts/check-application-contracts.mjs` defaults to the shared application recipes. Consumers can run `node scripts/check-application-contracts.mjs /absolute/path/to/consumer/src` from this repository to audit additional source directories. It deliberately does not lint primitive library internals as application usage.

The TypeScript AST checks direct forbidden UI imports (including literal dynamic imports/require), native `alert`/`confirm`, an explicit size on application Cards, and statically provable required Input/Textarea-to-label associations. It allows the documented TanStack type-only import exception and approved per-icon glyph imports. Negative fixtures verify that checks actually reject invalid examples.

This is a focused contract checker, not a complete ESLint, accessibility or security engine. It does not prove runtime data flow, resolve arbitrary wrapper components, spread/dynamic props, computed imports, aliased global calls, semantic button wording, backend behaviour or authorization. Native dialog detection is syntactic; locally shadowed functions named `confirm`/`alert` should be renamed or reviewed rather than assumed to be browser calls. Dynamic requiredness and custom field composition need runtime coverage. Follow dependency policy for any exception; do not bypass a rule merely to silence it.

## Consumer integration acceptance

Run the [migration checklist](migration-checklist.md) against the real source application. In particular, verify router Back/Forward and native link handling with the consumer's router blocker, actual API permissions/query support, provider approval, translated copy, production CSP/runtime deployment and real upload/scan failures. The router-neutral recipe verifies the decision lifecycle; it does not install a framework router or intercept every native navigation automatically.

For editor upgrades, keep a representative, non-sensitive HTML corpus from each supported editor mode. Check rendered output in the relevant delivery clients, authored URLs and styles, sanitization boundaries, language packs and coexistence with any legacy editor. An isolated editor iframe is not a security sandbox. Do not approve an engine upgrade solely because the sample corpus passes.

Before handover, record command results, screenshots checked and remaining integration gaps. Avoid marking an unrun scenario as passed or describing static checks as complete product parity.

## Local verification recorded 2026-09-16

- Six contract-rule tests passed; generated index verified for 78 contracts.
- Thirteen application recipe browser scenarios and four real TinyMCE browser scenarios passed using installed Chrome and the workspace React 19 runtime.
- Three serializer unit tests passed.
- Monorepo typecheck, docs production build and library package build passed.
- Packed React 18.3.1 consumer checks passed in development and production, including public-module imports, refs, forms, dialogs, menus, toasts and cleanup. The packaging check explicitly permits only the two pinned TinyMCE icon TTFs and verifies their licence/provenance.
- Light/dark screenshots were inspected. The docs build retains its large-chunk warning; the new workflow has not yet run on hosted CI.
