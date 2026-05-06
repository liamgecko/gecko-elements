import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Resolve workspace package to source so subpaths like `@gecko/ui/components/button` work in Vite/Rollup.
      "@gecko/ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
})

