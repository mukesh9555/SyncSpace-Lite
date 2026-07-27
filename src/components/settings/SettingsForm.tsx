import { useState } from 'react'
import { useSettingsStore } from '@/store/settingsStore'
import { useAuthStore } from '@/store/authStore'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import toast from 'react-hot-toast'

const presetColors = ['#4f46e5', '#14b8a6', '#e8a33d', '#ec4899', '#8b5cf6', '#ef4444']

export function SettingsForm() {
  const { theme, toggleTheme } = useTheme()
  const { settings, setAccentColor } = useSettingsStore()
  const user = useAuthStore((state) => state.user)
  const updateProfile = useAuthStore((state) => state.updateProfile)

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleSaveProfile = () => {
    updateProfile({ name, email })
    toast.success('Profile updated')
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Appearance</h3>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Dark mode</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark themes</p>
          </div>
          <button
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Toggle dark mode"
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
            style={{ backgroundColor: theme === 'dark' ? 'var(--accent)' : '#cbd5e1' }}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-slate-900 dark:text-white">Accent color</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => setAccentColor(color)}
                className="h-8 w-8 rounded-full border-2 transition-transform hover:scale-110"
                style={{
                  backgroundColor: color,
                  borderColor: settings.accentColor === color ? '#000' : 'transparent',
                }}
                aria-label={`Set accent color to ${color}`}
              />
            ))}
            <input
              type="color"
              value={settings.accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="h-8 w-10 cursor-pointer rounded border border-slate-300 dark:border-slate-600"
              aria-label="Custom accent color"
            />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Profile</h3>
        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="settings-name">
              Name
            </label>
            <Input id="settings-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="settings-email">
              Email
            </label>
            <Input
              id="settings-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button onClick={handleSaveProfile}>Save changes</Button>
        </div>
      </Card>
    </div>
  )
}
