import * as React from "react"
import { Code } from "@/components/ui/code"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
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
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Command</h1>
          <p className="text-sm text-muted-foreground">
            A command menu for building searchable command palettes and quick-switchers.
          </p>
        </PageSection>

        <PageSection id="example" label="Example">
          <h2 className="text-lg font-semibold">Example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>Command</Code> with{" "}
            <Code>CommandInput</Code>,{" "}
            <Code>CommandList</Code>, and{" "}
            <Code>CommandItem</Code> to build a searchable command surface.
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
            Use <Code>CommandDialog</Code> with a{" "}
            <Code>Button</Code> to open a command palette
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
  )
}
