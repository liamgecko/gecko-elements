import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/gecko-elements/chat-widget/" : "/",
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      allow: [path.resolve(__dirname, "../../..")],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@gecko/ui": path.resolve(__dirname, "../../../packages/ui/src"),
      "@gecko/ui/": `${path.resolve(__dirname, "../../../packages/ui/src")}/`,
    },
  },
}))
