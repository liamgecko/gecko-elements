import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { Container } from "@gecko/ui/components/container"
import { Header } from "@gecko/ui/components/header"
import { useFavourites } from "../../state/favourites"
import { getTabLabelForPath } from "../../lib/tabbed-sections"
import { usePageBreadcrumbs } from "../../lib/use-page-breadcrumbs"

const USAGE_TAB_PATHS = {
  transactions: "/calls/usage-and-costs/transactions",
  "call-usage": "/calls/usage-and-costs/call-usage",
  "sms-usage": "/calls/usage-and-costs/sms-usage",
} as const

type UsageTab = keyof typeof USAGE_TAB_PATHS

function usageTabFromPath(pathname: string): UsageTab {
  if (pathname.includes("/call-usage")) return "call-usage"
  if (pathname.includes("/sms-usage")) return "sms-usage"
  return "transactions"
}

export default function CallsUsageAndCostsLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = usePageBreadcrumbs()
  const { isFavourited, setFavourite } = useFavourites()
  const activeTab = usageTabFromPath(pathname)
  const favouriteLabel = getTabLabelForPath(pathname) ?? "Usage and costs"

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        title="Usage and costs"
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
              const path = USAGE_TAB_PATHS[value as UsageTab]
              if (path) navigate(path)
            },
          },
          items: [
            { value: "transactions", label: "Transactions" },
            { value: "call-usage", label: "Call usage" },
            { value: "sms-usage", label: "SMS usage" },
          ],
        }}
      />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
