import "@gecko/ui/globals.css"

import { AppShell } from "./components/layout/AppShell"
import { Navigate, Route, Routes } from "react-router-dom"

import { PageWithHeader } from "./components/layout/PageWithHeader"

import OverviewPage from "./pages/overview"
import ContactsPage from "./pages/contacts"
import ResponsesPage from "./pages/responses"
import AllResponsesPage from "./pages/responses/all-responses"
import ResponsesPaymentsPage from "./pages/responses/payments"
import ResponsesQuarantinePage from "./pages/responses/quarantine"
import MessagesPage from "./pages/messages"
import ApplicationsPage from "./pages/applications"
import ConversationsPage from "./pages/conversations"
import ConversationsInboxPage from "./pages/conversations/inbox"
import ConversationsKnowledgeBasePage from "./pages/conversations/knowledge-base"
import ConversationsChatbotsPage from "./pages/conversations/chatbots"
import ConversationsChannelsPage from "./pages/conversations/channels"
import ConversationsWidgetsPage from "./pages/conversations/widgets"
import ConversationsReportingPage from "./pages/conversations/reporting"
import ConversationsWorkflowsPage from "./pages/conversations/workflows"
import ConversationsTeamsPage from "./pages/conversations/teams"
import ConversationsSavedRepliesPage from "./pages/conversations/saved-replies"
import EventsPage from "./pages/events"
import EventsEventsPage from "./pages/events/events"
import EventsHostsPage from "./pages/events/hosts"
import EventsLocationsPage from "./pages/events/locations"
import EventsSharePage from "./pages/events/share"
import EventsDeletedEventsPage from "./pages/events/deleted-events"
import FormsPage from "./pages/forms"
import FormsFormsPage from "./pages/forms/forms"
import FormsFieldAndGroupsPage from "./pages/forms/field-and-groups"
import FormsFieldOptionsPage from "./pages/forms/field-options"
import AiAndAutomationPage from "./pages/ai-and-automation"
import AiAndAutomationAiAgentsPage from "./pages/ai-and-automation/ai-agents"
import AiAndAutomationMcpServersPage from "./pages/ai-and-automation/mcp-servers"
import BroadcastsPage from "./pages/broadcasts"
import BroadcastsCampaignsPage from "./pages/broadcasts/campaigns"
import BroadcastsTemplatesPage from "./pages/broadcasts/templates"
import BroadcastsVerifiedSendersAndDomainsPage from "./pages/broadcasts/verified-senders-and-domains"
import BroadcastsSmsGeoPermissionsPage from "./pages/broadcasts/sms-geo-permissions"
import CallsPage from "./pages/calls"
import CallsCampaignsPage from "./pages/calls/campaigns"
import CallsScriptsPage from "./pages/calls/scripts"
import CallsOutcomesPage from "./pages/calls/outcomes"
import CallsTelephoneNumbersPage from "./pages/calls/telephone-numbers"
import CallsVoipNumbersPage from "./pages/calls/voip-numbers"
import CallsUsageAndCostsPage from "./pages/calls/usage-and-costs"
import LandingPagesPage from "./pages/landing-pages"
import OrganisationsPage from "./pages/organisations"
import OrganisationsAllOrganisationsPage from "./pages/organisations/all-organisations"
import OrganisationsOrganisationTypesPage from "./pages/organisations/organisation-types"
import OrganisationsOrganisationFieldsPage from "./pages/organisations/organisation-fields"
import PortalPage from "./pages/portal"
import PortalStudentPortalsPage from "./pages/portal/student-portals"
import PortalTasksAndObjectivesPage from "./pages/portal/tasks-and-objectives"
import IntegrationsPage from "./pages/integrations"
import DashboardsPage from "./pages/dashboards"
import SettingsPage from "./pages/settings"
import SettingsAccountSettingsPage from "./pages/settings/account-settings"
import SettingsUserSettingsPage from "./pages/settings/user-settings"
import SettingsUsersPage from "./pages/settings/users"
import SettingsUserGroupsPage from "./pages/settings/user-groups"
import SettingsDevicesPage from "./pages/settings/devices"
import SettingsImportPage from "./pages/settings/import"
import SettingsExportPage from "./pages/settings/export"
import SettingsLabelsPage from "./pages/settings/labels"
import SettingsCategoriesPage from "./pages/settings/categories"
import SettingsDataSecurityPage from "./pages/settings/data-security"
import SecurityPreferencesPage from "./pages/security-preferences"
import MyAccountsPage from "./pages/my-accounts"
import UserSettingsPage from "./pages/user-settings"
import LogoutPage from "./pages/logout"

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/contacts" element={<PageWithHeader><ContactsPage /></PageWithHeader>} />
        <Route path="/responses" element={<PageWithHeader><ResponsesPage /></PageWithHeader>} />
        <Route path="/responses/all-responses" element={<PageWithHeader><AllResponsesPage /></PageWithHeader>} />
        <Route path="/responses/payments" element={<PageWithHeader><ResponsesPaymentsPage /></PageWithHeader>} />
        <Route path="/responses/quarantine" element={<PageWithHeader><ResponsesQuarantinePage /></PageWithHeader>} />
        <Route path="/messages" element={<PageWithHeader><MessagesPage /></PageWithHeader>} />
        <Route path="/applications" element={<PageWithHeader><ApplicationsPage /></PageWithHeader>} />
        <Route path="/conversations" element={<PageWithHeader><ConversationsPage /></PageWithHeader>} />
        <Route path="/conversations/inbox" element={<PageWithHeader><ConversationsInboxPage /></PageWithHeader>} />
        <Route path="/conversations/knowledge-base" element={<PageWithHeader><ConversationsKnowledgeBasePage /></PageWithHeader>} />
        <Route path="/conversations/chatbots" element={<PageWithHeader><ConversationsChatbotsPage /></PageWithHeader>} />
        <Route path="/conversations/channels" element={<PageWithHeader><ConversationsChannelsPage /></PageWithHeader>} />
        <Route path="/conversations/widgets" element={<PageWithHeader><ConversationsWidgetsPage /></PageWithHeader>} />
        <Route path="/conversations/reporting" element={<PageWithHeader><ConversationsReportingPage /></PageWithHeader>} />
        <Route path="/conversations/workflows" element={<PageWithHeader><ConversationsWorkflowsPage /></PageWithHeader>} />
        <Route path="/conversations/teams" element={<PageWithHeader><ConversationsTeamsPage /></PageWithHeader>} />
        <Route path="/conversations/saved-replies" element={<PageWithHeader><ConversationsSavedRepliesPage /></PageWithHeader>} />
        <Route path="/events" element={<PageWithHeader><EventsPage /></PageWithHeader>} />
        <Route path="/events/events" element={<PageWithHeader><EventsEventsPage /></PageWithHeader>} />
        <Route path="/events/hosts" element={<PageWithHeader><EventsHostsPage /></PageWithHeader>} />
        <Route path="/events/locations" element={<PageWithHeader><EventsLocationsPage /></PageWithHeader>} />
        <Route path="/events/share" element={<PageWithHeader><EventsSharePage /></PageWithHeader>} />
        <Route path="/events/deleted-events" element={<PageWithHeader><EventsDeletedEventsPage /></PageWithHeader>} />
        <Route path="/forms" element={<PageWithHeader><FormsPage /></PageWithHeader>} />
        <Route path="/forms/forms" element={<PageWithHeader><FormsFormsPage /></PageWithHeader>} />
        <Route path="/forms/field-and-groups" element={<PageWithHeader><FormsFieldAndGroupsPage /></PageWithHeader>} />
        <Route path="/forms/field-options" element={<PageWithHeader><FormsFieldOptionsPage /></PageWithHeader>} />
        <Route path="/ai-and-automation" element={<PageWithHeader><AiAndAutomationPage /></PageWithHeader>} />
        <Route path="/ai-and-automation/ai-agents" element={<PageWithHeader><AiAndAutomationAiAgentsPage /></PageWithHeader>} />
        <Route path="/ai-and-automation/mcp-servers" element={<PageWithHeader><AiAndAutomationMcpServersPage /></PageWithHeader>} />
        <Route path="/broadcasts" element={<PageWithHeader><BroadcastsPage /></PageWithHeader>} />
        <Route path="/broadcasts/campaigns" element={<PageWithHeader><BroadcastsCampaignsPage /></PageWithHeader>} />
        <Route path="/broadcasts/templates" element={<PageWithHeader><BroadcastsTemplatesPage /></PageWithHeader>} />
        <Route path="/broadcasts/verified-senders-and-domains" element={<PageWithHeader><BroadcastsVerifiedSendersAndDomainsPage /></PageWithHeader>} />
        <Route path="/broadcasts/sms-geo-permissions" element={<PageWithHeader><BroadcastsSmsGeoPermissionsPage /></PageWithHeader>} />
        <Route path="/calls" element={<PageWithHeader><CallsPage /></PageWithHeader>} />
        <Route path="/calls/campaigns" element={<PageWithHeader><CallsCampaignsPage /></PageWithHeader>} />
        <Route path="/calls/scripts" element={<PageWithHeader><CallsScriptsPage /></PageWithHeader>} />
        <Route path="/calls/outcomes" element={<PageWithHeader><CallsOutcomesPage /></PageWithHeader>} />
        <Route path="/calls/telephone-numbers" element={<PageWithHeader><CallsTelephoneNumbersPage /></PageWithHeader>} />
        <Route path="/calls/voip-numbers" element={<PageWithHeader><CallsVoipNumbersPage /></PageWithHeader>} />
        <Route path="/calls/usage-and-costs" element={<PageWithHeader><CallsUsageAndCostsPage /></PageWithHeader>} />
        <Route path="/landing-pages" element={<PageWithHeader><LandingPagesPage /></PageWithHeader>} />
        <Route path="/organisations" element={<PageWithHeader><OrganisationsPage /></PageWithHeader>} />
        <Route path="/organisations/all-organisations" element={<PageWithHeader><OrganisationsAllOrganisationsPage /></PageWithHeader>} />
        <Route path="/organisations/organisation-types" element={<PageWithHeader><OrganisationsOrganisationTypesPage /></PageWithHeader>} />
        <Route path="/organisations/organisation-fields" element={<PageWithHeader><OrganisationsOrganisationFieldsPage /></PageWithHeader>} />
        <Route path="/portal" element={<PageWithHeader><PortalPage /></PageWithHeader>} />
        <Route path="/portal/student-portals" element={<PageWithHeader><PortalStudentPortalsPage /></PageWithHeader>} />
        <Route path="/portal/tasks-and-objectives" element={<PageWithHeader><PortalTasksAndObjectivesPage /></PageWithHeader>} />
        <Route path="/integrations" element={<PageWithHeader><IntegrationsPage /></PageWithHeader>} />
        <Route path="/dashboards" element={<PageWithHeader><DashboardsPage /></PageWithHeader>} />
        <Route path="/settings" element={<PageWithHeader><SettingsPage /></PageWithHeader>} />
        <Route path="/settings/account-settings" element={<PageWithHeader><SettingsAccountSettingsPage /></PageWithHeader>} />
        <Route path="/settings/user-settings" element={<PageWithHeader><SettingsUserSettingsPage /></PageWithHeader>} />
        <Route path="/settings/users" element={<PageWithHeader><SettingsUsersPage /></PageWithHeader>} />
        <Route path="/settings/user-groups" element={<PageWithHeader><SettingsUserGroupsPage /></PageWithHeader>} />
        <Route path="/settings/devices" element={<PageWithHeader><SettingsDevicesPage /></PageWithHeader>} />
        <Route path="/settings/import" element={<PageWithHeader><SettingsImportPage /></PageWithHeader>} />
        <Route path="/settings/export" element={<PageWithHeader><SettingsExportPage /></PageWithHeader>} />
        <Route path="/settings/labels" element={<PageWithHeader><SettingsLabelsPage /></PageWithHeader>} />
        <Route path="/settings/categories" element={<PageWithHeader><SettingsCategoriesPage /></PageWithHeader>} />
        <Route path="/settings/data-security" element={<PageWithHeader><SettingsDataSecurityPage /></PageWithHeader>} />
        <Route path="/security-preferences" element={<PageWithHeader><SecurityPreferencesPage /></PageWithHeader>} />
        <Route path="/my-accounts" element={<PageWithHeader><MyAccountsPage /></PageWithHeader>} />
        <Route path="/user-settings" element={<PageWithHeader><UserSettingsPage /></PageWithHeader>} />
        <Route path="/logout" element={<PageWithHeader><LogoutPage /></PageWithHeader>} />
      </Routes>
    </AppShell>
  )
}

