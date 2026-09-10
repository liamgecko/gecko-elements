# Typography

Human documentation: `apps/docs/src/pages/core/typography/index.tsx`

## Sentence casing

Always use sentence case for Gecko UI copy and documentation prose: page titles, headings, navigation, menu items, buttons, field labels, placeholders, table headings, tooltips, status text and messages.

Capitalise the first word and proper names. Keep acronyms such as API and SMS uppercase, and preserve exact code identifiers such as `AppHeaderUserMenu`. Sentence case does not mean lowercasing names, identifiers or user-entered content.

| Use           | Avoid         |
| ------------- | ------------- |
| Gecko academy | Gecko Academy |
| User settings | User Settings |
| Release notes | Release Notes |
| Save changes  | Save Changes  |
| API settings  | API Settings  |

Write the correct casing in the source text. Do not use CSS `text-transform`, `capitalize` or automatic string conversion to enforce it; these can alter names and acronyms.

## Type styles

Use the existing typography styles and tokens. Satoshi is the primary UI font; Geist Mono is for code. Keep a clear heading hierarchy and use spacing to group related content. Components own their text styling; do not override their internal font sizes or weights in consuming screens.

## Agent rules

- Apply sentence case whenever adding or editing UI copy or documentation prose.
- Use “Gecko academy” for the academy link.
- Preserve proper names, acronyms, code identifiers and user-entered content.
- Keep visible docs examples and component contracts consistent.
