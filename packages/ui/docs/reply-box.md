# Reply box

Import: @gecko/ui/components/reply-box  
Status: Stable  
Source: src/components/reply-box/  
Human documentation: apps/docs/src/pages/reply-box/index.tsx

## Purpose

Reply box provides the approved composer structure for Gecko chat products. It supports a full conversation composer, a multiline composer and a compact single-line composer.

The application owns the message value, submission rules, persistence, channel taxonomy, channel switching and the behaviour behind product actions. Reply box owns the composer regions, note and expanded presentation, action placement, responsive overflow, send and stop controls, and their accessible names.

Use Textarea for an ordinary multiline form field. Use Reply box only inside a conversation experience.

## Canonical composition

Import every public part from the component entry point.

```tsx
import {
  ReplyBox,
  ReplyBoxContent,
  ReplyBoxFooter,
  ReplyBoxHeader,
} from "@gecko/ui/components/reply-box";

<ReplyBox>
  <ReplyBoxHeader showExpand />
  <ReplyBoxContent />
  <ReplyBoxFooter showTray />
</ReplyBox>;
```

ReplyBox recognises ReplyBoxFooter as the footer region regardless of its position among the direct children. Other direct children remain in the writing panel. Prefer the canonical header, content, footer order for readable application code.

## Layouts

Choose the smallest layout that supports the product workflow:

| Layout   | Use                                                      |
| -------- | -------------------------------------------------------- |
| chat     | Full composer with a raised panel and separate footer    |
| textarea | Multiline composer without the raised panel treatment    |
| basic    | Compact single-line composer with an inline send control |

The chat layout may omit its header or footer. The textarea layout commonly pairs content with a footer action tray. The basic layout renders its actions through ReplyBoxContent.

Do not create local layout variants with className. Request a library-level addition when a product needs a genuinely different composer structure.

## Message state and submission

Keep the message value controlled in the application and pass native state through inputProps or textareaProps.

```tsx
<ReplyBox variant="basic" onSend={sendMessage}>
  <ReplyBoxContent
    inputProps={{
      value: message,
      onChange: (event) => setMessage(event.currentTarget.value),
      onKeyDown: handleMessageKeyDown,
    }}
  />
</ReplyBox>
```

Reply box does not decide whether Enter sends, inserts a newline, accepts a mention, or submits rich content. The application implements those rules for its editor and calls the same send function from onSend.

Guard empty or invalid messages in application logic. Disable or suppress unavailable product actions rather than rendering controls that cannot complete their task.

## Accessible names

ReplyBoxContent gives its native writing control the fallback accessible name Message. Note mode changes the fallback to Internal note.

Override the name through inputProps or textareaProps when the surrounding product needs a more specific distinction.

```tsx
<ReplyBoxContent
  textareaProps={{
    "aria-label": "Reply to billing conversation",
  }}
/>
```

The placeholder is a prompt, not the accessible name. Do not remove the fallback without supplying another name.

## Send and stop

onSend runs when Send or Add note is activated. When stopEnabled is true and onStop is present, the send control becomes a Stop control with a square stop icon.

```tsx
<ReplyBox
  variant="basic"
  stopEnabled={sending}
  onSend={sendMessage}
  onStop={stopSending}
>
  <ReplyBoxContent />
</ReplyBox>
```

stopEnabled without onStop does not expose a non-functional stop control. The same sendIcon override is used by the basic and footer layouts.

## Note mode

Use noteMode with onNoteModeChange for controlled product state. Use defaultNoteMode only when the application does not need to set the mode after mount.

Note mode changes the surface, writing prompt, accessible name and send action. The application determines how an internal note is stored and who can see it.

## Expansion

Use expanded with onExpandedChange when the product owns the available composer height. Use defaultExpanded for an uncontrolled initial state.

The expand control changes only Reply box state. Its parent must provide a meaningful height for the expanded layout.

## Channels

Channel values and switching are product integrations. ReplyBoxChannel supplies display data to the composer; it is not an authoritative catalogue of product channels.

Applications may provide their own channel options to ReplyBoxHeader. Do not extend Gecko documentation with product-specific channel rules, availability or delivery behaviour.

## Actions

Built-in action identifiers provide Gecko labels and icons. The application connects attachment, emoji, saved reply and other product behaviour when integrating the composer.

The Forward action reuses the Reply glyph with a horizontal flip so the two related actions share one visual shape.

Custom actions provide an id, label and Hugeicons glyph. Use onClick for an ordinary action or render for a richer inline control. Provide overflowRender when that rich control needs a different representation inside the responsive overflow menu.

