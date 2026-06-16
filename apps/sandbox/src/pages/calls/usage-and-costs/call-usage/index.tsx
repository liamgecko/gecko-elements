import { Inbox } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@gecko/ui/components/empty"

export default function CallsUsageCallUsagePage() {
  return (
    <Empty>
      <EmptyMedia variant="icon">
        <Inbox />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No call usage yet</EmptyTitle>
        <EmptyDescription>
          Content for this area is coming soon.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
