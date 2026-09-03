"use client";

import * as React from "react";
import { Circle, Headset, MessageSquareText } from "lucide-react";

import { Avatar, AvatarImage } from "@gecko/ui/components/avatar";
import { Badge } from "@gecko/ui/components/badge";
import { Button } from "@gecko/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuEmpty,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu";
import { Separator } from "@gecko/ui/components/separator";
import { Toggle } from "@gecko/ui/components/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip";
import { cn } from "@gecko/ui/lib/utils";

function SlashedIcon({ icon: Icon }: { icon: typeof Headset }) {
  return (
    <Icon>
      <line x1="4" y1="4" x2="20" y2="20" />
    </Icon>
  );
}

function AppHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="app-header"
      className={cn(
        "[--header-height:calc(--spacing(14))] sticky top-0 z-20 flex w-full items-center border-b bg-gray-900",
        className,
      )}
      {...props}
    >
      <div className="flex h-(--header-height) w-full items-center justify-between gap-3 px-4">
        {children}
      </div>
    </header>
  );
}

type AppHeaderLogoProps = Omit<React.ComponentProps<"img">, "children"> & {
  /** Custom logo content. When set, `src` is ignored. */
  children?: React.ReactNode;
};

function AppHeaderLogo({
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
}

function AppHeaderActions({
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
              className="mx-1 h-8 bg-background/20"
            />
          ) : null}
          {child}
        </React.Fragment>
      ))}
    </div>
  );
}

type AppHeaderAccountItem = {
  id?: string;
  label: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
};

type AppHeaderAccountSwitcherProps = {
  label: React.ReactNode;
  accounts: readonly AppHeaderAccountItem[];
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyLabel?: React.ReactNode;
  align?: React.ComponentProps<typeof DropdownMenuContent>["align"];
  className?: string;
};

function AppHeaderAccountSwitcher({
  label,
  accounts,
  searchable = true,
  searchPlaceholder = "Search accounts...",
  emptyLabel = "No accounts found.",
  align = "end",
  className,
}: AppHeaderAccountSwitcherProps) {
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
      <DropdownMenuContent align={align} className="min-w-56">
        {accounts.map((account, index) => (
          <DropdownMenuItem
            key={account.id ?? index}
            disabled={account.disabled}
            onClick={account.onSelect}
          >
            {account.label}
          </DropdownMenuItem>
        ))}
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
            className="aria-pressed:bg-transparent aria-pressed:hover:bg-white/10"
            pressed={isPressed}
            onPressedChange={(next) => handlePressedChange(Boolean(next))}
          >
            {isPressed ? <Icon /> : <SlashedIcon icon={Icon} />}
          </Toggle>
        }
      />
      <TooltipContent side="bottom" align="center">
        <span className="me-2">{tooltipLabel}</span>
        <Badge
          variant={isPressed ? "success" : "destructive"}
          size="xs"
          leftIcon={<Circle className="size-2 fill-current stroke-none" />}
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
  variant?: "default" | "destructive";
  disabled?: boolean;
  /** Renders a separator above this item. */
  separatorBefore?: boolean;
};

type AppHeaderUserMenuProps = {
  name: React.ReactNode;
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
            aria-label={ariaLabel}
            dropdown
          >
            <Avatar
              name={avatar?.name ?? (typeof name === "string" ? name : "User")}
              size="sm"
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
              disabled={item.disabled}
              onClick={item.onSelect}
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
