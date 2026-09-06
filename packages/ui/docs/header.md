# Page header

Import: `@gecko/ui/components/header`  
Status: Stable  
Source: `src/components/header.tsx`  
Human documentation: `apps/docs/src/pages/structure/header/index.tsx`

## Purpose

Header is the page-level structure below the persistent application chrome. It combines the page location, heading, favourite control, page actions and optional sub-navigation in one consistent layout.

Use one Header above Page Container on every standard page. Inbox uses a purpose-built layout and does not use Header. Do not use Header for card titles or sections inside the page body.

## Internal composition

```text
Header
├── Breadcrumb
├── heading and subheading
├── actions
│   ├── Toggle (favourite)
│   ├── Button or DropdownMenu (secondary)
│   └── Button (primary)
└── Tabs (line)
```

Application code imports only Header. Header selects and composes the approved Gecko primitives from its configuration props.

The favourite control is always present. Breadcrumbs, heading text, additional actions and tabs render only when configured. When a heading is present, actions align with the heading row. Without a heading, actions align with the breadcrumb row.

## Canonical header

```tsx
<Header
  breadcrumbs={{
    items: [
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Page", current: true },
    ],
  }}
  title="Heading"
  subheading="Sub heading"
  favouriteAction={{
    pressed: isFavourite,
    onPressedChange: setIsFavourite,
  }}
  secondaryActions={[{ label: "Button", onClick: handleSecondaryAction }]}
  primaryAction={{ label: "Button", onClick: handlePrimaryAction }}
  tabs={{
    tabsProps: { value: activeTab, onValueChange: setActiveTab },
    items: [
      { value: "one", label: "Label" },
      { value: "two", label: "Label" },
    ],
  }}
/>
```

The application owns navigation, favourite state, action effects and the selected tab. Use controlled state when these values belong to product or route state.

## Breadcrumbs

The first item is the Home ancestor. Header displays it with the same icon-only Home treatment as Breadcrumb and uses its string label as the accessible name. Each ancestor is a genuine link. Supply `href`, use `render` with the application router’s link, or set `renderLabelOnly` when `label` is already an interactive link. Mark the final, non-interactive item with `current: true`.

```tsx
<Header
  breadcrumbs={{
    items: [
      { label: "Home", render: <Link to="/" /> },
      { label: "Section", render: <Link to="/section" /> },
      { label: "Page", current: true },
    ],
  }}
/>
```

Do not supply callback-only ancestors or placeholder destinations. Preserve native link behaviour such as opening in a new tab.

## Favourite

Header always renders the favourite Toggle before the other actions. Omit `favouriteAction` to use its default uncontrolled, unpressed state. Pass controlled state when favourite status belongs to application data.

```tsx
<Header
  title="Heading"
  favouriteAction={{
    pressed: isFavourite,
    onPressedChange: setIsFavourite,
  }}
/>
```

The standard star fills when pressed. The tooltip and accessible name change between “Add to favourites” and “Remove from favourites”. Custom labels must describe the same actions.

## Actions

Use `primaryAction` for the page’s main action and `secondaryActions` for supporting actions. Header renders every favourite, secondary, dropdown and primary control at the default Button size.

```tsx
<Header
  title="Heading"
  secondaryActions={[
    { label: "Button", onClick: handleSecondaryAction },
    {
      kind: "menu",
      label: "Button",
      items: [
        { label: "Menu item", onSelect: handleMenuItem },
        {
          label: "Delete",
          variant: "destructive",
          separatorBefore: true,
          onSelect: handleDelete,
        },
      ],
    },
  ]}
  primaryAction={{ label: "Button", onClick: handlePrimaryAction }}
/>
```

Supply icons explicitly. Header does not infer icons from action wording. An icon-only secondary action requires `ariaLabel`. Use the menu action shape for a list of related actions rather than assembling Dropdown Menu beside Header. Do not override action sizes; Header owns a consistent default-sized action row.

## Tabs

Header tabs are line Tabs used for sub-pages within the current product section. Header supplies their single bottom rule, and the active indicator is centred on that boundary. Use standalone Tabs for switching content within the page body.

Header enables tab overflow by default. When the available width is exhausted, trailing tabs move into the standard ellipsis menu and return to the tab list as space becomes available.

```tsx
<Header
  tabs={{
    tabsProps: { value: activeTab, onValueChange: setActiveTab },
    items: [
      { value: "one", label: "Label" },
      { value: "two", label: "Label" },
    ],
  }}
/>
```

Keep tab labels concise. The application owns synchronization between the selected value, route and displayed page content.

## Interface

### Header

| Property           | Type                               | Default | Meaning                                         |
| ------------------ | ---------------------------------- | ------- | ----------------------------------------------- |
| `breadcrumbs`      | `HeaderBreadcrumbsProps`           | —       | Configures the page location trail              |
| `title`            | `ReactNode`                        | —       | Supplies the page heading                       |
| `subheading`       | `ReactNode`                        | —       | Supplies supporting text below the heading      |
| `favouriteAction`  | `HeaderFavouriteActionProps`       | —       | Configures the standard favourite control       |
| `secondaryActions` | `readonly HeaderSecondaryAction[]` | —       | Supplies supporting buttons or menus            |
| `primaryAction`    | `HeaderActionProps`                | —       | Supplies the main page action                   |
| `tabs`             | `HeaderTabsProps`                  | —       | Configures line tabs along the bottom of Header |
| `className`        | `string`                           | —       | Adds layout classes to the complete Header      |

Header accepts native `div` properties.

### HeaderBreadcrumbsProps

