import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(({ command }) => ({
  // Dev server should be rooted at "/", but the production build is hosted at /<repo>/sandbox/ on GitHub Pages.
  base: command === "build" ? "/gecko-elements/sandbox/" : "/",
  plugins: [react(), tailwindcss()],
  server: {
    // Allow importing source from the monorepo (e.g. packages/ui).
    fs: {
      allow: [path.resolve(__dirname, "../..")],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Resolve workspace package to source so subpaths like `@gecko/ui/components/button` work in Vite/Rollup.
      "@gecko/ui": path.resolve(__dirname, "../../packages/ui/src"),
      // Ensure the subpath form `@gecko/ui/...` always aliases correctly.
      "@gecko/ui/": `${path.resolve(__dirname, "../../packages/ui/src")}/`,
    },
  },
}))

