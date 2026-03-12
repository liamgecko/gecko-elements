IMPORTANT: Always read PROJECT_CONTEXT.md before making assumptions about the technology stack, repository, architecture, or coding patterns in this project.

⸻

Project Context

Project Overview

This repository contains Gecko Elements, a React-based UI component system and development environment used to build, test, and demonstrate reusable interface components for the Gecko platform.

The project functions as both:
	•	A component library
	•	A UI playground for development and testing

It is built using React, TypeScript, Vite, and Tailwind CSS, with components following Base UI and Shadcn-style architecture patterns.

⸻

Repository Information

Git Repository
https://github.com/liamgecko/gecko-elements.git

Default Branch
main

Branch Naming Convention

Branches follow a ticket-based numerical pattern:

GE-1-X
GE-2-X
GE-3-X
GE-4-X
…

Where:
	•	GE = Gecko Elements project prefix
	•	number = ticket or issue identifier
	•	X = optional descriptive suffix

Example branches

GE-1-button-component
GE-2-tabs-improvement
GE-3-accessibility-fixes

Agents creating or referencing branches should follow this convention.

⸻

Git Workflow

Before making changes the agent should verify:
	•	current git branch
	•	repository root
	•	git status
	•	uncommitted changes
	•	git remote origin

The agent must confirm the repository remote matches:

https://github.com/liamgecko/gecko-elements.git

The agent should never assume the branch name and must inspect the repository state before making changes.

⸻

Core Technology Stack

Framework
React 19

Language
TypeScript

Build Tool
Vite

Routing
react-router-dom

Styling
Tailwind CSS v4

UI Architecture
Base UI primitives with Shadcn-style component patterns

Icons
lucide-react

Utility Libraries
	•	class-variance-authority
	•	clsx
	•	tailwind-merge
	•	tw-animate-css

Additional Libraries
	•	cmdk
	•	sonner
	•	react-day-picker
	•	input-otp
	•	date-fns
	•	chrono-node

⸻

Package Manager

This project uses pnpm.

Evidence:
pnpm-lock.yaml exists in the repository.

Agents should always prefer pnpm commands unless explicitly instructed otherwise.

Project Structure

Key folders in the repository.

src

Contains all application and component source code.

Important directories

src/components

Reusable UI components forming the Gecko Elements component system.

src/pages

Pages used to organize and demonstrate UI components.

src/hooks

Custom React hooks used across the project.

Example

use-mobile.ts

src/lib

Shared utilities and helper functions.

Example

utils.ts

src/config

Configuration files used by the UI system.

src/assets

Static project assets such as SVGs and images.

⸻

UI System

The UI system is built using:
	•	Base UI primitives
	•	Shadcn-style component architecture
	•	Tailwind CSS utility classes

Styling patterns include:
	•	Tailwind utility-first styling
	•	Component variants using class-variance-authority
	•	Class composition using clsx and tailwind-merge

Agents should:
	•	reuse existing components whenever possible
	•	follow established variant patterns
	•	avoid introducing new styling approaches
	•	avoid unnecessary custom CSS

⸻

Design and Development Standards

The repository includes internal standards documentation located in:

.standards/

Important documents include:
	•	architecture.md
	•	accessibility.md
	•	baseline-ui.md
	•	component-template.md
	•	fixing-accessibility.md
	•	web-design-guidelines.md

These documents define:
	•	UI architecture
	•	accessibility standards
	•	component patterns
	•	design principles

Agents should reference these files when modifying or creating UI components.

⸻

Coding Conventions

Language

All code should be written in TypeScript.

React
	•	Prefer functional React components
	•	Prefer composition over inheritance
	•	Keep components small and reusable

Styling
	•	Prefer Tailwind utility classes
	•	Avoid unnecessary custom CSS
	•	Maintain consistency with existing design patterns

Utilities
	•	Use clsx or tailwind-merge for class composition
	•	Use class-variance-authority for component variants

⸻

Agent Preflight Checklist

Before implementing changes, the agent must verify:
	1.	The current working directory is the repository root.
	2.	The project uses React + TypeScript + Vite.
	3.	The package manager is pnpm.
	4.	The UI system is built using Base UI primitives and Tailwind styling.
	5.	The git remote origin matches
https://github.com/liamgecko/gecko-elements.git
	6.	The current git branch follows the GE ticket naming convention.

The agent should inspect the following before adding new abstractions:
	•	package.json
	•	src/components
	•	src/hooks
	•	src/lib

⸻

Development Principles

When adding functionality:
	1.	Follow existing component patterns.
	2.	Reuse existing utilities and hooks.
	3.	Maintain Tailwind-based styling.
	4.	Maintain accessibility best practices.
	5.	Keep components composable and maintainable.

⸻

Notes for AI Agents

This repository is not a generic React starter project.

It is a UI component system and development environment for Gecko Elements.

Agents should prioritize:
	•	component reuse
	•	accessibility compliance
	•	consistency with existing architecture
	•	minimal dependency additions