import * as React from "react"

import { cn } from "@/lib/utils"

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
        "gap-1 text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
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
