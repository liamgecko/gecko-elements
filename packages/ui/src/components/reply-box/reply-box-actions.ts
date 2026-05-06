import type { LucideIcon } from "lucide-react"
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
  "saved-reply": { id: "saved-reply", label: "Use a saved reply", icon: Bookmark },
  "mail-merge-tags": { id: "mail-merge-tags", label: "Insert a mail merge tags", icon: SquareUser },
  emoji: { id: "emoji", label: "Insert an emoji", icon: Smile },
  reply: { id: "reply", label: "Reply", icon: Reply },
  forward: { id: "forward", label: "Forward", icon: Forward },
  cc: { id: "cc", label: "CC", icon: ClosedCaption },
  signature: { id: "signature", label: "Insert a signature", icon: Signature },
  "suggest-a-reply": { id: "suggest-a-reply", label: "Suggest a reply", icon: WandSparkles },
  image: { id: "image", label: "Upload an image", icon: Image },
  download: { id: "download", label: "Download conversation", icon: CloudDownload },
}

export function getReplyBoxAction(id: ReplyBoxActionId): ReplyBoxActionConfig {
  return actions[id]
}

export function getDefaultReplyBoxItems(channelType: ReplyBoxChannelType): ReplyBoxActionId[] {
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

