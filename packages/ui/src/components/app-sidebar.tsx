"use client";

import * as React from "react";
import CheckCheck from "@hugeicons/core-free-icons/CheckCheckIcon";
import EllipsisIcon from "@hugeicons/core-free-icons/EllipsisIcon";
import Star from "@hugeicons/core-free-icons/StarIcon";
import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";

import { Button } from "@geckolabs/elements/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@geckolabs/elements/components/collapsible";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogWrapper,
} from "@geckolabs/elements/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@geckolabs/elements/components/dropdown-menu";
import { Field, FieldLabel } from "@geckolabs/elements/components/field";
import { Input } from "@geckolabs/elements/components/input";
import { ScrollArea } from "@geckolabs/elements/components/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "@geckolabs/elements/components/sidebar";
import { cn } from "@geckolabs/elements/lib/utils";
import { renderGeckoIcon, type GeckoIcon } from "@geckolabs/elements/lib/icon";

type AppSidebarProps = {
  children: [
    React.ReactElement<AppSidebarFavouritesProps>,
    React.ReactElement<AppSidebarNavProps>,
  ];
  className?: string;
  collapseLabel?: string;
  expandLabel?: string;
};

function AppSidebar({
  className,
  children,
  collapseLabel,
  expandLabel,
}: AppSidebarProps) {
  return (
    <Sidebar
      data-slot="app-sidebar"
      variant="sidebar"
      collapsible="icon"
      className={cn(
        "top-(--header-height) bottom-0 h-[calc(100dvh-var(--header-height))] border-r border-sidebar-border",
        className,
      )}
    >
      <SidebarContent className="group-data-[collapsible=icon]:overflow-auto">
        <ScrollArea className="flex-1">{children}</ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger
          className="self-center"
          collapseLabel={collapseLabel}
          expandLabel={expandLabel}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

type AppSidebarFavouriteItem = {
  path: string;
  label: string;
};

type AppSidebarFavouritesLabels = {
  heading: string;
  actions: (name: string) => string;
  remove: string;
  rename: string;
  renameTitle: string;
  name: string;
  namePlaceholder: string;
  cancel: string;
};

const defaultFavouriteLabels: AppSidebarFavouritesLabels = {
  heading: "Favourites",
  actions: (name) => `Actions for ${name}`,
  remove: "Remove from favourites",
  rename: "Rename",
  renameTitle: "Rename menu item",
  name: "Favourite name",
  namePlaceholder: "Enter a name",
  cancel: "Cancel",
};

type AppSidebarFavouritesProps = {
  labels?: Partial<AppSidebarFavouritesLabels>;
  items: readonly AppSidebarFavouriteItem[];
  activePath: string;
  onSelect: (path: string) => void;
  onRename?: (path: string, label: string) => void;
  onDelete: (path: string) => void;
};

function AppSidebarFavourites({
  items,
  activePath,
  onSelect,
  onRename,
  onDelete,
  labels: suppliedLabels,
}: AppSidebarFavouritesProps) {
  const labels = { ...defaultFavouriteLabels, ...suppliedLabels };
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [renameOpen, setRenameOpen] = React.useState(false);
  const [renamePath, setRenamePath] = React.useState<string | null>(null);
  const [renameValue, setRenameValue] = React.useState("");
  const renameInputId = React.useId();

  const openRename = (path: string, currentLabel: string) => {
    setRenamePath(path);
    setRenameValue(currentLabel);
    setRenameOpen(true);
  };

  if (!items.length) return null;

  const renderActions = (fav: AppSidebarFavouriteItem) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<SidebarMenuAction aria-label={labels.actions(fav.label)} />}
        >
          <HugeiconsIcon icon={EllipsisIcon} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {onRename && (
            <DropdownMenuItem onClick={() => openRename(fav.path, fav.label)}>
              {labels.rename}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete(fav.path)}
          >
            {labels.remove}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <SidebarGroup
        data-slot="app-sidebar-favourites"
        className="min-h-[50px] border-b border-sidebar-border"
      >
        <SidebarGroupLabel>{labels.heading}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {collapsed ? (
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={labels.heading}
                  aria-label={labels.heading}
                >
                  <HugeiconsIcon icon={Star} />
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {items.map((fav) => {
                    const active = activePath === fav.path;
                    return (
                      <SidebarMenuSubItem key={fav.path}>
                        <SidebarMenuSubButton
                          href={fav.path}
                          isActive={active}
                          onClick={(event) => {
                            event.preventDefault();
                            onSelect(fav.path);
                          }}
                        >
                          <span>{fav.label}</span>
                        </SidebarMenuSubButton>
                        {renderActions(fav)}
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ) : (
              items.map((fav) => {
                const active = activePath === fav.path;
                return (
                  <SidebarMenuItem key={fav.path} className="flex items-center">
                    <SidebarMenuButton
                      render={<a href={fav.path} />}
                      tooltip={fav.label}
                      isActive={active}
                      onClick={(event) => {
                        event.preventDefault();
                        onSelect(fav.path);
                      }}
                      className="flex-1 group-hover/menu-item:bg-sidebar-accent group-hover/menu-item:text-sidebar-accent-foreground"
                    >
                      <span>{fav.label}</span>
                    </SidebarMenuButton>
                    {renderActions(fav)}
                  </SidebarMenuItem>
                );
              })
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent size="xs">
          <DialogWrapper>
            <DialogHeader>
              <DialogTitle>{labels.renameTitle}</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Field>
                <FieldLabel htmlFor={renameInputId}>{labels.name}</FieldLabel>
                <Input
                  id={renameInputId}
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.currentTarget.value)}
                  placeholder={labels.namePlaceholder}
                  autoFocus
                />
              </Field>
            </DialogBody>
          </DialogWrapper>
          <DialogFooter showCloseButton closeButtonText={labels.cancel}>
            <Button
              type="button"
              onClick={() => {
                if (!renamePath) return;
                onRename?.(renamePath, renameValue);
                setRenameOpen(false);
              }}
            >
              <HugeiconsIcon
                icon={CheckCheck}
                data-icon="inline-start"
                aria-hidden="true"
              />
              {labels.rename}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

type AppSidebarNavChild = {
  label: string;
  href: string;
};

type AppSidebarNavItemBase = {
  id: string;
  label: string;
  icon: GeckoIcon;
};

type AppSidebarNavLeaf = AppSidebarNavItemBase & {
  href: string;
};

type AppSidebarNavGroup = AppSidebarNavItemBase & {
  items: readonly [AppSidebarNavChild, ...AppSidebarNavChild[]];
  defaultOpen?: boolean;
};

type AppSidebarNavItem = AppSidebarNavLeaf | AppSidebarNavGroup;

type AppSidebarNavProps = {
  items: readonly AppSidebarNavItem[];
  activePath: string;
  onSelect: (href: string) => void;
  navigateOnGroupOpen?: boolean;
};

function isChildActive(activePath: string | undefined, href: string) {
  if (!activePath) return false;
  return activePath === href || activePath.startsWith(`${href}/`);
}

function AppSidebarNav({
  items,
  activePath,
  onSelect,
  navigateOnGroupOpen = true,
}: AppSidebarNavProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [expandedGroups, setExpandedGroups] = React.useState<
    Record<string, boolean>
  >({});

  return (
    <SidebarGroup data-slot="app-sidebar-nav">
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;

            if ("items" in item) {
              const firstChildHref = item.items[0]!.href;
              const isGroupActive = item.items.some((child) =>
                isChildActive(activePath, child.href),
              );
              const isOpen =
                item.id in expandedGroups
                  ? expandedGroups[item.id]
                  : isGroupActive || (item.defaultOpen ?? false);

              return (
                <SidebarMenuItem key={item.id}>
                  <Collapsible
                    open={isOpen}
                    onOpenChange={(open) => {
                      setExpandedGroups((prev) => ({
                        ...prev,
                        [item.id]: open,
                      }));
                      if (open && navigateOnGroupOpen) onSelect(firstChildHref);
                    }}
                  >
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuButton
                          isActive={isGroupActive}
                          tooltip={item.label}
                        >
                          {renderGeckoIcon(Icon)}
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      }
                    />
                    <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden opacity-100 transition-[height,opacity] duration-200 ease-out data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0 motion-reduce:transition-none">
                      <SidebarMenuSub>
                        {item.items.map((child) => {
                          const active = isChildActive(activePath, child.href);
                          return (
                            <SidebarMenuSubItem key={child.href}>
                              <SidebarMenuSubButton
                                href={child.href}
                                isActive={active}
                                onClick={(event) => {
                                  event.preventDefault();
                                  onSelect(child.href);
                                }}
                              >
                                <span>{child.label}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              );
            }

            const href = item.href;
            const active = isChildActive(activePath, href);
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  render={<a href={href} />}
                  tooltip={item.label}
                  isActive={active}
                  onClick={(event) => {
                    event.preventDefault();
                    onSelect(href);
                  }}
                >
                  {renderGeckoIcon(Icon)}
                  {!collapsed ? <span>{item.label}</span> : null}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export { AppSidebar, AppSidebarFavourites, AppSidebarNav };

export type {
  AppSidebarFavouriteItem,
  AppSidebarFavouritesLabels,
  AppSidebarFavouritesProps,
  AppSidebarNavChild,
  AppSidebarNavItem,
  AppSidebarNavProps,
  AppSidebarProps,
};
