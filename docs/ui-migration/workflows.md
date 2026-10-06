# Workflow coverage ledger

Read the [migration plan](README.md) first. This ledger records coverage; it does not change scope or replace per-workflow evidence. Last updated: 5 October 2026.

## Current coverage

The complete route-family inventory is outstanding. These initial rows describe the foundation, selected Settings directory and candidate workflows only; they are not the entire application scope.

| Scope                                             | Status                                                  | Evidence / outstanding work                                                                                                                                                                |
| ------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Users parent page | Implemented; development build passed; live acceptance pending | [Users evidence](workflows/users.md). Active/Pending/Archived lists and group/email/archive dialogs use Elements. Verification browser also fails workspace startup on Settings. Original Users implementation unchanged. |
| Application shell and global services             | Initial header/sidebar implemented; full parity open    | [Implementation evidence and open gaps](entry-shell-evidence.md); [full shell requirements](admin-elements-foundation-plan.md).                                                            |
| Settings directory/index | Implemented; full browser acceptance pending | [Settings evidence](workflows/settings-directory.md). Account, Categories, SMS geo permissions, Mobile devices, Templates and Verified senders/domains open their Elements routes; other linked screens remain existing-app handoffs. |
| Account settings | Implemented; full browser acceptance pending | [Account evidence](workflows/account-settings.md). Current Admin code and live Account page are the sole behaviour baseline; save/upload/failure and role variants remain unverified. |
| Categories list | Implemented; full browser acceptance pending | [Categories evidence](workflows/categories.md). Server search, both Type values, column toggles, row links, confirmation, pagination, refresh and Back/Forward were checked live; deletion and failure paths remain unverified. |
| SMS geo permissions | Implemented; full browser acceptance pending | [SMS geo permissions evidence](workflows/sms-geo-permissions.md). Country choices, continent disclosure, dirty-leave decisions, refresh and internal Settings navigation checked; live save/failure and restricted roles remain unverified. |
| Mobile devices | Implemented; page-size capability decision and full browser acceptance pending | [Devices evidence](workflows/mobile-devices.md). Current-app list and rename Dialog inspected; live save/failure and empty-account checks remain open. |
| Templates parent page — active/deleted lists | Implemented; full browser acceptance pending | [Templates evidence](workflows/templates.md). Standard table defaults, immediate queries, preserved row/bulk actions and lock access. Editors remain existing-app handoffs. |
| Verified senders and Domains lists | Implemented; API/runtime acceptance pending | [Verified senders evidence](workflows/verified-senders.md). Server search, status filters, all data-column sorting and created dates; canonical create/edit handoffs and resend preserved. API changes remain uncommitted. |
| Templates — create/edit/usage and editor variants | Not selected for migration | Existing-app handoffs from the migrated parent page. Inventory complete editor variants and their actions before a later authorised slice. |
| Remaining React route families                    | Inventory outstanding                                   | Enumerate from the current registry, nested states, menus and reachable links; account for feature/role variants, redirects and non-menu routes. Add one row per coherent workflow family. |
| Angular and other external handoffs               | Foundation source-audited; browser verification pending | Preserve existing destinations and authentication/return behaviour. Angular screen replacement is outside current implementation scope.                                                    |

## Small Settings candidates reviewed 30 September 2026

The user requested candidates with additional component coverage and limited complexity. SMS geo permissions was subsequently selected and implemented; Mobile devices was then selected and implemented; Outcomes remains a recommendation. Baseline: Admin `2f835c365`, clean `design/elements-experiment-v2` working tree after the production merge was aborted. The current React Settings directory and SMS geo permissions page were inspected in the signed-in browser; the other candidates were assessed from current source.

| Candidate | Additional coverage | Bounded scope and parity requirements |
| --- | --- | --- |
| SMS geo permissions (`/admin/settings/sms_geo_permissions`) | Accordion, Checkbox/CheckboxGroup, Badge, Tooltip and permission Alert | One page, account plus SMS-cost reads, one account save. Preserve continent/country ordering, initially expanded sections, prices, high-risk indicators, selected country codes and super-user-only editing/save. Strongest component variety for a bounded slice. |
| Mobile devices (`/admin/settings/devices`) | Editing Dialog and updating one table row | Existing device list plus one-field rename modal. Preserve device-name fallback, user links, pagination/sorting, save feedback and row refresh. Smallest additional workflow. |
| Outcomes list and create/edit (`/admin/settings/outcomes`, `/admin/settings/outcomes/{id}`) | Deferred boolean choice via Checkbox and complete create/edit navigation | List plus a four-control editor (name, call type, action, require note). Preserve system/global outcome filters, hidden group/type payload values, required selection, create redirect, dirty-leave handling and delete confirmation. Slightly larger than Devices. |

The Elements Switch contract is for immediate persistence; choices saved with a form use Checkbox. Tasks is not a small drawer-only migration: it includes sortable tasks and conditions. Data security includes a rich-text privacy policy, archival confirmation and permission/cache updates. Neither is recommended for this lightweight next slice. Labels would also require checking the library's support for arbitrary saved label colours before promising full parity.

The shortlist review itself changed no Admin code. The user subsequently selected SMS geo permissions; its current implementation and verification are recorded in the linked evidence above. Mobile devices was subsequently selected; its implementation and gaps are recorded above. Outcomes remains unselected.

## Adding and completing a workflow

1. Give the family a stable name and list all included routes, variants and entry points. Record explicit exclusions and approval references. Enumeration is complete only when every registered/reachable route is assigned to a family or a documented handoff.
2. Create one evidence record under `workflows/<family>.md` using the [library migration checklist](../../packages/ui/docs/migration-checklist.md). Record source revision/date, representative role/account conditions, API contracts and real baseline scenarios. Link it from the row.
3. Track `not investigated → specified → implemented → verified`. Keep blockers, deferred variants and missing browser evidence explicit; they do not count as verified. The shell uses its existing foundation matrix instead of duplicating it.
4. Record target revision, checks and outcomes, including cold/warm navigation, failure and dirty states. Preserve request semantics while adopting the approved Elements presentation.
5. On later relevant source changes, review affected evidence and reopen verification where required. Update the [plan's progress](README.md) only when the whole stage's completion gate is met.

Future rows should link evidence rather than duplicate field/action specifications in this table. Never populate a passing result based solely on a build, static inventory or screenshot.
