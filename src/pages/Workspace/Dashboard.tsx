import { StatsCards } from '@/components/workspace/StatsCards'
import { RecentFiles } from '@/components/workspace/RecentFiles'
import { useAuthStore } from '@/store/authStore'

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-slate-900 dark:text-white">
          {greeting}
          {user?.name ? `, ${user.name.split(' ')[0]}` : ''}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Here's what's happening in your workspace.
        </p>
      </div>
      <StatsCards />
      <RecentFiles />
    </div>
  )
}
