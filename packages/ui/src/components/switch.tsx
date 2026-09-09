"use client";
import { withRef } from "@gecko/ui/lib/with-ref";

import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { ControlLabel } from "@gecko/ui/components/label";
import { cn } from "@gecko/ui/lib/utils";

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
        "data-checked:bg-switch-checked data-unchecked:bg-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:focus-visible:ring-input-destructive/20 dark:aria-invalid:focus-visible:ring-input-destructive/40 aria-invalid:border-input-destructive aria-invalid:bg-input-destructive shrink-0 rounded-full border border-transparent shadow-xs dark:shadow-none focus-visible:ring-3 aria-invalid:focus-visible:ring-3 data-[size=default]:h-5 data-[size=default]:w-10 data-[size=sm]:h-4 data-[size=sm]:w-8 data-[size=lg]:h-6 data-[size=lg]:w-12 peer group/switch relative inline-flex items-center transition-[background-color,border-color,box-shadow] outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-75 cursor-pointer",
        !label && !description && "me-1",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="bg-switch-indicator shadow-md dark:shadow-none rounded-full ms-px group-data-[size=default]/switch:h-4 group-data-[size=default]/switch:w-[22px] group-data-[size=sm]/switch:h-3 group-data-[size=sm]/switch:w-[16.5px] group-data-[size=lg]/switch:h-5 group-data-[size=lg]/switch:w-[27.5px] group-data-[size=default]/switch:data-checked:translate-x-[14px] rtl:group-data-[size=default]/switch:data-checked:-translate-x-[14px] group-data-[size=sm]/switch:data-checked:translate-x-[11.5px] rtl:group-data-[size=sm]/switch:data-checked:-translate-x-[11.5px] group-data-[size=lg]/switch:data-checked:translate-x-[16.5px] rtl:group-data-[size=lg]/switch:data-checked:-translate-x-[16.5px] group-data-[size=default]/switch:data-unchecked:translate-x-0 rtl:group-data-[size=default]/switch:data-unchecked:-translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 rtl:group-data-[size=sm]/switch:data-unchecked:-translate-x-0 group-data-[size=lg]/switch:data-unchecked:translate-x-0 rtl:group-data-[size=lg]/switch:data-unchecked:-translate-x-0 pointer-events-none block ring-0 transition-transform"
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
