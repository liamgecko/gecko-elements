"use client"

import * as React from "react"
import { BotMessageSquare } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import { SidebarInset, SidebarProvider } from "@gecko/ui/components/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"
import { cn } from "@gecko/ui/lib/utils"

import { AssistantConversationsSidebar } from "./AssistantConversationsSidebar"
import { AssistantPanelTrigger } from "./AssistantPanelTrigger"
import type { AssistantConversation } from "./assistant-conversations"

const ASSISTANT_SIDEBAR_WIDTH = "16rem"

export type AssistantOverviewShellProps = {
  children: React.ReactNode
  className?: string
  conversations: AssistantConversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewChat: () => void
  onDeleteConversation?: (id: string) => void
  onRenameConversation?: (id: string) => void
  onPinConversation?: (id: string) => void
  onArchiveConversation?: (id: string) => void
  onShareConversation?: (id: string) => void
}

/**
 * Secondary sidebar for /home — nested shadcn SidebarProvider scoped to the
 * overview page so the app nav sidebar is unaffected.
 *
 * @see https://ui.shadcn.com/docs/components/radix/sidebar
 */
export function AssistantOverviewShell({
  children,
  className,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
  onPinConversation,
  onArchiveConversation,
  onShareConversation,
}: AssistantOverviewShellProps) {
  return (
    <SidebarProvider
      defaultOpen
      persistState={false}
      enableKeyboardShortcut={false}
      className={cn("flex h-full min-h-0 w-full", className)}
      style={
        {
          "--sidebar-width": ASSISTANT_SIDEBAR_WIDTH,
          "--sidebar-width-mobile": ASSISTANT_SIDEBAR_WIDTH,
        } as React.CSSProperties
      }
    >
      <div className="relative flex h-full min-h-0 w-full overflow-hidden">
        <SidebarInset className="min-h-0 min-w-0 flex-1 bg-background">
          <header className="flex h-[49px] shrink-0 items-center justify-end gap-2 border-b border-border px-3 md:px-4">
            <TooltipProvider delay={0}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="shrink-0"
                      aria-label="New chat"
                      onClick={onNewChat}
                    >
                      <BotMessageSquare aria-hidden />
                    </Button>
                  }
                />
                <TooltipContent side="bottom" align="center">
                  New chat
                </TooltipContent>
              </Tooltip>
              <AssistantPanelTrigger />
            </TooltipProvider>
          </header>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
        </SidebarInset>

        <AssistantConversationsSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={onSelectConversation}
          onDeleteConversation={onDeleteConversation}
          onRenameConversation={onRenameConversation}
          onPinConversation={onPinConversation}
          onArchiveConversation={onArchiveConversation}
          onShareConversation={onShareConversation}
        />
      </div>
    </SidebarProvider>
  )
}
