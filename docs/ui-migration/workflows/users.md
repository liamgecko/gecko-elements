# Users parent page

Read the [migration plan](../README.md) first. Requirements surfaced before implementation on 5 October 2026. Baseline: current Admin `src/Modules/Users`, its state/Constants/UsersList, `Commands/Users`, and ChangeUserGroupModal/EmailUserModal. This is source evidence; runtime acceptance remains required.

## Requirements and component mapping

| Existing UI/behaviour | Elements component/composition | Contract | Application logic/API retained | Gap or decision |
| --- | --- | --- | --- | --- |
| Settings breadcrumb, page heading, New user | Header, Container | [Header](../../../packages/ui/docs/header.md), [Container](../../../packages/ui/docs/container.md) | New user `/#/settings/users/0/settings`; original editor remains outside this slice | Preserve existing unconditional New user visibility |
| Active/Pending/Archived tabs | Header tabs | Header | `/settings/users/active`, `/pending`, `/archived`; active/invited flags or `user_trashed=only` | Deactivated is commented out in current source; keep hidden |
| Server list/search/group filter/pagination | DataTable with controlled remote state and toolbar | [Data table](../../../packages/ui/docs/data-table.md) | GET `/users`, include group; same restricted fields, keyword mapping and group_id; independent tab query state | Elements page sizes and immediate query convention apply; no API edits |
| Name, group, date added; Active-only chat/call status and last seen | DataTableColumnHeader, Avatar label/description, Badge | Data table, [Avatar](../../../packages/ui/docs/avatar.md), [Badge](../../../packages/ui/docs/badge.md) | Preserve name/email, group fallback, local date format and relative last-active display; sorting only full_name/created_at/last_active; default created_at DESC | API User valid_orders contains existing sort fields; live server ordering unverified |
| Row click | DataTable rowLink | Data table | `/#/settings/users/{id}/settings` | Preserve native links |
| Restore/reactivate/unavailable/archive actions | DataTable row actions; AlertDialog for archive | Data table, [Alert dialog](../../../packages/ui/docs/alert-dialog.md) | Restore: archived + deleted_at + users.create; reactivate: presence deactivated; chat/call unavailable: Active + available + users.update; archive: Active/Pending + users.delete | Current dropdown ignores top-level showWhen=false and filters its items; preserve actual actions. Archive last with divider |
| Bulk selected users | DataTable selectActions/controlled selection | Data table | Email with users.update on all tabs; group change with users.update on nonarchived tabs; archive with users.delete on nonarchived tabs | Selected IDs stay attached to records; archive last with divider |
| Change group dialog | Dialog, Field, Combobox, Button save preset | [Dialog](../../../packages/ui/docs/dialog.md), [Field](../../../packages/ui/docs/field.md), [Combobox](../../../packages/ui/docs/combobox.md), [Button](../../../packages/ui/docs/button.md) | Existing group reference query; initial empty group; POST `/users/mass_action` attributes group_id action with conditions.id | Preserve queued completion refresh |
| Email sender/template/subject/body | Dialog, Field, Combobox, Input, RichTextEditor, Alert | Dialog, Field, Combobox, [Input](../../../packages/ui/docs/input.md), [Rich text editor](../../../packages/ui/docs/rich-text-editor.md), [Alert](../../../packages/ui/docs/alert.md) | Default account sender; email senders/templates only; verification warning; selected template fetched with name,subject,body,include_wrapper; clearing/failure clears subject/body; subject/body required; same sender_id/subject/body payload | Installed next.10 includes RichTextEditor through the public wildcard export and bundles TinyMCE assets; Admin Vite setup copies these assets for dev/build. No new release required |
| User/sender merge tags | Field/Combobox and Button composition; RichTextEditor insertion ref | Field, Combobox, Button, Rich text editor | Same allowed models, permitted properties/modifiers/filters and token formatter; insert at selection | Application-owned picker; preserve all existing options, not only common tags |
| Email send confirmation | AlertDialog above retained email Dialog | Alert dialog, Dialog | Confirm recipient count before mass email action | Keep form and confirmation payload stable through exit |
| Mutation feedback | Toast; Alert for email validation/error | [Toast](../../../packages/ui/docs/toast.md), Alert | Single delete/restore/reactivate/presence Commands reused; bulk actions preserve payloads and queue job notifications | Legacy mass-action completion helper uses legacy router; Elements adapter must guard completion against current Elements route |
| Loading/empty/error/refresh | DataTable loading/updating/error/retry; Skeleton for unresolved form options | Data table, [Skeleton](../../../packages/ui/docs/skeleton.md) | Preserve shell, header and tabs; initial skeleton cells; retain rows on refresh; stale response protection | No shell skeletons or app table overrides |

