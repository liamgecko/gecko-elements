"use client";

import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";

import { cn } from "@gecko/ui/lib/utils";
import { CheckIcon, ChevronRightIcon, SearchIcon, XIcon } from "lucide-react";

type DropdownMenuSearchContextValue = {
  query: string;
  setQuery: (value: string) => void;
};

const DropdownMenuSearchContext =
  React.createContext<DropdownMenuSearchContextValue | null>(null);

function useDropdownMenuSearch() {
  return React.useContext(DropdownMenuSearchContext);
}

type DropdownMenuConfigContextValue = {
  searchable?: boolean;
  searchLabel?: string;
  searchPlaceholder?: string;
};

const DropdownMenuConfigContext =
  React.createContext<DropdownMenuConfigContextValue>({});

function useDropdownMenuConfig() {
  return React.useContext(DropdownMenuConfigContext);
}

function DropdownMenu({
  searchable = false,
  searchLabel,
  searchPlaceholder = "Search...",
  onOpenChange,
  ...props
}: MenuPrimitive.Root.Props & {
  searchable?: boolean;
  searchLabel?: string;
  searchPlaceholder?: string;
}) {
  const [query, setQuery] = React.useState("");

  const searchValue = React.useMemo(() => ({ query, setQuery }), [query]);

  const configValue = React.useMemo(
    () => ({ searchable, searchLabel, searchPlaceholder }),
    [searchable, searchLabel, searchPlaceholder],
  );

  return (
    <DropdownMenuConfigContext.Provider value={configValue}>
      <DropdownMenuSearchContext.Provider value={searchValue}>
        <MenuPrimitive.Root
          data-slot="dropdown-menu"
          onOpenChange={(open, eventDetails) => {
            if (!open) setQuery("");
            onOpenChange?.(open, eventDetails);
          }}
          {...props}
        />
      </DropdownMenuSearchContext.Provider>
    </DropdownMenuConfigContext.Provider>
  );
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  children,
  searchable: searchableProp,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    searchable?: boolean;
  }) {
  const config = useDropdownMenuConfig();
  const searchable = searchableProp ?? config.searchable ?? false;

  const content = searchable ? (
    <>
      <DropdownMenuSearch
        aria-label={config.searchLabel ?? config.searchPlaceholder}
        placeholder={config.searchPlaceholder}
        autoFocus
      />
      <div className="group/dropdown-menu-results p-1">{children}</div>
    </>
  ) : (
    children
  );

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
            "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 w-max rounded-md shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-end-2 data-[side=inline-end]:slide-in-from-start-2 z-50 max-h-(--available-height) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden transition-none motion-reduce:animate-none",
            searchable && "min-w-(--anchor-width)",
            searchable ? "p-0" : "p-1",
            className,
          )}
          {...props}
        >
          {content}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function getItemText(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{
          children?: React.ReactNode;
        }>;
        if (element.props.children != null) {
          return getItemText(element.props.children);
        }
      }
      return "";
    })
    .join(" ");
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "text-muted-foreground px-2 py-1.5 text-2xs font-medium data-inset:ps-8",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  children,
  searchValue,
  style,
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
  searchValue?: string;
}) {
  const search = useDropdownMenuSearch();
  const query = search?.query.toLowerCase().trim();
  const text = React.useMemo(
    () => (searchValue ?? getItemText(children)).toLowerCase(),
    [searchValue, children],
  );
  const isHidden = query ? !text.includes(query) : false;

  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-search-visible={search && !isHidden ? "" : undefined}
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive-muted data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm whitespace-nowrap data-inset:ps-8 [&_svg:not([class*='size-'])]:size-4 group/dropdown-menu-item relative flex items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-75 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
        className,
      )}
      style={isHidden ? { ...style, display: "none" } : style}
      {...props}
    >
      {children}
    </MenuPrimitive.Item>
  );
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm data-inset:ps-8 [&_svg:not([class*='size-'])]:size-4 data-popup-open:bg-accent data-popup-open:text-accent-foreground flex cursor-pointer items-center outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="rtl:rotate-180 ms-auto" aria-hidden="true" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "inline-end",
  sideOffset = 0,
  className,
  searchable = false,
  searchLabel,
  searchPlaceholder = "Search...",
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent> & {
  searchable?: boolean;
  searchLabel?: string;
  searchPlaceholder?: string;
}) {
  const [query, setQuery] = React.useState("");

  const submenuSearchValue = React.useMemo(
    () => ({ query, setQuery }),
    [query],
  );

  const inner = searchable ? (
    <DropdownMenuSearchContext.Provider value={submenuSearchValue}>
      <DropdownMenuSearch
        aria-label={searchLabel ?? searchPlaceholder}
        placeholder={searchPlaceholder}
        autoFocus
      />
      <div className="group/dropdown-menu-results p-1">{children}</div>
    </DropdownMenuSearchContext.Provider>
  ) : (
    children
  );

  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      searchable={false}
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-[96px] w-max rounded-md shadow-lg ring-1 duration-100",
        searchable && "min-w-(--anchor-width)",
        searchable ? "p-0" : "p-1",
        className,
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    >
      {inner}
    </DropdownMenuContent>
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  searchValue,
  style,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
  searchValue?: string;
}) {
  const search = useDropdownMenuSearch();
  const query = search?.query.toLowerCase().trim();
  const text = React.useMemo(
    () => (searchValue ?? getItemText(children)).toLowerCase(),
    [searchValue, children],
  );
  const isHidden = query ? !text.includes(query) : false;

  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-search-visible={search && !isHidden ? "" : undefined}
      data-inset={inset}
      className={cn(
        "group/dropdown-menu-checkbox-item focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pe-8 ps-2 text-sm data-inset:ps-8 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-pointer items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-75 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      checked={checked}
      style={isHidden ? { ...style, display: "none" } : style}
      {...props}
    >
      <span
        className="absolute end-2 flex items-center justify-center pointer-events-none"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon
            className="group-hover/dropdown-menu-checkbox-item:hidden group-focus-visible/dropdown-menu-checkbox-item:hidden"
            aria-hidden="true"
          />
          <XIcon
            className="hidden group-hover/dropdown-menu-checkbox-item:block group-focus-visible/dropdown-menu-checkbox-item:block"
            aria-hidden="true"
          />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  searchValue,
  style,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean;
  searchValue?: string;
}) {
  const search = useDropdownMenuSearch();
  const query = search?.query.toLowerCase().trim();
  const text = React.useMemo(
    () => (searchValue ?? getItemText(children)).toLowerCase(),
    [searchValue, children],
  );
  const isHidden = query ? !text.includes(query) : false;

  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-search-visible={search && !isHidden ? "" : undefined}
      data-inset={inset}
      className={cn(
        "group/radio-item focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pe-8 ps-2 text-sm data-inset:ps-8 [&_svg:not([class*='size-'])]:size-4 relative flex cursor-pointer items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-75 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      style={isHidden ? { ...style, display: "none" } : style}
      {...props}
    >
      <span
        className="pointer-events-none absolute end-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon className="size-4" aria-hidden="true" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuSeparator({
  className,
  style,
  ...props
}: MenuPrimitive.Separator.Props) {
  const search = useDropdownMenuSearch();

  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      style={search?.query.trim() ? { ...style, display: "none" } : style}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ms-auto text-2xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSearch({
  className,
  placeholder = "Search...",
  autoFocus = true,
  "aria-label": ariaLabel,
  onChange,
  onKeyDown,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const search = useDropdownMenuSearch();

  if (!search) {
    return null;
  }

  return (
    <div
      data-slot="dropdown-menu-search"
      className={cn(
        "border-border text-muted-foreground flex items-center gap-2 border-b px-2 py-2",
        className,
      )}
    >
      <SearchIcon className="size-4 shrink-0" aria-hidden="true" />
      <input
        className="placeholder:text-muted-foreground/80 focus-visible:outline-none flex-1 bg-transparent text-sm"
        value={search.query}
        onChange={(event) => {
          search.setQuery(event.target.value);
          onChange?.(event);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;

          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            const popup = event.currentTarget.closest(
              '[data-slot="dropdown-menu-content"], [data-slot="dropdown-menu-sub-content"]',
            );
            const items = Array.from(
              popup?.querySelectorAll<HTMLElement>(
                '[role^="menuitem"]:not([data-disabled])',
              ) ?? [],
            ).filter((item) => item.offsetParent !== null);
            const item = event.key === "ArrowDown" ? items[0] : items.at(-1);

            if (item) {
              event.preventDefault();
              item.focus();
            }
          }

          if (event.key !== "Escape" && event.key !== "Tab") {
            event.stopPropagation();
          }
        }}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        autoFocus={autoFocus}
        {...props}
      />
    </div>
  );
}

function DropdownMenuEmpty({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const search = useDropdownMenuSearch();
  const show = search && search.query.trim().length > 0;

  if (!show) {
    return null;
  }

  return (
    <div
      data-slot="dropdown-menu-empty"
      className={cn(
        "text-muted-foreground w-full px-2 py-1.5 text-center text-sm group-has-data-[search-visible]/dropdown-menu-results:hidden",
        className,
      )}
      {...props}
    />
  );
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
};
