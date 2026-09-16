# TinyMCE 4 compatibility runtime

Version: **4.7.1 (2017-10-09)**. Copied unchanged from Gecko-Admin-Web-App/App/public/misc/tinymce-4 on 2026-09-15. This is deliberately the existing Admin runtime, not the latest TinyMCE 4 patch.

Only the modern theme, lightgray skin and plugins used by the basic email editor are included. Runtime files are unmodified. LGPL 2.1 notice is included in LICENSE.TXT, retrieved from https://raw.githubusercontent.com/tinymce/tinymce/4.7.1/LICENSE.TXT. Corresponding upstream source: https://github.com/tinymce/tinymce/tree/4.7.1 (archive: https://github.com/tinymce/tinymce/archive/refs/tags/4.7.1.tar.gz).

The Rich text editor contract owns usage. This legacy runtime is a migration compatibility exception, used through the shared Rich text editor across the app. Do not upgrade it or add plugins without HTML compatibility tests and a dependency decision. Keep the licence and this provenance alongside deployed assets.
