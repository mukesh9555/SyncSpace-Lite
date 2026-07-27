import { cn } from '@/utils/cn'
import { HTMLAttributes, forwardRef } from 'react'

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-200 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900',
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'
export { Card }
