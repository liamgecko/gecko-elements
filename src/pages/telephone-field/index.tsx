import { useState } from "react"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { TelephoneField } from "@/components/ui/telephone-field"

export function TelephoneFieldPage() {
  const [value, setValue] = useState<string>("")

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">
            Telephone field
          </h1>
          <p className="text-sm text-muted-foreground">
            Phone number input with an international country selector. Built with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              react-phone-number-input
            </code>{" "}
            and the design system&apos;s input and popover components.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              TelephoneField
            </code>{" "}
            component for collecting phone numbers with a country selector in a popover.
          </p>
          <ComponentExample>
            <TelephoneField
              placeholder="Enter a phone number"
              value={value}
              onChange={(next) => setValue((next as string) || "")}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="default-country" label="Default country">
          <h2 className="text-lg font-semibold">Default country</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              defaultCountry
            </code>{" "}
            prop to preselect the country (e.g. United Kingdom).
          </p>
          <ComponentExample>
            <TelephoneField
              defaultCountry="GB"
              placeholder="Enter a phone number"
              value={value}
              onChange={(next) => setValue((next as string) || "")}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="force-international-format" label="Force international format">
          <h2 className="text-lg font-semibold">Force international format</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              international
            </code>{" "}
            prop to always show the number with the country calling code in the input (e.g.{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">+44 7911 123456</code>).
          </p>
          <ComponentExample className="max-w-md">
            <TelephoneField
              international
              defaultCountry="GB"
              placeholder="Enter a phone number"
              value={value}
              onChange={(next) => setValue((next as string) || "")}
            />
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}

