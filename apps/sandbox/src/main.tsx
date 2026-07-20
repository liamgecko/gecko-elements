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

