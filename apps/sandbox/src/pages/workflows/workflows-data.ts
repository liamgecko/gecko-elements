import type { DataTableRowAction } from "@gecko/ui/components/data-table/data-table"
import type { FilterCategory } from "@gecko/ui/components/filters"

export type WorkflowLockStatus =
  | "locked-view-only"
  | "locked-can-edit"
  | "unlocked"

export type WorkflowDbActionType =
  | "add-label"
  | "add-to-campaign"
  | "add-to-event"
  | "send-message"
  | "assign-agent"

export type WorkflowActionType =
  | WorkflowDbActionType
  | "add-label-to-conversation"
  | "add-note-to-contact"
  | "add-note-to-conversation"
  | "add-contact-to-event"
  | "add-contact-to-organisation"
  | "add-label-to-contact"
  | "add-to-broadcast"
  | "assign-conversation-to-agent-or-team"
  | "email"
  | "generate-document"
  | "invite-to-unibuddy-community"
  | "pass-to-ai-agent"
  | "remove-label-from-contact"
  | "sms"
  | "sync-to-crm"
  | "trigger-message-to-contact"
  | "update-contact-engagement-score"
  | "update-contact-field-contents"
  | "update-task-and-objective"

export type WorkflowActionOption = {
  value: WorkflowActionType
  label: string
}

export type WorkflowDbTriggerType =
  | "before-conversation"
  | "during-conversation"
  | "after-conversation-end"

export type WorkflowTriggerType =
  | WorkflowDbTriggerType
  | "conversation-reopened"

export type WorkflowTriggerOption = {
  value: WorkflowTriggerType
  label: string
}

export type WorkflowConditionField =
  | "current-time"
  | "day-of-week"
  | "date"
  | "agents-or-teams"
  | "referred-url"
  | "browser-language"
  | "device-type"
  | "current-page"
  | "number-of-page-visits"
  | "time-on-page"
  | "channel"
  | "channel-type"
  | "first-message"
  | "contact-field"
  | "contact-label"
  | "contact-engagement-score"
  | "contact-task-and-objective"
  | "country"
  | "city"
  | "state-or-region"

export type WorkflowChannelValue = "admissions-live-chat"

export const WORKFLOW_CHANNEL_OPTIONS: {
  value: WorkflowChannelValue
  label: string
}[] = [{ value: "admissions-live-chat", label: "Admissions live chat" }]

export type WorkflowConditionOption = {
  value: WorkflowConditionField
  label: string
}

export type WorkflowConditionGroup = {
  label: string
  items: WorkflowConditionOption[]
}

export type WorkflowAgentsOrTeamsOperator =
  | "are-available"
  | "are-not-available"

export type WorkflowAgentOrTeamOption = {
  value: string
  label: string
  initials: string
  avatarSrc?: string
}

export type WorkflowAgentOrTeamGroup = {
  value: string
  items: WorkflowAgentOrTeamOption[]
}

export const WORKFLOW_AGENTS_OR_TEAMS_OPERATOR_OPTIONS: {
  value: WorkflowAgentsOrTeamsOperator
  label: string
}[] = [
  { value: "are-available", label: "Are available" },
  { value: "are-not-available", label: "Are not available" },
]

export const WORKFLOW_AGENTS_AND_TEAMS_GROUPS: WorkflowAgentOrTeamGroup[] = [
  {
    value: "Agents",
    items: [
      {
        value: "agent-sarah-jenkins",
        label: "Sarah Jenkins",
        initials: "SJ",
        avatarSrc:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop",
      },
      {
        value: "agent-jonny-carter",
        label: "Jonny Carter",
        initials: "JC",
        avatarSrc:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop",
      },
      {
        value: "agent-liam-young",
        label: "Liam Young",
        initials: "LY",
        avatarSrc:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop",
      },
      {
        value: "agent-emma-wilson",
        label: "Emma Wilson",
        initials: "EW",
        avatarSrc:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop",
      },
      {
        value: "agent-james-patel",
        label: "James Patel",
        initials: "JP",
        avatarSrc:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop",
      },
      {
        value: "agent-mia-torres",
        label: "Mia Torres",
        initials: "MT",
        avatarSrc:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop",
      },
    ],
  },
  {
    value: "Teams",
    items: [
      { value: "team-admissions", label: "Admissions", initials: "AD" },
      { value: "team-international", label: "International", initials: "IN" },
      { value: "team-postgraduate", label: "Postgraduate", initials: "PG" },
      { value: "team-events", label: "Events support", initials: "EV" },
      { value: "team-clearing", label: "Clearing", initials: "CL" },
    ],
  },
]

