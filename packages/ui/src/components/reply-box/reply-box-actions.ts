import type { LucideIcon } from "lucide-react"
import type * as React from "react"
import {
  Forward,
  Image,
  Paperclip,
  Reply,
  Smile,
  type LucideProps,
  StickyNote,
  SquareUser,
  ClosedCaption,
  Signature,
  WandSparkles,
  CloudDownload,
  Bookmark,
} from "lucide-react"

export type ReplyBoxChannelType = "live-chat" | "email"

export type ReplyBoxChannel = {
  type: ReplyBoxChannelType
  label: string
}

export type ReplyBoxActionId =
  | "note-mode"
  | "attachment"
  | "saved-reply"
  | "mail-merge-tags"
  | "emoji"
  | "reply"
  | "forward"
  | "cc"
  | "signature"
  | "suggest-a-reply"
  | "image"
  | "download"

export type ReplyBoxActionConfig = {
  id: ReplyBoxActionId
  label: string
  icon: LucideIcon
}

const actions: Record<ReplyBoxActionId, ReplyBoxActionConfig> = {
  "note-mode": { id: "note-mode", label: "Enable note mode", icon: StickyNote },
  attachment: { id: "attachment", label: "Upload attachment", icon: Paperclip },
  "saved-reply": {
    id: "saved-reply",
    label: "Use a saved reply",
    icon: Bookmark,
  },
  "mail-merge-tags": {
    id: "mail-merge-tags",
    label: "Insert mail merge tags",
    icon: SquareUser,
  },
  emoji: { id: "emoji", label: "Insert an emoji", icon: Smile },
  reply: { id: "reply", label: "Reply", icon: Reply },
  forward: { id: "forward", label: "Forward", icon: Forward },
  cc: { id: "cc", label: "CC", icon: ClosedCaption },
  signature: { id: "signature", label: "Insert a signature", icon: Signature },
  "suggest-a-reply": {
    id: "suggest-a-reply",
    label: "Suggest a reply",
    icon: WandSparkles,
  },
  image: { id: "image", label: "Upload an image", icon: Image },
  download: {
    id: "download",
    label: "Download conversation",
    icon: CloudDownload,
  },
}

export function getReplyBoxAction(id: ReplyBoxActionId): ReplyBoxActionConfig {
  return actions[id]
}

/** Custom tray action: icon button by default; pass `render` for inline controls such as dropdowns. */
export type ReplyBoxTrayCustomAction = {
  id: string
  label: string
  icon: LucideIcon
  onClick?: () => void
  /** Replaces the default icon button when shown inline in the tray. */
  render?: React.ReactNode
  /** Replaces the default menu item when the action moves into the overflow menu. */
  overflowRender?: React.ReactNode
}

/** Built-in action id or a custom tray action. */
export type ReplyBoxTrayItem = ReplyBoxActionId | ReplyBoxTrayCustomAction

export function isReplyBoxTrayBuiltin(
  item: ReplyBoxTrayItem
): item is ReplyBoxActionId {
  return typeof item === "string"
}

export function getReplyBoxTrayItemKey(item: ReplyBoxTrayItem): string {
  return typeof item === "string" ? item : item.id
}

export function getDefaultReplyBoxItems(
  channelType: ReplyBoxChannelType
): ReplyBoxActionId[] {
  if (channelType === "email") {
    return [
      "note-mode",
      "attachment",
      "saved-reply",
      "mail-merge-tags",
      "emoji",
      "reply",
      "forward",
      "cc",
      "signature",
      "suggest-a-reply",
      "download",
    ]
  }

  return [
    "note-mode",
    "attachment",
    "saved-reply",
    "mail-merge-tags",
    "emoji",
    "suggest-a-reply",
    "download",
  ]
}

export const replyBoxActionIconProps: LucideProps = {
  className: "size-3.5",
  "aria-hidden": true,
}
