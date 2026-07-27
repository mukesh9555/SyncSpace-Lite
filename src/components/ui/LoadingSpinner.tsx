export function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center" role="status" aria-label="Loading">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent dark:border-primary-400" />
    </div>
  )
}
