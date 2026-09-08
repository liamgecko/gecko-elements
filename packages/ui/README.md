# @gecko/ui

Gecko Elements' shared React component library. The [component contracts](docs/) define approved usage, composition, props and styling. Use this guide for interface work in any consuming project, and read the matching contract before changing a component or its documentation.

## Desktop application scope

The Gecko application, including the Sandbox Inbox, is a desktop application. Mobile layouts, phone breakpoints, touch-specific navigation and mobile visual checks are not requirements. Do not add them or report their absence as a defect unless the user explicitly requests mobile support for a particular product surface.

Support desktop window resizing, keyboard navigation, screen readers, browser zoom and the approved appearance modes. Component overflow inside a desktop panel remains relevant. Existing capabilities used by other consumers should not be removed merely because the desktop app does not require them.

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
import { Button } from "@gecko/ui/components/button";
```

Import every part of a compound component from its documented entry point, including [Data table](docs/data-table.md) and [Reply box](docs/reply-box.md). Use public `@gecko/ui` paths even when the application's tooling can resolve source files directly. An exported internal helper or an undocumented module is not automatically an approved product component.

Load the shared stylesheet once at the application's entry point:

```tsx
import "@gecko/ui/globals.css";
```

It supplies the fonts, tokens, component styles and Tailwind utilities. Retain the consuming app's Tailwind processing and ensure its source files are covered by the shared stylesheet's source scanning. Add any providers required by the selected contracts, such as [Toast](docs/toast.md) or [Sidebar](docs/sidebar.md).

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
