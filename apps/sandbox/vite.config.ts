import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(({ command }) => ({
  // Dev server should be rooted at "/", but the production build is hosted at /<repo>/sandbox/ on GitHub Pages.
  base: command === "build" ? "/gecko-elements/sandbox/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Resolve workspace package to source so subpaths like `@gecko/ui/components/button` work in Vite/Rollup.
      "@gecko/ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
}))

