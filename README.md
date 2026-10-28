# MiniCRM – React Frontend

Web interface for customer management (MiniCRM), developed as a technical assessment for the Frontend React Developer position.

## Goal

Build a modern frontend application using React, Tailwind CSS, and shadcn/ui, integrated with a mocked REST API, with a focus on code organization, UX, accessibility, and development best practices.

---

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (Radix UI)
- TanStack Query (React Query)
- Axios
- React Hook Form + Zod
- JSON Server (Mock API via Docker)

---

## Features

- Customer listing
- Search by name or email
- Filter by status (active / inactive)
- Customer details view
- Customer creation and editing
- Loading, error, and empty list states

---

## Key Implementation Decisions

The application was structured with a focus on clear separation of concerns, user experience, and frontend best practices.

- Component-based architecture: The UI was split into reusable components (CustomerTable, CustomerFilters, CustomerDialog, CustomerForm), making the code easier to maintain, test, and evolve.

- Data management with TanStack Query: TanStack Query was used to centralize the logic for fetching, creating, editing, and deleting customers, providing automatic caching, explicit loading and error states, and consistent list updates after mutations.

- Forms with React Hook Form + Zod: Customer creation and editing use schema-based validation, ensuring type safety, clear error messages, and a better form-filling experience.

- Explicit handling of application states: The interface clearly distinguishes between the initial data loading state, the empty state (no customers registered), the empty state when filters/search return no results, and the error state when communication with the API fails.

- Debounced search and memoized filters: Search by name/email uses debouncing to avoid unnecessary reprocessing, and filters/sorting are memoized with useMemo, improving performance and predictability.

- UX and user feedback: The application provides consistent visual feedback through toasts for success/error actions (create, edit, delete), visual loading states, and explicit confirmation for destructive actions (deletion).

- Mocked API with JSON Server via Docker: Running JSON Server in a Docker container makes it possible to simulate a realistic REST API, keeping the frontend decoupled and ready for future integration with a real backend.

---

## How to Run the Project

### Prerequisites

- Node.js
- Docker
- npm

---

### Frontend

```bash
npm install
npm run dev
```

### Backend

Na raiz do projeto, execute o seguinte comando no PowerShell:

```bash
docker run -p 3001:80 -v "${PWD}\db.json:/data/db.json" clue/json-server --watch /data/db.json
```
