import "@gecko/ui/globals.css"

import { AppShell } from "./components/layout/AppShell"
import { Navigate, Route, Routes } from "react-router-dom"

import OverviewPage from "./pages/overview"
import ContactsPage from "./pages/contacts"
import ResponsesLayout from "./pages/responses/layout"
import AllResponsesPage from "./pages/responses/all-responses"
import ResponsesPaymentsPage from "./pages/responses/payments"
import ResponsesQuarantinePage from "./pages/responses/quarantine"
import MessagesPage from "./pages/messages"
import ApplicationsLayout from "./pages/applications/layout"
import ApplicationsPage from "./pages/applications"
import ApplicationsQuarantinePage from "./pages/applications/quarantine"
import ConversationsPage from "./pages/conversations"
import ConversationsInboxPage from "./pages/conversations/inbox"
import ConversationsKnowledgeBasePage from "./pages/conversations/knowledge-base"
import ConversationsChatbotsPage from "./pages/conversations/chatbots"
import ConversationsChannelsPage from "./pages/conversations/channels"
import ConversationsWidgetsPage from "./pages/conversations/widgets"
import ConversationsReportingLayout from "./pages/conversations/reporting/layout"
import ConversationsReportingConversationsPage from "./pages/conversations/reporting/conversations"
import ConversationsReportingAgentsPage from "./pages/conversations/reporting/agents"
import ConversationsReportingTeamsPage from "./pages/conversations/reporting/teams"
import ConversationsReportingBotsPage from "./pages/conversations/reporting/bots"
import ConversationsReportingRatingsPage from "./pages/conversations/reporting/ratings"
import ConversationsReportingLabelsPage from "./pages/conversations/reporting/labels"
import ConversationsWorkflowsPage from "./pages/conversations/workflows"
import ConversationsTeamsPage from "./pages/conversations/teams"
import ConversationsSavedRepliesPage from "./pages/conversations/saved-replies"
import EventsLayout from "./pages/events/layout"
import EventsEventsPage from "./pages/events/events"
import EventsHostsPage from "./pages/events/hosts"
import EventsLocationsPage from "./pages/events/locations"
import EventsSharePage from "./pages/events/share"
import EventsDeletedEventsPage from "./pages/events/deleted-events"
import FormsLayout from "./pages/forms/layout"
import FormsFormsPage from "./pages/forms/forms"
import FormsContactFieldsPage from "./pages/forms/contact-fields"
import FormsFieldGroupsPage from "./pages/forms/field-groups"
import FormsFieldOptionsPage from "./pages/forms/field-options"
import FormLayout from "./pages/forms/forms/form-layout"
import FormDesignerPage from "./pages/forms/forms/detail/designer"
import FormWorkflowsPage from "./pages/forms/forms/detail/workflows"
import FormSettingsLayout from "./pages/forms/forms/detail/settings-layout"
import FormBasicSettingsPage from "./pages/forms/forms/detail/settings/basic-settings"
import FormDisplaySettingsPage from "./pages/forms/forms/detail/settings/display"
import FormRedirectRulesSettingsPage from "./pages/forms/forms/detail/settings/redirect-rules"
import FormDesignSettingsPage from "./pages/forms/forms/detail/settings/design"
import FormPaymentSettingsPage from "./pages/forms/forms/detail/settings/payment-settings"
import FormIntegrationsSettingsPage from "./pages/forms/forms/detail/settings/integrations"
import FormAnalyticsSettingsPage from "./pages/forms/forms/detail/settings/analytics"
import FormVisibilityPage from "./pages/forms/forms/detail/visibility"
import FormSharePage from "./pages/forms/forms/detail/share"
import AiAndAutomationLayout from "./pages/ai-and-automation/layout"
import AiAndAutomationAiAgentsPage from "./pages/ai-and-automation/ai-agents"
import AiAndAutomationMcpServersPage from "./pages/ai-and-automation/mcp-servers"
import BroadcastsCampaignsPage from "./pages/broadcasts/campaigns"
import BroadcastCampaignLayout from "./pages/broadcasts/campaigns/campaign-layout"
import BroadcastCampaignOverviewPage from "./pages/broadcasts/campaigns/detail/overview"
import BroadcastCampaignStatsV1Page from "./pages/broadcasts/campaigns/detail/stats-v1"
import BroadcastCampaignStatsPage from "./pages/broadcasts/campaigns/detail/stats"
import BroadcastCampaignContactsPage from "./pages/broadcasts/campaigns/detail/contacts"
import BroadcastCampaignWorkflowsPage from "./pages/broadcasts/campaigns/detail/workflows"
import BroadcastCampaignSettingsPage from "./pages/broadcasts/campaigns/detail/settings"
import BroadcastsTemplatesLayout from "./pages/broadcasts/templates-layout"
import BroadcastsTemplatesPage from "./pages/broadcasts/templates"
import BroadcastsDeletedTemplatesPage from "./pages/broadcasts/deleted-templates"
import BroadcastsSendersLayout from "./pages/broadcasts/senders-layout"
import BroadcastsSendersPage from "./pages/broadcasts/senders"
import BroadcastsDomainsPage from "./pages/broadcasts/domains"
import BroadcastsSmsGeoPermissionsPage from "./pages/broadcasts/sms-geo-permissions"
import CallsHubLayout from "./pages/calls/calls-hub-layout"
import CallsOverviewPage from "./pages/calls/calls/overview"
import CallsCallLogPage from "./pages/calls/calls/call-log"
import CallsNumbersHubPage from "./pages/calls/calls/numbers"
import CallsReportingPage from "./pages/calls/calls/reporting"
import CallsAgentsPage from "./pages/calls/calls/agents"
import CallsCampaignsPage from "./pages/calls/campaigns"
import CallsScriptsPage from "./pages/calls/scripts"
import CallsOutcomesPage from "./pages/calls/outcomes"
import CallsTelephoneNumbersPage from "./pages/calls/telephone-numbers"
import CallsVoipNumbersPage from "./pages/calls/voip-numbers"
import CallsUsageAndCostsLayout from "./pages/calls/usage-and-costs-layout"
import CallsUsageTransactionsPage from "./pages/calls/usage-and-costs/transactions"
import CallsUsageCallUsagePage from "./pages/calls/usage-and-costs/call-usage"
import CallsUsageSmsUsagePage from "./pages/calls/usage-and-costs/sms-usage"
import LandingPagesPage from "./pages/landing-pages"
import OrganisationsAllOrganisationsPage from "./pages/organisations/all-organisations"
import OrganisationsOrganisationTypesPage from "./pages/organisations/organisation-types"
import OrganisationsOrganisationFieldsPage from "./pages/organisations/organisation-fields"
import PortalStudentPortalsPage from "./pages/portal/student-portals"
import PortalTasksAndObjectivesPage from "./pages/portal/tasks-and-objectives"
import IntegrationsPage from "./pages/integrations"
import DashboardsPage from "./pages/dashboards"
import SettingsAccountSettingsLayout from "./pages/settings/account-settings-layout"
import SettingsAccountSettingsBasicDetailsPage from "./pages/settings/account-settings/basic-details"
import SettingsAccountSettingsDateAndTimePage from "./pages/settings/account-settings/date-and-time"
import SettingsAccountSettingsCommunicationPage from "./pages/settings/account-settings/communication"
import SettingsAccountSettingsBrandingPage from "./pages/settings/account-settings/branding"
import SettingsAccountSettingsAnalyticsPage from "./pages/settings/account-settings/analytics"
import SettingsUserSettingsLayout from "./pages/settings/user-settings-layout"
import SettingsUserSettingsBasicSettingsPage from "./pages/settings/user-settings/basic-settings"
import SettingsUserSettingsChatSettingsPage from "./pages/settings/user-settings/chat-settings"
import SettingsUserSettingsPermissionsPage from "./pages/settings/user-settings/permissions"
import SettingsUsersLayout from "./pages/settings/users-layout"
import SettingsUsersActivePage from "./pages/settings/users/active"
import SettingsUsersPendingPage from "./pages/settings/users/pending"
import SettingsUsersArchivePage from "./pages/settings/users/archive"
import SettingsUserGroupsPage from "./pages/settings/user-groups"
import SettingsDevicesPage from "./pages/settings/devices"
import SettingsImportPage from "./pages/settings/import"
import SettingsExportPage from "./pages/settings/export"
import SettingsLabelsPage from "./pages/settings/labels"
import SettingsCategoriesPage from "./pages/settings/categories"
import SettingsDataSecurityLayout from "./pages/settings/data-security-layout"
import SettingsDataSecurityPreferencesPage from "./pages/settings/data-security/preferences"
import SettingsDataSecurityActivityLogPage from "./pages/settings/data-security/activity-log"
import SettingsDataSecurityDeletedContactsPage from "./pages/settings/data-security/deleted-contacts"
import SettingsDataSecurityConsentReasonsPage from "./pages/settings/data-security/consent-reasons"
import SecurityPreferencesPage from "./pages/security-preferences"
import MyAccountsPage from "./pages/my-accounts"
import UserSettingsPage from "./pages/user-settings"
import LogoutPage from "./pages/logout"

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<OverviewPage />} />
        <Route path="/overview" element={<Navigate to="/home" replace />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/responses" element={<ResponsesLayout />}>
          <Route index element={<Navigate to="all-responses" replace />} />
          <Route path="all-responses" element={<AllResponsesPage />} />
          <Route path="payments" element={<ResponsesPaymentsPage />} />
          <Route path="quarantine" element={<ResponsesQuarantinePage />} />
        </Route>
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/applications" element={<ApplicationsLayout />}>
          <Route index element={<ApplicationsPage />} />
          <Route path="quarantine" element={<ApplicationsQuarantinePage />} />
        </Route>
        <Route path="/conversations" element={<ConversationsPage />} />
        <Route path="/conversations/inbox" element={<ConversationsInboxPage />} />
        <Route path="/conversations/knowledge-base" element={<ConversationsKnowledgeBasePage />} />
        <Route path="/conversations/chatbots" element={<ConversationsChatbotsPage />} />
        <Route path="/conversations/channels" element={<ConversationsChannelsPage />} />
        <Route path="/conversations/widgets" element={<ConversationsWidgetsPage />} />
        <Route path="/conversations/reporting" element={<ConversationsReportingLayout />}>
          <Route index element={<Navigate to="conversations" replace />} />
          <Route path="conversations" element={<ConversationsReportingConversationsPage />} />
          <Route path="agents" element={<ConversationsReportingAgentsPage />} />
          <Route path="teams" element={<ConversationsReportingTeamsPage />} />
          <Route path="bots" element={<ConversationsReportingBotsPage />} />
          <Route path="ratings" element={<ConversationsReportingRatingsPage />} />
          <Route path="labels" element={<ConversationsReportingLabelsPage />} />
        </Route>
        <Route path="/conversations/workflows" element={<ConversationsWorkflowsPage />} />
        <Route path="/conversations/teams" element={<ConversationsTeamsPage />} />
        <Route path="/conversations/saved-replies" element={<ConversationsSavedRepliesPage />} />
        <Route path="/events" element={<EventsLayout />}>
          <Route index element={<Navigate to="events" replace />} />
          <Route path="events" element={<EventsEventsPage />} />
          <Route path="hosts" element={<EventsHostsPage />} />
          <Route path="locations" element={<EventsLocationsPage />} />
          <Route path="share" element={<EventsSharePage />} />
          <Route path="deleted-events" element={<EventsDeletedEventsPage />} />
        </Route>
        <Route path="/forms/forms/:formId" element={<FormLayout />}>
          <Route index element={<Navigate to="designer" replace />} />
          <Route path="designer" element={<FormDesignerPage />} />
          <Route path="workflows" element={<FormWorkflowsPage />} />
          <Route path="settings" element={<FormSettingsLayout />}>
            <Route index element={<Navigate to="basic-settings" replace />} />
            <Route path="basic-settings" element={<FormBasicSettingsPage />} />
            <Route path="display" element={<FormDisplaySettingsPage />} />
            <Route path="redirect-rules" element={<FormRedirectRulesSettingsPage />} />
            <Route path="design" element={<FormDesignSettingsPage />} />
            <Route path="payment-settings" element={<FormPaymentSettingsPage />} />
            <Route path="integrations" element={<FormIntegrationsSettingsPage />} />
            <Route path="analytics" element={<FormAnalyticsSettingsPage />} />
          </Route>
          <Route path="visibility" element={<FormVisibilityPage />} />
          <Route path="share" element={<FormSharePage />} />
        </Route>
        <Route path="/forms" element={<FormsLayout />}>
          <Route index element={<Navigate to="forms" replace />} />
          <Route path="forms" element={<FormsFormsPage />} />
          <Route path="contact-fields" element={<FormsContactFieldsPage />} />
          <Route path="field-groups" element={<FormsFieldGroupsPage />} />
          <Route path="field-options" element={<FormsFieldOptionsPage />} />
          <Route
            path="field-and-groups"
            element={<Navigate to="contact-fields" replace />}
          />
        </Route>
        <Route path="/ai-and-automation" element={<AiAndAutomationLayout />}>
          <Route index element={<Navigate to="ai-agents" replace />} />
          <Route path="ai-agents" element={<AiAndAutomationAiAgentsPage />} />
          <Route path="mcp-servers" element={<AiAndAutomationMcpServersPage />} />
        </Route>
        <Route path="/broadcasts" element={<Navigate to="/broadcasts/campaigns" replace />} />
        <Route path="/broadcasts/campaigns" element={<BroadcastsCampaignsPage />} />
        <Route path="/broadcasts/campaigns/:campaignId" element={<BroadcastCampaignLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<BroadcastCampaignOverviewPage />} />
          <Route path="stats" element={<BroadcastCampaignStatsV1Page />} />
          <Route path="stats-full" element={<BroadcastCampaignStatsPage />} />
          <Route path="contacts" element={<BroadcastCampaignContactsPage />} />
          <Route path="workflows" element={<BroadcastCampaignWorkflowsPage />} />
          <Route path="settings" element={<BroadcastCampaignSettingsPage />} />
        </Route>
        <Route element={<BroadcastsTemplatesLayout />}>
          <Route path="/broadcasts/templates" element={<BroadcastsTemplatesPage />} />
          <Route
            path="/broadcasts/deleted-templates"
            element={<BroadcastsDeletedTemplatesPage />}
          />
        </Route>
        <Route element={<BroadcastsSendersLayout />}>
          <Route
            path="/broadcasts/senders-and-domains"
            element={<Navigate to="/broadcasts/senders" replace />}
          />
          <Route path="/broadcasts/senders" element={<BroadcastsSendersPage />} />
          <Route path="/broadcasts/domains" element={<BroadcastsDomainsPage />} />
          <Route
            path="/broadcasts/verified-senders-and-domains"
            element={<Navigate to="/broadcasts/senders-and-domains" replace />}
          />
        </Route>
        <Route
          path="/broadcasts/sms-geo-permissions"
          element={<BroadcastsSmsGeoPermissionsPage />}
        />
        <Route path="/calls" element={<Navigate to="/calls/calls/overview" replace />} />
        <Route path="/calls/calls" element={<CallsHubLayout />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<CallsOverviewPage />} />
          <Route path="call-log" element={<CallsCallLogPage />} />
          <Route path="numbers" element={<CallsNumbersHubPage />} />
          <Route path="reporting" element={<CallsReportingPage />} />
          <Route path="agents" element={<CallsAgentsPage />} />
        </Route>
        <Route path="/calls/campaigns" element={<CallsCampaignsPage />} />
        <Route path="/calls/scripts" element={<CallsScriptsPage />} />
        <Route path="/calls/outcomes" element={<CallsOutcomesPage />} />
        <Route path="/calls/telephone-numbers" element={<CallsTelephoneNumbersPage />} />
        <Route path="/calls/voip-numbers" element={<CallsVoipNumbersPage />} />
        <Route path="/calls/usage-and-costs" element={<CallsUsageAndCostsLayout />}>
          <Route index element={<Navigate to="transactions" replace />} />
          <Route path="transactions" element={<CallsUsageTransactionsPage />} />
          <Route path="call-usage" element={<CallsUsageCallUsagePage />} />
          <Route path="sms-usage" element={<CallsUsageSmsUsagePage />} />
        </Route>
        <Route path="/landing-pages" element={<LandingPagesPage />} />
        <Route
          path="/organisations"
          element={<Navigate to="/organisations/all-organisations" replace />}
        />
        <Route path="/organisations/all-organisations" element={<OrganisationsAllOrganisationsPage />} />
        <Route path="/organisations/organisation-types" element={<OrganisationsOrganisationTypesPage />} />
        <Route path="/organisations/organisation-fields" element={<OrganisationsOrganisationFieldsPage />} />
        <Route
          path="/portal"
          element={<Navigate to="/portal/student-portals" replace />}
        />
        <Route path="/portal/student-portals" element={<PortalStudentPortalsPage />} />
        <Route path="/portal/tasks-and-objectives" element={<PortalTasksAndObjectivesPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/data-and-reporting" element={<DashboardsPage />} />
        <Route path="/dashboards" element={<Navigate to="/data-and-reporting" replace />} />
        <Route
          path="/settings"
          element={
            <Navigate to="/settings/account-settings/basic-details" replace />
          }
        />
        <Route
          path="/settings/account-settings"
          element={<SettingsAccountSettingsLayout />}
        >
          <Route index element={<Navigate to="basic-details" replace />} />
          <Route
            path="basic-details"
            element={<SettingsAccountSettingsBasicDetailsPage />}
          />
          <Route
            path="date-and-time"
            element={<SettingsAccountSettingsDateAndTimePage />}
          />
          <Route
            path="communication"
            element={<SettingsAccountSettingsCommunicationPage />}
          />
          <Route
            path="branding"
            element={<SettingsAccountSettingsBrandingPage />}
          />
          <Route
            path="analytics"
            element={<SettingsAccountSettingsAnalyticsPage />}
          />
        </Route>
        <Route path="/settings/user-settings" element={<SettingsUserSettingsLayout />}>
          <Route index element={<Navigate to="basic-settings" replace />} />
          <Route
            path="basic-settings"
            element={<SettingsUserSettingsBasicSettingsPage />}
          />
          <Route
            path="chat-settings"
            element={<SettingsUserSettingsChatSettingsPage />}
          />
          <Route
            path="permissions"
            element={<SettingsUserSettingsPermissionsPage />}
          />
        </Route>
        <Route path="/settings/users" element={<SettingsUsersLayout />}>
          <Route index element={<Navigate to="active" replace />} />
          <Route path="active" element={<SettingsUsersActivePage />} />
          <Route path="pending" element={<SettingsUsersPendingPage />} />
          <Route path="archive" element={<SettingsUsersArchivePage />} />
        </Route>
        <Route path="/settings/user-groups" element={<SettingsUserGroupsPage />} />
        <Route path="/settings/devices" element={<SettingsDevicesPage />} />
        <Route path="/settings/import" element={<SettingsImportPage />} />
        <Route path="/settings/export" element={<SettingsExportPage />} />
        <Route path="/settings/labels" element={<SettingsLabelsPage />} />
        <Route path="/settings/categories" element={<SettingsCategoriesPage />} />
        <Route path="/settings/data-security" element={<SettingsDataSecurityLayout />}>
          <Route index element={<Navigate to="preferences" replace />} />
          <Route
            path="preferences"
            element={<SettingsDataSecurityPreferencesPage />}
          />
          <Route
            path="activity-log"
            element={<SettingsDataSecurityActivityLogPage />}
          />
          <Route
            path="deleted-contacts"
            element={<SettingsDataSecurityDeletedContactsPage />}
          />
          <Route
            path="consent-reasons"
            element={<SettingsDataSecurityConsentReasonsPage />}
          />
        </Route>
        <Route path="/security-preferences" element={<SecurityPreferencesPage />} />
        <Route path="/my-accounts" element={<MyAccountsPage />} />
        <Route path="/user-settings" element={<UserSettingsPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </AppShell>
  )
}

