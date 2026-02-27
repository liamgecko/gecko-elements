"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { AvatarSize } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type AvatarGroupItem = {
  src?: string
  alt?: string
  fallback?: string
  name?: string
  tooltip?: string
}

export type AvatarGroupSize =
  | "3xs"
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"

const sizeToAvatarSize: Record<AvatarGroupSize, AvatarSize> = {
  "3xs": "xs",
  "2xs": "xs",
  xs: "sm",
  sm: "md",
  md: "lg",
  lg: "xl",
  xl: "2xl",
  "2xl": "3xl",
}

const sizeMapButton: Record<AvatarGroupSize, string> = {
  "3xs": "size-3 text-[7px]",
  "2xs": "size-4 text-[7px]",
  xs: "size-5 text-[9px]",
  sm: "size-6 text-xs",
  md: "size-7 text-xs",
  lg: "size-8 text-sm",
  xl: "size-9 text-sm",
  "2xl": "size-12 text-base",
}

const sizeMapSpacing: Record<AvatarGroupSize, string> = {
  "3xs": "-ml-0.5",
  "2xs": "-ml-0.5",
  xs: "-ml-1",
  sm: "-ml-2",
  md: "-ml-2",
  lg: "-ml-2",
  xl: "-ml-2",
  "2xl": "-ml-3",
}

export type AvatarGroupProps = {
  /**
   * Array of avatar items to display
   */
  items: AvatarGroupItem[]
  /**
   * Maximum number of avatars to display before showing overflow
   */
  displayItems?: number
  /**
   * Enable overflow menu for items beyond displayItems
   */
  overflow?: boolean
  /**
   * Enable tooltips on hover
   */
  tooltips?: boolean
  /**
   * Additional className for the container
   */
  className?: string
  /**
   * Size of the avatars
   */
  size?: AvatarGroupSize
}

export function AvatarGroup({
  items,
  displayItems = 3,
  overflow = false,
  tooltips = false,
  className,
  size = "md",
}: AvatarGroupProps) {
  const visibleItems = overflow ? items.slice(0, displayItems) : items
  const overflowItems = overflow ? items.slice(displayItems) : []
  const hasOverflow = overflow && overflowItems.length > 0
  const avatarSize = sizeToAvatarSize[size]

  const AvatarWrapper = ({
    item,
    index,
  }: {
    item: AvatarGroupItem
    index: number
  }) => {
    const hasTooltip = Boolean(tooltips && (item.tooltip ?? item.name))
    const avatar = (
      <Avatar
        size={avatarSize}
        className={cn(
          "relative",
          hasTooltip &&
            "before:absolute before:inset-0 before:rounded-full before:bg-primary/20 before:opacity-0 before:transition-opacity hover:before:opacity-100 before:z-0",
          index > 0 && sizeMapSpacing[size]
        )}
      >
        {item.src && (
          <AvatarImage src={item.src} alt={item.alt ?? item.name} />
        )}
        <AvatarFallback>
          {item.fallback ?? item.name?.slice(0, 2).toUpperCase() ?? "?"}
        </AvatarFallback>
      </Avatar>
    )

    if (hasTooltip) {
      return (
        <Tooltip>
          <TooltipTrigger>{avatar}</TooltipTrigger>
          <TooltipContent>
            <p>{item.tooltip ?? item.name}</p>
          </TooltipContent>
        </Tooltip>
      )
    }

    return avatar
  }

  return (
    <div
      className={cn("flex items-center", className)}
      data-slot="avatar-group"
    >
      {visibleItems.map((item, index) => (
        <AvatarWrapper key={index} item={item} index={index} />
      ))}
      {hasOverflow && (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="secondary"
                size="icon"
                className={cn(
                  sizeMapButton[size],
                  "relative rounded-full z-10 ring-2 ring-background",
                  sizeMapSpacing[size]
                )}
                aria-label={`${overflowItems.length} more items`}
              >
                +{overflowItems.length}
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-56">
            {overflowItems.map((item, index) => (
              <DropdownMenuItem key={index} className="gap-2">
                <Avatar size="sm">
                  {item.src && (
                    <AvatarImage src={item.src} alt={item.alt ?? item.name} />
                  )}
                  <AvatarFallback>
                    {item.fallback ??
                      item.name?.slice(0, 2).toUpperCase() ??
                      "?"}
                  </AvatarFallback>
                </Avatar>
                {item.name != null && <span>{item.name}</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
