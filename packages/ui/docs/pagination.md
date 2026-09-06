# Pagination

Import: `@gecko/ui/components/pagination`  
Status: Stable  
Source: `src/components/pagination.tsx`  
Human documentation: `apps/docs/src/pages/pagination/index.tsx`

## Purpose

Pagination provides navigation between discrete pages of content. Use it below a paginated list when people need to move through the result set or jump to a known page.

Use the pagination interface owned by Data table or Activity feed when working with those components. Do not assemble a second Pagination around them.

Pagination follows Shadcn’s native-element composition. It does not wrap a standalone Base UI pagination primitive.

## Composition

```text
Pagination
└── PaginationContent
    └── PaginationItem
        └── PaginationPrevious | PaginationLink | PaginationEllipsis | PaginationNext
```

Every rendered control belongs in its own PaginationItem. The compact tree lists each distinct child once; it is not literal JSX.

## Canonical navigation

```tsx
<Pagination aria-label="Search results pagination">
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="?page=1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=2" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=3">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="?page=3" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

Use real destinations for navigational pagination so links retain browser behaviour such as opening in a new tab. Set `isActive` on exactly one page link; it supplies `aria-current="page"` and the approved active treatment.

## Previous and next controls

PaginationPrevious and PaginationNext provide visible text on wider screens and descriptive accessible names at every width. Use `iconOnly` when the surrounding interface already communicates the page position or available space is limited.

On press, each chevron moves slightly in its navigation direction. The movement follows the writing direction and is disabled when reduced motion is requested.

Use the `text` property to change the visible Previous or Next text. When the wording or language changes, also supply the matching `aria-label` because the default accessible labels remain “Go to previous page” and “Go to next page”.

Omit a previous or next link when that direction is unavailable. Never leave an unavailable link with a working `href`. For stateful client-side controls that must remain visible while unavailable, use a native Gecko Button with `disabled`, as Data table and Activity feed do.

## Page ranges

Use PaginationEllipsis only to represent an omitted range of page links. It is not interactive. Its “More pages” text is exposed to assistive technology while its icon remains decorative.

Keep the number of page links short enough to reflow without horizontal scrolling. Use an ellipsis for skipped ranges rather than shrinking targets or truncating page numbers.

## Interface

| Property                      | Type                 | Default        | Meaning                                               |
| ----------------------------- | -------------------- | -------------- | ----------------------------------------------------- |
| `Pagination.aria-label`       | `string`             | `"Pagination"` | Names the navigation landmark                         |
| `PaginationLink.isActive`     | `boolean`            | `false`        | Marks the current page and applies its visual state   |
| `PaginationLink.size`         | Gecko Button size    | `"icon"`       | Sets the link dimensions                              |
| `PaginationLink.variant`      | Gecko Button variant | `"ghost"`      | Sets the link treatment; active links use `"outline"` |
| `PaginationPrevious.text`     | `string`             | `"Previous"`   | Sets the visible previous-page text                   |
| `PaginationPrevious.iconOnly` | `boolean`            | `false`        | Hides the visible previous-page text                  |
| `PaginationNext.text`         | `string`             | `"Next"`       | Sets the visible next-page text                       |
| `PaginationNext.iconOnly`     | `boolean`            | `false`        | Hides the visible next-page text                      |

Pagination accepts native `nav` properties. PaginationContent, PaginationItem and PaginationEllipsis accept the native properties for their corresponding HTML elements. PaginationLink accepts anchor properties plus the documented Gecko Button presentation properties.

## Accessibility

- Give the Pagination landmark a contextual `aria-label` when more than one pagination control can appear on a page.
- Use real anchors with valid destinations for navigation between URLs.
- Set `isActive` on exactly one current-page link.
- Preserve the supplied previous and next accessible labels, or replace them with equally descriptive labels.
- Omit unavailable navigational links rather than leaving active destinations.
- Keep PaginationEllipsis non-interactive.
- Do not reduce or overlap the approved control hit areas.

## Agent rules

1. Import Pagination parts from `@gecko/ui/components/pagination`.
2. Put every link or control in its own PaginationItem inside PaginationContent.
3. Use links for URL navigation and native Gecko Buttons for client-side actions.
4. Set `isActive` on exactly one current page.
5. Use PaginationEllipsis only for an omitted page range.
6. Omit unavailable navigation links; never leave them with working destinations.
7. Use the pagination already owned by Data table or Activity feed instead of composing another instance.
8. Retain the accessible names on previous and next controls.
9. Use Gecko’s existing sizes and variants without restyling Pagination in application code.
10. Do not import Shadcn source or create a second pagination implementation.

## API reference

- [Shadcn Pagination documentation](https://ui.shadcn.com/docs/components/base/pagination)

## Related

- **Data table** — tabular results with owned client-side pagination.
- **Activity feed** — timeline entries with owned page controls.
- **Button** — stateful client-side previous and next actions.