## Acceptance criteria

- Each tab requests the original status flag, restricted fields and group include; refresh/deep links and Back/Forward restore its query without remounting shell.
- Search, group filter, all three existing sorts and pagination send correct server parameters; default sort indicator matches created_at DESC. No unsupported status/group sorts added.
- Identity, status badges, dates and missing values match current behaviour. Only Active shows presence/last-seen columns. Column toggles follow Elements contracts.
- New user and row links reach unchanged editors; original React Users routes remain operational.
- Every row/bulk action appears under the same source conditions and sends the same IDs/payload. Archive cancellation makes no request; success/error and queued completion are reported; completion refresh cannot affect a different page.
- Group selection submits the same group_id including existing empty-selection semantics; queue completion refreshes the initiating list.
- Email sender options retain verification warnings and default; templates fill/reset subject/body; subject/body validation and send confirmation are preserved. User/sender tag selections yield identical tokens inserted at the editor selection; formatted HTML survives editing/submission. Email dispatch uses the original payload and recipient IDs.
- Closing/cancelling/successfully submitting every dialog preserves content during exit, restores focus and never exposes a different modal. No unsaved-navigation guard is added where the source has none.
- Empty, filtered-empty, slow initial load, refresh and failed request states remain within the mounted page/table; denied APIs do not expose usable actions/data.

## Status

Implemented on 5 October 2026; live acceptance pending. No API files changed and no commits made. Original React Users implementation remains unchanged. Automated Admin migration tests remain deferred.

### Implementation

- Admin `src/Elements/Modules/Users/` owns the parent page, three tab routes, remote list/query state, conditional row and bulk actions, group/email dialogs, merge-tag picker and queue completion adapter.
- Elements Router, Router/View, Navigation and Settings directory register the Users routes and preserve the mounted shell through tab navigation. List caches use the Elements namespace.
- English and Spanish locales include the migration-specific table/loading/error and action labels.
- Single-user actions reuse existing Commands. Bulk requests preserve `/users/mass_action` payloads and queue notifications. Bulk archive refreshes after the initial response; group changes refresh on completion; email does not refresh the list. Refresh callbacks are guarded against completing on another page.
- Dialog open state is separate from its retained payload; payload clears after exit completes. The email confirmation exits before dispatch, while the underlying email form remains mounted.
- Installed next.10 already exports RichTextEditor through the public wildcard export. Admin's Elements Vite plugin copies its bundled runtime into static assets; the editor uses assetBaseUrl `${import.meta.env.BASE_URL}elements/tinymce-4`. No package publication or version change was required.

### Verification and remaining work

- `npm run build:development` passed using Node 22.21.1; only the existing chunk-size warning remained. `git diff --check` passed.
- The served TinyMCE runtime returned HTTP 200 at `/admin/elements/tinymce-4/tinymce.min.js`.
- Focused ESLint cannot parse these TypeScript files with the repository's current parser configuration; it produced parsing errors, so lint is not claimed as passed.
- Live interactions remain unchecked. A fresh verification browser tab at Liam's supplied `/admin/elements/settings/` URL displays “Your workspace could not be loaded”, as did Users. This prevents signed-in acceptance and does not establish a Users-specific defect or confirm the cause of the startup failure.
- Next: use a working signed-in Admin session to exercise the acceptance criteria above, particularly permissions, tab/query persistence, every mutation/queue result, editor/tag insertion, modal exit/focus, and slow/error/empty states. Build success alone does not establish behavioural parity.

