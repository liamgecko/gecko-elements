"use client"

import * as React from "react"
import { Ellipsis, MessageSquare } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@gecko/ui/components/tooltip"
import { cn } from "@gecko/ui/lib/utils"

import {
  getReplyBoxAction,
  getReplyBoxTrayItemKey,
  isReplyBoxTrayBuiltin,
  replyBoxActionIconProps,
} from "./reply-box-actions"
import type {
  ReplyBoxActionId,
  ReplyBoxTrayCustomAction,
  ReplyBoxTrayItem,
} from "./reply-box-actions"
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
  items: ReplyBoxTrayItem[]
  className?: string
}

export function ReplyBoxButtonTray({ items, className }: ReplyBoxButtonTrayProps) {
  const { noteMode, toggleNoteMode } = useReplyBox()

  const itemsKey = React.useMemo(
    () => items.map((item) => getReplyBoxTrayItemKey(item)).join("|"),
    [items]
  )
  const pinned = React.useMemo(() => items.slice(0, 2), [items])
  const candidates = React.useMemo(() => items.slice(2), [items])

  const { ref: containerRef, width: containerWidth } =
    useResizeObserverWidth<HTMLDivElement>()

  const overflowBtnRef = React.useRef<HTMLButtonElement | null>(null)
  const overflowMeasureRef = React.useRef<HTMLButtonElement | null>(null)

  const pinnedMeasureRefs = React.useMemo(
    () => pinned.map(() => React.createRef<HTMLDivElement>()),
    [pinned]
  )
  const candidateMeasureRefs = React.useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLButtonElement | null>> = {}
    for (const item of candidates) {
      refs[getReplyBoxTrayItemKey(item)] = React.createRef<HTMLButtonElement>()
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

    const pinnedWidths = pinnedMeasureRefs.map((r) => r.current?.offsetWidth ?? 0)
    const pinnedTotal =
      pinnedWidths.reduce((a, b) => a + b, 0) + Math.max(0, pinnedWidths.length - 1) * gap

    const candidateWidths: number[] = []
    for (const item of candidates) {
      const key = getReplyBoxTrayItemKey(item)
      const w = candidateMeasureRefs[key]?.current?.offsetWidth ?? 0
      if (w === 0) return
      candidateWidths.push(w)
    }

    const fit = (withOverflow: boolean) => {
      const overflowTotal = withOverflow ? overflowWidth : 0
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
  }, [candidateMeasureRefs, candidates, containerRef, containerWidth, pinnedMeasureRefs])

  React.useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => compute())
    return () => cancelAnimationFrame(raf)
  }, [compute, containerWidth, noteMode, itemsKey])

  const inline = candidates.slice(0, visibleCandidateCount)
  const overflow = candidates.slice(visibleCandidateCount)

  const renderBuiltinAction = React.useCallback(
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  ref={opts.ref}
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={onClick}
                  className="dark:hover:bg-gray-800"
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

  const renderCustomIconButton = React.useCallback(
    (
      action: ReplyBoxTrayCustomAction,
      opts: { ref?: React.Ref<HTMLButtonElement> }
    ) => {
      const Icon = action.icon
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  ref={opts.ref}
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={action.onClick}
                  className="dark:hover:bg-gray-800"
                >
                  <Icon {...replyBoxActionIconProps} />
                  <span className="sr-only">{action.label}</span>
                </Button>
              }
            />
            <TooltipContent side="top">
              <p>{action.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    []
  )

  const renderTrayItem = React.useCallback(
    (
      item: ReplyBoxTrayItem,
      opts: { ref?: React.Ref<HTMLButtonElement> }
    ) => {
      if (isReplyBoxTrayBuiltin(item)) {
        return renderBuiltinAction(item, opts)
      }
      if (item.render) {
        return item.render
      }
      return renderCustomIconButton(item, opts)
    },
    [renderBuiltinAction, renderCustomIconButton]
  )

  const renderOverflowMenuItem = React.useCallback(
    (item: ReplyBoxTrayItem) => {
      const key = getReplyBoxTrayItemKey(item)

      if (isReplyBoxTrayBuiltin(item)) {
        const action = getReplyBoxAction(item)
        const isNote = item === "note-mode"
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
          <DropdownMenuItem key={key} onClick={onClick}>
            <Icon className="size-4" aria-hidden />
            <span>{label}</span>
          </DropdownMenuItem>
        )
      }

      const Icon = item.icon
      return (
        <DropdownMenuItem key={key} onClick={item.onClick}>
          <Icon className="size-4" aria-hidden />
          <span>{item.label}</span>
        </DropdownMenuItem>
      )
    },
    [noteMode, toggleNoteMode]
  )

  const renderMeasureButton = React.useCallback((item: ReplyBoxTrayItem) => {
    if (isReplyBoxTrayBuiltin(item)) {
      const action = getReplyBoxAction(item)
      const Icon = action.icon
      return (
        <>
          <Icon {...replyBoxActionIconProps} />
          <span className="sr-only">{action.label}</span>
        </>
      )
    }

    const Icon = item.icon
    return (
      <>
        <Icon {...replyBoxActionIconProps} />
        <span className="sr-only">{item.label}</span>
      </>
    )
  }, [])

  return (
    <div
      ref={containerRef}
      data-slot="reply-box-tray"
      className={cn("relative flex flex-nowrap items-center gap-0.5 overflow-hidden", className)}
    >
      {pinned.map((item, index) => {
        const key = getReplyBoxTrayItemKey(item)
        return (
          <div
            key={key}
            ref={pinnedMeasureRefs[index]}
            className="inline-flex shrink-0 items-center"
          >
            {renderTrayItem(item, {})}
          </div>
        )
      })}

      {inline.map((item) => {
        const key = getReplyBoxTrayItemKey(item)
        return <React.Fragment key={key}>{renderTrayItem(item, {})}</React.Fragment>
      })}

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
              {overflow.map((item) => renderOverflowMenuItem(item))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}

      <div
        className="absolute -z-10 h-0 w-0 overflow-hidden opacity-0 pointer-events-none"
        aria-hidden
        inert
      >
        <Button ref={overflowMeasureRef} type="button" variant="ghost" size="icon-sm" tabIndex={-1}>
          <Ellipsis className="size-4" aria-hidden />
        </Button>
        {candidates.map((item) => {
          const key = getReplyBoxTrayItemKey(item)
          return (
            <Button
              key={key}
              ref={candidateMeasureRefs[key]}
              type="button"
              variant="ghost"
              size="icon-sm"
              tabIndex={-1}
            >
              {renderMeasureButton(item)}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
