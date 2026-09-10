# @geckolabs/elements

Gecko Elements' shared React component library. The [component contracts](docs/README.md) define approved usage, composition, props and styling. Use this guide for interface work in any consuming project, and read the matching contract before changing a component or its documentation.

## Desktop application scope

The Gecko application, including the Sandbox Inbox, is a desktop application. Mobile layouts, phone breakpoints, touch-specific navigation and mobile visual checks are not requirements. Do not add them or report their absence as a defect unless the user explicitly requests mobile support for a particular product surface.

Support desktop window resizing, keyboard navigation, screen readers, browser zoom and the approved appearance modes. Component overflow inside a desktop panel remains relevant. Existing capabilities used by other consumers should not be removed merely because the desktop app does not require them.

## React support

Elements supports **React and React DOM 18.3.1 or React 19**. The consuming
application supplies matching `react`, `react-dom` and `react-is` versions through peer dependencies;
Elements does not own a second runtime. `react-is` is required by Recharts; use `18.3.1` for all three in the Admin integration. The monorepo prototypes continue to use
React 19. React 18.0–18.2 are not part of the supported/tested range.

Component refs work through a React 18-compatible forwarding boundary. Library
implementations that accept `ref` must use `React.forwardRef` or the internal
`withRef` helper; plain ref-as-prop functions do not work on React 18. This does
not change the approved component interfaces or introduce a product-facing API.

Run `npm run test:react-compat` from the repository root to build and pack the
library, install it in isolated React 18.3.1 and React 19 consumers, typecheck its
public imports, and exercise development and production builds in Chromium.
Run `npm run test:package:tailwind` for the Tailwind integration mode and
`node scripts/check-react-refs.mjs` for the static ref guard.
See [the compatibility fixture](../../tests/react-compat/README.md).

## Package status and local installation

The package now emits ES2020 ESM JavaScript and TypeScript declarations under
`dist`. Consumers do not need to transpile Elements TSX or configure workspace
aliases. CommonJS and server rendering are not tested distribution targets.

From the repository root, run `npm run build:package` or
`npm pack --workspace @geckolabs/elements --pack-destination /tmp` (which builds
first). Install the resulting tarball into a consuming app with
`npm install /tmp/geckolabs-elements-0.1.0-next.2.tgz`, alongside matching React,
React DOM and React Is peers. The source workspace keeps `private: true` as a publication guard. Private npm
prereleases use the Elements repository’s `release:prepare` and
`release:publish` commands to publish a verified artifact.
Consumers install an exact prerelease version.

Inside this monorepo, Vite and TypeScript deliberately resolve Elements to source
for fast feedback. The isolated compatibility tests resolve the packed `dist`
exports instead. The historical `@gecko/ui` name is no longer an alias.

## Find and choose a component

Start from the task the interface must support. Search contract titles and their Purpose and Related sections, then read the candidate contracts to choose between similar components. From this directory:

```sh
rg -n '^# |^Import:' docs
rg -n -i 'date of birth|upload|confirmation' docs
```

Replace the example search terms with the task's wording. Each contract contains its exact import, canonical usage, interface and styling rules. Product names and import names can differ; use the contract's import rather than deriving it from the filename.

Contracts are the authority for approved usage. Their `Source` paths are relative to this package; implementation types confirm what the current code supports. `Human documentation` paths refer to optional live examples in the monorepo's docs app. The contracts can be read and followed without that app. Product prototypes are contextual examples: check their composition against the contracts before reusing a pattern.

## Import and integrate

The export map in [package.json](package.json) defines the available public module paths. Import named components from the path in their contract; there is no package-root component barrel.

```tsx
import { Button } from "@geckolabs/elements/components/button";
```

Import every part of a compound component from its documented entry point, including [Data table](docs/data-table.md) and [Reply box](docs/reply-box.md). Use public `@geckolabs/elements` paths even when the application's tooling can resolve source files directly. An exported internal helper or an undocumented module is not automatically an approved product component.

