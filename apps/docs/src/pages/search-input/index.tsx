"use client"

import { useState } from "react"
import { SearchField } from "@gecko/ui/components/search-field"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Code } from "@gecko/ui/components/code"
import { Field, FieldError, FieldLabel } from "@gecko/ui/components/field"

export function SearchInputPage() {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Search field</h1>
          <p className="text-sm text-muted-foreground">
            A search input with a left-aligned search icon and optional clear
            button. Built with the design system&apos;s input group components.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              SearchField
            </Code>{" "}
            component for search inputs with a search icon on the left.
          </p>
          <ComponentExample>
            <SearchField placeholder="Search…" />
          </ComponentExample>
        </PageSection>

        <PageSection id="with-clear" label="With clear">
          <h2 className="text-lg font-semibold">With clear</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              showClear
            </Code>{" "}
            prop to show a clear button when the input has content.
          </p>
          <ComponentExample>
            <SearchField
              placeholder="Search…"
              showClear
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="sizing" label="Sizing">
          <h2 className="text-lg font-semibold">Sizing</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              size
            </Code>{" "}
            prop for{" "}
            <Code>
              sm
            </Code>
            ,{" "}
            <Code>
              md
            </Code>
            , or{" "}
            <Code>
              lg
            </Code>
            . Default is{" "}
            <Code>
              md
            </Code>
            .
          </p>

          <h3 id="sizing-small" className="mb-3 text-base font-semibold">
            Small
          </h3>
          <ComponentExample className="mb-6">
            <SearchField size="sm" placeholder="Search…" />
          </ComponentExample>

          <h3 id="sizing-medium" className="mb-3 text-base font-semibold">
            Medium
          </h3>
          <ComponentExample className="mb-6">
            <SearchField size="md" placeholder="Search…" />
          </ComponentExample>

          <h3 id="sizing-large" className="mb-3 text-base font-semibold">
            Large
          </h3>
          <ComponentExample>
            <SearchField size="lg" placeholder="Search…" />
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              disabled
            </Code>{" "}
            prop or{" "}
            <Code>
              aria-invalid
            </Code>{" "}
            to show disabled and validation states.
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">
            Disabled
          </h3>
          <ComponentExample className="mb-6">
            <Field data-disabled>
              <FieldLabel htmlFor="search-field-states-disabled">Search</FieldLabel>
              <SearchField
                id="search-field-states-disabled"
                name="search-field-states-disabled"
                placeholder="Search…"
                disabled
              />
            </Field>
          </ComponentExample>

          <h3 id="states-error" className="mb-3 text-base font-semibold">
            Error
          </h3>
          <ComponentExample>
            <Field data-invalid>
              <FieldLabel htmlFor="search-field-states-error">Search</FieldLabel>
              <SearchField
                id="search-field-states-error"
                name="search-field-states-error"
                placeholder="Search…"
                aria-invalid
                aria-describedby="search-field-states-error-msg"
              />
              <FieldError id="search-field-states-error-msg">
                Your search could not be run. Adjust your query and try again.
              </FieldError>
            </Field>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
