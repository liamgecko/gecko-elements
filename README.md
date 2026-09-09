# Gecko Elements

This npm monorepo contains the shared `@geckolabs/elements` library and the applications that consume it. Start with the [library usage guide](packages/ui/README.md) when building an interface.

## Repository map

| Location                       | Purpose                                              |
| ------------------------------ | ---------------------------------------------------- |
| [packages/ui](packages/ui)     | Public component imports, styles and usage contracts |
| [apps/docs](apps/docs)         | Interactive component documentation and examples     |
| [apps/sandbox](apps/sandbox)   | Product interface sandbox                            |
| [apps/projects](apps/projects) | Forms, chat widget and virtual events prototypes     |
| [CONTEXT.md](CONTEXT.md)       | Gecko application terminology                        |

## Working in this monorepo

Use Node and npm as specified in [package.json](package.json). Run commands from the repository root. If dependencies are not installed, run `npm ci`.

Existing apps declare `"@geckolabs/elements": "*"`, import `@geckolabs/elements/globals.css`, and enable `@tailwindcss/vite`. For a new app, use a directory matched by the root workspace globs and adapt the workspace wiring in an existing app's [package.json](apps/projects/forms/package.json), [Vite config](apps/projects/forms/vite.config.ts), [TypeScript config](apps/projects/forms/tsconfig.app.json), and [entry point](apps/projects/forms/src/main.tsx). Adjust relative paths for the new directory. Preserve the shared stylesheet and its Tailwind source coverage when adding a workspace outside the existing app locations.

Run the docs app to inspect live examples:

```sh
npm run dev --workspace docs
```

For a consuming app, replace `forms` below with its `package.json` name:

```sh
npm run dev --workspace forms
npm run build --workspace forms
```

The app build runs TypeScript project checks and Vite bundling. Root `npm run typecheck` alone is insufficient: some app scripts target a solution config with no source files, and sandbox has no typecheck script.

After changes to shared library code or styles, check the library and all consuming apps:

```sh
npm run typecheck --workspace @geckolabs/elements
npm run build
```

Use an affected workspace's lint or test scripts where provided; see its `package.json`. Complete the [interface verification](packages/ui/README.md#verify-the-interface) in the running app and report any failures separately from missing library capabilities.

## Private prereleases

See [the private release guide](docs/package-readiness/private-releases.md).
`npm run release:prepare` creates and tests an exact publishable tarball;
`npm run release:publish -- 0.1.0-next.1` publishes that verified artifact privately
under `next`. Neither a normal build nor a branch push publishes a package.
