"use client"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

const timezones = [
  {
    value: "Americas",
    items: [
      "(GMT-5) New York",
      "(GMT-8) Los Angeles",
      "(GMT-6) Chicago",
      "(GMT-5) Toronto",
      "(GMT-8) Vancouver",
      "(GMT-3) São Paulo",
    ],
  },
  {
    value: "Europe",
    items: [
      "(GMT+0) London",
      "(GMT+1) Paris",
      "(GMT+1) Berlin",
      "(GMT+1) Rome",
      "(GMT+1) Madrid",
      "(GMT+1) Amsterdam",
    ],
  },
  {
    value: "Asia/Pacific",
    items: [
      "(GMT+9) Tokyo",
      "(GMT+8) Shanghai",
      "(GMT+8) Singapore",
      "(GMT+4) Dubai",
      "(GMT+11) Sydney",
      "(GMT+9) Seoul",
    ],
  },
] as const

export function ComboboxPage() {
  const multipleAnchor = useComboboxAnchor()

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Combobox</h1>
          <p className="text-sm text-muted-foreground">
            A combobox combines a text input with a listbox of options.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic">
          <h2 className="text-lg font-semibold">Basic</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Combobox</code> with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ComboboxInput</code> and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ComboboxList</code> for a searchable
            list of options.
          </p>
          <ComponentExample>
            <Combobox items={frameworks}>
              <ComboboxInput placeholder="Select a framework" />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </ComponentExample>
        </PageSection>

        <PageSection id="multiple" label="Multiple">
          <h2 className="text-lg font-semibold">Multiple</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ComboboxChips</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ComboboxValue</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ComboboxChip</code>, and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ComboboxChipsInput</code> to display and manage multiple selected values.
          </p>
          <ComponentExample>
            <Combobox
              multiple
              autoHighlight
              items={frameworks}
              defaultValue={[frameworks[0]]}
            >
              <ComboboxChips ref={multipleAnchor}>
                <ComboboxValue>
                  {(values) => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value}>{value}</ComboboxChip>
                      ))}
                      <ComboboxChipsInput />
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>
              <ComboboxContent anchor={multipleAnchor}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </ComponentExample>
        </PageSection>

        <PageSection id="with-clear" label="With clear">
          <h2 className="text-lg font-semibold">With clear</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">showClear</code> prop on{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ComboboxInput</code> to show a clear button when a value is selected.
          </p>
          <ComponentExample>
            <Combobox items={frameworks} defaultValue={frameworks[0]}>
              <ComboboxInput placeholder="Select a framework" showClear />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </ComponentExample>
        </PageSection>

        <PageSection id="groups" label="Groups">
          <h2 className="text-lg font-semibold">Groups</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ComboboxGroup</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ComboboxLabel</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ComboboxCollection</code>, and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ComboboxSeparator</code> to organize options into labeled groups.
          </p>
          <ComponentExample>
            <Combobox items={timezones}>
              <ComboboxInput placeholder="Select a timezone" />
              <ComboboxContent>
                <ComboboxEmpty>No timezones found.</ComboboxEmpty>
                <ComboboxList>
                  {(group, index) => (
                    <ComboboxGroup key={group.value} items={group.items}>
                      <ComboboxLabel>{group.value}</ComboboxLabel>
                      <ComboboxCollection>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxCollection>
                      {index < timezones.length - 1 && <ComboboxSeparator />}
                    </ComboboxGroup>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
