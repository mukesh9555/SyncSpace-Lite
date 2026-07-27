import { ReactNode } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Button } from './Button'

interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title, description, icon, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-12 text-center dark:border-slate-600">
      {icon && <div className="mb-4 text-slate-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" className="mt-4" onClick={onAction}>
          <FiPlus className="mr-2 h-4 w-4" /> {actionLabel}
        </Button>
      )}
    </div>
  )
}
