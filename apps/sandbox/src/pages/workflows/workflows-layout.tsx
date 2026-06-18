import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"

import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { useFavourites } from "../../state/favourites"

import {
  WORKFLOW_TAB_PATHS,
  getWorkflowTemplateNewPath,
  type WorkflowTab,
} from "./workflows-data"
import {
  useWorkflowCreateDialog,
  WorkflowCreateDialogProvider,
} from "./workflow-create-dialog"

function workflowTabFromPath(pathname: string): WorkflowTab {
  if (pathname.startsWith(WORKFLOW_TAB_PATHS.templates)) {
    return "templates"
  }
  return "workflows"
}

function WorkflowsLayoutContent() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const { openCreateWorkflowDialog } = useWorkflowCreateDialog()
  const activeTab = workflowTabFromPath(pathname)
  const favouriteLabel = getTabLabelForPath(pathname) ?? "Workflows"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Workflows"
        primaryAction={{
          label:
            activeTab === "templates"
              ? "Create new template"
              : "Create new workflow",
          icon: <Plus aria-hidden className="size-4 shrink-0" />,
          onClick:
            activeTab === "templates"
              ? () => navigate(getWorkflowTemplateNewPath())
              : openCreateWorkflowDialog,
        }}
        favouriteAction={{
          pressed: isFavourited(pathname),
          onPressedChange: (next) => {
            setFavourite({ path: pathname, label: favouriteLabel }, next)
          },
        }}
        tabs={{
          tabsProps: {
            value: activeTab,
            onValueChange: (value) => {
              const path = WORKFLOW_TAB_PATHS[value as WorkflowTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "workflows", label: "Workflows" },
            { value: "templates", label: "Templates" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}

export default function WorkflowsLayout() {
  return (
    <WorkflowCreateDialogProvider>
      <WorkflowsLayoutContent />
    </WorkflowCreateDialogProvider>
  )
}
