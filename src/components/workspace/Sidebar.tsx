import { NavLink } from 'react-router-dom'
import { FiHome, FiFileText, FiPenTool, FiCode, FiSettings, FiX } from 'react-icons/fi'
import { cn } from '@/utils/cn'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: FiHome },
  { to: '/notes', label: 'Notes', icon: FiFileText },
  { to: '/whiteboard', label: 'Whiteboard', icon: FiPenTool },
  { to: '/code', label: 'Code Editor', icon: FiCode },
  { to: '/settings', label: 'Settings', icon: FiSettings },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-slate-950/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex w-64 transform flex-col border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-900 md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Sidebar navigation"
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
          <span className="flex items-center gap-2 font-display text-lg font-bold text-slate-900 dark:text-white">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold text-white"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              S
            </span>
            SyncSpace
          </span>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
            aria-label="Close sidebar"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Workspace
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'absolute left-0 h-5 w-1 rounded-r-full transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-0'
                    )}
                    style={{ backgroundColor: 'var(--accent)' }}
                    aria-hidden="true"
                  />
                  <item.icon className="h-[18px] w-[18px] flex-shrink-0" aria-hidden="true" />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Shortcuts
          </p>
          <dl className="mt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex justify-between">
              <dt>New note</dt>
              <dd className="font-mono text-slate-400 dark:text-slate-500">⇧⌘N</dd>
            </div>
            <div className="flex justify-between">
              <dt>New board</dt>
              <dd className="font-mono text-slate-400 dark:text-slate-500">⇧⌘B</dd>
            </div>
            <div className="flex justify-between">
              <dt>New file</dt>
              <dd className="font-mono text-slate-400 dark:text-slate-500">⇧⌘F</dd>
            </div>
          </dl>
        </div>
      </aside>
    </>
  )
}
