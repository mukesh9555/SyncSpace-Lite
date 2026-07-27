import { useEffect, useRef, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Stage, Layer, Line, Rect, Circle, Arrow, Text } from 'react-konva'
import Konva from 'konva'
import { useWhiteboardStore } from '@/store/whiteboardStore'
import { useWhiteboardHistory } from '@/hooks/useWhiteboardHistory'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { Toolbar } from './Toolbar'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FiArrowLeft } from 'react-icons/fi'
import { ShapeType, WhiteboardShape } from '@/types/whiteboard'
import toast from 'react-hot-toast'

function dist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

export function WhiteboardCanvas() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const whiteboard = useWhiteboardStore((state) => state.whiteboards.find((w) => w.id === id))
  const updateShapes = useWhiteboardStore((state) => state.updateShapes)
  const updateWhiteboard = useWhiteboardStore((state) => state.updateWhiteboard)

  const stageRef = useRef<Konva.Stage>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })
  const [tool, setTool] = useState<ShapeType>('line')
  const [color, setColor] = useState('#1f2937')
  const [name, setName] = useState('')
  const isDrawing = useRef(false)
  const loadedRef = useRef<string | null>(null)

  const { shapes, commit, undo, redo, reset, canUndo, canRedo } = useWhiteboardHistory(
    whiteboard?.shapes ?? []
  )
  const [draftShape, setDraftShape] = useState<WhiteboardShape | null>(null)

  useEffect(() => {
    if (whiteboard && loadedRef.current !== whiteboard.id) {
      reset(whiteboard.shapes)
      setName(whiteboard.name)
      loadedRef.current = whiteboard.id
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whiteboard?.id])

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setDimensions({ width: entry.contentRect.width, height: Math.max(400, entry.contentRect.height) })
      }
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Persist shapes to store whenever history-committed shapes change
  useEffect(() => {
    if (whiteboard && loadedRef.current === whiteboard.id) {
      updateShapes(whiteboard.id, shapes)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shapes])

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    const stage = e.target.getStage()
    const pos = stage?.getPointerPosition()
    if (!pos) return

    if (tool === 'text') {
      const text = window.prompt('Enter text:')
      if (text && text.trim()) {
        const shape: WhiteboardShape = {
          id: crypto.randomUUID(),
          type: 'text',
          x: pos.x,
          y: pos.y,
          text: text.trim(),
          fontSize: 20,
          stroke: color,
          strokeWidth: 1,
        }
        commit([...shapes, shape])
      }
      return
    }

    isDrawing.current = true
    const id = crypto.randomUUID()

    if (tool === 'line') {
      setDraftShape({ id, type: 'line', points: [pos.x, pos.y], stroke: color, strokeWidth: 3 })
    } else if (tool === 'rect') {
      setDraftShape({ id, type: 'rect', x: pos.x, y: pos.y, width: 0, height: 0, stroke: color, strokeWidth: 2 })
    } else if (tool === 'circle') {
      setDraftShape({ id, type: 'circle', x: pos.x, y: pos.y, radius: 0, stroke: color, strokeWidth: 2 })
    } else if (tool === 'arrow') {
      setDraftShape({ id, type: 'arrow', points: [pos.x, pos.y, pos.x, pos.y], stroke: color, strokeWidth: 3 })
    }
  }

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!isDrawing.current || !draftShape) return
    const stage = e.target.getStage()
    const pos = stage?.getPointerPosition()
    if (!pos) return

    if (draftShape.type === 'line') {
      setDraftShape({ ...draftShape, points: [...(draftShape.points ?? []), pos.x, pos.y] })
    } else if (draftShape.type === 'rect') {
      setDraftShape({
        ...draftShape,
        width: pos.x - (draftShape.x ?? 0),
        height: pos.y - (draftShape.y ?? 0),
      })
    } else if (draftShape.type === 'circle') {
      setDraftShape({
        ...draftShape,
        radius: dist(draftShape.x ?? 0, draftShape.y ?? 0, pos.x, pos.y),
      })
    } else if (draftShape.type === 'arrow') {
      const pts = draftShape.points ?? [0, 0, 0, 0]
      setDraftShape({ ...draftShape, points: [pts[0], pts[1], pos.x, pos.y] })
    }
  }

  const handleMouseUp = () => {
    if (isDrawing.current && draftShape) {
      commit([...shapes, draftShape])
    }
    isDrawing.current = false
    setDraftShape(null)
  }

  const handleUndo = useCallback(() => {
    undo()
  }, [undo])

  const handleRedo = useCallback(() => {
    redo()
  }, [redo])

  useKeyboardShortcut(['ctrl', 'z'], handleUndo)
  useKeyboardShortcut(['ctrl', 'shift', 'z'], handleRedo)

  const handleClear = () => {
    if (shapes.length === 0) return
    if (confirm('Clear the entire canvas? This can be undone.')) {
      commit([])
      toast.success('Canvas cleared')
    }
  }

  const handleExportPNG = () => {
    const stage = stageRef.current
    if (!stage) return
    const uri = stage.toDataURL({ pixelRatio: 2 })
    const link = document.createElement('a')
    link.download = `${name || 'whiteboard'}.png`
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Exported as PNG')
  }

  const handleNameBlur = () => {
    if (whiteboard && name !== whiteboard.name) {
      updateWhiteboard(whiteboard.id, { name: name || 'Untitled Whiteboard' })
    }
  }

  if (!whiteboard) {
    return (
      <div className="text-center text-slate-500 dark:text-slate-400">
        <p>Whiteboard not found.</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/whiteboard')}>
          <FiArrowLeft className="mr-2 h-4 w-4" /> Back to whiteboards
        </Button>
      </div>
    )
  }

  const allShapes = draftShape ? [...shapes, draftShape] : shapes

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button variant="ghost" onClick={() => navigate('/whiteboard')}>
          <FiArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleNameBlur}
          className="max-w-xs font-semibold"
          aria-label="Whiteboard name"
        />
      </div>

      <Toolbar
        tool={tool}
        setTool={setTool}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        onExportPNG={handleExportPNG}
        canUndo={canUndo}
        canRedo={canRedo}
        color={color}
        setColor={setColor}
      />

      <div
        ref={containerRef}
        className="flex-1 overflow-hidden rounded-md border border-slate-200 bg-white dark:border-slate-700"
        style={{ minHeight: 400, touchAction: 'none' }}
      >
        <Stage
          ref={stageRef}
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <Layer>
            {allShapes.map((shape) => {
              if (shape.type === 'line') {
                return (
                  <Line
                    key={shape.id}
                    points={shape.points ?? []}
                    stroke={shape.stroke}
                    strokeWidth={shape.strokeWidth}
                    lineCap="round"
                    lineJoin="round"
                    tension={0.3}
                  />
                )
              }
              if (shape.type === 'rect') {
                return (
                  <Rect
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    stroke={shape.stroke}
                    strokeWidth={shape.strokeWidth}
                  />
                )
              }
              if (shape.type === 'circle') {
                return (
                  <Circle
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radius={shape.radius}
                    stroke={shape.stroke}
                    strokeWidth={shape.strokeWidth}
                  />
                )
              }
              if (shape.type === 'arrow') {
                return (
                  <Arrow
                    key={shape.id}
                    points={shape.points ?? []}
                    stroke={shape.stroke}
                    fill={shape.stroke}
                    strokeWidth={shape.strokeWidth}
                  />
                )
              }
              if (shape.type === 'text') {
                return (
                  <Text
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    text={shape.text}
                    fontSize={shape.fontSize}
                    fill={shape.stroke}
                  />
                )
              }
              return null
            })}
          </Layer>
        </Stage>
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500">
        Ctrl+Z to undo · Ctrl+Shift+Z to redo · Autosaves as you draw
      </p>
    </div>
  )
}
