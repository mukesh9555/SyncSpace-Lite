import { useNotesStore } from '@/store/notesStore'
import { useWhiteboardStore } from '@/store/whiteboardStore'
import { useCodeStore } from '@/store/codeStore'
import { FiFileText, FiPenTool, FiCode, FiArrowUpRight } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function StatsCards() {
  const notesCount = useNotesStore((state) => state.notes.length)
  const whiteboardsCount = useWhiteboardStore((state) => state.whiteboards.length)
  const codeFilesCount = useCodeStore((state) => state.files.length)

  const stats = [
    {
      label: 'Notes',
      value: notesCount,
      icon: FiFileText,
      to: '/notes',
      iconBg: 'bg-mustard/10',
      iconColor: 'text-mustard',
    },
    {
      label: 'Whiteboards',
      value: whiteboardsCount,
      icon: FiPenTool,
      to: '/whiteboard',
      iconBg: 'bg-teal/10',
      iconColor: 'text-teal',
    },
    {
      label: 'Code Files',
      value: codeFilesCount,
      icon: FiCode,
      to: '/code',
      iconBg: 'bg-primary-500/10',
      iconColor: 'text-primary-600 dark:text-primary-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Link
            to={stat.to}
            className="group flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              <p className="mt-1 font-display text-3xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${stat.iconBg}`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} aria-hidden="true" />
              </div>
              <FiArrowUpRight className="h-4 w-4 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-slate-600" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
