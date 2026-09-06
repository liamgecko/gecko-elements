import * as React from "react";
import AlertTriangle from "@hugeicons/core-free-icons/TriangleAlertIcon";
import CheckCircle from "@hugeicons/core-free-icons/CircleCheckIcon";
import Info from "@hugeicons/core-free-icons/InfoIcon";
import X from "@hugeicons/core-free-icons/XIcon";
import XCircle from "@hugeicons/core-free-icons/CircleXIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@gecko/ui/lib/utils";
import { Button } from "@gecko/ui/components/button";

const alertVariants = cva(
  "grid gap-0.5 rounded-lg border px-4 py-3 text-start text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pe-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4 w-full relative group/alert",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border",
        destructive:
          "border-destructive dark:border-destructive-muted-border bg-destructive-muted text-destructive dark:text-destructive-muted-foreground *:data-[slot=alert-description]:text-destructive *:[svg]:text-destructive dark:*:data-[slot=alert-description]:text-destructive-muted-foreground dark:*:[svg]:text-destructive-muted-foreground",
        info: "border-info dark:border-info-muted-border bg-info-muted text-info dark:text-info-muted-foreground *:data-[slot=alert-description]:text-info *:[svg]:text-info dark:*:data-[slot=alert-description]:text-info-muted-foreground dark:*:[svg]:text-info-muted-foreground",
        success:
          "border-success dark:border-success-muted-border bg-success-muted text-success dark:text-success-muted-foreground *:data-[slot=alert-description]:text-success *:[svg]:text-success dark:*:data-[slot=alert-description]:text-success-muted-foreground dark:*:[svg]:text-success-muted-foreground",
        warning:
          "border-warning dark:border-warning-muted-border bg-warning-muted text-warning dark:text-warning-muted-foreground *:data-[slot=alert-description]:text-warning *:[svg]:text-warning dark:*:data-[slot=alert-description]:text-warning-muted-foreground dark:*:[svg]:text-warning-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const defaultIcons: Record<
  NonNullable<VariantProps<typeof alertVariants>["variant"]>,
  React.ReactNode
> = {
  default: (
    <HugeiconsIcon icon={Info} aria-hidden className="size-4 shrink-0" />
  ),
  destructive: (
    <HugeiconsIcon icon={XCircle} aria-hidden className="size-4 shrink-0" />
  ),
  info: <HugeiconsIcon icon={Info} aria-hidden className="size-4 shrink-0" />,
  success: (
    <HugeiconsIcon icon={CheckCircle} aria-hidden className="size-4 shrink-0" />
  ),
  warning: (
    <HugeiconsIcon
      icon={AlertTriangle}
      aria-hidden
      className="size-4 shrink-0"
    />
  ),
};

function normalizeAlertIcon(icon: React.ReactNode) {
  if (!React.isValidElement(icon)) return icon;

  const el = icon as React.ReactElement<{
    className?: string;
    "aria-hidden"?: boolean;
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
    className: cn(existingClassName, !hasSizeClass && "size-4", "shrink-0"),
  });
}

type AlertDismissibleProp =
  | boolean
  | {
      label?: string;
      ariaLabel?: string;
      onDismiss?: () => void;
    };