## Requested follow-up: additional controls (5 October 2026)

Liam requested chat-status, call-status and group sorting; chat/call filters on Active; individual Send email and Change group actions; and “Add new user”.

- Implemented the label and individual actions using the existing dialogs, IDs and `users.update` permission. Change group stays unavailable on Archived, matching its existing bulk restriction. Archive remains last, destructive and separated.
- Call-status sorting uses the existing API `presence` order. The Active call-status filter uses the same displayed Available/Unavailable/Offline groups: respectively 10; 20/25/29; 30/80/90. URL state and Elements preference storage preserve its selection. Requests send the existing comma-separated `presence` filter.
- Liam subsequently approved the local API additions, explicitly prohibiting commits and pushes. User valid_wheres/valid_orders now include chat_presence. Its existing scopeOrder additionally sorts `group` by a Group name subquery, mirroring the existing Category relation-sort pattern and preserving users without a group. The original last-active scope behaviour remains intact. Elements enables all three sort headers and both status filters on Active; status filter URL/storage/request mapping uses the same display groups.
- Development build and API User PHP syntax check passed after the approved changes; whitespace checks passed. Live verification remains pending under the startup limitation above. User.php remains an uncommitted local API change; existing Category/Sender/VerifiedDomain diffs were preserved. Nothing was committed or pushed. The API branch must run on the endpoint used by Admin before chat sorting/filtering and group sorting work against that endpoint.

## Chat-presence synchronisation (5 October 2026)

Liam requires header and Users-table chat status to reflect confirmed changes from either location. The existing React Availability component subscribes to `user:updated` and updates UserContext for the signed-in user; Users row actions refresh their list after the existing Command succeeds.

The Elements ChatAvailability control now subscribes to that same event, updates the current user's context/cache, and unsubscribes on unmount. Users observes changes to the current user's chat presence and refreshes its server query; successful own-user row changes update context/cache directly so header synchronisation does not depend on socket delivery. Other-user chat/call presence socket updates refresh the table too. Refreshing the query retains server sorting, filter membership and total counts rather than sorting or filtering the current page locally. Failed row mutations do not publish a confirmed status. Header/menu and DataTable components remain unchanged; this is application state/event wiring.

Development build and whitespace checks passed. Live two-way verification remains pending because the verification browser cannot load the authenticated workspace. Check header Available/Unavailable changes while Users is open, the signed-in user's table action, another user's socket update, active status filters/sorts, and failed mutations. No API edits, package changes, commits or pushes were needed for this fix.

## Dialog and feedback follow-up (5 October 2026)

Liam requested and authorised: exact “User successfully archived” / “User successfully restored” success feedback; restore confirmation; small Change group dialog with “Select group”; “Send email” actions; FieldSet/FieldLegend/FieldDescription and inline Code for tag guidance; secondary Insert tag with EraserAddIcon; Elements field validation instead of browser constraint popups.

Implemented within Admin Elements Users only. Restore uses the retained confirmation payload and dispatches the existing Command after the alert's exit completes. Archive and restore Commands receive local success-toast adapters; shared Commands remain unchanged. Bulk archive uses plural success feedback. Change group uses size sm. Email validates sender selection, subject and meaningful body on submission with noValidate, renders FieldError/data-invalid/aria-invalid/description associations, and focuses the first invalid control (including the editor ref). The tag section uses translated Code composition. No package or API changes are required.

Development build and whitespace checks passed after correcting Code placeholder children and omitting AlertDialog variant for non-destructive restore. Live dialog/validation/feedback acceptance remains pending under the browser startup limitation recorded above. No commits or pushes were made.

Follow-up: email sender/template fields render immediately without skeletons; group changes use “User group successfully changed” for immediate and queued success. Restore confirmation includes the explicit DeletePutBackIcon because restore has no Button preset. These are Elements-only application composition changes.
