import * as React from "react";

import { cn } from "@gecko/ui/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@gecko/ui/components/breadcrumb";
import { Button } from "@gecko/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@gecko/ui/components/tabs";
import { Toggle } from "@gecko/ui/components/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip";
import { Home, Star } from "lucide-react";

type HeaderBreadcrumbItem =
  | {
      label: React.ReactNode;
      current?: false;
      href: string;
      render?: never;
      renderLabelOnly?: false;
    }
  | {
      label: React.ReactNode;
      current?: false;
      href?: never;
      /** Router Link or another semantic anchor adapter. */
      render: React.ReactElement;
      renderLabelOnly?: false;
    }
  | {
      label: React.ReactNode;
      current?: false;
      href?: never;
      render?: never;
      /** Label is already an interactive element (e.g. router Link). */
      renderLabelOnly: true;
    }
  | {
      label: React.ReactNode;
      current: true;
    };

type HeaderBreadcrumbsProps = {
  items: readonly HeaderBreadcrumbItem[];
  navProps?: Omit<React.ComponentProps<typeof Breadcrumb>, "children">;
  listProps?: Omit<React.ComponentProps<typeof BreadcrumbList>, "children">;
  separatorProps?: Omit<
    React.ComponentProps<typeof BreadcrumbSeparator>,
    "children"
  >;
};

type HeaderActionProps = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "size"
> & {
  label: React.ReactNode;
  icon?: React.ReactNode;
};

type HeaderMenuItem = {
  label: React.ReactNode;
  onSelect?: () => void;
  variant?: "default" | "destructive";
  /** Renders a separator above this item (e.g. before delete). */
  separatorBefore?: boolean;
};

type HeaderSecondaryButtonActionBase = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "size"
> & {
  /** @default "button" */
  kind?: "button";
};

type HeaderSecondaryButtonAction = HeaderSecondaryButtonActionBase &
  (
    | {
        label: React.ReactNode;
        icon?: React.ReactNode;
        ariaLabel?: string;
      }
    | {
        label?: never;
        icon: React.ReactNode;
        ariaLabel: string;
      }
  );

type HeaderSecondaryMenuAction = {
  kind: "menu";
  label?: React.ReactNode;
  icon?: React.ReactNode;
  ariaLabel?: string;
  items: readonly HeaderMenuItem[];
  align?: React.ComponentProps<typeof DropdownMenuContent>["align"];
  triggerProps?: Omit<React.ComponentProps<typeof Button>, "children" | "size">;
};

type HeaderSecondaryAction =
  | HeaderSecondaryButtonAction
  | HeaderSecondaryMenuAction;

type HeaderFavouriteActionProps = Omit<
  React.ComponentProps<typeof Toggle>,
  "children" | "size"
> & {
  ariaLabel?: string;
  icon?: React.ReactNode;
  tooltipAddLabel?: string;
  tooltipRemoveLabel?: string;
};

type HeaderTabsItem = Omit<
  React.ComponentProps<typeof TabsTrigger>,
  "value" | "children"
> & {
  value: string;
  label: React.ReactNode;
};

type HeaderTabsProps = {
  items: readonly HeaderTabsItem[];
  tabsProps?: Omit<React.ComponentProps<typeof Tabs>, "children">;
  listProps?: Omit<React.ComponentProps<typeof TabsList>, "children">;
};

type HeaderProps = React.ComponentProps<"div"> & {
  breadcrumbs?: HeaderBreadcrumbsProps;
  title?: React.ReactNode;
  subheading?: React.ReactNode;
  favouriteAction?: HeaderFavouriteActionProps;
  secondaryActions?: readonly HeaderSecondaryAction[];
  primaryAction?: HeaderActionProps;
  tabs?: HeaderTabsProps;
};

function normalizeFavouriteIcon(icon: React.ReactNode, pressed: boolean) {
  const fallback = (
    <Star
      aria-hidden
      className="size-4 shrink-0"
      fill={pressed ? "currentColor" : "none"}
    />
  );

  if (!React.isValidElement(icon)) return icon ?? fallback;

  const el = icon as React.ReactElement<{
    className?: string;
    "aria-hidden"?: boolean;
    fill?: string;
  }>;
  const existingClassName =
    typeof el.props.className === "string" ? el.props.className : undefined;
  const hasSizeClass = Boolean(existingClassName?.includes("size-"));
  const ariaHidden =
    typeof el.props["aria-hidden"] === "boolean"
      ? el.props["aria-hidden"]
      : true;

  return React.cloneElement(el, {
    "aria-hidden": ariaHidden,
    fill: pressed ? "currentColor" : "none",
    className: cn(existingClassName, !hasSizeClass && "size-4", "shrink-0"),
  });
}

