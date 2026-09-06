import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import X from "@hugeicons/core-free-icons/XIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

import { Avatar } from "@gecko/ui/components/avatar";
import { Counter } from "@gecko/ui/components/counter";
import { cn } from "@gecko/ui/lib/utils";

const badgeVariants = cva(
  "group/badge relative inline-flex shrink-0 items-center gap-1.5 overflow-visible border font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        info: "bg-info-muted text-info-muted-foreground",
        warning: "bg-warning-muted text-warning-muted-foreground",
        destructive: "bg-destructive-muted text-destructive-muted-foreground",
        success: "bg-success-muted text-success-muted-foreground",
        light: "border-border bg-white text-foreground dark:bg-gray-950",
      },
      size: {
        xs: "gap-1 px-1 py-0.5 text-4xs leading-3",
        sm: "gap-1 px-1.5 py-0.5 text-2xs leading-4",
        md: "px-2 py-1 text-sm leading-4",
        lg: "gap-2 px-2.5 py-1.5 text-base leading-5",
        xl: "gap-2 px-3.5 py-2 text-lg leading-6",
      },
      bordered: {
        true: "",
        false: "border-transparent",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded",
      },
    },
    compoundVariants: [
      { bordered: true, variant: "primary", className: "border-primary" },
      {
        bordered: true,
        variant: "secondary",
        className: "border-secondary-border",
      },
      {
        bordered: true,
        variant: "info",
        className: "border-info-muted-border",
      },
      {
        bordered: true,
        variant: "warning",
        className: "border-warning-muted-border",
      },
      {
        bordered: true,
        variant: "destructive",
        className: "border-destructive-muted-border",
      },
      {
        bordered: true,
        variant: "success",
        className: "border-success-muted-border",
      },
      { bordered: true, variant: "light", className: "border-border" },
      { rounded: true, size: "xs", className: "px-1.5" },
      { rounded: true, size: "sm", className: "px-2" },
      { rounded: true, size: "md", className: "px-2.5" },
      { rounded: true, size: "lg", className: "px-3" },
      { rounded: true, size: "xl", className: "px-4" },
    ],
    defaultVariants: {
      variant: "secondary",
      size: "sm",
      bordered: false,
      rounded: false,
    },
  },
);

const iconSizeMap = {
  xs: "size-2.5",
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
  xl: "size-5",
} as const;

const avatarSizeMap = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
} as const;

type BadgeSize = keyof typeof iconSizeMap;

type BadgeDismissible =
  | true
  | {
      label?: string;
      ariaLabel?: string;
      onDismiss?: () => void;
    };

type BadgeBaseProps = Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof badgeVariants> & {
    children: React.ReactNode;
    leftIcon?: React.ReactNode;
    notificationCount?: number;
  };

type BadgeProps = BadgeBaseProps &
  (
    | {
        dismissible?: false;
        rightIcon?: React.ReactNode;
      }
    | {
        dismissible: BadgeDismissible;
        rightIcon?: never;
      }
  );

function renderIcon(icon: React.ReactNode, size: BadgeSize) {
  if (!icon) return null;
  if (!React.isValidElement(icon)) return icon;

  const element = icon as React.ReactElement<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>;

  return React.cloneElement(element, {
    "aria-hidden": true,
    className: cn(iconSizeMap[size], element.props.className),
  });
}

function processChildren(children: React.ReactNode, size: BadgeSize) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const element = child as React.ReactElement<{
      size?: string;
      className?: string;
    }>;

    if (element.type !== Avatar) return child;

    return React.cloneElement(element, {
      size: avatarSizeMap[size],
      className: cn(element.props.className),
    });
  });
}

function Badge({
  className,
  variant = "secondary",
  size = "sm",
  bordered = false,
  rounded = false,
  dismissible = false,
  leftIcon,
  rightIcon,
  notificationCount,
  children,
  ...props
}: BadgeProps) {
  const [isDismissed, setIsDismissed] = React.useState(false);
  const resolvedSize = size ?? "sm";
  const dismissibleConfig =
    typeof dismissible === "object" ? dismissible : undefined;
  const showNotification =
    typeof notificationCount === "number" &&
    Number.isFinite(notificationCount) &&
    notificationCount > 0;

  if (isDismissed) return null;

  return (
    <span
      data-slot="badge"
      className={cn(
        badgeVariants({ variant, size: resolvedSize, bordered, rounded }),
        className,
      )}
      {...props}
    >
      {renderIcon(leftIcon, resolvedSize)}
      {processChildren(children, resolvedSize)}
      {!dismissible && renderIcon(rightIcon, resolvedSize)}
      {dismissible ? (
        <button
          type="button"
          className="relative ms-1 inline-flex shrink-0 items-center justify-center rounded p-0.5 outline-none after:absolute after:start-1/2 after:top-1/2 after:size-6 after:-translate-x-1/2 after:-translate-y-1/2 after:content-[''] hover:bg-gray-950/5 focus-visible:ring-2 focus-visible:ring-ring/50 dark:hover:bg-white/10"
          aria-label={
            dismissibleConfig?.ariaLabel ??
            dismissibleConfig?.label ??
            "Dismiss badge"
          }
          onClick={() => {
            dismissibleConfig?.onDismiss?.();
            setIsDismissed(true);
          }}
        >
          <HugeiconsIcon
            icon={X}
            aria-hidden="true"
            className={iconSizeMap[resolvedSize]}
            strokeWidth={3}
          />
        </button>
      ) : null}
      {showNotification ? (
        <span data-slot="badge-notification" className="absolute -end-2 -top-2">
          <Counter
            value={notificationCount}
            max={9}
            size="sm"
            variant="destructive"
          />
        </span>
      ) : null}
    </span>
  );
}

export { Badge };
