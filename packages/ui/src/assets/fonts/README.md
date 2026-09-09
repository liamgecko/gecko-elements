# Bundled fonts

Retrieved 2026-09-09. Both fonts are self-hosted; no Google Fonts request is required.

## Satoshi

Official archive: https://api.fontshare.com/v2/fonts/download/satoshi
Typeface: https://www.fontshare.com/fonts/satoshi
Licence: `Satoshi-FFL.txt`, ITF Free Font License 2.0, 17 Aug 2026.

The ten static WOFF2 files are copied unchanged from the official archive. The
archive's ten OTF files are byte-identical to the existing repository OTF files,
confirming the same release. We retain the established 300/400/500/700/900 weights,
normal and italic, and the existing CSS family alias and stylistic set.
No font conversion, subsetting, metadata editing or font-file renaming was performed.
The previous desktop-format files remain in source but are excluded from the package.

Section 01 permits self-hosting for the licensee's own applications and internal
sharing among its employees. This package is intended for private Gecko use.
Section 02 restricts distribution to other people or entities and third-party
font services. Public package distribution or external sharing needs a separate
licensing decision; this is not an open-source font licence.

## Geist Mono

Source: https://github.com/vercel/geist-font
Revision: `10dc7658f13c38a474cde201bb09a4617267545b`
Upstream file: `fonts/GeistMono/webfonts/GeistMono[wght].woff2`
Local filename: `GeistMono-Variable.woff2` (unchanged bytes).
Licence: `Geist-OFL.txt`, SIL Open Font License 1.1.
Normal variable face, weight range 100–900, matching the previous Google Fonts request.

## Asset integrity

SHA-256 checksums of the vendored font binaries and original archive:

```text
63a79b233029f0847dc29dfcc13fa783582b6d716319e984ebfbaf05022b7031  official Satoshi archive
afaacc4c5fbba89d2ebf7a02dc4070208540874592a5504d57175782fe893101  GeistMono-Variable.woff2
a4f962f7f9c049b2d58d848746206adf99bb7b89407d6cc29a36b7eb0d77d032  Satoshi-Black.woff2
c8961b6ef384f3907d499b6787b456cd5753bbb6cef0376751903eee1abcd3e8  Satoshi-BlackItalic.woff2
6f979e75eb9d6de6af2eacc0c72fd2cbe613922b27db92217dd204c8080de930  Satoshi-Bold.woff2
cdce008b63614513640bfa874e286041445b3035b9f8a200c304e8ef1435fc35  Satoshi-BoldItalic.woff2
a80f3880397bbb8ca56a541908873cedc66eb5bd6a5fef34b56f7531f18231fe  Satoshi-Italic.woff2
28bde2ff554acba1eff96f6cf120e226736286e05c90ececdaa3fafececbd55e  Satoshi-Light.woff2
9c9fc2d9d5010250f785daf945d53506a09bddeac3003ad4e42c6f076509ac7a  Satoshi-LightItalic.woff2
d492ce178ab9042bd6bcad1b9ef49b1436ba5f4f833dee4a7a2ed94e9d8c922e  Satoshi-Medium.woff2
e4655448c210344d38c855454fa49ddfd3143405e5ed8a65755dccdfc90468db  Satoshi-MediumItalic.woff2
5aa97d938f523dd893c52473c3a021a0bf4ba0f95290edcc0749c088717f951f  Satoshi-Regular.woff2
```
