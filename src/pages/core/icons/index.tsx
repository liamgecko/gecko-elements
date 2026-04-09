import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Star, Trash2 } from "lucide-react"
import { Code } from "@/components/ui/code"


export function IconsPage() {
  return (
    <div className="flex gap-5.5">
      <div className="min-w-0 flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Icons</h1>
          <p className="text-sm text-muted-foreground">
            A consistent, lightweight icon system designed to support clarity, usability, and visual hierarchy across the product.
          </p>
        </PageSection>

        <PageSection id="usage" label="Usage">
          <h2 className="text-lg font-semibold">Usage</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Icons help users scan interfaces quickly and understand actions at a glance. They add structure, reinforce hierarchy, and reduce reliance on text when used consistently and with clear intent.
          </p>
          <p className="text-sm text-muted-foreground">
            In our system, icons are used to support common actions, navigation, and status. They should always be familiar, predictable, and aligned with established conventions, for example a trash icon for delete or a cog for settings. Icons should support meaning, not replace it, and should be paired with labels where clarity is important.
          </p>
        </PageSection>

        <PageSection id="icon-library" label="Icon library">
          <h2 className="text-lg font-semibold">Icon library</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            We use Lucide as our icon library. <a href="https://lucide.dev/" target="_blank" rel="noopener noreferrer" className="text-foreground underline hover:text-muted-foreground">Lucide</a> provides a consistent set of lightweight, open source SVG icons that integrate well with modern frontend tooling.
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            Because Lucide icons are SVG-based, they are:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4">
            <li className="text-sm">Scalable without loss of quality</li>
            <li className="text-sm">Stylistically consistent across the product</li>
            <li className="text-sm">Easy to customise via size, stroke, and colour</li>
            <li className="text-sm">Optimised for performance, as only the icons we import are included in the bundle</li>
          </ul>
        </PageSection>

        <PageSection id="sizing" label="Sizing">
          <h2 className="text-lg font-semibold">Sizing</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Icon sizing is standardised using the <Code>size</Code> utility to ensure consistency across the interface. This approach keeps icons aligned with our spacing system and avoids the need for custom sizing values.
          </p>
          <p className="mb-8 text-sm text-muted-foreground">
            In most cases, icon size is not set manually. Instead, it is handled at the component level using predefined utility classes. This ensures icons scale consistently across different UI elements and reduces variation in implementation.
          </p>
          <ComponentExample>
            <div className="flex flex-wrap gap-2 items-center">
              <Trash2 className="size-4" />
              <Trash2 className="size-6" />
              <Trash2 className="size-8" />
              <Trash2 className="size-10" />
              <Trash2 className="size-12" />
              <Trash2 className="size-14" />
              <Trash2 className="size-16" />
              <Trash2 className="size-18" />
              <Trash2 className="size-20" />
            </div>
            <Code variant="block" language="tsx" showCopyButton copyLabel="Copy code" code={`<Trash2 className="size-*" />`} className="mt-8" />
          </ComponentExample>
        </PageSection>

        <PageSection id="stroke-width" label="Stroke width">
          <h2 className="text-lg font-semibold">Stroke width</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Icons use a consistent stroke style to maintain visual clarity and cohesion across the interface. Stroke is controlled at the component level and should not be adjusted on a per-instance basis.
          </p>
          <p className="mb-8 text-sm text-muted-foreground">
            By default, icons use a lighter stroke for better legibility and alignment with our overall UI aesthetic. In cases where a darker stroke is required, it can be overridden using the <Code>strokeWidth=&#123;&#125;</Code> prop.
          </p>
          <ComponentExample>
            <div className="flex flex-wrap gap-2 items-center">
              <Trash2 strokeWidth={1} className="size-8" />
              <Trash2 strokeWidth={1.5} className="size-8" />
              <Trash2 strokeWidth={2} className="size-8" />
              <Trash2 strokeWidth={2.5} className="size-8" />
            </div>
            <Code variant="block" language="tsx" showCopyButton copyLabel="Copy code" code={`<Trash2 strokeWidth={} />`} className="mt-8" />
          </ComponentExample>
        </PageSection>

        <PageSection id="colour" label="Colour">
          <h2 className="text-lg font-semibold">Colour</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Icons inherit colour using <Code>currentColor</Code> by default. This ensures they align automatically with surrounding text and UI elements without requiring additional styling.
          </p>
          <p className="mb-8 text-sm text-muted-foreground">
            Colour can be controlled using Tailwind's <Code>text-*</Code> colour utilities, allowing icons to adapt consistently across different contexts and states. This approach keeps icon colour aligned with our design tokens and avoids hardcoded values.
          </p>
          <ComponentExample className="mb-8">
            <div className="flex flex-wrap gap-2 items-center">
              <Trash2 className="size-8 text-blue-500" />
              <Trash2 className="size-8 text-emerald-500" />
              <Trash2 className="size-8 text-yellow-500" />
              <Trash2 className="size-8 text-red-500" />
            </div>
            <Code variant="block" language="tsx" showCopyButton copyLabel="Copy code" code={`<Trash2 className="text-*" />`} className="mt-8" />
          </ComponentExample>
          <h3 className="text-sm font-semibold mb-2">
          Guidelines for icon colour:
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-8">
            <li className="text-sm">Icons should inherit colour from their parent where possible</li>
            <li className="text-sm">Use text colour utilities (e.g. text-primary, text-muted, text-destructive) to apply semantic meaning</li>
            <li className="text-sm">Avoid applying inline styles or hardcoded colour values</li>
            <li className="text-sm">Do not use colour alone to communicate meaning</li>
          </ul>
        </PageSection>

        <PageSection id="fill" label="Fill">
          <h2 className="text-lg font-semibold">Fill</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Lucide icons are stroke-based by default and are designed to be used without fill. This ensures a consistent, lightweight visual style across the interface.
          </p>
          <p className="mb-8 text-sm text-muted-foreground">
          In some cases, fill can be applied using the <Code>fill-*</Code> utility, but this is not supported consistently across all icons and should be used selectively.
          </p>
          <ComponentExample className="mb-8">
            <div className="flex flex-wrap gap-2 items-center">
              <Star className="size-8 fill-blue-500 stroke-blue-500" />
              <Star className="size-8 fill-emerald-500 stroke-emerald-500" />
              <Star className="size-8 fill-yellow-500 stroke-yellow-500" />
              <Star className="size-8 fill-red-500 stroke-red-500" />
            </div>
            <Code variant="block" language="tsx" showCopyButton copyLabel="Copy code" code={`<Star className="fill-* stroke-*" />`} className="mt-8" />
          </ComponentExample>
          <h3 className="text-sm font-semibold mb-2">
          Guidelines for icon fill:
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-8">
            <li className="text-sm">Prefer stroke-only icons as the default approach</li>
            <li className="text-sm">Only apply fill where it adds clear visual value</li>
            <li className="text-sm">Test icons individually before using fill</li>
            <li className="text-sm">Avoid mixing filled and unfilled styles within the same context</li>
          </ul>
        </PageSection>

        <PageSection id="accessibility" label="Accessibility">
          <h2 className="text-lg font-semibold">Accessibility</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Icons are decorative by default and ship with <Code>aria-hidden="true"</Code>. In most cases, this is the correct behaviour, as icons are typically used to support visual scanning or reinforce meaning rather than communicate essential information on their own.
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            Icons should only be made accessible when they convey important meaning independently. In those cases, provide an accessible name using either a <Code>title</Code> element or an <Code>aria-label</Code> attribute. Doing this removes the default <Code>aria-hidden</Code> behaviour and exposes the icon to assistive technologies.
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            When an icon is used inside an interactive control such as a button, the accessible label should usually be applied to the parent control, not the icon itself. This ensures assistive technologies announce the action of the control rather than the decorative graphic inside it. 
          </p>
          <h3 className="text-sm font-semibold mb-2">
          Guidelines for icon accessibility:
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-4">
            <li className="text-sm">Treat icons as decorative by default</li>
            <li className="text-sm">Only expose icons to assistive technologies when they communicate essential meaning on their own</li>
            <li className="text-sm">Apply accessible labels to buttons, links, and other interactive elements rather than the icon inside them</li>
            <li className="text-sm">Do not rely on icons alone to communicate critical information</li>
          </ul>
          <p className="mb-4 text-sm text-muted-foreground">
            Icons should support understanding, not create noise. Use accessibility labels only where they add meaningful context for people using assistive technology.
          </p>
        </PageSection>

      </div>
      <PageSectionNav />
    </div>
  )
}
