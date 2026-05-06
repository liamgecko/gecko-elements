import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project site: /<repo>/docs/
  base: "/gecko-elements/docs/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Resolve workspace package to source so subpaths like `@gecko/ui/components/button` work in Vite/Rollup.
      "@gecko/ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
})
