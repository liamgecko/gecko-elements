"use client"

import * as React from "react"

import { Input } from "@gecko/ui/components/input"

export type FileInputProps = Omit<React.ComponentProps<typeof Input>, "type">

export function FileInput(props: FileInputProps) {
  return <Input type="file" {...props} />
}

