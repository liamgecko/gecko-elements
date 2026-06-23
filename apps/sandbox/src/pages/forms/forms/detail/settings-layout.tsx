import { Navigate, Outlet, useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom"

import { Tabs, TabsList, TabsTrigger } from "@gecko/ui/components/tabs"
import { cn } from "@gecko/ui/lib/utils"

import {
  FORM_SETTINGS_SECTIONS,
  type FormLayoutOutletContext,
  type FormSettingsSection,
  getFormSettingsPath,
} from "../forms-data"

function settingsSectionFromPath(pathname: string): FormSettingsSection {
  const match = pathname.match(/\/settings\/([^/]+)/)
  const section = match?.[1]
  if (
    section &&
    FORM_SETTINGS_SECTIONS.some((item) => item.value === section)
  ) {
    return section as FormSettingsSection
  }
  return "basic-settings"
}

export default function FormSettingsLayout() {
  const { formId = "" } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const outletContext = useOutletContext<FormLayoutOutletContext>()
  const activeSection = settingsSectionFromPath(pathname)

  if (pathname.endsWith("/settings")) {
    return <Navigate to={getFormSettingsPath(formId, "basic-settings")} replace />
  }

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background">
      <Tabs
        orientation="vertical"
        value={activeSection}
        onValueChange={(value) => {
          navigate(getFormSettingsPath(formId, value))
        }}
        className="flex-row items-stretch gap-0"
      >
        <div className="w-56 shrink-0 self-stretch border-e border-border">
          <TabsList className="h-full w-full rounded-none bg-transparent p-2">
            {FORM_SETTINGS_SECTIONS.map((section) => (
              <TabsTrigger
                key={section.value}
                value={section.value}
                className={cn(
                  "h-9 w-full flex-none justify-start px-3",
                  "data-active:bg-muted"
                )}
              >
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="min-w-0 flex-1 self-stretch p-6">
          <Outlet context={outletContext} />
        </div>
      </Tabs>
    </div>
  )
}
