/**
 * Docs routes for Gecko-only components (not in the shadcn/ui component catalog).
 * Used to show a "Custom" badge in the sidebar.
 */
export const customComponentPaths = new Set<string>([
  // Components
  "/components/activity-feed",
  "/components/avatar-group",
  "/components/chat-bubble",
  "/components/chat-head",
  "/components/code-snippet",
  "/components/color-picker",
  "/components/counter",
  "/components/date-input",
  "/components/drag-and-drop",
  "/components/drop-zone",
  "/components/emoji-picker",
  "/components/file-input",
  "/components/file-tree",
  "/components/filters",
  "/components/inline-edit",
  "/components/metric-card",
  "/components/number-field",
  "/components/reply-box",
  "/components/search-input",
  "/components/sensitive-field",
  "/components/telephone-field",
  "/components/typing-indicator",
  // Structure (Gecko layout patterns)
  "/structure/container",
  "/structure/header",
])

export function isCustomComponentPath(path: string): boolean {
  return customComponentPaths.has(path)
}
