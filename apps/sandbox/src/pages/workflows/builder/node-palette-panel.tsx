import * as React from "react"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import { asButtonCheckboxVariants } from "@gecko/ui/components/checkbox"
import { cn } from "@gecko/ui/lib/utils"

import { WORKFLOW_DRAG_MIME } from "./workflow-graph-types"
import {
  WORKFLOW_NODE_CATALOG_LIST,
  type WorkflowNodeCatalogEntry,
} from "./workflow-node-catalog"

const PANEL_EASE = "cubic-bezier(0.32, 0.72, 0, 1)"
const PANEL_OPEN_MS = 420
const PANEL_CLOSE_MS = 320
const PANEL_WIDTH_OPEN = "18rem"
const PANEL_WIDTH_CLOSED = "11.25rem"

type PaletteItemRowProps = {
  item: WorkflowNodeCatalogEntry
  onPaletteDragChange?: (dragging: boolean) => void
  disabled?: boolean
}

function setPaletteDragImage(event: React.DragEvent<HTMLButtonElement>) {
  const button = event.currentTarget
  const rect = button.getBoundingClientRect()
  const clone = button.cloneNode(true) as HTMLElement

  clone.style.position = "fixed"
  clone.style.top = "-10000px"
  clone.style.left = "-10000px"
  clone.style.width = `${rect.width}px`
  clone.style.margin = "0"
  clone.style.boxShadow = "none"
  clone.style.opacity = "1"
  clone.style.pointerEvents = "none"

  document.body.appendChild(clone)

  event.dataTransfer.setDragImage(
    clone,
    event.clientX - rect.left,
    event.clientY - rect.top,
  )

  window.setTimeout(() => {
    clone.remove()
  }, 0)
}

function onPaletteDragStart(
  event: React.DragEvent<HTMLButtonElement>,
  kind: WorkflowNodeCatalogEntry["kind"],
) {
  event.dataTransfer.setData(WORKFLOW_DRAG_MIME, kind)
  event.dataTransfer.effectAllowed = "move"
  setPaletteDragImage(event)
}

function PaletteItemRow({
  item,
  onPaletteDragChange,
  disabled = false,
}: PaletteItemRowProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const Icon = item.icon

  return (
    <button
      type="button"
      draggable={!disabled}
      data-agent-target={`palette-${item.kind}`}
      disabled={disabled}
      onDragStart={(event) => {
        onPaletteDragStart(event, item.kind)
        setIsDragging(true)
        onPaletteDragChange?.(true)
      }}
      onDragEnd={() => {
        setIsDragging(false)
        onPaletteDragChange?.(false)
      }}
      className={cn(
        asButtonCheckboxVariants({ layout: "description" }),
        "w-full cursor-grab overflow-hidden text-left active:cursor-grabbing hover:bg-muted/40 dark:hover:bg-white/5",
        isDragging &&
          "border-border bg-background opacity-50 shadow-none hover:bg-background hover:border-border",
      )}
    >
      <div className="flex w-full items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
          <Icon
            aria-hidden
            className={cn("size-4 text-foreground", item.iconClassName)}
          />
        </span>
        <span className="flex min-w-0 flex-col items-start gap-0.5">
          <span className="font-medium leading-none">{item.title}</span>
          <p className="text-muted-foreground text-xs leading-normal">
            {item.description}
          </p>
        </span>
      </div>
    </button>
  )
}

export function NodePalettePanel({
  onPaletteDragChange,
  disabled = false,
}: {
  onPaletteDragChange?: (dragging: boolean) => void
  disabled?: boolean
}) {
  const [paletteOpen, setPaletteOpen] = React.useState(true)

  return (
    <div className="pointer-events-none absolute inset-4 z-10">
      <div
        className={cn(
          "pointer-events-auto flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-md motion-reduce:transition-none",
          paletteOpen ? "max-h-full" : "max-h-[3.25rem]",
        )}
        style={{
          width: paletteOpen ? PANEL_WIDTH_OPEN : PANEL_WIDTH_CLOSED,
          transition: `max-height ${paletteOpen ? PANEL_OPEN_MS : PANEL_CLOSE_MS}ms ${PANEL_EASE}, width ${paletteOpen ? PANEL_OPEN_MS : PANEL_CLOSE_MS}ms ${PANEL_EASE}`,
        }}
      >
        <div
          className={cn(
            "flex shrink-0 items-center justify-between gap-2 border-b p-3 motion-reduce:transition-none",
            paletteOpen ? "border-border" : "border-transparent",
          )}
          style={{
            transition: `border-color ${paletteOpen ? PANEL_OPEN_MS : PANEL_CLOSE_MS}ms ${PANEL_EASE}`,
          }}
        >
          <p className="truncate text-sm font-semibold whitespace-nowrap">
            Node library
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="aria-expanded:bg-transparent aria-expanded:text-foreground aria-expanded:hover:bg-muted"
            aria-label={
              paletteOpen ? "Collapse nodes library" : "Open nodes library"
            }
            aria-expanded={paletteOpen}
            onClick={() => setPaletteOpen((open) => !open)}
          >
            {paletteOpen ? (
              <PanelLeftClose aria-hidden className="size-4" />
            ) : (
              <PanelLeftOpen aria-hidden className="size-4" />
            )}
          </Button>
        </div>
        <div
          className={cn(
            "grid min-h-0 motion-reduce:transition-none",
            paletteOpen ? "flex-1 grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
          style={{
            transition: `grid-template-rows ${paletteOpen ? PANEL_OPEN_MS : PANEL_CLOSE_MS}ms ${PANEL_EASE}`,
          }}
        >
          <div className="flex min-h-0 flex-col overflow-hidden">
            <div
              className={cn(
                "min-h-0 flex-1 overflow-y-auto p-2 motion-reduce:transition-none",
                paletteOpen
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0",
              )}
              style={{
                transition: `opacity ${paletteOpen ? 280 : 160}ms ${PANEL_EASE}`,
                transitionDelay: paletteOpen ? "80ms" : "0ms",
              }}
            >
              <div className="flex flex-col gap-2">
                {WORKFLOW_NODE_CATALOG_LIST.map((item) => (
                  <PaletteItemRow
                    key={item.kind}
                    item={item}
                    onPaletteDragChange={onPaletteDragChange}
                    disabled={disabled}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
