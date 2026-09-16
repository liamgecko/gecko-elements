# Sidebar

Import: `@geckolabs/elements/components/sidebar`  
Status: Stable foundation  
Source: `src/components/sidebar.tsx`  
Human documentation: `apps/docs/src/pages/sidebar/index.tsx`

## Purpose

Sidebar supplies the low-level state, layout and menu primitives used by Gecko App Sidebar. Product applications should use `AppSidebar`, `AppSidebarFavourites` and `AppSidebarNav` rather than assembling a new navigation rail from Sidebar parts.

Use this contract when maintaining App Sidebar or when an approved shell genuinely requires a different composition. Do not use Sidebar for conversation lists, page headers or temporary panels.

Sidebar follows Shadcn’s Sidebar composition. It uses Gecko components internally and has no separate Base UI Sidebar dependency.

## Product composition

```text
SidebarProvider
├── AppSidebar
│   ├── AppSidebarFavourites
│   └── AppSidebarNav
└── SidebarInset
```

The application shell owns one `SidebarProvider`. Do not add a provider around individual groups or pages.

## Foundation composition

```text
SidebarProvider
├── Sidebar
│   ├── SidebarHeader
│   │   └── SidebarInput
│   ├── SidebarContent
│   │   └── SidebarGroup
│   │       ├── SidebarGroupLabel
│   │       ├── SidebarGroupAction
│   │       └── SidebarGroupContent
│   │           └── SidebarMenu
│   │               └── SidebarMenuItem
│   │                   ├── SidebarMenuButton
│   │                   ├── SidebarMenuAction
│   │                   ├── SidebarMenuBadge
│   │                   └── SidebarMenuSub
│   │                       └── SidebarMenuSubItem
│   │                           └── SidebarMenuSubButton
│   ├── SidebarFooter
│   └── SidebarRail
└── SidebarInset
    └── SidebarTrigger
```

`SidebarSeparator` and `SidebarMenuSkeleton` may be inserted in the corresponding structural region when required.

Import `Settings01Icon` from `@hugeicons/core-free-icons/Settings01Icon` and `HugeiconsIcon` from `@geckolabs/elements/lib/icon` for the icon example.

## Navigation semantics

Destinations are links. Render a `SidebarMenuButton` as an anchor or router link and give every `SidebarMenuSubButton` an `href`.

```tsx
<SidebarMenuButton render={<a href="/settings" />} isActive>
  <HugeiconsIcon icon={Settings01Icon} />
  <span>Settings</span>
</SidebarMenuButton>

<SidebarMenuSubButton href="/settings/team">
  <span>Team</span>
</SidebarMenuSubButton>
```

Use a button only for an action or disclosure that does not navigate. Preserve `aria-expanded` on disclosure buttons so Sidebar can show and rotate its chevron.

When the rail is icon-collapsed, a menu item containing `SidebarMenuButton` and `SidebarMenuSub` becomes a dropdown. It must remain operable by hover, click and keyboard. The dropdown opens toward the content side of the rail.

## State and persistence

`SidebarProvider` supports controlled and uncontrolled state:

| Property                 | Type                      | Default         | Meaning                                                              |
| ------------------------ | ------------------------- | --------------- | -------------------------------------------------------------------- |
| `desktopOnly`            | `boolean`                 | `false`         | Keeps the desktop rail and collapse controls at every viewport width |
| `defaultOpen`            | `boolean`                 | `true`          | Initial uncontrolled state                                           |
| `open`                   | `boolean`                 | uncontrolled    | Controlled desktop state                                             |
| `onOpenChange`           | `(open: boolean) => void` | none            | Reports controlled state changes                                     |
| `persistState`           | `boolean`                 | `true`          | Restores and writes the state cookie                                 |
| `storageKey`             | `string`                  | `sidebar_state` | Cookie name                                                          |
| `enableKeyboardShortcut` | `boolean`                 | `true`          | Enables Command+B or Control+B                                       |

