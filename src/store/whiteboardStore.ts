import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Whiteboard, WhiteboardShape } from '@/types/whiteboard'

interface WhiteboardState {
  whiteboards: Whiteboard[]
  addWhiteboard: (name?: string) => Whiteboard
  updateWhiteboard: (id: string, updates: Partial<Whiteboard>) => void
  deleteWhiteboard: (id: string) => void
  updateShapes: (id: string, shapes: WhiteboardShape[]) => void
  getWhiteboard: (id: string) => Whiteboard | undefined
}

export const useWhiteboardStore = create<WhiteboardState>()(
  persist(
    (set, get) => ({
      whiteboards: [],
      addWhiteboard: (name) => {
        const now = new Date().toISOString()
        const newWb: Whiteboard = {
          id: crypto.randomUUID(),
          name: name || 'Untitled Whiteboard',
          shapes: [],
          createdAt: now,
          updatedAt: now,
        }
        set((state) => ({ whiteboards: [newWb, ...state.whiteboards] }))
        return newWb
      },
      updateWhiteboard: (id, updates) => {
        set((state) => ({
          whiteboards: state.whiteboards.map((wb) =>
            wb.id === id ? { ...wb, ...updates, updatedAt: new Date().toISOString() } : wb
          ),
        }))
      },
      deleteWhiteboard: (id) => {
        set((state) => ({ whiteboards: state.whiteboards.filter((wb) => wb.id !== id) }))
      },
      updateShapes: (id, shapes) => {
        set((state) => ({
          whiteboards: state.whiteboards.map((wb) =>
            wb.id === id ? { ...wb, shapes, updatedAt: new Date().toISOString() } : wb
          ),
        }))
      },
      getWhiteboard: (id) => get().whiteboards.find((wb) => wb.id === id),
    }),
    { name: 'syncspace_whiteboards' }
  )
)
