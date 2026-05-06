import { SidebarIcon } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import { Separator } from "@gecko/ui/components/separator"
import { useSidebar } from "@gecko/ui/components/sidebar"

export function AppHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-20 flex w-full items-center border-b bg-gray-900">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <SidebarIcon aria-hidden />
        </Button>
        <Separator
          orientation="vertical"
          className="mr-2 h-4 data-[orientation=vertical]:h-4"
        />
      </div>
    </header>
  )
}

