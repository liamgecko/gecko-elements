"use client"

import { useState, useEffect, useRef } from "react"
import { TypingIndicator } from "@/components/ui/typing-indicator"
import { Input } from "@/components/ui/input"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Code } from "@/components/ui/code"

const placeholderAvatar =
  "https://picsum.photos/seed/avatar/200"

export function TypingIndicatorPage() {
  const [isTyping, setIsTyping] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleInput = () => {
    setIsTyping(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false)
      timeoutRef.current = null
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="flex gap-5.5">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">
            Typing indicator
          </h1>
          <p className="text-sm text-muted-foreground">
            A component that displays animated dots or text to indicate that
            someone is typing. Use the dots variant for a compact bubble, or the
            text variant with an optional name and avatar.
          </p>
        </PageSection>

        <PageSection id="default" label="Default typing indicator">
          <h2 className="text-lg font-semibold">Default typing indicator</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            The default typing indicator with three animated dots. Use the{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              animate
            </Code>{" "}
            prop to animate the component in and out.
          </p>
          <ComponentExample>
            <TypingIndicator variant="dots" animate />
          </ComponentExample>
        </PageSection>

        <PageSection id="input-with-indicator" label="Input with typing indicator">
          <h2 className="text-lg font-semibold">
            Input with typing indicator
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            The typing indicator appears when you start typing in the input and
            hides after a short delay when you stop.
          </p>
          <ComponentExample>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Type something…"
                onChange={handleInput}
              />
              {isTyping && <TypingIndicator animate />}
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="text-variant" label="User typing indicator">
          <h2 className="text-lg font-semibold">User typing indicator</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              variant="text"
            </Code>{" "}
            prop with a{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              name
            </Code>{" "}
            to show who is typing.
          </p>
          <ComponentExample>
            <TypingIndicator variant="text" name="Liam" animate />
          </ComponentExample>
        </PageSection>

        <PageSection id="text-variant-demo" label="User typing indicator example">
          <h2 className="text-lg font-semibold">
            User typing indicator example
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A text indicator with name appears when you type in the input.
          </p>
          <ComponentExample>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Type something…"
                onChange={handleInput}
              />
              {isTyping && (
                <TypingIndicator
                  variant="text"
                  name="Liam"
                  animate
                />
              )}
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="with-avatar" label="With avatar">
          <h2 className="text-lg font-semibold">With avatar</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Pass an{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              avatar
            </Code>{" "}
            image URL (or a custom React node) to show an avatar next to the
            dots or text.
          </p>

          <h3 id="with-avatar-dots" className="mb-3 text-base font-semibold">
            Dots with avatar
          </h3>
          <ComponentExample className="mb-6">
            <TypingIndicator
              variant="dots"
              avatar={placeholderAvatar}
              name="Liam"
              animate
            />
          </ComponentExample>

          <h3 id="with-avatar-text" className="mb-3 text-base font-semibold">
            Name with avatar
          </h3>
          <ComponentExample>
            <TypingIndicator
              variant="text"
              name="Liam"
              avatar={placeholderAvatar}
              animate
            />
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
