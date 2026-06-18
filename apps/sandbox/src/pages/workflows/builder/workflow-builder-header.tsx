import { CheckCheck, Cog, Home } from "lucide-react"

import { Header } from "@gecko/ui/components/header"

import { BreadcrumbRouterLink } from "@/components/breadcrumb-router-link"
import {
  workflowHeaderMenuItems,
  workflowTemplateHeaderMenuItems,
  type WorkflowHeaderMenuActionId,
  type WorkflowTemplateHeaderMenuActionId,
} from "../workflows-data"

type WorkflowBuilderMenuItem =
  | (typeof workflowHeaderMenuItems)[number]
  | (typeof workflowTemplateHeaderMenuItems)[number]

type WorkflowBuilderHeaderProps = {
  title: string
  loading?: boolean
  onMenuAction?: (
    action: WorkflowHeaderMenuActionId | WorkflowTemplateHeaderMenuActionId,
  ) => void
  menuItems?: readonly WorkflowBuilderMenuItem[]
  primaryAction?: {
    label: "Save workflow" | "Update workflow" | "Save workflow template" | "Update workflow template"
    onClick: () => void
    loading?: boolean
  }
  showTemplatesBreadcrumb?: boolean
  showActionsMenu?: boolean
}

export function WorkflowBuilderHeader({
  title,
  loading = false,
  onMenuAction,
  menuItems = workflowHeaderMenuItems,
  primaryAction,
  showTemplatesBreadcrumb = false,
  showActionsMenu = true,
}: WorkflowBuilderHeaderProps) {
  const breadcrumbItems = [
    {
      label: (
        <BreadcrumbRouterLink to="/home">
          <Home className="size-3.5" />
          <span className="sr-only">Home</span>
        </BreadcrumbRouterLink>
      ),
      renderLabelOnly: true,
    },
    {
      label: (
        <BreadcrumbRouterLink to="/workflows">Workflows</BreadcrumbRouterLink>
      ),
      renderLabelOnly: true,
    },
    ...(showTemplatesBreadcrumb
      ? [
          {
            label: (
              <BreadcrumbRouterLink to="/workflows/templates">
                Templates
              </BreadcrumbRouterLink>
            ),
            renderLabelOnly: true,
          },
        ]
      : []),
    {
      label: title,
      current: true,
    },
  ]

  return (
    <Header
      breadcrumbs={{
        items: breadcrumbItems,
      }}
      title={title}
      aria-busy={loading}
      secondaryActions={
        showActionsMenu
          ? [
              {
                kind: "menu" as const,
                label: "Actions",
                icon: <Cog aria-hidden className="size-4 shrink-0" />,
                ariaLabel: "Workflow actions",
                items: menuItems.map((item) => ({
                  label: item.label,
                  variant: "variant" in item ? item.variant : undefined,
                  separatorBefore:
                    "separatorBefore" in item ? item.separatorBefore : undefined,
                  onSelect: () => onMenuAction?.(item.id),
                })),
              },
            ]
          : undefined
      }
      primaryAction={
        primaryAction
          ? {
              label: primaryAction.label,
              icon: <CheckCheck aria-hidden />,
              onClick: primaryAction.onClick,
              disabled: primaryAction.loading,
            }
          : undefined
      }
    />
  )
}
