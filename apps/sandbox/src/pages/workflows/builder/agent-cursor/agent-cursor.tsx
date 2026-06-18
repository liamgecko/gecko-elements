import * as React from "react"

import { cn } from "@gecko/ui/lib/utils"

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function animateTo(
  from: { x: number; y: number },
  to: { x: number; y: number },
  onFrame: (point: { x: number; y: number }) => void,
  duration = 650,
) {
  return new Promise<void>((resolve) => {
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - (1 - progress) ** 3

      onFrame({
        x: lerp(from.x, to.x, eased),
        y: lerp(from.y, to.y, eased),
      })

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        resolve()
      }
    }

    requestAnimationFrame(tick)
  })
}

function DefaultAgentCursorSvg() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
      aria-hidden
    >
      <path
        d="M6.5 3.5L22.5 14L14 15.5L11.5 23.5L6.5 3.5Z"
        fill="currentColor"
        stroke="hsl(var(--background))"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export type AgentCursorHandle = {
  moveTo: (point: { x: number; y: number }) => Promise<void>
  moveToTarget: (selector: string) => Promise<void>
  moveToNode: (nodeId: string) => Promise<void>
  click: () => Promise<void>
  show: () => void
  hide: () => void
}

type AgentCursorProps = {
  visible: boolean
}

export const AgentCursor = React.forwardRef<AgentCursorHandle, AgentCursorProps>(
  function AgentCursor({ visible }, ref) {
    const cursorRef = React.useRef<HTMLDivElement>(null)
    const positionRef = React.useRef({
      x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
      y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    })
    const rotationRef = React.useRef(0)
    const [clickPulse, setClickPulse] = React.useState(false)
    const [renderPoint, setRenderPoint] = React.useState(positionRef.current)
    const [rotation, setRotation] = React.useState(0)

    const applyPosition = React.useCallback((point: { x: number; y: number }) => {
      const prev = positionRef.current
      const dx = point.x - prev.x
      const dy = point.y - prev.y

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        rotationRef.current = (Math.atan2(dy, dx) * 180) / Math.PI + 45
        setRotation(rotationRef.current)
      }

      positionRef.current = point
      setRenderPoint(point)
    }, [])

    React.useImperativeHandle(
      ref,
      () => ({
        show: () => {},
        hide: () => {},
        moveTo: async (point) => {
          await animateTo(positionRef.current, point, applyPosition)
        },
        moveToTarget: async (selector) => {
          const element = document.querySelector(selector)
          if (!element) return

          const rect = element.getBoundingClientRect()
          await animateTo(positionRef.current, {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          }, applyPosition)
        },
        moveToNode: async (nodeId) => {
          const element = document.querySelector(
            `[data-id="${nodeId}"]`,
          )
          if (!element) return

          const rect = element.getBoundingClientRect()
          await animateTo(positionRef.current, {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          }, applyPosition)
        },
        click: async () => {
          setClickPulse(true)
          await sleep(180)
          setClickPulse(false)
        },
      }),
      [applyPosition],
    )

    if (!visible) return null

    return (
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] motion-reduce:transition-none"
        style={{
          transform: `translate3d(${renderPoint.x}px, ${renderPoint.y}px, 0)`,
        }}
      >
        <div
          className={cn(
            "relative -translate-x-1 -translate-y-1 transition-transform duration-150",
            clickPulse && "scale-90",
          )}
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <div className="absolute inset-0 rounded-full bg-primary/25 blur-md" />
          <DefaultAgentCursorSvg />
        </div>
      </div>
    )
  },
)

export { sleep as agentSleep }
