import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiFileText,
  FiPenTool,
  FiCode,
  FiWifiOff,
  FiLock,
  FiDownloadCloud,
  FiArrowRight,
  FiCheck,
} from 'react-icons/fi'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const tools = [
  {
    icon: FiFileText,
    name: 'Notes',
    color: 'text-mustard',
    bg: 'bg-mustard/10',
    ring: 'group-hover:ring-mustard/30',
    description:
      'Write in Markdown with a live preview. Every keystroke autosaves — search by title when you need it back.',
  },
  {
    icon: FiPenTool,
    name: 'Whiteboard',
    color: 'text-teal',
    bg: 'bg-teal/10',
    ring: 'group-hover:ring-teal/30',
    description:
      'Sketch with pencil, shapes, arrows, and text. Full undo history, and export any board as a PNG.',
  },
  {
    icon: FiCode,
    name: 'Code Editor',
    color: 'text-primary-600',
    bg: 'bg-primary-500/10',
    ring: 'group-hover:ring-primary-500/30',
    description:
      'A real Monaco editor — the same one behind VS Code — with syntax highlighting for a dozen languages.',
  },
]

const steps = [
  { title: 'Create an account', body: 'Pick a name and email. No verification email, no waiting.' },
  { title: 'Open a tool', body: 'Jump into notes, a whiteboard, or the code editor from one dashboard.' },
  { title: 'Work — it autosaves', body: 'Every change is saved to your browser as you go. Nothing to click.' },
  { title: 'Export anytime', body: 'Take a note as Markdown, a whiteboard as PNG, or code as a plain file.' },
]

const heroStats = [
  { value: '0', label: 'servers required' },
  { value: '3', label: 'tools, one dashboard' },
  { value: '100%', label: 'local & private' },
]

export function Home() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-glow bg-grid bg-grid px-6 pb-20 pt-16 sm:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-card">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              Notes · Whiteboard · Code — one tab
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              A workspace that never leaves your browser.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-600">
              SyncSpace Lite bundles notes, a whiteboard, and a code editor into one offline‑first
              app. No backend, no accounts on a server somewhere — just localStorage doing the work.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3.5 font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Start for free
                <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/login"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-slate-50"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 border-t border-slate-200 pt-6">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-ink">{s.value}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Signature: tilted stacked tool previews */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative h-80 sm:h-[26rem]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-64 w-72 sm:h-72 sm:w-80">
                <div className="absolute inset-0 rotate-[-6deg] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                  <p className="font-mono text-[10px] uppercase tracking-wide text-teal">Whiteboard</p>
                  <div className="mt-3 h-full space-y-2">
                    <div className="h-16 w-20 rounded-lg border-2 border-teal/50" />
                    <div className="h-1.5 w-32 rounded-full bg-slate-100" />
                  </div>
                </div>
                <div className="absolute inset-0 rotate-[3deg] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                  <p className="font-mono text-[10px] uppercase tracking-wide text-slate-400">code.js</p>
                  <div className="mt-3 space-y-1.5 font-mono text-[11px] text-slate-500">
                    <p><span className="text-primary-600">const</span> save = () =&gt; {'{'}</p>
                    <p className="pl-3">localStorage.set(...)</p>
                    <p>{'}'}</p>
                  </div>
                </div>
                <div className="absolute inset-0 rotate-[-1deg] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
                  <p className="font-mono text-[10px] uppercase tracking-wide text-mustard">Untitled Note</p>
                  <div className="mt-3 space-y-2">
                    <div className="h-2.5 w-full rounded-full bg-slate-100" />
                    <div className="h-2.5 w-5/6 rounded-full bg-slate-100" />
                    <div className="h-2.5 w-2/3 rounded-full bg-slate-100" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">Features</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Three tools, one dashboard</h2>
          <p className="mt-3 max-w-xl text-slate-600">
            Switch between them without losing your place — recent files show up on your dashboard the moment you touch them.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08 }}
                className={`group rounded-2xl border border-slate-200 bg-white p-6 shadow-card ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${tool.ring}`}
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${tool.bg}`}>
                  <tool.icon className={`h-5 w-5 ${tool.color}`} />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{tool.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">Getting started</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">How it works</h2>
          <div className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-4 hidden h-px bg-slate-200 lg:block" aria-hidden="true" />
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary-600 bg-white font-display text-sm font-bold text-primary-600">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" className="px-6 py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-xl2 bg-ink px-8 py-14 text-white sm:px-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-400">No backend, ever</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Your data stays exactly where you left it
          </h2>
          <p className="mt-3 max-w-xl text-slate-300">
            Nothing gets sent to a server. There isn't one. Everything lives in your browser's
            local storage, which means it's fast, private, and entirely yours.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-teal/15">
                <FiWifiOff className="h-4 w-4 text-teal" />
              </div>
              <div>
                <p className="font-semibold">Works offline</p>
                <p className="mt-0.5 text-sm text-slate-400">No network calls after the page loads.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-mustard/15">
                <FiLock className="h-4 w-4 text-mustard" />
              </div>
              <div>
                <p className="font-semibold">Private by default</p>
                <p className="mt-0.5 text-sm text-slate-400">No accounts database, no analytics on your content.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500/15">
                <FiDownloadCloud className="h-4 w-4 text-primary-400" />
              </div>
              <div>
                <p className="font-semibold">Export whenever</p>
                <p className="mt-0.5 text-sm text-slate-400">Markdown, PNG, or plain code files — your call.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl rounded-xl2 border border-slate-200 bg-white px-8 py-14 text-center shadow-card">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to make it yours?</h2>
          <p className="mx-auto mt-3 max-w-md text-slate-600">
            Create an account in seconds — it's just a name and email, stored locally.
          </p>
          <Link
            to="/register"
            className="group mt-7 inline-flex items-center gap-2 rounded-lg bg-ink px-8 py-3.5 font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Get started free
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><FiCheck className="h-3.5 w-3.5 text-teal" /> No credit card</span>
            <span className="flex items-center gap-1.5"><FiCheck className="h-3.5 w-3.5 text-teal" /> No server sign-up</span>
            <span className="flex items-center gap-1.5"><FiCheck className="h-3.5 w-3.5 text-teal" /> Your data stays local</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
