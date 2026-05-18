"use client"

import * as React from "react"
import { Astroid, Mic } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"
import {
  replyBoxActionIconProps,
  type ReplyBoxTrayItem,
} from "@gecko/ui/components/reply-box"

export type AssistantAiModel = "auto" | "instant" | "thinking"

export function useAssistantReplyBoxTrayItems() {
  const [aiModel, setAiModel] = React.useState<AssistantAiModel>("auto")

  const trayItems = React.useMemo((): ReplyBoxTrayItem[] => {
    return [
      {
        id: "ai-model",
        label: "Switch AI model",
        icon: Astroid,
        render: (
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <DropdownMenuTrigger
                      render={
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="dark:hover:bg-gray-800"
                          aria-label="Switch AI model"
                        >
                          <Astroid {...replyBoxActionIconProps} />
                        </Button>
                      }
                    />
                  }
                />
                <TooltipContent side="top">
                  <p>Switch AI model</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent side="top" align="start" className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuRadioGroup
                  value={aiModel}
                  onValueChange={(value) => setAiModel(value as AssistantAiModel)}
                >
                  <DropdownMenuRadioItem value="auto">Auto</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="instant">Instant</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="thinking">Thinking</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
      { id: "voice", label: "Record voice message", icon: Mic },
      "attachment",
      "image",
    ]
  }, [aiModel])

  return { trayItems, aiModel, setAiModel }
}
