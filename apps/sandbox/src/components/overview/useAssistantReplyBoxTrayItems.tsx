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
import { type ReplyBoxTrayItem } from "@gecko/ui/components/reply-box"

export type AssistantAiModel = "auto" | "instant" | "thinking"

const AI_MODEL_LABELS: Record<AssistantAiModel, string> = {
  auto: "Auto",
  instant: "Instant",
  thinking: "Thinking",
}

type AssistantAiModelDropdownProps = {
  value: AssistantAiModel
  onChange: (value: AssistantAiModel) => void
}

function AssistantAiModelDropdown({ value, onChange }: AssistantAiModelDropdownProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost-light"
            size="xs"
            dropdown
            aria-label="Switch AI model"
          >
            {AI_MODEL_LABELS[value]}
          </Button>
        }
      />
      <DropdownMenuContent side="top" align="start" className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={value}
            onValueChange={(next) => {
              onChange(next as AssistantAiModel)
              setOpen(false)
            }}
          >
            <DropdownMenuRadioItem value="auto">Auto</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="instant">Instant</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="thinking">Thinking</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function useAssistantReplyBoxTrayItems() {
  const [aiModel, setAiModel] = React.useState<AssistantAiModel>("auto")

  const trayItems = React.useMemo((): ReplyBoxTrayItem[] => {
    return [
      {
        id: "ai-model",
        label: "Switch AI model",
        icon: Astroid,
        render: <AssistantAiModelDropdown value={aiModel} onChange={setAiModel} />,
      },
      { id: "voice", label: "Record voice message", icon: Mic },
      "attachment",
      "image",
    ]
  }, [aiModel])

  return { trayItems, aiModel, setAiModel }
}
