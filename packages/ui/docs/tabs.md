# Tabs

Import: `@gecko/ui/components/tabs`  
Status: Stable  
Source: `src/components/tabs.tsx`  
Human documentation: `apps/docs/src/pages/tabs/index.tsx`

## Purpose

Tabs switches between related panels on the same page while showing one panel at a time.

Use standalone Tabs to section content within a page. Use the tab configuration on Header when the tabs navigate between sub-pages in a product section. Use Accordion when sections should remain stacked or people may need to compare their content.

Tabs follows the Shadcn composition and wraps Base UI Tabs. Application code imports the Gecko component rather than Shadcn or Base UI directly.

## Composition

```text
Tabs
├── TabsList
│   └── TabsTrigger
└── TabsContent
```

Every TabsTrigger must have a corresponding TabsContent with the same value.

## Canonical tabs

Use an uncontrolled root when the selected tab does not need to be stored outside the component.

```tsx
<Tabs defaultValue="events">
  <TabsList>
    <TabsTrigger value="events">Events</TabsTrigger>
    <TabsTrigger value="hosts">Hosts</TabsTrigger>
    <TabsTrigger value="locations">Locations</TabsTrigger>
  </TabsList>
  <TabsContent value="events">Manage upcoming events.</TabsContent>
  <TabsContent value="hosts">Manage event hosts.</TabsContent>
  <TabsContent value="locations">Manage event locations.</TabsContent>
</Tabs>
```

Use concise trigger labels that distinguish the panels. Do not use Tabs for a long option list or content that should remain visible together.

## Variants

Tabs owns the visual variant and TabsList inherits it. Do not repeat the variant on TabsList.

```tsx
<Tabs defaultValue="events" variant="line">
  <TabsList>
    <TabsTrigger value="events">Events</TabsTrigger>
    <TabsTrigger value="hosts">Hosts</TabsTrigger>
  </TabsList>
  <TabsContent value="events">Manage upcoming events.</TabsContent>
  <TabsContent value="hosts">Manage event hosts.</TabsContent>
</Tabs>
```

Use the default variant for a contained tab control. Use the line variant when the tabs should sit flush with the surrounding layout.

## Orientation

Vertical tabs place the list beside the active panel.

```tsx
<Tabs defaultValue="profile" orientation="vertical">
  <TabsList>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">Profile settings.</TabsContent>
  <TabsContent value="notifications">Notification settings.</TabsContent>
</Tabs>
```

Orientation also controls arrow-key navigation. Horizontal tabs use the inline arrow keys; vertical tabs use the block-direction arrow keys.

## Full width

Set `fullWidth` on TabsList when triggers should share the available width evenly.

```tsx
<Tabs defaultValue="day">
  <TabsList fullWidth>
    <TabsTrigger value="day">Day</TabsTrigger>
    <TabsTrigger value="week">Week</TabsTrigger>
    <TabsTrigger value="month">Month</TabsTrigger>
  </TabsList>
  <TabsContent value="day">Daily report.</TabsContent>
  <TabsContent value="week">Weekly report.</TabsContent>
  <TabsContent value="month">Monthly report.</TabsContent>
</Tabs>
```

## Controlled state

Use `value` and `onValueChange` when the active panel must be coordinated with application state.

```tsx
const [tab, setTab] = React.useState("events")

<Tabs value={tab} onValueChange={(value) => setTab(String(value))}>
  <TabsList>
    <TabsTrigger value="events">Events</TabsTrigger>
    <TabsTrigger value="hosts">Hosts</TabsTrigger>
  </TabsList>
  <TabsContent value="events">Manage upcoming events.</TabsContent>
  <TabsContent value="hosts">Manage event hosts.</TabsContent>
</Tabs>
```

## Keyboard behaviour

TabsList uses manual activation by default. Arrow keys move focus, then Enter or Space activates the focused tab. Set `activateOnFocus` when moving focus should immediately activate each tab. Focus loops from the final tab to the first by default.

Disabled triggers are skipped during keyboard navigation. Set the initial or controlled value to an enabled trigger.

## Persistent panels

Inactive panels unmount by default. Set `keepMounted` on TabsContent when inactive content must retain local state or remain available to another system.

