"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@gecko/ui/lib/utils";

type TabsVariant = "default" | "line";

const TabsVariantContext = React.createContext<TabsVariant>("default");

type TabsProps = TabsPrimitive.Root.Props & {
  variant?: TabsVariant;
};

function Tabs({
  className,
  children,
  orientation = "horizontal",
  variant = "default",
  ...props
}: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        data-variant={variant}
        className={cn(
          "gap-4 group/tabs flex data-horizontal:flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsVariantContext.Provider>
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
  };

function TabsList({
  className,
  children,
  fullWidth = false,
  ...props
}: TabsListProps) {
  const variant = React.useContext(TabsVariantContext);

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      data-full-width={fullWidth}
      className={cn(tabsListVariants({ variant, fullWidth }), className)}
      {...props}
    >
      {children}
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
    </TabsPrimitive.List>
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
