# Elements rollout options: refreshed comparison

9 September 2026. Based on current Admin `production` at `68f9dc325126226a0bacd41b827ad2f44717fe0d` and Elements `7fc705f49d5bac5a998665963f09c6484a60c867`. Supersedes the earlier comparison of `d16f38f`. See the [refreshed investigation](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/docs/ui-migration/admin-app-assessment.md>) for version, component and CSS evidence. This is a comparison, not an implementation plan or selected rollout strategy.

## Shared starting point

Prepare Elements to support the real App's React 18.3.1 while retaining React 19 prototype compatibility. Establish the selected private-npm package contract and prove it in the App's current Vite 8 environment. The user has excluded upgrading the App from this preparation. A separate preview does not require a React upgrade and is not a reason to introduce one.

All rollout strategies need that package work, compatible component behavior, styles and assets, and representative validation. None eliminates the remote-table or async-choice capability gaps. Those gaps need not be solved before a minimal package-consumption proof. [packages/ui/package.json](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/package.json>), [App/package.json](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/package.json>), [packages/ui/docs/data-table.md:231](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/docs/data-table.md:231>), [packages/ui/docs/combobox.md:222](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/packages/ui/docs/combobox.md:222>)

## Options and costs

| Dimension | A: Gradual adoption within React App | B: Complete React App cutover | C: Complete React App with limited initial audience |
| --- | --- | --- | --- |
| Development | Screens/workflows migrate incrementally | Screens/workflows migrate incrementally in integration environment | Same as B |
| Ordinary production users | See migrated workflows as ready | See new UI after agreed React scope is complete | Selected audience receives complete new build first |
| CSS in one React document | Legacy and Elements may coexist | One intended presentation baseline | One baseline per build/document |
| Main added cost | Compatibility styles, wrapper transitions, mixed states | Keeping migration aligned with ongoing product work | B plus stable audience selection and parallel release operation |
| Early value | Can ship earlier | Waits for complete release scope | Early feedback once pilot scope is complete |
| Main risk | Long compatibility tail and cross-screen regressions | Late discovery of missing behavior; wider cutover impact | Hosting, auth, cache and release-selection mistakes |
| Rollback | Can be granular if flags and interfaces permit | Return to previous complete artifact | Return affected audience to previous build |

C is a controlled exposure variant of B, not a shortcut around completion. All options still require testing; old/new whole-app releases can temporarily coexist across tabs even when they never share CSS in a document.

## What a clean cutover avoids—and what it does not

The renewed CSS probes still show 111 overlapping class names, a legacy 14px root changing Elements dimensions, and heading rules winning regardless of stylesheet order. A clean document can avoid a migration-only utility prefix, competing global baselines and mixed Bootstrap/Base UI overlay behavior. Removing Bootstrap utilities by themselves would not solve the full problem. [docs/ui-migration/css-coexistence-audit.json](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/docs/ui-migration/css-coexistence-audit.json>)

A clean cutover still needs the shell, global dialogs/toasts/loading, third-party styles and reachable module imports audited. App imports Bootstrap globally, and its route registry statically imports module states. A clean preview must establish an appropriate entry graph; hiding legacy menu items does not isolate styles or imports. [App/src/main.jsx:1](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/main.jsx:1>), [App/src/Components/AppLayout/index.jsx:16](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/AppLayout/index.jsx:16>), [App/src/Router/states.jsx:3](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Router/states.jsx:3>)

The earlier proposed public-style boundary work is removed: public-experience.scss and the cited PublicRsvp/AuthenticatedApp split are absent in this checkout. Likewise, the former lazy-route/preload boundary is not available as described. Do not estimate work against those obsolete findings.

## React App scope is not whole-product scope

Current infrastructure serves Angular at the default origin and React at `/admin`. React actively redirects configured workflows to Angular via full navigation. The checked-in app-config has 71 entries, 10 marked Angular. [IaC/Resources/CloudFront.yml:25](</Users/liamyoung/Repos/Gecko-Admin-Web-App/IaC/Resources/CloudFront.yml:25>), [App/src/Router/setup.jsx:18](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Router/setup.jsx:18>), [App/src/Router/routerAppRedirect/index.jsx](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Router/routerAppRedirect/index.jsx>), [App/public/app-config/index.json](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/public/app-config/index.json>)

For B/C, complete cutover means replacing the agreed **React App** UI while retaining these existing Angular workflows and handoffs. Replacing the Angular application itself would be a separate, larger scope. The smaller React source inventory does not establish that the whole product is easier to migrate.

The existing document separation can keep Angular's styles outside the Elements React document. However, current app-config is an Angular/React route mechanism, not demonstrated selection between old/new React releases. The previous statement that app-config was inert is withdrawn.

## Screen-by-screen work remains sensible under every option

