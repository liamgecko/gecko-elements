# Workflow coverage ledger

Read the [migration plan](README.md) first. This ledger records coverage; it does not change scope or replace per-workflow evidence. Last updated: 28 September 2026.

## Current coverage

The complete route-family inventory is outstanding. These initial rows describe the foundation, selected Settings directory and candidate workflows only; they are not the entire application scope.

| Scope                                             | Status                                                  | Evidence / outstanding work                                                                                                                                                                |
| ------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Application shell and global services             | Initial header/sidebar implemented; full parity open    | [Implementation evidence and open gaps](entry-shell-evidence.md); [full shell requirements](admin-elements-foundation-plan.md).                                                            |
| Settings directory/index | Implemented; full browser acceptance pending | [Settings evidence](workflows/settings-directory.md). The Account link now opens its Elements route; other linked screens remain existing-app handoffs. |
| Account settings | Implemented; full browser acceptance pending | [Account evidence](workflows/account-settings.md). Current Admin code and live Account page are the sole behaviour baseline; save/upload/failure and role variants remain unverified. |
| Categories list | Implemented; full browser acceptance pending | [Categories evidence](workflows/categories.md). Server search, both Type values, column toggles, row links, confirmation, pagination, refresh and Back/Forward were checked live; deletion and failure paths remain unverified. |
| Templates — existing SMS/basic navigation proof   | Candidate only; Settings directory selected first                  | [Pilot rationale](admin-routing-persistence-audit.md). Capture a real record baseline and the full evidence record before implementation.                                                  |
| Templates — complete workflow and editor variants | Not investigated in full                                | Inventory create/edit, variants, locks, approval, usage, clone, test, download, delete and all applicable actions/permissions. The bounded pilot does not verify these.                    |
| Remaining React route families                    | Inventory outstanding                                   | Enumerate from the current registry, nested states, menus and reachable links; account for feature/role variants, redirects and non-menu routes. Add one row per coherent workflow family. |
| Angular and other external handoffs               | Foundation source-audited; browser verification pending | Preserve existing destinations and authentication/return behaviour. Angular screen replacement is outside current implementation scope.                                                    |

## Adding and completing a workflow

1. Give the family a stable name and list all included routes, variants and entry points. Record explicit exclusions and approval references. Enumeration is complete only when every registered/reachable route is assigned to a family or a documented handoff.
2. Create one evidence record under `workflows/<family>.md` using the [library migration checklist](../../packages/ui/docs/migration-checklist.md). Record source revision/date, representative role/account conditions, API contracts and real baseline scenarios. Link it from the row.
3. Track `not investigated → specified → implemented → verified`. Keep blockers, deferred variants and missing browser evidence explicit; they do not count as verified. The shell uses its existing foundation matrix instead of duplicating it.
4. Record target revision, checks and outcomes, including cold/warm navigation, failure and dirty states. Preserve request semantics while adopting the approved Elements presentation.
5. On later relevant source changes, review affected evidence and reopen verification where required. Update the [plan's progress](README.md) only when the whole stage's completion gate is met.

Future rows should link evidence rather than duplicate field/action specifications in this table. Never populate a passing result based solely on a build, static inventory or screenshot.
