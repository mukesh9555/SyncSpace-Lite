import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useNotesStore } from '@/store/notesStore'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { useDebounce } from '@/hooks/useDebounce'
import { FiArrowLeft, FiTrash2, FiEye, FiEdit2, FiDownload } from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { downloadTextFile } from '@/utils/helpers'
import toast from 'react-hot-toast'

export function NoteEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const note = useNotesStore((state) => state.notes.find((n) => n.id === id))
  const updateNote = useNotesStore((state) => state.updateNote)
  const deleteNote = useNotesStore((state) => state.deleteNote)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const loadedRef = useRef<string | null>(null)

  useEffect(() => {
    if (note && loadedRef.current !== note.id) {
      setTitle(note.title)
      setContent(note.content)
      loadedRef.current = note.id
    }
  }, [note])

  const debouncedTitle = useDebounce(title, 500)
  const debouncedContent = useDebounce(content, 500)

  useEffect(() => {
    if (note && loadedRef.current === note.id && (debouncedTitle !== note.title || debouncedContent !== note.content)) {
      updateNote(note.id, { title: debouncedTitle || 'Untitled Note', content: debouncedContent })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle, debouncedContent])

  const handleDelete = () => {
    if (!note) return
    if (confirm(`Delete "${note.title}"? This can't be undone.`)) {
      deleteNote(note.id)
      toast.success('Note deleted')
      navigate('/notes')
    }
  }

  const handleExportMarkdown = () => {
    downloadTextFile(`${title || 'note'}.md`, content, 'text/markdown')
    toast.success('Exported as Markdown')
  }

  const handleExportJSON = () => {
    downloadTextFile(`${title || 'note'}.json`, JSON.stringify(note, null, 2), 'application/json')
    toast.success('Exported as JSON')
  }

  if (!note) {
    return (
      <div className="text-center text-slate-500 dark:text-slate-400">
        <p>Note not found.</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/notes')}>
          <FiArrowLeft className="mr-2 h-4 w-4" /> Back to notes
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button variant="ghost" onClick={() => navigate('/notes')}>
          <FiArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? <FiEdit2 className="mr-2 h-4 w-4" /> : <FiEye className="mr-2 h-4 w-4" />}
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportMarkdown}>
            <FiDownload className="mr-2 h-4 w-4" /> .md
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportJSON}>
            <FiDownload className="mr-2 h-4 w-4" /> .json
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={handleDelete}
          >
            <FiTrash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        className="text-xl font-bold"
        aria-label="Note title"
      />

      {isPreview ? (
        <div className="prose max-w-none rounded-md border border-slate-200 bg-white p-4 dark:prose-invert dark:border-slate-700 dark:bg-slate-800 min-h-[400px]">
          {content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          ) : (
            <p className="text-slate-400">Nothing to preview yet.</p>
          )}
        </div>
      ) : (
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note in Markdown..."
          className="min-h-[400px] font-mono text-sm"
          aria-label="Note content"
        />
      )}
    </div>
  )
}
