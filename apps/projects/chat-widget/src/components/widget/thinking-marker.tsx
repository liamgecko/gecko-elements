import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { Marker, MarkerContent } from "@gecko/ui/components/marker"

/** Pause after the user sends before the marker enters. */
export const THINKING_ENTER_DELAY_MS = 400
/** How long the Thinking marker stays visible. */
export const THINKING_DELAY_MS = 5000
/** Match the exit transition duration before starting the post-exit pause. */
export const THINKING_EXIT_MS = 280
/** Pause after the marker has left before the reply appears. */
export const THINKING_POST_EXIT_DELAY_MS = 320

type ThinkingMarkerSlotProps = {
  visible: boolean
}

export function ThinkingMarkerSlot({ visible }: ThinkingMarkerSlotProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flex min-h-7 items-center px-4 pb-2">
      <AnimatePresence initial={false}>
        {visible ? (
          <motion.div
            key="thinking"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 10,
                    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
                  }
            }
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <Marker role="status" className="text-xs">
              <MarkerContent shimmer>Thinking…</MarkerContent>
            </Marker>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
