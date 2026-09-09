# Gecko Admin migration to Elements: refreshed investigation

Reviewed 9 September 2026. This replaces the earlier assessment of Admin `d16f38f`. Current evidence is from **branch `production`, commit `68f9dc325126226a0bacd41b827ad2f44717fe0d`**, which was clean during inspection. Although the preceding discussion referred to master, the inspected checkout is production. This is local repository evidence, not confirmation of what is deployed. Elements remains at `7fc705f49d5bac5a998665963f09c6484a60c867`.

## Assessment

Migrating the React App to Elements remains feasible and worthwhile. It gives production and prototypes a shared, Gecko-owned component interface and documented usage contracts. It is a presentation and behavior migration, not a change of import paths. Existing authentication, data hooks and domain logic provide useful foundations to preserve.

**The immediate recommendation is to make Elements demonstrably compatible with React 18, then prove external package consumption in the real App's environment.** Keep React 19 prototype support. Do not upgrade the App as part of that preparation. This is a readiness recommendation, not a claim that Elements already supports React 18 or an implementation plan.

The biggest correction is scope: this checkout still has an active Angular/React split. A complete Elements replacement of the React App would not replace all Gecko workflows. Preserve Angular navigation and authentication unless a separate Angular migration is explicitly included.

## What changed since the first investigation

| Finding | Earlier checkout | Current checkout |
| --- | --- | --- |
| App React / React DOM | 18.3.1 | **Still 18.3.1** |
| App build tooling | Vite 5 | Vite 8.2.2; React plugin 6.1.1 |
| Design tooling | Create React App | Vite 8.2.2 and Vitest 4.1.11 |
| Design React | 18.2.0 | Still 18.2.0 |
| Runtime Angular redirects | Previously assessed as inactive | Active transition hook and configuration |
| Checked-in app-config entries | 89, none marked Angular | 71, including 10 marked Angular |
| App entry | Public/authenticated split | Direct authenticated App; Bootstrap imported globally |
| Route registration | Deferred/lazy route machinery | Static module-state imports; earlier preload files absent |
| Sentry startup | Deferred | Synchronous before application boot |

Version evidence: [App/package.json](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/package.json>), [App/package-lock.json](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/package-lock.json>), [Design/package.json](</Users/liamyoung/Repos/Gecko-Admin-Web-App/Design/package.json>), [Design/package-lock.json](</Users/liamyoung/Repos/Gecko-Admin-Web-App/Design/package-lock.json>). Both projects now declare Node `^20.19.0 || >=22.12.0`. Current startup and routes: [App/src/main.jsx](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/main.jsx>), [App/src/App.jsx](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/App.jsx>), [App/src/Router/states.jsx](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Router/states.jsx>).

These are differences between checkouts, not evidence of a linear removal of features or tests. The previous `public-experience.scss`, PublicRsvp consumer, AuthenticatedApp and route-preload findings are withdrawn for the current checkout. The previous central ReactSelect portal/z-index example is also absent and is not current evidence. Archived reports are retained solely for provenance under `snapshots/d16f38f/`.

## How the library and application are built

Elements is a TypeScript source package with component subpath exports. Its manifest remains `private: true`, version `0.0.0`, with exports pointing directly at TS/TSX and no package build script. React and React DOM are ordinary dependencies at `^19.2.4`, not a consumer-owned peer contract. This works as internal monorepo source sharing; it is not yet the selected private-npm distribution contract. External readiness needs a versioned artifact, usable JavaScript and declarations or an explicitly agreed source-consumption pipeline, stylesheet/asset delivery, and a tested dependency contract. [packages/ui/package.json](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/package.json>)

Design remains a styled React Bootstrap environment despite its build-tool modernization. Its Sass scripts compile Bootstrap CSS and copy it into `App/src/Styles/gecko-react-bootstrap.css`. The App imports React Bootstrap directly and imports that generated stylesheet globally. Design is not currently the owner of a published React component package consumed by App. [Design/package.json](</Users/liamyoung/Repos/Gecko-Admin-Web-App/Design/package.json>), [App/src/main.jsx:1](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/main.jsx:1>), [App/src/Components/Ui/index.jsx:1](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/Ui/index.jsx:1>)

Elements' desktop application scope and component contracts remain relevant. The modernization of Vite removes an older tooling mismatch, but does not establish React compatibility or package portability. [packages/ui/README.md](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/README.md>), [packages/ui/docs/dependencies.md](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/docs/dependencies.md>)

## React 18 readiness remains a prerequisite

The App is still on React 18.3.1 in both manifest and lockfile. Elements' React 19 dependency declaration cannot be treated as out-of-the-box React 18 support. Simply widening a version range would not validate source behavior, third-party dependencies or generated types.

