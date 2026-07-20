import * as React from "react"

import {
  MOCK_MENTION_NOTIFICATIONS,
  type MentionNotification,
} from "@/data/mention-notifications"

type SidebarTab = "chat" | "attendees"

type VirtualEventsContextValue = {
  sidebarTab: SidebarTab
  setSidebarTab: (tab: SidebarTab) => void
  notifications: MentionNotification[]
  unreadCount: number
  scrollToMessageId: string | null
  highlightedMessageId: string | null
  openMentionInChat: (messageId: string, notificationId: string) => void
  addMentionNotification: (authorName: string, messageId: string) => void
  clearAllNotifications: () => void
  clearMessageNavigation: () => void
}

const VirtualEventsContext = React.createContext<VirtualEventsContextValue | null>(
  null,
)

export function VirtualEventsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarTab, setSidebarTab] = React.useState<SidebarTab>("chat")
  const [notifications, setNotifications] = React.useState<MentionNotification[]>(
    () => MOCK_MENTION_NOTIFICATIONS.map((notification) => ({ ...notification })),
  )
  const [scrollToMessageId, setScrollToMessageId] = React.useState<string | null>(
    null,
  )
  const [highlightedMessageId, setHighlightedMessageId] = React.useState<
    string | null
  >(null)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const openMentionInChat = React.useCallback(
    (messageId: string, notificationId: string) => {
      setNotifications((current) =>
        current.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification,
        ),
      )
      setSidebarTab("chat")
      setScrollToMessageId(messageId)
      setHighlightedMessageId(messageId)
    },
    [],
  )

  const addMentionNotification = React.useCallback(
    (authorName: string, messageId: string) => {
      const notification: MentionNotification = {
        id: `mention-${crypto.randomUUID()}`,
        messageId,
        authorName,
        timestamp: "Just now",
        read: false,
      }

      setNotifications((current) => [notification, ...current])
      return notification
    },
    [],
  )

  const clearAllNotifications = React.useCallback(() => {
    setNotifications([])
  }, [])

  const clearMessageNavigation = React.useCallback(() => {
    setScrollToMessageId(null)
  }, [])

  React.useEffect(() => {
    if (!highlightedMessageId) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setHighlightedMessageId(null)
    }, 2000)

    return () => window.clearTimeout(timeoutId)
  }, [highlightedMessageId])

  const value = React.useMemo(
    () => ({
      sidebarTab,
      setSidebarTab,
      notifications,
      unreadCount,
      scrollToMessageId,
      highlightedMessageId,
      openMentionInChat,
      addMentionNotification,
      clearAllNotifications,
      clearMessageNavigation,
    }),
    [
      sidebarTab,
      notifications,
      unreadCount,
      scrollToMessageId,
      highlightedMessageId,
      openMentionInChat,
      addMentionNotification,
      clearAllNotifications,
      clearMessageNavigation,
    ],
  )

  return (
    <VirtualEventsContext.Provider value={value}>
      {children}
    </VirtualEventsContext.Provider>
  )
}

export function useVirtualEvents() {
  const context = React.useContext(VirtualEventsContext)

  if (!context) {
    throw new Error("useVirtualEvents must be used within VirtualEventsProvider")
  }

  return context
}
