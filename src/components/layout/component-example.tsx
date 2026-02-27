import { cn } from "@/lib/utils"

type ComponentExampleProps = {
  children: React.ReactNode
  className?: string
}

export function ComponentExample({
  children,
  className,
}: ComponentExampleProps) {
  return (
    <div
      className={cn(
        "rounded-md border border-border p-8",
        className
      )}
    >
      {children}
    </div>
  )
}
