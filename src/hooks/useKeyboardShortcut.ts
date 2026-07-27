import { useEffect } from 'react'

type Key = 'ctrl' | 'shift' | string

export function useKeyboardShortcut(keys: Key[], callback: (e: KeyboardEvent) => void) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const ctrl = event.ctrlKey || event.metaKey
      const shift = event.shiftKey

      const allPressed = keys.every((k) => {
        if (k === 'ctrl') return ctrl
        if (k === 'shift') return shift
        return k.toLowerCase() === event.key.toLowerCase()
      })

      if (allPressed && !event.repeat) {
        event.preventDefault()
        callback(event)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys.join('+'), callback])
}
