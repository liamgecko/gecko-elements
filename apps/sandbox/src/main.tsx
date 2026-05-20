import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import faviconUrl from "./assets/favicon.svg?url"

function setFavicon(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!link) {
    link = document.createElement("link")
    link.rel = "icon"
    document.head.appendChild(link)
  }
  link.type = "image/svg+xml"
  link.href = href
}

setFavicon(faviconUrl)

// GitHub Pages SPA routing:
// A 404.html redirect can forward deep links into index.html via `?p=/path`.
// We rewrite the URL back to the intended path before the app mounts.
const url = new URL(window.location.href)
const p = url.searchParams.get("p")
if (p) {
  url.searchParams.delete("p")
  const cleanedSearch = url.searchParams.toString()
  const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined
  const nextUrl = `${routerBasename ?? ""}${p}${cleanedSearch ? `?${cleanedSearch}` : ""}${url.hash}`
  window.history.replaceState(null, "", nextUrl)
}

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

