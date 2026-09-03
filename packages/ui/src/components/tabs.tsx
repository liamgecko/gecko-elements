"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@gecko/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu";
import { cn } from "@gecko/ui/lib/utils";

type TabsVariant = "default" | "line";

type TabsContextValue = {
  orientation: TabsPrimitive.Root.Orientation;
  value: TabsPrimitive.Tab.Value;
  variant: TabsVariant;
};

const TabsContext = React.createContext<TabsContextValue>({
  orientation: "horizontal",
  value: 0,
  variant: "default",
});

function getTabTextContent(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }
      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
        return getTabTextContent(child.props.children);
      }
      return "";
    })
    .join(" ");
}

type TabsProps = TabsPrimitive.Root.Props & {
  variant?: TabsVariant;
};

function Tabs({
  className,
  children,
  defaultValue = 0,
  onValueChange,
  orientation = "horizontal",
  value: controlledValue,
  variant = "default",
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState<TabsPrimitive.Tab.Value>(defaultValue);
  const value =
    controlledValue === undefined ? uncontrolledValue : controlledValue;
  const contextValue = React.useMemo(
    () => ({ orientation, value, variant }),
    [orientation, value, variant],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        data-variant={variant}
        className={cn(
          "gap-4 group/tabs flex data-horizontal:flex-col",
          className,
        )}
        defaultValue={defaultValue}
        onValueChange={(nextValue, eventDetails) => {
          if (controlledValue === undefined) {
            setUncontrolledValue(nextValue);
          }
          onValueChange?.(nextValue, eventDetails);
        }}
        {...props}
        value={controlledValue}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsContext.Provider>
  );
}

const tabsListVariants = cva(
  "group-data-horizontal/tabs:h-10 group/tabs-list text-muted-foreground relative isolate inline-flex items-center justify-center group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
      variant: {
        default:
          "rounded-full bg-muted p-1 group-data-vertical/tabs:rounded-[calc(var(--radius)*2.5)]",
        line: "gap-1 rounded-none justify-start bg-transparent px-0 py-1 group-data-horizontal/tabs:w-full group-data-horizontal/tabs:border-b group-data-horizontal/tabs:border-border group-data-vertical/tabs:border-e group-data-vertical/tabs:border-border",
      },
    },
    defaultVariants: {
      variant: "default",
      fullWidth: false,
    },
  },
);

type TabsListProps = TabsPrimitive.List.Props &
  Omit<VariantProps<typeof tabsListVariants>, "variant"> & {
    fullWidth?: boolean;
    /** Moves trailing tabs into an overflow menu when the horizontal list runs out of space. */
    overflow?: boolean;
  };

function TabsList({
  className,
  children,
  fullWidth = false,
  overflow = false,
  ...props
}: TabsListProps) {
  const { orientation, value, variant } = React.useContext(TabsContext);

  if (overflow && orientation === "horizontal") {
    const overflowKey = React.Children.toArray(children)
      .map((child) => {
        if (!React.isValidElement<TabsPrimitive.Tab.Props>(child)) return "";
        return `${String(child.key)}:${String(child.props.value)}:${getTabTextContent(child.props.children)}`;
      })
      .join("|");

    return (
      <TabsOverflowList
        key={overflowKey}
        className={className}
        {...props}
        value={value}
        variant={variant}
      >
        {children}
      </TabsOverflowList>
    );
  }

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      data-full-width={fullWidth}
      className={cn(tabsListVariants({ variant, fullWidth }), className)}
      {...props}
    >
      {children}
      <TabsIndicator variant={variant} />
    </TabsPrimitive.List>
  );
}

type OverflowTab = React.ReactElement<TabsPrimitive.Tab.Props>;

