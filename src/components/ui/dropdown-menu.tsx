"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "@/lib/utils"
import { CheckIcon, ChevronRightIcon, SearchIcon } from "lucide-react"

type DropdownMenuSearchContextValue = {
  query: string
  setQuery: (value: string) => void
  /** Ref updated synchronously during render by items; read by DropdownMenuEmpty. Reset each render in root. */
  visibleCountRef: React.MutableRefObject<number>
  addVisible: () => void
}

const DropdownMenuSearchContext =
  React.createContext<DropdownMenuSearchContextValue | null>(null)

function useDropdownMenuSearch() {
  return React.useContext(DropdownMenuSearchContext)
}

type DropdownMenuConfigContextValue = {
  searchable?: boolean
  searchPlaceholder?: string
}

const DropdownMenuConfigContext =
  React.createContext<DropdownMenuConfigContextValue>({})

function useDropdownMenuConfig() {
  return React.useContext(DropdownMenuConfigContext)
}

function DropdownMenu({
  searchable = false,
  searchPlaceholder = "Search...",
  ...props
}: MenuPrimitive.Root.Props & {
  searchable?: boolean
  searchPlaceholder?: string
}) {
  const [query, setQuery] = React.useState("")
  const visibleCountRef = React.useRef(0)

  // Reset so items can re-count during this render. Empty must render after items to read correct count.
  // eslint-disable-next-line -- intentional: sync visible count so empty state shows in same frame (no flicker)
  visibleCountRef.current = 0

  const addVisible = React.useCallback(() => {
    visibleCountRef.current += 1
  }, [])

  const searchValue = React.useMemo(
    () => ({
      query,
      setQuery,
      visibleCountRef,
      addVisible,
    }),
    [query, addVisible]
  )

  const configValue = React.useMemo(
    () => ({ searchable, searchPlaceholder }),
    [searchable, searchPlaceholder]
  )

  return (
    <DropdownMenuConfigContext.Provider value={configValue}>
      <DropdownMenuSearchContext.Provider value={searchValue}>
        <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
      </DropdownMenuSearchContext.Provider>
    </DropdownMenuConfigContext.Provider>
  )
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  children,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const config = useDropdownMenuConfig()
  const searchable = config.searchable ?? false

  const content = searchable ? (
    <>
      <DropdownMenuSearch placeholder={config.searchPlaceholder} />
      <div className="p-1">{children}</div>
    </>
  ) : (
    children
  )

  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 rounded-md shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-end-2 data-[side=inline-end]:slide-in-from-start-2 z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden",
            searchable ? "p-0" : "p-1",
            className
          )}
          {...props}
        >
          {content}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function getItemText(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child)
      }
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>
        if (element.props.children != null) {
          return getItemText(element.props.children)
        }
      }
      return ""
    })
    .join(" ")
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("text-muted-foreground px-2 py-1.5 text-xs font-medium data-inset:ps-8", className)}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  children,
  searchValue,
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
  searchValue?: string
}) {
  const search = useDropdownMenuSearch()
  const query = search?.query.toLowerCase().trim()
  const text = React.useMemo(
    () => (searchValue ?? getItemText(children)).toLowerCase(),
    [searchValue, children]
  )
  const isHidden = query ? !text.includes(query) : false

  if (search && !isHidden) {
    search.addVisible()
  }

  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive-muted data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm data-inset:ps-8 [&_svg:not([class*='size-'])]:size-4 group/dropdown-menu-item relative flex items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
        className
      )}
      style={isHidden ? { display: "none" } : undefined}
      {...props}
    >
      {children}
    </MenuPrimitive.Item>
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm data-inset:ps-8 [&_svg:not([class*='size-'])]:size-4 data-popup-open:bg-accent data-popup-open:text-accent-foreground flex cursor-pointer items-center outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="rtl:rotate-180 ms-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "inline-end",
  sideOffset = 0,
  className,
  searchable = false,
  searchPlaceholder = "Search...",
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent> & {
  searchable?: boolean
  searchPlaceholder?: string
}) {
  const [query, setQuery] = React.useState("")
  const visibleCountRef = React.useRef(0)

  // eslint-disable-next-line -- intentional: sync visible count so empty state shows in same frame (no flicker)
  visibleCountRef.current = 0

  const addVisible = React.useCallback(() => {
    visibleCountRef.current += 1
  }, [])

  const submenuSearchValue = React.useMemo(
    () => ({
      query,
      setQuery,
      visibleCountRef,
      addVisible,
    }),
    [query, addVisible]
  )

  const inner = searchable ? (
    <DropdownMenuSearchContext.Provider value={submenuSearchValue}>
      <DropdownMenuSearch placeholder={searchPlaceholder} />
      <div className="p-1">{children}</div>
    </DropdownMenuSearchContext.Provider>
  ) : (
    children
  )

  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-[96px] rounded-md shadow-lg ring-1 duration-100 w-auto",
        searchable ? "p-0" : "p-1",
        className
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    >
      {inner}
    </DropdownMenuContent>
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  searchValue,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
  searchValue?: string
}) {
  const search = useDropdownMenuSearch()
  const query = search?.query.toLowerCase().trim()
  const text = React.useMemo(
    () => (searchValue ?? getItemText(children)).toLowerCase(),
    [searchValue, children]
  )
  const isHidden = query ? !text.includes(query) : false

  if (search && !isHidden) {
    search.addVisible()
  }

  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pe-8 ps-2 text-sm data-inset:ps-8 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-pointer items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      checked={checked}
      style={isHidden ? { display: "none" } : undefined}
      {...props}
    >
      <span
        className="absolute end-2 flex items-center justify-center pointer-events-none"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon
          />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
  searchValue?: string
}) {
  const search = useDropdownMenuSearch()
  const query = search?.query.toLowerCase().trim()
  const text = React.useMemo(
    () => (props.searchValue ?? getItemText(children)).toLowerCase(),
    [props.searchValue, children]
  )
  const isHidden = query ? !text.includes(query) : false

  if (search && !isHidden) {
    search.addVisible()
  }

  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pe-8 ps-2 text-sm data-inset:ps-8 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-pointer items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      style={isHidden ? { display: "none" } : undefined}
      {...props}
    >
      <span
        className="absolute end-2 flex items-center justify-center pointer-events-none"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon
          />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ms-auto text-xs tracking-widest", className)}
      {...props}
    />
  )
}

