# Slice 2: compiled local Elements package

Date: 2026-09-09. Branch: `codex/elements-package-readiness`.
Follows the dependency baseline committed as `b713bc0`.

## Outcome

`@geckolabs/elements@0.1.0-next.1` can now be built, packed and installed outside
this monorepo. It exposes ES2020 ESM JavaScript and TypeScript declarations rather
than source TSX. The package stays `private: true` until the npm release process
is configured. No package has been published and Gecko Admin has not been edited.

## Changes and rationale

- Renamed current workspace dependencies, imports, aliases and usage documentation
  from `@gecko/ui`. Historical dependency evidence and original compatibility
  results retain the name under which those checks ran.
- Added `tsconfig.build.json` and `scripts/build.mjs` inside the UI package.
  TypeScript emits modules and declarations; a parser-based pass rewrites internal
  aliases and relative imports to portable ESM paths with explicit extensions.
  Dependencies, including React, remain external rather than bundled runtimes.
- Fixed declaration emission with named/explicit types for `ChartLegendContent`
  and `EmojiPickerTrigger`. Existing component behaviour and React 18 ref
  forwarding are preserved. Other existing component TS/TSX changes are the import
  rename only.
- Added `dist` exports, an npm file allowlist, CSS side-effect metadata and a
  prepack build. Compound components preserve their documented entry points.
  The vendored scroller JavaScript, its declarations and licence are included.
- Added `@geckolabs/elements/charts` for the existing recipe primitives. Consumer
  charts now obtain those primitives through Elements, so wrapper and geometry
  resolve against the library's own Recharts dependency. Actual coexistence with
  Admin's older Recharts installation remains an integration check for that repo.
- `globals.css` contains compiled component utilities, tokens, base styles and
  fonts, with no consumer Tailwind build required. `tailwind.css` retains Tailwind
  4 directives, disables implicit source discovery and explicitly scans the
  package's emitted JavaScript. Consumers register their own source files.
  Both entries inline animation definitions; `tw-animate-css` is now build-only.
  Tailwind and animation MIT notices are included in the distribution.
- Fonts load locally. Official static Satoshi WOFF2 files preserve the existing
  weights, italics and CSS family alias. All ten existing OTF files are identical
  to their counterparts in the downloaded official archive. Geist Mono is an
  unchanged upstream variable WOFF2 file. Font licences, sources and SHA-256
  checksums are recorded in `packages/ui/src/assets/fonts/README.md` and copied
  into the package.
- Prototype Vite and TypeScript configurations retain source aliases. Their
  typechecks no longer rely on the presence of generated `dist` files.

## Verification

All commands run from the repository root with Node 22.21.1 and npm 10.9.4.

| Check | Result |
| --- | --- |
| Package declaration and ESM build | Passed |
| Root typecheck | All five configured tasks passed |
| Root build | UI package and all five prototypes passed |
| Targeted ESLint: chart, emoji picker, chart entry | Passed |
| React ref audit | 297 component render functions passed |
| Packed React 18.3.1 consumer, compiled CSS | Typecheck, build, development and production browser checks passed |
| Packed React 19.2.5 consumer, compiled CSS | Typecheck, build, development and production browser checks passed |
| Packed React 18.3.1 consumer, Tailwind mode | Typecheck, build, development and production browser checks passed |
| Packed React 19.2.5 consumer, Tailwind mode | Typecheck, build, development and production browser checks passed |
| Package integrity in fresh consumers | 242 distribution files checked; imports, font URLs and notices resolve |
| Button-only consumer bundle | Excludes Recharts, Shiki, Frimousse and DnD engines |
| Message scroller regression | 0px drift for both anchoring roles, motion preferences and reply growth |

The compiled-CSS fixtures do not install Tailwind. Tailwind fixtures explicitly
register their source and verify a consumer-only arbitrary utility. Browser
checks cover local font loading, light/dark button styles, failed asset requests,
refs, forms, choices, dialog focus, chart geometry, menu/toast, scroller navigation
and cleanup. All compiled component modules are loaded; public imports are checked
against each consumer's React types without accessing library source TSX.
Third-party declaration internals retain the fixture's existing `skipLibCheck`.

The fixture's initial 404 was removed by giving it an explicit empty favicon.
The completed React 19 development runs also logged a ResizeObserver notification
loop message through Vite; interaction assertions and production runs passed.
The same warning is present in the saved slice 1 compatibility log
(`/private/tmp/elements-cleanup-compat.log`, lines 458 and 919), so it predates
this packaging work. It remains unresolved. Existing large-chunk warnings remain in full-library fixtures
and prototype builds; the focused Button bundle check confirms import isolation.

CI now runs both stylesheet modes for each supported React version. Local passes
are not a claim that remote CI has run on these uncommitted changes.

## Use and remaining boundaries

See `packages/ui/README.md` for local packing/install commands and the two CSS
recipes. Import exactly one distribution stylesheet mode. Apply `.dark` to the
root document so portals share the theme. Compiled CSS includes the library's own
utilities, not all possible consumer utilities.

Satoshi's included FFL 2.0 permits the organisation's own application use and
internal employee sharing; it restricts external redistribution. Keep this
package private to Gecko. Public distribution is not authorised by that licence.

Publication credentials, restricted npm release, Admin installation, separate
Admin harness, application workflows, Bootstrap coexistence, CommonJS and server
rendering are not validated by this slice. CSS remains global and unprefixed;
the planned initial Admin entry still needs a separate document. The next step is
to review the local artifact, then configure private prerelease distribution and
the isolated Admin integration.

## Review artifact

Local tarball: `/tmp/elements-package-slice2/geckolabs-elements-0.1.0-next.1.tgz`.
321 packed files, 709,236 bytes compressed, 2,113,274 bytes unpacked.
SHA-256: `ef1565092e5954f3efb6b2c5cdea6d30d432e35337846b463127a1a7580ae431`.

This is byte-identical to the artifact used by the final compiled-CSS React
matrix and tree-shaking test. The Tailwind matrix used the same files except for
one formatting-only newline before the chart legend's pure annotation; its CSS,
font assets, declarations and executable statements are unchanged.
