# Settings directory migration evidence

24 September 2026. Read [the migration plan](../README.md) first. Status: implemented in the Admin working tree; browser acceptance incomplete. Source baseline: `c3cd68781c8d8303a665b1425468f89581eb0c06` plus inspected working tree. Target is uncommitted and uses installed `@geckolabs/elements@0.1.0-next.4`.

## Scope

The user selected “the settings page” after the shell slice. This implementation covers the main directory at canonical `/admin/settings`, exposed experimentally as `/admin/elements/settings`. It does not rebuild the linked settings screens. Those retain genuine full-document links to existing React routes or Angular hash routes. The Elements root redirects to this first migrated page.

## Existing behaviour and retained contracts

Source: Admin `App/src/Modules/Settings/{index.jsx,data.jsx,state.jsx}`, `Hooks/useAbilities`, and each linked module’s state declarations. No Settings API request is required: the directory is built from existing menu data and authenticated abilities. The existing route has no additional page-level ability restriction. Individual entries retain their exact ability arrays, names, descriptions, ordering, tags and destinations. Empty categories disappear after permission filtering.

The existing seven categories are account, user, field, call, chat, portal and data. Search trims and lowercases input, matching the translated name or comma-separated tags, within the selected category. The implementation retains this behaviour, existing no-results translation and the approved Search clear control, and all React/Angular destinations. The source Options entry has `tag` rather than `tags`; the existing search ignores those keywords. This migration deliberately does not change that product quirk.

`Modules/Settings/data.jsx` reads the current user at module evaluation to produce My user settings. `Elements/Modules/Settings/state.tsx` therefore lazy-loads the module only when its authenticated route renders. The shell no longer waits for this page. `Elements/Router/View` contains page loading/failures and displays the route’s static title; retry reloads a failed chunk. Do not eagerly import the Settings renderer from the entry: that would evaluate its user-dependent data before boot. Importing the data does not import its Bootstrap renderer.

## Elements implementation and persistence

`Elements/Modules/Settings` uses public Header, Container, Card and Empty components, with whole-row native anchors containing each title and description, using Elements foreground/muted/focus tokens. Header tabs represent the existing categories, with a named results tabpanel. Related settings links are grouped in full-width, single-column cards separated by `gap-10`; each CardHeader contains the category title and an English/Spanish category description. Overview → Settings breadcrumbs also appear during page loading. There are no new dependencies or app-specific overrides of component internals.

The existing `section` parameter now updates on category selection; new `keyword` persists local search. Both are dynamic UI-Router parameters, so changes do not recreate the page or shell. Search replaces the current history entry; category selection adds one. Refresh/back/forward use URL state directly. Unknown or inaccessible categories fall back to All settings. These are intentional persistence improvements requested by the migration brief.

Header’s standard favourite control uses the Elements-local context and unchanged save/remove Commands, with pending/loading guards and the existing five-item limit. It stores the absolute canonical directory URL, never the experimental prefix. Existing relative or absolute directory favourites are recognised. The sidebar maps canonical directory favourites to internal navigation while retaining the original saved identities for deletion. Favourite mutation has not been exercised on the live account.

`Elements/Navigation` is the single destination map. Only the directory has an Elements owner; child screens remain canonical. Settings sidebar highlighting uses current router state. Neither shared components/hooks nor the legacy entry was changed for this page.

## Companion menu corrections

The user-menu Chat settings item was my earlier relocation of a link from the legacy chat-status dropdown. It is removed from the user menu. The Settings directory’s existing Chat settings category remains legitimate source content. The user-approved reference-branch alignment subsequently restored Chat settings inside the chat-status dropdown using public Elements primitives. Live socket parity remains an explicitly tracked foundation gap.

The user menu includes the same light/dark action pattern as the Elements header demo. `Elements/Services/Theme` applies the stored preference before React renders, defaults to the system appearance when unset and uses library `.dark` tokens. Storage failure leaves a working session-only toggle. The preference is local to Elements and does not alter legacy presentation.

## Verification and next acceptance checks

- `npm run build:development`: TypeScript and both Vite entries pass; existing chunk-size warnings remain. Build log: `/private/tmp/elements-settings-build.log`.
- Signed-in Dia observation: Settings title, all seven category tabs, real settings links/descriptions and highlighted Settings sidebar render. Observed All settings and Call and SMS views; both light and dark styling were visible during user activity. This is not proof of toggle/refresh persistence.
- Source inspection confirms unchanged permission predicates, translations and menu data are reused, and shared Components/Hooks/main entry remain unchanged.
- Automated tests were neither added nor run, as instructed.
- A separate signed-in verification tab subsequently confirmed: `section=call&keyword=VoIP` deep link and refresh preserve the selected category/query; search returns VoIP title and tag matches; `zzznomatch` produces the existing no-results message; Clear search restores the category; Account category selection updates the URL and browser Back restores Call and SMS. Native React and Angular destination links are exposed correctly in the accessibility tree.
- User menu inspected: Chat settings is absent; keyboard activation changes Switch to dark mode to Switch to light mode. Reload retains the dark selection. Restored the initial light appearance and closed the verification tab.
- Still verify restricted roles, Spanish/zoom, browser Forward, representative child destination and browser return, and canonical favourite add/remove/failure requests. These were not exercised against the live account. Search’s built-in clear-button accessible label remains the library’s English “Clear search”; a configurable translated clear label is a library capability gap for Spanish parity.

Next: finish this bounded manual acceptance, review the directory with the user, then select the next settings screen. Existing authentication-return, socket/global-service and hosting gaps remain in [shell evidence](../entry-shell-evidence.md).

## Quality review follow-up

The review removed global mutable Settings initialisation and page-specific work from app boot. The route owns its lazy component, while the outlet owns its loading/error boundary. React’s `useSyncExternalStore` now subscribes to UI-Router’s last successful transition: the installed React adapter’s effect-based hook missed initial navigation in the browser, leaving document titles stale. The local subscription also covers dynamic query changes and is shared by the shell, outlet and Settings. Static titles come from route metadata.

After this correction, signed-in browser verification reconfirmed Call and SMS selection, VoIP title/tag filtering, and refresh retaining query/category plus the correct Settings document title. The TypeScript/Vite build passes. See the shell evidence for source-size measurements, lint caveats and remaining broader acceptance work.

Reference-branch alignment verification: both-entry development build passed (`/private/tmp/elements-patterns-build.log`), focused lint has no errors (existing Favourites Fast Refresh warning), and signed-in browser inspection confirms full-width cards/descriptions, breadcrumbs, chat dropdown, theme-first ordering, and Call and SMS + VoIP search retained after refresh. No automated tests added or run.

Settings searches with no matches use the approved Empty composition with a translated title, explanatory copy containing the current search term, and a Clear search action that resets the keyword URL parameter while preserving the selected category. The search field and category tabs remain available.
