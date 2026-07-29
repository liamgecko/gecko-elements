import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@gecko/ui/components/accordion"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
} from "@gecko/ui/components/combobox"
import { Avatar, AvatarFallback, AvatarImage } from "@gecko/ui/components/avatar"
import { Field, FieldDescription, FieldError, FieldLabel } from "@gecko/ui/components/field"
import { DatePicker } from "@gecko/ui/components/date-picker"
import { Input } from "@gecko/ui/components/input"
import { Label } from "@gecko/ui/components/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@gecko/ui/components/select"
import { Textarea } from "@gecko/ui/components/textarea"
import { cn } from "@gecko/ui/lib/utils"

import type {
  WorkflowActionType,
  WorkflowAgentOrTeamOption,
  WorkflowAgentsOrTeamsOperator,
  WorkflowAiAgentId,
  WorkflowChannelValue,
  WorkflowConditionField,
  WorkflowDelayType,
  WorkflowFixedDelayUnit,
  WorkflowGraphNodeData,
  WorkflowTriggerType,
} from "../workflows-data"
import {
  WORKFLOW_ACTION_OPTIONS,
  WORKFLOW_ADMISSIONS_LABELS,
  WORKFLOW_AGENTS_AND_TEAMS_GROUPS,
  WORKFLOW_AGENTS_OR_TEAMS_OPERATOR_OPTIONS,
  WORKFLOW_AI_AGENT_OPTIONS,
  WORKFLOW_CHANNEL_OPTIONS,
  WORKFLOW_CONDITION_GROUPS,
  WORKFLOW_DELAY_OPTIONS,
  WORKFLOW_FIXED_DELAY_UNITS,
  WORKFLOW_TRIGGER_OPTIONS,
  isAddLabelAction,
} from "../workflows-data"
import type { WorkflowFlowNode } from "./workflow-graph-types"
import { getNodeSettingsSectionTitle } from "./workflow-node-catalog"
import type { NodePropertiesValidationErrors } from "./validate-node-properties"

type NodePropertiesFieldsProps = {
  node: WorkflowFlowNode
  onNodeDataChange: (
    nodeId: string,
    patch: Partial<WorkflowGraphNodeData>,
  ) => void
  errors?: NodePropertiesValidationErrors
  showValidation?: boolean
}

