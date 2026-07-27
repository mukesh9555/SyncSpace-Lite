import { useParams } from 'react-router-dom'
import { NotesList } from '@/components/notes/NotesList'
import { NoteEditor } from '@/components/notes/NoteEditor'

export default function NotesPage() {
  const { id } = useParams()
  return <div className="space-y-6">{id ? <NoteEditor /> : <NotesList />}</div>
}
