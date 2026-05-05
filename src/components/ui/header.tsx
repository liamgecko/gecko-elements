import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Star } from "lucide-react"

type HeaderBreadcrumbItem =
  | {
      label: React.ReactNode
      current?: false
      href?: string
      onSelect?: () => void
    }
  | {
      label: React.ReactNode
      current: true
    }

type HeaderBreadcrumbsProps = {
  items: readonly HeaderBreadcrumbItem[]
  navProps?: Omit<React.ComponentProps<typeof Breadcrumb>, "children">
  listProps?: Omit<React.ComponentProps<typeof BreadcrumbList>, "children">
  separatorProps?: Omit<React.ComponentProps<typeof BreadcrumbSeparator>, "children">
}

type HeaderActionProps = Omit<React.ComponentProps<typeof Button>, "children"> & {
  label: React.ReactNode
  icon?: React.ReactNode
}

type HeaderFavouriteActionProps = Omit<
  React.ComponentProps<typeof Toggle>,
  "children"
> & {
  ariaLabel?: string
  icon?: React.ReactNode
  tooltipAddLabel?: string
  tooltipRemoveLabel?: string
}

type HeaderTabsItem = Omit<React.ComponentProps<typeof TabsTrigger>, "value" | "children"> & {
  value: string
  label: React.ReactNode
}

type HeaderTabsProps = {
  items: readonly HeaderTabsItem[]
  tabsProps?: Omit<React.ComponentProps<typeof Tabs>, "children">
  listProps?: Omit<React.ComponentProps<typeof TabsList>, "children">
}

type HeaderProps = React.ComponentProps<"div"> & {
  breadcrumbs?: HeaderBreadcrumbsProps
  title?: React.ReactNode
  subheading?: React.ReactNode
  favouriteAction?: HeaderFavouriteActionProps
  secondaryActions?: readonly HeaderActionProps[]
  primaryAction?: HeaderActionProps
  tabs?: HeaderTabsProps
}

function normalizeFavouriteIcon(icon: React.ReactNode, pressed: boolean) {
  const fallback = (
    <Star
      aria-hidden
      className="size-4 shrink-0"
      fill={pressed ? "currentColor" : "none"}
    />
  )

  if (!React.isValidElement(icon)) return icon ?? fallback

  const el = icon as React.ReactElement<{
    className?: string
    "aria-hidden"?: boolean
    fill?: string
  }>
  const existingClassName =
    typeof el.props.className === "string" ? el.props.className : undefined
  const hasSizeClass = Boolean(existingClassName?.includes("size-"))
  const ariaHidden =
    typeof el.props["aria-hidden"] === "boolean" ? el.props["aria-hidden"] : true

  return React.cloneElement(el, {
    "aria-hidden": ariaHidden,
    fill: pressed ? "currentColor" : "none",
    className: cn(existingClassName, !hasSizeClass && "size-4", "shrink-0"),
  })
}

function renderBreadcrumbs(breadcrumbs: HeaderBreadcrumbsProps) {
  const { items, navProps, listProps, separatorProps } = breadcrumbs

  if (!items || items.length === 0) return null

  return (
    <Breadcrumb {...navProps}>
      <BreadcrumbList {...listProps}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                {"current" in item && item.current ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : item.onSelect ? (
                  <BreadcrumbLink
                    href={item.href ?? "#"}
                    render={
                      <button
                        type="button"
                        onClick={item.onSelect}
                        className="text-left"
                      />
                    }
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink href={item.href ?? "#"}>
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast ? <BreadcrumbSeparator {...separatorProps} /> : null}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function Actions({
  favouriteAction,
  secondaryActions,
  primaryAction,
}: Pick<
  HeaderProps,
  "favouriteAction" | "secondaryActions" | "primaryAction"
>) {
  const {
    pressed,
    defaultPressed,
    onPressedChange,
    ariaLabel,
    icon,
    tooltipAddLabel,
    tooltipRemoveLabel,
    className,
    ...toggleProps
  } = favouriteAction ?? {}

  const isControlled = typeof pressed === "boolean"
  const [uncontrolledPressed, setUncontrolledPressed] = React.useState(
    defaultPressed ?? false
  )
  const resolvedPressed = isControlled ? pressed : uncontrolledPressed

  const tooltipLabel = resolvedPressed
    ? tooltipRemoveLabel ?? "Remove from favourites"
    : tooltipAddLabel ?? "Add to favourites"

  return (
    <div className="shrink-0 flex items-center gap-1.5">
      <Tooltip>
        <TooltipTrigger
          render={
            <Toggle
              variant="outline"
              size="icon"
              pressed={resolvedPressed}
              onPressedChange={(next, event) => {
                if (!isControlled) setUncontrolledPressed(next)
                onPressedChange?.(next, event)
              }}
              aria-label={ariaLabel ?? tooltipLabel}
              className={cn(
                // Header-specific: keep background identical when pressed.
                "aria-pressed:bg-background",
                className
              )}
              {...toggleProps}
            >
              {normalizeFavouriteIcon(icon, resolvedPressed)}
            </Toggle>
          }
        />
        <TooltipContent side="bottom" align="center">
          <p>{tooltipLabel}</p>
        </TooltipContent>
      </Tooltip>

      {secondaryActions?.map(({ label, icon, variant, ...action }, idx) => (
        <Button
          key={idx}
          type="button"
          variant={variant ?? "outline"}
          {...action}
        >
          {icon}
          {label}
        </Button>
      ))}

      {primaryAction ? (
        <Button type="button" {...primaryAction}>
          {primaryAction.icon}
          {primaryAction.label}
        </Button>
      ) : null}
    </div>
  )
}

function renderTabs(tabs: HeaderTabsProps) {
  const { items, tabsProps, listProps } = tabs
  if (!items || items.length === 0) return null

  return (
    <Tabs {...tabsProps} className="border-b border-border">
      <TabsList variant="line" {...listProps}>
        {items.map(({ value, label, ...triggerProps }) => (
          <TabsTrigger key={value} value={value} {...triggerProps}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

function Header({
  breadcrumbs,
  title,
  subheading,
  favouriteAction,
  secondaryActions,
  primaryAction,
  tabs,
  className,
  ...props
}: HeaderProps) {
  const hasHeading = Boolean(title || subheading)
  const actions = (
    <Actions
      favouriteAction={favouriteAction}
      secondaryActions={secondaryActions}
      primaryAction={primaryAction}
    />
  )
  const resolvedBreadcrumbs = breadcrumbs ? renderBreadcrumbs(breadcrumbs) : null
  const resolvedTabs = tabs ? renderTabs(tabs) : null

  return (
    <div
      data-slot="header"
      className={cn("space-y-6", className)}
      {...props}
    >
      {(resolvedBreadcrumbs || (!hasHeading && actions)) && (
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">{resolvedBreadcrumbs}</div>
          {!hasHeading && actions ? actions : null}
        </div>
      )}

      {(hasHeading || (hasHeading && actions)) && (
        <div className="flex items-center justify-between gap-4">
          {hasHeading ? (
            <div className="min-w-0">
              {title ? (
                <h1 className="text-2xl font-bold text-foreground text-balance">
                  {title}
                </h1>
              ) : null}
              {subheading ? (
                <p className="text-sm text-muted-foreground text-pretty">
                  {subheading}
                </p>
              ) : null}
            </div>
          ) : null}

          {hasHeading && actions ? actions : null}
        </div>
      )}

      {resolvedTabs ? <div>{resolvedTabs}</div> : null}
    </div>
  )
}

export { Header }

