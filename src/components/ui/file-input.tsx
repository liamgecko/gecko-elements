"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"

export type FileInputProps = Omit<React.ComponentProps<typeof Input>, "type">

export function FileInput(props: FileInputProps) {
  return <Input type="file" {...props} />
}

