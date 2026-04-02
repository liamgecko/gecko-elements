import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// GitHub project pages: https://<user>.github.io/<repo>/
// Must match the repository name; change if the repo is renamed.
const GITHUB_PAGES_BASE = "/gecko-elements/"

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Production build is deployed under the repo path; dev uses site root.
  base: command === "build" ? GITHUB_PAGES_BASE : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
