"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheckBig,
  Info,
  TriangleAlert,
  OctagonX,
  Loader2,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()
  const sonnerTheme =
    theme === "dark" ? ("dark" as const) : ("light" as const)

  return (
    <Sonner
      theme={sonnerTheme}
      position="top-right"
      className="toaster group"
      icons={{
        success: <CircleCheckBig className="size-4 text-emerald-600 dark:text-teal-600" />,
        info: <Info className="size-4 text-blue-600" />,
        warning: <TriangleAlert className="size-4 text-yellow-600" />,
        error: <OctagonX className="size-4 text-red-600 dark:text-rose-600" />,
        loading: <Loader2 className="size-4 animate-spin text-muted-foreground" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          fontFamily: "var(--font-sans)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

