# Verified senders and Domains migration evidence

Read the [migration plan](../README.md) first. Last updated: 1 October 2026.

## Scope and baseline

The user authorised migrating both parent lists, adding status filters and sorting every data column through the API's existing model mechanisms. Both expose creation timestamps; Sender gains the requested Date created column. No editor migration or additional workflow is authorised. Never commit API changes. Obtain explicit approval before any further API edit.

Baseline: Admin `3cf5c1bc7`, `App/src/Modules/Senders` and `Modules/Domains`, their unchanged Commands and current routing. API `494f726f87`, branch `design/elements-migration`. The working trees contain unrelated earlier migration changes; this record covers only this slice.

Routes: `/admin/elements/settings/verified/senders` and `/admin/elements/settings/verified/domains`. Canonical product destinations remain `/admin/settings/verified/senders` and `/admin/settings/verified/domains`. New/edit links retain the existing `/#/settings/verified/{senders|domains}/{new|id}` Angular destinations. No original React modules, Commands or legacy route registrations were changed.

## Behaviour and implementation

- Public Elements Header, tabs, Container, DataTable, sortable column headers, status filters and Badge supply presentation. Sender columns are Name, Email, Verified and Date created; Domain columns are Name, Verified and Date created. Every data column sorts on the server; the actions column does not sort. The existing default API ordering remains `id DESC`; no misleading visible default date sort is asserted.
- Badges retain Active for boolean true, Deactivated for false and Pending otherwise. Sender lists remain email-only (`type=10`). Both lists use `verification_status` in their existing model search scopes; Sender matches its existing domain-derived verification accessor. Single status values are `1`, `0` or `null`; multiple values use existing `@1|0|null` syntax. Conditions are grouped, values are bound, and sort directions are constrained to ASC/DESC.
- API changes are confined to `app/Models/Sender.php` and `VerifiedDomain.php`: extend `valid_orders`; Sender adds a model order scope and computed-status condition; Domain adds grouped status conditions in its existing search scope. Base ordering, generic filters, existing search, security scopes and `only_verified_sender` remain intact. The computed status gives direct verification priority, then related domain verification, then the stored value. The existing generic `verified` filter remains available unchanged. The dedicated status filter avoids generic filtering's single-value `@` handling and nullable-value coercion.
- Preserve the nonverified Sender row action Send verification email through unchanged `prepareResendEmailVerificationFn`, including its endpoint and existing success/failure feedback. Guard duplicate sends. Domains have no added row actions. Neither list introduces dialogs, deletion, bulk actions or editor changes.
- Immediate search, status changes and sorting reset pagination through Elements remote query state. Page sizes follow Elements defaults 15/25/50. Column selection is offered; primary Name remains visible. Native row links preserve modified clicks and Angular handoffs.
- Shared parent layout and sibling-tab transition handling retain shell/header while the table changes. Known tables show skeleton cells on initial reads; refresh retains useful rows, stale responses are ignored and failures remain local with retry. Each tab retains its query state while mounted. Per-page/status preferences use `elements:params-senders` and `elements:params-domains`; canonical legacy caches are untouched.
- Settings directory and safe favourite navigation recognise both Elements routes. Existing canonical favourite destinations and the five-item limit are retained. Localised additions are confined to Elements keys in English and Spanish. Existing API permission enforcement is retained; no new frontend restriction is substituted for it.

Admin implementation: `App/src/Elements/Modules/VerifiedSenders/{index,state}.tsx`, Elements Router/View, Navigation, Settings, Shell and locale additions. No package change is required.

## Verification and remaining gaps

Admin development build (TypeScript and Vite) passed. API PHP syntax checks and both repository whitespace checks passed. An inline SQL fixture exercised direct/domain true, false, null and deleted-domain cases, and descending status ordering; no test files were added. This is bounded SQL evidence, not an actual Laravel/MySQL endpoint test.

Signed-in browser checks showed 18 Senders and 10 Domains, creation dates and sortable headers. Switching tabs retained the existing shell/header. A Domain Active selection updated the URL immediately. Its initial zero result exposed incorrect single-value `@1` encoding despite two Active badges in the baseline; this was corrected before handover using the dedicated model status scopes. Clearing restored 10. The corrected filter requires this API branch and has not been verified against a running endpoint. A nonmatching search updated the URL immediately, displayed the table's no-results state and Clear search, and clearing restored 10. The column-selection menu exposed Verified and Date created while keeping Name mandatory. Create links retained their existing Angular destinations. No verification email was sent and no product data was changed.

The local API container is unavailable. The browser uses the account's existing API, so these observations do not establish that the new Sender status filter or added sorting is deployed. Remaining checks: run this API branch, verify each column ascending/descending across pagination, direct/domain/multiple/Pending status filters, filtered refresh and Back/Forward, column toggles, role variants, slow/failed reads, and authorised resend success/failure. Confirm original React navigation independently in the same environment. Do not mark this workflow fully verified until those checks pass.

Next step: run the API branch in an authorised development environment and perform the remaining server-backed checks. Keep API changes uncommitted. Obtain explicit approval before any further API edit.

## Sorting report investigated 5 October 2026

Reproduced in the signed-in browser. Network inspection confirmed Admin calls `https://api-stage.geckoform.com/senders` with `order_by=created_at|DESC` and `order_by=verified|DESC`. The date response started in 2014 and increased chronologically, and the status response interspersed Pending among Active rows. Both requests were correctly generated by the Elements controls, but the stage endpoint did not honour them. The local API branch still contains the uncommitted sorting/filter additions; the committed Sender baseline only allows name/email, and the committed Domain baseline has no valid_orders. Docker remains unavailable locally. This is runtime evidence that the currently used endpoint lacks working support, not evidence of a frontend request mapping fault. No speculative frontend sorting fallback or API commit was added. Run/deploy the authorised API branch before re-verifying these controls; deployment is not authorised by this investigation.
