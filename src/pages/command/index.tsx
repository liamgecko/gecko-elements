import * as React from "react"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function CommandPage() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Command</h1>
          <p className="text-sm text-muted-foreground">
            A command menu for building searchable command palettes and quick-switchers.
          </p>
        </PageSection>

        <PageSection id="example" label="Example">
          <h2 className="text-lg font-semibold">Example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Command</code> with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">CommandInput</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">CommandList</code>, and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">CommandItem</code> to build a searchable command surface.
          </p>
          <ComponentExample>
            <Command className="max-w-sm rounded-lg border">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <Calendar />
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem>
                    <Smile />
                    <span>Search Emoji</span>
                  </CommandItem>
                  <CommandItem>
                    <Calculator />
                    <span>Calculator</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <User />
                    <span>Profile</span>
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <CreditCard />
                    <span>Billing</span>
                    <CommandShortcut>⌘B</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Settings />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </ComponentExample>
        </PageSection>

        <PageSection id="trigger" label="Trigger">
          <h2 className="text-lg font-semibold">Trigger</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">CommandDialog</code> with a{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Button</code> to open a command palette
            from anywhere in your app.
          </p>
          <ComponentExample>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="w-fit"
              >
                Open command
              </Button>
              <CommandDialog open={open} onOpenChange={setOpen}>
                <Command>
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>
                        <Calendar />
                        <span>Calendar</span>
                      </CommandItem>
                      <CommandItem>
                        <Smile />
                        <span>Search Emoji</span>
                      </CommandItem>
                      <CommandItem>
                        <Calculator />
                        <span>Calculator</span>
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                      <CommandItem>
                        <User />
                        <span>Profile</span>
                        <CommandShortcut>⌘P</CommandShortcut>
                      </CommandItem>
                      <CommandItem>
                        <CreditCard />
                        <span>Billing</span>
                        <CommandShortcut>⌘B</CommandShortcut>
                      </CommandItem>
                      <CommandItem>
                        <Settings />
                        <span>Settings</span>
                        <CommandShortcut>⌘S</CommandShortcut>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </CommandDialog>
            </div>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
