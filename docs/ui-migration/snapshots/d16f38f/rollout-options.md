# Elements migration: gradual adoption versus a complete cutover

9 September 2026. Investigation of alternatives; no rollout strategy has been approved or implemented.

## Recommendation

**Prefer investigating a complete replacement build, developed screen by screen, before investing in production support for mixed Bootstrap and Elements.** If that build can achieve the required feature coverage within a manageable development period, this removes substantial temporary styling and interaction work.

For release, my preferred candidate is a complete replacement with an internal preview and, if the delivery work is proportionate, a small pilot in which each user receives the whole new application. Then switch the remaining users. This preserves one UI system per document without making all users the first production test group. A single general release after internal acceptance is also reasonable; the pilot is an option, not a prerequisite disguised as a requirement.

This preference is conditional. The repos establish that coexistence is difficult; they do not establish that finishing the entire migration quickly is easy. A lengthy backlog, continuous high-volume changes to the same screens, or a need to ship partial improvements early could make gradual adoption the better overall choice.

The [original technical assessment](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/docs/ui-migration/admin-app-assessment.md>) remains the source for the component inventory, React/package gaps and measured CSS conflicts. This document compares delivery strategies and adds evidence about app boundaries and deployment.

## 1. Separate three decisions

| Decision | Choices | Proposed direction |
| --- | --- | --- |
| How we implement | Screen/workflow at a time, or shared component at a time | Complete workflows, reusing component work underneath. |
| What runs in a browser document | Both UI systems, or one complete UI system | One complete system where practical. |
| Who receives changes | Individual screens, selected whole-app users, or everyone together | Complete-app preview; consider a small whole-app pilot; then general release. |

Screen-by-screen development does not require screen-by-screen production release. Conversely, gradual user exposure does not require mixing libraries inside a page.

Separate deployments can use independent dependency installations and React versions. A runtime flag inside the existing React tree is not equivalent: it does not isolate dependency resolution, global CSS or portals. A whole-app selection must choose the appropriate entry/build before mounting the application, and switching versions should use a full document navigation. This is a proposed architecture, not an existing feature of the repo.

## 2. Side-by-side comparison

| Dimension | A: Gradual screens in the existing app | B: Complete migration, single general cutover | C: Complete migration, whole-app pilot then cutover |
| --- | --- | --- | --- |
| First production benefit | Available after the first ready workflow | Waits for the complete agreed scope | Usually waits for the same complete scope; pilot feedback comes before everyone switches |
| CSS work | Must support old/new rules, resets, root sizing and overlays together | Can retire old document styling as a whole | Same document isolation as B |
| Prefix requirement | Strong practical reason to namespace Elements | Can defer migration-specific prefix work | Can defer it for the same reason |
| Shared wrapper changes | Global replacement risks affecting untouched production screens; often needs temporary adapters/flags | Can replace broadly inside the migration build and validate affected workflows before release | Same as B |
| Incomplete complex screen | Can remain legacy while other screens ship | Delays cutover unless explicitly excluded through a safe separate boundary | Still blocks readiness for pilot users who need it |
| Production exposure | Can limit by workflow and, if implemented, cohort | Entire audience can encounter defects after cutover | Limits initial audience, though the pilot sees the whole changed app |
| Engineering overhead | Mixed UI contracts, flags, cross-system testing and eventual cleanup | Preview build, synchronisation with product work, completion coverage and cutover preparation | B plus stable version selection, parallel hosting and cohort operations |
| Feedback | Real production use early in migration | Internal/stage feedback until launch | Internal feedback during development, then limited real use |
| Rollback | Can disable a workflow only if its JS, styles and shared changes can all be rolled back | Restore the previous complete frontend | Reassign users to the previous complete frontend |
| Main risk | Prolonged compatibility complexity and a migration that never finishes | Long-lived divergence, the last difficult workflows and broad release impact | Those completion risks plus extra release-routing work |

These are relative engineering judgments, not measured costs or delivery estimates. None of the options eliminates packaging, functional parity, regression testing or operational preparation.

## 3. What a complete cutover genuinely saves

The original CSS probe measured 111 overlapping simple selectors, and an Elements `h-8 text-sm` element changed from 32px/14px to 28px/12.25px with the legacy stylesheet present. Changing stylesheet order did not repair it. With one document stylesheet owner, we can remove those competing rules rather than maintain a compatibility layer. [Measurements](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/docs/ui-migration/css-coexistence-audit.json>).

Likely avoidable work includes:

- A migration-specific prefix/codemod across Elements and its prototype consumers, if other consumers do not independently need that namespace.
- Making Elements' rem sizing coexist with the legacy 14px document root.
- Keeping Bootstrap and Base UI modal/focus/stacking systems interoperable in the same workflows.
- Per-screen production switches and temporary versions of shared presentation wrappers.
- Repeated validation of old, new and mixed appearance states throughout an extended migration.

