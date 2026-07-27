import { useNotesStore } from '@/store/notesStore'
import { useWhiteboardStore } from '@/store/whiteboardStore'
import { useCodeStore } from '@/store/codeStore'
import { Card } from '@/components/ui/Card'
import { Link } from 'react-router-dom'
import { FiFileText, FiPenTool, FiCode } from 'react-icons/fi'
import { formatRelativeTime } from '@/utils/helpers'

export function RecentFiles() {
  const notes = useNotesStore((state) => state.notes)
  const whiteboards = useWhiteboardStore((state) => state.whiteboards)
  const codeFiles = useCodeStore((state) => state.files)

  const allItems = [
    ...notes.map((n) => ({ id: n.id, title: n.title, updatedAt: n.updatedAt, type: 'note' as const, path: `/notes/${n.id}` })),
    ...whiteboards.map((w) => ({ id: w.id, title: w.name, updatedAt: w.updatedAt, type: 'whiteboard' as const, path: `/whiteboard/${w.id}` })),
    ...codeFiles.map((c) => ({ id: c.id, title: c.name, updatedAt: c.updatedAt, type: 'code' as const, path: `/code/${c.id}` })),
  ]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6)

  const iconMap = {
    note: FiFileText,
    whiteboard: FiPenTool,
    code: FiCode,
  }

  const colorMap = {
    note: 'bg-mustard/10 text-mustard',
    whiteboard: 'bg-teal/10 text-teal',
    code: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
  }

  return (
    <Card>
      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Recent files</h3>
      {allItems.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Nothing here yet — create a note, whiteboard, or code file to see it show up.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-200 dark:divide-slate-700">
          {allItems.map((item) => {
            const Icon = iconMap[item.type]
            return (
              <li key={`${item.type}-${item.id}`} className="py-1.5">
                <Link
                  to={item.path}
                  className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${colorMap[item.type]}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="truncate text-sm font-medium text-slate-900 dark:text-white">
                      {item.title}
                    </span>
                  </div>
                  <span className="ml-2 flex-shrink-0 text-xs text-slate-500 dark:text-slate-400">
                    {formatRelativeTime(item.updatedAt)}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
