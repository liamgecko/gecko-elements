# Activity feed

Import: `@gecko/ui/components/activity-feed`  
Status: Stable  
Source: `src/components/activity-feed.tsx`  
Human documentation: `apps/docs/src/pages/activity-feed/index.tsx`

## Purpose

Activity feed displays a chronological history of actions on a contact. Entries are supplied newest first. Each entry contains a decorative activity icon, a label that describes what happened, and supporting metadata such as a timestamp or attribution.

Use Activity feed in contact views and the Inbox contact-details sidebar. Do not use it for a conversation transcript.

## Import

```tsx
import {
  ActivityFeed,
  type ActivityFeedEntry,
  type ActivityFeedPagination,
} from "@gecko/ui/components/activity-feed";
```

## Canonical usage

Pass Activity feed the entries to render. The module owns row composition, icon mapping, visual structure, and pagination controls.

```tsx
<ActivityFeed items={activities} />
```

Entries use this structure:

```ts
type ActivityFeedEntry = {
  id: string;
  type: ActivityFeedType;
  label: React.ReactNode;
  meta: React.ReactNode;
};
```

Rules:

- Supply entries newest first. Activity feed does not sort them.
- The label must communicate the activity without relying on the icon.
- Link only the relevant object within the label, such as a conversation or event name.
- Do not make the entire row interactive.
- Put the timestamp and relevant attribution in `meta`.

## Variants

### Default

The default variant is canonical. Use it unless condensed is explicitly requested.

```tsx
<ActivityFeed items={activities} />
```

### Condensed

Use `variant="condensed"` only when the denser treatment has been explicitly requested. Do not select it automatically because a layout is constrained.

```tsx
<ActivityFeed items={activities} variant="condensed" />
```

## Activity types

The approved activity types are:

| Type                   | Meaning                             |
| ---------------------- | ----------------------------------- |
| `conversation-started` | A conversation began                |
| `conversation-closed`  | A conversation was closed           |
| `form-submission`      | A form submission was received      |
| `email-sent`           | An email was sent                   |
| `sms-sent`             | An SMS message was sent             |
| `added-to-campaign`    | The contact was added to a campaign |
| `call-made`            | A call was made                     |
| `added-to-event`       | The contact was added to an event   |
| `system-alert`         | The system recorded an alert        |

This is a closed set. Agents must not add an activity type or icon without explicit user consent.

## Pagination

Activity feed owns and renders its pagination interface. The parent application fetches and supplies only the current page of entries.

```tsx
<ActivityFeed
  items={activities}
  pagination={{
    page,
    pageSize: 20,
    totalItems,
    onPageChange: setPage,
  }}
/>
```

Pagination is one-based: the first page is `1`.

```ts
type ActivityFeedPagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};
```

The parent must:

- Fetch the requested page when `onPageChange` is called.
- Pass only that page through `items`.
- Supply the total item count across every page.
- Continue ordering each returned page newest first.

Activity feed:

- Calculates the total number of pages.
- Renders previous and next buttons.
- Disables unavailable directions with native `disabled` buttons.
- Announces the current page and total pages to screen readers without adding a visible page count.
- Omits pagination controls when there is only one page.

Do not import and assemble the standalone Pagination module around Activity feed.

## Loading, empty, and error states

The parent surface owns these states:

- Use Spinner while the initial history is loading.
- Use Empty when the contact has no activity.
- Use Alert when the history cannot be loaded.

Do not add loading, empty, or error props to Activity feed without explicit consent.

## Styling contract

Do not override the timeline, icons, spacing, typography, or pagination chrome with `className`. Use the existing interface.

Agents must not add activity types, icons, variants, or behaviour props without explicit user consent. Stop and ask if the existing interface cannot satisfy a requirement.

## Accessibility

- Icons are decorative and hidden from assistive technology.
- Every label must describe the activity independently of its icon.
- Only meaningful objects within a label should be links.
- Pagination uses native buttons with descriptive accessible names.
- Page changes are announced as “Page X of Y.”

## Related components

- **Message / Message scroller** — conversation transcripts.
- **Pagination** — pagination for content other than Activity feed. Do not compose it around Activity feed.
- **Spinner** — parent-owned loading state.
- **Empty** — parent-owned empty state.
- **Alert** — parent-owned error state.
