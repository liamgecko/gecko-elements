"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { useDataTableContext } from "./data-table-context"

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    "a[href]",
    "area[href]",
    'input:not([disabled]):not([type="hidden"])',
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "iframe",
    "[tabindex]:not([tabindex='-1']):not([disabled])",
  ].join(",")
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => {
      if (el.getAttribute("aria-hidden") === "true") return false
      const style = window.getComputedStyle(el)
      if (style.display === "none" || style.visibility === "hidden") return false
      return true
    }
  )
}

export type DataTableSelectionActionsBarProps = {
  className?: string
  /** @default true */
  enabled?: boolean
  /**
   * Plural noun in “3 rows selected”. @default "rows"
   */
  rowLabel?: string
}

export function DataTableSelectionActionsBar({
  className,
  enabled = true,
  rowLabel = "rows",
}: DataTableSelectionActionsBarProps) {
  const { table, selectActions, onSelectAction } = useDataTableContext<unknown>()
  const [mounted, setMounted] = React.useState(false)
  const reduceMotion = useReducedMotion()
  const panelRef = React.useRef<HTMLDivElement>(null)
  const previousFocusRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const selectedRows = table.getSelectedRowModel().rows
  const selectedCount = selectedRows.length
  const pageRows = table.getPaginationRowModel().rows
  const visibleCount = pageRows.length

  const fromProvider = selectActions.length > 0

  const handleSelectAllVisible = React.useCallback(() => {
    table.toggleAllPageRowsSelected(true)
  }, [table])

  const handleClear = React.useCallback(() => {
    table.resetRowSelection()
  }, [table])

  const allPageSelected = table.getIsAllPageRowsSelected()

  const shouldShow =
    mounted &&
    enabled &&
    selectedCount > 0 &&
    fromProvider &&
    typeof document !== "undefined"

  const prefersReducedMotion = reduceMotion === true

  const transition = React.useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0 }
        : { type: "tween" as const, duration: 0.3, ease: [0.32, 0.72, 0, 1] },
    [prefersReducedMotion]
  )

  React.useLayoutEffect(() => {
    if (!shouldShow) return
    const root = panelRef.current
    if (!root) return

    previousFocusRef.current = document.activeElement as HTMLElement | null

    const focusables = getFocusableElements(root)
    focusables[0]?.focus({ preventScroll: true })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return
      if (!root.contains(document.activeElement)) return

      const nodes = getFocusableElements(root)
      if (nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement

      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      const prev = previousFocusRef.current
      const active = document.activeElement as HTMLElement | null
      const focusWasInBar = active ? root.contains(active) : false
      if (
        prev &&
        document.body.contains(prev) &&
        focusWasInBar
      ) {
        prev.focus({ preventScroll: true })
      }
      previousFocusRef.current = null
    }
  }, [shouldShow])

  if (!mounted || typeof document === "undefined") {
    return null
  }

  const bar = (
    <AnimatePresence>
      {shouldShow ? (
        <motion.div
          key="data-table-selection-actions-bar"
          data-slot="data-table-selection-actions-bar"
          className={cn(
            "pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4",
            className
          )}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={transition}
        >
          <div
            ref={panelRef}
            role="toolbar"
            aria-label={`Bulk actions, ${selectedCount} ${rowLabel} selected`}
            className="pointer-events-auto flex w-max max-w-full min-w-0 flex-nowrap items-center gap-3 overflow-x-auto rounded-md bg-foreground p-3 text-sm text-background shadow-xl"
          >
            <div className="flex shrink-0 items-center gap-2">
              <Button
                type="button"
                variant="ghost-reverse"
                size="icon-sm"
                onClick={handleClear}
                aria-label="Clear selection"
              >
                <X aria-hidden />
              </Button>

              <p className="min-w-0 max-w-xs truncate sm:max-w-none sm:overflow-visible sm:whitespace-normal sm:text-pretty">
                <span className="font-medium">{selectedCount}</span>
                <span className="text-background"> {rowLabel} selected</span>
              </p>

              {visibleCount > 0 ? (
                <>
                  <Button
                    type="button"
                    variant="ghost-reverse"
                    onClick={handleSelectAllVisible}
                    disabled={allPageSelected}
                  >
                    Select all {visibleCount}
                  </Button>
                </>
              ) : null}
            </div>

            <Separator
              orientation="vertical"
              className="min-h-6 shrink-0 self-stretch bg-background/25"
            />

            <div className="flex shrink-0 flex-nowrap items-center gap-1.5 sm:gap-2">
              {selectActions.map((action, index) => (
                <React.Fragment key={action.id}>
                  {action.separatorBefore && index > 0 ? (
                    <Separator
                      orientation="vertical"
                      className="min-h-5 shrink-0 self-stretch bg-background/25"
                    />
                  ) : null}
                  <Button
                    type="button"
                    variant={
                      action.variant === "destructive" ? "destructive" : "ghost-reverse"
                    }
                    onClick={() =>
                      onSelectAction?.(action.id, { selectedRows })
                    }
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  return createPortal(bar, document.body)
}