function DropdownMenuSearch({
  className,
  placeholder = "Search...",
  autoFocus = false,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const search = useDropdownMenuSearch()

  if (!search) {
    return null
  }

  return (
    <div
      data-slot="dropdown-menu-search"
      className={cn(
        "border-border text-muted-foreground flex items-center gap-2 border-b px-2 py-2",
        className
      )}
    >
      <SearchIcon className="size-4 shrink-0" aria-hidden="true" />
      <input
        className="placeholder:text-muted-foreground/80 focus-visible:outline-none flex-1 bg-transparent text-sm"
        value={search.query}
        onChange={(event) => search.setQuery(event.target.value)}
        onKeyDown={(event) => {
          // Keep keyboard input inside the search field instead of triggering menu typeahead
          event.stopPropagation()
        }}
        placeholder={placeholder}
        autoFocus={autoFocus}
        {...props}
      />
    </div>
  )
}

function DropdownMenuEmpty({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const search = useDropdownMenuSearch()
  const show =
    search &&
    search.query.trim().length > 0 &&
    search.visibleCountRef.current === 0

  if (!show) {
    return null
  }

  return (
    <div
      data-slot="dropdown-menu-empty"
      className={cn(
        "text-muted-foreground w-full px-2 py-1.5 text-center text-sm",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSearch,
  DropdownMenuEmpty,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
