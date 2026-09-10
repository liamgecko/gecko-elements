"use client";
import { withRef } from "@geckolabs/elements/lib/with-ref";

import * as React from "react";
import Circle from "@hugeicons/core-free-icons/CircleIcon";
import Headset from "@hugeicons/core-free-icons/HeadsetIcon";
import MessageSquareText from "@hugeicons/core-free-icons/MessageSquareTextIcon";
import {
  HugeiconsIcon,
  type IconSvgElement,
} from "@geckolabs/elements/lib/icon";

import { Avatar, AvatarImage } from "@geckolabs/elements/components/avatar";
import { Badge } from "@geckolabs/elements/components/badge";
import { Button } from "@geckolabs/elements/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuEmpty,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@geckolabs/elements/components/dropdown-menu";
import { Separator } from "@geckolabs/elements/components/separator";
import { Toggle } from "@geckolabs/elements/components/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@geckolabs/elements/components/tooltip";
import { cn } from "@geckolabs/elements/lib/utils";

function SlashedIcon({ icon }: { icon: IconSvgElement }) {
  return (
    <span className="relative inline-flex">
      <HugeiconsIcon icon={icon} />
      <span className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[1.15em] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
    </span>
  );
}

const AppHeader = /* @__PURE__ */ withRef(function AppHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="app-header"
      className={cn(
        "[--header-height:calc(--spacing(14))] sticky top-0 z-20 flex w-full items-center border-b border-border bg-chrome",
        className,
      )}
      {...props}
    >
      <div className="flex h-(--header-height) w-full items-center justify-between gap-3 px-4">
        {children}
      </div>
    </header>
  );
});

type AppHeaderLogoProps = Omit<React.ComponentProps<"img">, "children"> & {
  /** Custom logo content. When set, `src` is ignored. */
  children?: React.ReactNode;
};

const AppHeaderLogo = /* @__PURE__ */ withRef(function AppHeaderLogo({
  className,
  alt = "Gecko",
  draggable = false,
  children,
  ...props
}: AppHeaderLogoProps) {
  if (children) {
    return (
      <div data-slot="app-header-logo" className={cn("shrink-0", className)}>
        {children}
      </div>
    );
  }

  return (
    <img
      data-slot="app-header-logo"
      alt={alt}
      draggable={draggable}
      className={cn("h-5 w-auto shrink-0 select-none", className)}
      {...props}
    />
  );
});

const AppHeaderActions = /* @__PURE__ */ withRef(function AppHeaderActions({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <div
      data-slot="app-header-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {items.map((child, index) => (
        <React.Fragment
          key={
            React.isValidElement(child) && child.key != null ? child.key : index
          }
        >
          {index > 0 ? (
            <Separator
              orientation="vertical"
              className="mx-1 h-8 bg-separator-inverse"
            />
          ) : null}
          {child}
        </React.Fragment>
      ))}
    </div>
  );
});

type AppHeaderAccountItem = {
  kind?: "account" | "action";
  id?: string;
  label: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
};

type AppHeaderAccountSwitcherProps = {
  label: React.ReactNode;
  accounts: readonly AppHeaderAccountItem[];
  returnAction?: AppHeaderAccountItem;
  selectedAccountId?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyLabel?: React.ReactNode;
  align?: React.ComponentProps<typeof DropdownMenuContent>["align"];
  className?: string;
};

