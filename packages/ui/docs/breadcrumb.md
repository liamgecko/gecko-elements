# Breadcrumb

Import: `@gecko/ui/components/breadcrumb`  
Status: Stable  
Source: `src/components/breadcrumb.tsx`  
Human documentation: `apps/docs/src/pages/breadcrumb/index.tsx`

## Purpose

Breadcrumb communicates a page’s position in a genuine hierarchy and provides links to its ancestors.

Place Breadcrumb inside the page-level Header. The canonical configuration is a three-level trail: icon-only Home, one visible ancestor link, and the non-interactive current page. Compose the Breadcrumb parts directly as shown below.

Use primary navigation for unrelated destinations and browser history for the path a person previously visited. Breadcrumb represents hierarchy, not either of those concepts.

## Canonical application usage

```tsx
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@gecko/ui/components/breadcrumb";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link to="/" />} aria-label="Home">
        <Home aria-hidden className="size-3.5" />
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link to="/projects" />}>Projects</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Gecko Elements</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>;
```

Every item before the final item is an ancestor with a real destination. Use `render` for the application router’s Link or `href` for an ordinary anchor. The final item is `BreadcrumbPage`.

## Composition

The approved anatomy is:

```text
Breadcrumb
└── BreadcrumbList
    ├── BreadcrumbItem
    │   └── BreadcrumbLink
    ├── BreadcrumbSeparator
    ├── BreadcrumbItem
    │   └── BreadcrumbLink
    ├── BreadcrumbSeparator
    └── BreadcrumbItem
        └── BreadcrumbPage
```

Use `BreadcrumbLink` for every ancestor, `BreadcrumbPage` for the current page, and `BreadcrumbSeparator` between adjacent items. `BreadcrumbPage` supplies `aria-current="page"` and is intentionally not a link.

## Router links

Breadcrumb ancestors are navigation. Render an anchor or the application router’s Link component, preserving native link behaviour such as opening in a new tab.

```tsx
<BreadcrumbLink render={<Link to="/projects" />}>Projects</BreadcrumbLink>
```

Use `href` when an ordinary anchor is appropriate. Use `render` for a router Link. A button is not an ancestor link.

## Home

The first ancestor may use a Home icon where Header space is constrained. Give an icon-only Home link an accessible name; the icon remains decorative.

```tsx
<BreadcrumbLink render={<Link to="/" />} aria-label="Home">
  <Home aria-hidden className="size-3.5" />
</BreadcrumbLink>
```

Prefer a visible text label when space permits.

## Deep-path overflow

For a path that would crowd or wrap the Header, retain the first level, nearest useful ancestor, and current page. Place only the omitted middle levels in a Dropdown menu opened by `BreadcrumbEllipsis`.

The overflow trigger is a Button and owns a contextual accessible name such as `Open breadcrumb menu`. `BreadcrumbEllipsis` is decorative. Every menu item represents a destination and remains a real link.

Keep this composition inside the page-level Header.

## Responsive behaviour

BreadcrumbList wraps as a fallback for zoom, text enlargement, and narrow layouts. Use the approved overflow composition for a hierarchy known to be deep; do not rely on wrapping as its primary design.

Keep labels concise and preserve their full accessible text. The application owns the hierarchy and chooses which middle levels move into overflow.

## Separators

Use `BreadcrumbSeparator` without children so Gecko supplies the approved chevron and right-to-left orientation. A different separator requires explicit user consent.

Separators are decorative and excluded from the accessibility tree.

## Accessibility

- `Breadcrumb` renders a `nav` landmark named “breadcrumb”.
- `BreadcrumbList` and `BreadcrumbItem` preserve ordered-list semantics.
- Ancestors are native links with real destinations.
- The current page is non-interactive and exposes `aria-current="page"`.
- Icon-only Home links and overflow triggers have accessible names.
- Separators and `BreadcrumbEllipsis` are decorative.
- The trail remains usable when it wraps under zoom or text enlargement.

## Interface

### Parts

| Part                  | Meaning                                                         |
| --------------------- | --------------------------------------------------------------- |
| `Breadcrumb`          | Named navigation landmark                                       |
| `BreadcrumbList`      | Ordered trail                                                   |
| `BreadcrumbItem`      | One ancestor or current-page entry                              |
| `BreadcrumbLink`      | Ancestor anchor; use `render` for a router Link                 |
| `BreadcrumbPage`      | Non-interactive current page                                    |
| `BreadcrumbSeparator` | Approved decorative chevron between items                       |
| `BreadcrumbEllipsis`  | Decorative overflow symbol placed inside a labeled menu trigger |

All parts accept the native properties of their rendered element. `BreadcrumbLink` additionally accepts Base UI’s `render` composition property.

### Header integration

Header’s `breadcrumbs.items` interface may generate the same trail when a layout already delegates Breadcrumb composition to Header. Its ancestor items accept `href` for native navigation or `render` for a router Link, and its final item uses `current: true`. The composed three-level Breadcrumb above remains the canonical component configuration.

## Styling contract

The library owns typography, colour, spacing, wrapping, separator appearance, hover treatment, current-page treatment, and right-to-left behaviour.

Use `className` only to position the complete Breadcrumb within a layout-level parent. Request a library change when a legitimate treatment is missing. Agents must obtain explicit user consent before adding or changing props, variants, separators, behaviours, or visual treatments.

## Relationship to Shadcn

Gecko retains Shadcn’s Base UI compound structure and render composition. Gecko applies a denser text and spacing treatment, uses an RTL-aware default separator, and gives the current page plain `aria-current="page"` semantics rather than presenting it as a disabled link. The canonical configuration is the composed three-level trail inside Page Header.
