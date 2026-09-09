# Elements dependency readiness audit

9 September 2026 · `codex/elements-package-readiness` · source commit `4fe4c64069b48dec053f39b58ff1ecfa8d27d438`.

Implementation follow-up: [dependency cleanup and validation](./dependency-cleanup.md). This audit and its snapshots describe the pre-cleanup baseline.

## Decision

Proceed with a small dependency cleanup and security-remediation step before building the distributable package. Do not upgrade everything to latest. The existing runtime baseline is suitable for continued packaging work, but it is **not a security-cleared release baseline** until the findings below are addressed and validation is rerun.

This audit changes no dependencies, lockfiles, component implementations or Admin files. Recommendations below are work for the next step, not completed fixes.

## Findings that affect the next step

| Priority | Finding | Recommended action |
| --- | --- | --- |
| First | `zod` is declared by UI but has no source, CSS, config or script use there. Documentation examples use it in `apps/docs`, which already declares it. | Remove the UI dependency; keep the docs application's dependency and its form recipes. Update the ownership guide so it does not imply UI currently implements schema validation. |
| First | `@turbo/gen` has no configured generator, script or import in this repository. `tsconfig.lint.json` still names a nonexistent `turbo` directory. | Remove the unused UI development dependency and stale include. Keep the root `turbo` task runner, which is used. |
| First | UI imports `shadcn/tailwind.css`, but no Shadcn JavaScript. This installs the entire CLI and its server/tooling dependencies in external consumers. | Preserve the required CSS, including custom variants and animations, as a self-contained build input with its MIT notice. Then move `shadcn` to development dependencies for the existing component-generation workflow. Do not delete the CSS import before replacing its contents. |
| First | The locked production audit has 16 affected package entries, all reachable through the Shadcn dependency tree. The full audit adds Vite and esbuild findings. | Separate the CLI from consumers, update remaining affected development/tooling trees, then audit the resulting lockfile and packed consumer again. Moving a dependency is not patching it. |
| Hold | Hugeicons `4.3.2` omits the per-icon declarations required by the library. | Keep `@hugeicons/core-free-icons` exactly `4.3.0` until a replacement passes a fresh packed-consumer test. |
| Hold | Sortable list uses the new DnD Kit packages together. `abstract` and `dom` are pinned, while `react` permits patch updates. | Keep all three on the tested `0.3.2` baseline; align the React package to an exact pin in the cleanup step. Treat a move to `0.5.0` as a coordinated migration. |
| Packaging | Tailwind is currently a development dependency even though the source stylesheet imports it. Shadcn and tw-animate-css are CSS dependencies, not browser JavaScript. | The compiled-CSS entry must need no consumer Tailwind toolchain. The optional Tailwind entry must document an explicit consumer Tailwind 4 dependency; bundle its supporting CSS so consumer compilation does not require the Shadcn CLI. Move tw-animate-css to development dependencies only after both delivered stylesheet modes are self-contained. |
| Integration | Elements uses Recharts 3; Admin still declares Recharts 2. | Preserve the planned Elements-owned chart primitive export. Do not upgrade Admin's existing charts or make Recharts 3 a mandatory replacement for its version 2 dependency. |

## What is actually used

The UI manifest has **23 ordinary dependencies**. Twenty have TypeScript/JavaScript import evidence (including type-only and dynamic imports), two are CSS-only (`shadcn`, `tw-animate-css`), and one has no UI usage (`zod`). The source scan found **no undeclared external import names**; this does not mean that the published CSS dependency contract is complete.

Counts in the evidence are import sites, not rendered components or bundle sizes. The AST scan includes the vendored scroller, re-exports, literal dynamic imports and import types. CSS imports are scanned separately. Configs, scripts and cross-workspace Zod usage were also inspected manually before identifying removal candidates.

### Runtime/type dependency baseline

These are **locked reference versions**, not blanket pins or a claim that every permitted version was tested. Keep them as the rollback/comparison baseline while preparing selected updates. “Candidate” is the registry's current version allowed by our range; it has not been newly validated by this audit.

