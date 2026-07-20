import { getDraftTextParts } from "./live-chat-mentions"

type LiveChatMessageBodyProps = {
  text: string
}

export function LiveChatMessageBody({ text }: LiveChatMessageBodyProps) {
  const parts = getDraftTextParts(text)

  return (
    <p className="whitespace-pre-wrap">
      {parts.map((part, index) =>
        part.type === "mention" ? (
          <span key={index} className="font-medium">
            {part.value}
          </span>
        ) : (
          <span key={index}>{part.value}</span>
        ),
      )}
    </p>
  )
}
