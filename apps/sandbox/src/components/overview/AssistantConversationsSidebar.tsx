import * as React from "react"
import { ClockFading, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"
import { ScrollArea } from "@gecko/ui/components/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@gecko/ui/components/sidebar"

import type { AssistantConversation } from "./assistant-conversations"
import { TypingConversationTitle } from "./TypingConversationTitle"

export type AssistantConversationsSidebarProps = {
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

type ConversationRowProps = {
  conversation: AssistantConversation
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onDeleteConversation?: (id: string) => void
  onRenameConversation?: (id: string) => void
  onPinConversation?: (id: string) => void
  onShareConversation?: (id: string) => void
  onConversationTitleGenerated?: (id: string) => void
}

function ConversationRow({
  conversation,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  onPinConversation,
  onShareConversation,
  onConversationTitleGenerated,
}: ConversationRowProps) {
  const active = conversation.id === activeConversationId
  const handleTitleComplete = React.useCallback(() => {
    onConversationTitleGenerated?.(conversation.id)
  }, [conversation.id, onConversationTitleGenerated])

  return (
    <SidebarMenuItem className="flex items-center">
      <SidebarMenuButton
        isActive={active}
        onClick={() => onSelectConversation(conversation.id)}
        className="flex-1 group-hover/menu-item:bg-sidebar-accent group-hover/menu-item:text-sidebar-accent-foreground"
      >
        {conversation.isGeneratingTitle ? (
          <TypingConversationTitle
            text={conversation.title}
            active
            onComplete={handleTitleComplete}
          />
        ) : (
          <span className="truncate">{conversation.title}</span>
        )}
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SidebarMenuAction
              showOnHover
              aria-label={`Actions for ${conversation.title || "conversation"}`}
            />
          }
        >
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onShareConversation?.(conversation.id)}>
            Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRenameConversation?.(conversation.id)}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onPinConversation?.(conversation.id)}>
            {conversation.pinned ? "Unpin chat" : "Pin chat"}
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDeleteConversation?.(conversation.id)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

type ConversationGroupProps = {
  label: string
  conversations: AssistantConversation[]
} & Omit<ConversationRowProps, "conversation">

function ConversationGroup({
  label,
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  onPinConversation,
  onShareConversation,
  onConversationTitleGenerated,
}: ConversationGroupProps) {
  if (conversations.length === 0) return null

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {conversations.map((conversation) => (
            <ConversationRow
              key={conversation.id}
              conversation={conversation}
              activeConversationId={activeConversationId}
              onSelectConversation={onSelectConversation}
              onDeleteConversation={onDeleteConversation}
              onRenameConversation={onRenameConversation}
              onPinConversation={onPinConversation}
              onShareConversation={onShareConversation}
              onConversationTitleGenerated={onConversationTitleGenerated}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AssistantConversationsSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  onPinConversation,
  onArchiveConversation,
  onShareConversation,
  onConversationTitleGenerated,
}: AssistantConversationsSidebarProps) {
  const pinnedConversations = React.useMemo(
    () => conversations.filter((c) => c.pinned),
    [conversations]
  )

  const recentConversations = React.useMemo(
    () => conversations.filter((c) => !c.pinned),
    [conversations]
  )

  const rowProps = {
    activeConversationId,
    onSelectConversation,
    onDeleteConversation,
    onRenameConversation,
    onPinConversation,
    onShareConversation,
    onConversationTitleGenerated,
  }

  return (
    <Sidebar
      side="right"
      collapsible="offcanvas"
      className="absolute inset-y-0 end-0 z-20 h-full max-h-full border-l border-border bg-background text-foreground [&_[data-slot=sidebar-container]]:absolute! [&_[data-slot=sidebar-container]]:inset-y-0 [&_[data-slot=sidebar-container]]:end-0 [&_[data-slot=sidebar-container]]:h-full! [&_[data-slot=sidebar-container]]:max-h-full [&_[data-slot=sidebar-container]]:border-l [&_[data-slot=sidebar-container]]:border-border [&_[data-slot=sidebar-container]]:bg-background [&_[data-slot=sidebar-inner]]:bg-background [&_[data-slot=sidebar-inner]]:text-foreground"
    >
      <SidebarHeader className="h-[49px] shrink-0 flex-row items-center gap-2 border-b border-border px-3 py-0 md:px-4">
        <ClockFading className="size-4 shrink-0" aria-hidden />
        <span className="text-sm font-medium">Chat history</span>
      </SidebarHeader>
      <SidebarContent className="min-h-0 flex-1 bg-background">
        <ScrollArea className="h-full">
          <ConversationGroup
            label="Pinned"
            conversations={pinnedConversations}
            {...rowProps}
          />
          <ConversationGroup
            label="Recents"
            conversations={recentConversations}
            {...rowProps}
          />
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  )
}