export type WorkflowDelayType = "fixed" | "until-datetime"

export type WorkflowFixedDelayUnit = "Minutes" | "Hours"

export type WorkflowDelayOption = {
  value: WorkflowDelayType
  label: string
}

export const WORKFLOW_DELAY_OPTIONS: WorkflowDelayOption[] = [
  { value: "fixed", label: "Fixed delay" },
  { value: "until-datetime", label: "Until specific date/time" },
]

export const WORKFLOW_FIXED_DELAY_UNITS: {
  value: WorkflowFixedDelayUnit
  label: string
}[] = [
  { value: "Minutes", label: "Minutes" },
  { value: "Hours", label: "Hours" },
]

export type WorkflowNodeKind =
  | "trigger"
  | "condition"
  | "action"
  | "decision"
  | "delay"
  | "ai-agent"

export type WorkflowAiAgentId =
  | "admissions-assistant"
  | "enquiry-handler"
  | "international-advisor"
  | "clearing-support"
  | "campus-tour-guide"
  | "applicant-coach"

export type WorkflowAiAgentOption = {
  value: WorkflowAiAgentId
  label: string
}

export const WORKFLOW_AI_AGENT_OPTIONS: WorkflowAiAgentOption[] = [
  { value: "admissions-assistant", label: "Admissions assistant" },
  { value: "enquiry-handler", label: "Enquiry handler" },
  { value: "international-advisor", label: "International student advisor" },
  { value: "clearing-support", label: "Clearing support" },
  { value: "campus-tour-guide", label: "Campus tour guide" },
  { value: "applicant-coach", label: "Applicant coach" },
]

export type WorkflowGraphNodeData = {
  kind: WorkflowNodeKind
  triggerType?: WorkflowTriggerType
  actionType?: WorkflowActionType
  subtype?: WorkflowTriggerType | WorkflowActionType
  conditionField?: WorkflowConditionField
  channelValue?: WorkflowChannelValue
  agentsOrTeamsOperator?: WorkflowAgentsOrTeamsOperator
  agentOrTeamIds?: string[]
  aiAgentId?: WorkflowAiAgentId
  labelIds?: string[]
  delayType?: WorkflowDelayType
  fixedDelayAmount?: string
  fixedDelayUnit?: WorkflowFixedDelayUnit
  delayUntil?: string
  label?: string
  description?: string
  rule?: string
}

export type WorkflowDefinition = {
  nodes: Array<{
    id: string
    type: string
    position: { x: number; y: number }
    data: WorkflowGraphNodeData
  }>
  edges: Array<{
    id: string
    source: string
    target: string
    sourceHandle?: string | null
    targetHandle?: string | null
  }>
}

export type Workflow = {
  id: string
  name: string
  lockStatus: WorkflowLockStatus
  lockedBy?: string
  enabled: boolean
  lastRun: string | null
  actionType: WorkflowDbActionType
  triggerType: WorkflowDbTriggerType
  labelIds: string[]
  definition: WorkflowDefinition | null
  createdByUserId: string
  createdBy: {
    name: string
    initials: string
    createdAt: string
  }
}

export type WorkflowTemplate = {
  id: string
  name: string
  definition: WorkflowDefinition | null
  actionType: WorkflowDbActionType
  triggerType: WorkflowDbTriggerType
  sourceWorkflowId: string | null
  createdByUserId: string
  createdBy: {
    name: string
    initials: string
    createdAt: string
  }
}

