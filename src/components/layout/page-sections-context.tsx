import * as React from "react"

export type Section = {
  id: string
  label: string
}

type PageSectionsContextValue = {
  sections: Section[]
  registerSection: (id: string, label: string) => void
  unregisterSection: (id: string) => void
}

const PageSectionsContext = React.createContext<PageSectionsContextValue | null>(
  null
)

export function PageSectionsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [sections, setSections] = React.useState<Section[]>([])

  const registerSection = React.useCallback((id: string, label: string) => {
    setSections((prev) => {
      const i = prev.findIndex((s) => s.id === id)
      if (i >= 0) {
        if (prev[i].label === label) return prev
        const next = [...prev]
        next[i] = { id, label }
        return next
      }
      return [...prev, { id, label }]
    })
  }, [])

  const unregisterSection = React.useCallback((id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const value = React.useMemo(
    () => ({ sections, registerSection, unregisterSection }),
    [sections, registerSection, unregisterSection]
  )

  return (
    <PageSectionsContext.Provider value={value}>
      {children}
    </PageSectionsContext.Provider>
  )
}

export function usePageSections() {
  const ctx = React.useContext(PageSectionsContext)
  return ctx
}
