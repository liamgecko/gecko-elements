"use client";
import { withRef } from "@geckolabs/elements/lib/with-ref";

import {
  switchTrackClasses,
  switchThumbClasses,
} from "@geckolabs/elements/lib/switch-styles";

import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { ControlLabel } from "@geckolabs/elements/components/label";
import { cn } from "@geckolabs/elements/lib/utils";

type SwitchProps = SwitchPrimitive.Root.Props & {
  size?: "sm" | "default" | "lg";
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** @default "after" */
  labelPosition?: "before" | "after";
};

const Switch = /* @__PURE__ */ withRef(function Switch({
  className,
  size = "default",
  label,
  description,
  labelPosition = "after",
  id: idProp,
  "aria-describedby": ariaDescribedBy,
  ...props
}: SwitchProps) {
  const generatedId = React.useId();
  const inputId = idProp ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const describedBy =
    [ariaDescribedBy, description && descriptionId].filter(Boolean).join(" ") ||
    undefined;

  const control = (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      id={inputId}
      aria-describedby={describedBy}
      className={cn(
        switchTrackClasses,
        !label && !description && "me-1",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={switchThumbClasses}
      />
    </SwitchPrimitive.Root>
  );

  if (!label && !description) {
    return control;
  }

  const labelClassName =
    "cursor-pointer select-none group-data-[disabled=true]/switch-field:cursor-not-allowed group-data-[disabled=true]/switch-field:opacity-75";

  if (description) {
    return (
      <div
        data-disabled={props.disabled ? "true" : undefined}
        className="group/switch-field flex gap-2 data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed items-start"
      >
        <div className="flex shrink-0 mt-0.5">{control}</div>
        <div className="flex flex-col gap-0.5 leading-snug">
          {label ? (
            <ControlLabel htmlFor={inputId} className={labelClassName}>
              {label}
            </ControlLabel>
          ) : null}
          <p
            id={descriptionId}
            className="text-muted-foreground text-2xs leading-normal"
          >
            {description}
          </p>
        </div>
      </div>
    );
  }

  const labelNode = (
    <ControlLabel
      htmlFor={inputId}
      className={cn(labelClassName, "whitespace-nowrap")}
    >
      {label}
    </ControlLabel>
  );

  return (
    <div
      data-disabled={props.disabled ? "true" : undefined}
      className="group/switch-field inline-flex shrink-0 items-center gap-2 data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed"
    >
      {labelPosition === "before" ? labelNode : null}
      {control}
      {labelPosition === "after" ? labelNode : null}
    </div>
  );
});

export { Switch };