A screen provides a useful unit for acceptance because it exercises components alongside data, permissions, errors, saving and navigation. Shared component replacement provides reuse across later screens, but also expands the regression surface immediately.

For example, changing the existing Buttons wrapper reaches 96 production importing files in this checkout. It does not change the Bootstrap Button exported separately by the Ui barrel, nor every direct import. Every affected workflow still needs appropriate validation. Use component implementation to create reusable capability and screen/workflow validation to demonstrate completion. [docs/ui-migration/legacy-inventory.json](</Users/liamyoung/Documents/Gecko Projects/elements-monorepo/docs/ui-migration/legacy-inventory.json>), [App/src/Components/Ui/index.jsx:1](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Components/Ui/index.jsx:1>)

B/C allow that incremental engineering without requiring an incomplete or mixed UI to ship to ordinary users. Their cost is incorporating ongoing production fixes until cutover; an extended divergent branch can become more expensive than a bounded coexistence layer. There is not yet evidence to assign a percentage saving or a reliable completion date.

## Release evidence and remaining operational work

Current stage/production automation runs tests/builds, then deploys with `s3 sync --delete`. Checked-in S3 versioning is suspended. These are not demonstrated immutable release/rollback facilities. Dependency installation uses npm install rather than npm ci. [.github/workflows/deploy-app-production.yml:65](</Users/liamyoung/Repos/Gecko-Admin-Web-App/.github/workflows/deploy-app-production.yml:65>), [IaC/Resources/S3Buckets.yml:12](</Users/liamyoung/Repos/Gecko-Admin-Web-App/IaC/Resources/S3Buckets.yml:12>), [.github/actions/install-app-dependencies/action.yml:22](</Users/liamyoung/Repos/Gecko-Admin-Web-App/.github/actions/install-app-dependencies/action.yml:22>)

Missing assets trigger immediate Vite preload-error reloads. Retain each supported build's matching assets, publish assets before switching entry documents, test caching and rollback, and decide how to handle old sessions and unsaved work. The risk applies to gradual releases too; B/C place more weight on readiness because the changed surface is larger. [App/src/main.jsx:25](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/main.jsx:25>)

Sentry initializes synchronously and uses the build release identifier; the old deferred-startup warning no longer applies. Repository infrastructure also defines availability/latency/error alarms, but this is not evidence that all UI workflow failures are monitored or that live configuration matches the repository. [App/src/main.jsx:8](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/main.jsx:8>), [App/src/Services/Sentry/init.jsx:24](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Services/Sentry/init.jsx:24>), [IaC/Resources/CloudFrontAlarms.yml](</Users/liamyoung/Repos/Gecko-Admin-Web-App/IaC/Resources/CloudFrontAlarms.yml>)

A dedicated preview host/path is plausible, but must prove `/admin/` asset bases, direct/deep links, authentication redirects, token storage, logout and return navigation into Angular. Current auth uses a local-storage adapter and environment-driven URLs. A new host does not automatically share existing storage. Existing default/React routing should be preserved deliberately. [App/vite.config.js:67](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/vite.config.js:67>), [IaC/viewerRequestReact.js](</Users/liamyoung/Repos/Gecko-Admin-Web-App/IaC/viewerRequestReact.js>), [App/src/Services/Auth/index.jsx](</Users/liamyoung/Repos/Gecko-Admin-Web-App/App/src/Services/Auth/index.jsx>)

For a production pilot, stable audience selection and matching HTML/assets/cache behavior require additional engineering. No such Elements rollout mechanism was found in the inspected configuration. If that cost is disproportionate, a strong preview plus rehearsed complete cutover may be preferable to building a new rollout platform.

## Refreshed recommendation

Do not commit to Bootstrap utility removal or a library-wide prefix before choosing a same-document coexistence requirement. First establish React 18 compatibility and external package readiness; these are useful for every strategy and match the immediate objective.

Keep B/C as credible candidates if the React workflow scope can be completed while staying aligned with ongoing product development. Prefer A if meaningful improvements must ship much earlier, or a required workflow cannot be replaced within a manageable integration period. A limited full-document legacy boundary may also be worth evaluating for a truly independent area, using the existing Angular separation as architectural evidence rather than assuming it solves new release selection.

The readiness decision is separable from broad component migration: prove the package, runtime and initial App integration first, then use representative workflow evidence to select delivery strategy. No code, hosting configuration or runtime dependency was changed by this refresh.

## Evidence limits

This comparison uses refreshed source inspection, import counts and isolated browser CSS measurements. It does not establish that App tests pass on this checkout, validate authenticated workflows, inspect live deployment state, or demonstrate rollback. The counted 162 test files are potential testing infrastructure, not proof of migration coverage. Current production/preview hosting behavior and effort estimates remain to be verified during later preparation.