Choose exactly one stylesheet mode and load it once at the application entry.
Both modes supply the same fonts, tokens, base styles and component treatment.

### Compiled CSS

```tsx
import "@geckolabs/elements/globals.css";
```

No Tailwind plugin is needed. This contains utilities used by Elements itself;
it is not a catalogue of every possible utility a consumer might write. Use
application CSS for surrounding layout, or choose Tailwind mode below.

### Tailwind 4 integration

In the application's CSS entry (adjust the source path relative to that file):

```css
@import "@geckolabs/elements/tailwind.css";
@source "./**/*.{ts,tsx}";
```

Process that stylesheet with Tailwind 4.3.1 and its matching Vite or PostCSS
integration. The package explicitly scans its compiled JavaScript; the consumer
explicitly registers its own source. Do not also import `globals.css` or add a
second Tailwind base import. Monorepo prototypes retain their source stylesheet
and Vite's automatic application source detection.

Apply `.dark` to the document root so portalled components share the theme.
The stylesheet includes global base styles and unprefixed utilities. It is not
isolated from Bootstrap; initial Admin integration still needs a separate document.
Add providers required by component contracts, such as [Toast](docs/toast.md)
or [Sidebar](docs/sidebar.md).

Compose charts with primitives from `@geckolabs/elements/charts` and wrappers
from `@geckolabs/elements/components/chart`. This keeps both on Elements' Recharts
instance even when an application has another Recharts version installed.

Fonts are served locally from the package. Satoshi is included for Gecko's
internal use under ITF FFL; Geist Mono uses OFL. See the packaged font notices
under `dist/assets/fonts/README.md`. Do not distribute Satoshi publicly or to
external organisations as part of this package without resolving those rights.

## Typography and copy

Always use sentence case for Gecko UI copy and documentation prose, including headings, navigation, menu items and buttons. Preserve proper names, acronyms and code identifiers. Write “Gecko academy”, “User settings” and “Save changes”. Follow the [typography rules](docs/typography.md); do not enforce casing with CSS or automatic string conversion.

## Compose within the contract

Begin with the selected component's canonical usage. Supply product content, state, event handlers and persistence through its documented API. Follow its label, validation, keyboard and loading patterns as well as its visual rules.

Components own their visual treatment. Use documented props and composition slots; use `className` only for the layout integration allowed by that component's contract. Build surrounding page layout without overriding component padding, colours, typography, borders, icons or interaction states through classes, inline styles, CSS selectors or token overrides. Do not copy, replace or wrap a component to create a locally customised version. Composition wrappers may organise approved components and product logic while preserving their contracts.

Before adding, replacing or directly importing an external UI dependency, read [Approved UI dependencies](docs/dependencies.md). Use the assigned Gecko interface and its documented exceptions. An upstream API or a permissive TypeScript prop does not itself approve a new Gecko usage pattern.

Panel disclosure buttons follow the [Button contract](docs/button.md); conversation row actions follow the [Chat Head contract](docs/chat-head.md).

## When something is missing

If no documented component or composition supports the requirement, report:

- The required behaviour or presentation.
- The existing components and contracts checked.
- The specific missing capability, or the conflicting documentation and implementation.

Request a change to the owning library component or its contract. Continue any interface work supported by existing contracts; leave the unsupported part explicit. Do not invent a local alternative, silently restyle a component, or extend its API as part of consumption work. Follow the owning contract's approval requirements before implementing a library extension.

## Verify the interface

Run the consuming project's build and applicable checks. A type check does not establish visual or behavioural correctness: open the resulting interface and exercise its main flow, keyboard interactions and relevant empty, loading, error and disabled states. Inspect the supported viewport sizes and appearance modes for styling and layout regressions.

Review the changed imports and styles against the contracts. Report which checks passed, any failures, and any remaining capability gaps. Keep component defects separate from application integration errors and missing documentation.
