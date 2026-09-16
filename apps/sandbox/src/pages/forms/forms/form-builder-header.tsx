import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";
import CheckCheck from "@hugeicons/core-free-icons/CheckCheckIcon";
import Cog from "@hugeicons/core-free-icons/Settings01Icon";
import Home from "@hugeicons/core-free-icons/Home01Icon";

import { Header } from "@geckolabs/elements/components/header"
import type { HeaderProps } from "@geckolabs/elements/components/header"

import { BreadcrumbRouterLink } from "@/components/breadcrumb-router-link"

import {
  formHeaderMenuItems,
  type FormHeaderMenuActionId,
} from "./forms-data"

type FormBuilderHeaderProps = {
  title: string
  loading?: boolean
  onMenuAction?: (action: FormHeaderMenuActionId) => void
  primaryAction?: {
    label: "Update form"
    onClick: () => void
    loading?: boolean
  }
  favouriteAction?: HeaderProps["favouriteAction"]
  tabs?: HeaderProps["tabs"]
}

export function FormBuilderHeader({
  title,
  loading = false,
  onMenuAction,
  primaryAction,
  favouriteAction,
  tabs,
}: FormBuilderHeaderProps) {
  return (
    <Header
      breadcrumbs={{
        items: [
          {
            label: (
              <BreadcrumbRouterLink to="/home">
                <HugeiconsIcon icon={Home} className="size-3.5" />
                <span className="sr-only">Home</span>
              </BreadcrumbRouterLink>
            ),
            renderLabelOnly: true,
          },
          {
            label: (
              <BreadcrumbRouterLink to="/forms/forms">Forms</BreadcrumbRouterLink>
            ),
            renderLabelOnly: true,
          },
          {
            label: title,
            current: true,
          },
        ],
      }}
      title={title}
      aria-busy={loading}
      favouriteAction={favouriteAction}
      secondaryActions={[
        {
          kind: "menu" as const,
          label: "Actions",
          icon: <HugeiconsIcon icon={Cog} aria-hidden className="size-4 shrink-0" />,
          ariaLabel: "Form actions",
          items: formHeaderMenuItems.map((item) => ({
            label: item.label,
            variant: "variant" in item ? item.variant : undefined,
            separatorBefore:
              "separatorBefore" in item ? item.separatorBefore : undefined,
            onSelect: () => onMenuAction?.(item.id),
          })),
        },
      ]}
      primaryAction={
        primaryAction
          ? {
              label: primaryAction.label,
              icon: <HugeiconsIcon icon={CheckCheck} aria-hidden />,
              onClick: primaryAction.onClick,
              disabled: primaryAction.loading,
            }
          : undefined
      }
      tabs={tabs}
    />
  )
}
