/**
 * Docs routes for Gecko-only components (not in the shadcn/ui component catalog).
 * Used for documentation Kind classification — not shown as sidebar badges.
 */
export const customComponentPaths = new Set<string>([
  "/components/activity-feed",
  "/components/avatar-group",
  "/components/chat-bubble",
  "/components/chat-head",
  "/components/code-snippet",
  "/components/colour-field",
  "/components/counter",
  "/components/date-field",
  "/components/drop-zone",
  "/components/emoji-picker",
  "/components/file-field",
  "/components/file-tree",
  "/components/filters",
  "/components/inline-edit",
  "/components/metric-card",
  "/components/number-field",
  "/components/reply-box",
  "/components/search",
  "/components/sensitive-field",
  "/components/sortable-list",
  "/components/telephone-field",
  "/components/typing-indicator",
  "/structure/app-header",
  "/structure/app-sidebar",
  "/structure/container",
  "/structure/header",
]);

export function isCustomComponentPath(path: string): boolean {
  return customComponentPaths.has(path);
}
