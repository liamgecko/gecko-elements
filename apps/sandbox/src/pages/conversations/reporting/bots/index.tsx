import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";
import Inbox from "@hugeicons/core-free-icons/InboxIcon";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@geckolabs/elements/components/empty"

export default function ConversationsReportingBotsPage() {
  return (
    <Empty>
      <EmptyMedia variant="icon">
        <HugeiconsIcon icon={Inbox} />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>No bots yet</EmptyTitle>
        <EmptyDescription>
          Content for this area is coming soon.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
