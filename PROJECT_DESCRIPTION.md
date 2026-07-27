# Project Description (Resume / Portfolio)

## Short version

**SyncSpace Lite** — An offline-first productivity workspace (React, TypeScript,
Zustand) combining Markdown notes, a Konva-based whiteboard, and a Monaco code editor,
with all state persisted client-side via `localStorage`. No backend required.

## Longer version, for a portfolio page

SyncSpace Lite is a single-page web application that reimagines a "workspace" — notes,
a drawing canvas, and a code editor — as a fully client-side experience with zero
backend infrastructure. I designed and built it end-to-end:

- **Architecture**: Structured the app around five independent Zustand stores (auth,
  notes, whiteboards, code files, settings), each persisted to `localStorage`, with a
  clean separation between UI components, route-level pages, and domain types.
- **Whiteboard engine**: Implemented a canvas drawing tool from scratch on top of
  React Konva — pencil, shapes, arrows, and text — with a custom undo/redo history hook
  and PNG export via `stage.toDataURL()`.
- **Code editor**: Integrated Monaco (the engine behind VS Code) with language
  switching, theme sync, adjustable font size, and file export.
- **Performance**: Used route-based code splitting (`React.lazy` + `Suspense`) so the
  two heaviest dependencies (Konva, Monaco) only load when a user visits those tools,
  plus debounced autosave to avoid excessive writes.
- **Polish**: Added toast notifications, skeleton/empty states, an error boundary,
  keyboard shortcuts, and accessibility passes (ARIA labels, focus states, semantic
  markup).

**Stack**: React 19, TypeScript, Vite, Tailwind CSS, Zustand, React Router, React Konva,
Monaco Editor, Framer Motion.

## One-liner for a resume bullet

> Built and shipped SyncSpace Lite, an offline-first workspace app (notes + whiteboard +
> code editor) in React/TypeScript with zero backend — all data persisted client-side,
> deployed statically to Vercel.
