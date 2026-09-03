import * as React from "react";
import { AppHeader, AppHeaderLogo } from "@gecko/ui/components/app-header";
import {
  AppSidebar,
  AppSidebarFavourites,
  AppSidebarNav,
  type AppSidebarNavItem,
} from "@gecko/ui/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@gecko/ui/components/sidebar";
import geckoLogoUrl from "@/assets/gecko-logo.svg";
import { Headset, House, Inbox, Settings } from "lucide-react";

const favourites = [
  { path: "/conversations/inbox", label: "Inbox" },
  { path: "/conversations/knowledge-base", label: "Knowledge base" },
];

const navItems: AppSidebarNavItem[] = [
  { id: "home", label: "Home", icon: House, href: "/home" },
  {
    id: "conversations",
    label: "Conversations",
    icon: Inbox,
    defaultOpen: true,
    items: [
      { label: "Inbox", href: "/conversations/inbox" },
      { label: "Knowledge base", href: "/conversations/knowledge-base" },
      { label: "Chatbots", href: "/conversations/chatbots" },
    ],
  },
  {
    id: "calls",
    label: "Calls",
    icon: Headset,
    items: [
      { label: "Calls", href: "/calls/calls" },
      { label: "Campaigns", href: "/calls/campaigns" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function AppSidebarDemo() {
  const [activePath, setActivePath] = React.useState("/conversations/inbox");
  const [favouriteItems, setFavouriteItems] = React.useState(favourites);

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden [--header-height:calc(--spacing(14))]">
      <AppHeader className="static">
        <AppHeaderLogo src={geckoLogoUrl} alt="Gecko" />
      </AppHeader>
      <SidebarProvider
        defaultOpen
        persistState={false}
        className="flex min-h-0 flex-1 flex-col"
      >
        <div className="relative flex min-h-0 flex-1 overflow-hidden">
          <AppSidebar className="absolute inset-y-0 left-0 z-20 h-full max-h-full">
            <AppSidebarFavourites
              items={favouriteItems}
              activePath={activePath}
              onSelect={setActivePath}
              onRename={(path, label) =>
                setFavouriteItems((prev) =>
                  prev.map((item) =>
                    item.path === path ? { ...item, label } : item,
                  ),
                )
              }
              onDelete={(path) =>
                setFavouriteItems((prev) =>
                  prev.filter((item) => item.path !== path),
                )
              }
            />
            <AppSidebarNav
              items={navItems}
              activePath={activePath}
              onSelect={setActivePath}
            />
          </AppSidebar>
          <SidebarInset className="bg-background" />
        </div>
      </SidebarProvider>
    </div>
  );
}
