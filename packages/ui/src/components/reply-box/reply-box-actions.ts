import Image from "@hugeicons/core-free-icons/Image01Icon";
import Attachment from "@hugeicons/core-free-icons/AttachmentIcon";
import Reply from "@hugeicons/core-free-icons/ReplyIcon";
import Smile from "@hugeicons/core-free-icons/SmileIcon";
import StickyNote from "@hugeicons/core-free-icons/StickyNote03Icon";
import SquareUser from "@hugeicons/core-free-icons/UserSquareIcon";
import ClosedCaption from "@hugeicons/core-free-icons/ClosedCaptionIcon";
import Signature from "@hugeicons/core-free-icons/SignatureIcon";
import WandSparkles from "@hugeicons/core-free-icons/WandSparklesIcon";
import Download01Icon from "@hugeicons/core-free-icons/Download01Icon";
import Bookmark from "@hugeicons/core-free-icons/Bookmark02Icon";
import { cn } from "@gecko/ui/lib/utils";

export type ReplyBoxChannelType = "live-chat" | "email";

export type ReplyBoxChannel = {
  type: ReplyBoxChannelType;
  label: string;
};

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
  | "download";

export type ReplyBoxActionConfig = {
  id: ReplyBoxActionId;
  label: string;
  icon: GeckoIcon;
  iconClassName?: string;
};

const actions: Record<ReplyBoxActionId, ReplyBoxActionConfig> = {
  "note-mode": { id: "note-mode", label: "Enable note mode", icon: StickyNote },
  attachment: { id: "attachment", label: "Upload attachment", icon: Attachment },
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
  forward: {
    id: "forward",
    label: "Forward",
    icon: Reply,
    iconClassName: "-scale-x-100",
  },
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
    icon: Download01Icon,
  },
};

export function getReplyBoxAction(id: ReplyBoxActionId): ReplyBoxActionConfig {
  return actions[id];
}

/** Custom tray action: icon button by default; pass `render` for inline controls such as dropdowns. */
export type ReplyBoxTrayCustomAction = {
  id: string;
  label: string;
  icon: GeckoIcon;
  onClick?: () => void;
  /** Replaces the default icon button when shown inline in the tray. */
  render?: React.ReactNode;
  /** Replaces the default menu item when the action moves into the overflow menu. */
  overflowRender?: React.ReactNode;
};

/** Built-in action id or a custom tray action. */
export type ReplyBoxTrayItem = ReplyBoxActionId | ReplyBoxTrayCustomAction;

export function isReplyBoxTrayBuiltin(
  item: ReplyBoxTrayItem,
): item is ReplyBoxActionId {
  return typeof item === "string";
}

export function getReplyBoxTrayItemKey(item: ReplyBoxTrayItem): string {
  return typeof item === "string" ? item : item.id;
}

export function getDefaultReplyBoxItems(
  channelType: ReplyBoxChannelType,
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
    ];
  }

  return [
    "note-mode",
    "attachment",
    "saved-reply",
    "mail-merge-tags",
    "emoji",
    "suggest-a-reply",
    "download",
  ];
}

export const replyBoxActionIconProps: GeckoIconProps = {
  className: "size-3.5",
  "aria-hidden": true,
};

export function getReplyBoxActionIconProps(
  id: ReplyBoxActionId,
  className = "size-3.5",
): GeckoIconProps {
  return {
    className: cn(className, actions[id].iconClassName),
    "aria-hidden": true,
  };
}

import type * as React from "react";
import type { GeckoIcon, GeckoIconProps } from "@gecko/ui/lib/icon";
