import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { Code } from "@gecko/ui/components/code";

export function GuidesStylingPage() {
  return (
    <div>
      <HeaderSection
        id="overview"
        title="Styling"
        description="Components own their look. You control the layout around them. This guide explains the boundary — when to use variant and size, when className is appropriate, and how tokens, Field wrapping, and layout primitives fit together."
      />

      <MainSection
        id="the-contract"
        title="The contract"
        description={
          <>
            Every component owns its own chrome: padding, radius, colour, font
            size, and shadows. Use <Code>variant</Code> and <Code>size</Code> to
            choose the look. Use <Code>className</Code> only for layout around
            the component — margin, width, grid placement — never to override
            its internals.
          </>
        }
      >
        <ChildSection
          id="tokens"
          title="Tokens"
          description={
            <>
              The Core pages document the design tokens that components consume.
              Use them in your own layouts, but do not apply them to override a
              component's built-in styling.
            </>
          }
        >
          <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
            <li>
              <DocsPageLink to="/core/color">Color</DocsPageLink> — semantic
              palette and CSS variables.
            </li>
            <li>
              <DocsPageLink to="/core/typography">Typography</DocsPageLink> —
              font families, scale, and text styles.
            </li>
            <li>
              <DocsPageLink to="/core/spacing">Spacing</DocsPageLink> — layout
              rhythm and the spacing scale.
            </li>
            <li>
              <DocsPageLink to="/core/radius">Radius</DocsPageLink> — corner
              radius tokens.
            </li>
            <li>
              <DocsPageLink to="/core/shadows">Shadows</DocsPageLink> —
              elevation and box-shadow patterns.
            </li>
          </ul>
        </ChildSection>
        <ChildSection
          id="classname"
          title="className"
          description={
            <>
              Pass <Code>className</Code> for layout concerns. Never use it to
              change a component's padding, radius, background, or text colour.
            </>
          }
        >
          <DocsDoDont
            doItems={[
              <>
                Use <Code>className</Code> for margin, width, flex, and grid
                placement.
              </>,
              <>
                Use <Code>variant</Code> and <Code>size</Code> props to change a
                component's look.
              </>,
              <>
                Set colour and background through tokens on the surrounding
                layout, not on the component itself.
              </>,
            ]}
            dontItems={[
              <>
                Don't override padding, radius, or colour with{" "}
                <Code>className</Code>.
              </>,
              <>
                Don't copy Shadcn recipes that restyle chrome with utility
                classes.
              </>,
              <>
                Don't use inline styles to bypass the component's built-in
                sizing.
              </>,
            ]}
          />
        </ChildSection>
      </MainSection>

      <MainSection
        id="forms"
        title="Forms"
        description="Form controls have their own styling rules for wrapping, sizing, and validation."
      >
        <ChildSection
          id="field-wrapping"
          title="Field wrapping"
          description={
            <>
              Form controls belong inside{" "}
              <DocsPageLink to="/components/field">Field</DocsPageLink>. Field
              provides the label, description, and error message. Do not
              recreate that layout with custom markup.
            </>
          }
        >
          <DocsDoDont
            doItems={[
              <>
                Wrap every form control in a{" "}
                <DocsPageLink to="/components/field">Field</DocsPageLink> with a{" "}
                <Code>FieldLabel</Code>.
              </>,
              <>
                Use <Code>FieldDescription</Code> for help text and{" "}
                <Code>FieldError</Code> for validation.
              </>,
              <>
                Match <Code>size</Code> across every control in the same form
                row.
              </>,
            ]}
            dontItems={[
              <>Don't build label and error layout outside of Field.</>,
              <>Don't mix field sizes in the same form row.</>,
              <>
                Don't use <Code>disabled</Code> to represent a validation error.
              </>,
            ]}
          />
        </ChildSection>
      </MainSection>

      <MainSection
        id="layout-wrappers"
        title="Layout wrappers"
        description={
          <>
            <DocsPageLink to="/structure/header">Page Header</DocsPageLink> and{" "}
            <DocsPageLink to="/structure/container">
              Page Container
            </DocsPageLink>{" "}
            own page-level spacing. Do not duplicate their padding on child
            content.
          </>
        }
      >
        <DocsDoDont
          doItems={[
            <>
              Use one{" "}
              <DocsPageLink to="/structure/container">
                Page Container
              </DocsPageLink>{" "}
              around the main page content.
            </>,
            <>
              Place it below a{" "}
              <DocsPageLink to="/structure/header">Page Header</DocsPageLink>.
            </>,
            <>Let Container provide the outer padding and background.</>,
          ]}
          dontItems={[
            <>Don't nest Containers to increase padding.</>,
            <>Don't use Container inside cards, sheets, or dialogs.</>,
            <>Don't duplicate Container's padding on child content.</>,
          ]}
        />
      </MainSection>
    </div>
  );
}
