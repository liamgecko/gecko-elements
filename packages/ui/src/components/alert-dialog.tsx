import { withRef } from "@gecko/ui/lib/with-ref";
import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

import { cn } from "@gecko/ui/lib/utils";
import { modalSurfaceClassName } from "@gecko/ui/lib/modal-surface";
import { Button } from "@gecko/ui/components/button";

export type AlertDialogVariant = "destructive";

const AlertDialogContext = React.createContext<{
  variant?: AlertDialogVariant;
} | null>(null);

function useAlertDialogContext() {
  return React.useContext(AlertDialogContext);
}

function AlertDialog({
  variant,
  ...props
}: AlertDialogPrimitive.Root.Props & {
  variant?: AlertDialogVariant;
}) {
  const value = React.useMemo(
    () => (variant != null ? { variant } : { variant: undefined }),
    [variant],
  );
  return (
    <AlertDialogContext.Provider value={value}>
      <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
    </AlertDialogContext.Provider>
  );
}

const AlertDialogTrigger = /* @__PURE__ */ withRef(function AlertDialogTrigger({
  ...props
}: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
});

const AlertDialogPortal = /* @__PURE__ */ withRef(function AlertDialogPortal({
  ...props
}: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
});

const AlertDialogOverlay = /* @__PURE__ */ withRef(function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-backdrop duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50",
        className,
      )}
      {...props}
    />
  );
});

const AlertDialogContent = /* @__PURE__ */ withRef(function AlertDialogContent({
  className,
  ...props
}: AlertDialogPrimitive.Popup.Props) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        className={cn(
          modalSurfaceClassName,
          "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 gap-6 p-6 duration-100 max-w-xs sm:max-w-lg fixed top-1/2 start-1/2 z-50 grid w-full -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 outline-none",
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
});

const AlertDialogHeader = /* @__PURE__ */ withRef(function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center sm:place-items-start sm:text-start",
        className,
      )}
      {...props}
    />
  );
});

const AlertDialogFooter = /* @__PURE__ */ withRef(function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
});

const AlertDialogTitle = /* @__PURE__ */ withRef(function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
});

const AlertDialogDescription = /* @__PURE__ */ withRef(
  function AlertDialogDescription({
    className,
    ...props
  }: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
    return (
      <AlertDialogPrimitive.Description
        data-slot="alert-dialog-description"
        className={cn(
          "text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3",
          className,
        )}
        {...props}
      />
    );
  },
);

const AlertDialogAction = /* @__PURE__ */ withRef(function AlertDialogAction({
  className,
  variant,
  size = "default",
  ...props
}: AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  const ctx = useAlertDialogContext();
  const defaultVariant =
    ctx?.variant === "destructive" ? "destructive" : "default";
  const resolvedVariant = variant ?? defaultVariant;
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-action"
      className={cn(className)}
      render={<Button variant={resolvedVariant} size={size} />}
      {...props}
    />
  );
});

const AlertDialogCancel = /* @__PURE__ */ withRef(function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  );
});

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
