"use client";

import * as React from "react";

import { cn } from "@gecko/ui/lib/utils";

function Label({
  className,
  htmlFor,
  children,
  ...props
}: React.ComponentProps<"label">) {
  const [showRequired, setShowRequired] = React.useState(false);

  React.useLayoutEffect(() => {
    if (!htmlFor) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync required marker from associated control
      setShowRequired(false);
      return;
    }

    const control = document.getElementById(htmlFor);
    const syncRequired = () => {
      setShowRequired(control?.hasAttribute("required") ?? false);
    };

    syncRequired();

    if (!control) return;

    const observer = new MutationObserver(syncRequired);
    observer.observe(control, {
      attributes: true,
      attributeFilter: ["required"],
    });

    return () => observer.disconnect();
  }, [htmlFor]);

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
      {showRequired && (
        <span className="text-destructive" aria-hidden>
          *
        </span>
      )}
    </label>
  );
}

function ControlLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return <Label className={cn("text-sm", className)} {...props} />;
}

export { Label, ControlLabel };
