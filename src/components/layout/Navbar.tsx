import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#trust', label: 'Your data' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-extrabold text-white">
            S
          </span>
          SyncSpace <span className="text-primary-600">Lite</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
          <Link to="/login" className="text-sm font-medium text-slate-600 transition-colors hover:text-ink">
            Sign in
          </Link>
          <Link
            to="/register"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Get started
            <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <button
          className="p-2 text-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-slate-200/70 bg-paper px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-slate-600" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <Link to="/login" className="text-sm font-medium text-slate-600">
              Sign in
            </Link>
            <Link to="/register" className="rounded-lg bg-ink px-4 py-2.5 text-center text-sm font-semibold text-white">
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
