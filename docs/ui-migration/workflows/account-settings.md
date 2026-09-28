# Account settings migration evidence

28 September 2026. Status: implemented in the Admin working tree; live behaviour acceptance incomplete. Read the [migration plan](../README.md) first. Source baseline: current Admin `e0a13ee90` plus its pre-existing working-tree changes and the signed-in `/admin/settings/account` page. Target: `/admin/elements/settings/account`, uncommitted. The earlier `elements-experiment` branch was not used as the behaviour source.

## Scope and source behaviour

The current Account route resolves `GET /accounts/{currentAccountId}` before rendering. `Modules/Account/index.jsx` supplies the fields and ability conditions. The form has Details (name, unique identifier, default country, address), Date and time (timezone, date/time formats), Communication details (email/caller/SMS senders, ringtone, recording retention, event status defaults), Branding (colour, custom CSS), Image uploads (account logo, mobile header background/logo), and Analytics (Google Tag Manager ID). Caller ID requires `ABILITY_CALLS_CREATE`; SMS ID requires `ABILITY_SMS_BROADCASTS_CREATE`. Sender options come from the existing `useSenders` query and filters. Labels, help text, option order and the current live values were compared against the existing page.

Save uses the existing Account command, posting the same form keys with `settings: { make_public: true }` and converting “Forever” retention to `null`. The existing success/error messages and branding cache-clear/reload condition remain. Image selection uses the existing upload command and AV-status hook; Elements Attachment presents the lifecycle and preview. The current unsafe-file warning is surfaced through Attachment's error presentation.

The current form marks required fields but does not use browser-native required validation. The Elements form keeps the markers and uses `noValidate` so the existing save/API path remains the submission authority. Custom CSS keeps the current 10-row initial textarea height.

The page uses the persistent Elements shell and approved Header, Container, Card, Field, Input, Textarea, Select, Combobox, ColorPicker, Attachment, Button and AlertDialog contracts. Account is lazy-loaded; static route metadata supplies its title while its account request resolves. The Settings card and breadcrumb navigate internally, and the canonical Account URL remains the favourite identity. Other destinations remain on the current app. No legacy route/component or shared UI code was changed for this page.

The user requested a tab for each of the six Account cards and moved the save control into Header with the label “Save settings”. Header tabs select one visible card at a time. Inactive panels remain mounted so edits and uploads survive switching; the Header action submits the same form and save command.

## Verification and remaining work

- `npm run build:development` passed after the final edit; TypeScript and both Vite entries compiled. Existing chunk-size warnings remain. No automated tests were added or run, per user direction.
- The live Elements page showed the current account's fields and values, including an empty SMS sender and the displayed attendance/registration defaults. Settings → Account → Settings navigated without replacing the shell. While Account data resolved, the Account title and Settings breadcrumb appeared before the form, and the favourite action stayed disabled. An unsaved name edit triggered the leave dialog; Keep editing preserved it, and Discard changes returned to Settings without saving. The Account link reopened the original value. A clean deep-link refresh restored the page.
- After the tab change, browser inspection showed six labelled Header tabs and the single “Save settings” Header action. Keyboard arrow navigation and Enter activation worked. An unsaved name edit remained intact after switching tabs, and discarding it via the existing leave dialog did not change the live account.
- The repository's ESLint configuration cannot parse its TSX files, so no TSX lint pass is claimed. `git diff --check` passed for tracked changes.
- Live Save, upload/retry/removal, API failures, favourite mutation, restricted-role variants, Back/Forward, deliberately slowed data loading, and browser-close protection have not been exercised. Do not mark parity verified until these are checked against the current Admin page. No live account data was deliberately saved or uploaded during this investigation.
