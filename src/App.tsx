import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { ToastProvider } from '@/components/ui/ToastProvider'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useTheme } from '@/hooks/useTheme'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout'
import { Home } from '@/pages/Landing/Home'
import { Login } from '@/pages/Auth/Login'
import { Register } from '@/pages/Auth/Register'
import { NotFound } from '@/pages/NotFound'

const Dashboard = lazy(() => import('@/pages/Workspace/Dashboard'))
const NotesPage = lazy(() => import('@/pages/Workspace/NotesPage'))
const WhiteboardPage = lazy(() => import('@/pages/Workspace/WhiteboardPage'))
const CodePage = lazy(() => import('@/pages/Workspace/CodePage'))
const SettingsPage = lazy(() => import('@/pages/Workspace/SettingsPage'))

function App() {
  useTheme()
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastProvider />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<WorkspaceLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/notes/:id" element={<NotesPage />} />
                <Route path="/whiteboard" element={<WhiteboardPage />} />
                <Route path="/whiteboard/:id" element={<WhiteboardPage />} />
                <Route path="/code" element={<CodePage />} />
                <Route path="/code/:id" element={<CodePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