export const WORKFLOW_LABELS = [
  { id: "label-prospect", label: "Prospect" },
  { id: "label-enrolled", label: "Enrolled" },
  { id: "label-follow-up", label: "Follow up" },
  { id: "label-urgent", label: "Urgent" },
  { id: "label-nurture", label: "Nurture" },
] as const

export const WORKFLOW_ADMISSIONS_LABELS = [
  { id: "label-admissions", label: "Admissions" },
  { id: "label-prospect", label: "Prospect" },
  { id: "label-applicant", label: "Applicant" },
  { id: "label-enrolled", label: "Enrolled" },
  { id: "label-offer-holder", label: "Offer holder" },
  { id: "label-conditional-offer", label: "Conditional offer" },
  { id: "label-unconditional-offer", label: "Unconditional offer" },
  { id: "label-international", label: "International student" },
  { id: "label-home-student", label: "Home student" },
  { id: "label-postgraduate", label: "Postgraduate" },
  { id: "label-undergraduate", label: "Undergraduate" },
  { id: "label-open-day", label: "Open day registered" },
  { id: "label-campus-visit", label: "Campus visit" },
  { id: "label-scholarship", label: "Scholarship interest" },
  { id: "label-clearing", label: "Clearing" },
  { id: "label-deferred", label: "Deferred entry" },
  { id: "label-waiting-list", label: "Waiting list" },
  { id: "label-withdrawn", label: "Withdrawn" },
  { id: "label-alumni", label: "Alumni" },
  { id: "label-referral", label: "Referral" },
  { id: "label-vip", label: "VIP" },
] as const

export function isAddLabelAction(
  actionType: WorkflowActionType | undefined,
) {
  return (
    actionType === "add-label-to-contact" ||
    actionType === "add-label-to-conversation" ||
    actionType === "add-label"
  )
}

const actionTypeLabels: Record<WorkflowActionType, string> = {
  "add-label-to-conversation": "Add a label to the conversation",
  "add-note-to-contact": "Add a note to the contact",
  "add-note-to-conversation": "Add a note to the conversation",
  "add-contact-to-event": "Add contact to event",
  "add-contact-to-organisation": "Add contact to organisation",
  "add-label-to-contact": "Add label to contact",
  "add-to-broadcast": "Add to broadcast",
  "add-to-campaign": "Add to campaign",
  "assign-conversation-to-agent-or-team": "Assign conversation to agent or team",
  email: "Email",
  "generate-document": "Generate document",
  "invite-to-unibuddy-community": "Invite to Unibuddy community",
  "pass-to-ai-agent": "Pass to AI agent",
  "remove-label-from-contact": "Remove label from contact",
  sms: "SMS",
  "sync-to-crm": "Sync to CRM",
  "trigger-message-to-contact": "Trigger a message to the contact",
  "update-contact-engagement-score": "Update a contact's engagement score",
  "update-contact-field-contents": "Update contact field contents",
  "update-task-and-objective": "Update task and objective",
  "add-label": "Add label to contact",
  "add-to-event": "Add contact to event",
  "send-message": "Send a message",
  "assign-agent": "Assign conversation to agent or team",
}

export const WORKFLOW_ACTION_OPTIONS: WorkflowActionOption[] = [
  { value: "add-label-to-conversation", label: actionTypeLabels["add-label-to-conversation"] },
  { value: "add-note-to-contact", label: actionTypeLabels["add-note-to-contact"] },
  { value: "add-note-to-conversation", label: actionTypeLabels["add-note-to-conversation"] },
  { value: "add-contact-to-event", label: actionTypeLabels["add-contact-to-event"] },
  { value: "add-contact-to-organisation", label: actionTypeLabels["add-contact-to-organisation"] },
  { value: "add-label-to-contact", label: actionTypeLabels["add-label-to-contact"] },
  { value: "add-to-broadcast", label: actionTypeLabels["add-to-broadcast"] },
  { value: "add-to-campaign", label: actionTypeLabels["add-to-campaign"] },
  { value: "assign-conversation-to-agent-or-team", label: actionTypeLabels["assign-conversation-to-agent-or-team"] },
  { value: "email", label: actionTypeLabels.email },
  { value: "generate-document", label: actionTypeLabels["generate-document"] },
  { value: "invite-to-unibuddy-community", label: actionTypeLabels["invite-to-unibuddy-community"] },
  { value: "pass-to-ai-agent", label: actionTypeLabels["pass-to-ai-agent"] },
  { value: "remove-label-from-contact", label: actionTypeLabels["remove-label-from-contact"] },
  { value: "sms", label: actionTypeLabels.sms },
  { value: "sync-to-crm", label: actionTypeLabels["sync-to-crm"] },
  { value: "trigger-message-to-contact", label: actionTypeLabels["trigger-message-to-contact"] },
  { value: "update-contact-engagement-score", label: actionTypeLabels["update-contact-engagement-score"] },
  { value: "update-contact-field-contents", label: actionTypeLabels["update-contact-field-contents"] },
  { value: "update-task-and-objective", label: actionTypeLabels["update-task-and-objective"] },
]

