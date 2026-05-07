import * as React from "react"

export type Favourite = {
  path: string
  label: string
}

const STORAGE_KEY = "sandbox:favourites:v1"

function safeParse(value: string | null): Favourite[] {
  if (!value) return []
  try {
    const parsed = JSON.parse(value) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((x): x is Favourite => {
        if (!x || typeof x !== "object") return false
        const rec = x as Record<string, unknown>
        return typeof rec.path === "string" && typeof rec.label === "string"
      })
      .map((x) => ({ path: x.path, label: x.label }))
  } catch {
    return []
  }
}

function loadFavourites(): Favourite[] {
  if (typeof window === "undefined") return []
  return safeParse(window.localStorage.getItem(STORAGE_KEY))
}

function saveFavourites(next: Favourite[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

type FavouritesContextValue = {
  favourites: Favourite[]
  isFavourited: (path: string) => boolean
  setFavourite: (fav: Favourite, nextPressed: boolean) => void
  renameFavourite: (path: string, nextLabel: string) => void
  deleteFavourite: (path: string) => void
}

const FavouritesContext = React.createContext<FavouritesContextValue | null>(null)

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [favourites, setFavourites] = React.useState<Favourite[]>(() => loadFavourites())

  React.useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return
      setFavourites(loadFavourites())
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const isFavourited = React.useCallback(
    (path: string) => favourites.some((f) => f.path === path),
    [favourites]
  )

  const setFavourite = React.useCallback(
    (fav: Favourite, nextPressed: boolean) => {
      setFavourites((prev) => {
        const without = prev.filter((f) => f.path !== fav.path)
        const next = nextPressed ? [...without, fav] : without
        saveFavourites(next)
        return next
      })
    },
    []
  )

  const renameFavourite = React.useCallback((path: string, nextLabel: string) => {
    const normalized = nextLabel.trim()
    setFavourites((prev) => {
      const next = prev.map((f) => (f.path === path ? { ...f, label: normalized } : f))
      saveFavourites(next)
      return next
    })
  }, [])

  const deleteFavourite = React.useCallback((path: string) => {
    setFavourites((prev) => {
      const next = prev.filter((f) => f.path !== path)
      saveFavourites(next)
      return next
    })
  }, [])

  const value = React.useMemo<FavouritesContextValue>(
    () => ({ favourites, isFavourited, setFavourite, renameFavourite, deleteFavourite }),
    [favourites, isFavourited, setFavourite, renameFavourite, deleteFavourite]
  )

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

export function useFavourites() {
  const ctx = React.useContext(FavouritesContext)
  if (!ctx) {
    throw new Error("useFavourites must be used within FavouritesProvider")
  }
  return ctx
}

