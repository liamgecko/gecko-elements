# Isolated entry and initial shell evidence

24 September 2026. Read the [migration plan](README.md) first. This records the current Admin working-tree implementation over `c3cd68781c8d8303a665b1425468f89581eb0c06`; there is no implementation commit or deployment yet. The initial slice covered baseline investigation, the isolated entry and the app header/sidebar. The user subsequently selected the Settings directory; see its [workflow evidence](workflows/settings-directory.md).

## Implementation

Admin's `App/elements/index.html` and `src/Elements/main.tsx` form a second document. Vite builds both documents. Elements owns its Tailwind stylesheet; legacy `main.jsx` retains Bootstrap. Development/preview middleware and a prepared CloudFront viewer-request rule route Elements deep links to that document. The hosting change has not been deployed.

Admin now targets the exact npm version `@geckolabs/elements@0.1.0-next.4`; the vendored tarball, receipt and README have been removed. The registry access problem was an invalid npm token in Admin's project `.npmrc` overriding the working user-level login. Removing that npm token override restored authentication as `liamgecko`; Font Awesome configuration is unchanged. The requested next.4 version is now published privately and installed from npm.

The exact previously verified next.4 artifact was published with restricted access after explicit user approval and npm browser authentication. Registry verification confirmed private access, the `next` tag and matching artifact integrity. Admin's previously installed local copy was removed and reinstalled with `npm install --save-exact @geckolabs/elements@0.1.0-next.4 --prefer-online`. Its lockfile now resolves to npm's registry tarball URL; there are no vendor/file dependency references. The source release artifact remains only in the Elements repository's ignored `.releases/` directory, not in Admin.

## Current isolation and loading boundaries

`src/Elements/App` uses unchanged authentication, request/cache services and query-client infrastructure. Elements-specific providers, favourites wiring, toast hooks, account switching, user-menu actions and navigation adapters now live under `src/Elements`. Existing `Components/AccountSwitcher`, `Components/AppMenu/useMenuData`, `Components/Ui/Toast`, `Components/UserControl`, `Hooks/useToast` and `src/main.jsx` have been restored. Local adapters deliberately duplicate the small presentation-coupled portions of existing behaviour so this experiment does not refactor the legacy app. Revisit consolidation only with a later scope decision.

There are no header/sidebar skeletons. Startup uses a plain translated status until authentication/account/abilities are ready, with error/retry on failure. Once ready, the shell is mounted outside the route outlet and remains mounted during internal navigation. Refresh and canonical handoffs create new documents. The root now redirects to the Settings directory. Settings category/search query changes use dynamic router parameters and retain the shell/page instance. Unknown routes have a recoverable message.

`src/Elements/Navigation` centralises entry and canonical destinations. Settings directory links use the persistent router, including canonical Settings favourites. Other menu destinations lead to the existing application through full-document navigation, retaining React parameters and Angular hash URLs.

The header/sidebar use public Elements recipes, real account/user data and permission filtering. Chat availability uses the existing presence Command and cache/user updates. The chat icon opens the approved DropdownMenu composition with an availability switch and the canonical Chat settings link. Chat settings is absent from the user menu. The reference-branch alignment restores that placement; live connection tracking remains open below. The user menu now has an Elements light/dark action, saved under `gecko-elements-theme` and applied before React renders. Pending requests disable repeat activation; failure retains confirmed presence. The live mutation has not been exercised. Favourites retain canonical URLs and existing Commands. The local toast adapter passes existing Command feedback directly to the Elements toast manager; it no longer queues notifications through the legacy toast context.

The authentication-return bridge and its shared-entry change have been removed. A signed-in session can open Elements directly, and Elements can claim a code when supplied directly. A fresh login may land in canonical Admin; automatic return to Elements remains unresolved. Do not reinstate a legacy-entry patch silently.

## Validation policy and current evidence

The user deferred automated tests for this migration. All tests/check scripts introduced by this slice have been removed; existing unrelated tests remain. No tests were run for this scoping correction. Use `npm run build:development` from Admin `App/` and focused manual inspection for now. Earlier test results do not certify this revised wiring.

The prepared package artifact and receipt remain unchanged: next.4 was already verified before this direction and contains the collapsed-link label and disabled-status fixes. The existing artifact was published and installed as described above; no tests were rerun.

The current correction is checked by compiling both entries and inspecting the changed source/import boundaries. Build status is recorded below. The manifest should keep Elements and legacy CSS separate; importing a shared module is not proof its dependencies are style-independent.

