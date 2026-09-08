import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import ChevronDownIcon from "@hugeicons/core-free-icons/ChevronDownIcon";
import LoaderIcon from "@hugeicons/core-free-icons/LoaderIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

import { cn } from "@gecko/ui/lib/utils";

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:focus-visible:ring-input-destructive/20 dark:aria-invalid:focus-visible:ring-input-destructive/40 aria-invalid:border-input-destructive rounded-sm border border-transparent text-sm font-medium focus-visible:ring-3 aria-invalid:focus-visible:ring-3 [&_svg:not([class*='size-'])]:size-4 inline-flex w-fit items-center justify-center whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-75 data-disabled:pointer-events-none data-disabled:opacity-75 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground [&[aria-haspopup][aria-expanded=true]]:bg-muted [&[aria-haspopup][aria-expanded=true]]:text-foreground disabled:bg-muted data-disabled:bg-muted",
        "outline-destructive":
          "border-border bg-background hover:border-destructive-muted-border hover:bg-destructive-muted hover:text-destructive-muted-foreground [&[aria-haspopup][aria-expanded=true]]:border-destructive-muted-border [&[aria-haspopup][aria-expanded=true]]:bg-destructive-muted [&[aria-haspopup][aria-expanded=true]]:text-destructive-muted-foreground focus-visible:border-destructive/40 focus-visible:ring-destructive/20 disabled:bg-muted data-disabled:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:hover:bg-secondary dark:hover:bg-[linear-gradient(color-mix(in_oklch,var(--dark-surface-hover)_50%,transparent),color-mix(in_oklch,var(--dark-surface-hover)_50%,transparent))] [&[aria-haspopup][aria-expanded=true]]:bg-secondary [&[aria-haspopup][aria-expanded=true]]:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground [&[aria-haspopup][aria-expanded=true]]:bg-muted [&[aria-haspopup][aria-expanded=true]]:text-foreground",
        "ghost-light":
          "hover:bg-light-surface-hover hover:text-foreground [&[aria-haspopup][aria-expanded=true]]:bg-light-surface-hover [&[aria-haspopup][aria-expanded=true]]:text-foreground",
        "ghost-dark":
          "text-dark-surface-foreground hover:bg-dark-surface-hover hover:text-dark-surface-foreground [&[aria-haspopup][aria-expanded=true]]:bg-dark-surface-hover [&[aria-haspopup][aria-expanded=true]]:text-dark-surface-foreground",
        "ghost-destructive":
          "hover:bg-destructive-muted hover:text-destructive-muted-foreground [&[aria-haspopup][aria-expanded=true]]:bg-destructive-muted [&[aria-haspopup][aria-expanded=true]]:text-destructive-muted-foreground focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        destructive:
          "bg-destructive-muted text-destructive-muted-foreground hover:bg-destructive-muted/80 dark:hover:bg-destructive-muted dark:hover:bg-[linear-gradient(color-mix(in_oklch,var(--dark-surface-hover)_50%,transparent),color-mix(in_oklch,var(--dark-surface-hover)_50%,transparent))] focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-2 px-2.5 in-data-[slot=button-group]:rounded-sm has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
        xs: "h-6 gap-1.5 rounded-sm px-2 text-2xs in-data-[slot=button-group]:rounded-sm has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1.5 text-2xs rounded-sm px-2.5 in-data-[slot=button-group]:rounded-sm has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-2 px-3 has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3 [&_svg:not([class*='size-'])]:size-4.5 text-lg",
        icon: "size-8",
        "icon-2xs":
          "size-5 rounded-sm in-data-[slot=button-group]:rounded-sm [&_svg:not([class*='size-'])]:size-2.5",
        "icon-xs":
          "size-6 rounded-sm in-data-[slot=button-group]:rounded-sm [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-sm in-data-[slot=button-group]:rounded-sm",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    dropdown?: boolean;
    loading?: boolean;
  };

function Button({
  className,
  variant = "default",
  size = "default",
  dropdown = false,
  loading = false,
  disabled = false,
  focusableWhenDisabled = false,
  children,
  ...props
}: ButtonProps) {
  const isIconOnly = typeof size === "string" && size.startsWith("icon");
  const dropdownIcon = dropdown ? (
    <HugeiconsIcon
      icon={ChevronDownIcon}
      data-icon="inline-end"
      className="transition-transform duration-200 ease-out group-aria-expanded/button:rotate-180 motion-reduce:transition-none"
      aria-hidden="true"
    />
  ) : null;

  return (
    <ButtonPrimitive
      data-slot="button"
      data-loading={loading || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
      disabled={disabled || loading}
      focusableWhenDisabled={loading || focusableWhenDisabled}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <>
          <HugeiconsIcon
            icon={LoaderIcon}
            data-slot="button-loading-icon"
            data-icon={isIconOnly ? undefined : "inline-start"}
            className="animate-spin [animation-duration:1.25s] motion-reduce:animate-none"
            aria-hidden="true"
          />
          {isIconOnly ? null : (
            <span className="[&_svg]:hidden">{children}</span>
          )}
        </>
      ) : (
        <>
          {children}
          {dropdownIcon}
        </>
      )}
    </ButtonPrimitive>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- cva styles are intentionally exported from this module.
export { Button, buttonVariants };
