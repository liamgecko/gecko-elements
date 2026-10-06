# Private Elements prereleases

Elements is distributed through npm as `@geckolabs/elements`, with restricted
access and the `next` dist-tag. The initial version is `0.1.0-next.1`.
This process is manual; pushing a branch does not publish anything.

## Account and access

The npm account needs publishing access to the `@geckolabs` organisation, and the
organisation needs private packages enabled. Authenticate with:

```sh
npm login --auth-type=web --registry=https://registry.npmjs.org/
npm whoami --registry=https://registry.npmjs.org/
```

Complete the browser login yourself. Do not paste passwords, npm tokens or recovery
codes into documentation or chat. Normal developer installs can use that npm login.
No credentials are checked into this repository.

Manual publishing uses the authenticated publisher's account and npm's 2FA flow.
For a consuming application's CI, create a separate granular token with read-only
access to this package, store it in the CI secret store as `NPM_TOKEN`, and use
this configuration in that CI environment:

```ini
@geckolabs:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

Grant the application's team read access in npm. Organisation membership alone
does not establish every team member's package access. Keep consumer CI credentials
separate from publisher credentials. The Admin installation and its CI secret
configuration belong to the next integration step; they have not been changed here.

## Prepare and verify one artifact

From the repository root, with dependencies and Playwright's browser installed:

```sh
npm ci
npx playwright install chromium
npm run release:prepare
```

On a machine with Google Chrome installed, `PLAYWRIGHT_CHANNEL=chrome npm run
release:prepare` uses that browser instead.

Preparation builds the package, stages only the distribution, component contracts,
README and package metadata, and removes the source workspace's publication guard
from that staged copy. Build scripts and development dependencies are omitted from
the release manifest. Source `packages/ui/package.json` remains `private: true`.
The staged manifest fixes the registry, `restricted` access and `next` tag.

It packs once, then installs **that same tarball** into isolated React 18.3.1 and
React 19 consumers in both compiled-CSS and Tailwind modes. Consumer tests discover
modules from the installed artifact, not the source workspace. Package integrity,
types, production builds, browser interactions and Button tree shaking are checked.
An npm publish dry run follows. A successful run writes:

```text
.releases/0.1.0-next.1/geckolabs-elements-0.1.0-next.1.tgz
.releases/0.1.0-next.1/verified.json
```

The receipt records the tarball SHA-256 and passed checks. These local artifacts
are ignored by Git. A failed prepare run removes any old success receipt for that
version; it must pass before publication. A changed tarball fails the publish
command's hash check. Do not rebuild or repack between verification and publishing.

## Publish and check access

After reviewing the candidate and confirming branch CI:

```sh
npm run release:publish -- 0.1.0-next.1
```

This verifies the receipt and tarball hash, checks npm authentication, publishes
the exact tarball with explicit restricted access and the `next` tag, then queries
the published version, integrity and access. Complete any npm 2FA prompt yourself.
The source workspace stays private and no branch is merged. On the first release,
npm attached `latest` as well as `next`, despite the explicit `--tag=next` option.
An authenticated `npm dist-tag rm @geckolabs/elements latest` request was rejected
with HTTP 400. Therefore **next-only tagging has not been established**. The version
is still a semantic prerelease; consumers must use the exact version. Verification
reports this extra tag as a warning and does not attempt more registry mutations.

npm versions cannot be reused. If publication fails before uploading, resolve the
reported authentication or organisation issue and retry the same verified artifact.
If publication succeeds but a verification query fails, inspect npm before retrying;
do not assume the version is absent. Run the read-only verification command:

```sh
npm run release:verify -- 0.1.0-next.1
```

Verification checks access, version, `next`, and the registry tarball's SHA-512
integrity against the tested local tarball. It reports whether this version is
also tagged `latest`.
It retries temporary metadata 404s without uploading anything again.
Never switch to public access to work around
an organisation billing or permissions problem.

Consumers install the exact version rather than a moving tag:

```sh
npm install --save-exact @geckolabs/elements@0.1.0-next.1
```

Use matching React, React DOM and React Is peers. See the package usage guide for
the two mutually exclusive CSS modes. Fonts are included for Gecko's internal use;
Satoshi's licence does not authorise public redistribution of the package.

For the next prerelease, increment the UI package version, update the workspace
lockfile with `npm install --ignore-scripts`, and run preparation again. No automatic
version bump, changelog generation or stable-release workflow is introduced here.

## References

- https://docs.npmjs.com/creating-and-publishing-private-packages/
- https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow/
- https://docs.npmjs.com/about-access-tokens/

## First release result — 2026-09-09

- Published privately: `@geckolabs/elements@0.1.0-next.1`.
- Publisher: `liamgecko`, developer in `geckolabs`.
- Branch CI for `5abf701` passed before release preparation:
  https://github.com/liamgecko/gecko-elements/actions/runs/34375824155
- The exact release artifact passed React 18.3.1 and React 19.2.5 in both CSS
  modes, including development/production browsers, types, builds, package
  integrity and Button tree shaking. Publication dry run passed.
- Tarball SHA-256: `b5fdcf263ef262962ed96de152dd47258e342c90fd98567f45454194f0633ae0`.
- The first metadata lookup returned 404 even though package access and tags
  existed. Metadata became readable later without another publication or a change
  to permissions. The CLI now supports read-only verification and bounded retries.
- A fresh project installed the exact version from the private registry with
  React, React DOM and React Is 18.3.1. `npm ls` passed with the host React deduped.
- Both `next` and `latest` point to this prerelease; the attempted `latest`
  removal failed with HTTP 400. Do not describe this as a next-only publication.
- No Admin source or CI settings have been changed, and no consumer CI token has
  been created. Those remain part of the initial Admin integration.


## 0.1.0-next.2 candidate

This prerelease brings the shared components used by the Admin shell experiment
into the package:

- Account switcher: stable measured width, bounded scrolling, Accounts grouping,
  a separate return action and a selected-account tick.
- User menu: native links and unread indicators; unread presentation is also
  available directly on DropdownMenuItem.
- DropdownMenuSwitchItem: switch presentation with menu keyboard semantics,
  stays open by default, and avoids a row hover background.
- Sidebar: optional expand-only group navigation, optional favourite rename,
  and “Remove from favourites” action wording.
- Updated live examples, component contracts and sentence-case typography guidance.

Existing callers retain first-child navigation unless they pass
`navigateOnGroupOpen={false}`. Omit `onRename` to hide favourite renaming.
The source workspace remains private. Preparation and publication results must
be recorded separately; this candidate section does not establish publication.

### Preparation result — 2026-09-10

- Verified the exact `0.1.0-next.2` tarball on React 18.3.1 and React 19.2.5,
  in compiled-CSS and Tailwind modes, with development and production browser checks.
- Package integrity, consumer types/builds, Button tree shaking and npm publish
  dry run passed. The Elements typecheck, React ref audit and docs build passed.
- The existing browser harness tolerated ResizeObserver notification-loop warnings
  during the Tailwind development runs; all interaction assertions passed.
- Tarball SHA-256: `b5d3fa57332304ad5b702853cf9c13de73508b7c0e9660b27cac3363f99bc479`.
- Publication initially required renewed npm authentication. After browser approval,
  `npm run release:publish -- 0.1.0-next.2` succeeded on 2026-09-10.
- Registry verification confirmed private access, the `next` tag and exact tarball
  integrity matching the tested artifact.
- No Web App files were changed during package preparation.

## 0.1.0-next.3 release — 2026-09-24

This release packages the component and contract updates made since next.2,
including Card sizes, Data table application patterns, and Rich text editor.
The source workspace remains protected by `private: true`.

- `release:prepare` passed for the exact next.3 tarball: React 18.3.1 and React
  19.2.5 consumers in compiled-CSS and Tailwind modes, including browser checks,
  package integrity, types, builds, tree shaking and npm publish dry run.
- Tarball SHA-256: `1d592f2988138a8f7b9ec7c1a0609518cf6329feb18d153d208ab9094e24e059`.
- The verified tarball was installed locally into the Admin React trial; its
  development build passed with `Card size="sm"`.
- Published privately as `@geckolabs/elements@0.1.0-next.3` after renewing npm
  browser authentication and completing npm's publish challenge.
- Registry verification confirmed private access, the `next` tag and integrity
  matching the exact tested tarball. Admin initially pinned this version; see next.4 below for its current installation.

## 0.1.0-next.4 release — 2026-09-24

- Adds accessible names to collapsed App Sidebar links and a disabled option for App Header status controls.
- Published the already-verified artifact privately after explicit user approval and npm browser authentication. No new test run was performed for publication/install.
- Registry verification confirmed restricted/private access, the `next` tag and exact artifact integrity.
- Tarball SHA-256: `c5359d71bc589dd2d68474b01d42dd3dac44ddf260a5b0e1e7bccf04461f5f22`.
- Admin now installs exact version `0.1.0-next.4` from npm. Its vendored artifact folder and file dependency were removed.
- The installation failure was caused by an invalid project-level npm token overriding the working user login. That override was removed without changing Font Awesome configuration. Do not substitute a vendored package for an unexplained private-registry 404; verify authentication from the consuming project first.

## 0.1.0-next.5 release — 2026-09-28

- Caps the Data table page-number Select popup at 18rem or the available viewport height, with internal scrolling.
- The release candidate was assembled from the published next.4 baseline in an isolated temporary checkout. Its distribution differs from next.4 only in the pagination module and the generated CSS rule; its Data table contract adds the matching note. Unrelated in-progress source changes were excluded.
- `release:prepare` passed with installed Google Chrome: React 18 and 19 consumers in compiled-CSS and Tailwind modes, package integrity, browser interactions, builds, tree shaking and npm publish dry run.
- Verified tarball SHA-256: `b04f3bfa902e2a41b7bf335436bd555d6f975e36806edbd31d34f18673a50d49`.
- Published privately after explicit user approval and npm browser authentication. Registry verification confirmed restricted access, the `next` tag and exact artifact integrity.
- Admin initially installed the exact `0.1.0-next.5` version from npm. Its development build passed, and the installed JavaScript and compiled CSS contain the dropdown cap. Later versions retain this fix.

## 0.1.0-next.6 release — 2026-09-28

- Adds the documented App Sidebar unread-group indicator, including a notification dot in expanded and collapsed modes and accessible unread text.
- `release:prepare` passed with Google Chrome for React 18 and 19 consumers in compiled-CSS and Tailwind modes, package integrity, browser interactions, builds, tree shaking and npm publish dry run.
- Verified tarball SHA-256: `756d3b1e13984858a7b2826c9baac6e4727506c81b689f96f392fe93defcbecd`.
- Published privately after user approval. Registry verification confirmed restricted access, the `next` tag and exact artifact integrity.
- Admin initially installed the exact `0.1.0-next.6` version from npm. Its development build passed, and the installed JavaScript and generated stylesheet contain the unread indicator. See next.7 for its current installation. Live unread-conversation behavior remains to be verified in a signed-in session.

## 0.1.0-next.7 release — 2026-09-28

- Keeps App Sidebar group labels on one line during collapse and expansion by truncating the label span directly. The exact release artifact differs from next.6 only in App Sidebar JavaScript, its contract, and the package version.
- `release:prepare` passed with Google Chrome for React 18 and 19 consumers in compiled-CSS and Tailwind modes, package integrity, browser interactions, builds, tree shaking and npm publish dry run.
- Verified tarball SHA-256: `0ec28ec1f389d3afe42932e6369cf46e747dd7c60d5027f57e8858748279fc8a`.
- Published privately after user approval and npm browser authorization. Registry verification confirmed restricted access, the `next` tag and exact artifact integrity.
- Admin installs the exact `0.1.0-next.7` version from npm. Its development build passed; the installed sidebar JavaScript and generated Admin CSS contain the label truncation treatment.

## 0.1.0-next.8 release — 2026-09-30

The 29 September artifact was prepared for collapsed sidebar flyouts. The final
30 September release also makes the enabled Combobox clear control part of
the normal tab order. Browser checks confirmed Tab/Shift+Tab reach it and
Enter/Space clear the selection and return focus to the input; Elements
typechecking passed.

The original artifact was superseded: its receipt was removed, and release
preparation was rerun against the final source including the Combobox correction
and Button presets.

### Button presets — 2026-09-30

The final next.8 release also supplies typed, optional Button action presets
(icon and default variant), inherited by Header button actions and supported by
AlertDialogAction/Cancel. Existing manual-icon Alert dialog compositions remain
compatible when no preset is supplied. DialogFooter’s built-in dismissal action
uses the Close preset. Common actions, variant overrides and consumer ownership
are documented in the Button contract, action-icon guide and executable recipes.
Admin’s migrated Elements actions use those presets; legacy presentation and
Commands remain unchanged.

- Published privately on 30 September 2026 with the `next` tag. Registry verification confirmed restricted access and exact tarball integrity.
- Final artifact passed React 18.3.1 and React 19 in compiled-CSS and Tailwind modes, including consumer types/builds, browser interactions and tree shaking. Publication dry run passed.
- SHA-256: `bcb721c091e1301d0f8feaeb5d8af3b01a6fa2af2ca35f1170b9bfb762db8af9`.
- Library and docs typechecks, executable recipe typecheck, capability index and static application contract checks passed. The live action guide and form/Header recipes each render one decorative Save icon.
- Admin installed the exact registry version `0.1.0-next.8`; manifest and lockfile changed together. Its development build passed (existing chunk-size warnings only), and the installed public Button declaration exposes `preset`. No vendored package files were added.

## 0.1.0-next.9 release — 2026-09-30

Button presets are now exactly `add`, `save`, `cancel`, `edit`, `delete`, `copy`,
`actions` and `retry`. The `actionIcons` map retains its existing glyph aliases for
manual icon compositions; these are no longer additional Button presets.
DialogFooter uses Cancel, and Admin uses the reduced names without changing its
labels, requests, permissions or destinations. The human Button page lists all
presets immediately before API; its contract and guide agree. Loading guidance
now permits Save/Update while keeping the button label unchanged.

Preparation passed React 18.3.1 and React 19 in both CSS modes, including consumer
types/builds and browser checks. Library/docs/recipe typechecks passed. Publication succeeded privately with the `next` tag; registry integrity and
restricted access were verified. Admin installs the exact next.9 version.

The Admin dev server was still serving `node_modules/.vite/deps/button-D-m_xKaI.js`
with the older Button implementation (`variant = "default"` and no `preset`
handling), although the installed package was next.8. Categories' served module
already supplied `preset: "add"`. This stale dependency optimisation explains the
missing icons; after installing next.9, restart Vite with `--force` and check the
served dependency, not merely the installed files.

Vite was restarted with `npm start -- --force` after installation. Its rebuilt
`button-BrXEFWJ1.js` now contains `buttonPresets`, consumes `preset`, selects the
preset variant and renders its icon. Admin's development build and diff checks
passed. Signed-in browser verification was interrupted by user browser activity;
no full live-action check is claimed.

Artifact SHA-256: `fcd68a7d39cff97e6f7bb951dd181db5ef32519fc1c04149bdf4156acf8c147c`.

## 0.1.0-next.10 release — 5 October 2026

DataTable's existing `updating` state now owns a body-only dimming/Spinner overlay after 150ms. The body becomes inert immediately using the existing React 18/19 helper; headers, query controls and pagination remain available. Initial `loading` still uses skeleton cells. One live status announces loading and the visual Spinner is decorative. The component contract and human preview document this behaviour; applications must supply `updating` during requests rather than building overlays themselves.

Library/docs typechecks and release preparation passed React 18/19 consumers in both compiled-CSS and Tailwind modes. In the docs preview, all 15 body rows remained mounted, the overlay top matched the body top exactly, the body had inert and the table aria-busy; completion removed the overlay, inert and busy state. The artifact SHA-256 is `a050c9069ce7a140f9a10680e16f3fe1aeb4fdd15f87983596ba660cdb4376a2`. Publication initially required renewed npm login and separate browser publishing approval. Publication then succeeded privately with the next tag; registry checks confirmed restricted access and exact artifact integrity. No API changes or commits are part of this update.

Admin now installs the exact registry version `0.1.0-next.10` in its manifest and lockfile. Its development build and whitespace check passed. Vite was restarted with `--force` to remove the previous optimized dependency; the installed DataTable contains the overlay implementation. No API commit was created.


## 0.1.0-next.11 release — 5 October 2026

Published privately with the next tag and installed exactly in Admin. Registry verification confirmed restricted access and the tested tarball integrity. Relative to next.10 the distribution changes are confined to AppSidebar/SidebarInset, styles, their contracts and the manifest. AppSidebar removes its right border and favourites separator; the footer removes its top separator. SidebarProvider uses bg-sidebar. SidebarInset has rounded left corners, correct surface stacking and the left-offset shadow-shell token in light mode; dark mode uses a subtle border without a shadow. The token uses an 8px left offset, 32px blur, -8px spread and 8% opacity.

React 18.3.1/19 compatibility passed in compiled-CSS and Tailwind modes, including development/production browser checks. The first preparation attempt stopped because the required Chromium headless-shell build 1243 was missing; installing that browser runtime and rerunning the unchanged release checks succeeded. It is a verification runtime, not an added application dependency. Admin's development build and whitespace checks passed. Vite restarted with --force. No commits or pushes were made.

Artifact SHA-256: `42212bdc5cc0fba2fab55156b29c3794e353d94e5498b1b3cc44e5f0f4c0a38b`. Signed-in Admin visual acceptance remains for Liam's session; the verification browser's workspace startup failure was not resolved by this styling release.


Admin framing correction after installation: applying bg-sidebar to the outer provider hid the existing margins/radius against the same background. Admin now retains bg-chrome on the outer provider and applies bg-sidebar to its inner rounded sidebar/body wrapper. The 8px side/bottom margins and rounded-xl outer frame remain intact. This is an Elements-partition integration correction; no additional package release is needed.


## 0.1.0-next.12 release — 5 October 2026

Published privately with the next tag; registry verification confirmed restricted access and exact tarball integrity. Installed exactly in Admin with manifest/lockfile updated together. Relative to next.11 the distribution changes are only Sidebar's collapsed flyout heading fallback, its contract and the package manifest. Icon-only triggers now use their aria-label when tooltip and visible text provide no heading, restoring the translated Favourites label.

Release preparation passed React 18.3.1/19 compiled-CSS and Tailwind development/production checks. Admin's development build passed, and Vite restarted with --force. Signed-in visual acceptance remains pending. No API edits, commits or pushes were made.

Artifact SHA-256: `b822f2b8d69a15624d477a221173f63e9e09d1cf4599ecfbfaa90aa5d7e0603d`.

## 0.1.0-next.13 release — 6 October 2026

DataTable adds a documented `toolbar.actions` slot for application-owned collection actions. Admin's Contact fields list uses it for “Change field order”. The package also contains the current library changes documented in its component contracts. Release preparation passed React 18.3.1 and React 19 in compiled-CSS and Tailwind modes, including consumer builds, browser checks, tree shaking and a publish dry run. The exact artifact was published privately with the `next` tag; registry integrity and restricted access were verified. Admin installs the exact `0.1.0-next.13` version in its manifest and lockfile, and its development build passed. The local Vite server was restarted with forced dependency optimisation; its served DataTable contains the actions slot. Signed-in Contact fields acceptance remains open because the available browser cannot load the workspace.

Artifact SHA-256: `6506f71f57948f69469f9af6db4919bd006357e7d843a22d1cb4db0ccba87d1d`.