However, the new app still needs a deliberate style baseline, tested overlays, font delivery and an audit of retained third-party components. Keeping react-select, rich editors or Bootstrap-dependent rendered content can retain part of the styling problem. Removing the npm dependency alone is not evidence that the document is independent of legacy CSS.

Work that remains under every strategy includes the external package, React compatibility, server-backed tables, async/creatable fields, translations, application event/lifecycle contracts and behavioral regression tests. Elements' DataTable still requires complete client-side data, and its Combobox contract does not approve inventing remote-search/creation behavior. [DataTable contract](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/docs/data-table.md:298>), [Combobox contract](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/docs/combobox.md:213>), [current package](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/package.json:1>).

Separate old/new builds let the migration build move to React 19 without moving the old production build in the same step. Dependencies retained inside the new build still need React 19 compatibility work; existing react-beautiful-dnd's peer range stops at React 18. Public experiences in the same new build also share its runtime unless explicitly separated. [Locked peer range](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/package-lock.json:8825>), [public/authenticated entry selection](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/App.jsx:13>).

## 4. New repository findings that affect the decision

### The document boundary needs more work than deleting the Bootstrap import

`main.jsx` conditionally imports the full Bootstrap stylesheet only for authenticated experiences. But `App.jsx` unconditionally imports `public-experience.scss`. That stylesheet also sets `html` to 87.5%, body to 14px, and global heading, paragraph, link and input styles. Therefore those rules can remain in a new Admin document even after removing `gecko-react-bootstrap.css`.

For a clean cutover, move public styling behind the appropriate public entry boundary or otherwise establish explicit ownership. Verify the complete imported CSS graph, including fallback/loading and third-party styles. This is concrete boundary work under B/C; A instead needs to keep the competing systems working together. [Conditional Bootstrap import](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/main.jsx:32>), [unconditional public import](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/App.jsx:11>), [public global rules](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Styles/public-experience.scss:3>).

### A screen is not an isolated application surface today

Authenticated routes are wrapped by auth, contexts, query state and AppLayout. AppLayout always provides header/navigation and global dialog, toast and loading wrappers. The global Dialog renders Bootstrap Modal. Replacing a settings screen alone would still leave shared Bootstrap presentation in the same document.

For B/C, prepare a minimal Elements-based app shell and global feedback/dialog rendering **early**, then validate complete workflows inside it. In the earlier mixed-screen approach it was reasonable to retain the old shell longer; the clean-document objective changes that order. Keep the existing auth, data, context and navigation behavior unless a demonstrated issue requires changing it. [Authenticated app](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/AuthenticatedApp.jsx:24>), [AppLayout](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/AppLayout/index.jsx:20>), [global Dialog](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/Ui/Dialog/index.jsx:3>), [context composition](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Contexts/index.jsx:15>).

### Lazy routes help organisation, but are not CSS isolation

The router groups module imports into lazy state loaders. This gives useful workflow boundaries for preview and migration tracking. It also has speculative route preloading. A hidden menu entry does not prove an old module or stylesheet will never load. A clean development preview should explicitly register only migrated routes, or otherwise keep old UI modules outside its reachable entry graph; it should not silently fall back to legacy rendering. Keep that limitation confined to development until the agreed production scope is complete. [Route groups](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Router/deferredStates.jsx:23>), [module loader](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Router/lazyStates.js:6>), [route preload](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Router/routePreload.js:34>).

### “All Admin screens” and “remove React Bootstrap from the App package” have different scope

Public RSVP's SessionModal imports the same shared Buttons and Modal wrappers as authenticated Admin. A global wrapper migration can therefore affect public experiences even if they were excluded from the visual redesign. Separate the public compatibility boundary, migrate those consumers too, or explicitly retain their isolated implementation until a later release.

It is possible to achieve one UI system in the authenticated document while still retaining a legacy dependency for a separately loaded public document. That can be an honest intermediate scope; it is not the final repo-wide removal of React Bootstrap. Existing public behavior should be preserved, including its existing responsive requirements. [Public wrapper usage](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Modules/PublicRsvp/SessionModal.tsx:1>), [public entry branches](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/App.jsx:47>), [Elements scope](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/README.md:5>).

## 5. How screen-by-screen development would work without production coexistence

Use the existing Admin application as the starting point. Keep the Elements repo as the library owner; do not turn the sandbox prototype into a second independently evolving production product.