## Signed-in browser observations

These observations preceded the adapter-scoping correction; they are not a fresh browser acceptance pass of that correction. Used the user's existing Dia session at `http://localhost:3000/admin`; no credentials or environment values were changed. The separate in-app browser had no authenticated session and could not use the unavailable local authentication helper. That is a session/environment difference, not proof that Admin is unavailable.

- Existing account-settings screen and shell loaded in the signed-in session. The legacy header used account branding; the Elements header uses its required dark chrome.
- `/admin/elements/` loaded with actual account/logo/user and permission-filtered navigation. The final next.4 package also rendered its real chat status control in the signed-in session. The final live collapsed check was interrupted by user browser activity.
- Sidebar expanded, survived a document refresh, and showed the same preference afterward.
- AI Agents group expanded with canonical destinations and account parameters. User menu exposed the existing release notes, support, settings, profile and logout entries.
- Direct `/admin/elements/404` loaded the Elements shell and the intended unavailable-page message, without the legacy page renderer.
- Settings handoff loaded the full legacy Settings screen at `/admin/settings`; browser Back returned to the Elements document. The shared expanded preference survived both handoffs and was restored to its original collapsed setting after the check.

These observations are bounded. Account changes, logout, favourite removal and release-note writes were not exercised against the live account. Real slow-network/failure, expired-session, cross-tab switching, restricted roles, 1024px/zoom and appearance-mode checks remain outstanding.

## Open foundation gaps

| Gap                                    | Required next work                                                                                                                                                                                                                                             |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Live unread state and socket ownership | Sidebar unread indication has no approved recipe slot. This first shell does not initialise the existing global/conversation sockets; live status parity remains open.                                                                                         |
| Global presentation                    | Availability banner, global dialogs and loading overlay are not migrated. The toast adapter is present but its full action/failure coverage is unverified. Complete relevant adapters before importing workflows that depend on them.                          |
| Branding                               | Account logo is rendered; custom account header colour conflicts with the approved dark header contract. Resolve the branding policy explicitly.                                                                                                               |
| Route-active and favourites semantics  | Settings is now an active migrated route; canonical absolute and relative directory favourites map to it. Duplicate favourite destinations and rename capability still require the documented app/library agreement. Current favourites can navigate and remove through existing Commands, but are not live-verified. |
| Entry acceptance                       | Fresh login/expired-session returns, throttled boot, deployed deep links and rollback remain unverified. Prepared infrastructure is not a deployed result.                                                                                                     |

These gaps keep the full shell parity stage open. This slice supplies a reviewable shell foundation; it does not certify 1:1 product parity. Resolve the gaps alongside the selected Settings directory, then agree the next page with the user.

## Handover

The scoped development build passed TypeScript and both Vite entries (existing large-chunk warnings). Manifest inspection shows only the Elements stylesheet reachable from its entry. No automated tests were run for this correction. Changes remain in both working trees. Preserve pre-existing Elements edits and Admin's `.env.development`. No production deployment, publishing, account switch or product-data mutation was performed. Resume from the migration plan and this gap table.

## Settings and theme follow-up

The Settings development build passes TypeScript and both Vite entries; no automated tests were created or run. Signed-in observation confirms the directory, category tabs, canonical links, active Settings sidebar and Elements appearance render. A separate browser tab then verified search, clear/no-results, deep-link refresh, category Back navigation, the corrected user menu and dark preference after reload. Restricted-role, live favourite mutations and full destination acceptance remain pending. See the workflow evidence for exact coverage and remaining checks.

## Implementation quality review

The user requested scrutiny of simplicity, efficiency, performance and correctness on 24 September 2026. Review scope: current migration working tree against Admin HEAD, including untracked Elements code; unrelated `.env` and registry secrets were excluded. Independent standards and spec reviews supplemented source, bundle and signed-in browser inspection.

### Standards findings and corrections

