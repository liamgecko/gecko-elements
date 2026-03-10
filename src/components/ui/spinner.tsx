import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl"

const sizeClasses: Record<SpinnerSize, string> = {
  xs: "size-3",
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-10",
}

type SpinnerProps = React.ComponentProps<"svg"> & {
  size?: SpinnerSize
}

function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", sizeClasses[size], className)}
      {...props}
    />
  )
}

export { Spinner }
