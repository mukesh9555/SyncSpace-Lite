import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Settings {
  accentColor: string
  editorFontSize: number
}

interface SettingsState {
  settings: Settings
  setAccentColor: (color: string) => void
  setEditorFontSize: (size: number) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: { accentColor: '#4f46e5', editorFontSize: 14 },
      setAccentColor: (color) =>
        set((state) => ({ settings: { ...state.settings, accentColor: color } })),
      setEditorFontSize: (size) =>
        set((state) => ({ settings: { ...state.settings, editorFontSize: size } })),
    }),
    { name: 'syncspace_settings' }
  )
)
