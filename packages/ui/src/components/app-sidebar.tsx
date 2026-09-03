"use client";

import * as React from "react";
import { CheckCheck, MoreHorizontal, Star } from "lucide-react";

import { Button } from "@gecko/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@gecko/ui/components/collapsible";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogWrapper,
} from "@gecko/ui/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu";
import { Field, FieldLabel } from "@gecko/ui/components/field";
import { Input } from "@gecko/ui/components/input";
import { ScrollArea } from "@gecko/ui/components/scroll-area";
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
} from "@gecko/ui/components/sidebar";
import { cn } from "@gecko/ui/lib/utils";

type AppSidebarProps = {
  children: [
    React.ReactElement<AppSidebarFavouritesProps>,
    React.ReactElement<AppSidebarNavProps>,
  ];
  className?: string;
};

function AppSidebar({ className, children }: AppSidebarProps) {
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
        <SidebarTrigger className="self-center" />
      </SidebarFooter>
    </Sidebar>
  );
}

type AppSidebarFavouriteItem = {
  path: string;
  label: string;
};

type AppSidebarFavouritesProps = {
  items: readonly AppSidebarFavouriteItem[];
  activePath: string;
  onSelect: (path: string) => void;
  onRename: (path: string, label: string) => void;
  onDelete: (path: string) => void;
};

function AppSidebarFavourites({
  items,
  activePath,
  onSelect,
  onRename,
  onDelete,
}: AppSidebarFavouritesProps) {
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
          render={<SidebarMenuAction aria-label={`Actions for ${fav.label}`} />}
        >
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => openRename(fav.path, fav.label)}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onDelete(fav.path)}
          >
            Delete
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
        <SidebarGroupLabel>Favourites</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {collapsed ? (
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Favourites">
                  <Star />
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
              <DialogTitle>Rename menu item</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Field>
                <FieldLabel htmlFor={renameInputId}>Favourite name</FieldLabel>
                <Input
                  id={renameInputId}
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.currentTarget.value)}
                  placeholder="Enter a name"
                  autoFocus
                />
              </Field>
            </DialogBody>
          </DialogWrapper>
          <DialogFooter showCloseButton closeButtonText="Cancel">
            <Button
              type="button"
              onClick={() => {
                if (!renamePath) return;
                onRename(renamePath, renameValue);
                setRenameOpen(false);
              }}
            >
              <CheckCheck data-icon="inline-start" aria-hidden="true" />
              Rename
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
  icon: React.ComponentType<{ className?: string }>;
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
};

function isChildActive(activePath: string | undefined, href: string) {
  if (!activePath) return false;
  return activePath === href || activePath.startsWith(`${href}/`);
}

function AppSidebarNav({ items, activePath, onSelect }: AppSidebarNavProps) {
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
                      if (open) onSelect(firstChildHref);
                    }}
                  >
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuButton
                          isActive={isGroupActive}
                          tooltip={item.label}
                        >
                          <Icon />
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
                  <Icon />
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
  AppSidebarFavouritesProps,
  AppSidebarNavChild,
  AppSidebarNavItem,
  AppSidebarNavProps,
  AppSidebarProps,
};
