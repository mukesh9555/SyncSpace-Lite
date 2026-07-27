# SyncSpace Lite

An offline-first personal workspace: Markdown notes, a whiteboard, and a code editor, all living in your browser's `localStorage`. No backend, no database, no real-time server — just React, Zustand, and the browser.

## Features

- 📝 **Notes** — Create, edit, search, and export as Markdown or JSON. Live Markdown preview. Autosaves 500ms after you stop typing.
- ✏️ **Whiteboard** — Draw with pencil, rectangle, circle, arrow, and text tools. Full undo/redo history, clear canvas, export as PNG.
- 💻 **Code Editor** — Powered by Monaco (the VS Code editor). Syntax highlighting for a dozen languages, adjustable font size, copy to clipboard, download as a file.
- 📊 **Dashboard** — At-a-glance stats and a "recent files" list across all three tools.
- 🎨 **Theming** — Light/dark mode plus a customizable accent color.
- 🔐 **Auth UI** — Local login/register (simulated; credentials are stored in `localStorage`, not sent anywhere) with protected routes.
- ♿ **Accessibility** — Keyboard shortcuts, ARIA labels, visible focus states.
- 🚀 **Performance** — Route-based code splitting and lazy loading.

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS + Framer Motion
- Zustand (state management with `persist` middleware for localStorage)
- React Router v7
- React Konva (whiteboard canvas)
- Monaco Editor (`@monaco-editor/react`)
- React Hot Toast, React Markdown + remark-gfm

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
```

## Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl/Cmd + Shift + N` | New note |
| `Ctrl/Cmd + Shift + B` | New whiteboard |
| `Ctrl/Cmd + Shift + F` | New code file |
| `Ctrl/Cmd + Z` | Undo (on a whiteboard) |
| `Ctrl/Cmd + Shift + Z` | Redo (on a whiteboard) |

## Data & privacy

Everything — your account, notes, whiteboards, and code files — is stored under a handful of `localStorage` keys (`syncspace_user`, `syncspace_notes`, `syncspace_whiteboards`, `syncspace_codefiles`, `syncspace_settings`). Clearing your browser's site data for this app will erase it. There is no server component to back it up.

## Deployment

Ready to deploy to [Vercel](https://vercel.com) with zero configuration beyond the included `vercel.json`. See `DEPLOYMENT.md` for step-by-step instructions.

## License

MIT
