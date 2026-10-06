# SMS geo permissions migration evidence

Read the [migration plan](../README.md) first. Last updated: 30 September 2026.

## Scope and source

The user selected SMS geo permissions and explicitly required all existing behaviour to be maintained. Baseline: Admin `2f835c365` on `design/elements-experiment-v2`, current React sources `App/src/Modules/SmsGeoPermissions/{index.jsx,state.jsx}`, `Components/CountryCheckboxes/index.tsx` and `Helpers/index.tsx`. The signed-in current-app page was inspected before implementation. The older experiment is not a baseline.

Included route: `/admin/elements/settings/sms_geo_permissions`, owning the canonical product destination `/admin/settings/sms_geo_permissions`. Changes are confined to `App/src/Elements` and new Elements keys in the English/Spanish locales. No legacy modules, shared services, package versions or dependencies changed.

## Behaviour contract

- GET `/accounts/{current account id}` unwraps `account`; GET `/sms/costs` returns the country array. Both run in parallel through the existing regional/authenticated request service. Initial selections are `allowed_sms_countries ?? []`; preserve codes absent from the displayed cost list.
- Reuse the current pure country-to-continent mapping, ordered continent list and dangerous country codes. Omit the literal `Unknown` country. Sort each continent alphabetically by the returned country name; retain row-major reading order. The user subsequently requested an adaptive column layout (see below).
- Show all eight continents initially expanded and allow independent collapse/expansion. Selections survive disclosure changes. Show the exact returned GBP/USD prices as `£{max_gbp} | ${max_usd}`. Retain High Risk labels, warning icon and the existing full risk explanation.
- Country editing requires `ABILITY_SUPER`. Other users see the existing support warning and disabled choices. The Save action checks the same ability and shows the same denial toast; do not silently hide that behaviour.
- Save POST `/accounts/{loaded account id}` with **only** `{ allowed_sms_countries: string[] }`, using unchanged `prepareSaveAccountFn`. Preserve success/error toasts, clear dirty status only after success, retain selections on failure and prevent duplicate pending submits. No account branding reload or extra cache update belongs to this page.
- Preserve unsaved-leave decisions on internal navigation and browser/document navigation. Keep editing retains the draft; Discard changes leaves without saving. This follows the existing Elements Account integration because the shared legacy dirty hook imports the legacy router/presentation.
- Preserve canonical favourites, add/remove feedback, five-item limit and pending guards. The Settings link and breadcrumb use internal UI-Router navigation, retaining modifier-click behaviour. Sidebar/favourite destinations map to the new route without replacing the shell.

## Implementation

`App/src/Elements/Modules/SmsGeoPermissions/{index,state}.tsx` owns the page and its data request. Public Elements Header, Container, Card, Accordion, CheckboxGroup/Checkbox, Badge, Tooltip, Alert, Skeleton and AlertDialog provide the UI. Save sits in Header, following the migrated pages' presentation; the user subsequently changed its label to Update permissions. No search, select-all, new country defaults or new persistence feature was added.

The non-blocking page request keeps static header, card and continent structure mounted during body loading. One loading announcement accompanies decorative control/label/price skeletons; save/editing remain unavailable until both requests succeed. Unknown country-list length uses four placeholder choices per continent, with loaded-choice row dimensions; exact full-list height cannot be reserved before the SMS-cost response. Slow-response layout movement remains an explicit verification gap. Failed reads expose a local error and retry without exposing editable fields. Authenticated workspace startup is unchanged.

Router registration, Settings directory links, pending breadcrumbs and Elements navigation/sidebar ownership include this route. Locale additions are under `components.elements_sms_geo_permissions`; existing SMS product copy remains untouched.

## Verification and remaining work

- Development build (TypeScript and both Vite entries) passed. Existing chunk-size warnings remain. `git diff --check` passed. No automated tests were added or run, per user direction.
- Signed-in Dia inspection confirmed the new deep link, refresh, populated country choices, prices, all continent headings, risk labels, favourite control and translated Save action. A temporary Anguilla selection changed the draft. Keep editing returned to that draft. Keyboard disclosure toggling retained it. Discard changes returned to Elements Settings without saving; its SMS link reopened the Elements page. No live settings were saved or favourites mutated.
- Live POST success/failure, API read failures/retry, restricted roles, favourite mutations, full Back/Forward and browser-close flows, keyboard risk-tooltip activation and deliberately slow responses remain unverified. Source wiring preserves these behaviours; do not label full parity verified until exercised against the same current-app conditions.

Next check: use an authorised disposable account to verify the exact save request, success/dirty reset and failed-save draft retention, then inspect a non-super user's read-only state.

## 30 September presentation follow-up

The user requested the Header action label “Update permissions”, a risk badge directly beside the country name and an adaptive country layout to reduce dead space. English/Spanish Elements copy now uses that action. Badge/Tooltip move into Checkbox's supported label content, matching the original React label composition, with prices remaining underneath. The grid uses auto-fit columns with an 18rem minimum, bounded by the available container width; it keeps the same row-major country order and applies to skeleton choices too. Checkbox values, requests, permissions, save feedback and dirty guards are unchanged. Sectional Accordion titles already match the small CardTitle's `text-base font-semibold` styling; the default medium CardTitle is `text-lg`. No typography override or library change was introduced.

The development build and whitespace checks passed after this follow-up. Signed-in browser inspection confirmed Update permissions, four columns at the available desktop width, and risk badges immediately beside names (including Azerbaijan, Bangladesh and Pakistan). The temporary verification tab was closed; no settings were saved. Other viewport widths were not inspected.
