# Maintaining the component documentation

Start with the [library usage guide](../../packages/ui/README.md). The [component contracts](../../packages/ui/docs/) own approved component selection, composition, props and styling; the docs app supplies live examples of those contracts.

## Sources and ownership

- Read the matching package contract before editing a component page. Its `Source` and `Human documentation` entries identify the implementation and example page.
- Check the current implementation and public exports when documenting props or imports. Report conflicts with the contract rather than silently changing intended behaviour.
- Use the root [product glossary](../../CONTEXT.md) for Gecko terminology only. Keep UI rules in the owning package contract so library consumers can follow them without this monorepo's applications.
- Treat `apps/projects` and `apps/sandbox` as prototypes, not canonical component guidance, unless the user identifies a specific implementation as canonical.
- Read [Approved UI dependencies](../../packages/ui/docs/dependencies.md) before changing or directly importing an external UI dependency. Upstream documentation describes the underlying API; it does not approve new Gecko patterns.

## Updating a page

1. Update the owning contract and its existing live examples together when approved usage changes. Check the [Choosing components](src/pages/guides/choosing-components.tsx), [Styling](src/pages/guides/styling.tsx) and [Recipes](src/pages/guides/recipes.tsx) guides for affected summaries.
2. Preserve existing demos. Add examples or sections only when the task authorises them, and follow the component contract before extending APIs, variants or visual treatments.
3. Keep code snippets consistent with the live example. Put exact public imports in the Import section; example snippets show the component composition without repeating imports.
4. Keep Usage focused on when to choose or avoid the component. Name the relevant props in variant and behaviour explanations. Link recommended components with `DocsPageLink`.
5. Update the existing navigation metadata when a page's name, route or sections change.

Component pages cover purpose, usage, imports, compound anatomy where applicable, a working basic example, supported variants and behaviour, relevant API details, and related components. Use the existing documentation layout components. Keep guide summaries brief and defer detailed rules to the owning contract and component page.

Render documentation code through `Code` from `@/components/layout/docs-code`. This sets block regions to `tabIndex={-1}` so only copy buttons enter sequential Tab order. Keep public `@geckolabs/elements/components/code` imports in the displayed usage snippets for library consumers.

## Navigation and coverage

- [gallery-data.ts](src/pages/gallery-data.ts) lists the component, structure, core and guide pages.
- [App.tsx](src/App.tsx) registers routes.
- [component-sections.ts](src/config/component-sections.ts) defines page sections.
- [custom-component-paths.ts](src/config/custom-component-paths.ts) records Gecko-only component classification.

The former phase tracker and AI-document extraction plan have been retired. Use the current contracts, pages and navigation metadata to assess coverage rather than historical phase checkboxes.

## Verification

From the repository root, run `npm run build --workspace docs` and lint the changed TypeScript files with `npm run lint --workspace docs -- <paths-relative-to-apps/docs>`. Check changed links, imports and snippets, then open affected pages with `npm run dev --workspace docs` to verify the rendered examples and copy. For shared component changes, follow the [repository build checks](../../README.md#working-in-this-monorepo).
