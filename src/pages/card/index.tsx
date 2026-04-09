import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Button } from "@/components/ui/button"

export function CardPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Card</h1>
          <p className="text-sm text-muted-foreground">
            A container for grouping related content. Use the card body alone or
            combine with header and footer for structure.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic example">
          <h2 className="text-lg font-semibold">Basic examples</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A card with only the body (content). Use for simple blocks of content
            without a title or actions.
          </p>
          <ComponentExample>
            <Card>
              <CardContent>
                <p className="text-sm">
                  This is the card body. It can contain any content—text,
                  lists, or other components.
                </p>
              </CardContent>
            </Card>
          </ComponentExample>
        </PageSection>

        <PageSection id="variants" label="Variants">
          <h2 className="text-lg font-semibold">Variants</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Compose cards with optional header and footer for different layout
            patterns.
          </p>

          <h3 id="variants-with-header" className="mb-3 text-base font-semibold">Card with header</h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>
                  Optional short description or subtitle for the card.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Main content goes here. The header provides context with a
                  title and optional description.
                </p>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="variants-with-header-tooltip" className="mb-3 text-base font-semibold">
            Card with header tooltip
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Set tooltip on CardHeader to show CardDescription in the help tooltip instead of
            under the title. You can still pass custom tooltip content instead of using
            CardDescription.
          </p>
          <ComponentExample className="mb-6">
            <Card>
              <CardHeader tooltip>
                <CardTitle>Card title</CardTitle>
                <CardDescription>
                  Optional longer explanation that appears on hover.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Main content goes here. The header shows only the title; use the help
                  icon for the description.
                </p>
              </CardContent>
            </Card>
          </ComponentExample>

          <h3 id="variants-with-footer" className="mb-3 text-base font-semibold">Card with footer</h3>
          <ComponentExample className="mb-6">
            <Card>
              <CardContent>
                <p className="text-sm">
                  Card content above. Use the footer for actions or secondary
                  information.
                </p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>
          </ComponentExample>

          <h3 id="variants-with-header-and-footer" className="mb-3 text-base font-semibold">
            Card with header and footer
          </h3>
          <ComponentExample>
            <Card>
              <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>
                  Optional description for the card.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Main content area. Combine header, body, and footer for full
                  structure.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  Cancel
                </Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
