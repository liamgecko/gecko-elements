# Templates parent page migration evidence

1 October 2026. Status: implemented; full behavioural acceptance pending. Read the [migration plan](../README.md) first. Current React source baseline: Admin `3cf5c1bc7107630ce7ab86f6b36ed82e1084d631`. Target: uncommitted changes under Admin `src/Elements/Modules/Templates`, using installed `@geckolabs/elements@0.1.0-next.9`. The old experiment is not the behaviour source.

## Approved scope

Migrate `/admin/elements/settings/templates/list` and `/admin/elements/settings/templates/deleted`, including the parent header, breadcrumbs, tabs, favourite, active/deleted lists and existing dialogs/actions. Settings and canonical favourites map to these Elements destinations. New template and active row links retain their canonical existing-app create/editor destinations. No template editor, usage page or other child page is migrated.

The user explicitly approved Elements table defaults without application styling overrides (15/25/50 rather than React 15/30/50), immediate search/filter queries without Apply/Clear filter buttons, and unchanged lock/unlock behaviour. Category multi-selection is supported by the API's comma-separated `category_id` filter, confirmed in Gecko-API `app/Models/Template.php`. No library change or package release was needed.

## Behaviour and implementation

- The persistent parent owns Header tabs and DataTable. Requests run after the table mounts; initial loads show built-in skeleton rows. Query updates retain useful rows and ignore obsolete responses. Sibling tab transitions retain the parent and shell, with the target tab's loading table rather than stale rows from the other tab.
- Requests reuse `getTemplatesFn` and `getDeletedTemplatesFn`. The deleted list sends `trashed=only`; restricted fields, default Email/SMS/Document types and feature-gated WhatsApp are preserved. Search, type/category/lock-status filters, supported sorting and pagination are represented in URL parameters. Requests use normalized table values so an old 30-row cache cannot fetch 30 while the control displays 15. Filter/page-size caches remain separate per tab. Selection clears when the query/data refreshes.
- Name, Type and Subject server sorting are available on both lists, confirmed against the API model’s valid orders. Name stays visible; Type and Subject can be toggled. Active rows retain native editor links. Deleted rows offer Restore with the existing update ability; the deleted tab retains the existing delete ability requirement.
- Row actions retain test email, clone, delete, add/edit lock and unlock. Clone retains create/drag-drop permission checks and the WhatsApp exclusion. Delete and lock actions retain lock-access and ability checks. Bulk actions retain add-to-category, edit lock, unlock and delete; deleted selections retain restore. Locked-out rows are excluded using the unchanged source helper, with the source exclusion decision or all-locked-out information shown before proceeding.
- Test email retains the current-user email default, draft persistence, original field copy and prepared Command. Category assignment uses existing template categories; it does not create categories inline. Lock assignment uses a grouped multi-select Combobox for Users/User groups and the original assignment IDs. Non-super users retain self/group protection; empty existing individual assignments remove the lock; empty bulk assignments unlock. Existing EntityLocks Commands own the payloads. After lock changes, unlock grants are refreshed before updating/refetching the table.
- Queued delete/category actions use a scoped Elements adapter for the original `/templates/mass_action` payload and queue notifications, because the shared completion helper targets the legacy router. The adapter preserves initial/completion/error feedback and subscription matching; completion refreshes only the still-mounted matching Elements tab. The legacy helper is unchanged.
- Editing dialogs use Dialog; consequential decisions use AlertDialog. The all-locked-out notice uses Dialog with a dismissal. Common actions use the installed Button presets where available; feature-specific controls keep their existing labels. Existing restore-success translations are referenced at their actual locale paths rather than leaking the old invalid lookup keys.

Files: Elements Settings and Shell navigation, `src/Elements/Modules/Templates/{index,state}.tsx`, `Helpers/index.tsx`, `Components/Dialogs/index.tsx`, Elements Router/View and Navigation, and additive English/Spanish locale keys. Legacy pages, Commands, shared components, package manifests and lockfile are unchanged.

## Verification and remaining acceptance

- `npx tsc --noEmit` and the final `npm run build:development` passed using supported Node 22.21.1. Both entries built; existing large-chunk warnings remain. No migration tests were added or run.
- Targeted ESLint passed with the installed TypeScript parser and TypeScript unused-variable rule. The repository's unchanged default ESLint configuration does not parse TypeScript; its initial parsing failures were configuration limitations, not a passing lint result.
- In the authenticated Stage 281 browser, Settings exposed the new Elements Templates URL, and activating it rendered the live list: 445 results, 15 rows, Name/Type/Subject, search, filters, column controls, row actions, both tabs and canonical New template/editor links. A subsequent browser interaction was interrupted by the user changing the active app; it is not recorded as a passing check.
- Still required: active/deleted tab persistence, immediate search/filter results, sort/column changes, pagination/cache/Back/Forward/refresh, keyboard focus restoration and all dialogs in the browser; slow/failure/race scenarios; restricted abilities, WhatsApp-disabled accounts and inaccessible locks; authorised clone/delete/restore/category/test-email requests and success/failure feedback; individual/bulk lock assignment/removal, self-protection and refreshed access; queue completion/failure and navigation away before completion; favourite mutation/limit. No live template data or permissions were changed and no test email was sent.

