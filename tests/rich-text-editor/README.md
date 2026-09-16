# Rich text editor regression checks

Run from the repository root:

```sh
npm run build:package
node --test tests/rich-text-editor/legacy-html.test.mjs
npm run build --workspace docs
npm run check:react-refs
```

The Node tests protect the migrated script/style serializer against removal of ordinary CSS, template tokens and Unicode. They do not exercise browser editing. The docs build verifies the consuming TSX and produces the static assets under its deployment base path. The package build verifies the public ref/declaration boundary.

## Browser protocol

Open `/components/rich-text-editor#basic-example` in the docs app. It renders two real independent TinyMCE 4.7.1 instances (no editor mock).

- Initial load: both instances become ready; typing/tag actions work; no initial dirty report. Wrapper height remains 480 before and after readiness.
- Enter text in Content and try undo/redo. Ref insertion, capture and dirty-state checks require a consuming test harness; the docs no longer include a template-tags/saving example.
- Open Source code, change the complete document and accept. Reopen to check title, head CSS, table structure, Unicode and a `href="{{contact.email}}"` link survive. Entity/whitespace normalisation is expected.
- Toggle the second instance read-only and invalid. Verify `contenteditable=false`, `aria-readonly=true`, `aria-invalid=true` and the mirrored error description on its inner textbox. It remains focusable/selectable; the first editor remains editable.
- Click the visible label; verify focus reaches its editing surface. Press Alt+F10 to enter the toolbar. Use arrow keys and Escape to leave menus/dialogs.
- Switch light/dark themes with unsaved content present: toolbar, dropdowns and dialogs change appearance without recreating the document; authored email colours remain unchanged.
- Resize a desktop window. Check wrapped toolbar groups, internal content scrolling, source dialog buttons and link/image/table dialogs. No second page-level scrollbar or clipped footer should appear.
- For asset recovery, temporarily move **only the generated docs copy** of tinymce.min.js aside, reload and verify the error/retry UI retains the reserved height. Restore the file, then retry each instance and verify readiness/content. Do not modify the vendored source to simulate failure.
- Navigate away and back to check cleanup/remount. Follow up with controlled value replacement, late-load unmount and actual parent TinyMCE 7 coexistence when integrating the Admin page.

## Verification recorded 2026-09-15

Browser checks completed in the initial docs application (the template-tags/saving example was subsequently removed): initial loading; typing; first-name insertion; captured full HTML; dirty → clean → dirty; independent instances; source editing with head/style/table/Unicode/tag-link preservation; Alt+F10 toolbar focus; read-only and invalid state mirroring; light/dark chrome; narrow panel and 1280px desktop layout; missing runtime → retry recovery with stable 480px outer height.

No customer template was created, changed or sent. Real email-client rendering, production CSP, non-English language packs and the complete Admin editor flow remain integration checks, not claims established by these component checks.

Gecko skin checks completed in the local Admin component preview: light/dark toolbar and format menus; source, image and link dialogs; wrapped toolbar and source footer at 1024px and 1280px desktop widths; unchanged authored canvas on theme changes. The preview uses sample data and mocked saves.

Toolbar refinement: verified Gecko icon masks, formatting pressed state and undo, table menu, light/dark appearance, and complete-group wrapping at 1024px. Keyboard Source code activation still opens the native dialog.

Font menu overflow regression: open Font Family in a 480px editor. Its list must scroll within a capped height instead of covering the trigger. Verified menu top 39px versus trigger bottom 40px (shared border), menu height 330px versus the previous 502px extending from the viewport top.

## Automated application regression suite

`npm run test:rich-text-editor` now runs serializer tests and the real-browser fixture in `tests/application-recipes/main.tsx`. It covers full-page HTML roundtrip, edit/save/remount, popup positioning, appearance changes, read-only mode, asset retry, independent instances and value replacement during startup. Use `PLAYWRIGHT_CHANNEL=chrome` locally if using the installed Chrome. See [current verification coverage](../../packages/ui/docs/verification.md) for limits and CI wiring.

The remount test protects a teardown regression: TinyMCE can read styles during `remove()`, so its wrapper must clean up in a layout effect before React detaches the iframe. Do not move that cleanup back to a passive effect without exercising the real-runtime test.