| Property         | Type                              | Default | Meaning                              |
| ---------------- | --------------------------------- | ------- | ------------------------------------ |
| `items`          | `readonly HeaderBreadcrumbItem[]` | —       | Supplies the ordered location trail  |
| `navProps`       | Breadcrumb properties             | —       | Configures the breadcrumb navigation |
| `listProps`      | BreadcrumbList properties         | —       | Configures the breadcrumb list       |
| `separatorProps` | BreadcrumbSeparator properties    | —       | Configures each breadcrumb separator |

`HeaderBreadcrumbItem` is a union: an ancestor requires `href`, `render`, or an interactive `label` with `renderLabelOnly: true`; the final item requires `current: true`. The first item’s label supplies the accessible name for the icon-only Home link.

### HeaderFavouriteActionProps

| Property             | Type                  | Default                    | Meaning                              |
| -------------------- | --------------------- | -------------------------- | ------------------------------------ |
| `pressed`            | `boolean`             | uncontrolled               | Controls favourite state             |
| `defaultPressed`     | `boolean`             | `false`                    | Sets initial uncontrolled state      |
| `onPressedChange`    | Toggle change handler | —                          | Reports favourite changes            |
| `ariaLabel`          | `string`              | current tooltip label      | Overrides the accessible name        |
| `icon`               | `ReactNode`           | Star                       | Replaces the standard favourite icon |
| `tooltipAddLabel`    | `string`              | `"Add to favourites"`      | Labels the unpressed action          |
| `tooltipRemoveLabel` | `string`              | `"Remove from favourites"` | Labels the pressed action            |

HeaderFavouriteActionProps accepts the remaining Toggle properties except `children` and `size`.

### HeaderActionProps

| Property | Type        | Default | Meaning                           |
| -------- | ----------- | ------- | --------------------------------- |
| `label`  | `ReactNode` | —       | Supplies the visible action label |
| `icon`   | `ReactNode` | —       | Adds an explicit action icon      |

HeaderActionProps accepts the remaining Button properties except `children` and `size`.

### HeaderSecondaryAction

HeaderSecondaryAction is either `HeaderSecondaryButtonAction` or `HeaderSecondaryMenuAction`.

An icon-only HeaderSecondaryButtonAction requires `icon` and `ariaLabel`. A visible-label action requires `label` and may include an icon. It accepts the remaining Button properties except `children` and `size`.

HeaderSecondaryMenuAction requires `kind: "menu"` and `items`. It accepts `label`, `icon`, `ariaLabel`, `align` and `triggerProps` for the menu trigger. A visible label receives the standard dropdown affordance.

Each HeaderMenuItem accepts `label`, `onSelect`, `variant` and `separatorBefore`. Use the destructive variant only for a destructive action and separate it from the preceding group.

### HeaderTabsProps

| Property    | Type                        | Default | Meaning                                 |
| ----------- | --------------------------- | ------- | --------------------------------------- |
| `items`     | `readonly HeaderTabsItem[]` | —       | Supplies tab triggers                   |
| `tabsProps` | Tabs properties             | —       | Configures selection and Tabs behaviour |
| `listProps` | TabsList properties         | —       | Configures the tab list                 |

Each HeaderTabsItem requires a string `value` and a visible `label`, and accepts the remaining TabsTrigger properties.

## Accessibility

- Supply one clear page title so the page has a single visible `h1`.
- Pair a subheading with a title rather than rendering supporting text alone.
- Use genuine links for breadcrumb ancestors and a non-interactive current page.
- Keep Home as the first breadcrumb item so Header can apply its standard icon treatment.
- Give icon-only secondary actions a contextual accessible name.
- Keep the favourite control’s accessible name synchronized with its action.
- Preserve Button, Toggle, Dropdown Menu, Breadcrumb and Tabs keyboard behaviour.
- Keep one primary action and use destructive wording that states its consequence.

## Styling contract

Header owns its sticky position, stacking layer, background, single bottom border, outer spacing, heading typography, action alignment and line-tab placement. Its TabsList does not add a second border; the active indicator sits over the Header boundary. Header also owns the standard favourite treatment and consistent default action sizes.

Use `className` only for reviewed layout integration. Do not remove the background, border, sticky behaviour or padding; recolour the surface; restyle action hierarchy; or replace internal primitives in application code.

## Agent rules

1. Import Header from `@gecko/ui/components/header`.
2. Use one Header above Page Container on every standard page.
3. Do not use Header on Inbox unless its layout contract changes.
4. Treat the favourite control as part of every Header.
5. Supply genuine destinations for breadcrumb ancestors and mark the final item current.
6. Keep Home as the first breadcrumb item and supply its accessible label.
7. Pair subheading with title.
8. Keep one primary action and place supporting actions in secondaryActions.
9. Supply action icons explicitly; do not infer them from wording.
10. Give every icon-only secondary action an ariaLabel.
11. Use the menu action shape for a secondary list of actions.
12. Keep every Header action at the component-owned default size.
13. Use Header tabs only for sub-pages within the current section.
14. Preserve Header’s background, stacking, spacing, action hierarchy and line-tab treatment.
15. Do not directly assemble its internal Breadcrumb, Toggle, Button, Dropdown Menu or Tabs layout in application code.

## Related

- **Page Container** — standard page body below Header.
- **App Header** — persistent product chrome above the page.
- **App Sidebar** — persistent product navigation beside the page.
- **Breadcrumb** — page hierarchy rendered by Header.
- **Button** — primary and secondary actions rendered by Header.
- **Toggle** — favourite state rendered by Header.
- **Dropdown menu** — secondary action lists rendered by Header.
- **Tabs** — sub-navigation rendered by Header.
