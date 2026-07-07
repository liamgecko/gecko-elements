import * as React from "react"

import { SidebarInset, SidebarProvider } from "@gecko/ui/components/sidebar"
import { cn } from "@gecko/ui/lib/utils"

import { AssistantConversationsSidebar } from "./AssistantConversationsSidebar"
import type { AssistantConversation } from "./assistant-conversations"

const ASSISTANT_SIDEBAR_WIDTH = "16rem"

export type AssistantOverviewShellProps = {
  header: React.ReactNode
  children: React.ReactNode
  className?: string
  conversations: AssistantConversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onDeleteConversation?: (id: string) => void
  onRenameConversation?: (id: string) => void
  onPinConversation?: (id: string) => void
  onArchiveConversation?: (id: string) => void
  onShareConversation?: (id: string) => void
  onConversationTitleGenerated?: (id: string) => void
}

/**
 * Secondary sidebar for /home — nested shadcn SidebarProvider scoped to the
 * overview page so the app nav sidebar is unaffected.
 *
 * @see https://ui.shadcn.com/docs/components/radix/sidebar
 */
export function AssistantOverviewShell({
  header,
  children,
  className,
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  onPinConversation,
  onArchiveConversation,
  onShareConversation,
  onConversationTitleGenerated,
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
          {header}
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
          onConversationTitleGenerated={onConversationTitleGenerated}
        />
      </div>
    </SidebarProvider>
  )
}
