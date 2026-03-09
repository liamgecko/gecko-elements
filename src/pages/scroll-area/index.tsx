import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

type Artwork = {
  artist: string
  art: string
}

const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
]

export function ScrollAreaPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-semibold text-foreground">Scroll area</h1>
          <p className="text-sm text-muted-foreground">
            Display scrollable content with a custom scrollbar that matches the rest of the design system.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic">
          <h2 className="text-lg font-semibold">Basic</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ScrollArea</code> to render a scrollable region with a styled scrollbar.
          </p>
          <ComponentExample>
            <ScrollArea className="h-72 w-48 rounded-md border">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                {tags.map((tag) => (
                  <div key={tag}>
                    <div className="text-sm">{tag}</div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </ComponentExample>
        </PageSection>

        <PageSection id="horizontal" label="Horizontal">
          <h2 className="text-lg font-semibold">Horizontal</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            For horizontal content add a{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ScrollBar</code>{" "}
            with <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">orientation=&quot;horizontal&quot;</span>.
          </p>
          <ComponentExample>
            <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 p-4">
                {works.map((artwork) => (
                  <figure key={artwork.artist} className="shrink-0">
                    <div className="overflow-hidden rounded-md">
                      <img
                        src={artwork.art}
                        alt={`Photo by ${artwork.artist}`}
                        className="aspect-3/4 h-64 w-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                    <figcaption className="pt-2 text-xs text-muted-foreground">
                      Photo by{" "}
                      <span className="font-semibold text-foreground">
                        {artwork.artist}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
