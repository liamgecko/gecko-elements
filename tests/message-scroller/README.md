# Message-scroller position regression

Run `npm run test:message-scroller` after installing Playwright Chromium
(`npx playwright install chromium`). The test starts its own docs Vite server.
To use installed Google Chrome, set `PLAYWRIGHT_CHANNEL=chrome`. To reuse a
running docs server, set `DOCS_URL=http://127.0.0.1:5188/`.

The browser exercises the actual Anchoring Turns demo with user and assistant
anchors, both with normal and reduced motion. It samples existing row positions
on animation frames across non-anchor appends and incremental reply growth.
Intentional scrolling to a newly appended anchor is excluded. The tolerance is
less than half a CSS pixel; checking only the final position would miss transient
corrections.

The original user-anchor case drifted 3 px: an entry transform on the measured
item corrupted the anchor/spacer measurement. Moving motion to a child fixed it.
The assistant-anchor case also exposed a 21 px correction caused by the row's
160 px intrinsic-height estimate differing from its actual 79 px height. Items
now use their actual layout dimensions instead of off-screen height estimates.
This gives up that browser layout-skipping optimization to keep anchoring exact.

The compatibility workflow runs this docs regression once with React 19; the
separate packaged-consumer tests exercise the scroller under React 18 and 19.
