import { Badge } from "@gecko/ui/components/badge"
import { Button } from "@gecko/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"
import { Separator } from "@gecko/ui/components/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"
import { cn } from "@gecko/ui/lib/utils"
import { Bell, Power, Radio } from "lucide-react"
import * as React from "react"

import { useVirtualEvents } from "@/context/virtual-events-context"

const MOCK_EVENT_REMAINING_SECONDS = 45 * 60 + 12

function formatEventTimeRemaining(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`
}

function useEventCountdown(initialSeconds: number) {
  const [secondsRemaining, setSecondsRemaining] = React.useState(initialSeconds)

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsRemaining((current) => Math.max(0, current - 1))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  return formatEventTimeRemaining(secondsRemaining)
}

type VirtualEventsHeaderProps = {
  className?: string
}

export function VirtualEventsHeader({ className }: VirtualEventsHeaderProps) {
  const timeRemaining = useEventCountdown(MOCK_EVENT_REMAINING_SECONDS)
  const [notificationsOpen, setNotificationsOpen] = React.useState(false)
  const {
    notifications,
    unreadCount,
    openMentionInChat,
    clearAllNotifications,
  } = useVirtualEvents()

  const handleNotificationClick = (
    messageId: string,
    notificationId: string,
  ) => {
    openMentionInChat(messageId, notificationId)
    setNotificationsOpen(false)
  }

  return (
    <header
      className={cn(
        "border-border flex h-(--ve-header-height) shrink-0 items-center justify-between border-b px-6",
        className,
      )}
    >
      <div className="bg-muted h-6 w-24 rounded-sm" aria-hidden />

      <div className="flex items-center gap-2">
        <Badge
          size="sm"
          rounded
          bordered
          leftIcon={<Radio className="size-3.5" />}
          className="border-rose-200 bg-rose-50 text-rose-700 tabular-nums dark:border-rose-800 dark:bg-rose-950 dark:text-rose-200"
        >
          {timeRemaining}
        </Badge>

        <Separator orientation="vertical" className="h-6" />

        <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={
                  unreadCount > 0
                    ? `Notifications, ${unreadCount} unread`
                    : "Notifications"
                }
                className="relative"
              >
                <Bell />
                {unreadCount > 0 ? (
                  <span
                    aria-hidden
                    className="absolute top-1 end-1 size-2 rounded-full bg-red-600 ring-2 ring-background dark:bg-rose-600"
                  />
                ) : null}
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuGroup>
              <div className="flex items-center justify-between gap-2 px-2 py-1.5">
                <DropdownMenuLabel className="p-0">Mentions</DropdownMenuLabel>
                {notifications.length > 0 ? (
                  <button
                    type="button"
                    className="text-4xs text-muted-foreground hover:text-foreground"
                    onClick={(event) => {
                      event.preventDefault()
                      clearAllNotifications()
                    }}
                  >
                    Clear all
                  </button>
                ) : null}
              </div>

              {notifications.length === 0 ? (
                <div className="text-muted-foreground px-2 py-3 text-sm">
                  No mention notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    searchValue={`${notification.authorName} mentioned you in a message ${notification.timestamp}`}
                    className="items-start justify-between gap-3 whitespace-normal py-2"
                    onClick={() =>
                      handleNotificationClick(
                        notification.messageId,
                        notification.id,
                      )
                    }
                  >
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span
                        className={cn(
                          "text-sm",
                          !notification.read && "font-medium",
                        )}
                      >
                        {notification.authorName} mentioned you in a message
                      </span>
                      <span className="text-4xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                    </span>
                    {!notification.read ? (
                      <span
                        aria-hidden
                        className="mt-1 size-2 shrink-0 rounded-full bg-red-600 dark:bg-rose-600"
                      />
                    ) : null}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <TooltipProvider delay={300}>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Leave event"
                >
                  <Power />
                </Button>
              }
            />
            <TooltipContent side="bottom">Leave event</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  )
}