There are concrete issues to address. Elements Input and Button are ordinary function wrappers accepting props that include refs; React 18 needs an appropriate forwarding boundary for consumer refs. The installed `@shadcn/react` 0.2.0 dependency declares React and React types `>=19`, and its message-scroller implementation needs explicit review. Base UI's support for React 18 does not automatically extend to every wrapper or other dependency in Elements. [packages/ui/src/components/input.tsx:26](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/src/components/input.tsx:26>), [packages/ui/src/components/button.tsx:61](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/src/components/button.tsx:61>), [node_modules/@shadcn/react/package.json](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/node_modules/@shadcn/react/package.json>)

The right acceptance evidence is the packaged library running under the App's React 18.3.1 and under the prototypes' React 19, with one matching React/React DOM runtime per application. Validate refs, forms, overlays, focus restoration and dependency installation, alongside types and builds. Do not claim full support based only on a monorepo typecheck. No compatibility changes were made in this refresh.

## Current migration footprint

The static inventory was rerun against the current App source tree:

| Measure | Earlier checkout | Current checkout |
| --- | ---: | ---: |
| JS/JSX/TS/TSX source files | 1,629 | 988 |
| Production source files under inventory definition | 1,102 | 810 |
| Test files | 509 | 162 |
| CSS/SCSS files | 131 | 95 |
| Production React Bootstrap import statements | 85 | 63 |
| Production files directly importing React Bootstrap | 59 | 40 |
| Those files inside / outside shared Ui directory | — | 21 / 19 |
| Production files importing Buttons wrapper | 169 | 96 |
| Production files importing ListView wrapper | 74 | 47 |
| Production files importing Modal wrapper | 66 | 26 |
| Production files importing Ui barrel | 294 | 255 |

Counts overlap and cannot be summed. The scanner counts static `import ... from` declarations, not dynamic imports, re-exports, rendered instances or complete screens. Test-file count is not tested coverage. [Current inventory and methodology](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/docs/ui-migration/legacy-inventory.json>)

There is significant reusable reach through shared wrappers, but the Ui barrel also directly exports Bootstrap Button and other primitives. Updating the shared Buttons wrapper affects its consumers; it does not automatically replace the separately exported Button or direct imports. Screen-by-screen acceptance remains necessary even when component replacement has broad reach. [App/src/Components/Ui/index.jsx:1](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/Ui/index.jsx:1>), [App/src/Components/Ui/Buttons/index.jsx:161](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/Ui/Buttons/index.jsx:161>)

## Behavioral migration costs that remain

| Area | Current evidence | Implication |
| --- | --- | --- |
| Buttons | Shared wrapper includes promise protection and ref forwarding | Preserve double-submission behavior, loading, translation and link/button semantics, not just appearance |
| Form fields | Existing adapters translate DOM events and option objects into application values | Review the application value contract before replacing controls |
| Advanced choices | React Select and Async Select, with remote loading; separate creatable fields | Elements Combobox does not currently approve remote search or creation as an existing capability |
| Lists | useListViewProps owns remote fetches and URL page/filter/sort state | Elements DataTable currently expects complete client-side data; server-driven behavior needs a reviewed extension or appropriate composition |
| Modal/dialog/drawer | Existing close/exit callbacks; Drawer disables enforceFocus | Preserve completion timing and focus behavior; mixed overlay systems require interaction testing |
| Domain fields | Telephone and upload components contain application-specific behavior | A visually similar primitive does not replace the service workflow |

Sources: [App/src/Components/Ui/Buttons/index.jsx:137](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/Ui/Buttons/index.jsx:137>), [App/src/Components/Ui/Form/Fields/index.jsx](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/Ui/Form/Fields/index.jsx>), [App/src/Components/Ui/Form/Fields/AdvancedSelect/index.jsx](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/Ui/Form/Fields/AdvancedSelect/index.jsx>), [App/src/Components/Ui/Form/Fields/CreatableSelect/index.jsx](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/Ui/Form/Fields/CreatableSelect/index.jsx>), [App/src/Hooks/useListViewProps/index.jsx:61](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Hooks/useListViewProps/index.jsx:61>), [App/src/Modules/Categories/index.jsx:24](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Modules/Categories/index.jsx:24>), [App/src/Components/Ui/Modal/index.jsx:49](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/Ui/Modal/index.jsx:49>), [App/src/Components/Ui/Drawer/index.jsx:63](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/Ui/Drawer/index.jsx:63>), [App/src/Components/Ui/Form/Fields/FileUpload/Hooks/useFileAvStatus/index.tsx](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/Ui/Form/Fields/FileUpload/Hooks/useFileAvStatus/index.tsx>), [App/src/Components/Ui/Form/Fields/Telephone/index.jsx](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/Ui/Form/Fields/Telephone/index.jsx>). Library limits: [packages/ui/docs/data-table.md:231](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/docs/data-table.md:231>), [packages/ui/docs/combobox.md:222](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/docs/combobox.md:222>).

