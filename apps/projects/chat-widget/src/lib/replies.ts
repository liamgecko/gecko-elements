import type { AgentProfile, AgentType } from "./types"

export const AGENT_PROFILES: Record<AgentType, AgentProfile> = {
  ai: {
    type: "ai",
    name: "Gecko AI",
    roleLabel: "AI assistant",
    avatarSrc: "https://github.com/shadcn.png",
    avatarFallback: "AI",
  },
  agent: {
    type: "agent",
    name: "Sarah Anderson",
    roleLabel: "Admissions advisor",
    avatarSrc:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    avatarFallback: "SA",
  },
}

export function getGreeting(visitorName: string, agent: AgentProfile) {
  const firstName = visitorName.trim().split(/\s+/)[0] || "there"

  if (agent.type === "ai") {
    return `Hi ${firstName}! I'm ${agent.name}. Ask me anything about programmes, applications, or campus life — I'll stream a reply into the space below your message.`
  }

  return `Hi ${firstName}! I'm ${agent.name}, your ${agent.roleLabel.toLowerCase()}. How can I help you today?`
}

export function getReply(userText: string, agent: AgentProfile) {
  const trimmed = userText.trim()

  if (agent.type === "ai") {
    return [
      `Thanks for asking about “${trimmed}”.`,
      "",
      "That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and the viewport stays put while tokens arrive below the anchored turn — so users see the reply grow in place without the thread jumping around.",
      "",
      "The important part: `scrollAnchor` on the user message settles that turn near the top instead of blindly snapping to the document bottom. Streaming continues offscreen when it runs out of room, and `MessageScrollerButton` appears so you can jump back when you're ready.",
      "",
      "If you've scrolled up to re-read an older answer, your place stays put even as new tokens keep arriving below. Same pattern as Slack or iMessage: quiet when you're caught up, helpful when you're not.",
    ].join("\n")
  }

  return `Thanks for reaching out about “${trimmed}”. I've noted that and a teammate can follow up with more detail shortly. Is there anything else I can help with right now?`
}
