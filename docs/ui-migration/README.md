# Admin migration to Elements

This is the authoritative migration plan and handover for humans and agents. Start here after a model change, new task or context reset. Last updated: 30 September 2026.

## Objective and scope

Prove Elements in Gecko-Admin-Web-App and establish an approach that can replace the entire React Admin presentation. Elements becomes the single source of truth for components, replacing React Bootstrap and local presentation components while retaining application-owned business logic.

The new area is part of the product: header, sidebar, global services and migrated pages must perform all existing functions. A visually similar demo, placeholder callbacks or omitted actions do not satisfy the goal. Preserve fields, product copy, validation, permissions, feature conditions, API requests and payloads, side effects, destinations, failure handling and workflow state. Elements supplies its approved visual treatment; parity does not mean copying Bootstrap styling. Any unavoidable behaviour or branding difference remains an explicit gap until resolved with the user.

The architecture must scale to all React Admin workflows, but the implementation proceeds in verified slices. Existing Angular destinations remain functioning full-document handoffs. Replacing Angular itself is a separate scope decision, not silently included in React cutover or silently removed from navigation.

## Decisions and constraints

- **Document isolation:** build a separate HTML/application entry in the Admin repository, initially under `/admin/elements/`. The prefix is the proposed deployment location to prove, not a permanent business route. Elements/Tailwind and legacy Bootstrap each own a separate document and import graph.
- **Production destination:** migrated code must run at the canonical Admin URLs after entry/base configuration and hosting cutover. Centralise route generation; preserve record parameters, query strings, bookmarks, authentication returns and canonical favourite destinations. Avoid feature code coupled to `/elements`.
- **Application reuse:** retain UI-Router, authentication, regional API services, Commands, permissions and domain logic where their imports allow. For the current experiment, leave existing components, hooks and the legacy entry unchanged. Put migration-specific adapters under Admin `src/Elements`; reuse unchanged Commands/services where their imports are safe. Shared refactoring requires a later scope decision. A shared hook or barrel is not assumed style-independent.
- **Persistent layouts:** keep the application shell/providers mounted through internal navigation and the record layout/identity/actions mounted across child tabs. Preserve drafts and list state according to an explicit workflow contract. Cross-document navigation and intentional account switching may reload; ordinary tab changes must not recreate the shell or publish incorrect intermediate UI.
- **Shell loading:** no skeleton replacements for the app header/sidebar. A plain startup status may precede initial authenticated mount; once mounted, shell and providers persist through internal route changes. Refresh and full-document handoffs create a new document.
- **Loading correctness:** static metadata is immediately available. Resolve unknown record identity/editor type before publishing it, or reserve the unknown region. Retain useful content during refresh. Never flash a create title, another record's identity, the wrong editor, or a provisional set of actions. Cached identity cannot authorise an action.
- **Library ownership:** use public Elements imports and approved contracts. Missing functionality becomes an explicit library capability request; application-specific visual substitutes are not the migration solution. Follow the current [usage guide](../../packages/ui/README.md), [dependency policy](../../packages/ui/docs/dependencies.md) and matching component contracts.
- **Desktop scope:** preserve the documented 1024px minimum desktop shell, horizontal overflow below it, keyboard/screen-reader support, zoom and approved appearance modes.
- **Behaviour changes:** record differences between current behaviour and these persistence requirements. Implement the explicitly requested persistence improvements, while preserving independent-editor dirty-leave decisions. Other product changes need an explicit user decision and a recorded outcome.

## Resume procedure and document ownership

1. Read this plan and the progress table below. Completion evidence, rather than an agent's previous summary, determines what is finished.
2. Locate the two repositories and inspect their working trees and applicable `AGENTS.md` guidance. The audit used Elements at `/Users/liamyoung/Documents/Gecko Projects/elements-monorepo` and Admin at `/Users/liamyoung/Repos/Gecko-Admin-Web-App`; locate their equivalents if the environment changes. Preserve unrelated work.
3. Read the [foundation implementation details](admin-elements-foundation-plan.md) for the shell, import boundaries, persistence ownership and acceptance scenarios. Read the [routing evidence](admin-routing-persistence-audit.md) when working on routes, record tabs, lists or navigation guards.
4. Recheck the source relevant to the next slice. The foundation audit inspected Admin `c3cd68781c8d8303a665b1425468f89581eb0c06`; line references are evidence at that time, not promises about a later checkout. Current library contracts define supported capability. The [React compatibility fixture](../../tests/react-compat/README.md) and [release guidance](../package-readiness/private-releases.md) own package verification; the old readiness recommendations are superseded.
5. Execute only work authorised by the active user request. This plan captures the migration direction; it does not itself authorise a production deployment. Finish the current gate before expanding to further workflows.
6. Update progress and evidence before handing over. Record changed files/commits, checks actually run, failures, remaining gaps and one concrete next step. Keep this file's status current rather than creating another competing handover.

| Document                                                                      | Owns                                                                                                         |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| This README                                                                   | Objective, decisions, sequence, live progress and resumption                                                 |
| [Foundation details](admin-elements-foundation-plan.md)                       | Source findings, shell parity, proposed file boundaries, capability gaps and foundation acceptance scenarios |
| [Routing audit](admin-routing-persistence-audit.md)                           | Dated source evidence for routing/persistence and pilot selection                                            |
| [Workflow ledger](workflows.md)                                               | Route-family coverage, linked evidence and verification status                                               |
| [Elements migration checklist](../../packages/ui/docs/migration-checklist.md) | Reusable per-workflow evidence record and fidelity checks                                                    |
| [Entry and shell evidence](entry-shell-evidence.md)                           | Current implementation, reproducible checks, live observations and remaining foundation gaps                 |
| [Settings directory evidence](workflows/settings-directory.md) | Selected page scope, source behaviour, persistence changes and bounded verification |
| [Account settings evidence](workflows/account-settings.md) | Current-app Account baseline, Elements implementation and outstanding behaviour checks |
| [Categories list evidence](workflows/categories.md) | Current-app ListView baseline, Elements Data table integration and live browser checks |
| `snapshots/`                                                                  | Superseded reports and raw historical measurements; consult only for provenance                              |

