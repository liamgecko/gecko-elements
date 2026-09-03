import { Check, X } from "lucide-react"
import { cn } from "@gecko/ui/lib/utils"

type DocsDoDontProps = {
  doItems: React.ReactNode[]
  dontItems: React.ReactNode[]
}

function ItemList({
  items,
  tone,
}: {
  items: React.ReactNode[]
  tone: "do" | "dont"
}) {
  const Icon = tone === "do" ? Check : X
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2.5 text-sm text-muted-foreground">
          <span
            aria-hidden
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
              tone === "do"
                ? "bg-success-muted text-success"
                : "bg-destructive-muted text-destructive"
            )}
          >
            <Icon className="size-3" strokeWidth={2.5} />
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function DocsDoDont({ doItems, dontItems }: DocsDoDontProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">Do</h3>
        <ItemList items={doItems} tone="do" />
      </div>
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">Don’t</h3>
        <ItemList items={dontItems} tone="dont" />
      </div>
    </div>
  )
}
