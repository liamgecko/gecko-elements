# Page container

Import: `@gecko/ui/components/container`  
Status: Stable  
Source: `src/components/container.tsx`  
Human documentation: `apps/docs/src/pages/structure/container/index.tsx`

## Purpose

Container wraps the body of a standard page with the shared page background and outer padding. Place it below Page Header so page bodies align consistently across the product.

Inbox uses a purpose-built layout and does not use Container. Cards, sheets and dialogs own their internal spacing and must not contain it.

## Canonical usage

```tsx
<>
  <Header title="Contacts" />
  <Container>
    <ContactsTable />
  </Container>
</>
```

Use one Container for the page body. Put page sections and content layouts inside it rather than nesting additional Containers.

## Interface

| Property    | Type        | Default | Meaning                                        |
| ----------- | ----------- | ------- | ---------------------------------------------- |
| `children`  | `ReactNode` | —       | Supplies the page sections and content layouts |
| `className` | `string`    | —       | Adds classes to the root page-body wrapper     |

Container accepts native `div` properties.

## Styling contract

Container owns the standard page background and `p-6` outer padding. Use `className` only for layout requirements that do not replace that contract. Do not remove its padding, recolour it, turn it into a card or duplicate its outer padding on child content.

## Agent rules

1. Import Container from `@gecko/ui/components/container`.
2. Use one Container around the body of every standard page.
3. Place Container below Page Header.
4. Do not use Container on Inbox unless its layout contract changes.
5. Do not nest Containers.
6. Do not place Container inside a card, sheet or dialog.
7. Let Container provide the page background and outer padding.
8. Use Scroll area inside Container when a constrained region needs independent scrolling.

## Related

- **Page Header** — page title, location, actions and tabs above the body.
- **App Header** — persistent product chrome above the page.
- **App Sidebar** — application navigation beside the page.
- **Scroll area** — overflow within a constrained content region.
- **Card** — grouped content with its own surface and internal spacing.
