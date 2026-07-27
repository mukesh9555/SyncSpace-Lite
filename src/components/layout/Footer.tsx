import { Link } from 'react-router-dom'
import { FiLinkedin, FiMail } from 'react-icons/fi'

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
              <a href="#features" className="transition-colors hover:text-white">Features</a>
              <a href="#how-it-works" className="transition-colors hover:text-white">How it works</a>
              <a href="#trust" className="transition-colors hover:text-white">Your data</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-slate-200">Account</span>
              <Link to="/login" className="transition-colors hover:text-white">Sign in</Link>
              <Link to="/register" className="transition-colors hover:text-white">Register</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} SyncSpace Lite. Built for people who'd rather keep their notes than their tabs open.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 sm:flex-row sm:items-center">
            <p className="text-sm text-slate-300">
              Made by <span className="font-semibold text-white">Mukesh Chauhan</span>
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/mukesh-chauhan-282543328"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-400/40 hover:bg-primary-500/10 hover:text-white"
              >
                <FiLinkedin className="h-4 w-4 text-primary-400 transition-transform group-hover:scale-110" />
                LinkedIn
              </a>
              <a
                href="mailto:mukeshchauhan8980141@gmail.com"
                className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal/40 hover:bg-teal/10 hover:text-white"
              >
                <FiMail className="h-4 w-4 text-teal transition-transform group-hover:scale-110" />
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
