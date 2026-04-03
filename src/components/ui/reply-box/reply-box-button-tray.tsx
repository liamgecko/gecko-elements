"use client"

import * as React from "react"
import { Ellipsis, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import { getReplyBoxAction, replyBoxActionIconProps } from "./reply-box-actions"
import type { ReplyBoxActionId } from "./reply-box-actions"
import { useReplyBox } from "./reply-box-context"

function useResizeObserverWidth<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null)
  const [width, setWidth] = React.useState(0)

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const ro = new ResizeObserver(() => {
      setWidth(el.clientWidth)
    })
    ro.observe(el)
    setWidth(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  return { ref, width } as const
}

export type ReplyBoxButtonTrayProps = {
  items: ReplyBoxActionId[]
  className?: string
}

export function ReplyBoxButtonTray({ items, className }: ReplyBoxButtonTrayProps) {
  const { noteMode, toggleNoteMode } = useReplyBox()

  const itemsKey = React.useMemo(() => items.join("|"), [items])
  const pinned = React.useMemo(() => items.slice(0, 2), [items])
  const candidates = React.useMemo(() => items.slice(2), [items])

  const { ref: containerRef, width: containerWidth } =
    useResizeObserverWidth<HTMLDivElement>()

  const overflowBtnRef = React.useRef<HTMLButtonElement | null>(null)
  const overflowMeasureRef = React.useRef<HTMLButtonElement | null>(null)

  const pinnedButtonRefs = React.useMemo(
    () => pinned.map(() => React.createRef<HTMLButtonElement>()),
    [pinned]
  )
  const candidateMeasureRefs = React.useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLButtonElement | null>> = {}
    for (const id of candidates) {
      refs[id] = React.createRef<HTMLButtonElement>()
    }
    return refs
  }, [candidates])

  const [visibleCandidateCount, setVisibleCandidateCount] = React.useState(
    candidates.length
  )
  const [showOverflow, setShowOverflow] = React.useState(false)

  const compute = React.useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const overflowWidth =
      overflowBtnRef.current?.offsetWidth ??
      overflowMeasureRef.current?.offsetWidth ??
      0

    const style = getComputedStyle(container)
    const gap = Number.parseFloat(style.columnGap || "0") || 0
    const safety = 2

    const pinnedWidths = pinnedButtonRefs.map((r) => r.current?.offsetWidth ?? 0)
    const pinnedTotal =
      pinnedWidths.reduce((a, b) => a + b, 0) + Math.max(0, pinnedWidths.length - 1) * gap

    const candidateWidths: number[] = []
    for (const id of candidates) {
      const w = candidateMeasureRefs[id]?.current?.offsetWidth ?? 0
      if (w === 0) return
      candidateWidths.push(w)
    }

    const fit = (withOverflow: boolean) => {
      const overflowTotal = withOverflow ? overflowWidth : 0
      // if overflow exists, there is a gap between the last inline item and overflow button
      const base = pinnedTotal + (withOverflow ? gap + overflowTotal : 0)

      let used = base
      let count = 0
      for (const w of candidateWidths) {
        const next = used + gap + w
        if (next + safety <= containerWidth) {
          used = next
          count += 1
        } else {
          break
        }
      }

      // Ensure the trailing gap before overflow button is still satisfied.
      if (withOverflow && count > 0) {
        if (used + gap + safety > containerWidth) {
          count -= 1
        }
      }

      return Math.max(0, count)
    }

    const fitNoOverflow = fit(false)
    if (fitNoOverflow >= candidates.length) {
      setShowOverflow(false)
      setVisibleCandidateCount(candidates.length)
      return
    }

    setShowOverflow(true)
    setVisibleCandidateCount(fit(true))

  }, [candidateMeasureRefs, candidates, containerRef, containerWidth, pinnedButtonRefs])

  React.useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => compute())
    return () => cancelAnimationFrame(raf)
  }, [compute, containerWidth, noteMode, itemsKey])

  const inline = candidates.slice(0, visibleCandidateCount)
  const overflow = candidates.slice(visibleCandidateCount)

  const renderActionButton = React.useCallback(
    (
      id: ReplyBoxActionId,
      opts: { ref?: React.Ref<HTMLButtonElement> }
    ) => {
      const action = getReplyBoxAction(id)
      const isNote = id === "note-mode"
      const noteIcon = noteMode ? MessageSquare : action.icon
      const noteLabel = noteMode ? "Return to chat mode" : action.label
      const Icon = isNote ? noteIcon : action.icon
      const onClick = isNote ? toggleNoteMode : undefined

      return (
        <TooltipProvider key={id}>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  ref={opts.ref}
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={onClick}
                >
                  <Icon {...replyBoxActionIconProps} />
                  <span className="sr-only">{noteLabel}</span>
                </Button>
              }
            />
            <TooltipContent side="top">
              <p>{noteLabel}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    [noteMode, toggleNoteMode]
  )

  return (
    <div
      ref={containerRef}
      data-slot="reply-box-tray"
      className={cn("flex flex-nowrap items-center gap-0.5 overflow-hidden", className)}
    >
      {pinned.map((id, index) => renderActionButton(id, { ref: pinnedButtonRefs[index] }))}

      {inline.map((id) => renderActionButton(id, {}))}

      {showOverflow ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                ref={overflowBtnRef}
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="More actions"
              >
                <Ellipsis className="size-4" aria-hidden />
              </Button>
            }
          />
          <DropdownMenuContent side="top" align="end" className="w-56">
            <DropdownMenuGroup>
              {overflow.map((id) => {
                const action = getReplyBoxAction(id)
                const isNote = id === "note-mode"
                const Icon = isNote
                  ? noteMode
                    ? MessageSquare
                    : action.icon
                  : action.icon
                const label = isNote
                  ? noteMode
                    ? "Return to chat mode"
                    : action.label
                  : action.label
                const onClick = isNote ? toggleNoteMode : undefined

                return (
                  <DropdownMenuItem key={id} onClick={onClick}>
                    <Icon className="size-4" aria-hidden />
                    <span>{label}</span>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}

      {/* Hidden measurement row for candidate buttons (same classes) — inert keeps it out of the a11y tree and tab order */}
      <div
        className="absolute -z-10 h-0 w-0 overflow-hidden opacity-0 pointer-events-none"
        aria-hidden
        inert
      >
        <Button ref={overflowMeasureRef} type="button" variant="ghost" size="icon-sm" tabIndex={-1}>
          <Ellipsis className="size-4" aria-hidden />
        </Button>
        {candidates.map((id) => {
          const action = getReplyBoxAction(id)
          const Icon = action.icon
          return (
            <Button
              key={id}
              ref={candidateMeasureRefs[id]}
              type="button"
              variant="ghost"
              size="icon-sm"
              tabIndex={-1}
            >
              <Icon {...replyBoxActionIconProps} />
              <span className="sr-only">{action.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