function Alert({
  className,
  variant,
  icon = false,
  dismissible = false,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    icon?: boolean | React.ReactNode;
    dismissible?: AlertDismissibleProp;
  }) {
  const [isDismissing, setIsDismissing] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(false);

  const dismissibleConfig =
    typeof dismissible === "object" ? dismissible : undefined;
  const isDismissible = Boolean(dismissible);

  const hasActionChild = React.useMemo(() => {
    if (!isDismissible) return false;
    return React.Children.toArray(children).some((child) => {
      if (!React.isValidElement(child)) return false;
      if (child.type === AlertAction) return true;
      return false;
    });
  }, [children, isDismissible]);

  const resolvedIcon =
    icon === false
      ? null
      : icon === true
        ? defaultIcons[variant ?? "default"]
        : normalizeAlertIcon(icon);

  React.useEffect(() => {
    if (!isDismissing) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timeoutId = window.setTimeout(
      () => {
        setIsDismissed(true);
      },
      prefersReducedMotion ? 0 : 200,
    );

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isDismissing]);

  if (isDismissible && isDismissed) return null;

  return (
    <div
      data-slot="alert"
      data-variant={variant ?? "default"}
      role="alert"
      data-state={isDismissing ? "closed" : "open"}
      className={cn(
        alertVariants({ variant }),
        isDismissible && "motion-safe:transition-all motion-safe:duration-200",
        isDismissible &&
          (isDismissing
            ? "opacity-0 -translate-y-0.5 scale-95"
            : "opacity-100 scale-100"),
        className,
      )}
      {...props}
    >
      {resolvedIcon}
      {children}
      {isDismissible && !hasActionChild ? (
        <AlertAction>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={
              dismissibleConfig?.ariaLabel ??
              dismissibleConfig?.label ??
              "Dismiss alert"
            }
            onClick={() => {
              dismissibleConfig?.onDismiss?.();
              setIsDismissing(true);
            }}
          >
            <HugeiconsIcon icon={X} aria-hidden="true" />
          </Button>
        </AlertAction>
      ) : null}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:hover:text-foreground [&_a]:underline [&_a]:underline-offset-3",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground text-2xs text-balance md:text-pretty [&_p:not(:last-child)]:mb-4 [&_a]:hover:text-foreground [&_a]:underline [&_a]:underline-offset-3",
        className,
      )}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn(
        "absolute top-1/2 -translate-y-1/2 end-3",
        "[&_[data-slot=button]]:border-transparent [&_[data-slot=button]]:bg-transparent [&_[data-slot=button]]:text-current [&_[data-slot=button]:hover]:border-transparent [&_[data-slot=button]:hover]:bg-muted [&_[data-slot=button]:hover]:text-foreground",
        "group-data-[variant=destructive]/alert:[&_[data-slot=button]:hover]:bg-red-900/5 group-data-[variant=destructive]/alert:[&_[data-slot=button]:hover]:text-destructive group-data-[variant=destructive]/alert:[&_[data-slot=button]:focus-visible]:border-destructive/40 group-data-[variant=destructive]/alert:[&_[data-slot=button]:focus-visible]:bg-destructive-muted group-data-[variant=destructive]/alert:[&_[data-slot=button]:focus-visible]:text-destructive group-data-[variant=destructive]/alert:[&_[data-slot=button]:focus-visible]:ring-destructive/20 dark:group-data-[variant=destructive]/alert:[&_[data-slot=button]:hover]:bg-rose-50/10 dark:group-data-[variant=destructive]/alert:[&_[data-slot=button]:hover]:text-rose-300 dark:group-data-[variant=destructive]/alert:[&_[data-slot=button]:focus-visible]:border-rose-50/50 dark:group-data-[variant=destructive]/alert:[&_[data-slot=button]:focus-visible]:bg-rose-50/10 dark:group-data-[variant=destructive]/alert:[&_[data-slot=button]:focus-visible]:text-rose-300 dark:group-data-[variant=destructive]/alert:[&_[data-slot=button]:focus-visible]:ring-rose-50/30",
        "group-data-[variant=info]/alert:[&_[data-slot=button]:hover]:bg-blue-900/5 group-data-[variant=info]/alert:[&_[data-slot=button]:hover]:text-info group-data-[variant=info]/alert:[&_[data-slot=button]:focus-visible]:border-info/40 group-data-[variant=info]/alert:[&_[data-slot=button]:focus-visible]:bg-info-muted group-data-[variant=info]/alert:[&_[data-slot=button]:focus-visible]:text-info group-data-[variant=info]/alert:[&_[data-slot=button]:focus-visible]:ring-info/20 dark:group-data-[variant=info]/alert:[&_[data-slot=button]:hover]:bg-blue-50/10 dark:group-data-[variant=info]/alert:[&_[data-slot=button]:hover]:text-blue-300 dark:group-data-[variant=info]/alert:[&_[data-slot=button]:focus-visible]:border-blue-50/50 dark:group-data-[variant=info]/alert:[&_[data-slot=button]:focus-visible]:bg-blue-900/10 dark:group-data-[variant=info]/alert:[&_[data-slot=button]:focus-visible]:text-blue-300 dark:group-data-[variant=info]/alert:[&_[data-slot=button]:focus-visible]:ring-blue-50/30",
        "group-data-[variant=success]/alert:[&_[data-slot=button]:hover]:bg-emerald-900/5 group-data-[variant=success]/alert:[&_[data-slot=button]:hover]:text-success group-data-[variant=success]/alert:[&_[data-slot=button]:focus-visible]:border-success/40 group-data-[variant=success]/alert:[&_[data-slot=button]:focus-visible]:bg-success-muted group-data-[variant=success]/alert:[&_[data-slot=button]:focus-visible]:text-success group-data-[variant=success]/alert:[&_[data-slot=button]:focus-visible]:ring-success/20 dark:group-data-[variant=success]/alert:[&_[data-slot=button]:hover]:bg-teal-50/10 dark:group-data-[variant=success]/alert:[&_[data-slot=button]:hover]:text-teal-300 dark:group-data-[variant=success]/alert:[&_[data-slot=button]:focus-visible]:border-teal-50/50 dark:group-data-[variant=success]/alert:[&_[data-slot=button]:focus-visible]:bg-teal-900/10 dark:group-data-[variant=success]/alert:[&_[data-slot=button]:focus-visible]:text-teal-300 dark:group-data-[variant=success]/alert:[&_[data-slot=button]:focus-visible]:ring-teal-50/30",
        "group-data-[variant=warning]/alert:[&_[data-slot=button]:hover]:bg-yellow-900/5 group-data-[variant=warning]/alert:[&_[data-slot=button]:hover]:text-warning group-data-[variant=warning]/alert:[&_[data-slot=button]:focus-visible]:border-warning/40 group-data-[variant=warning]/alert:[&_[data-slot=button]:focus-visible]:bg-warning-muted group-data-[variant=warning]/alert:[&_[data-slot=button]:focus-visible]:text-warning group-data-[variant=warning]/alert:[&_[data-slot=button]:focus-visible]:ring-warning/20 dark:group-data-[variant=warning]/alert:[&_[data-slot=button]:hover]:bg-yellow-50/10 dark:group-data-[variant=warning]/alert:[&_[data-slot=button]:hover]:text-yellow-300 dark:group-data-[variant=warning]/alert:[&_[data-slot=button]:focus-visible]:border-yellow-50/50 dark:group-data-[variant=warning]/alert:[&_[data-slot=button]:focus-visible]:bg-yellow-50/10 dark:group-data-[variant=warning]/alert:[&_[data-slot=button]:focus-visible]:text-yellow-300 dark:group-data-[variant=warning]/alert:[&_[data-slot=button]:focus-visible]:ring-yellow-50/30",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
