import fs from "fs"
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"

// GitHub project pages: https://<user>.github.io/<repo>/
// Must match the repository name; change if the repo is renamed.
const GITHUB_PAGES_BASE = "/gecko-elements/"

/** GitHub Pages has no server-side fallback for client routes. Copy index → 404.html so refresh/deep links load the SPA. */
function githubPagesSpaFallback(): Plugin {
  return {
    name: "github-pages-spa-fallback",
    apply: "build",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist")
      const indexPath = path.join(dist, "index.html")
      const notFoundPath = path.join(dist, "404.html")
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Production build is deployed under the repo path; dev uses site root.
  base: command === "build" ? GITHUB_PAGES_BASE : "/",
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