```tsx
<TabsContent value="filters" keepMounted>
  <Filters />
</TabsContent>
```

## Badges

Place a small Badge after the trigger label when a count helps people choose a panel. Keep the count concise and use tabular figures when it changes frequently.

## Interface

### Tabs

| Property        | Type                         | Default        | Meaning                                      |
| --------------- | ---------------------------- | -------------- | -------------------------------------------- |
| `variant`       | `"default" \| "line"`        | `"default"`    | Sets the appearance for the complete tab set |
| `orientation`   | `"horizontal" \| "vertical"` | `"horizontal"` | Sets layout and keyboard direction           |
| `defaultValue`  | `Tabs.Tab.Value`             | `0`            | Initially active uncontrolled tab            |
| `value`         | `Tabs.Tab.Value`             | uncontrolled   | Controlled active tab                        |
| `onValueChange` | change handler               | none           | Reports active tab changes                   |

Tabs accepts the remaining Base UI Tabs Root properties.

### TabsList

| Property          | Type      | Default | Meaning                                                   |
| ----------------- | --------- | ------- | --------------------------------------------------------- |
| `fullWidth`       | `boolean` | `false` | Fills the container and distributes triggers evenly       |
| `activateOnFocus` | `boolean` | `false` | Activates each tab as arrow-key focus reaches it          |
| `loopFocus`       | `boolean` | `true`  | Loops arrow-key focus between the first and final trigger |

TabsList accepts the remaining Base UI Tabs List properties.

### TabsTrigger

| Property       | Type             | Default | Meaning                                                   |
| -------------- | ---------------- | ------- | --------------------------------------------------------- |
| `value`        | `Tabs.Tab.Value` | none    | Connects the trigger to the panel with the matching value |
| `disabled`     | `boolean`        | `false` | Prevents selection and skips keyboard focus               |
| `nativeButton` | `boolean`        | `true`  | Preserves button behaviour when replacing the element     |
| `render`       | render prop      | none    | Replaces or composes the rendered element                 |

TabsTrigger accepts the remaining Base UI Tabs Tab properties.

### TabsContent

| Property      | Type             | Default | Meaning                                                   |
| ------------- | ---------------- | ------- | --------------------------------------------------------- |
| `value`       | `Tabs.Tab.Value` | none    | Connects the panel to the trigger with the matching value |
| `keepMounted` | `boolean`        | `false` | Keeps the inactive panel element in the DOM               |
| `render`      | render prop      | none    | Replaces or composes the rendered element                 |

TabsContent accepts the remaining Base UI Tabs Panel properties.

## Accessibility

- Provide one TabsContent for every TabsTrigger and use matching values.
- Keep trigger labels concise and unique within the tab list.
- Preserve the Base UI tab, tablist and tabpanel semantics.
- Do not replace keyboard behaviour with custom key handlers.
- Use `disabled` only when a panel is genuinely unavailable.
- Do not place interactive controls inside TabsTrigger.
- Ensure the active panel follows its trigger in the reading order.
- Preserve the visible focus indicator and reduced-motion treatment.

## Agent rules

1. Import Tabs parts from `@gecko/ui/components/tabs`.
2. Use Tabs only for related panels on the same page.
3. Use Header tabs for navigation between sub-pages.
4. Give every TabsTrigger a matching TabsContent value.
5. Set the visual variant once on Tabs; do not add it to TabsList.
6. Use `fullWidth` only when triggers should divide the available width evenly.
7. Keep the default manual keyboard activation unless immediate activation is demonstrably better.
8. Use controlled state only when application logic needs the active value.
9. Use `keepMounted` deliberately for state retention or integration needs.
10. Preserve Gecko’s approved tab presentation and Base UI semantics.
11. Do not import Shadcn or Base UI Tabs directly.

## API reference

- [Shadcn Tabs documentation](https://ui.shadcn.com/docs/components/base/tabs)
- [Base UI Tabs API](https://base-ui.com/react/components/tabs)

## Related

- **Header** — page-level tabs used as sub-navigation.
- **Accordion** — stacked sections that can remain visible together.
- **Badge** — compact count or status inside a trigger.
