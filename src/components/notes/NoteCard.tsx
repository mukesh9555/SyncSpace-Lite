import { memo } from 'react'
import { Note } from '@/types/note'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useNotesStore } from '@/store/notesStore'
import { Link } from 'react-router-dom'
import { FiTrash2, FiEdit2 } from 'react-icons/fi'
import { formatRelativeTime } from '@/utils/helpers'
import toast from 'react-hot-toast'

function NoteCardComponent({ note }: { note: Note }) {
  const deleteNote = useNotesStore((state) => state.deleteNote)

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirm(`Delete "${note.title}"? This can't be undone.`)) {
      deleteNote(note.id)
      toast.success('Note deleted')
    }
  }

  return (
    <Card className="group relative">
      <Link to={`/notes/${note.id}`} className="block">
        <h3 className="pr-14 text-lg font-semibold text-slate-900 dark:text-white truncate">
          {note.title || 'Untitled Note'}
        </h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-3 min-h-[3.75rem]">
          {note.content ? note.content.slice(0, 150) : 'Empty note'}
        </p>
        <div className="mt-4 text-xs text-slate-400 dark:text-slate-500">
          Updated {formatRelativeTime(note.updatedAt)}
        </div>
      </Link>
      <div className="absolute top-4 right-4 flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <Link to={`/notes/${note.id}`}>
          <Button variant="ghost" size="sm" className="p-2" aria-label="Edit note">
            <FiEdit2 className="h-4 w-4" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={handleDelete}
          aria-label="Delete note"
        >
          <FiTrash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}

export const NoteCard = memo(NoteCardComponent)
