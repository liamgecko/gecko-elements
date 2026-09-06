# Lucide to Hugeicons review

This focused audit maps Lucide usage inside the Gecko component library and its documentation site to candidates from the live Hugeicons MCP catalogue. Sandbox and product-application usage are intentionally excluded.

## Files

- `lucide-to-hugeicons.csv` contains one row per normalized visual concept. Edit `review_status`, `preferred_alternative`, and `notes` during review.
- `lucide-usage.csv` contains one row per import/file pair for filtering and impact analysis.

## Snapshot

- 120 normalized runtime icon concepts across 87 component and documentation files.
- 87 concepts appear in `packages/ui`.
- 33 concepts appear only in `apps/docs`.
- 257 import/file relationships.
- Lucide-only type imports in this scope: `LucideIcon`, `LucideProps`.

## Review method

1. Filter `component_files` above zero to review component-owned icons first.
2. Compare the suggested glyph and both alternatives in Hugeicons.
3. Enter another Hugeicons catalogue slug in `preferred_alternative` when none of the suggestions fit.
4. Set `review_status` to `approved`, `change`, or `reject`.
5. Use the locations column or the normalized usage file to inspect meaning in context.

## Important caveats

- An exact catalogue-name match is semantic evidence, not proof that the glyph is visually equivalent.
- Numbered Hugeicons variants such as `home-01` versus `home-02` require visual selection.
- `LucideIcon` is a React component type. Hugeicons icon packages export glyph data as `IconSvgElement`, rendered through `HugeiconsIcon`; caller-owned icon APIs therefore require deliberate interface migration.
- Keep final imports on per-icon subpaths. Do not create a global icon registry or wildcard import.
