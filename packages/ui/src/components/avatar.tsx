import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@gecko/ui/lib/utils"

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

type ResolvedAvatarSize = (typeof sizeMap)[AvatarSize]

const textColumnClass: Record<ResolvedAvatarSize, string> = {
  xs: "-space-y-0.5",
  sm: "-space-y-1",
  md: "-space-y-0.5",
  lg: "-space-y-0.5",
  xl: "-space-y-1",
  "2xl": "-space-y-1",
  "3xl": "-space-y-1",
}

const labelClass: Record<ResolvedAvatarSize, string> = {
  xs: "text-3xs/3",
  sm: "text-2xs/3.5",
  md: "text-sm/4.25",
  lg: "text-sm/4.25",
  xl: "text-sm/5",
  "2xl": "text-base/5.5",
  "3xl": "text-lg/6",
}

const descriptionClass: Record<ResolvedAvatarSize, string> = {
  xs: "text-3xs/2.75",
  sm: "text-2xs/3.5",
  md: "text-xs/3.75",
  lg: "text-sm/4.25",
  xl: "text-sm/5",
  "2xl": "text-base/5.5",
  "3xl": "text-lg/6",
}

export type AvatarStatus = "online" | "unavailable" | "offline"

const statusClass: Record<AvatarStatus, string> = {
  online: "bg-emerald-500 dark:bg-teal-500",
  unavailable: "bg-orange-500",
  offline: "bg-gray-500 dark:bg-gray-400",
}

const statusSizeClass =
  "absolute end-0 bottom-0 z-10 rounded-full ring-2 ring-background select-none " +
  "group-data-[size=xs]/avatar:ring-1 group-data-[size=sm]/avatar:ring-1 " +
  "group-data-[size=xs]/avatar:size-1.5 group-data-[size=sm]/avatar:size-1.5 " +
  "group-data-[size=md]/avatar:size-2 group-data-[size=lg]/avatar:size-2 " +
  "group-data-[size=xl]/avatar:size-2.5 group-data-[size=2xl]/avatar:size-3 group-data-[size=3xl]/avatar:size-3"

const notificationSizeClass =
  "absolute top-0 start-0 z-10 rounded-full bg-red-600 dark:bg-rose-600 ring-2 ring-background " +
  "group-data-[size=xs]/avatar:ring-1 group-data-[size=sm]/avatar:ring-1 " +
  "group-data-[size=xs]/avatar:size-1.5 group-data-[size=sm]/avatar:size-1.5 " +
  "group-data-[size=md]/avatar:size-2 group-data-[size=lg]/avatar:size-2 " +
  "group-data-[size=xl]/avatar:size-2.5 group-data-[size=2xl]/avatar:size-3 group-data-[size=3xl]/avatar:size-3"

type AvatarContextValue = {
  size: AvatarSize
  resolvedSize: ResolvedAvatarSize
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null)

function useAvatarContext() {
  const context = React.useContext(AvatarContext)

  if (!context) {
    throw new Error("Avatar compound components must be used within Avatar.")
  }

  return context
}

function isAvatarChild(
  child: React.ReactNode,
  component: { displayName?: string },
) {
  return React.isValidElement(child) && child.type === component
}

function Avatar({
  className,
  size = "default",
  status,
  notification,
  children,
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: AvatarSize
  status?: AvatarStatus
  notification?: boolean
}) {
  const resolvedSize = sizeMap[size]
  const childArray = React.Children.toArray(children)
  const avatarChildren: React.ReactNode[] = []
  let label: React.ReactNode = null
  let description: React.ReactNode = null

  for (const child of childArray) {
    if (isAvatarChild(child, AvatarLabel)) {
      label = child
      continue
    }

    if (isAvatarChild(child, AvatarDescription)) {
      description = child
      continue
    }

    avatarChildren.push(child)
  }

  const hasText = label != null || description != null

  const root = (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={resolvedSize}
      className={cn(
        "rounded-full group/avatar relative flex shrink-0 select-none ring-2 ring-background data-[size=xs]:ring-1 data-[size=sm]:ring-1",
        "data-[size=xs]:size-4 data-[size=sm]:size-5 data-[size=md]:size-6 data-[size=lg]:size-7 data-[size=xl]:size-8 data-[size=2xl]:size-9 data-[size=3xl]:size-12",
        className,
      )}
      {...props}
    >
      {avatarChildren}
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

  return (
    <AvatarContext.Provider value={{ size, resolvedSize }}>
      {hasText ? (
        <div className="flex items-center gap-1.5">
          {root}
          <div className={cn("flex min-w-0 flex-col", textColumnClass[resolvedSize])}>
            {label}
            {description}
          </div>
        </div>
      ) : (
        root
      )}
    </AvatarContext.Provider>
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "rounded-full aspect-square size-full object-cover",
        className,
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
        "bg-muted text-foreground rounded-full flex size-full items-center justify-center font-medium uppercase",
        "group-data-[size=xs]/avatar:text-[8px] group-data-[size=sm]/avatar:text-[9px] group-data-[size=md]/avatar:text-2xs group-data-[size=lg]/avatar:text-xs group-data-[size=xl]/avatar:text-sm group-data-[size=2xl]/avatar:text-base group-data-[size=3xl]/avatar:text-lg",
        className,
      )}
      {...props}
    />
  )
}

function AvatarLabel({ className, ...props }: React.ComponentProps<"span">) {
  const { resolvedSize } = useAvatarContext()

  return (
    <span
      data-slot="avatar-label"
      className={cn(
        "truncate font-medium text-foreground",
        labelClass[resolvedSize],
        className,
      )}
      {...props}
    />
  )
}
AvatarLabel.displayName = "AvatarLabel"

function AvatarDescription({ className, ...props }: React.ComponentProps<"span">) {
  const { resolvedSize } = useAvatarContext()

  return (
    <span
      data-slot="avatar-description"
      className={cn(
        "truncate text-muted-foreground",
        descriptionClass[resolvedSize],
        className,
      )}
      {...props}
    />
  )
}
AvatarDescription.displayName = "AvatarDescription"

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
        className,
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarLabel,
  AvatarDescription,
  AvatarBadge,
}
