import { cn } from "@/lib/utils"

type PageOverviewHeaderProps = {
  title: string
  description: React.ReactNode
  className?: string
}

type PageSectionHeaderProps = {
  title: string
  description: React.ReactNode
  className?: string
}

type PageSubsectionHeaderProps = {
  id?: string
  title: string
  description: React.ReactNode
  className?: string
}

export function PageOverviewHeader({
  title,
  description,
  className,
}: PageOverviewHeaderProps) {
  return (
    <div className={cn(className)}>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export function PageSectionHeader({
  title,
  description,
  className,
}: PageSectionHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export function PageSubsectionHeader({
  id,
  title,
  description,
  className,
}: PageSubsectionHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      <h3 id={id} className="text-base font-semibold">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
