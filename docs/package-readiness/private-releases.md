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
