"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

export type AvatarSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "default"

const sizeMap = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
  "3xl": "3xl",
  default: "xl",
} as const

export type AvatarStatus = "online" | "unavailable" | "offline"

const statusClass: Record<AvatarStatus, string> = {
  online: "bg-emerald-500",
  unavailable: "bg-orange-500",
  offline: "bg-gray-500",
}

const statusSizeClass =
  "absolute end-0 bottom-0 z-10 rounded-full ring-2 ring-background select-none " +
  "group-data-[size=xs]/avatar:ring-1 group-data-[size=sm]/avatar:ring-1 " +
  "group-data-[size=xs]/avatar:size-1.5 group-data-[size=sm]/avatar:size-1.5 " +
  "group-data-[size=md]/avatar:size-2 group-data-[size=lg]/avatar:size-2 " +
  "group-data-[size=xl]/avatar:size-2.5 group-data-[size=2xl]/avatar:size-3 group-data-[size=3xl]/avatar:size-3"

const notificationSizeClass =
  "absolute top-0 start-0 z-10 rounded-full bg-red-600 ring-2 ring-background " +
  "group-data-[size=xs]/avatar:ring-1 group-data-[size=sm]/avatar:ring-1 " +
  "group-data-[size=xs]/avatar:size-1.5 group-data-[size=sm]/avatar:size-1.5 " +
  "group-data-[size=md]/avatar:size-2 group-data-[size=lg]/avatar:size-2 " +
  "group-data-[size=xl]/avatar:size-2.5 group-data-[size=2xl]/avatar:size-3 group-data-[size=3xl]/avatar:size-3"

function Avatar({
  className,
  size = "default",
  status,
  notification,
  label,
  description,
  children,
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: AvatarSize
  status?: AvatarStatus
  notification?: boolean
  label?: React.ReactNode
  description?: React.ReactNode
}) {
  const dataSize = sizeMap[size]
  const root = (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={dataSize}
      className={cn(
        "rounded-full group/avatar relative flex shrink-0 select-none ring-2 ring-background",
        "data-[size=xs]:size-4 data-[size=sm]:size-5 data-[size=md]:size-6 data-[size=lg]:size-7 data-[size=xl]:size-8 data-[size=2xl]:size-9 data-[size=3xl]:size-12",
        className
      )}
      {...props}
    >
      {children}
      {status != null && (
        <span
          data-slot="avatar-status"
          className={cn(statusSizeClass, statusClass[status])}
          aria-hidden
        />
      )}
      {notification && (
        <span
          data-slot="avatar-notification"
          className={notificationSizeClass}
          aria-hidden
        />
      )}
    </AvatarPrimitive.Root>
  )
  if (label != null || description != null) {
    return (
      <div className="flex items-center gap-1.5">
        {root}
        <div 
        className={cn(
          "flex min-w-0 flex-col",
          dataSize === "xs" && "-space-y-0.5",
          dataSize === "sm" && "-space-y-1",
          dataSize === "md" && "-space-y-0.5",
          dataSize === "lg" && "-space-y-0.5",
          dataSize === "xl" && "-space-y-1",
          dataSize === "2xl" && "-space-y-1",
          dataSize === "3xl" && "-space-y-1"
        )}>
          {label != null && (
            <span
              className={cn(
                "truncate font-medium text-foreground",   
                dataSize === "xs" && "text-3xs/3",
                dataSize === "sm" && "text-2xs/3.5",
                dataSize === "md" && "text-sm/4.25",
                dataSize === "lg" && "text-sm/4.25", 
                dataSize === "xl" && "text-sm/5",
                dataSize === "2xl" && "text-base/5.5",
                dataSize === "3xl" && "text-lg/6"
              )}
            >
              {label}
            </span>
          )}
          {description != null && (
            <span
              className={cn(
                "truncate text-muted-foreground",
                dataSize === "xs" && "text-3xs/2.75",
                dataSize === "sm" && "text-2xs/3.5",
                dataSize === "md" && "text-xs/3.75",
                dataSize === "lg" && "text-sm/4.25",
                dataSize === "xl" && "text-sm/5",
                dataSize === "2xl" && "text-base/5.5",
                dataSize === "3xl" && "text-lg/6"
              )}
            >
              {description}
            </span>
          )}
        </div>
      </div>
    )
  }
  return root
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "rounded-full aspect-square size-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-gray-200 text-foreground rounded-full flex size-full items-center justify-center font-medium uppercase",
        "group-data-[size=xs]/avatar:text-[8px] group-data-[size=sm]/avatar:text-[9px] group-data-[size=md]/avatar:text-2xs group-data-[size=lg]/avatar:text-xs group-data-[size=xl]/avatar:text-sm group-data-[size=2xl]/avatar:text-base group-data-[size=3xl]/avatar:text-lg",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "bg-primary text-primary-foreground ring-background absolute end-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 select-none",
        "group-data-[size=xs]/avatar:size-1 group-data-[size=xs]/avatar:[&>svg]:hidden",
        "group-data-[size=sm]/avatar:size-1.5 group-data-[size=sm]/avatar:[&>svg]:size-1",
        "group-data-[size=md]/avatar:size-2 group-data-[size=md]/avatar:[&>svg]:size-1.5",
        "group-data-[size=lg]/avatar:size-2 group-data-[size=lg]/avatar:[&>svg]:size-1.5",
        "group-data-[size=xl]/avatar:size-2.5 group-data-[size=xl]/avatar:[&>svg]:size-2",
        "group-data-[size=2xl]/avatar:size-3 group-data-[size=2xl]/avatar:[&>svg]:size-2",
        "group-data-[size=3xl]/avatar:size-3.5 group-data-[size=3xl]/avatar:[&>svg]:size-2.5",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
}
