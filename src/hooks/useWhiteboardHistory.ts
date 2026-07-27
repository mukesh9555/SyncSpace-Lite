import { useCallback, useRef, useState } from 'react'
import { WhiteboardShape } from '@/types/whiteboard'

export function useWhiteboardHistory(initialShapes: WhiteboardShape[]) {
  const [shapes, setShapesState] = useState<WhiteboardShape[]>(initialShapes)
  const historyRef = useRef<WhiteboardShape[][]>([initialShapes])
  const indexRef = useRef(0)

  const commit = useCallback((next: WhiteboardShape[]) => {
    const truncated = historyRef.current.slice(0, indexRef.current + 1)
    truncated.push(next)
    historyRef.current = truncated
    indexRef.current = truncated.length - 1
    setShapesState(next)
  }, [])

  const undo = useCallback(() => {
    if (indexRef.current > 0) {
      indexRef.current -= 1
      const prev = historyRef.current[indexRef.current]
      setShapesState(prev)
      return prev
    }
    return null
  }, [])

  const redo = useCallback(() => {
    if (indexRef.current < historyRef.current.length - 1) {
      indexRef.current += 1
      const next = historyRef.current[indexRef.current]
      setShapesState(next)
      return next
    }
    return null
  }, [])

  const reset = useCallback((next: WhiteboardShape[]) => {
    historyRef.current = [next]
    indexRef.current = 0
    setShapesState(next)
  }, [])

  return {
    shapes,
    commit,
    undo,
    redo,
    reset,
    canUndo: indexRef.current > 0,
    canRedo: indexRef.current < historyRef.current.length - 1,
  }
}
