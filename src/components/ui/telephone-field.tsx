"use client"

import * as React from "react"
import * as RPNInput from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import { ChevronsUpDown, CheckIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuEmpty,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

const sizeVariants = cva("", {
  variants: {
    size: {
      sm: "h-7",
      md: "h-8",
      lg: "h-9",
    },
  },
  defaultVariants: { size: "md" },
})

type TelephoneFieldSize = VariantProps<typeof sizeVariants>["size"]

const TelephoneFieldSizeContext = React.createContext<TelephoneFieldSize>("md")
const TelephoneFieldInvalidContext = React.createContext<boolean>(false)

type TelephoneFieldProps = Omit<React.ComponentProps<"input">, "onChange" | "value" | "ref" | "size"> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void
    size?: TelephoneFieldSize
  }

type CountryEntry = { label: string; value: RPNInput.Country | undefined }

const TelephoneField: React.ForwardRefExoticComponent<TelephoneFieldProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, TelephoneFieldProps>(
    ({ className, onChange, value, size = "md", "aria-invalid": ariaInvalid, ...props }, ref) => {
      return (
        <TelephoneFieldSizeContext.Provider value={size}>
          <TelephoneFieldInvalidContext.Provider value={ariaInvalid === true}>
            <RPNInput.default
              ref={ref}
              className={cn("flex w-full", className)}
              flagComponent={FlagComponent}
              countrySelectComponent={CountrySelect}
              inputComponent={InputComponent}
              smartCaret={false}
              value={value || undefined}
              /**
               * react-phone-number-input can call onChange with undefined when the
               * value is cleared or invalid; coerce to empty string to keep the
               * value controlled as a string.
               */
              onChange={(nextValue) => onChange?.(nextValue || ("" as RPNInput.Value))}
              aria-invalid={ariaInvalid}
              {...props}
            />
          </TelephoneFieldInvalidContext.Provider>
        </TelephoneFieldSizeContext.Provider>
      )
    }
  )

TelephoneField.displayName = "TelephoneField"

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- omit size; RPNInput passes numeric size, Input expects sm/md/lg
  ({ className, size: _inputSize, ...props }, ref) => {
    const size = React.useContext(TelephoneFieldSizeContext)
    return (
      <Input
        ref={ref}
        size={size}
        className={cn(
          "rounded-e-sm rounded-s-none",
          className
        )}
        {...props}
      />
    )
  }
)

InputComponent.displayName = "TelephoneFieldInput"

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  options: CountryEntry[]
  onChange: (country: RPNInput.Country) => void
}

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const size = React.useContext(TelephoneFieldSizeContext)
  const invalid = React.useContext(TelephoneFieldInvalidContext)
  const selectedEntry = countryList.find((entry) => entry.value === selectedCountry)

  return (
    <DropdownMenu
      searchable
      searchPlaceholder="Search country..."
    >
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="secondary"
            className={cn(
              "flex gap-1 rounded-e-none rounded-s-sm border border-r-0 px-2 focus:z-10",
              "disabled:bg-muted",
              invalid ? "border-input-destructive" : "border-border",
              sizeVariants({ size })
            )}
            disabled={disabled}
          >
            <FlagComponent country={selectedCountry} countryName={selectedEntry?.label ?? ""} />
            <ChevronsUpDown
              className="-mr-1 size-3.5 opacity-50"
              aria-hidden
            />
          </Button>
        }
      />
      <DropdownMenuContent className="max-h-72 w-[260px]">
        {countryList.map(({ value, label }) =>
          value ? (
            <DropdownMenuItem
              key={value}
              searchValue={`${label ?? ""} +${RPNInput.getCountryCallingCode(value) ?? ""}`}
              onClick={() => onChange(value)}
            >
              <FlagComponent country={value} countryName={label} />
              <span className="flex-1 truncate">{label}</span>
              <span className="text-muted-foreground text-xs">
                {`+${RPNInput.getCountryCallingCode(value)}`}
              </span>
              <CheckIcon
                className={cn(
                  "ml-1 size-4 text-primary shrink-0",
                  value === selectedCountry ? "opacity-100" : "opacity-0"
                )}
              />
            </DropdownMenuItem>
          ) : null
        )}
        <DropdownMenuEmpty>No country found.</DropdownMenuEmpty>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = country ? flags[country] : undefined

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  )
}

export { TelephoneField }