```tsx
const actions = [
  {
    id: "assign",
    label: "Assign conversation",
    icon: UserPlus,
    render: <AssigneePicker />,
    overflowRender: <AssigneeMenuItem />,
  },
];

<ReplyBox>
  <ReplyBoxContent />
  <ReplyBoxFooter showTray items={actions} />
</ReplyBox>;
```

The first two tray items remain visible. Remaining actions move into More actions as space decreases. Keep the most important actions first and provide an overflow-compatible representation for custom rendered controls.

## Interface

### ReplyBox

| Property         | Type                            | Default               | Meaning                                   |
| ---------------- | ------------------------------- | --------------------- | ----------------------------------------- |
| variant          | "chat" \| "textarea" \| "basic" | "chat"                | Composer layout                           |
| channel          | ReplyBoxChannel                 | default display value | Application-supplied channel display data |
| items            | ReplyBoxTrayItem[]              | channel defaults      | Action override passed to the footer      |
| expanded         | boolean                         | uncontrolled          | Controlled expanded state                 |
| defaultExpanded  | boolean                         | false                 | Initial uncontrolled expanded state       |
| onExpandedChange | (expanded: boolean) => void     | none                  | Reports expansion changes                 |
| noteMode         | boolean                         | uncontrolled          | Controlled internal-note state            |
| defaultNoteMode  | boolean                         | false                 | Initial uncontrolled note state           |
| onNoteModeChange | (noteMode: boolean) => void     | none                  | Reports note-state changes                |
| onSend           | () => void                      | none                  | Runs from Send or Add note                |
| sendIcon         | GeckoIcon                       | SendHorizontalIcon    | Send-state icon override                  |
| stopEnabled      | boolean                         | false                 | Requests the stop state                   |
| onStop           | () => void                      | none                  | Runs from Stop                            |

ReplyBox accepts native div properties for outer layout integration.

### ReplyBoxContent

| Property      | Type                       | Default     | Meaning                                   |
| ------------- | -------------------------- | ----------- | ----------------------------------------- |
| placeholder   | string                     | mode prompt | Visible writing prompt                    |
| items         | ReplyBoxTrayItem[]         | none        | Actions in the basic layout               |
| showSend      | boolean                    | true        | Shows the basic send control              |
| inputProps    | ComponentProps<"input">    | none        | Native compact-input state and properties |
| textareaProps | ComponentProps<"textarea"> | none        | Native multiline state and properties     |
| className     | string                     | none        | Positions the complete content region     |

### ReplyBoxHeader

| Property            | Type                 | Default       | Meaning                                      |
| ------------------- | -------------------- | ------------- | -------------------------------------------- |
| showChannelSwitcher | boolean              | false         | Shows the product-integrated channel control |
| showExpand          | boolean              | false         | Shows the expansion control                  |
| channels            | channel option array | defaults      | Application-supplied channel choices         |
| channel             | ReplyBoxChannel      | context value | Exceptional display override                 |

### ReplyBoxFooter

| Property    | Type                | Default                     | Meaning                               |
| ----------- | ------------------- | --------------------------- | ------------------------------------- |
| channelType | ReplyBoxChannelType | context value               | Selects the built-in presentation set |
| items       | ReplyBoxTrayItem[]  | context or channel defaults | Actions for this footer               |
| showTray    | boolean             | false                       | Shows the responsive action tray      |
| showSend    | boolean             | true                        | Shows the send or stop control        |

## Styling contract

The library owns composer surfaces, borders, radii, shadows, region spacing, input typography, note treatment, action sizing, overflow, focus-visible states and send-state icons.

Use className only to position or size a complete Reply box or region in its parent. Pass native editor properties through inputProps or textareaProps. Do not reproduce the component with local Input, Button, Dropdown menu and Tooltip compositions.

## Agent rules

- Use Reply box only for a chat or conversation composer.
- Import every part from @gecko/ui/components/reply-box.
- Keep message content, editor behaviour and submission rules in the application.
- Treat channel taxonomy and switching as product-owned.
- Connect every visible action to real product behaviour.
- Preserve the fallback accessible name or supply a more specific one.
- Use controlled note and expanded state when the application changes those states.
- Provide onStop whenever stopEnabled can be true.
- Give a custom rendered tray action an overflowRender when it may enter More actions.
- Keep canonical direct-child composition and do not rebuild the visual treatment locally.
- Request a library change before adding a new layout, action-placement rule or composer state.

## Ownership

Reply box is Gecko-owned. It composes Gecko Button, Dropdown menu and Tooltip internally. Application code imports the Reply box interface and does not reach into its internal files.

## Related components

- Message — conversation content.
- Message scroller — conversation viewport and latest-message scrolling.
- Textarea — ordinary multiline form input.
- Attachment — uploaded-file status and controls.
- Emoji picker — emoji selection for an integrated action.
