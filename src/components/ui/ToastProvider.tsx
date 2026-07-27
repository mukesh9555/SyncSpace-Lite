import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        className: 'text-sm',
        style: {
          borderRadius: '0.5rem',
        },
      }}
    />
  )
}
