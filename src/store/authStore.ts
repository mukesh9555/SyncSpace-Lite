import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types/user'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
  updateProfile: (updates: Partial<Pick<User, 'name' | 'email'>>) => void
}

function readUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem('syncspace_users') || '[]')
  } catch {
    return []
  }
}

function writeUsers(users: User[]) {
  localStorage.setItem('syncspace_users', JSON.stringify(users))
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email, password) => {
        const users = readUsers()
        const found = users.find((u) => u.email === email && u.password === password)
        if (found) {
          set({ user: found, isAuthenticated: true })
          return true
        }
        return false
      },
      register: (name, email, password) => {
        const users = readUsers()
        if (users.some((u) => u.email === email)) return false
        const newUser: User = { id: crypto.randomUUID(), name, email, password }
        users.push(newUser)
        writeUsers(users)
        set({ user: newUser, isAuthenticated: true })
        return true
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (updates) => {
        const current = get().user
        if (!current) return
        const updated = { ...current, ...updates }
        const users = readUsers().map((u) => (u.id === updated.id ? updated : u))
        writeUsers(users)
        set({ user: updated })
      },
    }),
    {
      name: 'syncspace_user',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
