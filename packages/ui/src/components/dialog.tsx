"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@gecko/ui/lib/utils";
import { Button } from "@gecko/ui/components/button";
import XIcon from "@hugeicons/core-free-icons/XIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

type DialogSize = "xs" | "sm" | "md" | "lg" | "xl";

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-backdrop duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  size = "md",
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  size?: DialogSize;
}) {
  const sizeClass =
    size === "xs"
      ? "sm:max-w-md"
      : size === "sm"
        ? "sm:max-w-xl"
        : size === "md"
          ? "sm:max-w-2xl"
          : size === "lg"
            ? "sm:max-w-4xl"
            : size === "xl"
              ? "sm:max-w-6xl"
              : undefined;

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        data-size={size}
        className={cn(
          "bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-overlay-border fixed top-1/2 start-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl text-sm ring-1 duration-100 outline-none rtl:translate-x-1/2",
          sizeClass,
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-4 end-4"
                size="icon-sm"
                type="button"
              />
            }
          >
            <HugeiconsIcon icon={XIcon} aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogWrapper({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-wrapper"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-6 py-6",
        className,
      )}
      {...props}
    />
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-1.5 text-center sm:text-start",
        className,
      )}
      {...props}
    />
  );
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-body" className={cn(className)} {...props} />;
}

type DialogFooterProps = React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
  closeButtonText?: string;
};

function DialogFooter({
  className,
  showCloseButton = false,
  closeButtonText = "Close",
  children,
  ...props
}: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "border-t border-border px-6 py-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    >
      {showCloseButton && (
        <DialogPrimitive.Close
          render={
            <Button variant="outline" type="button">
              {closeButtonText}
            </Button>
          }
        />
      )}
      {children}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogWrapper,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
