# @gecko/ui usage guide

Gecko Elements is the shared React component library for the Gecko desktop application. Start with the matching [component contract](docs/) before implementing or changing a component or consuming it in a product. Contracts specify public imports, composition, behaviour and visual treatment; implementation types confirm the available API.

## Desktop application scope

The Gecko application, including the Sandbox Inbox, is a desktop application. Mobile layouts, phone breakpoints, touch-specific navigation and mobile visual checks are not requirements. Do not add them or report their absence as a defect unless the user explicitly requests mobile support for a particular product surface.

Support desktop window resizing, keyboard navigation, screen readers, browser zoom and the approved appearance modes. Component overflow inside a desktop panel remains relevant. Existing capabilities used by other consumers should not be removed merely because the desktop app does not require them.

## Find and compose components

Search `docs/` by the user's task, then read the candidate contracts. Import components and compound parts through their documented public `@gecko/ui` entry points. There is no package-root component barrel. Load `@gecko/ui/globals.css` once at the application entry point and retain the required Tailwind source scanning and providers.

Start from canonical composition. Components own appearance and interaction states. Use documented props; use `className` only for the layout integration allowed by the contract. Keep application state, persistence, permissions and request handling in the consuming product. Read [Approved UI dependencies](docs/dependencies.md) before adding, replacing or directly importing an external UI dependency.

Panel disclosure buttons follow the [Button contract](docs/button.md); conversation row actions follow the [Chat Head contract](docs/chat-head.md).

## Missing capabilities and verification

Report the required capability, contracts checked and the exact gap. Fix approved component gaps in the library and update the contract and live examples; do not create a locally restyled alternative in the product.

Run the consuming application's build and relevant library checks. Verify changed behaviour in the browser at desktop sizes, including keyboard operation, appearance modes and applicable empty, error or disabled states. Keep component defects separate from missing application integration.
