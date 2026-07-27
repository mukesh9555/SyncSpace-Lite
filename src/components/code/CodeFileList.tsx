import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCodeStore } from '@/store/codeStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { EmptyState } from '@/components/ui/EmptyState'
import { FiCode, FiPlus, FiTrash2, FiSearch } from 'react-icons/fi'
import { formatRelativeTime } from '@/utils/helpers'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import toast from 'react-hot-toast'

export function CodeFileList() {
  const files = useCodeStore((state) => state.files)
  const addFile = useCodeStore((state) => state.addFile)
  const deleteFile = useCodeStore((state) => state.deleteFile)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = files
    .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  const handleNew = () => {
    const file = addFile({ name: 'untitled', language: 'javascript', content: '' })
    toast.success('Code file created')
    navigate(`/code/${file.id}`)
  }

  useKeyboardShortcut(['ctrl', 'shift', 'f'], handleNew)

  const handleDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirm(`Delete "${name}"? This can't be undone.`)) {
      deleteFile(id)
      toast.success('File deleted')
    }
  }

  if (files.length === 0) {
    return (
      <EmptyState
        title="No code files yet"
        description="Write, run through, and store code snippets with syntax highlighting. Create your first file."
        icon={<FiCode className="h-10 w-10" />}
        actionLabel="New File"
        onAction={handleNew}
      />
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Code Editor</h2>
        <Button variant="primary" size="sm" onClick={handleNew}>
          <FiPlus className="mr-2 h-4 w-4" /> New File
          <span className="ml-2 hidden text-xs opacity-70 lg:inline">Ctrl+Shift+F</span>
        </Button>
      </div>
      <div className="relative mt-4">
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search files by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          aria-label="Search code files"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((file) => (
          <Card key={file.id} className="group relative">
            <Link to={`/code/${file.id}`} className="block">
              <h3 className="pr-10 text-lg font-semibold text-slate-900 dark:text-white truncate">
                {file.name}
              </h3>
              <span className="mt-1 inline-block rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {file.language}
              </span>
              <div className="mt-4 text-xs text-slate-400 dark:text-slate-500">
                Updated {formatRelativeTime(file.updatedAt)}
              </div>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 p-2 text-red-500 opacity-0 transition-opacity hover:bg-red-50 group-hover:opacity-100 dark:hover:bg-red-900/20"
              onClick={(e) => handleDelete(e, file.id, file.name)}
              aria-label="Delete file"
            >
              <FiTrash2 className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
