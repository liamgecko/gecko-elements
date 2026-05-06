import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// GitHub Pages SPA routing:
// A 404.html redirect can forward deep links into index.html via `?p=/path`.
// We rewrite the URL back to the intended path before the app mounts.
const url = new URL(window.location.href)
const p = url.searchParams.get("p")
if (p) {
  url.searchParams.delete("p")
  const cleanedSearch = url.searchParams.toString()
  const base = import.meta.env.BASE_URL.replace(/\/$/, "")
  const nextUrl =
    base + p + (cleanedSearch ? "?" + cleanedSearch : "") + url.hash
  window.history.replaceState(null, "", nextUrl)
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

