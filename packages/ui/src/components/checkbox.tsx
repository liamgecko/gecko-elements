import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import { cva } from "class-variance-authority";

import { cn } from "@gecko/ui/lib/utils";
import { CheckIcon, Minus } from "lucide-react";

const defaultCheckboxStyles =
  "border-input hover:border-input-hover group-hover/field:border-input-hover group-hover/checkbox:border-input-hover bg-background data-checked:bg-primary data-checked:text-primary-foreground data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-input-destructive group-aria-invalid/checkbox-group:border-input-destructive focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-input-destructive/0 focus-visible:aria-invalid:ring-input-destructive/20 dark:focus-visible:aria-invalid:ring-input-destructive/40 group-aria-invalid/checkbox-group:focus-visible:ring-input-destructive/20 dark:group-aria-invalid/checkbox-group:focus-visible:ring-input-destructive/40 flex size-4 items-center justify-center rounded-sm cursor-pointer border transition-[color,box-shadow,border] focus-visible:ring-3 peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:border-input disabled:group-hover/field:border-input disabled:group-hover/checkbox:border-input";

const asButtonCheckboxVariants = cva(
  "border-border bg-background relative rounded-md border text-sm cursor-pointer p-3 transition-all focus-visible:ring-3 focus-visible:border-ring focus-visible:ring-ring/50 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75 data-disabled:cursor-not-allowed data-disabled:pointer-events-none data-disabled:opacity-75 hover:bg-muted hover:border-gray-300 dark:hover:border-gray-700 hover:text-foreground disabled:hover:bg-background disabled:hover:border-border disabled:hover:text-foreground data-disabled:hover:bg-background data-disabled:hover:border-border data-disabled:hover:text-foreground data-checked:border-gray-300 dark:data-checked:border-gray-700 data-checked:bg-muted data-checked:text-foreground disabled:data-checked:hover:bg-muted disabled:data-checked:hover:border-gray-300 dark:disabled:data-checked:hover:border-gray-700 disabled:data-checked:hover:text-foreground data-disabled:data-checked:hover:bg-muted data-disabled:data-checked:hover:border-gray-300 dark:data-disabled:data-checked:hover:border-gray-700 data-disabled:data-checked:hover:text-foreground aria-invalid:border-input-destructive aria-invalid:hover:border-input-destructive aria-invalid:hover:text-destructive aria-invalid:hover:bg-destructive-muted aria-invalid:focus-visible:border-input-destructive focus-visible:aria-invalid:ring-input-destructive/20 dark:focus-visible:aria-invalid:ring-input-destructive/40 aria-invalid:data-checked:border-input-destructive dark:aria-invalid:data-checked:border-input-destructive aria-invalid:data-checked:bg-destructive-muted aria-invalid:data-checked:text-destructive-muted-foreground group-aria-invalid/checkbox-group:border-input-destructive group-aria-invalid/checkbox-group:hover:border-input-destructive group-aria-invalid/checkbox-group:hover:bg-destructive-muted group-aria-invalid/checkbox-group:hover:text-destructive group-aria-invalid/checkbox-group:focus-visible:border-input-destructive group-aria-invalid/checkbox-group:focus-visible:ring-input-destructive/20 dark:group-aria-invalid/checkbox-group:focus-visible:ring-input-destructive/40 group-aria-invalid/checkbox-group:data-checked:border-input-destructive group-aria-invalid/checkbox-group:data-checked:bg-destructive-muted group-aria-invalid/checkbox-group:data-checked:text-destructive-muted-foreground",
  {
    variants: {
      layout: {
        inline: "group/as-button inline-flex items-center gap-3 font-medium",
        description:
          "group/as-button grid w-fit grid-cols-[auto_1fr] items-start gap-x-3 gap-y-0.5 text-left",
      },
    },
    defaultVariants: {
      layout: "inline",
    },
  },
);

type CheckboxProps = CheckboxPrimitive.Root.Props & {
  asButton?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
};

type CheckboxGroupProps = CheckboxGroupPrimitive.Props & {
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** Lay out options in a row (wraps on narrow widths). */
  horizontal?: boolean;
};