export function NodePropertiesFields({
  node,
  onNodeDataChange,
  errors = {},
  showValidation = false,
}: NodePropertiesFieldsProps) {
  const labelsAnchor = React.useRef<HTMLDivElement>(null)
  const agentsTeamsAnchor = React.useRef<HTMLDivElement>(null)
  const name = node.data.label ?? ""
  const description = node.data.description ?? ""
  const settingsSectionTitle = getNodeSettingsSectionTitle(node.data.kind)

  const resolvedActionType = (node.data.actionType ??
    node.data.subtype) as WorkflowActionType | undefined
  const showLabelPicker = isAddLabelAction(resolvedActionType)
  const selectedLabelIds = node.data.labelIds ?? []
  const admissionsLabelIds = WORKFLOW_ADMISSIONS_LABELS.map((label) => label.id)
  const admissionsLabelById = new Map<
    string,
    (typeof WORKFLOW_ADMISSIONS_LABELS)[number]
  >(WORKFLOW_ADMISSIONS_LABELS.map((label) => [label.id, label]))
  const selectedAgentOrTeamIds = node.data.agentOrTeamIds ?? []
  const agentOrTeamById = new Map(
    WORKFLOW_AGENTS_AND_TEAMS_GROUPS.flatMap((group) =>
      group.items.map((item) => [item.value, item]),
    ),
  )

  const delayUntilDate = node.data.delayUntil
    ? new Date(node.data.delayUntil)
    : undefined

  const labelsErrorId = `action-labels-${node.id}-error`
  const agentsTeamsErrorId = `condition-agents-teams-${node.id}-error`
  const triggerTypeErrorId = `trigger-type-${node.id}-error`
  const conditionFieldErrorId = `condition-type-${node.id}-error`
  const channelValueErrorId = `condition-channel-${node.id}-error`
  const agentsOperatorErrorId = `condition-operator-${node.id}-error`
  const actionTypeErrorId = `action-type-${node.id}-error`
  const delayTypeErrorId = `delay-type-${node.id}-error`
  const delayAmountErrorId = `delay-amount-${node.id}-error`
  const delayUnitErrorId = `delay-unit-${node.id}-error`
  const delayUntilErrorId = `delay-until-${node.id}-error`
  const aiAgentErrorId = `ai-agent-${node.id}-error`

  const showTriggerTypeError = showValidation && Boolean(errors.triggerType)
  const showConditionFieldError =
    showValidation && Boolean(errors.conditionField)
  const showChannelValueError = showValidation && Boolean(errors.channelValue)
  const showAgentsOperatorError =
    showValidation && Boolean(errors.agentsOrTeamsOperator)
  const showAgentsTeamsError =
    showValidation && Boolean(errors.agentOrTeamIds)
  const showActionTypeError = showValidation && Boolean(errors.actionType)
  const showLabelsError = showValidation && Boolean(errors.labelIds)
  const showDelayTypeError = showValidation && Boolean(errors.delayType)
  const showDelayAmountError =
    showValidation && Boolean(errors.fixedDelayAmount)
  const showDelayUnitError = showValidation && Boolean(errors.fixedDelayUnit)
  const showDelayUntilError = showValidation && Boolean(errors.delayUntil)
  const showAiAgentError = showValidation && Boolean(errors.aiAgentId)

  return (
    <Accordion key={node.id} defaultValue={["settings"]} multiple>
      <AccordionItem value="settings">
        <AccordionTrigger className="p-3 text-xs font-semibold">
          {settingsSectionTitle}
        </AccordionTrigger>
        <AccordionContent className="p-3">
          {node.data.kind === "trigger" ? (
            <Field data-invalid={showTriggerTypeError ? true : undefined}>
              <FieldLabel htmlFor={`trigger-type-${node.id}`}>
                Trigger type
              </FieldLabel>
              <Select
                items={WORKFLOW_TRIGGER_OPTIONS}
                value={node.data.triggerType ?? null}
                onValueChange={(value) => {
                  onNodeDataChange(node.id, {
                    triggerType: value as WorkflowTriggerType,
                  })
                }}
              >
                <SelectTrigger
                  id={`trigger-type-${node.id}`}
                  className="w-full"
                  aria-required
                  aria-invalid={showTriggerTypeError ? true : undefined}
                  aria-describedby={
                    showTriggerTypeError ? triggerTypeErrorId : undefined
                  }
                >
                  <SelectValue placeholder="Select trigger type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {WORKFLOW_TRIGGER_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {showTriggerTypeError ? (
                <FieldError id={triggerTypeErrorId}>
                  {errors.triggerType}
                </FieldError>
              ) : null}
            </Field>
          ) : null}
          {node.data.kind === "condition" ? (
            <div className="space-y-2">
              <Field data-invalid={showConditionFieldError ? true : undefined}>
                <FieldLabel htmlFor={`condition-type-${node.id}`}>
                  Condition type
                </FieldLabel>
                <Select
                  items={WORKFLOW_CONDITION_GROUPS}
                  value={node.data.conditionField ?? null}
                  onValueChange={(value) => {
                    onNodeDataChange(node.id, {
                      conditionField: value as WorkflowConditionField,
                      ...(value === "agents-or-teams"
                        ? { channelValue: undefined }
                        : value === "channel"
                          ? {
                              agentsOrTeamsOperator: undefined,
                              agentOrTeamIds: undefined,
                            }
                          : {
                              agentsOrTeamsOperator: undefined,
                              agentOrTeamIds: undefined,
                              channelValue: undefined,
                            }),
                    })
                  }}
                >
                  <SelectTrigger
                    id={`condition-type-${node.id}`}
                    className="w-full"
                    aria-required
                    aria-invalid={showConditionFieldError ? true : undefined}
                    aria-describedby={
                      showConditionFieldError
                        ? conditionFieldErrorId
                        : undefined
                    }
                  >
                    <SelectValue placeholder="Select condition type" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORKFLOW_CONDITION_GROUPS.map((group, index) => (
                      <React.Fragment key={group.label}>
                        {index > 0 ? <SelectSeparator /> : null}
                        <SelectGroup>
                          <SelectLabel>{group.label}</SelectLabel>
                          {group.items.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </React.Fragment>
                    ))}
                  </SelectContent>
                </Select>
                {showConditionFieldError ? (
                  <FieldError id={conditionFieldErrorId}>
                    {errors.conditionField}
                  </FieldError>
                ) : null}
              </Field>
              {node.data.conditionField === "channel" ? (
                <Field data-invalid={showChannelValueError ? true : undefined}>
                  <FieldLabel htmlFor={`condition-channel-${node.id}`}>
                    Channel
                  </FieldLabel>
                  <Select
                    items={WORKFLOW_CHANNEL_OPTIONS}
                    value={node.data.channelValue ?? null}
                    onValueChange={(value) => {
                      onNodeDataChange(node.id, {
                        channelValue: value as WorkflowChannelValue,
                      })
                    }}
                  >
                    <SelectTrigger
                      id={`condition-channel-${node.id}`}
                      className="w-full"
                      aria-required
                      aria-invalid={showChannelValueError ? true : undefined}
                      aria-describedby={
                        showChannelValueError ? channelValueErrorId : undefined
                      }
                    >
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {WORKFLOW_CHANNEL_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {showChannelValueError ? (
                    <FieldError id={channelValueErrorId}>
                      {errors.channelValue}
                    </FieldError>
                  ) : null}
                </Field>
              ) : null}
              {node.data.conditionField === "agents-or-teams" ? (
                <>
                  <Field
                    data-invalid={showAgentsOperatorError ? true : undefined}
                  >
                    <FieldLabel htmlFor={`condition-operator-${node.id}`}>
                      Operator
                    </FieldLabel>
                    <Select
                      items={WORKFLOW_AGENTS_OR_TEAMS_OPERATOR_OPTIONS}
                      value={node.data.agentsOrTeamsOperator ?? null}
                      onValueChange={(value) => {
                        onNodeDataChange(node.id, {
                          agentsOrTeamsOperator:
                            value as WorkflowAgentsOrTeamsOperator,
                        })
                      }}
                    >
                      <SelectTrigger
                        id={`condition-operator-${node.id}`}
                        className="w-full"
                        aria-required
                        aria-invalid={
                          showAgentsOperatorError ? true : undefined
                        }
                        aria-describedby={
                          showAgentsOperatorError
                            ? agentsOperatorErrorId
                            : undefined
                        }
                      >
                        <SelectValue placeholder="Select operator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {WORKFLOW_AGENTS_OR_TEAMS_OPERATOR_OPTIONS.map(
                            (option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ),
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {showAgentsOperatorError ? (
                      <FieldError id={agentsOperatorErrorId}>
                        {errors.agentsOrTeamsOperator}
                      </FieldError>
                    ) : null}
                  </Field>
                  <Field data-invalid={showAgentsTeamsError ? true : undefined}>
                    <FieldLabel htmlFor={`condition-agents-teams-${node.id}`}>
                      Select agents or teams
                    </FieldLabel>
                    <Combobox
                      multiple
                      autoHighlight
                      items={WORKFLOW_AGENTS_AND_TEAMS_GROUPS}
                      value={selectedAgentOrTeamIds}
                      onValueChange={(ids: string[]) => {
                        onNodeDataChange(node.id, { agentOrTeamIds: ids })
                      }}
                    >
                      <ComboboxChips
                        ref={agentsTeamsAnchor}
                        className="w-full"
                      >
                        <ComboboxValue>
                          {(values: readonly string[]) => (
                            <>
                              {values.map((id) => {
                                const item = agentOrTeamById.get(id)
                                return (
                                  <ComboboxChip key={id}>
                                    {item ? (
                                      <AgentOrTeamOptionLabel item={item} />
                                    ) : (
                                      id
                                    )}
                                  </ComboboxChip>
                                )
                              })}
                              <ComboboxChipsInput
                                id={`condition-agents-teams-${node.id}`}
                                placeholder="Select agents or teams"
                                required
                                aria-invalid={
                                  showAgentsTeamsError ? true : undefined
                                }
                                aria-describedby={
                                  showAgentsTeamsError
                                    ? agentsTeamsErrorId
                                    : undefined
                                }
                              />
                            </>
                          )}
                        </ComboboxValue>
                      </ComboboxChips>
                      <ComboboxContent anchor={agentsTeamsAnchor}>
                        <ComboboxEmpty>
                          No agents or teams found.
                        </ComboboxEmpty>
                        <ComboboxList>
                          {(group, index) => (
                            <ComboboxGroup
                              key={group.value}
                              items={group.items}
                            >
                              <ComboboxLabel>{group.value}</ComboboxLabel>
                              <ComboboxCollection>
                                {(item: WorkflowAgentOrTeamOption) => (
                                  <ComboboxItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    <AgentOrTeamOptionLabel item={item} />
                                  </ComboboxItem>
                                )}
                              </ComboboxCollection>
                              {index <
                              WORKFLOW_AGENTS_AND_TEAMS_GROUPS.length - 1 ? (
                                <ComboboxSeparator />
                              ) : null}
                            </ComboboxGroup>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                    {showAgentsTeamsError ? (
                      <FieldError id={agentsTeamsErrorId}>
                        {errors.agentOrTeamIds}
                      </FieldError>
                    ) : null}
                  </Field>
                </>
              ) : null}
            </div>
          ) : null}
          {node.data.kind === "action" ? (
            <div className="space-y-4">
              <Field data-invalid={showActionTypeError ? true : undefined}>
                <FieldLabel htmlFor={`action-type-${node.id}`}>
                  Action type
                </FieldLabel>
                <Select
                  items={WORKFLOW_ACTION_OPTIONS}
                  value={resolvedActionType ?? null}
                  onValueChange={(value) => {
                    onNodeDataChange(node.id, {
                      actionType: value as WorkflowActionType,
                      ...(isAddLabelAction(value as WorkflowActionType)
                        ? {}
                        : { labelIds: undefined }),
                    })
                  }}
                >
                  <SelectTrigger
                    id={`action-type-${node.id}`}
                    className="w-full"
                    aria-required
                    aria-invalid={showActionTypeError ? true : undefined}
                    aria-describedby={
                      showActionTypeError ? actionTypeErrorId : undefined
                    }
                  >
                    <SelectValue placeholder="Select action type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {WORKFLOW_ACTION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {showActionTypeError ? (
                  <FieldError id={actionTypeErrorId}>
                    {errors.actionType}
                  </FieldError>
                ) : null}
              </Field>
              {showLabelPicker ? (
                <Field data-invalid={showLabelsError ? true : undefined}>
                  <FieldLabel htmlFor={`action-labels-${node.id}`}>
                    Labels
                  </FieldLabel>
                  <Combobox
                    multiple
                    autoHighlight
                    items={admissionsLabelIds}
                    value={selectedLabelIds}
                    onValueChange={(labelIds: string[]) => {
                      onNodeDataChange(node.id, { labelIds })
                    }}
                  >
                    <ComboboxChips
                      ref={labelsAnchor}
                      className="w-full"
                    >
                      <ComboboxValue>
                        {(values: readonly string[]) => (
                          <>
                            {values.map((id) => (
                              <ComboboxChip key={id}>
                                {admissionsLabelById.get(id)?.label ?? id}
                              </ComboboxChip>
                            ))}
                            <ComboboxChipsInput
                              id={`action-labels-${node.id}`}
                              placeholder="Select a label"
                              required
                              aria-invalid={
                                showLabelsError ? true : undefined
                              }
                              aria-describedby={
                                showLabelsError ? labelsErrorId : undefined
                              }
                            />
                          </>
                        )}
                      </ComboboxValue>
                    </ComboboxChips>
                    <ComboboxContent anchor={labelsAnchor}>
                      <ComboboxEmpty>No labels found.</ComboboxEmpty>
                      <ComboboxList>
                        {(id: string) => (
                          <ComboboxItem key={id} value={id}>
                            {admissionsLabelById.get(id)?.label ?? id}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  {showLabelsError ? (
                    <FieldError id={labelsErrorId}>{errors.labelIds}</FieldError>
                  ) : null}
                </Field>
              ) : null}
            </div>
          ) : null}
          {node.data.kind === "delay" ? (
            <div className="space-y-4">
              <Field data-invalid={showDelayTypeError ? true : undefined}>
                <FieldLabel htmlFor={`delay-type-${node.id}`}>
                  Delay type
                </FieldLabel>
                <Select
                  items={WORKFLOW_DELAY_OPTIONS}
                  value={node.data.delayType ?? null}
                  onValueChange={(value) => {
                    onNodeDataChange(node.id, {
                      delayType: value as WorkflowDelayType,
                      ...(value === "fixed"
                        ? { delayUntil: undefined }
                        : {
                            fixedDelayAmount: undefined,
                            fixedDelayUnit: undefined,
                          }),
                    })
                  }}
                >
                  <SelectTrigger
                    id={`delay-type-${node.id}`}
                    className="w-full"
                    aria-required
                    aria-invalid={showDelayTypeError ? true : undefined}
                    aria-describedby={
                      showDelayTypeError ? delayTypeErrorId : undefined
                    }
                  >
                    <SelectValue placeholder="Select delay type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {WORKFLOW_DELAY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {showDelayTypeError ? (
                  <FieldError id={delayTypeErrorId}>
                    {errors.delayType}
                  </FieldError>
                ) : null}
              </Field>
              {node.data.delayType === "fixed" ? (
                <div className="grid grid-cols-2 gap-2">
                  <Field data-invalid={showDelayAmountError ? true : undefined}>
                    <FieldLabel htmlFor={`delay-amount-${node.id}`}>
                      Delay duration
                    </FieldLabel>
                    <Input
                      id={`delay-amount-${node.id}`}
                      type="number"
                      min={1}
                      inputMode="numeric"
                      className="w-full"
                      required
                      value={node.data.fixedDelayAmount ?? ""}
                      onChange={(event) => {
                        onNodeDataChange(node.id, {
                          fixedDelayAmount: event.currentTarget.value,
                        })
                      }}
                      aria-invalid={showDelayAmountError ? true : undefined}
                      aria-describedby={
                        showDelayAmountError ? delayAmountErrorId : undefined
                      }
                    />
                    {showDelayAmountError ? (
                      <FieldError id={delayAmountErrorId}>
                        {errors.fixedDelayAmount}
                      </FieldError>
                    ) : null}
                  </Field>
                  <Field data-invalid={showDelayUnitError ? true : undefined}>
                    <FieldLabel htmlFor={`delay-unit-${node.id}`}>
                      Time unit
                    </FieldLabel>
                    <Select
                      items={WORKFLOW_FIXED_DELAY_UNITS}
                      value={node.data.fixedDelayUnit ?? null}
                      onValueChange={(value) => {
                        onNodeDataChange(node.id, {
                          fixedDelayUnit: value as WorkflowFixedDelayUnit,
                        })
                      }}
                    >
                      <SelectTrigger
                        id={`delay-unit-${node.id}`}
                        className="w-full"
                        aria-required
                        aria-invalid={showDelayUnitError ? true : undefined}
                        aria-describedby={
                          showDelayUnitError ? delayUnitErrorId : undefined
                        }
                      >
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {WORKFLOW_FIXED_DELAY_UNITS.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {showDelayUnitError ? (
                      <FieldError id={delayUnitErrorId}>
                        {errors.fixedDelayUnit}
                      </FieldError>
                    ) : null}
                  </Field>
                </div>
              ) : null}
              {node.data.delayType === "until-datetime" ? (
                <Field data-invalid={showDelayUntilError ? true : undefined}>
                  <FieldLabel
                    htmlFor={`delay-until-${node.id}`}
                    className="mb-1.5"
                  >
                    Select a date and time
                    <span className="text-destructive" aria-hidden>
                      *
                    </span>
                  </FieldLabel>
                  <DatePicker
                    id={`delay-until-${node.id}`}
                    variant="time"
                    className="w-full"
                    value={delayUntilDate}
                    onChange={(date) => {
                      onNodeDataChange(node.id, {
                        delayUntil: date?.toISOString(),
                      })
                    }}
                    placeholder="Select a date"
                    aria-invalid={showDelayUntilError ? true : undefined}
                    aria-describedby={
                      showDelayUntilError ? delayUntilErrorId : undefined
                    }
                  />
                  {showDelayUntilError ? (
                    <FieldError id={delayUntilErrorId}>
                      {errors.delayUntil}
                    </FieldError>
                  ) : (
                    <FieldDescription>
                      Time is optional, if blank it will run at 00:00 on the
                      chosen day.
                    </FieldDescription>
                  )}
                </Field>
              ) : null}
            </div>
          ) : null}
          {node.data.kind === "ai-agent" ? (
            <Field data-invalid={showAiAgentError ? true : undefined}>
              <FieldLabel htmlFor={`ai-agent-${node.id}`}>AI agent</FieldLabel>
              <Select
                items={WORKFLOW_AI_AGENT_OPTIONS}
                value={node.data.aiAgentId ?? null}
                onValueChange={(value) => {
                  onNodeDataChange(node.id, {
                    aiAgentId: value as WorkflowAiAgentId,
                  })
                }}
              >
                <SelectTrigger
                  id={`ai-agent-${node.id}`}
                  className="w-full"
                  aria-required
                  aria-invalid={showAiAgentError ? true : undefined}
                  aria-describedby={
                    showAiAgentError ? aiAgentErrorId : undefined
                  }
                >
                  <SelectValue placeholder="Select AI agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {WORKFLOW_AI_AGENT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {showAiAgentError ? (
                <FieldError id={aiAgentErrorId}>{errors.aiAgentId}</FieldError>
              ) : null}
            </Field>
          ) : null}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="general" className="border-b">
        <AccordionTrigger className="p-3 text-xs font-semibold">
          General settings
        </AccordionTrigger>
        <AccordionContent className="space-y-4 p-3">
          <div className="space-y-2">
            <Label htmlFor={`node-name-${node.id}`}>Name</Label>
            <Input
              id={`node-name-${node.id}`}
              value={name}
              onChange={(event) => {
                onNodeDataChange(node.id, { label: event.currentTarget.value })
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`node-description-${node.id}`}>Description</Label>
            <Textarea
              id={`node-description-${node.id}`}
              value={description}
              rows={3}
              className={cn("min-h-20 resize-none")}
              onChange={(event) => {
                onNodeDataChange(node.id, {
                  description: event.currentTarget.value,
                })
              }}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function AgentOrTeamOptionLabel({
  item,
}: {
  item: WorkflowAgentOrTeamOption
}) {
  const isTeam = item.value.startsWith("team-")
  const avatarInitial = isTeam ? item.initials.at(0) : item.initials

  return (
    <span className="flex items-center gap-2">
      <Avatar size="xs">
        {item.avatarSrc ? (
          <AvatarImage src={item.avatarSrc} alt={item.label} />
        ) : null}
        <AvatarFallback>{avatarInitial}</AvatarFallback>
      </Avatar>
      {item.label}
    </span>
  )
}
