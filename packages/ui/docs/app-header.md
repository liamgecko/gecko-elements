# App header

Import: `@gecko/ui/components/app-header`  
Status: Stable  
Source: `src/components/app-header.tsx`  
Human documentation: `apps/docs/src/pages/structure/app-header/index.tsx`

## Purpose

AppHeader is the persistent product chrome at the top of an application screen. It contains product identity, account switching, agent availability controls and the signed-in user menu.

Use Page Header below AppHeader for page titles, breadcrumbs and page-level actions. AppHeader belongs above App Sidebar and must remain consistent across product screens.

## Composition

```text
AppHeader
├── AppHeaderLogo
└── AppHeaderActions
    ├── AppHeaderAccountSwitcher
    ├── AppHeaderControls
    └── AppHeaderUserMenu
```

AppHeader owns its height, sticky position, dark surface and inline padding. AppHeaderActions inserts separators between its direct children. Application code must not recreate this layout with utilities.

## Canonical header

```tsx
<AppHeader>
  <AppHeaderLogo src={logoUrl} alt="Gecko" />
  <AppHeaderActions>
    <AppHeaderAccountSwitcher label="Gecko" accounts={accounts} />
    <AppHeaderControls
      call={{ pressed: callOnline, onPressedChange: setCallOnline }}
      conversation={{
        pressed: conversationOnline,
        onPressedChange: setConversationOnline,
      }}
    />
    <AppHeaderUserMenu
      name="Liam Young"
      avatar={{ name: "Liam Young", src: avatarUrl }}
      items={userMenuItems}
    />
  </AppHeaderActions>
</AppHeader>
```

The application owns account state and switching behaviour. Supply the current account as `label`, provide the available accounts and connect each item’s callback to application state or navigation. AppHeaderAccountSwitcher does not own the selected account.

## Logo

Use `src` and `alt` for the standard image logo:

```tsx
<AppHeaderLogo src={logoUrl} alt="Gecko" />
```

Pass children only when the product needs approved custom brand content. The component ignores image properties when children are supplied.

## Account switching

```tsx
<AppHeaderAccountSwitcher
  label="Gecko"
  accounts={[
    { id: "gecko", label: "Gecko", onSelect: selectGecko },
    { id: "sandbox", label: "Sandbox org", onSelect: selectSandbox },
  ]}
/>
```

Use stable account identifiers. The application must keep the visible label synchronized with the current account. Search is enabled by default and may be disabled when the product does not need it.

## Status controls

```tsx
<AppHeaderControls
  call={{ pressed: callOnline, onPressedChange: setCallOnline }}
  conversation={{
    pressed: conversationOnline,
    onPressedChange: setConversationOnline,
  }}
/>
```

Include only controls that exist in the product. Passing `true` enables an uncontrolled control with its defaults; passing an options object configures or controls it; omitting it removes the control.

Status controls expose their state through Toggle semantics and a supplementary tooltip. AppHeaderControls applies its delay directly to those tooltip triggers and relies on the application’s shared TooltipProvider.

## User menu

```tsx
<AppHeaderUserMenu
  name="Liam Young"
  avatar={{ name: "Liam Young", src: avatarUrl }}
  items={[
    { id: "settings", label: "User settings", onSelect: openSettings },
    {
      id: "logout",
      label: "Logout",
      variant: "destructive",
      separatorBefore: true,
      onSelect: logOut,
    },
  ]}
/>
```

Every menu item requires a stable identifier. Use separators to express genuine groups and reserve the destructive treatment for destructive actions such as logout.

## Interface

### AppHeader

| Property    | Type        | Default | Meaning                              |
| ----------- | ----------- | ------- | ------------------------------------ |
| `children`  | `ReactNode` | —       | Composes the logo and action regions |
| `className` | `string`    | —       | Adds classes to the root header      |

AppHeader accepts native `header` properties.

### AppHeaderLogo

| Property   | Type        | Default   | Meaning                                  |
| ---------- | ----------- | --------- | ---------------------------------------- |
| `src`      | `string`    | —         | Supplies the logo image URL              |
| `alt`      | `string`    | `"Gecko"` | Supplies the image’s accessible name     |
| `children` | `ReactNode` | —         | Replaces the image with approved content |

AppHeaderLogo accepts native image properties when it renders an image.

### AppHeaderActions

| Property    | Type        | Default | Meaning                               |
| ----------- | ----------- | ------- | ------------------------------------- |
| `children`  | `ReactNode` | —       | Supplies trailing action groups       |
| `className` | `string`    | —       | Adds classes to the actions container |

AppHeaderActions accepts native `div` properties.

### AppHeaderAccountSwitcher

