# Dependency cleanup and validation

Completed 9 September 2026 on `codex/elements-package-readiness`, after the [dependency audit](./dependency-audit.md). These changes prepare the existing source package; declaration generation, compiled distribution, renaming and Admin integration remain later steps.

## Changes

- Removed UI's unused Zod dependency. The docs application's own Zod dependency and examples remain.
- Removed unused `@turbo/gen` and the stale `turbo` directory from the UI lint TypeScript configuration. Kept the root Turbo task runner.
- Copied `shadcn@4.12.0/dist/tailwind.css` without changes into UI's vendor directory, retaining the MIT license and recording a SHA-256 fingerprint. The shared stylesheet now imports this local file. Shadcn itself is development-only; CSS behavior is deliberately independent of future CLI updates.
- Pinned all three DnD Kit packages to the tested 0.3.2 versions. Kept Hugeicons exactly 4.3.0.
- Retained tw-animate-css as a dependency because the currently exported source stylesheet still imports it. Moving that package to development-only before preparing the CSS delivery modes would break external consumption.
- Applied compatible npm security fixes without `--force` or major-version overrides. UI's runtime package versions stayed at their previous locked versions; affected tooling and transitives changed.
- Updated the root Turbo tool and the prototypes' React Router within their existing ranges after the full-repository scan identified additional advisories. No Admin repository files changed.

Important resulting versions:

| Package | Before | After |
| --- | --- | --- |
| Vite | 7.3.2 | 7.3.6 |
| Turbo | 2.9.9 | 2.10.12 |
| React Router / React Router DOM | 7.18.1 | 7.18.3 |
| Babel core | 7.29.0 | 7.29.7 |
| PostCSS | 8.5.14 | 8.5.28 |
| Undici | 7.28.0 | 7.29.1 |
| Hono | 4.12.17 | 4.13.7 |
| JS-YAML | 4.1.1 | 4.3.2 |
| fast-uri | 3.1.2 | 3.1.7 |

The evidence records the full lockfile version diff, not just these examples. There are no blanket runtime upgrades to Base UI, Recharts, Motion, Tailwind, Zod or TypeScript. Fresh consumers still resolve permitted ranges independently; their resolved versions need not equal the monorepo lockfile.

## Security results

| Scope | Before | After |
| --- | --- | --- |
| UI workspace, full tree | 18 affected package entries | 0 |
| UI workspace, production only | 16 affected package entries | 0 |
| Fresh React 18 consumer, production only | Not measured by the initial audit | 0 |
| Fresh React 19 consumer, production only | Not measured by the initial audit | 0 |
| Entire repository | Broader than the initial UI audit | 2 name-collision findings described below |

The remaining full-repository results are `forms` (moderate) and `sandbox` (critical). Their audit paths point to our private local workspaces (`apps/projects/forms` and `apps/sandbox`), not downloaded copies of the unrelated public npm packages named `forms` and `sandbox`. They are public-package identity collisions, not established vulnerabilities in these React prototypes. No blanket audit suppression or workspace renaming was added. The raw results are retained so this distinction is visible rather than describing the entire repository's audit as zero.

The fresh consumer lockfiles contain **no installed Shadcn package**, confirming the CLI is no longer installed just to compile UI styles. Their UI manifests exclude Zod and preserve the exact DnD/Hugeicons pins. Moving the CLI alone was not considered sufficient: its remaining development dependency tree was also remediated and audited.

## Verification

- `npm run typecheck`: all five configured tasks passed, including UI.
- `npm run typecheck --workspace @gecko/ui`: passed independently.
- `npm run check:react-refs`: passed, 297 component render functions.
- `npm run build`: all five applications passed after the final tooling/router updates.
- `PLAYWRIGHT_CHANNEL=chrome KEEP_REACT_COMPAT=1 npm run test:react-compat`: fresh React 18.3.1 and React 19.2.5 installations, typechecks, builds, and development/production browser checks passed.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:message-scroller`: passed again after the router update, with 0 px drift in both anchor roles and both motion preferences, including incremental reply growth.
- Vendored CSS fingerprint matches the original 4.12.0 distribution exactly.
- `git diff --check`: passed.

Existing large-bundle notices and the fixture's future Vite JSON-import warning remain. No remote CI run was triggered by this work. The current fixtures still validate source-package consumption; they do not establish the compiled package contract or full production workflow coverage.

## Evidence

[Post-cleanup inventory, version changes, consumer checks and security responses](./cleanup-evidence.json) records the resulting lockfile hash and the base commit. The original audit snapshots remain unchanged for comparison. The read-only inventory script can be rerun against the current tree.

Next: fix portable declaration generation and implement/test the first compiled package artifact.
