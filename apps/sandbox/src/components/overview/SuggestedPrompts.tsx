"use client"

import { Lightbulb, X } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@gecko/ui/components/card"
import { cn } from "@gecko/ui/lib/utils"

export type SuggestedPrompt = {
  id: string
  heading: string
  prompt: string
}

export const SUGGESTED_PROMPT_FADE_MS = 200

export const ASSISTANT_SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: "open-day",
    heading: "Event registrations",
    prompt:
      "What are the most popular times of day for registrations to our events this week?",
  },
  {
    id: "cancellations",
    heading: "Conversation labels",
    prompt: "What are the most used conversation labels in our conversations?",
  },
  {
    id: "attendance",
    heading: "Open rate success",
    prompt: "What is the average open rate for our marketing campaigns?",
  },
]

export type SuggestedPromptsProps = {
  prompts?: SuggestedPrompt[]
  visible: boolean
  onSelect: (prompt: string) => void
  onDismiss: () => void
  className?: string
}

export function SuggestedPrompts({
  prompts = ASSISTANT_SUGGESTED_PROMPTS,
  visible,
  onSelect,
  onDismiss,
  className,
}: SuggestedPromptsProps) {
  return (
    <section
      aria-label="Suggested prompts"
      className={cn(
        "transition-[opacity,transform,height,margin] duration-200 ease-out motion-reduce:transition-none",
        visible
          ? "mt-8 h-auto translate-y-0 opacity-100"
          : "pointer-events-none mt-0 h-0 -translate-y-1 opacity-0",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-medium text-foreground flex items-center gap-1"><Lightbulb className="size-4" />Suggested prompts</h2>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Dismiss suggested prompts"
          onClick={onDismiss}
        >
          <X />
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {prompts.map((item) => (
          <button
            key={item.id}
            type="button"
            className="rounded-sm text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            onClick={() => onSelect(item.prompt)}
          >
            <Card
              size="sm"
              className="h-full cursor-pointer transition-colors hover:bg-muted/40"
            >
              <CardHeader className="border-b-0 !pb-0">
                  <CardTitle className="!text-sm font-medium">{item.heading}</CardTitle>
              </CardHeader>
              <CardContent className="!pt-2">
                <p className="text-xs text-muted-foreground">{item.prompt}</p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </section>
  )
}
