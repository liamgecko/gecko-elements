# Capability index

Generated from component contracts and their declared sources. Run `npm run generate:capabilities` after changing a contract or dependency. [Machine-readable index](capabilities.json) includes imports, implementation dependencies, limits and checks. Read [dependency policy](dependencies.md) before adding an external import. This is a routing index, not a replacement for each contract.

| Capability | Import | Recipe | Important boundary |
| --- | --- | --- | --- |
| [Accordion](accordion.md) | `@geckolabs/elements/components/accordion` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Action icons](action-icons.md) | `@geckolabs/elements/lib/action-icons` | [Source](recipes/async-form.tsx) | Glyph mapping only; no action behaviour or permissions. |
| [Activity feed](activity-feed.md) | `@geckolabs/elements/components/activity-feed` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Alert dialog](alert-dialog.md) | `@geckolabs/elements/components/alert-dialog` | [Source](recipes/persistent-editor.tsx) | The application must connect router blockers; browser refresh/close cannot use custom dialogs. |
| [Alert](alert.md) | `@geckolabs/elements/components/alert` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [App header](app-header.md) | `@geckolabs/elements/components/app-header` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [App sidebar](app-sidebar.md) | `@geckolabs/elements/components/app-sidebar` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Attachment](attachment.md) | `@geckolabs/elements/components/attachment` | [Source](recipes/upload-field.tsx) | Application owns upload/scan service, durable references and abandoned upload cleanup. |
| [Avatar group](avatar-group.md) | `@geckolabs/elements/components/avatar-group` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Avatar](avatar.md) | `@geckolabs/elements/components/avatar` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Badge](badge.md) | `@geckolabs/elements/components/badge` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Breadcrumb](breadcrumb.md) | `@geckolabs/elements/components/breadcrumb` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Bubble](bubble.md) | `@geckolabs/elements/components/bubble` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Button Group](button-group.md) | `@geckolabs/elements/components/button-group` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Button](button.md) | `@geckolabs/elements/components/button` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Calendar](calendar.md) | `@geckolabs/elements/components/calendar` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Card](card.md) | `@geckolabs/elements/components/card` | [Source](recipes/async-form.tsx) | Use size sm for application content blocks; default size remains available for other contexts. |
| [Chart](chart.md) | `@geckolabs/elements/components/chart` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Chat head](chat-head.md) | `@geckolabs/elements/components/chat-head` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Checkbox](checkbox.md) | `@geckolabs/elements/components/checkbox` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Code snippet](code-snippet.md) | `@geckolabs/elements/components/code` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Colour field](color-picker.md) | `@geckolabs/elements/components/color-picker` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Combobox](combobox.md) | `@geckolabs/elements/components/combobox` | [Source](recipes/remote-combobox.tsx) | Remote recipe covers search, selection and races; no built-in remote pagination or virtualization. |
| [Command](command.md) | `@geckolabs/elements/components/command` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Page container](container.md) | `@geckolabs/elements/components/container` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Context menu](context-menu.md) | `@geckolabs/elements/components/context-menu` | See contract | No current DataTable row integration. Preserve native browser menus on rowLink anchors; visible row actions use Dropdown menu. |
| [Counter](counter.md) | `@geckolabs/elements/components/counter` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Data table](data-table.md) | `@geckolabs/elements/components/data-table` | [Source](recipes/remote-table.tsx) | Backend must support requested query keys. rowLink uses native anchors and browser context menus; visible row actions use Dropdown menu. |
| [Date field](date-field.md) | `@geckolabs/elements/components/date-input` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Date picker](date-picker.md) | `@geckolabs/elements/components/date-picker` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Dialog](dialog.md) | `@geckolabs/elements/components/dialog` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Drop zone](drop-zone.md) | `@geckolabs/elements/components/drop-zone` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Dropdown menu](dropdown-menu.md) | `@geckolabs/elements/components/dropdown-menu` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Emoji picker](emoji-picker.md) | `@geckolabs/elements/components/emoji-picker` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Empty](empty.md) | `@geckolabs/elements/components/empty` | [Source](recipes/remote-table.tsx) | Render only for confirmed empty data; preserve cached empty during refresh. |
| [Field](field.md) | `@geckolabs/elements/components/field` | [Source](recipes/async-form.tsx) | Application owns schema and shared mutation validation. |
| [File field](file-field.md) | `@geckolabs/elements/components/file-input` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [File tree](file-tree.md) | `@geckolabs/elements/components/file-tree` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Filters](filters.md) | `@geckolabs/elements/components/filters` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Page header](header.md) | `@geckolabs/elements/components/header` | [Source](recipes/persistent-editor.tsx) | Presentation metadata is not permission authority; mount above child routes. |
| [Inline edit](inline-edit.md) | `@geckolabs/elements/components/inline-edit` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Input Group](input-group.md) | `@geckolabs/elements/components/input-group` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Input](input.md) | `@geckolabs/elements/components/input` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Kbd](kbd.md) | `@geckolabs/elements/components/kbd` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Label](label.md) | `@geckolabs/elements/components/label` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Marker](marker.md) | `@geckolabs/elements/components/marker` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Message scroller](message-scroller.md) | `@geckolabs/elements/components/message-scroller` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Message](message.md) | `@geckolabs/elements/components/message` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Metric card](metric-card.md) | `@geckolabs/elements/components/metric-card` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Native select](native-select.md) | `@geckolabs/elements/components/native-select` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Number field](number-field.md) | `@geckolabs/elements/components/number-field` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [OTP field](otp-field.md) | `@geckolabs/elements/components/input-otp` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Pagination](pagination.md) | `@geckolabs/elements/components/pagination` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Popover](popover.md) | `@geckolabs/elements/components/popover` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Progress](progress.md) | `@geckolabs/elements/components/progress` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Radio group](radio-group.md) | `@geckolabs/elements/components/radio-group` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Reply box](reply-box.md) | `@geckolabs/elements/components/reply-box` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Rich text editor](rich-text-editor.md) | `@geckolabs/elements/components/rich-text-editor` | See contract | Vendored TinyMCE 4.7.1 compatibility runtime; same-origin frame is not an HTML security boundary. Serve its assets. |
| [Scroll area](scroll-area.md) | `@geckolabs/elements/components/scroll-area` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Search](search.md) | `@geckolabs/elements/components/search` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Select](select.md) | `@geckolabs/elements/components/select` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Sensitive field](sensitive-field.md) | `@geckolabs/elements/components/sensitive-field` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Separator](separator.md) | `@geckolabs/elements/components/separator` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Sheet](sheet.md) | `@geckolabs/elements/components/sheet` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Sidebar](sidebar.md) | `@geckolabs/elements/components/sidebar` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Skeleton](skeleton.md) | `@geckolabs/elements/components/skeleton` | [Source](recipes/persistent-editor.tsx) | Match known control geometry; do not guess an unknown collection shape. |
| [Sortable list](sortable-list.md) | `@geckolabs/elements/components/sortable-list` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Spinner](spinner.md) | `@geckolabs/elements/components/spinner` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Switch](switch.md) | `@geckolabs/elements/components/switch` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Table](table.md) | `@geckolabs/elements/components/table` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Tabs](tabs.md) | `@geckolabs/elements/components/tabs` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Telephone field](telephone-field.md) | `@geckolabs/elements/components/telephone-field` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Textarea](textarea.md) | `@geckolabs/elements/components/textarea` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Toast](toast.md) | `@geckolabs/elements/components/toast` | [Source](recipes/async-form.tsx) | Field validation belongs beside fields; operation feedback must not shift page layout. |
| [Toggle Group](toggle-group.md) | `@geckolabs/elements/components/toggle-group` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Toggle](toggle.md) | `@geckolabs/elements/components/toggle` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Tooltip](tooltip.md) | `@geckolabs/elements/components/tooltip` | See contract | Use the documented composition and variants; application owns domain data and effects. |
| [Typing indicator](typing-indicator.md) | `@geckolabs/elements/components/typing-indicator` | See contract | Use the documented composition and variants; application owns domain data and effects. |
