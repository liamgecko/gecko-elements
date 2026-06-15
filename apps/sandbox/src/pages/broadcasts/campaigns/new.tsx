import * as React from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { SupabaseSetupNotice } from "@/components/supabase-setup-notice"
import { broadcastCampaignsRepository } from "@/data/repositories/broadcastCampaignsRepository"
import { usePageBreadcrumbs } from "@/lib/use-page-breadcrumbs"
import { isSupabaseConfigured } from "@/lib/supabase/env"

import { BroadcastForm } from "./broadcast-form"
import { getBroadcastCampaignPath } from "./broadcast-campaigns-data"

export default function CreateBroadcastCampaignPage() {
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const [isSaving, setIsSaving] = React.useState(false)
  const configured = isSupabaseConfigured()

  return (
    <div className="flex flex-col">
      <Header breadcrumbs={breadcrumbs} title="Broadcasts" />
      <Container>
        {!configured ? (
          <SupabaseSetupNotice />
        ) : (
          <BroadcastForm
            title="Create new broadcast"
            submitLabel="Save broadcast"
            isSaving={isSaving}
            onSubmit={async (values) => {
              setIsSaving(true)
              try {
                const campaign =
                  await broadcastCampaignsRepository.createBroadcastCampaign({
                    name: values.name,
                  })
                toast.success("Broadcast created successfully")
                navigate(getBroadcastCampaignPath(campaign.id))
              } catch (err) {
                toast.error(
                  err instanceof Error
                    ? err.message
                    : "Failed to create broadcast",
                )
              } finally {
                setIsSaving(false)
              }
            }}
          />
        )}
      </Container>
    </div>
  )
}
