import * as React from "react"

import { cn } from "@gecko/ui/lib/utils"

function Label({
  className,
  htmlFor,
  children,
  ...props
}: React.ComponentProps<"label">) {
  const [showRequired, setShowRequired] = React.useState(false)

  React.useLayoutEffect(() => {
    if (!htmlFor) {
      setShowRequired(false)
      return
    }
    const control = document.getElementById(htmlFor)
    setShowRequired(control?.hasAttribute?.("required") ?? false)
  }, [htmlFor])

  return (
    <label
      data-slot="label"
      className={cn(
        "gap-1 text-xs leading-none font-medium flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:pointer-events-none peer-disabled:cursor-not-allowed",
        className
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
  )
}

export { Label }
