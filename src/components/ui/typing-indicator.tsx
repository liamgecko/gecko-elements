"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export type TypingIndicatorEase =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate"

export interface TypingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of dots (dots variant only). @default 3 */
  dots?: number
  /** Dot size in pixels. @default 8 */
  size?: number
  /** Dot color. @default "currentColor" */
  color?: string
  /** Animation cycle duration in seconds. @default 1.4 */
  duration?: number
  /** Variant: dots or text. @default "dots" */
  variant?: "dots" | "text"
  /** Name for text variant ("{name} is typing..."). */
  name?: string
  /** Avatar: image URL string or custom ReactNode. */
  avatar?: React.ReactNode
  /** Whether to animate enter. @default false */
  animate?: boolean
  /** Enter animation duration in seconds. @default 0.2 */
  animationDuration?: number
  /** Enter animation easing. @default "easeInOut" */
  animationEase?: TypingIndicatorEase
}

const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  (
    {
      dots = 3,
      size = 8,
      color = "currentColor",
      duration = 1.4,
      variant = "dots",
      name,
      avatar,
      animate = false,
      animationDuration = 0.2,
      animationEase = "easeInOut",
      className,
      ...props
    },
    ref
  ) => {
    const avatarNode = React.useMemo(() => {
      if (!avatar) return null
      if (typeof avatar === "string") {
        return (
          <Avatar size={variant === "dots" ? "sm" : "xs"}>
            <AvatarImage src={avatar} alt={name ?? "Avatar"} />
            <AvatarFallback>{name?.[0] ?? "?"}</AvatarFallback>
          </Avatar>
        )
      }
      return avatar
    }, [avatar, name, variant])

    const renderContent = () => {
      if (variant === "text") {
        return (
          <span
            className={cn(
              "inline-flex items-center gap-2 text-xs text-muted-foreground",
              className
            )}
            ref={ref}
            {...props}
          >
            {avatarNode}
            {name ? `${name} is typing...` : "Someone is typing..."}
          </span>
        )
      }

      return (
        <div
          className={cn("inline-flex items-center gap-2", className)}
          ref={ref}
          {...props}
        >
          {avatarNode}
          <div className="inline-flex items-center gap-1 p-2.5 bg-muted rounded-lg rounded-bl-none relative">
            {Array.from({ length: dots }).map((_, index) => (
              <span
                key={index}
                className="animate-typing-dot rounded-full"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: color,
                  animationDuration: `${duration}s`,
                  animationDelay: `${index * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )
    }

    if (!animate) {
      return renderContent()
    }

    return (
      <div
        className="animate-in fade-in-0 slide-in-from-bottom-2 duration-200"
        style={
          animationDuration !== 0.2
            ? ({ animationDuration: `${animationDuration}s` } as React.CSSProperties)
            : undefined
        }
      >
        {renderContent()}
      </div>
    )
  }
)

TypingIndicator.displayName = "TypingIndicator"

export { TypingIndicator }
