# Search

Import: `@gecko/ui/components/search`  
Status: Stable  
Source: `src/components/search.tsx`  
Human documentation: `apps/docs/src/pages/search/index.tsx`

## Purpose

Search lets people enter a product query that filters or finds content elsewhere in the interface. Use it for lists, tables, dashboards, navigation collections and other result surfaces.

Search is not a form field and does not represent a submitted value. Use Input inside Field when the value belongs to a form. Use Combobox when typing narrows a fixed option list and the person must select one of those options.

## Ownership

Search is Gecko-owned. It composes Gecko Input group, Input and Button with approved Lucide icons. Applications use the Search interface rather than recreating its icon, clear action or value handling.

## Canonical usage

Use controlled state when the query drives application results:

```tsx
const [query, setQuery] = React.useState("")

<Search
  value={query}
  onValueChange={setQuery}
  placeholder="Search conversations…"
  aria-label="Search conversations"
/>
```

Search has the default accessible name `Search`. Supply a more specific name when the searchable content is known or when several Search controls appear on one page.

## Clear action

Enable the clear action when people are likely to reset the query:

```tsx
<Search value={query} onValueChange={setQuery} showClear />
```

The action appears only while the query contains a value. Clearing reports an empty string and returns focus to Search.

## Size

```tsx
<Search size="sm|md|lg" />
```

Use the medium size by default. Use small in dense toolbars and large only when search is a primary page action. Do not recreate sizes with application classes.

## Result behaviour

Search owns query entry and clearing. The consuming application owns:

- local filtering or remote request timing;
- debouncing, cancellation and stale-response handling;
- loading and empty-result feedback;
- result counts and announcements;
- result keyboard interaction and selection;
- URL or navigation state.

Place request failures and empty states with the results they describe. Do not present a network or result-loading failure as input validation on Search.

## Interface

| Property        | Type                      | Default    | Meaning                                                |
| --------------- | ------------------------- | ---------- | ------------------------------------------------------ |
| `size`          | `"sm" \| "md" \| "lg"` | `"md"`     | Sets the control and icon size                         |
| `showClear`     | `boolean`                 | `false`    | Shows a clear action while the query contains a value  |
| `value`         | `string`                  | —          | Controls the current query                             |
| `defaultValue`  | `string`                  | —          | Sets the initial uncontrolled query                    |
| `onValueChange` | `(value: string) => void` | —          | Reports each query change, including clearing          |
| `aria-label`    | `string`                  | `"Search"` | Provides the accessible purpose of the control         |
| `className`     | `string`                  | —          | Extends the outer Input group                          |

Search accepts applicable native input properties except the native `size` property.

## Accessibility

- Preserve the native search input semantics.
- Give multiple Search controls distinct accessible names.
- Keep the clear action keyboard accessible and return focus after clearing.
- Use `aria-controls` when Search controls an identifiable results region.
- Announce result-count changes from the result surface when that feedback is necessary.
- Do not rely on placeholder text as the only accessible name.

## Agent rules

1. Import Search from `@gecko/ui/components/search`.
2. Use Search only when the query changes content elsewhere in the interface.
3. Use `onValueChange` as the canonical query callback.
4. Provide a specific accessible name when the searchable content is known.
5. Let the application own filtering, requests, debouncing and result feedback.
6. Keep request failures and empty states with the results region.
7. Use Input and Field for submitted form values.
8. Use Combobox for searchable fixed-option selection.
9. Do not rebuild Search from Input group and separate icon buttons.

## Related

- **Data table** — searchable tabular data.
- **Filters** — compound filtering and sorting.
- **Input field** — submitted single-line text.
- **Combobox** — searchable fixed-option selection.
