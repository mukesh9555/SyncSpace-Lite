import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { FiLogOut, FiMenu, FiMoon, FiSun } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import toast from 'react-hot-toast'

interface HeaderProps {
  onMenuClick: () => void
}

function initials(name?: string | null) {
  if (!name) return 'U'
  const parts = name.trim().split(' ')
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || 'U'
}

export function Header({ onMenuClick }: HeaderProps) {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu className="h-5 w-5" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
        >
          {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
        </button>

        <div className="mx-1 hidden h-6 w-px bg-slate-200 dark:bg-slate-800 sm:block" />

        <div className="hidden items-center gap-2.5 sm:flex">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: 'var(--accent)' }}
            aria-hidden="true"
          >
            {initials(user?.name)}
          </span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {user?.name || 'User'}
          </span>
        </div>

        <Button variant="ghost" size="sm" onClick={handleLogout} aria-label="Log out">
          <FiLogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  )
}