| Dependency | Locked version | Ownership and next action |
| --- | --- | --- |
| `@base-ui/react` | 1.6.0 | Keep: 40 import sites across primitive wrappers. Candidate 1.8.0; validate focus, overlays, forms and generated types. |
| `@dnd-kit/abstract` | 0.3.2 | Keep: type import in Sortable list, also required in the DnD dependency graph. Type-only does not mean unused. Hold with the other DnD packages. |
| `@dnd-kit/dom` | 0.3.2 | Keep: Accessibility runtime and sortable types. Hold. |
| `@dnd-kit/react` | 0.3.2 | Keep: DragDropProvider and sortable hooks. Align exact pin; hold. |
| `@hugeicons/core-free-icons` | 4.3.0 | Keep exact pin: 151 per-icon import sites. Known failure in 4.3.2. |
| `@hugeicons/react` | 1.1.10 | Keep: Gecko icon renderer and types. |
| `@tanstack/react-table` | 8.21.3 | Keep: Data table state and public column types. Defer version 9. |
| `class-variance-authority` | 0.7.1 | Keep: component variants and variant types. |
| `clsx` | 2.1.1 | Keep: `cn` composition. |
| `cmdk` | 1.1.1 | Keep: Command wrapper. Its Radix internals are an approved implementation dependency, not evidence of an unused second UI system. |
| `date-fns` | 4.1.0 | Keep: Date picker formatting. Candidate 4.4.0; check date/locale output. |
| `frimousse` | 0.3.0 | Keep: Emoji picker. Its TypeScript peer is optional. |
| `input-otp` | 1.4.2 | Keep: OTP wrapper. Candidate 1.5.0; check paste, focus and controlled values. |
| `motion` | 12.42.2 | Keep: runtime use in Code and animation types. Candidate 12.43.0; defer version 13. |
| `react-colorful` | 5.6.1 | Keep: Colour picker. Candidate 5.8.1; check pointer/keyboard and controlled state. |
| `react-day-picker` | 9.14.0 | Keep: Calendar/Date picker types and runtime. Defer version 10. |
| `react-phone-number-input` | 3.4.16 | Keep: Telephone input and flags. Candidate 3.4.18; check country selection, parsing and ref forwarding. |
| `recharts` | 3.8.1 | Keep: Chart and Metric card. Candidate 3.10.1; check legend/tooltip types, fragment series, theme colours and React-is matching. |
| `shadcn` | 4.12.0 | CSS-only in UI. Move to development after making CSS self-contained; 4.21.0 is a tooling-update candidate, not automatically a security-complete fix. |
| `shiki` | 4.0.2 | Keep: dynamically loaded in Code. Candidate 4.4.3; verify highlighting, escaped fallback and lazy loading. It is not unused just because the import is asynchronous. |
| `tailwind-merge` | 3.5.0 | Keep: resolves utility conflicts in `cn`. Candidate 3.6.0, tested with the selected Tailwind version. |
| `tw-animate-css` | 1.4.0 | CSS build dependency. Keep its current declaration until both published CSS modes contain the required rules. |
| `zod` | 3.25.76 | Remove from UI; retain in docs. No reason to migrate Elements to Zod 4 for packaging. |

### Host peers and development tooling

- **React, React DOM and react-is:** retain `^18.3.1 || ^19.0.0` peers, with matching versions supplied by the host. The exercised baselines are 18.3.1 and 19.2.5. React DOM/react-is have no direct UI import sites but are still required peers; do not remove them based on the import count. The registry now advertises 19.2.8; that is a separate coordinated patch candidate, not tested evidence from this audit.
- **React types:** retain development copies (`@types/react` 19.2.14, `@types/react-dom` 19.2.3) and the isolated React 18 type fixture. Runtime components must not acquire a React-19-only type contract during declaration emission. Current patch candidates are 19.2.18 and 19.2.7.
- **Tailwind:** keep `tailwindcss` and `@tailwindcss/vite` aligned; baseline 4.3.1, candidate 4.3.3. The plugin declares compatibility with Vite 5–8. Test both CSS delivery modes and prototype visuals after an update.
- **TypeScript:** retain 5.9.3 for this preparation. The registry reports 7.0.2, but the installed typescript-eslint 8.59.2 declares TypeScript `>=4.8.4 <6.1.0`; this is a concrete reason not to jump to latest.
- **Lint:** retain `@eslint/js`/ESLint 9.39.4, react-hooks 7.1.1, react-refresh 0.4.26, globals 17.6.0 and typescript-eslint 8.59.2 as the comparison baseline. Compatible update candidates are recorded in the JSON. Prioritise affected transitives; defer ESLint 10 and unrelated lint-rule migrations. These dependencies are used by the ESLint configuration even though they have no component import sites.
- **Node:** audit commands ran on Node 22.21.1/npm 10.9.4. Use a maintained Node 22 patch satisfying Vite's requirements for the packaging/CI baseline. The repository's `>=20` engine declaration is broader than its Vite toolchain (`^20.19.0 || >=22.12.0`); clarify that minimum when packaging. `@types/node` is currently 25.6.0: align it with the chosen build runtime in the tooling step rather than upgrading it to 26. No Node built-in or `NodeJS` source usage was found in UI itself.
- **Generator:** remove `@turbo/gen` 2.9.9 as above. The root task runner is separate and remains in use.

