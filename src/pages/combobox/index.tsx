"use client"
import * as React from "react"
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
} from "@/components/ui/combobox"

import { Code } from "@/components/ui/code"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

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
  const multipleAnchor = React.useRef<HTMLDivElement | null>(null)

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Combobox</h1>
          <p className="text-sm text-muted-foreground">
            A combobox combines a text input with a listbox of options.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic">
          <h2 className="text-lg font-semibold">Basic</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>Combobox</Code> with{" "}
            <Code>ComboboxInput</Code> and{" "}
            <Code>ComboboxList</Code> for a searchable
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
            Use <Code>ComboboxChips</Code>,{" "}
            <Code>ComboboxValue</Code>,{" "}
            <Code>ComboboxChip</Code>, and{" "}
            <Code>ComboboxChipsInput</Code> to display and manage multiple selected values.
          </p>
          <ComponentExample>
            <Combobox
              multiple
              autoHighlight
              items={frameworks}
            >
              <ComboboxChips ref={multipleAnchor}>
                <ComboboxValue>
                  {(values) => (
                    <>
                      {values.map((value: string) => (
                        <ComboboxChip key={value}>{value}</ComboboxChip>
                      ))}
                      <ComboboxChipsInput placeholder="Select a framework" />
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
            Use the <Code>showClear</Code> prop on{" "}
            <Code>ComboboxInput</Code> to show a clear button when a value is selected.
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
            Use <Code>ComboboxGroup</Code>,{" "}
            <Code>ComboboxLabel</Code>,{" "}
            <Code>ComboboxCollection</Code>, and{" "}
            <Code>ComboboxSeparator</Code> to organize options into labeled groups.
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

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>disabled</Code> on{" "}
            <Code>ComboboxInput</Code> to block
            typing and the chevron trigger, or{" "}
            <Code>aria-invalid</Code> for
            validation styling on the input group.
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">
            Disabled
          </h3>
          <ComponentExample className="mb-6">
            <Field data-disabled>
              <FieldLabel htmlFor="combobox-states-disabled">
                Framework
              </FieldLabel>
              <Combobox items={frameworks}>
                <ComboboxInput
                  id="combobox-states-disabled"
                  name="combobox-states-disabled"
                  placeholder="Select a framework"
                  disabled
                />
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
            </Field>
          </ComponentExample>

          <h3 id="states-error" className="mb-3 text-base font-semibold">
            Error
          </h3>
          <ComponentExample>
            <Field data-invalid>
              <FieldLabel htmlFor="combobox-states-error">
                Framework
              </FieldLabel>
              <Combobox items={frameworks}>
                <ComboboxInput
                  id="combobox-states-error"
                  name="combobox-states-error"
                  placeholder="Select a framework"
                  aria-invalid
                  aria-describedby="combobox-states-error-msg"
                />
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
              <FieldError id="combobox-states-error-msg">
                Please choose a framework from the list.
              </FieldError>
            </Field>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
