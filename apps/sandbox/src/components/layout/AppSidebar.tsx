import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  AppSidebar as AppSidebarRoot,
  AppSidebarFavourites,
  AppSidebarNav,
  type AppSidebarNavChild,
  type AppSidebarNavItem,
} from "@gecko/ui/components/app-sidebar";

import { getTabLabelForPath } from "../../lib/tabbed-sections";
import { getChildSlug, navItems, toSlug } from "../../lib/nav-items";
import { useFavourites } from "../../state/favourites";

function favouritesLabelForPath(path: string) {
  const tabLabel = getTabLabelForPath(path);
  if (tabLabel) return tabLabel;

  const segments = path.split("?")[0].split("#")[0].split("/").filter(Boolean);
  const last = segments.at(-1) ?? "";
  if (last === "overview" || last === "home") return "Home";
  if (last === "dashboards" || last === "data-and-reporting") {
    return "Data and reporting";
  }
  const spaced = last.replace(/-/g, " ");
  const titleCased = spaced.replace(/\b\w/g, (c) => c.toUpperCase());
  if (last === "mcp-servers") return "MCP servers";
  if (last === "all-organisations") return "Organisations";
  if (last === "student-portals") return "Student portal";
  if (last === "import") return "Imports";
  if (last === "export") return "Exports";
  if (last === "voip-numbers") return "VoIP numbers";
  if (last === "sms-geo-permissions") return "SMS geo permissions";
  if (last === "campaigns" && segments.includes("broadcasts"))
    return "Broadcasts";
  return titleCased || "Overview";
}

function toAppSidebarNavItems(): AppSidebarNavItem[] {
  return navItems.map(({ label, icon, items, defaultOpen }) => {
    const parentSlug = toSlug(label);
    if (items?.length) {
      const [firstItem, ...remainingItems] = items;
      const toChild = (item: (typeof items)[number]): AppSidebarNavChild => ({
        label: item.label,
        href: `/${parentSlug}/${getChildSlug(item)}`,
      });
      const children: [AppSidebarNavChild, ...AppSidebarNavChild[]] = [
        toChild(firstItem),
        ...remainingItems.map(toChild),
      ];

      return {
        id: parentSlug,
        label,
        icon,
        defaultOpen,
        items: children,
      };
    }
    return {
      id: parentSlug,
      label,
      icon,
      href: `/${parentSlug}`,
    };
  });
}

const sidebarNavItems = toAppSidebarNavItems();

export function AppSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { favourites, renameFavourite, deleteFavourite } = useFavourites();

  const favouriteItems = React.useMemo(
    () =>
      favourites.map((fav) => ({
        path: fav.path,
        label: fav.label || favouritesLabelForPath(fav.path),
      })),
    [favourites],
  );

  return (
    <AppSidebarRoot>
      <AppSidebarFavourites
        items={favouriteItems}
        activePath={pathname}
        onSelect={navigate}
        onRename={renameFavourite}
        onDelete={deleteFavourite}
      />
      <AppSidebarNav
        items={sidebarNavItems}
        activePath={pathname}
        onSelect={navigate}
      />
    </AppSidebarRoot>
  );
}
