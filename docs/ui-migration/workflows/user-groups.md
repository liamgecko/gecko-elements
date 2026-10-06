# User groups — parent list review

Reviewed 5 October 2026. Parent list implementation completed; live acceptance remains pending. Baseline is Admin `src/Modules/Groups/index.jsx`, `state.jsx`, `src/Commands/Groups/index.jsx` and `useListViewProps`; the Angular editor is a destination, not the list baseline.

## Requirements inventory

- React route `/admin/settings/groups` accepts page, perPage, keyword, sort, sortBy and status. Settings entry requires `ABILITY_GROUPS_VIEW`. The list route has redirectKey `module_groups`; it has no explicit route/action ability checks of its own. Preserve central route access handling. The current New group action has no explicit create ability requirement in its configuration; destination access is enforced separately.
- Title Groups; Settings → Groups breadcrumbs; New group header action. Create links to `/#/settings/groups/0`; rows link to `/#/settings/groups/{id}`. Keep intentional full-document Angular handoffs and existing permissions editor unchanged. No new editor, dialog or mutation in this slice.
- Columns, in order: Date created (existing epoch/date formatter), Name, Type (capitalised), Users (including zero), unlabelled lock indicator for every non-custom type. This display rule is `type !== 'custom'`, not inferred from API editability or current-user permissions.
- Free-text server search, pagination and page-size selection. Search/page-size changes reset to page 1; out-of-range pages clamp to the final page. Existing hook persists query parameters and per-page preference. Use Elements-owned list cache, retain refresh and Back/Forward behaviour, and do not write legacy cache keys.
- No existing sorting controls, filters, row action menu, bulk actions, selection, tabs, unsaved form, validation or success toast. These are not silently added.
- GET `/groups`: page/per_page plus `group_keyword`, `group_rfields=created_at,name,type,user_count`. Existing Command discards sort/sortBy; state request discards status. They are not working capabilities simply because they occur in the route URL. API Group declares name ordering only; do not promise other column sorting or status filtering. No API changes needed or authorised for this slice.
- API scopes retain account isolation, exclusions for system/contact groups and call/chat feature restrictions. Related permissions are not requested by the React list, despite being requested by the Angular list.
- Keep shell persistent. Known header/table render immediately; initial table skeletons and retained rows with DataTable updating overlay on subsequent requests. Separate genuinely empty collection from zero search matches. Failures remain in table/page region with retry; do not report failed requests as empty success.

## Component mapping

| Existing UI/behaviour | Elements component/composition | Contract | Application logic/API retained | Gap or decision |
| --- | --- | --- | --- | --- |
| Page title, breadcrumbs, New group, favourite | Header; add action preset | header.md, button.md | Translation keys, Settings internal link, canonical favourite, Angular create URL | None |
| Page body | Container | container.md | Persistent shell and list route | None |
| List columns and clickable rows | DataTable | data-table.md | Group fields, DateService, capitalisation, zero count, Angular row URL | No table overrides |
| Built-in group lock indicator | HugeiconsIcon with existing approved square lock icon | action-icons.md | Non-custom type predicate | Accessible explanation without changing predicate |
| Search and column visibility | DataTable toolbar | data-table.md | Immediate group_keyword request and page reset | Column visibility is library presentation; no unsupported filters/sorts |
| Pagination/page size | DataTable controlled server pagination | data-table.md | API metadata, URL state, isolated per-page persistence | None |
| Initial/background request | Skeleton cells / DataTable updating | data-table.md | Stale-response guard, retain rows | None |
| Empty collection / no search matches | Empty / DataTable empty state | empty.md, data-table.md | Distinguish collection from search result; clear search | None |
| Request failure | DataTable error/retry | data-table.md | Existing error rendering and request retry | None |

Contracts are under `packages/ui/docs/`. No Dialog, AlertDialog or form controls are required beyond the table toolbar for this parent page.

## Acceptance checks

Verify original React Groups still works; Elements Settings link enters without reloading shell; search queries immediately and resets page; page size, pagination, refresh and Back/Forward retain appropriate state; all five columns match source values, including zero users and non-custom locks; rows and New group reach their existing Angular destinations; permissions/features remain enforced; slow responses retain dimensions; empty/search-empty/error/retry are distinct; column visibility works; keyboard navigation and both themes work. Live runtime baseline comparison is pending authenticated browser access; source review alone does not establish runtime parity. The initial review was read-only; implementation evidence follows below.

## Requested extension: filtering and sorting

Liam requested a Type filter and sorting on all data columns after the initial review: Date created, Name, Type and Users. The separate lock indicator remains a non-sortable utility column.

Existing API Group supports explicit name ordering only and does not whitelist type as a request filter. Its scopeType helper does not establish public query support. User count is a computed relationship count, so it cannot be treated as a physical groups column.

Proposed API scope, approved by Liam on 5 October 2026: add type to Group valid_wheres; enable created_at/type ordering alongside name; implement collection-wide users-count ordering using the existing relation-count/query ordering conventions. Retain account/feature security scopes and existing response fields. Frontend will send the supported server parameters from an Elements-only request adapter, reset to page 1 on filter/sort changes, keep sort arrows consistent with effective ordering, and retain DataTable updating feedback. No client sorting of the current page. API edits are authorised for this scope only and remain uncommitted.

Additional acceptance: each data column sorts ascending/descending across pages; Type filter combines with search; counts include zero-member groups; search/filter/sort/page size survive refresh and Back/Forward; security-scoped groups remain excluded. Default order must be checked against the existing endpoint rather than inferred from valid_orders.

## Implementation evidence

Admin Elements Groups module and dynamic route are registered. Settings/favourites destination mapping owns the parent list in Elements; group creation and row links remain same-tab Angular handoffs. The high-level DataTable owns search, Type filter, visibility controls, sorting, pagination, skeletons, updating overlay, empty/search-empty and error/retry presentation. It renders the React baseline fields and non-custom lock predicate. Search/filter/sort/page-size changes reset page 1. Per-page/type preferences use elements:params-groups; URL state supports refresh and history. Type options use the existing complete userGroups reference query, rather than types from only the current page. Failure of that reference query can leave options unavailable; the parent list request still reports its own errors independently.

The Elements-only request adapter retains GET /groups and existing group_rfields/group_keyword; it adds group_type using the API's @value|value encoding and order_by=field|direction. Shared Groups Command and original React module are unchanged. Local API Group adds type valid_wheres, created_at/type valid_orders and relationship-count user_count ordering through the existing scopeOrder seam. Default id DESC ordering and security scopes remain unchanged; no default arrow is shown for the undisplayed id column. Deleted users are excluded from the count as in the displayed relation count.

Admin development build and final TypeScript check passed; PHP syntax and whitespace checks passed. No package release was required. Authenticated browser acceptance and database-backed filtering/sorting remain unverified; the local API changes must be served by the API endpoint used by Admin. No commits or pushes were made. Existing unrelated working-tree changes were preserved.

Presentation follow-up: column order is Lock, Name, Type, Users, Date created. The Type filter dropdown is searchable. Lock header/cells use w-10.

Navigation correction: Groups had been omitted from the Settings internal-click allowlist and Shell navigate handler. Both now handle Groups with stateService.go; Shell also recognises Groups as Settings-active. The Elements header, breadcrumb and route title use User groups. TypeScript verification passes; browser persistence acceptance remains pending.
