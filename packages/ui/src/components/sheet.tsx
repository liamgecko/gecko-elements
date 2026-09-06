"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@gecko/ui/lib/utils";
import { Button } from "@gecko/ui/components/button";
import { ScrollArea } from "@gecko/ui/components/scroll-area";
import XIcon from "@hugeicons/core-free-icons/XIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-backdrop duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs motion-reduce:animate-none fixed inset-0 z-50",
        className,
      )}
      {...props}
    />
  );
}

const sheetVariants = cva(
  "fixed z-50 flex flex-col gap-4 overflow-hidden rounded-lg bg-background ring-1 ring-overlay-border text-sm shadow-lg transition duration-200 ease-in-out data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 motion-reduce:animate-none motion-reduce:transition-none pt-4",
  {
    variants: {
      side: {
        top: "data-[side=top]:inset-x-2 data-[side=top]:top-2 data-[side=top]:h-auto data-[side=top]:max-h-[calc(100dvh-1rem)] data-[side=top]:w-auto data-[side=top]:pb-4 data-[side=top]:data-closed:slide-out-to-top-10 data-[side=top]:data-open:slide-in-from-top-10",
        bottom:
          "data-[side=bottom]:inset-x-2 data-[side=bottom]:bottom-2 data-[side=bottom]:h-auto data-[side=bottom]:max-h-[calc(100dvh-1rem)] data-[side=bottom]:w-auto data-[side=bottom]:pb-4 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=bottom]:data-open:slide-in-from-bottom-10",
        left: "data-[side=left]:top-2 data-[side=left]:bottom-2 data-[side=left]:left-2 data-[side=left]:max-h-[calc(100dvh-1rem)] data-[side=left]:w-[calc(100vw-1rem)] data-[side=left]:data-closed:slide-out-to-left-10 data-[side=left]:data-open:slide-in-from-left-10",
        right:
          "data-[side=right]:top-2 data-[side=right]:bottom-2 data-[side=right]:right-2 data-[side=right]:max-h-[calc(100dvh-1rem)] data-[side=right]:w-[calc(100vw-1rem)] data-[side=right]:data-closed:slide-out-to-right-10 data-[side=right]:data-open:slide-in-from-right-10",
      },
      size: {
        sm: "data-[side=left]:data-[size=sm]:max-w-sm data-[side=right]:data-[size=sm]:max-w-sm",
        md: "data-[side=left]:data-[size=md]:max-w-lg data-[side=right]:data-[size=md]:max-w-lg",
        lg: "data-[side=left]:data-[size=lg]:max-w-2xl data-[side=right]:data-[size=lg]:max-w-2xl",
        xl: "data-[side=left]:data-[size=xl]:max-w-4xl data-[side=right]:data-[size=xl]:max-w-4xl",
        full: "data-[side=left]:data-[size=full]:max-w-[calc(100vw-1rem)] data-[side=right]:data-[size=full]:max-w-[calc(100vw-1rem)]",
      },
    },
    defaultVariants: {
      side: "right",
      size: "md",
    },
  },
);

type SheetContentProps = SheetPrimitive.Popup.Props &
  VariantProps<typeof sheetVariants> & {
    showCloseButton?: boolean;
    hideOverlay?: boolean;
  };

function SheetContent({
  className,
  children,
  side = "right",
  size = "md",
  showCloseButton = true,
  hideOverlay = false,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      {!hideOverlay && <SheetOverlay />}
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        data-size={size}
        className={cn(sheetVariants({ side, size }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-4 inset-e-4"
                size="icon-sm"
              />
            }
          >
            <HugeiconsIcon icon={XIcon} aria-hidden="true" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("gap-1 px-4 flex flex-col", className)}
      {...props}
    />
  );
}

function SheetBody({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollArea>) {
  return (
    <ScrollArea
      data-slot="sheet-body"
      className={cn("min-h-0 flex-1", className)}
      {...props}
    >
      <div className="px-4 pb-4">{children}</div>
    </ScrollArea>
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("gap-2 p-4 mt-auto flex flex-col", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold text-lg", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
