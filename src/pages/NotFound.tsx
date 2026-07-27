import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 max-w-sm text-slate-500 dark:text-slate-400">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary" className="mt-6">
          Back to home
        </Button>
      </Link>
    </div>
  )
}
