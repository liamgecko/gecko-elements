# Application patterns

Read [the usage guide](../README.md), then use the [capability index](capabilities.md) to select contracts. These are application-owned starting points, not additional public component APIs. Copy the recipe files into the consumer, adapt API/router adapters, and retain the regression cases. The human docs page imports these exact files; it does not maintain a second implementation.

## Choose a starting point

| Task | Executable source | Contract / limits |
| --- | --- | --- |
| Persistent record header, tabs, unsaved edits | [persistent-editor.tsx](recipes/persistent-editor.tsx), [use-unsaved-navigation.ts](recipes/use-unsaved-navigation.ts) | [Header](header.md), [Alert dialog](alert-dialog.md); router integration remains app-owned |
| Async validation and save | [async-form.tsx](recipes/async-form.tsx), [use-async-action.ts](recipes/use-async-action.ts) | [Field](field.md), [Toast](toast.md); schema and API errors remain app-owned |
| Upload, scan, retry and removal | [upload-field.tsx](recipes/upload-field.tsx) | [Attachment](attachment.md); adapter resolves only after scanning succeeds |
| Remote/dependent selector | [remote-combobox.tsx](recipes/remote-combobox.tsx) | [Combobox](combobox.md); server search, not client filtering or pagination |
| Remote collection and empty state | [remote-table.tsx](recipes/remote-table.tsx) | [Data table](data-table.md), [Empty](empty.md); API must implement the requested sort/filter |

## Ownership

| Library | Application | Backend |
| --- | --- | --- |
| Tokens, sizing, icons, control semantics, focus management, overlays, table presentation | Data/cache, stable route metadata, permissions, validation, navigation guards, transactions, notifications | Authoritative permissions, supported sort/filter keys, validation, persistence, uploads/scanning, provider approval |

Do not infer backend support from a sortable header or a filter widget. Verify request/response behaviour before exposing it. Cached metadata can supply a title, editor kind, status and known layout; it cannot grant permission. Unknown capability is an explicit gap to resolve, not a guessed default.

## First paint and refresh

| Known state | Render |
| --- | --- |
| Record name / tab / editor kind known from navigation or scoped cache | Correct Header and breadcrumbs immediately. Keep the record layout mounted across child routes. |
| Title unknown on a cold URL | Resolve route metadata before publishing that page, or reserve only its unknown text region. Never show “Create new…” for an existing record. |
| Body unknown, shape known | Stable field labels/cards and a Skeleton matching the final control dimensions. Mount tag-building sections immediately, even while their options load. |
| Collection shape unknown | Neutral, bounded region with a modest Skeleton and an accessible loading label. Do not predict a table or an empty result. |
| Confirmed empty collection, no active query | Empty only, without table headers, toolbar or pagination. Retain a cached empty view while refreshing it. |
| Search/filter returns no matches | Keep query controls and table; show Empty inside the table body with a clear action. |
| Rows known, refreshing | Retain rows and dimensions with DataTable updating. Match multiline skeletons to multiline cells when loading a known table. |
| Request fails | Clear pending; show retry for that region. Preserve useful previous data; never present failure as an empty success. |

Keep the full applicable action row stable. If permissions must be resolved before exposing an action, resolve the header as one unit or reserve the complete action region; do not append actions later. Tab navigation alone must not disable Save. An unresolved body cannot be saved: guard the handler until ready. Save buttons never show loading, saving text, a spinner or a disabled appearance just because a save is pending. Keep duplicate-submit protection in the handler; report success or failure through Toast. Other actions may use progress only where their component contract allows it. Keep persistent status alerts in the initial known page structure. Do not substitute spinners for page skeletons; component-owned runtime/action indicators remain valid where their contracts specify them.

Use one owner for vertical scrolling. A viewport editor fills remaining flex space (`min-h-0`, `flex-1`) inside a bounded shell; do not add an arbitrary viewport subtraction and a second page scrollbar. Desktop application layouts retain a 1024px minimum width and horizontal overflow below it, as defined in the usage guide.

## Async operations

Validate every equivalent mutation through the same function, including Save and Submit for approval. Field failures go to FieldError with the first invalid control focused, `aria-invalid`, `aria-describedby`, and a required mark on every required label. Network/operation failures use Toast or a persistent retry region. Preserve existing helper text. Success notifications use correct singular/plural counts and do not insert transient text into the layout.

`useAsyncAction` snapshots submitted input, blocks same-tick duplicate submission and ignores callbacks after unmount. Later edits remain dirty after the earlier save completes. Always release pending in finally. Ignoring a result does not cancel a server mutation: the API must supply idempotency and concurrency controls where required.

Uploads track independent field tokens, not a single global flag. Save waits for all active uploads/scans. Failure restores interaction and managed Attachment offers retry. Removing or replacing a file invalidates its outstanding result. Do not persist object URLs; the application owns verified file references and cleanup of abandoned server uploads. The example leaves preview off until the app has a verified preview policy.

## Remote selectors

Store selected value/label independently of search text and results. Do not treat the selected label as the next search query. Reopening a selector displays all currently available options. The remote recipe disables local filtering with `filter={null}`, cancels obsolete requests and ignores stale completions. Keep the input operable while loading; communicate pending/error within the popup and associated status. Use the existing grouped Combobox composition for users and groups; preserve group identities from the API.

For dependent fields, key the selector by parent identity and clear the downstream form value on parent change. This aborts its old request and clears query/selection. If selection belongs to form state, lift `value`/`onValueChange` out of the example. A virtualized or paginated remote selector is not supplied by this recipe: implement and test the application adapter before claiming that capability.

## Unsaved navigation

`useUnsavedNavigation` accepts `{ proceed, cancel }` transitions. Tabs call `request`; router blockers feed the same method for links, breadcrumbs, programmatic navigation and Back/Forward. On Keep editing, call the router blocker reset/cancel; on Discard, restore the saved baseline and call its proceed exactly once. A later transition must not replace a pending decision. Mount the guard above child routes. The router must block transitions before unmounting; a plain `popstate` listener that allows navigation first is insufficient.

The tab example is router-neutral: it does not install a router or claim that native anchor/history navigation is automatically intercepted. Integrate your router's supported blocker, register it while dirty, and verify Back/Forward against the real application. Preserve modifier-click/open-in-new-tab behaviour. Do not monkey-patch `window.confirm` or history. Use the Elements AlertDialog with focus return and the shared discard/keep-editing icons. Browser refresh, close and cross-document navigation can only use native beforeunload confirmation; browsers do not permit an application AlertDialog there. Prevent a second beforeunload prompt when an already-approved transition leaves the document.

## Verify before handing over

Run `npm run check:contracts`, `npm run test:recipes`, `npm run typecheck` and the relevant editor/React compatibility tests. See [verification](verification.md) for exact coverage and [migration checklist](migration-checklist.md) for product parity evidence. Passing recipe tests does not prove a consumer wired its API or router correctly.
