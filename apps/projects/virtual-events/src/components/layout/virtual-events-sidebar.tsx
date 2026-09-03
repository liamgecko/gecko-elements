import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@gecko/ui/components/tabs"
import { Counter } from "@gecko/ui/components/counter"
import { cn } from "@gecko/ui/lib/utils"
import { MessageSquareText, Users } from "lucide-react"

import { AttendeesPanel } from "@/components/attendees/attendees-panel"
import { LiveChatPanel } from "@/components/live-chat"
import { LIVE_CHAT_PEOPLE } from "@/components/live-chat/live-chat-people"
import { useVirtualEvents } from "@/context/virtual-events-context"

type VirtualEventsSidebarProps = {
  className?: string
}

const sidebarTabTriggerClassName = "border-x-0"

const attendeeCount = LIVE_CHAT_PEOPLE.length

function ChatPanel() {
  return <LiveChatPanel />
}

export function VirtualEventsSidebar({ className }: VirtualEventsSidebarProps) {
  const { sidebarTab, setSidebarTab } = useVirtualEvents()

  return (
    <aside
      aria-label="Live chat and people"
      className={cn(
        "border-border flex w-(--ve-sidebar-width) shrink-0 flex-col border-l",
        className
      )}
    >
      <Tabs
        value={sidebarTab}
        onValueChange={(value) => setSidebarTab(value as "chat" | "attendees")}
        variant="line"
        className="flex min-h-0 flex-1 flex-col gap-0"
      >
        <div className="border-border shrink-0 border-b relative z-10">
          <TabsList fullWidth className="gap-0">
            <TabsTrigger
              value="chat"
              className={cn(sidebarTabTriggerClassName, "text-xs")}
            >
              <MessageSquareText />
              Live chat
            </TabsTrigger>
            <TabsTrigger
              value="attendees"
              aria-label={`People, ${attendeeCount} attendees`}
              className={cn(sidebarTabTriggerClassName, "text-xs")}
            >
              <Users />
              People
              <Counter
                value={attendeeCount}
                size="sm"
                variant="light"
                aria-hidden
              />
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="mt-0 flex min-h-0 flex-1 flex-col">
          <ChatPanel />
        </TabsContent>

        <TabsContent
          value="attendees"
          className="mt-0 min-h-0 flex-1 overflow-hidden"
        >
          <AttendeesPanel />
        </TabsContent>
      </Tabs>
    </aside>
  )
}
