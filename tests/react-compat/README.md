# React compatibility fixture

From the repository root:

```sh
npm ci
npx playwright install chromium
npm run test:react-compat
```

Pass `-- 18` or `-- 19` to run one version. `PLAYWRIGHT_CHANNEL=chrome` uses
installed Google Chrome instead of Playwright's Chromium. `KEEP_REACT_COMPAT=1`
retains temporary artifacts; failed runs always retain them and print the path.

The runner packs `@gecko/ui` into a tarball and installs it in fresh directories
outside the workspace, with exact React/React DOM/type versions. It does not use
workspace source aliases, force installation, legacy-peer-deps, or a second React.
All component modules are imported, and every library TS/TSX file is typechecked
against the consumer's React types. The consumer is then built with Vite 8 and
Tailwind. Its dependency tree is checked by `npm ls react react-dom`.

Browser assertions run in development (including StrictMode and React warnings)
and production. They cover native/object and callback refs, forms and controlled
inputs, loading buttons, checkbox/switch, dialog focus restoration, Select,
Combobox, menus/toasts, and Message scroller registration, navigation, prepend
preservation, live-edge following, inert controls and cleanup on unmount.

See [the recorded verification results](RESULTS.md) for checks and known findings.

The fixture's tiny inline dimensions only provide test layout. It uses the real
Elements stylesheet. It does not establish full application workflow coverage,
visual parity with Gecko Admin, server rendering support or Bootstrap coexistence.
The fixture manifest pins test tooling; each isolated installation resolves the
library's declared dependency ranges as an external consumer would. Workspace
builds separately validate the repository's locked dependency set.
