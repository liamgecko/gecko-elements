import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@gecko/ui/lib/utils"

type TabsProps = TabsPrimitive.Root.Props & {
  variant?: "default" | "line"
}

function Tabs({
  className,
  orientation = "horizontal",
  variant = "default",
  ...props
}: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      data-variant={variant}
      className={cn(
        "gap-2 group/tabs flex data-horizontal:flex-col",
        "data-[variant=line]:border-b data-[variant=line]:border-border",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "rounded-md p-1 group-data-horizontal/tabs:h-10 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex items-center justify-center group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      fullWidth: false,
    },
  }
)

type TabsListProps = TabsPrimitive.List.Props &
  VariantProps<typeof tabsListVariants> & {
    fullWidth?: boolean
  }

function TabsList({
  className,
  variant = "default",
  fullWidth = false,
  ...props
}: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      data-full-width={fullWidth}
      className={cn(tabsListVariants({ variant, fullWidth }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "gap-1.5 rounded-sm border border-transparent px-3 py-1.5 text-sm font-medium group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg:not([class*='size-'])]:size-4 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:pointer-events-none aria-disabled:opacity-75 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground",
        // Line variant hover underline (same as active, simple transition)
        "group-data-[variant=line]/tabs-list:before:bg-foreground group-data-[variant=line]/tabs-list:before:absolute group-data-[variant=line]/tabs-list:before:opacity-0 group-data-[variant=line]/tabs-list:before:transition-opacity group-data-[variant=line]/tabs-list:before:duration-200",
        "group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:before:inset-x-0 group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:before:bottom-[-7px] group-data-horizontal/tabs:group-data-[variant=line]/tabs-list:before:h-0.5",
        "group-data-vertical/tabs:group-data-[variant=line]/tabs-list:before:inset-y-0 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:before:-inset-e-1 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:before:w-0.5",
        "group-data-[variant=line]/tabs-list:hover:before:opacity-100 group-data-[variant=line]/tabs-list:data-active:before:opacity-0",

        // Active underline
        "after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-7px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-inset-e-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("text-sm flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
