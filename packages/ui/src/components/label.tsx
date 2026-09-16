"use client";
import { withRef } from "@geckolabs/elements/lib/with-ref";

import * as React from "react";

import { cn } from "@geckolabs/elements/lib/utils";

type LabelProps = React.ComponentProps<"label"> & {
  /** Show the marker before an asynchronously loaded required control mounts. */
  required?: boolean;
  /** Internal: group controls render requiredness on their legend instead. */
  hideRequiredMarker?: boolean;
};

const Label = /* @__PURE__ */ withRef(function Label({
  className,
  htmlFor,
  children,
  required = false,
  hideRequiredMarker = false,
  ...props
}: LabelProps) {
  const [showRequired, setShowRequired] = React.useState(false);

  React.useLayoutEffect(() => {
    if (!htmlFor || hideRequiredMarker || required) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync required marker from associated control
      setShowRequired(false);
      return;
    }

    let control = document.getElementById(htmlFor);
    const syncRequired = () => {
      setShowRequired(
        control?.hasAttribute("required") === true ||
          control?.getAttribute("aria-required") === "true",
      );
    };

    syncRequired();

    const observer = new MutationObserver(syncRequired);
    const observeControl = () => {
      if (!control) return;
      observer.observe(control, {
        attributes: true,
        attributeFilter: ["required", "aria-required"],
      });
    };
    // A persistent label may mount before its control replaces a skeleton.
    const pendingControl = new MutationObserver(() => {
      control = document.getElementById(htmlFor);
      if (!control) return;
      pendingControl.disconnect();
      syncRequired();
      observeControl();
    });
    if (control) observeControl();
    else
      pendingControl.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      pendingControl.disconnect();
    };
  }, [hideRequiredMarker, htmlFor, required]);

  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-1 text-xs leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
      {!hideRequiredMarker && (required || showRequired) && (
        <span className="text-destructive" aria-hidden>
          *
        </span>
      )}
    </label>
  );
});

const ControlLabel = /* @__PURE__ */ withRef(function ControlLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return <Label className={cn("text-sm", className)} {...props} />;
});

export { Label, ControlLabel };
