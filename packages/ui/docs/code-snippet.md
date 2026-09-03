# Code snippet

Import: `@gecko/ui/components/code`  
Status: Stable  
Source: `src/components/code.tsx`  
Human documentation: `apps/docs/src/pages/code-snippet/index.tsx`

## Purpose

Code snippet presents read-only technical content with the library’s approved typography, surface, syntax highlighting and optional copy action. Use inline Code for a short technical token within prose. Use block Code for source code, configuration, commands, plain-text output, or a customer-facing snippet such as website embed code.

Use Input for an editable single-line value and Textarea for editable multiline plain text. Use a purpose-built code editor when people need code editing features. Code snippet never executes its content.

## Canonical inline usage

Inline is the default variant:

```tsx
import { Code } from "@gecko/ui/components/code";

<p>
  Set <Code>aria-invalid</Code> when validation fails.
</p>;
```

Keep inline content short enough to remain part of its sentence. Pass the visible token as children. Do not use inline Code for multiline content.

## Canonical block usage

Pass the complete source through `code` and explicitly identify its language:

```tsx
const embedCode = `<script src="https://example.com/widget.js"></script>`;

<Code
  variant="block"
  language="html"
  code={embedCode}
  showCopyButton
  copyLabel="Copy embed code"
/>;
```

Block Code owns highlighting, theme response, overflow, keyboard scrolling and fallback rendering. Application code supplies content and meaning; it does not assemble a highlighter, scroll area, copy Button, Tooltip or Toast.

## Languages

`language` is required for block Code. The approved closed set is:

| Value        | Content                                   |
| ------------ | ----------------------------------------- |
| `"text"`     | Plain text or output without highlighting |
| `"tsx"`      | TypeScript with JSX                       |
| `"ts"`       | TypeScript                                |
| `"jsx"`      | JavaScript with JSX                       |
| `"js"`       | JavaScript                                |
| `"json"`     | JSON                                      |
| `"bash"`     | Shell commands or scripts                 |
| `"css"`      | CSS                                       |
| `"html"`     | HTML                                      |
| `"markdown"` | Markdown                                  |

Choose the value that matches the supplied content. Use `"text"` when no supported grammar applies. Agents must obtain explicit user consent before adding another language or changing the approved set.

## Copy action

Set `showCopyButton` when people are expected to reuse the complete block, such as an embed snippet, command or configuration example. Omit it when the block is only for reading.

Set `copyLabel` to a concise action that identifies what will be copied, such as `"Copy embed code"` or `"Copy command"`. Code snippet copies the exact `code` string and owns the Button, Tooltip, success state and Toast feedback.

Copy is intentionally unavailable for inline Code. Use block Code when a value needs a copy action.

## Content rules

- Pass complete, valid content rather than fragments that require undocumented surrounding code.
- Keep examples concise while retaining everything required to understand or reuse them.
- Remove secrets, access tokens, personal data and environment-specific credentials before rendering.
- Use plain text for logs or output. Code snippet is not a log viewer and does not stream updates.
- Use the existing source string as the single value for rendering and copying.

## Loading and failure

Block Code loads the shared syntax highlighter on demand. It immediately renders safely escaped plain text, then replaces it with highlighted output when ready. If highlighting fails, the escaped plain-text representation remains available.

Callers do not provide loading, highlighted HTML, or error states.

## Accessibility

- Inline Code renders the semantic `code` element.
- Block Code renders semantic `pre` and `code` elements inside a labelled scrollable region.
- The block region is keyboard focusable so overflowing content can be scrolled without a pointer.
- Keyboard focus receives the approved visible focus treatment.
- The copy action is a native Button with an accessible action label and Tooltip.
- Copy success or failure is announced through the library Toast.
- The displayed and copied values come from the same `code` string.

## Interface

### Inline Code

| Property    | Type              | Default    | Meaning                        |
| ----------- | ----------------- | ---------- | ------------------------------ |
| `variant`   | `"inline"`        | `"inline"` | Inline presentation            |
| `children`  | `React.ReactNode` | required   | Visible short technical token  |
| `className` | `string`          | none       | Parent-layout integration only |

### Block Code

| Property         | Type                                                                                            | Default  | Meaning                                         |
| ---------------- | ----------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------- |
| `variant`        | `"block"`                                                                                       | required | Selects block presentation                      |
| `code`           | `string`                                                                                        | required | Exact content displayed and copied              |
| `language`       | `"text" \| "tsx" \| "ts" \| "jsx" \| "js" \| "json" \| "bash" \| "css" \| "html" \| "markdown"` | required | Approved syntax-highlighting language           |
| `showCopyButton` | `boolean`                                                                                       | `false`  | Adds the library-owned copy action              |
| `copyLabel`      | `string`                                                                                        | `"Copy"` | Accessible name and Tooltip for the copy action |
| `className`      | `string`                                                                                        | none     | Parent-layout integration only                  |

## Styling contract

The library owns inline typography and colour; block background, border, radius, spacing, typography, overflow, focus treatment and highlighting; and copy Button placement, Tooltip and feedback.

Use `className` only for documented parent-layout integration such as width or placement. Request a library change when a legitimate treatment is missing.

Agents must obtain explicit user consent before adding or changing variants, props, languages, controls, behaviours, styling, syntax themes or visual treatments.

## Related components

- **Input** — editable single-line value.
- **Textarea** — editable multiline plain text.
- **Tooltip** — supporting text for another compact control; already included by Code snippet’s copy action.