function renderBreadcrumbs(breadcrumbs: HeaderBreadcrumbsProps) {
  const { items, navProps, listProps, separatorProps } = breadcrumbs;

  if (!items || items.length === 0) return null;

  return (
    <Breadcrumb {...navProps}>
      <BreadcrumbList {...listProps}>
        {items.map((item, idx) => {
          const isHome = idx === 0 && !("current" in item && item.current);
          const isLast = idx === items.length - 1;
          const homeLabel =
            typeof item.label === "string" ? item.label : "Home";
          const homeIcon = isHome ? (
            <Home aria-hidden className="size-3.5" />
          ) : null;

          return (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                {"current" in item && item.current ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : item.renderLabelOnly ? (
                  isHome && React.isValidElement(item.label) ? (
                    React.cloneElement(
                      item.label as React.ReactElement<{
                        "aria-label"?: string;
                        children?: React.ReactNode;
                      }>,
                      { "aria-label": homeLabel },
                      homeIcon,
                    )
                  ) : (
                    item.label
                  )
                ) : (
                  <BreadcrumbLink
                    aria-label={isHome ? homeLabel : undefined}
                    href={item.render ? undefined : item.href}
                    render={item.render}
                  >
                    {homeIcon ?? item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast ? <BreadcrumbSeparator {...separatorProps} /> : null}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function isMenuAction(
  action: HeaderSecondaryAction,
): action is HeaderSecondaryMenuAction {
  return action.kind === "menu";
}

function renderSecondaryAction(action: HeaderSecondaryAction, key: React.Key) {
  if (isMenuAction(action)) {
    const { icon, label, ariaLabel, items, align, triggerProps } = action;
    const iconOnly = Boolean(icon) && !label;

    return (
      <DropdownMenu key={key}>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="outline"
              size={iconOnly ? "icon" : "default"}
              dropdown={!iconOnly}
              aria-label={
                ariaLabel ??
                (typeof label === "string" ? label : undefined) ??
                "Open menu"
              }
              {...triggerProps}
            >
              {icon}
              {label}
            </Button>
          }
        />
        <DropdownMenuContent align={align ?? "end"}>
          {items.map((item, itemIndex) => (
            <React.Fragment key={itemIndex}>
              {item.separatorBefore && itemIndex > 0 ? (
                <DropdownMenuSeparator />
              ) : null}
              <DropdownMenuItem
                variant={item.variant}
                onClick={() => item.onSelect?.()}
              >
                {item.label}
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  const { label, icon, ariaLabel, variant, kind, ...buttonProps } = action;
  void kind;
  const iconOnly = Boolean(icon) && !label;

  return (
    <Button
      key={key}
      type="button"
      variant={variant ?? "outline"}
      size={iconOnly ? "icon" : "default"}
      aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
      {...buttonProps}
    >
      {icon}
      {label}
    </Button>
  );
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
  } = favouriteAction ?? {};

  const isControlled = typeof pressed === "boolean";
  const [uncontrolledPressed, setUncontrolledPressed] = React.useState(
    defaultPressed ?? false,
  );
  const resolvedPressed = isControlled ? pressed : uncontrolledPressed;

  const tooltipLabel = resolvedPressed
    ? (tooltipRemoveLabel ?? "Remove from favourites")
    : (tooltipAddLabel ?? "Add to favourites");

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
                if (!isControlled) setUncontrolledPressed(next);
                onPressedChange?.(next, event);
              }}
              aria-label={ariaLabel ?? tooltipLabel}
              className={cn(
                "aria-pressed:bg-background aria-pressed:hover:bg-muted",
                className,
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

      {secondaryActions?.map((action, idx) =>
        renderSecondaryAction(
          action,
          action.kind === "menu" ? `menu-${idx}` : `button-${idx}`,
        ),
      )}

      {primaryAction
        ? (() => {
            const { icon, label, ...buttonProps } = primaryAction;
            return (
              <Button type="button" size="default" {...buttonProps}>
                {icon}
                {label}
              </Button>
            );
          })()
        : null}
    </div>
  );
}

function renderTabs(tabs: HeaderTabsProps) {
  const { items, tabsProps, listProps } = tabs;
  if (!items || items.length === 0) return null;

  return (
    <Tabs {...tabsProps} variant="line" className={cn(tabsProps?.className)}>
      <TabsList
        {...listProps}
        className={cn(
          "group-data-horizontal/tabs:border-b-0",
          listProps?.className,
        )}
      >
        {items.map(({ value, label, ...triggerProps }) => (
          <TabsTrigger key={value} value={value} {...triggerProps}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
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
  const hasHeading = Boolean(title || subheading);
  const actionSlot = (
    <Actions
      favouriteAction={favouriteAction}
      secondaryActions={secondaryActions}
      primaryAction={primaryAction}
    />
  );
  const resolvedBreadcrumbs = breadcrumbs
    ? renderBreadcrumbs(breadcrumbs)
    : null;
  const resolvedTabs = tabs ? renderTabs(tabs) : null;

  return (
    <div
      data-slot="header"
      className={cn(
        "sticky top-0 z-10 space-y-5 border-b border-border bg-background px-6",
        resolvedTabs ? "pt-4 pb-0" : "py-4",
        className,
      )}
      {...props}
    >
      {(resolvedBreadcrumbs || (!hasHeading && actionSlot)) && (
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">{resolvedBreadcrumbs}</div>
          {!hasHeading && actionSlot ? actionSlot : null}
        </div>
      )}

      {(hasHeading || (hasHeading && actionSlot)) && (
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

          {hasHeading && actionSlot ? actionSlot : null}
        </div>
      )}

      {resolvedTabs ? <div>{resolvedTabs}</div> : null}
    </div>
  );
}

export { Header };
export type {
  HeaderActionProps,
  HeaderBreadcrumbItem,
  HeaderBreadcrumbsProps,
  HeaderFavouriteActionProps,
  HeaderMenuItem,
  HeaderProps,
  HeaderSecondaryAction,
  HeaderSecondaryButtonAction,
  HeaderSecondaryMenuAction,
  HeaderTabsItem,
  HeaderTabsProps,
};
