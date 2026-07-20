import { LIVE_CHAT_PEOPLE, type LiveChatPerson } from "./live-chat-people"

export type MentionRange = {
  query: string
  start: number
  end: number
}

export function getMentionAtCursor(
  value: string,
  cursor: number,
  people: LiveChatPerson[] = LIVE_CHAT_PEOPLE,
): MentionRange | null {
  const beforeCursor = value.slice(0, cursor)
  const match = beforeCursor.match(/(?:^|\s)@([^@]*)$/)

  if (!match) {
    return null
  }

  const query = match[1] ?? ""

  if (shouldCloseMentionQuery(query, people)) {
    return null
  }

  return {
    query,
    start: beforeCursor.length - query.length - 1,
    end: cursor,
  }
}

function shouldCloseMentionQuery(query: string, people: LiveChatPerson[]) {
  const trimmedQuery = query.trimEnd().toLowerCase()

  if (query.endsWith(" ")) {
    const exactMatch = people.some(
      (person) => person.name.toLowerCase() === trimmedQuery,
    )

    if (exactMatch) {
      return true
    }
  }

  return people.some((person) => {
    const name = person.name.toLowerCase()
    const normalizedQuery = query.toLowerCase()

    return (
      normalizedQuery.startsWith(`${name} `) &&
      normalizedQuery.length > name.length + 1
    )
  })
}

export function insertMention(
  value: string,
  mention: MentionRange,
  personName: string,
) {
  const before = value.slice(0, mention.start)
  const after = value.slice(mention.end)
  const insertion = `@${personName} `
  const nextValue = `${before}${insertion}${after}`
  const nextCursor = before.length + insertion.length

  return { nextValue, nextCursor }
}

export function filterPeopleByMentionQuery(
  query: string,
  people: { id: string; name: string }[],
) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return people
  }

  return people.filter((person) =>
    person.name.toLowerCase().includes(normalizedQuery),
  )
}

export type DraftTextPart = {
  type: "text" | "mention"
  value: string
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function getDraftTextParts(
  text: string,
  people: LiveChatPerson[] = LIVE_CHAT_PEOPLE,
): DraftTextPart[] {
  if (!text) {
    return []
  }

  const names = [...people].sort((a, b) => b.name.length - a.name.length)
  const pattern = new RegExp(
    `@(${names.map((person) => escapeRegex(person.name)).join("|")})(?=\\s|$)`,
    "g",
  )

  const parts: DraftTextPart[] = []
  let lastIndex = 0

  for (const match of text.matchAll(pattern)) {
    const matchIndex = match.index ?? 0

    if (matchIndex > lastIndex) {
      parts.push({
        type: "text",
        value: text.slice(lastIndex, matchIndex),
      })
    }

    parts.push({
      type: "mention",
      value: match[0],
    })
    lastIndex = matchIndex + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      value: text.slice(lastIndex),
    })
  }

  return parts.length > 0 ? parts : [{ type: "text", value: text }]
}

export function getMentionedNames(text: string, people: LiveChatPerson[] = LIVE_CHAT_PEOPLE) {
  return getDraftTextParts(text, people)
    .filter((part) => part.type === "mention")
    .map((part) => part.value.slice(1))
}