1. Create a migration integration branch/checkout and a dedicated preview deployment. Continue shipping the old application from the established release line. The preview is an integration environment, not a reason to rebuild authentication or the API layer.
2. Establish the new runtime, stylesheet boundary, minimal shell, error/loading states and global dialogs/toasts. Resolve the public/shared-wrapper boundary before broad replacements.
3. Migrate one complete settings/detail workflow against real application services and representative test data. Include save, server error, invalid fields, permissions and its associated dialogs.
4. Use another early workflow to expose the expensive uncertainties: a server-backed list and an async select are more informative than a succession of simple static pages. This can produce library enhancement requirements before committing to full-scope timing.
5. Reuse the validated components/adapters across subsequent screens. In this migration build, replacing the shared Buttons implementation can intentionally update all its consumers. Mark affected workflows as needing verification; availability of the component does not establish that every screen is migrated.
6. Review work in small changes on the integration line, regularly incorporate product fixes, and rerun the affected tests. Record which production changes have been incorporated. Avoid a final enormous merge containing months of untracked business-logic divergence.
7. Complete and test the release scope before exposing ordinary users. A development preview may have unfinished routes; the replacement production app must cover the workflows its audience needs.

The cost here is maintaining alignment while production moves. A future implementation could integrate a separate dormant entry into the main development line instead, but only if it demonstrably keeps old/new imports and runtime dependencies isolated. That is an engineering choice to prove, not a cheap feature-flag assumption.

## 6. Release and rollback: current state versus required preparation

### Existing support

The repository has separate stage and production workflows. Both run tests and a build before deploying to S3/CloudFront. App Sentry reporting already includes a build release identifier. These are useful foundations. [Production workflow](</Users/liamyoung/Repos/Gecko-Admin-Web-App/.github/workflows/deploy-app-production.yml:65>), [stage workflow](</Users/liamyoung/Repos/Gecko-Admin-Web-App/.github/workflows/deploy-app-stage.yml:65>), [Sentry release](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Services/Sentry/init.jsx:24>).

### Gaps revealed by this review

The production workflow currently syncs build files to one bucket with `--delete`, then copies HTML/config and invalidates CloudFront. The checked-in S3 configuration has versioning suspended. No immutable application-release promotion/rollback path or whole-app cohort workflow was found in the inspected CI/IaC. This describes repository configuration; live cloud state and any external operational tooling were not inspected. The CloudFront cache policy is referenced by ID rather than defined here, so its actual cache behavior also needs verification. [Policy reference](</Users/liamyoung/Repos/Gecko-Admin-Web-App/IaC/serverless.yml:25>). [Deployment operations](</Users/liamyoung/Repos/Gecko-Admin-Web-App/.github/workflows/deploy-app-production.yml:72>), [S3 configuration](</Users/liamyoung/Repos/Gecko-Admin-Web-App/IaC/Resources/S3Buckets.yml:1>).

