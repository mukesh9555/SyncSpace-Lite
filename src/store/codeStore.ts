import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CodeFile } from '@/types/code'

interface CodeState {
  files: CodeFile[]
  addFile: (file?: Partial<Pick<CodeFile, 'name' | 'language' | 'content'>>) => CodeFile
  updateFile: (id: string, updates: Partial<CodeFile>) => void
  deleteFile: (id: string) => void
  getFile: (id: string) => CodeFile | undefined
}

export const useCodeStore = create<CodeState>()(
  persist(
    (set, get) => ({
      files: [],
      addFile: (fileData) => {
        const now = new Date().toISOString()
        const newFile: CodeFile = {
          id: crypto.randomUUID(),
          name: fileData?.name ?? 'untitled',
          language: fileData?.language ?? 'javascript',
          content: fileData?.content ?? '',
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({ files: [newFile, ...state.files] }))
        return newFile
      },
      updateFile: (id, updates) => {
        set((state) => ({
          files: state.files.map((f) =>
            f.id === id ? { ...f, ...updates, updatedAt: new Date().toISOString() } : f
          ),
        }))
      },
      deleteFile: (id) => {
        set((state) => ({ files: state.files.filter((f) => f.id !== id) }))
      },
      getFile: (id) => get().files.find((f) => f.id === id),
    }),
    { name: 'syncspace_codefiles' }
  )
)
