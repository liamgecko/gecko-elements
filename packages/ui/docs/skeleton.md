# Skeleton

Import: `@geckolabs/elements/components/skeleton`  
Status: Stable  
Source: `src/components/skeleton.tsx`

## Purpose

Skeleton reserves the space for data that is still loading. Keep the surrounding
page, card, header and navigation mounted; replace only the content that depends
on the pending request. The application owns loading, errors and retry.

## Canonical usage

```tsx
<Card size="sm">
  <CardHeader>
    <CardTitle>Account details</CardTitle>
    <CardDescription>Manage this account.</CardDescription>
  </CardHeader>
  <CardContent aria-busy={loading}>
    {loading ? (
      <>
        <span role="status" className="sr-only">Loading account details…</span>
        <Skeleton
          aria-hidden="true"
          className="motion-reduce:animate-none"
          style={{ height: "2rem", width: "100%" }}
        />
      </>
    ) : children}
  </CardContent>
</Card>
```

## Interface and styling

Skeleton accepts native div properties, including `className` and `style` for
layout dimensions. Match the approximate dimensions of the incoming content.
Skeleton owns its muted surface, radius and pulse. Use
`motion-reduce:animate-none` to respect reduced motion; do not replace its colours
or animation with a product-specific treatment.

## Accessibility

Skeletons are decorative, never focusable form controls. Hide them from assistive
technology and provide one translated loading status for the visible content
region. Use `aria-busy` while that region loads. Keep recoverable load errors and
Retry in the same region, without replacing the surrounding card or header.

## Related

- **Card** — persistent surface around loading content.
- **Field** — field layout after data loads.
- **Spinner** — compact indeterminate progress indicator.

## Application integration

Use the [tested application patterns](application-patterns.md) for data ownership, loading, asynchronous operations and navigation. Preserve source behaviour with the [migration checklist](migration-checklist.md). Common action glyphs come from the [action icon map](action-icons.md).
