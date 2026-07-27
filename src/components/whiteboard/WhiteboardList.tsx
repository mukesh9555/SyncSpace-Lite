import { useNavigate } from 'react-router-dom'
import { useWhiteboardStore } from '@/store/whiteboardStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Link } from 'react-router-dom'
import { FiPenTool, FiPlus, FiTrash2 } from 'react-icons/fi'
import { formatRelativeTime } from '@/utils/helpers'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import toast from 'react-hot-toast'

export function WhiteboardList() {
  const whiteboards = useWhiteboardStore((state) => state.whiteboards)
  const addWhiteboard = useWhiteboardStore((state) => state.addWhiteboard)
  const deleteWhiteboard = useWhiteboardStore((state) => state.deleteWhiteboard)
  const navigate = useNavigate()

  const sorted = [...whiteboards].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  const handleNew = () => {
    const wb = addWhiteboard('Untitled Whiteboard')
    toast.success('Whiteboard created')
    navigate(`/whiteboard/${wb.id}`)
  }

  useKeyboardShortcut(['ctrl', 'shift', 'b'], handleNew)

  const handleDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirm(`Delete "${name}"? This can't be undone.`)) {
      deleteWhiteboard(id)
      toast.success('Whiteboard deleted')
    }
  }

  if (whiteboards.length === 0) {
    return (
      <EmptyState
        title="No whiteboards yet"
        description="Sketch ideas with pencil, shapes, arrows, and text. Draw your first board to get started."
        icon={<FiPenTool className="h-10 w-10" />}
        actionLabel="New Whiteboard"
        onAction={handleNew}
      />
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Whiteboard</h2>
        <Button variant="primary" size="sm" onClick={handleNew}>
          <FiPlus className="mr-2 h-4 w-4" /> New Whiteboard
          <span className="ml-2 hidden text-xs opacity-70 lg:inline">Ctrl+Shift+B</span>
        </Button>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((wb) => (
          <Card key={wb.id} className="group relative">
            <Link to={`/whiteboard/${wb.id}`} className="block">
              <h3 className="pr-10 text-lg font-semibold text-slate-900 dark:text-white truncate">
                {wb.name}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {wb.shapes.length} shape{wb.shapes.length !== 1 ? 's' : ''}
              </p>
              <div className="mt-4 text-xs text-slate-400 dark:text-slate-500">
                Updated {formatRelativeTime(wb.updatedAt)}
              </div>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 p-2 text-red-500 opacity-0 transition-opacity hover:bg-red-50 group-hover:opacity-100 dark:hover:bg-red-900/20"
              onClick={(e) => handleDelete(e, wb.id, wb.name)}
              aria-label="Delete whiteboard"
            >
              <FiTrash2 className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