If documents conflict, this README owns migration intent and status, current Elements contracts own component usage, and inspected Admin source establishes existing behaviour. Record a conflict between required parity and a library contract as a gap; neither silently weaken parity nor override the component. Explicit user decisions take precedence and must be reflected here.

## Sequence and current progress

The isolated entry, initial header/sidebar, Settings directory, Account settings page and Categories list are implemented in the Admin working tree. The signed-in browser baseline is partial. The complete foundation parity gate remains open; see [entry and shell evidence](entry-shell-evidence.md) for checks and exact gaps.

**Current authorised scope (28 September 2026):** the user selected the Categories list to prove the Elements Data table after the Settings directory and Account settings slices. The current Admin Categories page and ListView are the behaviour source. The Elements page keeps server-backed search, Type filtering, row destinations and removal, and pagination; it adds the requested column toggles. Category create/edit remain existing-app handoffs. The earlier `elements-experiment` branch is not a behaviour source. Templates remains an unselected candidate.

**Sidebar follow-up (30 September 2026):** preserve the current React sidebar's functionality while addressing the reported review findings. The user explicitly changed favourite activation to the current tab. Saved destinations must pass the Elements HTTP(S) URL allowlist before rendering or navigation; malformed and executable URLs are excluded. See [entry and shell evidence](entry-shell-evidence.md) for the bounded verification and pending component release.

| Stage                    | Status                                                                    | Completion gate                                                                                         |
| ------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Foundation investigation | Source audit complete; signed-in shell baseline captured in part          | Finish slow/failure, role-dependent and identity-transition scenarios.                                  |
| Isolated entry           | Implemented; local build, CSS separation and signed-in deep link verified | Fresh login callback, expired session and deployed fallback still need end-to-end verification.         |
| Persistent product shell | Initial header/sidebar implemented; full parity incomplete                | Resolve the explicit library/integration gaps and pass every shell scenario.                            |
| Representative workflow  | Settings directory, Account settings and Categories list implemented; acceptance in progress | Verify remaining scenarios in their linked evidence records, including mutations, failures and role-dependent fields. |
| App-wide migration       | Not started                                                               | Complete route-family inventory and per-family parity records.                                          |
| Canonical cutover        | Not started                                                               | Verify canonical URLs/auth/assets and old sessions, rehearse rollback, obtain deployment authorisation. |

**Next action:** review the [Categories list](workflows/categories.md) with the user, then complete its remaining mutation and failure checks before selecting another page. Account settings, Settings directory and foundation gates remain open.

**Candidate rationale:** Templates list → existing SMS/basic template → Settings → Editor → Usage → list exercises stable identity, editor selection and shared actions. Hosts offers a smaller API smoke test. Settings directory was selected on 24 September 2026. Templates and Hosts remain unselected candidates; the [routing audit](admin-routing-persistence-audit.md) retains the comparison.

**Open decisions/gaps:** [entry and shell evidence](entry-shell-evidence.md) records implementation gaps; the foundation details retain the full parity requirements. Production audience and rollout policy remain undecided. Local entry work does not authorise deployment.

## Verification and handover rules

**Current user direction (24 September 2026):** automated tests are deferred for this migration. Remove the tests/check scripts introduced for the shell slice and do not add or run more for now. Use development builds and focused manual inspection; do not treat earlier test results as verification of later changes. Existing unrelated repository tests remain untouched.

Use the foundation acceptance table for shell/navigation work and the library checklist for every product workflow. Check real behaviour, request effects and browser state in addition to types/builds. A loading skeleton or mock API demonstration is not functional parity. Source-inferred risks must remain distinguished from reproduced defects.

For each implementation handover, update the relevant workflow row with source and target revisions, evidence links, test/browser outcomes and gaps. Advance to verified only when the declared scope has no unverified required behaviour. Record explicit user-approved scope changes with date and rationale; a deferred feature remains deferred, not verified. Reopen evidence affected by subsequent product or library changes.

The cutover gate includes retaining compatible assets for existing sessions, cold/deep links, authentication callbacks, canonical favourites, Angular handoffs, cache behaviour, unsaved work and rollback. Remove legacy presentation dependencies only after their remaining consumers are accounted for.

## Historical evidence and audit tools

The [September 9 snapshot](snapshots/68f9dc3/README.md) and [earlier snapshot](snapshots/d16f38f/README.md) retain import counts, CSS probes and previously considered alternatives. They no longer decide strategy or package readiness. In particular, their claims that Elements still needs React 18/package support describe the old library; current support is defined in the usage guide and verified against the selected artifact.

The existing [import scanner](legacy-inventory.py) and [CSS probe](css-coexistence-audit.mjs) are optional evidence tools, not migration gates. Read their arguments/dependencies before running them; the CSS probe is a synthetic stylesheet comparison, not a product test. Write fresh output to a new dated/commit-labelled snapshot with source revisions and methodology. Preserve old measurements and distinguish counts from behavioural coverage.
