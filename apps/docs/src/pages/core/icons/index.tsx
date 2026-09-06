import { ComponentExample } from "@/components/layout/component-example";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import Delete02Icon from "@hugeicons/core-free-icons/Delete02Icon";
import StarIcon from "@hugeicons/core-free-icons/StarIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";
import { Code } from "@gecko/ui/components/code";

export function IconsPage() {
  return (
    <div>
      <HeaderSection
        id="overview"
        title={<>Icons</>}
        description={
          <>
            A consistent, lightweight icon system designed to support clarity,
            usability, and visual hierarchy across the product.
          </>
        }
      />

      <MainSection
        id="usage"
        title={<>Usage</>}
        description={
          <>
            Icons help users scan interfaces quickly and understand actions at a
            glance. They add structure, reinforce hierarchy, and reduce reliance
            on text when used consistently and with clear intent.
          </>
        }
      >
        <p className="text-sm text-muted-foreground">
          In our system, icons are used to support common actions, navigation,
          and status. They should always be familiar, predictable, and aligned
          with established conventions, for example a trash icon for delete or a
          cog for settings. Icons should support meaning, not replace it, and
          should be paired with labels where clarity is important.
        </p>
      </MainSection>

      <MainSection
        id="icon-library"
        title={<>Icon library</>}
        description={
          <>
            We use Hugeicons as our icon library.{" "}
            <DocsExternalLink href="https://hugeicons.com/">
              Hugeicons
            </DocsExternalLink>{" "}
            provides a consistent set of lightweight, open source SVG icons that
            integrate well with modern frontend tooling.
          </>
        }
      >
        <p className="mb-4 text-sm text-muted-foreground">
          Because Hugeicons are SVG-based, they are:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground pl-4">
          <li className="text-sm">Scalable without loss of quality</li>
          <li className="text-sm">
            Stylistically consistent across the product
          </li>
          <li className="text-sm">
            Easy to customise via size, stroke, and colour
          </li>
          <li className="text-sm">
            Optimised for performance, as only the icons we import are included
            in the bundle
          </li>
        </ul>
      </MainSection>

      <MainSection
        id="sizing"
        title={<>Sizing</>}
        description={
          <>
            Icon sizing is standardised using the <Code>size</Code> utility to
            ensure consistency across the interface. This approach keeps icons
            aligned with our spacing system and avoids the need for custom
            sizing values.
          </>
        }
      >
        <p className="mb-4 text-sm text-muted-foreground">
          In most cases, icon size is not set manually. Instead, it is handled
          at the component level using predefined utility classes. This ensures
          icons scale consistently across different UI elements and reduces
          variation in implementation.
        </p>
        <ComponentExample>
          <div className="flex flex-wrap gap-2 items-center">
            <HugeiconsIcon icon={Delete02Icon} className="size-4" />
            <HugeiconsIcon icon={Delete02Icon} className="size-6" />
            <HugeiconsIcon icon={Delete02Icon} className="size-8" />
            <HugeiconsIcon icon={Delete02Icon} className="size-10" />
            <HugeiconsIcon icon={Delete02Icon} className="size-12" />
            <HugeiconsIcon icon={Delete02Icon} className="size-14" />
            <HugeiconsIcon icon={Delete02Icon} className="size-16" />
            <HugeiconsIcon icon={Delete02Icon} className="size-18" />
            <HugeiconsIcon icon={Delete02Icon} className="size-20" />
          </div>
          <Code
            variant="block"
            language="tsx"
            showCopyButton
            copyLabel="Copy code"
            code={`import Delete02Icon from "@hugeicons/core-free-icons/Delete02Icon"
import { HugeiconsIcon } from "@gecko/ui/lib/icon"

<HugeiconsIcon icon={Delete02Icon} className="size-*" />`}
            className="mt-8"
          />
        </ComponentExample>
      </MainSection>

      <MainSection
        id="stroke-width"
        title={<>Stroke width</>}
        description={
          <>
            Icons use a consistent stroke style to maintain visual clarity and
            cohesion across the interface. Stroke is controlled at the component
            level and should not be adjusted on a per-instance basis.
          </>
        }
      >
        <p className="mb-4 text-sm text-muted-foreground">
          Gecko renders icons with a consistent 2px stroke by default. In cases
          where a different optical weight is required, it can be overridden
          using the <Code>strokeWidth=&#123;&#125;</Code> prop.
        </p>
        <ComponentExample>
          <div className="flex flex-wrap gap-2 items-center">
            <HugeiconsIcon
              icon={Delete02Icon}
              strokeWidth={1}
              className="size-8"
            />
            <HugeiconsIcon
              icon={Delete02Icon}
              strokeWidth={1.5}
              className="size-8"
            />
            <HugeiconsIcon
              icon={Delete02Icon}
              strokeWidth={2}
              className="size-8"
            />
            <HugeiconsIcon
              icon={Delete02Icon}
              strokeWidth={2.5}
              className="size-8"
            />
          </div>
          <Code
            variant="block"
            language="tsx"
            showCopyButton
            copyLabel="Copy code"
            code={`<HugeiconsIcon icon={Delete02Icon} strokeWidth={} />`}
            className="mt-8"
          />
        </ComponentExample>
      </MainSection>

      <MainSection
        id="colour"
        title={<>Colour</>}
        description={
          <>
            Icons inherit colour using <Code>currentColor</Code> by default.
            This ensures they align automatically with surrounding text and UI
            elements without requiring additional styling.
          </>
        }
      >
        <p className="mb-4 text-sm text-muted-foreground">
          Colour can be controlled using Tailwind's <Code>text-*</Code> colour
          utilities, allowing icons to adapt consistently across different
          contexts and states. This approach keeps icon colour aligned with our
          design tokens and avoids hardcoded values.
        </p>
        <ComponentExample>
          <div className="flex flex-wrap gap-2 items-center">
            <HugeiconsIcon
              icon={Delete02Icon}
              className="size-8 text-blue-500"
            />
            <HugeiconsIcon
              icon={Delete02Icon}
              className="size-8 text-emerald-500"
            />
            <HugeiconsIcon
              icon={Delete02Icon}
              className="size-8 text-yellow-500"
            />
            <HugeiconsIcon
              icon={Delete02Icon}
              className="size-8 text-red-500"
            />
          </div>
          <Code
            variant="block"
            language="tsx"
            showCopyButton
            copyLabel="Copy code"
            code={`<HugeiconsIcon icon={Delete02Icon} className="text-*" />`}
            className="mt-8"
          />
        </ComponentExample>
        <ChildSection title={<>Guidelines:</>}>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-8">
            <li className="text-sm">
              Icons should inherit colour from their parent where possible
            </li>
            <li className="text-sm">
              Use text colour utilities (e.g. text-primary, text-muted,
              text-destructive) to apply semantic meaning
            </li>
            <li className="text-sm">
              Avoid applying inline styles or hardcoded colour values
            </li>
            <li className="text-sm">
              Do not use colour alone to communicate meaning
            </li>
          </ul>
        </ChildSection>
      </MainSection>

      <MainSection
        id="fill"
        title={<>Fill</>}
        description={
          <>
            Hugeicons are stroke-based by default and are designed to be used
            without fill. This ensures a consistent, lightweight visual style
            across the interface.
          </>
        }
      >
        <p className="mb-4 text-sm text-muted-foreground">
          In some cases, fill can be applied using the <Code>fill-*</Code>{" "}
          utility, but this is not supported consistently across all icons and
          should be used selectively.
        </p>
        <ComponentExample>
          <div className="flex flex-wrap gap-2 items-center">
            <HugeiconsIcon
              icon={StarIcon}
              className="size-8 fill-blue-500 stroke-blue-500"
            />
            <HugeiconsIcon
              icon={StarIcon}
              className="size-8 fill-emerald-500 stroke-emerald-500"
            />
            <HugeiconsIcon
              icon={StarIcon}
              className="size-8 fill-yellow-500 stroke-yellow-500"
            />
            <HugeiconsIcon
              icon={StarIcon}
              className="size-8 fill-red-500 stroke-red-500"
            />
          </div>
          <Code
            variant="block"
            language="tsx"
            showCopyButton
            copyLabel="Copy code"
            code={`<HugeiconsIcon icon={StarIcon} className="fill-* stroke-*" />`}
            className="mt-8"
          />
        </ComponentExample>
        <ChildSection title={<>Guidelines:</>}>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-8">
            <li className="text-sm">
              Prefer stroke-only icons as the default approach
            </li>
            <li className="text-sm">
              Only apply fill where it adds clear visual value
            </li>
            <li className="text-sm">
              Test icons individually before using fill
            </li>
            <li className="text-sm">
              Avoid mixing filled and unfilled styles within the same context
            </li>
          </ul>
        </ChildSection>
      </MainSection>

      <MainSection
        id="accessibility"
        title={<>Accessibility</>}
        description={
          <>
            Treat icons as decorative by default by passing{" "}
            <Code>aria-hidden="true"</Code>. In most cases, this is the correct
            behaviour because icons support visual scanning rather than
            communicating essential information on their own.
          </>
        }
      >
        <ChildSection title={<>Making icons accessible</>}>
          <p className="mb-4 text-sm text-muted-foreground">
            Icons should only be made accessible when they convey important
            meaning independently. In those cases, provide an accessible name
            with <Code>role="img"</Code> and an <Code>aria-label</Code>. Do not
            also pass <Code>aria-hidden</Code>.
          </p>
          <Code
            variant="block"
            language="tsx"
            showCopyButton
            copyLabel="Copy code"
            code={`<HugeiconsIcon
  icon={Home04Icon}
  role="img"
  aria-label="Home"
/>`}
            className="mb-8"
          />
        </ChildSection>
        <ChildSection title={<>Icon button accessibility</>}>
          <p className="mb-4 text-sm text-muted-foreground">
            When an icon is used inside an interactive control such as a button,
            the accessible label should usually be applied to the parent
            control, not the icon itself. This ensures assistive technologies
            announce the action of the control rather than the decorative
            graphic inside it.
          </p>
          <Code
            variant="block"
            language="tsx"
            showCopyButton
            copyLabel="Copy code"
            code={`<button aria-label="Open settings">
  <HugeiconsIcon icon={Settings02Icon} aria-hidden="true" />
</button>`}
            className="mb-4"
          />
        </ChildSection>
        <ChildSection title={<>Guidelines:</>}>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-4">
            <li className="text-sm">Treat icons as decorative by default</li>
            <li className="text-sm">
              Only expose icons to assistive technologies when they communicate
              essential meaning on their own
            </li>
            <li className="text-sm">
              Apply accessible labels to buttons, links, and other interactive
              elements rather than the icon inside them
            </li>
            <li className="text-sm">
              Do not rely on icons alone to communicate critical information
            </li>
          </ul>
          <p className="mb-4 text-sm text-muted-foreground">
            Icons should support understanding, not create noise. Use
            accessibility labels only where they add meaningful context for
            people using assistive technology.
          </p>
        </ChildSection>
      </MainSection>
    </div>
  );
}