function TabsOverflowList({
  className,
  children,
  value,
  variant,
  ...props
}: TabsPrimitive.List.Props & {
  value: TabsPrimitive.Tab.Value;
  variant: TabsVariant;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const overflowTriggerRef = React.useRef<HTMLButtonElement>(null);
  const naturalWidthsRef = React.useRef<number[]>([]);
  const tabs = React.useMemo(
    () =>
      React.Children.toArray(children).filter((child): child is OverflowTab =>
        React.isValidElement(child),
      ),
    [children],
  );
  const [visibleCount, setVisibleCount] = React.useState(tabs.length);

  const computeVisibleCount = React.useCallback(() => {
    const container = containerRef.current;
    const overflowTrigger = overflowTriggerRef.current;
    if (!container || !overflowTrigger) return;

    const renderedTabs = Array.from(
      container.querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"]'),
    );

    renderedTabs.forEach((tab, index) => {
      if (!tab.hidden) {
        naturalWidthsRef.current[index] = tab.getBoundingClientRect().width;
      }
    });

    const widths = tabs.map((_, index) => naturalWidthsRef.current[index]);
    if (tabs.length === 0) {
      setVisibleCount(0);
      return;
    }
    if (widths.some((width) => !width)) return;

    const styles = getComputedStyle(container);
    const gap = Number.parseFloat(styles.columnGap || "0") || 0;
    const availableWidth =
      container.clientWidth -
      (Number.parseFloat(styles.paddingInlineStart) || 0) -
      (Number.parseFloat(styles.paddingInlineEnd) || 0);
    const tabsWidth = widths.reduce((total, width) => total + width, 0);
    const tabsGaps = Math.max(0, tabs.length - 1) * gap;

    if (tabsWidth + tabsGaps <= availableWidth) {
      setVisibleCount(tabs.length);
      return;
    }

    const overflowWidth = overflowTrigger.getBoundingClientRect().width;
    let usedWidth = overflowWidth;
    let nextVisibleCount = 0;

    for (const width of widths) {
      const nextWidth = usedWidth + gap + width;
      if (nextWidth > availableWidth) break;
      usedWidth = nextWidth;
      nextVisibleCount += 1;
    }

    setVisibleCount(Math.min(Math.max(nextVisibleCount, 1), tabs.length - 1));
  }, [tabs]);

  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(computeVisibleCount);
    observer.observe(container);
    const frame = requestAnimationFrame(computeVisibleCount);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [computeVisibleCount]);

  const overflowTabs = tabs.slice(visibleCount);
  const hasOverflow = overflowTabs.length > 0;
  const activeTabIsOverflowed = overflowTabs.some(
    (tab) => tab.props.value === value,
  );

  const activateTab = React.useCallback((index: number) => {
    const tabs = containerRef.current?.querySelectorAll<HTMLElement>(
      '[data-slot="tabs-trigger"]',
    );
    tabs?.[index]?.click();
  }, []);

  return (
    <div
      ref={containerRef}
      data-slot="tabs-overflow-list"
      data-variant={variant}
      data-full-width="false"
      data-overflow="true"
      className={cn(
        "group/tabs-list text-muted-foreground relative isolate flex h-10 w-full items-center justify-start",
        variant === "default" && "rounded-full bg-muted p-1",
        variant === "line" && "gap-1 border-b border-border bg-transparent",
        className,
      )}
    >
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(
          "relative flex h-full min-w-0 items-center",
          variant === "line" && "gap-1 py-1",
        )}
        {...props}
      >
        {tabs.map((tab, index) =>
          React.cloneElement(tab, {
            hidden: index >= visibleCount,
          }),
        )}
        <TabsIndicator variant={variant} />
      </TabsPrimitive.List>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              ref={overflowTriggerRef}
              type="button"
              variant="ghost"
              size="icon"
              aria-label="More tabs"
              data-active={activeTabIsOverflowed || undefined}
              className={cn(
                "relative z-10 ms-auto shrink-0",
                variant === "default" && "rounded-full",
                !hasOverflow && "invisible absolute pointer-events-none",
                activeTabIsOverflowed &&
                  variant === "default" &&
                  "bg-background shadow-sm dark:bg-secondary",
                activeTabIsOverflowed &&
                  variant === "line" &&
                  "after:bg-foreground after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5",
              )}
            >
              <MoreHorizontalIcon aria-hidden="true" />
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuRadioGroup value={value}>
            {overflowTabs.map((tab, overflowIndex) => {
              const index = visibleCount + overflowIndex;
              return (
                <DropdownMenuRadioItem
                  key={tab.key ?? String(tab.props.value)}
                  value={tab.props.value}
                  disabled={tab.props.disabled}
                  closeOnClick
                  onClick={() => activateTab(index)}
                >
                  {tab.props.children}
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function TabsIndicator({ variant }: { variant: TabsVariant }) {
  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      className={cn(
        "pointer-events-none absolute z-0 transition-[left,top,width,height] duration-200 ease-out motion-reduce:transition-none",
        variant === "default" &&
          "left-[var(--active-tab-left)] top-[var(--active-tab-top)] h-[var(--active-tab-height)] w-[var(--active-tab-width)] rounded-full bg-background shadow-sm dark:bg-secondary",
        variant === "line" &&
          "bg-foreground data-horizontal:bottom-[-1px] data-horizontal:left-[var(--active-tab-left)] data-horizontal:h-0.5 data-horizontal:w-[var(--active-tab-width)] data-vertical:top-[var(--active-tab-top)] data-vertical:-inset-e-px data-vertical:h-[var(--active-tab-height)] data-vertical:w-0.5",
      )}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "gap-1.5 rounded-sm border border-transparent px-3 py-1.5 text-sm font-medium group-data-[variant=default]/tabs-list:rounded-full group-data-[variant=default]/tabs-list:data-active:shadow-none [&_svg:not([class*='size-'])]:size-4 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground hover:text-foreground relative z-10 inline-flex h-[calc(100%-1px)] flex-none items-center justify-center whitespace-nowrap transition-colors motion-reduce:transition-none group-data-[full-width=true]/tabs-list:flex-1 group-data-vertical/tabs:w-full group-data-vertical/tabs:group-data-[variant=line]/tabs-list:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:pointer-events-none aria-disabled:opacity-75 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "text-sm flex-1 outline-none group-data-horizontal/tabs:group-data-[variant=default]/tabs:px-1",
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