Do not mark this slice verified until those scenarios pass. Next: review the parent page and complete its acceptance before selecting any child migration.

## Parent-page follow-up (1 October 2026)

The user requested consistent deletion terminology and dropdown grouping. Elements row and bulk actions now say “Delete template” and “Delete templates” using dedicated English/Spanish keys; legacy labels remain unchanged. Delete is last and uses `separatorBefore: true` in both action definitions. Dropdown and Data table contracts plus the human Dropdown guide document this convention.

The initial Settings link mapped the correct URL but omitted Templates from its internal-navigation handler, causing a document reload. Settings now routes Templates internally; the shell also handles canonical Templates favourites internally and keeps Settings active in its navigation. Live Settings → Templates navigation retained the same document/shell accessibility nodes. Lock cells use the explicitly requested `w-10` classes, retain the 40px column size, and render SquareLock01Icon/SquareUnlock01Icon at 16px. The development build passed after these changes.

The API supports Type and Subject sorting, now enabled on both tabs. API `Template::scopeOrder` applies ordinary `orderBy` with no missing-subject normalization or blank-last rule. Keeping null/empty/placeholder subjects outside the alphabetic comparison across all pages requires backend ordering, rather than sorting a single fetched page. That broader API change is awaiting the user’s scope decision; no API files have been changed.

## Cache isolation repair (1 October 2026)

The user reported that the original Templates route stayed blank and its links failed. Browser verification reproduced the legacy shell without page content. The first Elements implementation reused `params-templates.list` / `params-templates.list_deleted` and wrote null filter values. The unchanged legacy transition hook retries whenever a cached parameter has no current value, including cached nulls, creating an endless aborted transition.

Elements now reads/writes `elements:params-templates.list` / `elements:params-templates.list_deleted`. Its router initialization narrowly repairs old four-field cache entries by removing null values, retaining populated preferences and copying them into the isolated cache when absent. No original-page/router/Command files were changed. Loading Elements ran this repair; reopening the original URL rendered its full table with 447 results. The development build passed. This is an example of runtime state crossing an isolation boundary despite source files remaining unchanged; future migrations must isolate persisted keys as well as documents/styles.

## Dialog and date-column snagging (1 October 2026)

- Retain the last active email/category/lock dialog payload during close animations. Clearing the payload previously replaced the closing form with the default lock form, flashing unrelated content and changing the category combobox's item/value shape while mounted. Dialog roots stay mounted; form bodies reset between tasks only after the previous dialog has finished closing.
- Confirmation and form actions name their tasks: Unlock template(s), Send test, Update permissions, Confirm delete, Add to category and Restore template(s). Send uses SendHorizontalIcon; unlock uses SquareUnlock01Icon; restore uses DeletePutBackIcon. Edit lock permissions matches the individual and bulk menu wording.
- Successful lock/unlock operations report Template or Templates successfully locked/unlocked according to the affected count. Individual and queued bulk deletion completion use deleted wording; queued work retains its original in-progress API feedback.
- Request created_at and deleted_at through template_rfields. API Base serialization exposes these as Unix timestamps; render through the existing account-aware Dates helper. Active Templates defaults to Created at descending; deleted templates defaults to Deleted at descending. Both expose their active sort state. Template overrides scopeOrder and accepts the requested timestamp fields; valid_orders alone was not an accurate capability check.
- Admin development build passed. Authenticated browser checks confirmed actual created/deleted dates, Send test/Update permissions/Unlock template/Restore template button labels, and email/category/permissions dialog dismissal returning to the table. No email, permission, delete or restore mutation was submitted; success-toast wording was verified in the handlers, not through live mutation.

## Closing lifecycle follow-up (1 October 2026)

The first snagging pass checked final closed states, which did not verify the visible animation. Confirmation payloads were still cleared on dismissal/action click, removing controls and destructive styling during closing. Form payload retention alone did not establish the proper lifecycle.

- Keep dialog/confirmation payloads separate from their open flags. Close through Base UI and clear payloads only in onOpenChangeComplete(false), preserving title, form, controls and variant throughout exit.
- Capture confirmation actions on click; execute them once after closure completes so table refreshes or subsequent dialogs do not interrupt exit/focus restoration. Cancel never queues an action. Keep roots mounted and stable.
- Editing existing or bulk lock permissions uses a permissions-updated success toast. New individual locks use locked; removing assignments uses unlocked.
- The same explicit descending default sort feeds the API request and controlled table state, including after clearing a sort. Browser shows Created at/Deleted at controls offering ascending as their next action, and deleted dates ordered newest first.
- Admin development build and final type check passed. Authenticated browser verified destructive confirmation dismissal returning focus to the row trigger and actual descending deletion dates. No mutation was submitted. Animation correctness is supported by the lifecycle change; final-state snapshots alone are not evidence of frame-by-frame smoothness.
- Dialog and Alert dialog contracts now document payload retention, completion callbacks, stable root/focus targets and visual verification of closing and submission.
