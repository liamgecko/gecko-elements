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

Set `ELEMENTS_PACKAGE_TARBALL=/absolute/path/to/package.tgz` to test an existing
artifact without rebuilding it. The release preparation command uses this for both
stylesheet modes. Component imports are discovered from the installed artifact.

By default, the runner packs `@geckolabs/elements` into a tarball and installs it in fresh directories
outside the workspace, with exact React/React DOM/type versions. It does not use
workspace source aliases, force installation, legacy-peer-deps, or a second React.
All compiled component modules are imported and typechecked against the consumer's
React types. The tarball excludes source TSX and build scripts. The default run
uses compiled CSS and does not install Tailwind. `npm run test:package:tailwind`
runs the same matrix with Tailwind 4 and an explicitly registered consumer source;
a consumer-only utility verifies scanning. Both modes build with Vite 8.
The dependency tree is checked by `npm ls react react-dom`.

Browser assertions run in development (including StrictMode and React warnings)
and production. They cover native/object and callback refs, forms and controlled
inputs, loading buttons, checkbox/switch, dialog focus restoration, Select,
Combobox, menus/toasts, dropdown switch pointer/keyboard interaction, native menu
links and unread indicators, and Message scroller registration, navigation, prepend
preservation, live-edge following, inert controls and cleanup on unmount. They also
check local font loading, light/dark button styling and failed asset requests.

See [the original source-package results](RESULTS.md) for the React 18 migration
history and [slice 2](../../docs/package-readiness/compiled-package.md) for the
compiled distribution verification.

The fixture's tiny inline dimensions only provide test layout. It uses the real
Elements stylesheet. It does not establish full application workflow coverage,
visual parity with Gecko Admin, server rendering support or Bootstrap coexistence.
The fixture manifest pins test tooling; each isolated installation resolves the
library's declared dependency ranges as an external consumer would. Workspace
builds separately validate the repository's locked dependency set.
