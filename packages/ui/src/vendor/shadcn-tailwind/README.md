# Shadcn Tailwind styles

An unmodified copy of `shadcn@4.12.0/dist/tailwind.css`, with its accompanying
MIT license. Source: https://github.com/shadcn-ui/ui/tree/main/packages/shadcn

Elements imports this local stylesheet so consumers do not install the Shadcn
CLI merely to obtain its variants, animations, scroll fades and shimmer rules.
The CLI remains a development tool. Its version may advance independently;
review and test stylesheet changes explicitly rather than copying them as part
of every tooling update.

Original CSS SHA-256: `bc7d83425702955b4cb67cb14ede9d603f9d912376d57a2d81d661094d2a782a`.

Preserve these files in packaged output. Validate all application builds,
React compatibility fixtures and the MessageScroller regression after changes.
