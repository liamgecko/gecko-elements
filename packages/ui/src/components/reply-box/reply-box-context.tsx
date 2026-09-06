"use client";

import * as React from "react";
import type { GeckoIcon } from "@gecko/ui/lib/icon";

import type { ReplyBoxChannel, ReplyBoxTrayItem } from "./reply-box-actions";
import type { ReplyBoxVariant } from "./reply-box";

export const ReplyBoxContext = React.createContext<{
  variant: ReplyBoxVariant;
  channel: ReplyBoxChannel;
  setChannel: (channel: ReplyBoxChannel) => void;
  expanded: boolean;
  toggleExpanded: () => void;
  itemsOverride?: ReplyBoxTrayItem[];
  noteMode: boolean;
  toggleNoteMode: () => void;
  onSend?: () => void;
  sendIcon?: GeckoIcon;
  /** When true with `onStop`, the footer send control shows a stop affordance instead of send. */
  stopEnabled?: boolean;
  onStop?: () => void;
} | null>(null);

export function useReplyBox() {
  const ctx = React.useContext(ReplyBoxContext);
  if (!ctx) {
    throw new Error("ReplyBox subcomponents must be used within ReplyBox.");
  }
  return ctx;
}