Peer metadata for every inventoried package is preserved in the evidence, including optional peers. Declared support for React 18/19 is consistent across the directly imported React packages; the existing browser/type fixtures provide stronger evidence than metadata alone.

## Security findings and exposure

| Audit command | Affected package entries | Severity breakdown |
| --- | --- | --- |
| `npm audit --workspace @gecko/ui --json` | 18 | 10 high, 4 moderate, 4 low, 0 critical |
| `npm audit --workspace @gecko/ui --omit=dev --json` | 16 | 9 high, 4 moderate, 3 low, 0 critical |

These are npm package-entry counts, **not counts of unique vulnerabilities or confirmed exploits**. Both commands inspect the current lockfile; fresh consumer resolution can select other versions. The raw responses include all advisory URLs and version ranges.

All 16 production findings have a locked dependency path from `shadcn`. No finding in this response maps to the dependency/optional-dependency closure of another UI ordinary dependency. The trace excludes peer edges, and npm audit is not a complete security assessment.

| Affected package | Severity | Representative install path |
| --- | --- | --- |
| `@babel/core` | Low | shadcn → @babel/core |
| `@hono/node-server` | Moderate | shadcn → @modelcontextprotocol/sdk → @hono/node-server |
| `baseline-browser-mapping` | Moderate | shadcn → browserslist → baseline-browser-mapping |
| `body-parser` | Low | shadcn → @modelcontextprotocol/sdk → express → body-parser |
| `brace-expansion` | High | shadcn → ts-morph → @ts-morph/common → minimatch → brace-expansion |
| `browserslist` | High | shadcn → browserslist |
| `express-rate-limit` | Moderate, inherited | shadcn → @modelcontextprotocol/sdk → express-rate-limit → ip-address |
| `fast-uri` | High | shadcn → @modelcontextprotocol/sdk → ajv → fast-uri |
| `hono` | High | shadcn → @modelcontextprotocol/sdk → hono |
| `ip-address` | High | shadcn → @modelcontextprotocol/sdk → express-rate-limit → ip-address |
| `js-yaml` | High | shadcn → cosmiconfig → js-yaml |
| `nanoid` | High | shadcn → postcss → nanoid |
| `postcss` | High | shadcn → postcss |
| `postcss-selector-parser` | Low | shadcn → postcss-selector-parser |
| `qs` | Moderate | shadcn → @modelcontextprotocol/sdk → express → qs |
| `undici` | High | shadcn → undici |
| `vite` | High; development audit only | workspace Vite toolchain, locked 7.3.2 |
| `esbuild` | Low; development audit only | Vite → esbuild, locked 0.27.7 |

The Shadcn closure contains 288 installed package paths; 282 are exclusive to it **among UI's ordinary dependency roots**, excluding peer edges. This is an install-footprint indicator, not a prediction that 282 packages disappear from the monorepo or browser bundle: development tools may still need them.

UI source imports only the Shadcn CSS file, not its server/CLI modules. The findings therefore establish an unnecessary vulnerable tooling installation surface, not demonstrated browser execution. Shadcn command execution and processing untrusted registry/config inputs require separate consideration while that tool remains installed.

Examples checked against primary advisories:

