import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

const accordionVariants = cva("flex w-full flex-col", {
  variants: {
    variant: {
      default: "",
      layout: "gap-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const accordionItemVariants = cva("", {
  variants: {
    variant: {
      default: "not-last:border-b",
      layout:
        "rounded-md border border-border bg-background overflow-hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const accordionTriggerVariants = cva(
  "focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground py-4 text-start text-sm font-medium focus-visible:ring-3 **:data-[slot=accordion-trigger-icon]:ms-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-start justify-between items-center border border-transparent transition-all outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50 hover:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "rounded-md",
        layout:
          "rounded-none border-0 px-4 font-semibold text-foreground text-base",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const accordionContentVariants = cva(
  "data-open:animate-accordion-down data-closed:animate-accordion-up text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        layout: "bg-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const accordionContentInnerVariants = cva(
  "pt-0 pb-4 [&_a]:hover:text-foreground h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
  {
    variants: {
      variant: {
        default: "",
        layout: "px-4 pt-4 pb-4 border-t border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type AccordionVariant = NonNullable<
  VariantProps<typeof accordionVariants>["variant"]
>

const AccordionVariantContext = React.createContext<AccordionVariant>("default")

function useAccordionVariant() {
  return React.useContext(AccordionVariantContext)
}

function Accordion({
  className,
  variant = "default",
  ...props
}: AccordionPrimitive.Root.Props & VariantProps<typeof accordionVariants>) {
  const resolvedVariant = variant ?? "default"
  return (
    <AccordionVariantContext.Provider value={resolvedVariant}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        data-variant={resolvedVariant}
        className={cn(accordionVariants({ variant: resolvedVariant, className }))}
        {...props}
      />
    </AccordionVariantContext.Provider>
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  const variant = useAccordionVariant() ?? "default"
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  const variant = useAccordionVariant() ?? "default"
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(accordionTriggerVariants({ variant }), className)}
        {...props}
      >
        {children}
        <ChevronDownIcon data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  const variant = useAccordionVariant() ?? "default"
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(accordionContentVariants({ variant }))}
      {...props}
    >
      <div className={cn(accordionContentInnerVariants({ variant }), className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  accordionVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
}
