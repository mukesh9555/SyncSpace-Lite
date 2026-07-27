import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotesStore } from '@/store/notesStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { NoteCard } from './NoteCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { FiFileText, FiPlus, FiSearch } from 'react-icons/fi'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import toast from 'react-hot-toast'

export function NotesList() {
  const notes = useNotesStore((state) => state.notes)
  const addNote = useNotesStore((state) => state.addNote)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = notes
    .filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  const handleNewNote = () => {
    const note = addNote({ title: 'Untitled Note', content: '' })
    toast.success('Note created')
    navigate(`/notes/${note.id}`)
  }

  useKeyboardShortcut(['ctrl', 'shift', 'n'], handleNewNote)

  if (notes.length === 0) {
    return (
      <EmptyState
        title="No notes yet"
        description="Create your first note to start writing in Markdown. Notes autosave as you type."
        icon={<FiFileText className="h-10 w-10" />}
        actionLabel="New Note"
        onAction={handleNewNote}
      />
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Notes</h2>
        <Button variant="primary" size="sm" onClick={handleNewNote}>
          <FiPlus className="mr-2 h-4 w-4" /> New Note
          <span className="ml-2 hidden text-xs opacity-70 lg:inline">Ctrl+Shift+N</span>
        </Button>
      </div>
      <div className="relative mt-4">
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search notes by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          aria-label="Search notes"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          No notes match "{search}".
        </p>
      )}
    </div>
  )
}
