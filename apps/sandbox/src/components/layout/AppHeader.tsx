import geckoLogoUrl from "@/assets/gecko-logo.svg"
import avatarUrl from "@/assets/avatar.jpg"
import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@gecko/ui/components/avatar"
import { Badge } from "@gecko/ui/components/badge"
import { Button } from "@gecko/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuEmpty,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"
import { Separator } from "@gecko/ui/components/separator"
import { Toggle } from "@gecko/ui/components/toggle"
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"
import { Circle, Headset, MessageSquareText } from "lucide-react"

function Slashed({ icon: Icon }: { icon: typeof Headset }) {
  return (
    <Icon>
      <line x1="4" y1="4" x2="20" y2="20" />
    </Icon>
  )
}

export function AppHeader() {
  const [callOnline, setCallOnline] = React.useState(true)
  const [conversationOnline, setConversationOnline] = React.useState(true)
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)
  const [darkMode, setDarkMode] = React.useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  )

  const applyTheme = React.useCallback((nextDarkMode: boolean) => {
    document.documentElement.classList.toggle("dark", nextDarkMode)
  }, [])

  React.useEffect(() => {
    applyTheme(darkMode)
  }, [darkMode, applyTheme])

  return (
    <header className="sticky top-0 z-20 flex w-full items-center border-b bg-gray-900">
      <div className="flex h-(--header-height) w-full items-center justify-between gap-3 px-4">
        <img
          src={geckoLogoUrl}
          alt="Gecko"
          className="h-5 w-auto select-none"
          draggable={false}
        />

        <div className="flex items-center gap-2">
          <DropdownMenu searchable searchPlaceholder="Search accounts...">
            <DropdownMenuTrigger
              render={
                <Button 
                  variant="ghost-dark" 
                  className="gap-2" 
                  dropdown
                >
                  <span className="truncate max-w-48">Account switcher</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="min-w-56">
              <DropdownMenuItem>Gecko</DropdownMenuItem>
              <DropdownMenuItem>Sandbox org</DropdownMenuItem>
              <DropdownMenuEmpty>No accounts found.</DropdownMenuEmpty>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="mx-1 h-8 bg-background/20" />

          <TooltipProvider delay={300}>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Toggle
                    aria-label="Call status"
                    size="icon-sm"
                    variant="ghost-dark"
                    className="aria-pressed:bg-transparent aria-pressed:hover:bg-white/10"
                    pressed={callOnline}
                    onPressedChange={(pressed) => setCallOnline(Boolean(pressed))}
                  >
                    {callOnline ? <Headset /> : <Slashed icon={Headset} />}
                  </Toggle>
                }
              />
              <TooltipContent side="bottom" align="center">
                <span className="me-2">Call status</span>
                <Badge
                  variant={callOnline ? "success" : "destructive"}
                  size="xs"
                  leftIcon={<Circle className="fill-current stroke-none size-2" />}
                >
                  {callOnline ? "Online" : "Offline"}
                </Badge>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Toggle
                    aria-label="Conversation status"
                    size="icon-sm"
                    variant="ghost-dark"
                    className="aria-pressed:bg-transparent aria-pressed:hover:bg-white/10"
                    pressed={conversationOnline}
                    onPressedChange={(pressed) =>
                      setConversationOnline(Boolean(pressed))
                    }
                  >
                    {conversationOnline ? (
                      <MessageSquareText />
                    ) : (
                      <Slashed icon={MessageSquareText} />
                    )}
                  </Toggle>
                }
              />
              <TooltipContent side="bottom" align="center">
                <span className="me-2">Conversation status</span>
                <Badge
                  variant={conversationOnline ? "success" : "destructive"}
                  size="xs"
                  leftIcon={<Circle className="fill-current stroke-none size-2" />}
                >
                  {conversationOnline ? "Online" : "Offline"}
                </Badge>
              </TooltipContent>
            </Tooltip>

          </TooltipProvider>

          <Separator orientation="vertical" className="mx-1 h-8 bg-background/20" />

          <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost-dark"
                  className="gap-2.5"
                  aria-label="User menu"
                  dropdown
                >
                  <Avatar size="sm">
                    <AvatarImage src={avatarUrl} alt="Liam Young" />
                    <AvatarFallback>LY</AvatarFallback>
                  </Avatar>
                  <span className="truncate max-w-40">Liam Young</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="min-w-56">
              <DropdownMenuItem
                onClick={() => {
                  const next = !darkMode
                  // Apply immediately so the menu doesn't "lag" for a frame.
                  applyTheme(next)
                  setDarkMode(next)
                  // Close immediately to avoid jank during theme swap.
                  setUserMenuOpen(false)
                }}
              >
                Switch to {darkMode ? "light" : "dark"} mode
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Release notes</DropdownMenuItem>
              <DropdownMenuItem>Service status</DropdownMenuItem>
              <DropdownMenuItem>Gecko academy</DropdownMenuItem>
              <DropdownMenuItem>Contact support</DropdownMenuItem>
              <DropdownMenuItem>Product feedback</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>User settings</DropdownMenuItem>
              <DropdownMenuItem>Security preferences</DropdownMenuItem>
              <DropdownMenuItem>My accounts</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