- **P2, startup coupling:** app boot awaited Settings and populated a mutable module-global component before router creation. Replaced with module-owned `Settings/state.tsx` lazy loading. The persistent outlet now contains loading/render errors; the shell and not-found route no longer depend on the Settings chunk.
- **P2, request waterfall:** bootstrap loaded app data → teams → channels → favourites. No current Elements consumer uses team/channel enrichment. Removed those two request paths from this slice, and load independent app data/favourites concurrently after authentication. Future chat workflows must resolve their own required team/channel data before enabling their actions.
- **P3, notification lifetime:** a Set retained all historical toast IDs. Removed the entire queue bridge and legacy toast provider; the local callback adapter publishes to Elements directly.
- **P3, copied scaffolding:** removed the empty AppContext, unused dialog/loading providers, redundant favourites reducer/actions, dead translation work and catch/rethrow wrappers. Retained unchanged Commands and cache semantics, with a stable favourites setter for bootstrap.
- **P2, handover conflict:** corrected the README’s obsolete shell-only scope paragraph. Settings is selected and implemented; linked pages remain handoffs.

A proposed unhandled-navigation-promise finding was rejected after checking the installed UI-Router: `transitionTo` already calls its error handler and silences uncaught rejections. Adding duplicate catch/logging code would not improve correctness.

### Spec findings and corrections

The spec review independently confirmed the startup waterfall, page dependency, toast lifetime and scope contradiction. Existing Settings permissions, menu/search semantics and canonical links remain intact. Browser verification during the correction additionally found an initial route-subscription race: the installed UI-Router React hook subscribes in an effect and can miss startup navigation. The Elements-local `useRoute` uses React’s external-store subscription and UI-Router’s stable last-successful-transition snapshot. The same corrected subscription drives page filters, sidebar active state and route metadata/title. No alternative routing framework or duplicate route state was introduced.

### Validation and limits

- Development build passes TypeScript and both Vite entries; existing chunk warnings remain. Current log: `/private/tmp/elements-review-build.log`. No tests were added or run.
- Standard ESLint cannot parse the repository’s TypeScript syntax. A focused run with the already-installed TypeScript parser/plugin reports zero errors, with one Fast Refresh advisory for the colocated favourites provider/consumer hook (the repository explicitly requires that colocation). Shared lint configuration was not changed.
- Signed-in browser: Settings lazy-loads, title/category/query survive refresh, and the not-found page renders with the correct document title inside the shell; its Settings sidebar link returns internally without replacing the application chrome. A transient Vite import-cache problem from renaming the theme file extension was found and resolved by keeping its original path.
- Manifest inspection still shows only Elements CSS reachable from its entry. Some reused Commands transitively import the legacy router singleton through helpers; it is not started and does not register the legacy route tree, but the dependency graph is not completely free of legacy runtime code.
- Elements TypeScript/TSX implementation decreased from 1,792 to 1,700 lines (92 fewer), including the added page-failure containment and route-subscription correction. Source line count is a maintainability measure, not a performance benchmark.
- No runtime speedup percentage is claimed. Removing unused request paths and serial dependencies is concrete; payload size is effectively unchanged once Settings loads. A faster laboratory benchmark would not establish the remaining role/failure/real-data parity.

Keep the existing direct state map and simple Settings filter. Extra memoisation, generic registries or new state-management layers are unjustified for this small directory. Remaining shell, auth, localisation and mutation acceptance gaps above still prevent production-readiness or full-parity claims.

## Reference-branch visual alignment — 24 September 2026

Applied the user-approved `design/elements-experiment` patterns within Admin `src/Elements`: theme action first in the user menu, chat-status dropdown, Overview/Settings breadcrumbs (including the route fallback), and a rounded inset frame with independent page scrolling. The header/sidebar remain mounted across directory parameter changes. Retained saved theme preference, current UI-Router ownership, permission checks and confirmed-after-save presence handling. Shared legacy components and Commands are unchanged; locale additions use Elements namespaces only.

Both entries pass `npm run build:development` (existing large-chunk warnings). Focused Elements ESLint has no errors and the existing Favourites Fast Refresh warning. No automated tests added or run. Signed-in browser inspection confirms frame/card rendering, chat menu placement, theme action ordering, and category/search surviving refresh. Live presence writes and disconnected socket behavior were not verified; this does not close socket parity.

## Sidebar icon update — 28 September 2026

The Admin Elements sidebar maps Overview/Home to `Home04Icon`, Conversations to `MessageSquareTextIcon`, Forms to `Note03Icon`, Landing pages to `AppWindowMacIcon`, and Call scripts to `VoiceIcon`. This changes only `src/Elements/Shell/Icons/index.tsx`; destinations and permissions are unchanged. All five per-icon declarations exist in the installed package, TypeScript and Prettier pass, and `git diff --check` is clean. A signed-in browser visual check was attempted but interrupted by activity in the shared browser; appearance remains unverified.
