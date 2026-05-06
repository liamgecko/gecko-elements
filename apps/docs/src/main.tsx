import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "@gecko/ui/globals.css"
import { App } from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

const routerBasename =
  import.meta.env.BASE_URL.replace(/\/$/, "") || undefined

// GitHub Pages SPA routing:
// A 404.html redirect can forward deep links into index.html via `?p=/path`.
// We rewrite the URL back to the intended path before React Router mounts.
const url = new URL(window.location.href)
const p = url.searchParams.get("p")
if (p) {
  url.searchParams.delete("p")
  const cleanedSearch = url.searchParams.toString()
  const nextUrl = `${routerBasename ?? ""}${p}${cleanedSearch ? `?${cleanedSearch}` : ""}${url.hash}`
  window.history.replaceState(null, "", nextUrl)
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
