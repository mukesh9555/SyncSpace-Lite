import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-screen items-center justify-center p-6">
            <div className="max-w-md rounded-lg bg-red-50 p-6 text-center text-red-800 dark:bg-red-900/20 dark:text-red-200">
              <h2 className="text-lg font-semibold">Something went wrong</h2>
              <p className="mt-2 text-sm">
                Please try refreshing the page. Your data is still saved locally.
              </p>
            </div>
          </div>
        )
      )
    }
    return this.props.children
  }
}
