import { Inbox } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@gecko/ui/components/empty"

export default function FormVisibilityPage() {
  return (
    <Empty>
      <EmptyMedia variant="icon">
        <Inbox />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No visibility yet</EmptyTitle>
        <EmptyDescription>
          Content for this area is coming soon.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
