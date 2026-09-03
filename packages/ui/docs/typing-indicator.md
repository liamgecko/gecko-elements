# Typing indicator

Import: `@gecko/ui/components/typing-indicator`  
Status: Stable  
Source: `src/components/typing-indicator.tsx`  
Human documentation: `apps/docs/src/pages/typing-indicator/index.tsx`

## Purpose

Typing indicator communicates that someone is currently composing a message. It belongs near the message composer and outside the transcript.

Use Message for content that has already been sent. Do not derive Typing indicator from the local composer input; product code must drive it from remote real-time activity.

## Basic indicator

Use the compact dots when the person typing is already clear from the conversation context:

```tsx
<TypingIndicator />
```

The component announces “Someone is typing” as a polite atomic status. The dots are decorative and use Gecko’s fixed count, size, colour and timing.

## Named indicator

Use the named presentation when the interface must identify the person:

```tsx
<TypingIndicator variant="text" name="Liam" />
```

The named presentation composes Marker and MarkerContent. Shimmer provides the visual activity treatment while the live status text supplies the meaning.

## Avatar

Pass an image URL or a custom Avatar when visual identity helps distinguish the person:

```tsx
<TypingIndicator variant="text" name="Liam" avatar={avatarUrl} />
```

The avatar is decorative inside the status because the person’s name is already included in its announcement. Omit it when the surrounding interface already establishes identity.

## Presence and motion

Keep Typing indicator mounted and update `active` so both its entry and exit transitions can complete:

```tsx
<TypingIndicator active={isTyping} variant="text" name="Liam" />
```

When inactive, the indicator fades out while sliding down and is removed from the accessibility tree. Its small layout slot remains stable so the surrounding composer does not jump. Reduced-motion preferences remove the transition. Conditionally unmounting the component prevents its exit transition from playing.

## Interface

| Property  | Type                        | Default  | Meaning                                                   |
| --------- | --------------------------- | -------- | --------------------------------------------------------- |
| `active`  | `boolean`                   | `true`   | Shows or hides the indicator while preserving transitions |
| `variant` | `"dots" \| "text"`          | `"dots"` | Sets the compact or named presentation                    |
| `name`    | `string`                    | —        | Identifies the person in visible and accessible text      |
| `avatar`  | `string \| React.ReactNode` | —        | Shows an image URL or custom avatar                       |

TypingIndicator also accepts native `div` properties. Its status role, live-region behaviour and active-state accessibility are owned by the component.

## Accessibility

- Drive the status from remote typing activity and remove it promptly when that activity stops.
- Keep the polite atomic status semantics supplied by the component.
- Treat dots, shimmer and avatars as supplementary visuals rather than the source of meaning.
- Name the person when the conversation context does not make their identity clear.
- Keep the component mounted and change `active` when exit motion is required.
- Do not override the inactive accessibility state.

## Agent rules

1. Import TypingIndicator from `@gecko/ui/components/typing-indicator`.
2. Render it outside message rows and near the conversation composer.
3. Drive `active` from remote real-time typing activity.
4. Keep the component mounted so exit motion can complete.
5. Use the dots presentation when identity is already clear.
6. Use the named presentation when the person must be identified.
7. Add an avatar only when it materially helps identify the person.
8. Preserve Marker and Shimmer inside the named presentation.
9. Preserve the fixed dots and built-in motion rather than styling them in application code.
10. Do not use TypingIndicator for sent messages, loading, or assistant thinking states.

## Related

- **Marker** — the named presentation’s status-text foundation.
- **Message** — content that has already been sent.
- **Avatar** — optional visual identity.
