import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cn } from "@gecko/ui/lib/utils"
import { Button } from "@gecko/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@gecko/ui/components/input-group"
import { ChevronDownIcon, SearchIcon, XIcon, CheckIcon } from "lucide-react"

type ComboboxVariant = "default" | "popover"

type ComboboxConfigContextValue = {
  variant: ComboboxVariant
  search: boolean
  searchPlaceholder: string
}

const ComboboxConfigContext = React.createContext<ComboboxConfigContextValue>({
  variant: "default",
  search: false,
  searchPlaceholder: "Search...",
})

function useComboboxConfig() {
  return React.useContext(ComboboxConfigContext)
}

function Combobox({
  variant = "default",
  search = false,
  searchPlaceholder = "Search...",
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Root> & {
  /** Use with a custom {@link ComboboxTrigger}; put the list in {@link ComboboxContent}. */
  variant?: ComboboxVariant
  /**
   * When true, renders a search field inside {@link ComboboxContent}
   * matching DropdownMenu searchable styling (input lives in the popup).
   */
  search?: boolean
  searchPlaceholder?: string
}) {
  const config = React.useMemo(
    () => ({ variant, search, searchPlaceholder }),
    [variant, search, searchPlaceholder],
  )

  return (
    <ComboboxConfigContext.Provider value={config}>
      <ComboboxPrimitive.Root
        data-slot="combobox"
        data-variant={variant}
        data-search={search ? "true" : undefined}
        {...props}
      />
    </ComboboxConfigContext.Provider>
  )
}

const ComboboxChipsPlaceholderContext = React.createContext<{
  selectedCount: number
} | null>(null)

function ComboboxValue({ children, ...props }: ComboboxPrimitive.Value.Props) {
  return (
    <ComboboxPrimitive.Value data-slot="combobox-value" {...props}>
      {(value: unknown) => {
        const count = Array.isArray(value)
          ? value.length
          : value != null
            ? 1
            : 0
        return (
          <ComboboxChipsPlaceholderContext.Provider
            value={{ selectedCount: count }}
          >
            {typeof children === "function"
              ? (children as (value: unknown) => React.ReactNode)(value)
              : children}
          </ComboboxChipsPlaceholderContext.Provider>
        )
      }}
    </ComboboxPrimitive.Value>
  )
}

function ComboboxTrigger({
  className,
  children,
  showIcon,
  ...props
}: ComboboxPrimitive.Trigger.Props & {
  /** @default true for `variant="default"`, false for `variant="popover"` */
  showIcon?: boolean
}) {
  const { variant } = useComboboxConfig()
  const withIcon = showIcon ?? variant !== "popover"

  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      {withIcon ? (
        <ChevronDownIcon className="text-muted-foreground size-4 pointer-events-none" />
      ) : null}
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(className)}
      {...props}
      render={
        <InputGroupButton variant="ghost" size="sm">
          <XIcon className="pointer-events-none" />
        </InputGroupButton>
      }
    />
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="sm"
            variant="ghost"
            render={<ComboboxTrigger showIcon />}
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

/** Search field styling matches DropdownMenu searchable content. */
function ComboboxSearch({
  className,
  autoFocus = true,
  ...props
}: Omit<ComboboxPrimitive.Input.Props, "size"> & {
  autoFocus?: boolean
}) {
  const { searchPlaceholder } = useComboboxConfig()

  return (
    <div
      data-slot="combobox-search"
      className={cn(
        "border-border text-muted-foreground flex items-center gap-2 border-b px-2 py-2",
        className,
      )}
    >
      <SearchIcon className="size-4 shrink-0" aria-hidden="true" />
      <ComboboxPrimitive.Input
        data-slot="combobox-search-input"
        className="placeholder:text-muted-foreground/80 focus-visible:outline-none flex-1 bg-transparent text-sm"
        placeholder={searchPlaceholder}
        autoFocus={autoFocus}
        {...props}
      />
    </div>
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  children,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  const { variant, search } = useComboboxConfig()
  const isPopover = variant === "popover"

  const content = search ? (
    <>
      <ComboboxSearch />
      <div className="p-1">{children}</div>
    </>
  ) : (
    children
  )

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
          data-variant={variant}
          data-search={search ? "true" : undefined}
          className={cn(
            "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:border-input/30 overflow-hidden rounded-lg shadow-md ring-1 duration-100 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:shadow-none data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 group/combobox-content relative max-h-(--available-height) max-w-(--available-width) origin-(--transform-origin)",
            isPopover
              ? "min-w-56 w-72"
              : "w-(--anchor-width) min-w-[calc(var(--anchor-width)+--spacing(7))] data-[chips=true]:min-w-(--anchor-width)",
            search ? "p-0" : undefined,
            className,
          )}
          {...props}
        >
          {content}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  const { search } = useComboboxConfig()

  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 data-empty:p-0 overflow-y-auto overscroll-contain",
        search ? "p-0" : "p-1",
        className,
      )}
      {...props}
    />
  )
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
            <CheckIcon className="pointer-events-none" />
          </span>
        }
      />
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("text-muted-foreground p-1.5 text-xs", className)}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
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
  )
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
  )
}

const ComboboxChips = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
    ComboboxPrimitive.Chips.Props
>(function ComboboxChips({ className, children, ...props }, ref) {
  return (
    <InputGroup ref={ref} className={cn("h-8 w-auto min-w-0", className)}>
      <ComboboxPrimitive.Chips
        data-slot="combobox-chips"
        className="flex min-h-0 min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden px-2.5 py-1 text-sm"
        {...props}
      >
        {children}
      </ComboboxPrimitive.Chips>
      <InputGroupAddon align="inline-end" className="shrink-0 self-center py-1">
        <InputGroupButton
          variant="ghost"
          render={<ComboboxTrigger showIcon />}
          data-slot="combobox-chips-trigger"
          className="data-pressed:bg-transparent"
        />
      </InputGroupAddon>
    </InputGroup>
  )
})

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "bg-muted text-foreground flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-sm px-1.5 text-xs font-medium whitespace-nowrap has-data-[slot=combobox-chip-remove]:pr-0 has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-75",
        className,
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          className="opacity-50 hover:opacity-100 size-5"
          data-slot="combobox-chip-remove"
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Remove"
            >
              <XIcon className="pointer-events-none" aria-hidden />
            </Button>
          }
        />
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  placeholder,
  ...props
}: ComboboxPrimitive.Input.Props) {
  const ctx = React.useContext(ComboboxChipsPlaceholderContext)
  const effectivePlaceholder =
    (ctx?.selectedCount ?? 0) > 0 ? "" : placeholder
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
  )
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
  ComboboxSearch,
}
