import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const register = useAuthStore((state) => state.register)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 4) {
      setError('Password must be at least 4 characters.')
      return
    }
    const success = register(name, email, password)
    if (success) {
      toast.success('Account created!')
      navigate('/dashboard')
    } else {
      setError('An account with this email already exists.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-grid bg-grid bg-paper px-4 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200/80 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900"
      >
        <div>
          <Link to="/" className="mb-6 inline-flex items-center gap-2 font-display text-lg font-bold text-slate-900 dark:text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-xs font-extrabold text-white">
              S
            </span>
            SyncSpace
          </Link>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Create an account</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Everything stays in your browser — no server, no signup emails.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="reg-name">
              Name
            </label>
            <Input id="reg-name" placeholder="Ada Lovelace" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="reg-email">
              Email
            </label>
            <Input
              id="reg-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="reg-password">
              Password
            </label>
            <Input
              id="reg-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" className="w-full">
            Create account
          </Button>
        </form>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary-600 hover:underline dark:text-primary-400">
            Sign in
          </Link>
        </p>
        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          <Link to="/" className="hover:underline">
            ← Back to home
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