These are blockers to particular workflow replacements, not reasons to delay a minimal package integration proof. React Bootstrap removal also does not automatically mean replacement of every editor, chart, date or drag-and-drop dependency.

## CSS: refreshed measurements confirm coexistence costs

The audit recompiled actual Elements styles and compared them with the CSS currently copied into App. It found **111 overlapping simple class names** from 4,225 scanned candidates. Examples include spacing, border, color, shadow and layout utilities. Matching names are a collision surface, not proof that all 111 visibly break every screen.

Synthetic Chromium probes using the real stylesheets reproduced the earlier result:

| Probe | Elements alone | Both stylesheets, either order |
| --- | --- | --- |
| Root font size | 16px | 14px |
| `h-8 text-sm` height / font size | 32px / 14px | 28px / 12.25px |
| Heading styled with `text-sm` | 14px | About 18px |

Setting a wrapper font size to 16px did not repair root-relative sizing. Removing utility collisions alone would still leave global element rules and the document root. Bootstrap's unlayered and important declarations also mean import order alone is insufficient. A naive Tailwind prefix change failed on existing unprefixed `@apply bg-primary` usage. Prefixing would require a deliberate library/source/consumer strategy, not only a build toggle. [Refreshed raw measurements](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/docs/ui-migration/css-coexistence-audit.json>), [Reproduction script](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/docs/ui-migration/css-coexistence-audit.mjs>)

Therefore, do not remove Bootstrap utilities globally as the opening move: existing screens use them, and it would introduce a separate legacy regression surface without resolving all style conflicts. If same-document coexistence is selected, prepare and verify an explicit compatibility strategy. If a clean React App cutover is selected, defer migration-only prefix work until there is another demonstrated need.

## Active application and deployment boundaries

CloudFront's default origin targets Angular; `/admin` and `/admin/*` target React, with separate Design paths. The React transition hook fetches app-config, checks redirect keys, aborts relevant transitions and performs full-document navigation to Angular. The 10 Angular-marked entries include integrations, user settings/forms, contact and broadcast workflows. They are configuration entries, not a full inventory of Angular screens. [IaC/Resources/CloudFront.yml:25](</Users/liamyoung/Repos/Gecko-Admin-Web-App/IaC/Resources/CloudFront.yml:25>), [App/src/Router/setup.jsx:18](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Router/setup.jsx:18>), [App/src/Router/routerAppRedirect/index.jsx](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Router/routerAppRedirect/index.jsx>), [App/public/app-config/index.json](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/public/app-config/index.json>)

This is a real document boundary: Angular CSS need not coexist with Elements in the React document. It is not an existing selector between old and new versions of the React App. Preserve navigation across that boundary during initial integration and eventual release.

Within React, the shell renders global dialogs, toasts, loading, header and navigation. Routes import module states eagerly. A clean Elements preview therefore needs an intentional entry/import graph and shell boundary; adding a new screen alone does not remove the legacy presentation around it. [App/src/App.jsx:35](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/App.jsx:35>), [App/src/Components/AppLayout/index.jsx:16](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/AppLayout/index.jsx:16>), [App/src/Router/states.jsx:3](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Router/states.jsx:3>)

Stage and production workflows run tests/builds, then sync assets with `--delete`. S3 versioning is suspended in checked-in configuration. No immutable release promotion/rollback or Elements cohort selection was demonstrated. Sentry now starts synchronously and includes a release identifier. Missing Vite assets still trigger an immediate reload, which can interrupt unsaved work. A significant cutover needs retained matching artifacts and rehearsed rollback. [.github/workflows/deploy-app-production.yml:65](</Users/liamyoung/Repos/Gecko-Admin-Web-App/.github/workflows/deploy-app-production.yml:65>), [IaC/Resources/S3Buckets.yml:12](</Users/liamyoung/Repos/Gecko-Admin-Web-App/IaC/Resources/S3Buckets.yml:12>), [App/src/main.jsx:8](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/main.jsx:8>), [App/src/main.jsx:25](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/main.jsx:25>)

## Confidence and next decision

The broad conclusion is unchanged: make Elements production-consumable, preserve application behavior, and choose rollout boundaries deliberately. The current evidence strengthens the case for React 18 readiness first and changes the scope of a full cutover to the current React App, with Angular handoffs retained.

The refreshed [rollout comparison](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/docs/ui-migration/rollout-options.md>) separates that decision from initial package integration. No migration strategy is approved by this report, and no application or library code was changed.

Verification performed: current manifest/lockfile and source inspection, import inventory rerun, stylesheet compilation and isolated Chromium computed-style probes. The earlier Elements typecheck is historical evidence only; it was not rerun here. No fresh App dependency installation, App build/test run, authenticated workflow test, production bundle measurement, cloud inspection or rollout rehearsal was performed. Existing node_modules in Admin may reflect another checkout and were not treated as current dependency evidence.