That deployment is not a single atomic change across all users and files. Existing tabs can continue running the old build. Deleting old lazy chunks can then cause import failures; Admin responds to `vite:preloadError` with an immediate reload. Such a reload can interrupt unsaved work. The failure mechanism is also documented by Vite. [Current handler](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/main.jsx:26>), [Vite load errors](https://vite.dev/guide/build.html#load-error-handling).

Before a major cutover, prepare:

- Retained, identifiable builds with their matching JS, CSS, fonts, configuration and public assets. Avoid deleting an older release's chunks while supported sessions still reference them.
- A deployment/promotion operation that publishes all assets before switching the entry document, plus tested caching behavior and a rehearsed return to the exact previous artifact. Enabling S3 object versioning alone is not a complete application rollback design. AWS separately recommends versioned asset names or directories. [AWS versioned content](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/UpdatingExistingObjects.html).
- A policy for old sessions, refresh prompts and unsaved work. Even a single release briefly has old and new frontend versions active across different tabs; keep their API and persisted-data contracts compatible through that window.
- Named release owners and agreed stop/rollback signals: failed login, broken saves, permission regressions, materially elevated errors and missing essential workflows. Use existing build identifiers to compare releases; validate boot failures as well as post-interaction errors because monitoring starts lazily. [Monitoring startup](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/main.jsx:54>).
- Full artifact rollback testing against the still-current backend. Frontend rollback does not undo data already saved or messages already sent. Keep unrelated backend/schema changes out of this cutover where possible.

These practices also benefit gradual adoption. B/C put more weight on getting them right because a single defect can affect a much larger changed surface.

## 7. Is a whole-app pilot practical here?

**Plausible, but not already configured.** It would serve an old or a new complete build to a stable audience, with a full navigation between versions. Each build keeps its own CSS and assets. It does not require solving Bootstrap/Elements coexistence inside one document.

The simplest initial proof is a dedicated staff preview host with a complete build, leaving ordinary stage/release QA available for ongoing product work. A production pilot could use that host with verified authentication or stable version selection at the hosting/entry boundary. Keep selection stable for a user/session, or an account where the rollout policy needs that; do not independently randomise individual asset requests. Ensure HTML selection, asset paths and cache keys cannot combine releases.

Current routing and infrastructure explicitly support `/admin`, public routes and legacy asset paths. Authentication uses a local-storage adapter and redirect helpers. A new hostname or path therefore needs explicit tests for login/return URLs, refresh/deep links, asset loading, sign-out and storage. Do not assume a `/beta` path or new subdomain works without wiring it. [Vite base](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/vite.config.js:78>), [request rewrite](</Users/liamyoung/Repos/Gecko-Admin-Web-App/IaC/viewerRequestReact.js:1>), [auth adapter](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Services/Auth/index.jsx:1>), [auth hook](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Hooks/useAuth/index.jsx:16>).

The existing `app-config` file is explicitly tested as inert Angular migration metadata, not demonstrated as a usable whole-app rollout selector. [Configuration test](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Router/appConfig.test.jsx:61>).

CloudFront offers continuous deployment for testing CDN configuration with a subset of traffic. That shows a possible infrastructure mechanism, not an existing Gecko implementation or a turnkey account-aware app-release system. Its suitability would need a small hosting proof. [AWS continuous deployment](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/continuous-deployment.html).

C still requires maintaining two frontend releases temporarily and supporting shared APIs. Its benefit is isolating their presentation while controlling exposure; it does not remove the completeness requirement or the cost of parallel operation. If that infrastructure effort is disproportionate, choose B with strong preview coverage and rollback rather than building an elaborate rollout platform for this one change.

## 8. Completion and effort criteria

Measure completed workflows, not just replaced components. A useful coverage record includes:

| Surface | Completion evidence |
| --- | --- |
| Boot and shell | Login/refresh, deep links, navigation, account/permission states, global errors, toasts, dialogs and loading |
| Each workflow | Normal, empty, loading, invalid, server error, disabled/permission, saving and destructive-action paths |
| Cross-screen behavior | URL search/filter/page state, back/forward navigation, shared actions, persisted preferences and focus restoration |
| Complex UI | Remote data, async choices, uploads, editor interactions, drag/drop, conversation updates and overlays |
| Appearance and accessibility | Intended dimensions, supported desktop sizes/zoom, keyboard use, labels, English/Spanish and approved themes |
| Public surfaces | Explicitly migrated or preserved behind a verified separate boundary; no accidental shared-wrapper regression |
| Release | Build/test pass, correct CSS/import graph, bundle/loading comparison, retained assets, old sessions and successful rollback rehearsal |

The existing 509 test files are useful infrastructure, not proof of coverage. The inspected App runner uses jsdom; no browser end-to-end harness was found in the app test setup. Browser verification remains necessary under all options. [Existing inventory](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/docs/ui-migration/legacy-inventory.json>), [test configuration](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/vitest.config.ts:1>).

Do not put a percentage saving or completion date on B yet. A practical comparison is:

- Shared cost: library readiness + workflow conversion + functional validation.
- A adds coexistence engineering + flags/adapters + mixed-state validation + final compatibility cleanup.
- B adds production/migration synchronisation + waiting for the last required capability + concentrated acceptance/cutover work.
- C adds stable whole-app selection and parallel release operations to B, in exchange for limiting early exposure.

Preview and reliable deployment work are useful under all strategies, so they are not purely costs unique to B/C. There is no evidence yet that the avoided coexistence cost exceeds the cost of keeping an extended migration aligned with production.

## 9. What would decide between them

Proceed toward B/C if the first representative workflows show that the required scope can be completed without a long product freeze, Elements can close its functional gaps, and the team can maintain preview/testing plus release ownership. Defer migration-specific prefix work while that option remains credible; keep namespace requirements from other consumers as a separate library decision.

Prefer A if improvements must reach users well before complete coverage, a complex legacy area has no workable replacement in the migration window, or keeping the whole migration aligned with product development becomes more costly than coexistence. If only a genuinely independent module needs to remain old, investigate a full-document boundary for that module before committing every screen to a mixed-style environment; account for navigation/auth complexity honestly.

The next useful step would be a bounded feasibility exercise: package consumption and new shell in a clean document; one ordinary save workflow; one server-list/async-field workflow; an explicit public/shared-component boundary; and a deployment/rollback proof. Those results would let us choose a delivery strategy and estimate the remaining capabilities using observed effort. This document proposes that exercise; it does not perform or authorise the migration.

## Evidence limits

Reviewed the same local snapshots as the original assessment: Elements `7fc705f49d5bac5a998665963f09c6484a60c867`, Admin `d16f38f07ca7492cf07c7023c9a1ae9892068200`. Added read-only inspection of global public styles, shared shell/providers, lazy route loading, deployment/configuration and authentication boundaries, plus official Vite/AWS documentation. Reused the earlier CSS measurements; no new runtime/build/deployment tests were run for this comparison. The hosting/pilot mechanisms and effort judgments above are proposals and inferences, not features demonstrated in the running product.
