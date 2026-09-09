# React compatibility verification

Local verification on 9 September 2026, branch `codex/react-18-support`.

| Check | Result |
| --- | --- |
| Packed source package installed with React/React DOM/react-is 18.3.1 | Passed; no forced peer resolution |
| Full library source checked against React 18 types | Passed |
| React 18.3.1 Vite 8 production build | Passed |
| React 18.3.1 development and production browser assertions | Passed |
| Packed source package installed with React/React DOM/react-is 19.2.5 | Passed; no forced peer resolution |
| Full library source checked against React 19 types | Passed |
| React 19.2.5 Vite 8 production build | Passed |
| React 19.2.5 development and production browser assertions | Passed |
| Ref forwarding guard | Passed; 297 component render functions checked |
| Workspace typechecks | All five configured tasks passed |
| Prototype builds | All five application builds passed |
| Whitespace validation | `git diff --check` passed |

Browser runs used installed Google Chrome through Playwright. CI is configured to
run the same matrix using Playwright Chromium; remote CI has not been run yet.

The fixture imports all component modules. Its interaction assertions cover
object/callback refs, controlled inputs, loading-button submission protection,
checkbox/switch, dialog opening/escape/focus restoration, Select, Combobox,
menu/toast, fragment-composed chart series, collapsed-row inert state, Reply box
rendering, transcript registration/navigation/prepend preservation/live-edge
following/inert state, and unmount cleanup.

## Known findings and limits

- Library lint reports 13 pre-existing errors and 3 warnings. The error findings
  were reproduced against the original versions of Accordion, Message context,
  Message scroller, Date picker and use-mobile. No new lint errors remain.
- The Vite development server reported `ResizeObserver loop completed with
  undelivered notifications` under both React versions. The browser assertions
  passed, including scrolling and focus behavior; this is recorded rather than
  represented as a warning-free runtime. Its originating observer has not been
  isolated by this compatibility task.
- Vite reports the expected large-chunk warning for the fixture that deliberately
  imports every component. This is not a production application bundle benchmark.
- Vite also warns about a future native-config-loader requirement for the test
  fixture's generated JSON import; current Vite 8 loads it successfully.
- The tested React 18 baseline is 18.3.1, matching Gecko Admin. Earlier React 18
  minors, server rendering and complete application workflow coverage are not
  claimed.
- Source package consumption requires TS/TSX/Tailwind processing. The fixture
  explicitly prebundles its component entry points with `.tsx` optimization in
  Vite development mode. Compiled distribution and npm release preparation remain
  separate work.
- No Gecko-Admin-Web-App source, dependencies, branch or configuration was changed.

## CI icon declaration failure follow-up

The fresh consumer install reproduced CI's TS7016 errors with
`@hugeicons/core-free-icons@4.3.2`: its per-icon JavaScript exists, but the
corresponding declaration files advertised by its export map are missing.
Changing only that dependency to 4.3.0 made the failing consumer typecheck pass.
Elements now pins 4.3.0 in its own manifest, so the fix applies to consumers as
well as this repository's lockfile.

After the pin, `PLAYWRIGHT_CHANNEL=chrome npm run test:react-compat` passed
fresh package installs, full source typechecks, builds, and development/production
browser assertions for both React 18.3.1 and 19.2.5. The previously recorded
ResizeObserver notification did not occur in this rerun. Remote CI still needs
to run against the fix.
