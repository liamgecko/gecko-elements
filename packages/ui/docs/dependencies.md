# Approved UI dependencies

This is the decision record for external packages that own UI capabilities in Gecko Elements. `packages/ui/package.json` remains the source of truth for installed packages and versions.

## Rules

- Application code uses the public `@geckolabs/elements` interface when a Gecko wrapper exists.
- Library implementation code uses the dependency already assigned to that capability.
- A missing capability requires a review of the existing dependency set before package installation.
- Replacing a dependency, adding an overlapping package, exposing an implementation package to applications, or introducing a runtime CDN requires explicit approval.
- Component-specific contracts in this directory define the approved product composition and any exceptions.

## Extending a component

Each component contract points to its human documentation. The API section there links to the official APIs that own the component's underlying behaviour. Use those references to research whether the installed dependency can support a requested extension.

An upstream capability is not automatically an approved Gecko capability. Add the behaviour through the existing Gecko component, preserve its accessibility and styling contract, and update its contract and examples. Application code continues to import the Gecko interface rather than the implementation dependency.

## Capability ownership

| Capability                  | Approved dependency                                   | Gecko interface                                                                                                                                                                                                                                             | Direct application imports                                                                                 |
| --------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Accessible UI primitives    | `@base-ui/react`                                      | Accordion, Alert dialog, Avatar, Button, Checkbox, Combobox, Context menu, Dialog, Dropdown menu, File tree, Filters, Input, Number field, Popover, Progress, Radio group, Scroll area, Select, Separator, Sheet, Switch, Tabs, Toggle and Tooltip families | Use the Gecko wrapper                                                                                      |
| Conversation scrolling      | Vendored `@shadcn/react` 0.2.0 compatibility copy      | Message scroller                                                                                                                                                                                                                                            | Use the Gecko wrapper                                                                                      |
| Sortable drag and drop      | `@dnd-kit/abstract`, `@dnd-kit/dom`, `@dnd-kit/react` | Sortable list                                                                                                                                                                                                                                               | Use the Gecko wrapper                                                                                      |
| Data-grid state             | `@tanstack/react-table`                               | Data table                                                                                                                                                                                                                                                  | Use the Gecko wrapper; column types may be imported where the Data table interface requires them           |
| Command palette             | `cmdk`                                                | Command                                                                                                                                                                                                                                                     | Use the Gecko wrapper                                                                                      |
| Date formatting             | `date-fns`                                            | Date picker and library internals                                                                                                                                                                                                                           | Use Gecko date components; application formatting requires an established product pattern                  |
| Emoji data and grid         | `frimousse`                                           | Emoji picker                                                                                                                                                                                                                                                | Use the Gecko wrapper                                                                                      |
| One-time password input     | `input-otp`                                           | OTP field                                                                                                                                                                                                                                                   | Use the Gecko wrapper                                                                                      |
| Icons                       | `@hugeicons/react`, `@hugeicons/core-free-icons`      | Gecko Hugeicons renderer with a 2px default stroke; component-owned icons and approved caller icon glyphs                                                                                                                                                    | Import individual glyphs from their per-icon paths and render them through `@geckolabs/elements/lib/icon`             |
| Motion                      | `motion`                                              | Message animation utilities and approved animated components                                                                                                                                                                                                | Use existing Gecko animation interfaces and patterns                                                       |
| Colour picker               | `react-colorful`                                      | Colour field                                                                                                                                                                                                                                                | Use the Gecko wrapper                                                                                      |
| Calendar grid               | `react-day-picker`                                    | Calendar and Date picker                                                                                                                                                                                                                                    | Use the Gecko wrapper; shared date types may be imported where its interface requires them                 |
| Telephone parsing and flags | `react-phone-number-input`                            | Telephone field                                                                                                                                                                                                                                             | Use the Gecko wrapper                                                                                      |
| Charts                      | `recharts`                                            | Chart and Metric card sparklines                                                                                                                                                                                                                            | Import primitives from `@geckolabs/elements/charts`; follow the approved Chart and Metric card recipes                                   |
| Syntax highlighting         | `shiki`                                               | Code snippet                                                                                                                                                                                                                                                | Use the Gecko wrapper                                                                                      |
| Toast engine                | `@base-ui/react`                                      | Toast                                                                                                                                                                                                                                                       | Use the Gecko wrapper                                                                                      |

Utilities such as `class-variance-authority`, `clsx`, `tailwind-merge` and `tw-animate-css` support library implementation rather than owning a product capability. Shadcn is a development-only component-generation tool. Its required Tailwind styles are preserved locally under `src/vendor/shadcn-tailwind` with their MIT license, so consumers do not install the CLI. Keep that stylesheet available in source and compiled distributions; do not restore a runtime import of `shadcn/tailwind.css`.

Schema validation is application-owned. The docs application declares Zod for its form examples; Elements itself does not depend on Zod. `tw-animate-css` is build-only: both distribution stylesheet modes inline its definitions and include its MIT licence. Source-mode monorepo prototypes resolve it from the development installation.

## Runtime services

An installed dependency does not automatically approve a network dependency. Emoji picker currently uses Frimousse’s default jsDelivr-hosted `emojibase-data`; that exception is recorded in `emoji-picker.md`. Record any future runtime service beside its owning component and obtain approval before adoption.

## Host React peers

The consuming application supplies matching `react`, `react-dom` and `react-is`
versions. `react-is` serves the existing Recharts implementation; it is not an
additional UI system. Use 18.3.1 for all three when integrating with the current
Admin App. Prototypes retain React 19 and its matching `react-is`.

## React compatibility patch

Message scroller retains the approved Shadcn implementation in `src/vendor/shadcn-message-scroller` with its MIT license and a targeted React 18/19 compatibility patch. The published 0.2.0 package requires React 19; do not reinstall it as a runtime dependency while React 18 support is required. See the vendor README for provenance, modifications and verification.

## Icon package version

`@hugeicons/core-free-icons` is pinned to `4.3.0`. The published `4.3.2`
package advertises per-icon `dist/types/*.d.ts` exports but omits those files,
so fresh source-package consumers fail with TS7016. Keep the exact version until
an upstream release includes the declarations and passes `npm run test:react-compat`.
Do not mask this with ambient `any` declarations or relaxed TypeScript checks.
