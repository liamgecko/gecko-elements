/* eslint-disable react-refresh/only-export-components -- the anchor hook is part of the Combobox public interface. */
"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { cn } from "@gecko/ui/lib/utils";
import { Button } from "@gecko/ui/components/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@gecko/ui/components/input-group";
import ChevronDownIcon from "@hugeicons/core-free-icons/ChevronDownIcon";
import XIcon from "@hugeicons/core-free-icons/XIcon";
import CheckIcon from "@hugeicons/core-free-icons/CheckIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

const Combobox = ComboboxPrimitive.Root;

const ComboboxChipsPlaceholderContext = React.createContext<{
  selectedCount: number;
} | null>(null);

function ComboboxValue({ children, ...props }: ComboboxPrimitive.Value.Props) {
  return (
    <ComboboxPrimitive.Value data-slot="combobox-value" {...props}>
      {(value: unknown) => {
        const count = Array.isArray(value)
          ? value.length
          : value != null
            ? 1
            : 0;
        return (
          <ComboboxChipsPlaceholderContext.Provider
            value={{ selectedCount: count }}
          >
            {typeof children === "function"
              ? (children as (value: unknown) => React.ReactNode)(value)
              : children}
          </ComboboxChipsPlaceholderContext.Provider>
        );
      }}
    </ComboboxPrimitive.Value>
  );
}

function ComboboxTrigger({
  className,
  children,
  "aria-label": ariaLabel = "Show options",
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      aria-label={ariaLabel}
      className={cn(
        "group/combobox-trigger [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <HugeiconsIcon
        icon={ChevronDownIcon}
        className="text-muted-foreground size-4 pointer-events-none transition-transform duration-200 ease-out group-aria-expanded/combobox-trigger:rotate-180 motion-reduce:transition-none"
        aria-hidden
      />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({
  className,
  "aria-label": ariaLabel = "Clear selection",
  ...props
}: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      aria-label={ariaLabel}
      className={cn(className)}
      {...props}
      render={
        <InputGroupButton variant="ghost" size="md" className="size-6 px-0">
          <HugeiconsIcon
            icon={XIcon}
            className="pointer-events-none"
            aria-hidden
          />
        </InputGroupButton>
      }
    />
  );
}

function ComboboxInput({
  className,
  children,
  disabled,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        disabled={disabled}
        render={<InputGroupInput />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="md"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="size-6 px-0 group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            {...(disabled ? { disabled: true } : {})}
          />
        )}
        {showClear && (
          <ComboboxClear {...(disabled ? { disabled: true } : {})} />
        )}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-overlay-border *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:border-input/30 overflow-hidden rounded-lg shadow-md ring-1 duration-100 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:shadow-none data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) data-[chips=true]:min-w-(--anchor-width)",
            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 p-1 data-empty:p-0 overflow-y-auto overscroll-contain",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex w-full items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-75 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
            <HugeiconsIcon icon={CheckIcon} className="pointer-events-none" />
          </span>
        }
      />
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("text-muted-foreground p-1.5 text-2xs", className)}
      {...props}
    />
  );
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "text-muted-foreground hidden w-full justify-center py-2 text-center text-sm group-data-empty/combobox-content:flex",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

const ComboboxChips = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
    ComboboxPrimitive.Chips.Props
>(function ComboboxChips({ className, children, ...props }, ref) {
  return (
    <InputGroup
      ref={ref}
      className={cn("h-auto min-h-8 w-auto min-w-0 items-center", className)}
    >
      <ComboboxPrimitive.Chips
        data-slot="combobox-chips"
        className="flex min-h-8 min-w-0 flex-1 flex-wrap items-center gap-1 px-2.5 py-1 text-sm"
        {...props}
      >
        {children}
      </ComboboxPrimitive.Chips>
      <InputGroupAddon align="inline-end" className="shrink-0 self-center py-1">
        <InputGroupButton
          size="md"
          variant="ghost"
          render={<ComboboxTrigger />}
          data-slot="combobox-chips-trigger"
          className="size-6 px-0 data-pressed:bg-transparent"
        />
      </InputGroupAddon>
    </InputGroup>
  );
});

function ComboboxChip({
  className,
  children,
  showRemove = true,
  removeLabel,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
  removeLabel?: string;
}) {
  const effectiveRemoveLabel =
    removeLabel ??
    (typeof children === "string" || typeof children === "number"
      ? `Remove ${children}`
      : "Remove selection");

  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "bg-muted text-foreground flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-sm px-1.5 text-2xs font-medium whitespace-nowrap has-data-[slot=combobox-chip-remove]:pr-0 has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-75",
        className,
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          className="size-5 text-foreground"
          data-slot="combobox-chip-remove"
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={effectiveRemoveLabel}
            >
              <HugeiconsIcon
                icon={XIcon}
                className="pointer-events-none"
                aria-hidden
              />
            </Button>
          }
        />
      )}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({
  className,
  placeholder,
  ...props
}: ComboboxPrimitive.Input.Props) {
  const ctx = React.useContext(ComboboxChipsPlaceholderContext);
  const effectivePlaceholder = (ctx?.selectedCount ?? 0) > 0 ? "" : placeholder;
  return (
    <ComboboxPrimitive.Input
      data-slot="input-group-control"
      className={cn(
        "min-w-16 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground aria-invalid:placeholder:text-destructive",
        className,
      )}
      placeholder={effectivePlaceholder}
      {...props}
    />
  );
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