function AppHeaderAccountSwitcher({
  label,
  accounts,
  returnAction,
  selectedAccountId,
  searchable = true,
  searchPlaceholder = "Search accounts...",
  emptyLabel = "No accounts found.",
  align = "end",
  className,
}: AppHeaderAccountSwitcherProps) {
  const [sizer, setSizer] = React.useState<HTMLDivElement | null>(null);
  const [menuWidth, setMenuWidth] = React.useState<number>();

  React.useLayoutEffect(() => {
    if (!sizer) return;
    const measure = () => {
      // Include the results padding and reserve room for a native scrollbar.
      setMenuWidth(sizer.offsetWidth + 48);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(sizer);
    return () => observer.disconnect();
  }, [sizer]);

  return (
    <DropdownMenu searchable={searchable} searchPlaceholder={searchPlaceholder}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost-dark"
            className={cn("gap-2", className)}
            dropdown
          >
            <span className="max-w-48 truncate">{label}</span>
          </Button>
        }
      />
      <DropdownMenuContent
        align={align}
        style={{ width: menuWidth }}
        className="min-w-56 max-w-[calc(100vw-2rem)] max-h-[min(24rem,var(--available-height))] [scrollbar-gutter:stable] [&>[data-slot=dropdown-menu-search]]:sticky [&>[data-slot=dropdown-menu-search]]:top-0 [&>[data-slot=dropdown-menu-search]]:z-10 [&>[data-slot=dropdown-menu-search]]:bg-popover"
      >
        {/* Measure every label, independently of the filtered menu items. */}
        <div
          ref={setSizer}
          aria-hidden="true"
          className="pointer-events-none invisible absolute h-0 w-max overflow-hidden text-sm"
        >
          {[
            ...accounts.map((account) => account.label),
            returnAction?.label,
            emptyLabel,
            searchPlaceholder,
          ].map((text, index) => (
            <div key={index} className="whitespace-nowrap px-2">
              {text}
            </div>
          ))}
        </div>
        {returnAction && (
          <>
            <DropdownMenuItem
              disabled={returnAction.disabled}
              onClick={returnAction.onSelect}
            >
              {returnAction.label}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Accounts</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={selectedAccountId ?? ""}
            onValueChange={(value) => {
              if (value === selectedAccountId) return;
              accounts
                .find(
                  (account, index) => (account.id ?? String(index)) === value,
                )
                ?.onSelect?.();
            }}
          >
            {accounts.map((account, index) =>
              account.kind === "action" ? (
                <DropdownMenuItem
                  key={account.id ?? index}
                  disabled={account.disabled}
                  onClick={account.onSelect}
                >
                  {account.label}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuRadioItem
                  key={account.id ?? index}
                  value={account.id ?? String(index)}
                  className="whitespace-normal wrap-anywhere"
                  disabled={account.disabled}
                >
                  {account.label}
                </DropdownMenuRadioItem>
              ),
            )}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuEmpty>{emptyLabel}</DropdownMenuEmpty>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type AppHeaderStatusControlProps = {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  onlineLabel?: string;
  offlineLabel?: string;
  tooltipLabel?: string;
  "aria-label"?: string;
};

function resolveStatusControl(
  value: AppHeaderStatusControlProps | boolean | undefined,
): AppHeaderStatusControlProps | null {
  if (value === undefined || value === false) return null;
  if (value === true) return {};
  return value;
}

function AppHeaderStatusToggle({
  icon: Icon,
  pressed,
  defaultPressed = true,
  onPressedChange,
  onlineLabel = "Online",
  offlineLabel = "Offline",
  tooltipLabel,
  delay,
  "aria-label": ariaLabel,
}: AppHeaderStatusControlProps & {
  icon: typeof Headset;
  tooltipLabel: string;
  delay: number;
}) {
  const [uncontrolledPressed, setUncontrolledPressed] =
    React.useState(defaultPressed);
  const isControlled = pressed !== undefined;
  const isPressed = isControlled ? Boolean(pressed) : uncontrolledPressed;

  const handlePressedChange = (next: boolean) => {
    if (!isControlled) setUncontrolledPressed(next);
    onPressedChange?.(next);
  };

  return (
    <Tooltip>
      <TooltipTrigger
        delay={delay}
        render={
          <Toggle
            aria-label={ariaLabel ?? tooltipLabel}
            size="icon-sm"
            variant="ghost-dark"
            className="aria-pressed:bg-transparent aria-pressed:hover:bg-dark-surface-hover"
            pressed={isPressed}
            onPressedChange={(next) => handlePressedChange(Boolean(next))}
          >
            {isPressed ? (
              <HugeiconsIcon icon={Icon} />
            ) : (
              <SlashedIcon icon={Icon} />
            )}
          </Toggle>
        }
      />
      <TooltipContent side="bottom" align="center">
        <span className="me-2">{tooltipLabel}</span>
        <Badge
          variant={isPressed ? "success" : "destructive"}
          size="xs"
          leftIcon={
            <HugeiconsIcon
              icon={Circle}
              className="size-2 fill-current stroke-none"
            />
          }
        >
          {isPressed ? onlineLabel : offlineLabel}
        </Badge>
      </TooltipContent>
    </Tooltip>
  );
}

type AppHeaderControlsProps = {
  call?: AppHeaderStatusControlProps | boolean;
  conversation?: AppHeaderStatusControlProps | boolean;
  className?: string;
  delay?: number;
};

function AppHeaderControls({
  call,
  conversation,
  className,
  delay = 300,
}: AppHeaderControlsProps) {
  const callControl = resolveStatusControl(call);
  const conversationControl = resolveStatusControl(conversation);

  if (!callControl && !conversationControl) return null;

  return (
    <div
      data-slot="app-header-controls"
      className={cn("flex items-center gap-2", className)}
    >
      {callControl ? (
        <AppHeaderStatusToggle
          icon={Headset}
          delay={delay}
          onlineLabel="Online"
          offlineLabel="Offline"
          {...callControl}
          tooltipLabel={callControl.tooltipLabel ?? "Call status"}
          aria-label={callControl["aria-label"] ?? "Call status"}
        />
      ) : null}
      {conversationControl ? (
        <AppHeaderStatusToggle
          icon={MessageSquareText}
          delay={delay}
          onlineLabel="Online"
          offlineLabel="Offline"
          {...conversationControl}
          tooltipLabel={
            conversationControl.tooltipLabel ?? "Conversation status"
          }
          aria-label={
            conversationControl["aria-label"] ?? "Conversation status"
          }
        />
      ) : null}
    </div>
  );
}

type AppHeaderUserMenuItem = {
  id: string;
  label: React.ReactNode;
  onSelect?: () => void;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  unread?: boolean;
  variant?: "default" | "destructive";
  disabled?: boolean;
  /** Renders a separator above this item. */
  separatorBefore?: boolean;
};

type AppHeaderUserMenuProps = {
  name: React.ReactNode;
  unread?: boolean;
  avatar?: {
    name?: string;
    src?: string;
  };
  items: readonly AppHeaderUserMenuItem[];
  align?: React.ComponentProps<typeof DropdownMenuContent>["align"];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  "aria-label"?: string;
};

function AppHeaderUserMenu({
  name,
  unread = false,
  avatar,
  items,
  align = "end",
  open,
  onOpenChange,
  className,
  "aria-label": ariaLabel = "User menu",
}: AppHeaderUserMenuProps) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost-dark"
            className={cn("gap-2.5", className)}
            aria-label={unread ? `${ariaLabel}, new updates` : ariaLabel}
            dropdown
          >
            <Avatar
              name={avatar?.name ?? (typeof name === "string" ? name : "User")}
              size="sm"
              notification={unread}
            >
              {avatar?.src ? <AvatarImage src={avatar.src} /> : null}
            </Avatar>
            <span className="max-w-40 truncate">{name}</span>
          </Button>
        }
      />
      <DropdownMenuContent align={align} className="min-w-56">
        {items.map((item) => (
          <React.Fragment key={item.id}>
            {item.separatorBefore ? <DropdownMenuSeparator /> : null}
            <DropdownMenuItem
              variant={item.variant}
              unread={item.unread}
              disabled={item.disabled}
              onClick={item.onSelect}
              render={
                item.href && !item.disabled ? (
                  <a
                    href={item.href}
                    target={item.target}
                    rel={
                      item.target === "_blank"
                        ? "noopener noreferrer"
                        : undefined
                    }
                  />
                ) : undefined
              }
            >
              {item.label}
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export {
  AppHeader,
  AppHeaderLogo,
  AppHeaderActions,
  AppHeaderAccountSwitcher,
  AppHeaderControls,
  AppHeaderUserMenu,
};

export type {
  AppHeaderAccountItem,
  AppHeaderAccountSwitcherProps,
  AppHeaderControlsProps,
  AppHeaderLogoProps,
  AppHeaderStatusControlProps,
  AppHeaderUserMenuItem,
  AppHeaderUserMenuProps,
};
