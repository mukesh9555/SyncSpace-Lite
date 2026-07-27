# Architecture

## Overview

SyncSpace Lite is a single-page React application with **no backend**. Every piece of
state — auth, notes, whiteboards, code files, and settings — lives in the browser's
`localStorage`, managed through Zustand stores with the `persist` middleware.

```
Browser
 └── React App (Vite)
      ├── Zustand stores  ──persist──▶ localStorage
      ├── React Router     (client-side routing, incl. protected routes)
      └── UI components    (Tailwind CSS, Framer Motion)
```

There is no network call in the app's runtime path (aside from loading Google Fonts and
the Monaco editor's web worker assets, which are bundled).

## Data flow

1. A component calls a store hook, e.g. `useNotesStore((s) => s.notes)`.
2. Zustand returns the current in-memory state, which mirrors `localStorage`.
3. Mutating actions (`addNote`, `updateNote`, `deleteNote`, ...) update the in-memory
   state; the `persist` middleware writes the new state to `localStorage` on every
   change.
4. On page load, `persist` rehydrates each store from `localStorage` before first render.

Because everything is synchronous and local, there's no loading/error state to manage
for data fetching — the "loading" states in the UI (skeletons, spinners) exist for
route-level code splitting (`React.lazy`), not for data.

## Authentication model

Auth is intentionally simple and UI-only:

- `register(name, email, password)` stores a new user record in a `syncspace_users`
  array in `localStorage` and marks the session authenticated.
- `login(email, password)` checks credentials against that array.
- `ProtectedRoute` (in `src/routes/ProtectedRoute.tsx`) redirects to `/login` if
  `isAuthenticated` is false.

This is a **local simulation** of auth, suitable for a single-user, offline tool. It is
not intended to protect data from other users of the same browser profile.

## Folder structure

```
src/
├── components/
│   ├── ui/            Generic, reusable primitives (Button, Card, Input, Skeleton, ...)
│   ├── layout/         Landing Navbar/Footer + WorkspaceLayout (sidebar + header shell)
│   ├── workspace/      Dashboard-specific widgets (Sidebar, Header, StatsCards, RecentFiles)
│   ├── notes/          Notes list, note card, note editor
│   ├── whiteboard/     Whiteboard list, Konva canvas, toolbar
│   ├── code/           Code file list, Monaco editor wrapper
│   └── settings/       Settings form (theme, accent color, profile)
├── pages/
│   ├── Landing/         Public marketing page
│   ├── Auth/            Login / Register
│   └── Workspace/       Route-level pages, lazy-loaded (Dashboard, Notes, Whiteboard, Code, Settings)
├── store/               One Zustand store per domain (auth, notes, whiteboard, code, settings, theme)
├── hooks/               useTheme, useDebounce, useKeyboardShortcut, useWhiteboardHistory
├── types/               Shared TypeScript interfaces per domain
├── utils/               cn() class merger, formatting/download helpers
└── routes/              ProtectedRoute wrapper
```

## Whiteboard internals

The whiteboard uses `react-konva` for canvas rendering. Shapes are stored as plain
serializable objects (`WhiteboardShape`), not Konva node instances, so they persist
cleanly to `localStorage` and can be replayed.

- **Drawing**: `onMouseDown` starts a "draft" shape; `onMouseMove` updates it; `onMouseUp`
  commits it into history via `useWhiteboardHistory`.
- **Undo/redo**: `useWhiteboardHistory` keeps an array of shape-array snapshots and an
  index into it — a classic linear undo stack, reset whenever a new action branches off
  from a prior undo point.
- **Export PNG**: uses Konva's `stage.toDataURL()` and triggers a browser download.

## Code editor internals

`@monaco-editor/react` loads Monaco from a CDN-hosted worker bundle at runtime (no need
to self-host the worker files for this app's scale). Theme is synced to the app's
light/dark mode; font size is a user preference stored in the settings store.

## Performance choices

- **Route-based code splitting**: `Dashboard`, `NotesPage`, `WhiteboardPage`, `CodePage`,
  and `SettingsPage` are all behind `React.lazy`, so the Monaco and Konva bundles (the
  two heaviest dependencies) are only downloaded when the user actually visits the code
  editor or whiteboard.
- **Debounced autosave**: note and code content use a 500ms debounce before writing to
  the store, avoiding a `localStorage` write on every keystroke.
- **Memoized cards**: `NoteCard` is wrapped in `React.memo` since list re-renders are the
  most frequent update in the app.

## What's deliberately not included

Per the project brief, this app does **not** include: a backend server, Socket.io,
Yjs/CRDT-based collaboration, or a database (MongoDB or otherwise). Multi-user
collaboration and cross-device sync are out of scope by design — this is a single-user,
single-browser tool.
