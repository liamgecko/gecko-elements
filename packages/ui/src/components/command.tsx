"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@gecko/ui/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@gecko/ui/components/dialog";
import SearchIcon from "@hugeicons/core-free-icons/Search01Icon";
import CheckIcon from "@hugeicons/core-free-icons/CheckIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

function Command({
  className,
  label = "Command menu",
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground rounded-xl! flex size-full flex-col overflow-hidden",
        className,
      )}
      label={label}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "rounded-xl! top-1/3 translate-y-0 overflow-hidden p-0",
          className,
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="border-border text-muted-foreground flex items-center gap-2 border-b px-3 py-3"
    >
      <HugeiconsIcon
        icon={SearchIcon}
        className="size-4 shrink-0"
        aria-hidden="true"
      />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground/80 focus-visible:outline-none flex-1 bg-transparent text-sm disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-75",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  label = "Suggestions",
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-72 scroll-py-1 outline-none overflow-x-hidden overflow-y-auto p-1",
        className,
      )}
      label={label}
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-2xs **:[[cmdk-group-heading]]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px w-auto", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-selected:bg-muted data-selected:text-foreground data-selected:**:[svg]:text-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! [&_svg:not([class*='size-'])]:size-4 group/command-item data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-75 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
      <HugeiconsIcon
        icon={CheckIcon}
        className="ms-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100"
        aria-hidden="true"
      />
    </CommandPrimitive.Item>
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground group-data-selected/command-item:text-foreground ms-auto text-2xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