Set `persistState={false}` for isolated previews, tests and nested documentation examples. Product shells normally retain the default persistence.

For a desktop application with a minimum-width, horizontally scrolling shell, set
`desktopOnly`. The shell owns its minimum width and horizontal scrolling; the
sidebar retains the rail, footer toggle and keyboard shortcut below 768px instead
of switching to a Sheet. Other consumers keep the default responsive behaviour.

## Sidebar interface

| Property      | Type                                 | Default       | Meaning                          |
| ------------- | ------------------------------------ | ------------- | -------------------------------- |
| `side`        | `"left" \| "right"`                  | `"left"`      | Physical side of the rail        |
| `variant`     | `"sidebar" \| "floating" \| "inset"` | `"sidebar"`   | Relationship to the main content |
| `collapsible` | `"offcanvas" \| "icon" \| "none"`    | `"offcanvas"` | Closed-state treatment           |

App Sidebar fixes these values to the approved product treatment. Do not override them from application code.

## Menu interfaces

`SidebarMenuButton` supports `isActive`, `variant`, `size`, `tooltip`, `chevron` and Base UI-style `render` composition. Tooltips appear only while the rail is icon-collapsed.

`SidebarMenuAction` supports `showOnHover` and `render`. Hidden actions must also appear on keyboard focus.

`SidebarMenuSubButton` supports `size`, `isActive`, native anchor properties and `render`. It must have a real destination.

`SidebarMenuSkeleton` supports `showIcon`.

`SidebarTrigger` uses `LayoutAlignLeftIcon` while expanded to represent the
collapse action and `LayoutLeftIcon` while collapsed to represent the expand
action. It supplies the corresponding accessible action label and `aria-expanded`.
Expanded state does not give the Button a selected background; normal hover and focus treatments remain.

## Accessibility

- Use links for destinations and buttons for actions or disclosures.
- Mark the current destination with `isActive`.
- Give icon-only menu items a concise tooltip and accessible name.
- Keep the visible `SidebarTrigger`; the pointer rail and keyboard shortcut supplement it.
- Preserve focus rings, keyboard menu behaviour and reduced-motion treatment.
- Keep labels recognisable when expanded and use distinct icons when collapsed.

## Styling contract

The library owns rail widths, collapse motion, positioning, semantic colours, focus treatment, menu spacing, tooltip placement, collapsed submenu placement and the footer divider. The outline menu variant consumes the Sidebar border and accent tokens directly in both themes.

App Sidebar owns its Scroll area and hidden-until-hover scrollbar behaviour. Do not replace it with a native scrolling region. Preserve the existing Sidebar footer styling.

Use `className` only for approved shell placement. Do not restyle Sidebar in a product feature.

## Agent rules

1. Use App Sidebar for product navigation.
2. Modify Sidebar only when the shared navigation foundation requires a change.
3. Keep one SidebarProvider around the application shell.
4. Render navigation destinations as links with real `href` values.
5. Keep disclosure controls as buttons with `aria-expanded`.
6. Preserve hover, click and keyboard access to collapsed submenus.
7. Set `persistState={false}` only for isolated examples or tests.
8. Preserve reduced-motion support, semantic colour tokens and direction-aware overlay placement.
9. Preserve the footer divider and App Sidebar scrollbar treatment.
10. Do not import or install another Sidebar implementation.

## API reference

- [Shadcn Sidebar documentation](https://ui.shadcn.com/docs/components/base/sidebar)

## Related

- **App Sidebar** — approved product navigation composition.
- **App Header** — application chrome above App Sidebar.
- **SidebarInset** — main content region beside the rail.
- **Sheet** — temporary edge panel.
- **Chat head** — conversation list item.

SidebarTrigger accepts optional `collapseLabel` and `expandLabel` strings to translate
its accessible name, hidden text and tooltip. Defaults are “Collapse sidebar” and
“Expand sidebar”. App Sidebar forwards these props to its owned footer trigger.