| Property            | Type                           | Default                | Meaning                                      |
| ------------------- | ------------------------------ | ---------------------- | -------------------------------------------- |
| `label`             | `ReactNode`                    | —                      | Displays the application’s current account   |
| `accounts`          | `AppHeaderAccountItem[]`       | —                      | Supplies accounts and application callbacks  |
| `searchable`        | `boolean`                      | `true`                 | Shows account search                         |
| `searchPlaceholder` | `string`                       | `"Search accounts..."` | Labels account search                        |
| `emptyLabel`        | `ReactNode`                    | `"No accounts found."` | Labels an empty account search               |
| `align`             | `"start" \| "center" \| "end"` | `"end"`                | Aligns the menu with its trigger             |
| `className`         | `string`                       | —                      | Adds classes to the account-switcher trigger |

Each account item accepts `id`, `label`, `onSelect` and `disabled`. Application code owns account selection and synchronization.

### AppHeaderControls

| Property       | Type                                     | Default | Meaning                                  |
| -------------- | ---------------------------------------- | ------- | ---------------------------------------- |
| `call`         | `boolean \| AppHeaderStatusControlProps` | —       | Configures the call availability control |
| `conversation` | `boolean \| AppHeaderStatusControlProps` | —       | Configures conversation availability     |
| `delay`        | `number`                                 | `300`   | Sets the tooltip opening delay           |
| `className`    | `string`                                 | —       | Adds classes to the controls container   |

### AppHeaderStatusControlProps

| Property          | Type                         | Default     | Meaning                                |
| ----------------- | ---------------------------- | ----------- | -------------------------------------- |
| `pressed`         | `boolean`                    | —           | Controls availability                  |
| `defaultPressed`  | `boolean`                    | `true`      | Sets initial uncontrolled availability |
| `onPressedChange` | `(pressed: boolean) => void` | —           | Runs when availability changes         |
| `onlineLabel`     | `string`                     | `"Online"`  | Labels the available state             |
| `offlineLabel`    | `string`                     | `"Offline"` | Labels the unavailable state           |
| `tooltipLabel`    | `string`                     | —           | Names the status in its tooltip        |
| `aria-label`      | `string`                     | —           | Overrides the toggle’s accessible name |

### AppHeaderUserMenu

| Property       | Type                              | Default       | Meaning                                |
| -------------- | --------------------------------- | ------------- | -------------------------------------- |
| `name`         | `ReactNode`                       | —             | Displays the signed-in person          |
| `avatar`       | `{ name?: string; src?: string }` | —             | Supplies avatar identity and image     |
| `items`        | `AppHeaderUserMenuItem[]`         | —             | Supplies menu actions with stable IDs  |
| `align`        | `"start" \| "center" \| "end"`    | `"end"`       | Aligns the menu with its trigger       |
| `open`         | `boolean`                         | —             | Controls the menu’s open state         |
| `onOpenChange` | `(open: boolean) => void`         | —             | Runs when the open state changes       |
| `aria-label`   | `string`                          | `"User menu"` | Supplies the trigger’s accessible name |
| `className`    | `string`                          | —             | Adds classes to the user-menu trigger  |

Each user menu item requires `id` and `label`, and accepts `onSelect`, `variant`, `disabled` and `separatorBefore`.

## Accessibility

- Keep the semantic `header` element supplied by AppHeader.
- Give the logo an accurate accessible name.
- Keep the current account visible in the account-switcher trigger.
- Preserve Toggle state semantics for availability controls.
- Preserve Dropdown Menu keyboard navigation, focus management and dismissal.
- Use stable, descriptive labels for account and user-menu actions.
- Keep page titles, breadcrumbs and page-level actions in Page Header.

## Agent rules

1. Import every App header part from `@gecko/ui/components/app-header`.
2. Use one AppHeader as the top-level product chrome.
3. Compose AppHeaderLogo and AppHeaderActions as its direct regions.
4. Let AppHeaderActions insert separators; do not add manual separators.
5. Keep account selection and switching in application state.
6. Supply the current account as the account-switcher label.
7. Include only status controls required by the product.
8. Use controlled status state when availability belongs to application data.
9. Give every user-menu item a stable identifier.
10. Keep page titles, breadcrumbs and page actions out of AppHeader.
11. Preserve the dark chrome, height, spacing and component-owned trigger styling.
12. Do not import or assemble the underlying Button, Toggle, Tooltip or Dropdown Menu primitives for this structure.

## Related

- **App Sidebar** — application navigation below AppHeader.
- **Page Header** — page identity, breadcrumbs and actions.
- **Dropdown menu** — account and user menus.
- **Toggle** — availability state controls.
- **Tooltip** — supplementary status detail.
