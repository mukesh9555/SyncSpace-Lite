import { Link } from 'react-router-dom'
import { FiGithub } from 'react-icons/fi'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink px-6 py-14 text-slate-400">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2 font-display text-lg font-bold text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-500 text-xs font-extrabold text-white">
                S
              </span>
              SyncSpace <span className="text-primary-400">Lite</span>
            </p>
            <p className="mt-2 max-w-xs text-sm">
              Notes, whiteboard, and code — kept entirely on your device.
            </p>
          </div>
          <div className="flex gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-slate-200">Product</span>
              <a href="#features" className="hover:text-white">Features</a>
              <a href="#how-it-works" className="hover:text-white">How it works</a>
              <a href="#trust" className="hover:text-white">Your data</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-slate-200">Account</span>
              <Link to="/login" className="hover:text-white">Sign in</Link>
              <Link to="/register" className="hover:text-white">Register</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} SyncSpace Lite. Built for people who'd rather keep their notes than their tabs open.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white"
          >
            <FiGithub className="h-4 w-4" /> Source
          </a>
        </div>
      </div>
    </footer>
  )
}
