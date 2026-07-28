export type AgentType = "agent" | "ai"

export type WidgetPhase = "form" | "conversation"

export type Visitor = {
  name: string
  email: string
  telephone?: string
}

export type ChatMessage = {
  id: string
  role: "user" | "assistant"
  text: string
}

export type AgentProfile = {
  type: AgentType
  name: string
  roleLabel: string
  avatarSrc?: string
  avatarFallback: string
}