const triggerTypeLabels: Record<WorkflowTriggerType, string> = {
  "before-conversation": "Before a conversation starts",
  "during-conversation": "When a conversation started",
  "after-conversation-end": "When a conversation closed",
  "conversation-reopened": "When a conversation is reopened",
}

export const WORKFLOW_TRIGGER_OPTIONS: WorkflowTriggerOption[] =
  Object.entries(triggerTypeLabels).map(([value, label]) => ({
    value: value as WorkflowTriggerType,
    label,
  }))

export const WORKFLOW_CONDITION_GROUPS: WorkflowConditionGroup[] = [
  {
    label: "Availability",
    items: [
      { value: "current-time", label: "Current time" },
      { value: "day-of-week", label: "Day of week" },
      { value: "date", label: "Date" },
      { value: "agents-or-teams", label: "Any of these agents or teams" },
    ],
  },
  {
    label: "Live chat widget data",
    items: [
      { value: "referred-url", label: "Referred URL" },
      { value: "browser-language", label: "Browser language" },
      { value: "device-type", label: "Device type" },
      { value: "current-page", label: "Current page" },
      { value: "number-of-page-visits", label: "Number of page visits" },
      { value: "time-on-page", label: "Time on page" },
    ],
  },
  {
    label: "Conversation",
    items: [
      { value: "channel", label: "Channel" },
      { value: "channel-type", label: "Channel type" },
      { value: "first-message", label: "First message" },
    ],
  },
  {
    label: "Contact",
    items: [
      { value: "contact-field", label: "Contact field" },
      { value: "contact-label", label: "Contact label" },
      { value: "contact-engagement-score", label: "Contact engagement score" },
      {
        value: "contact-task-and-objective",
        label: "Contact task and objective",
      },
    ],
  },
  {
    label: "Location",
    items: [
      { value: "country", label: "Country" },
      { value: "city", label: "City" },
      { value: "state-or-region", label: "State/region" },
    ],
  },
]

const delayTypeLabels = Object.fromEntries(
  WORKFLOW_DELAY_OPTIONS.map((option) => [option.value, option.label]),
) as Record<WorkflowDelayType, string>

const fixedDelayUnitLabels = Object.fromEntries(
  WORKFLOW_FIXED_DELAY_UNITS.map((unit) => [unit.value, unit.label]),
) as Record<WorkflowFixedDelayUnit, string>

const conditionFieldLabels = Object.fromEntries(
  WORKFLOW_CONDITION_GROUPS.flatMap((group) =>
    group.items.map((item) => [item.value, item.label]),
  ),
) as Record<WorkflowConditionField, string>

export function getActionTypeLabel(
  actionType: WorkflowActionType | undefined,
): string | undefined {
  if (!actionType) return undefined
  return actionTypeLabels[actionType]
}

export function getTriggerTypeLabel(
  triggerType: WorkflowTriggerType | undefined,
): string | undefined {
  if (!triggerType) return undefined
  return triggerTypeLabels[triggerType]
}

export function getConditionFieldLabel(
  conditionField: WorkflowConditionField | undefined,
): string | undefined {
  if (!conditionField) return undefined
  return conditionFieldLabels[conditionField]
}

