import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Note } from '@/types/note'

interface NotesState {
  notes: Note[]
  addNote: (note: Partial<Pick<Note, 'title' | 'content'>>) => Note
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  getNote: (id: string) => Note | undefined
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      addNote: (noteData) => {
        const now = new Date().toISOString()
        const newNote: Note = {
          id: crypto.randomUUID(),
          title: noteData.title ?? 'Untitled Note',
          content: noteData.content ?? '',
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({ notes: [newNote, ...state.notes] }))
        return newNote
      },
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note
          ),
        }))
      },
      deleteNote: (id) => {
        set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }))
      },
      getNote: (id) => get().notes.find((note) => note.id === id),
    }),
    { name: 'syncspace_notes' }
  )
)