- [Vite deny-list bypass](https://github.com/advisories/GHSA-fx2h-pf6j-xcff): applies to particular Windows/NTFS paths with an exposed development server. The 7.x fix begins at 7.3.5. This supports updating the affected 7.x toolchain; it is not evidence that deployed static docs expose those files.
- [Undici cache disclosure/crash](https://github.com/advisories/GHSA-4cwx-7wf7-3272): the affected installation is under Shadcn, rather than an Elements component making browser requests through Undici.
- [PostCSS source-map file disclosure](https://github.com/advisories/GHSA-r28c-9q8g-f849): relevant to tooling processing affected inputs; the audit contains additional PostCSS findings, so satisfying this one advisory alone is not a complete remediation.

npm reports a fix available for all 18 entries. That is registry advice, not a verified compatible update plan. Do not use `npm audit fix --force`. Refresh patched versions within compatible ranges, inspect the resulting graph, and rerun both audits and tests. Moving the CLI to development should remove this production path once the CSS no longer imports it, but that must be verified in a clean packed consumer.

## External and integration constraints

- The approved Frimousse emoji data request uses jsDelivr; the shared stylesheet also loads Geist Mono from Google Fonts. npm audit does not cover these network resources. Preserve the documented emoji exception; the packaging plan already calls for locally served font assets.
- Retain the vendored MessageScroller MIT notice and React compatibility changes; reinstalling the upstream React-19-only implementation is not a dependency cleanup.
- Host-authored icon, chart and table recipes that import a third-party package need an explicit supported dependency or an Elements-owned export. Do not rely on npm hoisting as the public API.
- The selected runtime ranges are wider than the locked/tested versions. After the next update step, raise lower bounds to the versions actually supported and tested where appropriate; keep exact pins for documented exceptions. Do not claim that a lockfile fixes the versions installed by external consumers.
- Generated declaration portability and compiled-CSS delivery remain separate blockers from runtime compatibility. The earlier planning probe found ChartLegendContent and EmojiPickerTrigger declaration errors. This audit does not repair or retest those errors.

## Recommended execution order for step two

1. Remove unused UI Zod and generator declarations; preserve application-owned Zod use.
2. Make Shadcn's CSS self-contained, then move its CLI to development. Account for tw-animate-css in both distribution modes before changing its ownership.
3. Remediate the affected tooling/transitive dependency graph within supported major versions, including the existing Vite 7 line. Rerun full and production-only audits; record any remaining finding with its actual path and exposure.
4. Evaluate compatible runtime candidates in small groups: primitives/forms; dates/telephone; charts/highlighting; animation/styling. Release-note review and targeted tests determine which upgrades are worth taking. Major upgrades listed above remain deferred.
5. Record the resulting exact lockfile baseline and preserved ranges/pins, then rerun React 18/19 packed-consumer tests, source typechecks, all five application builds and MessageScroller regression. Add targeted Sortable list, date/colour/telephone and OTP interaction checks when those dependencies change; the current broad fixture does not fully exercise them.

## Evidence and reproduction

- [Dependency inventory, locked/installed versions, peer constraints, registry candidates and mapped advisory paths](./dependency-evidence.json)
- [Full npm audit response](./npm-audit.json)
- [Production-only npm audit response](./npm-audit-production.json)
- [Read-only inventory script](./inspect-dependencies.mjs)
- Existing React verification: [compatibility results](../../tests/react-compat/RESULTS.md)
- Ownership rules: [approved dependencies](../../packages/ui/docs/dependencies.md)

From the repository root:

```sh
node docs/package-readiness/inspect-dependencies.mjs > /tmp/elements-dependency-inventory.json
npm outdated --workspace @gecko/ui --json
npm audit --workspace @gecko/ui --json
npm audit --workspace @gecko/ui --omit=dev --json
```

An exit code of 1 from outdated/audit is expected when updates or advisories are found; the captured runs returned valid reports. The JSON snapshot records the source commit, lockfile SHA-256, Node/npm versions and audit date. Advisory data changes independently of the repository.

No new installation, upgrade, automatic fix, component test run or browser-bundle reachability analysis was performed in this audit. Prior compatibility passes remain prior evidence, not tests rerun here. User reported the post-pin CI run succeeded; this audit did not independently inspect that remote run. The audit includes UI development dependencies and relevant transitive tooling; it is not a full security review of every prototype or the Gecko Admin repository.