function Checkbox({
  className,
  asButton,
  label,
  description,
  children,
  id: idProp,
  "aria-describedby": ariaDescribedBy,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: CheckboxProps) {
  const generatedId = React.useId();
  const inputId = idProp ?? generatedId;
  const labelId = `${inputId}-label`;
  const descriptionId = `${inputId}-description`;
  const labelContent = label ?? children;
  const labelledBy =
    [ariaLabelledBy, label && labelId].filter(Boolean).join(" ") || undefined;
  const describedBy =
    [ariaDescribedBy, description && descriptionId].filter(Boolean).join(" ") ||
    undefined;

  const baseClasses = cn(
    asButton
      ? asButtonCheckboxVariants({
          layout: description ? "description" : "inline",
        })
      : defaultCheckboxStyles,
    className,
  );

  if (asButton) {
    return (
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        data-as-button
        id={inputId}
        aria-labelledby={
          [ariaLabelledBy, labelContent && labelId].filter(Boolean).join(" ") ||
          undefined
        }
        aria-describedby={describedBy}
        className={baseClasses}
        {...props}
      >
        <span
          data-slot="checkbox-button-control"
          aria-hidden="true"
          className={cn(
            "border-input bg-background grid size-4 shrink-0 place-content-center rounded-sm border transition-shadow group-data-checked/as-button:border-primary group-data-checked/as-button:bg-primary group-data-checked/as-button:text-primary-foreground",
            description && "row-span-2 mt-0.5",
          )}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="grid place-content-center text-current [&_svg]:size-3.5"
          >
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </span>
        {labelContent && (
          <span
            id={labelId}
            className={cn(
              "font-medium leading-none",
              description && "col-start-2",
            )}
          >
            {labelContent}
          </span>
        )}
        {description && (
          <span
            id={descriptionId}
            className="text-muted-foreground col-start-2 text-2xs leading-normal"
          >
            {description}
          </span>
        )}
      </CheckboxPrimitive.Root>
    );
  }

  const control = (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      id={inputId}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={baseClasses}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none group/indicator [&_svg]:size-3.5"
      >
        <span className="grid place-content-center group-data-indeterminate/indicator:hidden">
          <CheckIcon aria-hidden="true" />
        </span>
        <span className="hidden place-content-center group-data-indeterminate/indicator:grid [&_svg]:size-3.5">
          <Minus aria-hidden="true" />
        </span>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (!label && !description) {
    return control;
  }

  return (
    <label
      data-disabled={props.disabled ? "true" : undefined}
      className={cn(
        "group/checkbox flex w-fit cursor-pointer gap-2 data-[disabled=true]:pointer-events-none data-[disabled=true]:cursor-not-allowed",
        description ? "items-start" : "items-center",
      )}
    >
      <div className={cn("flex shrink-0", description && "mt-0.5")}>
        {control}
      </div>
      <div className="flex flex-col gap-0.5 leading-snug">
        {label && (
          <span
            id={labelId}
            className="flex items-center gap-1 text-sm leading-none font-medium select-none group-data-[disabled=true]/checkbox:cursor-not-allowed group-data-[disabled=true]/checkbox:opacity-75"
          >
            {label}
            {props.required && (
              <span className="text-destructive" aria-hidden="true">
                *
              </span>
            )}
          </span>
        )}
        {description && (
          <p
            id={descriptionId}
            className="text-muted-foreground text-2xs leading-normal"
          >
            {description}
          </p>
        )}
      </div>
    </label>
  );
}

function CheckboxGroup({
  className,
  label,
  description,
  horizontal = false,
  id: idProp,
  disabled,
  "aria-invalid": ariaInvalid,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CheckboxGroupProps) {
  const generatedId = React.useId();
  const groupId = idProp ?? generatedId;
  const labelId = `${groupId}-label`;
  const descriptionId = `${groupId}-description`;
  const labelledBy =
    [ariaLabelledBy, label && labelId].filter(Boolean).join(" ") || undefined;
  const describedBy =
    [ariaDescribedBy, description && descriptionId].filter(Boolean).join(" ") ||
    undefined;

  return (
    <fieldset
      data-disabled={disabled ? "true" : undefined}
      data-invalid={ariaInvalid === true ? "true" : undefined}
      className="group/checkbox-fieldset flex flex-col"
    >
      {label && (
        <legend
          id={labelId}
          className="mb-2 flex items-center gap-1 text-sm leading-none font-medium select-none group-data-[disabled=true]/checkbox-fieldset:pointer-events-none group-data-[disabled=true]/checkbox-fieldset:cursor-not-allowed group-data-[disabled=true]/checkbox-fieldset:opacity-75"
        >
          {label}
        </legend>
      )}
      {description && (
        <p
          id={descriptionId}
          className="mb-3 text-sm leading-normal text-muted-foreground group-data-[disabled=true]/checkbox-fieldset:opacity-75"
        >
          {description}
        </p>
      )}
      <CheckboxGroupPrimitive
        data-slot="checkbox-group"
        data-orientation={horizontal ? "horizontal" : "vertical"}
        id={groupId}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className={cn(
          "group/checkbox-group",
          horizontal ? "flex flex-row flex-wrap gap-2" : "flex flex-col gap-3",
          className,
        )}
        {...props}
      />
    </fieldset>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- cva styles are intentionally exported from this module.
export { Checkbox, CheckboxGroup, asButtonCheckboxVariants };
