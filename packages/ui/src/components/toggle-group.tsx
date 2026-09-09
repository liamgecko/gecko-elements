"use client";

import * as React from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@gecko/ui/lib/utils";
import { toggleVariants } from "@gecko/ui/components/toggle";

type ToggleGroupVariants = Omit<
  VariantProps<typeof toggleVariants>,
  "variant"
> & {
  variant?: VariantProps<typeof toggleVariants>["variant"] | "filter";
};

const countFormatter = new Intl.NumberFormat("en-GB");

const ToggleGroupContext = React.createContext<
  ToggleGroupVariants & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }
>({
  size: "default",
  variant: "outline",
  spacing: 2,
  orientation: "horizontal",
});

function ToggleGroup({
  className,
  variant = "outline",
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  ToggleGroupVariants & {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "rounded-md data-[spacing=0]:data-[variant=outline]:shadow-xs group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-vertical:flex-col data-vertical:items-stretch",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{
          variant,
          size,
          spacing,
          orientation,
        }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant = "outline",
  size = "default",
  count,
  unread = false,
  "aria-describedby": ariaDescribedBy,
  ...props
}: TogglePrimitive.Props &
  ToggleGroupVariants & {
    count?: number;
    unread?: boolean;
  }) {
  const context = React.useContext(ToggleGroupContext);
  const resolvedVariant = context.variant || variant;
  const isFilter = resolvedVariant === "filter";
  const resolvedSize = context.size || size;
  const metadataId = React.useId();
  const formattedCount =
    isFilter && count !== undefined && count > 0
      ? countFormatter.format(count)
      : undefined;
  const hasMetadata = isFilter && (formattedCount !== undefined || unread);
  const childArray = React.Children.toArray(children);
  const isIconOnly =
    !isFilter && childArray.length === 1 && React.isValidElement(childArray[0]);

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      data-spacing={context.spacing}
      data-icon-only={isIconOnly || undefined}
      aria-describedby={
        [ariaDescribedBy, hasMetadata ? metadataId : undefined]
          .filter(Boolean)
          .join(" ") || undefined
      }
      className={cn(
        "data-[state=on]:bg-muted group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 group-data-[spacing=0]/toggle-group:shadow-none group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md shrink-0 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: isFilter ? "default" : resolvedVariant,
          size: resolvedSize,
        }),
        isFilter && "gap-1.5 transition-colors",
        isFilter &&
          resolvedSize === "default" &&
          "h-auto min-w-0 gap-1 px-1.5 py-0.5 text-2xs leading-4",
        className,
      )}
      {...props}
    >
      {isFilter && unread && (
        <span
          data-slot="toggle-group-unread"
          aria-hidden="true"
          className="me-1 size-2 shrink-0 rounded-full bg-notification"
        />
      )}
      {children}
      {formattedCount !== undefined && (
        <span
          data-slot="toggle-group-count"
          aria-hidden="true"
          className="text-muted-foreground"
        >
          ({formattedCount})
        </span>
      )}
      {hasMetadata && (
        <span id={metadataId} hidden>
          {formattedCount !== undefined ? `Count: ${formattedCount}. ` : ""}
          {unread ? "Unread activity." : ""}
        </span>
      )}
    </TogglePrimitive>
  );
}

export { ToggleGroup, ToggleGroupItem };
