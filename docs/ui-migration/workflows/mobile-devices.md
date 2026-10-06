# Mobile devices migration evidence

Read the [migration plan](../README.md) first. Last updated: 30 September 2026.

## Scope and baseline

The user selected Mobile devices after reviewing the component mapping, and requested a page Empty state for an empty collection. Baseline: current Admin `2f835c365`, `App/src/Modules/Devices/{index,state}.jsx`, `Components/Modals/Devices/RenameDeviceModal/index.jsx`, `Commands/Devices/index.jsx` and ListView/Pagination. The signed-in React page and rename modal were inspected before browser verification of the new page. The older experiment is not a baseline.

Route: `/admin/elements/settings/devices`, owning the canonical product destination `/admin/settings/devices`. Preserve `page`, `perPage`, `keyword`, `sort` and `sortBy` bookmarks. The original page exposes no search, filter, column-toggle, selection or row-navigation controls. Its sort allowlist contains `name`, but the name column is keyed `label`, so no sort control actually renders. Do not introduce these controls during migration.

## Behaviour and implementation

- Reuse unchanged GET `/devices` through `getDevicesFn`, including `include=user`, page, per-page, keyword and optional `order_by` mapping.
- Keep Name (`label || udid`), Type, App version, OS version and Last login. Missing ordinary column values use `n/a`; a null user shows Never. User email links retain `/#/settings/users/{id}/settings`.
- The only row action is Rename device. A public Elements Dialog contains the existing memorable-name instruction, Input, Save and dismissal controls. The label is optional; submit `{label: value}` through unchanged `prepareSaveDeviceFn` to POST `/devices/{id}`. Success toast, close and current-query refresh occur after success. Failure toast leaves the dialog and draft available. Guard duplicate pending submits. The existing modal's draft persistence across dismissal is retained.
- Public Header, Container and DataTable own the page presentation. Header/breadcrumbs persist during requests; skeleton cells stay inside the mounted table. Refresh retains useful rows, stale read responses are ignored, read failures show local retry, and DataTable supplies a full Empty when the underlying collection is empty. Filtered bookmarked queries use the table's no-results treatment and Clear search.
- Canonical favourites, five-item limit, pending guards and safe URL matching follow the existing Elements pages. Settings directory, shell navigation and pending breadcrumbs recognise the new route. English/Spanish additions are confined to `components.elements_devices`.
- Implementation: `App/src/Elements/Modules/Devices/{index,state}.tsx` and `Components/Modals/RenameDevice/index.tsx`; existing React pages, Commands, shared components and package versions are unchanged.

## Verification and remaining gaps

The development build passed with existing chunk-size warnings. No automated tests were added or run, per user direction. Signed-in inspection showed the same 1,160 devices and five columns as the current app, including Never and user email links. Rename opened the matching field and focused its Input; draft typing and Tab worked without saving. Live mutation, failed reads/saves, an account with no devices, deliberately slow responses, role variants and favourite mutations remain unverified.

**Page-size capability gap:** current React Pagination offers 15/30/50; the installed Elements DataTable fixes options at 15/25/50 and does not expose configuration. The user has been asked to approve a library prop rather than silently restyling or replacing pagination. Full parity remains open until this is resolved.

Next step: resolve the page-size decision, then verify save success/failure using an authorised disposable device and the remaining empty/loading/navigation scenarios.

## Requested table controls and login-time investigation

On 30 September the user explicitly expanded this slice to toolbar search, filters, column selection and API-supported sorting, and asked whether Last login could show time plus user in a two-line cell. This supersedes the initial decision to expose no additional table controls; it does not authorise silently changing the API or searching/sorting only the loaded page.

The local Gecko-API checkout `4b3bd75154` was inspected: `DevicesController::index` delegates to `Device::respond`; Device allows exact filters on `app_version`, `geoip_id`, `label`, `os_version`, `type` and `udid`. Base `scopeValidWheres` supports equality and multiple values using `@value|value`. Device's `scopeSearch` only applies `notifiable`; it does not call keyword search, inherits empty search fields, and defines no allowed custom sort fields or sort scope. Its default ordering is `updated_at DESC`. The Devices OpenAPI documents the same field filters. These findings are source evidence; the deployed endpoint's ignored-keyword/sorting behaviour has not been independently checked.

Implemented the Elements Filters toolbar with an iPhone/iPad/Android Type filter, equality/multiple-value operators and Clear filters; query changes reset pagination and are stored in the dynamic `type` route parameter. Column selection retains the mandatory Name column and uses translated product column names. The module-owned request now uses the unchanged ApiRequest service to send the filter because the existing shared Devices command drops unknown parameters. Rename continues using the unchanged save command. No API, shared command or legacy page was changed. English/Spanish toolbar and filter labels were added. Development build and whitespace checks passed; no automated tests were added or run.

Free-text search and custom sort controls remain unavailable until the API supports them. The user has been asked whether search should include an API change; that decision is pending. Do not display inactive controls or apply page-only sorting/search as though they cover the server collection.

Device schema exposes creation/update timestamps but no device-specific login timestamp. `updated_at` is also changed by rename, GeoIP, notification setup and response association; it is not evidence of login. The related User's `last_login` derives from `last_web_login`, not this device's login. Keep the original user email link for now; a truthful time/user DataTableMultiLineCell needs a device-specific timestamp supplied by the API, with a matching multiline skeleton.

Signed-in refresh confirmed translated Filters and Columns controls. Selecting Type → iPad updated the route to `?type=ipad` and reduced the server result count from 1,160 to 45. The browser was subsequently used by the user, so column-menu toggling and multi-type filter checks were not completed. No device data was saved or changed.

The user subsequently requested “Device name” as the rename field label. Following the user’s clarification, the existing memorable-name guidance uses DialogDescription beneath the dialog title; the Input retains the separate Device name label. English and Spanish label/description keys were updated; save behaviour is unchanged.

The dialog footer labels are Cancel and Rename device, as subsequently requested, with corresponding Spanish translations. Dismissal and save behaviour are unchanged.

The Elements rename success toast now reads “Device renamed” (with a Spanish translation), as requested. The modal supplies this message through the save command's existing success callback; the shared command and legacy page's toast remain unchanged.