export function getDelayTypeLabel(
  delayType: WorkflowDelayType | undefined,
): string | undefined {
  if (!delayType) return undefined
  return delayTypeLabels[delayType]
}

export function getFixedDelayUnitLabel(
  unit: WorkflowFixedDelayUnit | undefined,
): string | undefined {
  if (!unit) return undefined
  return fixedDelayUnitLabels[unit]
}

export function getWorkflowPath(workflowId: string) {
  return `/workflows/${workflowId}`
}

export function getWorkflowNewPath() {
  return "/workflows/new"
}

export function getWorkflowTemplateNewPath() {
  return "/workflows/templates/new"
}

export function getWorkflowTemplatePath(templateId: string) {
  return `/workflows/templates/${templateId}`
}

export const WORKFLOW_TAB_PATHS = {
  workflows: "/workflows",
  templates: "/workflows/templates",
} as const

export type WorkflowTab = keyof typeof WORKFLOW_TAB_PATHS

export function createWorkflowFilterCategories(
  workflows: Workflow[],
): FilterCategory[] {
  const users = Array.from(
    new Map(
      workflows.map((workflow) => [
        workflow.createdByUserId,
        workflow.createdBy.name,
      ]),
    ).entries(),
  )
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label))

  return [
    {
      id: "enabled",
      label: "Status",
      searchable: false,
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      id: "lockStatus",
      label: "Lock status",
      searchable: false,
      options: [
        { value: "locked-view-only", label: "Locked (view only)" },
        { value: "locked-can-edit", label: "Locked (can edit)" },
        { value: "unlocked", label: "Unlocked" },
      ],
    },
    {
      id: "createdByUserId",
      label: "Users",
      searchPlaceholder: "Search users",
      options: users,
    },
    {
      id: "labels",
      label: "Labels",
      searchPlaceholder: "Search labels",
      options: WORKFLOW_LABELS.map((label) => ({
        value: label.id,
        label: label.label,
      })),
    },
  ]
}

export const workflowHeaderMenuItems = [
  { id: "clone", label: "Clone workflow" },
  { id: "save-as-template", label: "Save as template" },
  { id: "lock", label: "Lock workflow" },
  {
    id: "delete",
    label: "Delete workflow",
    variant: "destructive" as const,
    separatorBefore: true,
  },
] as const

export type WorkflowHeaderMenuActionId =
  (typeof workflowHeaderMenuItems)[number]["id"]

export const workflowTemplateHeaderMenuItems = [
  { id: "lock", label: "Lock template" },
  {
    id: "delete",
    label: "Delete template",
    variant: "destructive" as const,
    separatorBefore: true,
  },
] as const

export type WorkflowTemplateHeaderMenuActionId =
  (typeof workflowTemplateHeaderMenuItems)[number]["id"]

export const workflowRowActions: DataTableRowAction[] = [
  { id: "edit", label: "Edit workflow" },
  { id: "clone", label: "Clone workflow" },
  { id: "lock", label: "Lock workflow" },
  {
    id: "delete",
    label: "Delete workflow",
    variant: "destructive",
    separatorBefore: true,
  },
]

export const workflowSelectActions: DataTableRowAction[] = [
  { id: "enable", label: "Enable workflows" },
  { id: "disable", label: "Disable workflows" },
  { id: "update-lock-permissions", label: "Update lock permissions" },
  {
    id: "delete",
    label: "Delete workflows",
    variant: "destructive",
    separatorBefore: true,
  },
]

export const workflowTemplateRowActions: DataTableRowAction[] = [
  { id: "edit", label: "Edit template" },
  { id: "lock", label: "Lock template" },
  {
    id: "delete",
    label: "Delete template",
    variant: "destructive",
    separatorBefore: true,
  },
]

export const workflowTemplateSelectActions: DataTableRowAction[] = [
  { id: "update-lock-permissions", label: "Update lock permissions" },
  {
    id: "delete",
    label: "Delete templates",
    variant: "destructive",
    separatorBefore: true,
  },
]
