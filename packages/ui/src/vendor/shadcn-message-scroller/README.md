# Shadcn Message scroller compatibility copy

This directory contains the distributed JavaScript and declarations from
`@shadcn/react@0.2.0`, under the accompanying MIT license. Upstream:
https://github.com/shadcn-ui/ui/tree/main/packages/react

That release declares React >=19 and uses ref-as-prop. Gecko supports React
18.3.1 and React 19. To preserve the approved scrolling implementation without
installing a React-19-only peer into React 18 consumers, the existing dependency
is maintained here with these targeted changes:

- Wrap Root, Viewport, Content, Item and Button in `React.forwardRef`.
- Merge the Root's internal registration ref with the consumer's ref.
- Retain merged-ref callbacks so React 19 cleanup callbacks and React 18 null cleanup both run.
- Read render-element refs from the React-appropriate location.
- Serialize inactive buttons' native `inert` attribute for each React version.

The scrolling/state/observer algorithm and public props remain upstream's.
The JavaScript has been formatted for inspection; short identifiers come from the
published artifact. Application code must continue to use Gecko's public wrapper.

Run `npm run test:react-compat` after any update. The fixture covers both React
versions, actual scrolling, item registration, prepend preservation, following
new content, native inert state and ref cleanup. Review upstream changes before
replacing this copy; do not silently restore the incompatible package dependency.
