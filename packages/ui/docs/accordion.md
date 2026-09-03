# Accordion

Import: `@gecko/ui/components/accordion`  
Status: Stable  
Source: `src/components/accordion.tsx`  
Human documentation: `apps/docs/src/pages/accordion/index.tsx`

## Purpose

Accordion groups related secondary information into expandable sections. It reduces visual density while leaving section headings available to scan.

Accordion must contain at least two related sections. Keep a single section visible rather than making it collapsible.

Do not use Accordion for page navigation or for critical information that must remain visible.

## Import

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@gecko/ui/components/accordion";
```

## Composition

```text
Accordion
├── AccordionItem
│   ├── AccordionTrigger
│   └── AccordionContent
└── AccordionItem
    ├── AccordionTrigger
    └── AccordionContent
```

Every `AccordionItem` requires a unique `value`. Put the section heading in `AccordionTrigger` and its body in `AccordionContent`.

## Variants

### Default

Use the default variant for related secondary information in dense panels, such as the Inbox contact-details panel.

- Allow multiple independent sections to remain open.
- Start with all sections closed unless one is clearly prioritised.
- Preserve the user's open sections for the lifetime of the panel.

```tsx
<Accordion multiple>
  <AccordionItem value="details">
    <AccordionTrigger>Details</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
  <AccordionItem value="activity">
    <AccordionTrigger>Activity</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Sectional

Use `variant="sectional"` to divide a large setup form into meaningful sections.

- Allow multiple sections to remain open.
- Keep fields mounted when their section closes.
- Open the first or most relevant section initially.
- When validation fails, open every section containing an error.
- Move focus to the first invalid control or the form's error summary.
- Preserve entered values and validation state when a section closes.

```tsx
<Accordion variant="sectional" defaultValue={["details"]} multiple keepMounted>
  <AccordionItem value="details">
    <AccordionTrigger>Details</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
  <AccordionItem value="settings">
    <AccordionTrigger>Settings</AccordionTrigger>
    <AccordionContent>...</AccordionContent>
  </AccordionItem>
</Accordion>
```

When application state or validation needs to open a section programmatically, control the Accordion with `value` and `onValueChange` instead of relying only on `defaultValue`.

## Open-state controls

| Requirement                               | Configuration                                            |
| ----------------------------------------- | -------------------------------------------------------- |
| Start with every section closed           | Omit `defaultValue`                                      |
| Prioritise one section initially          | `defaultValue={["section-value"]}`                       |
| Allow independent sections to remain open | `multiple`                                               |
| Start with several sections open          | Use `multiple` with all initial values in `defaultValue` |
| Open sections programmatically            | Control `value` and update it through `onValueChange`    |
| Preserve mounted form fields while closed | `keepMounted`                                            |

Opening every section initially is supported but is not the canonical setup-form configuration. If all content must always be visible, do not use Accordion.

## Styling contract

Use the existing `default` and `sectional` variants. Do not override Accordion borders, padding, radius, typography, backgrounds, or disclosure icons with `className`.

Agents must not add variants or behaviour props without explicit user consent. If an existing treatment cannot satisfy a requirement, stop and ask rather than extending the interface.

## Accessibility

- Use concise, descriptive trigger labels that identify the hidden content.
- Do not hide critical instructions or information required to complete the current task.
- When validation fails in a sectional setup form, reveal the invalid section before moving focus to its first invalid control or the form's error summary.
- Do not place page navigation in Accordion; use Header tabs or standalone Tabs.

Keyboard interaction, expanded state, trigger relationships, and panel semantics are provided by the underlying Base UI Accordion.

## Do and don't

Do:

- Use Accordion for two or more related sections.
- Use the default variant for dense panels containing secondary information.
- Use the sectional variant for large setup forms.
- Give every item a unique value.
- Preserve state and reveal validation errors in sectional forms.

Don't:

- Use Accordion for a single section.
- Use Accordion as a standard page-layout or navigation pattern.
- Hide critical content that must remain visible.
- Restyle its chrome with `className`.
- Add variants or behaviour props without explicit consent.

## Related components

- **Header tabs** — switch between sub-pages within a product section.
- **Tabs** — switch between views or sections of content on the same page.
  The existing Collapsible implementation is not a recommended alternative and is planned for removal. Do not use or expand it.
