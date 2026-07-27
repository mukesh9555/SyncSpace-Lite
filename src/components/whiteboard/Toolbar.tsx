import { Button } from '@/components/ui/Button'
import {
  FiEdit3,
  FiSquare,
  FiCircle,
  FiArrowUpRight,
  FiType,
  FiRotateCcw,
  FiRotateCw,
  FiTrash2,
  FiDownload,
} from 'react-icons/fi'
import { ShapeType } from '@/types/whiteboard'

interface ToolbarProps {
  tool: ShapeType
  setTool: (tool: ShapeType) => void
  onUndo: () => void
  onRedo: () => void
  onClear: () => void
  onExportPNG: () => void
  canUndo: boolean
  canRedo: boolean
  color: string
  setColor: (color: string) => void
}

const tools: { id: ShapeType; icon: typeof FiEdit3; label: string }[] = [
  { id: 'line', icon: FiEdit3, label: 'Pencil' },
  { id: 'rect', icon: FiSquare, label: 'Rectangle' },
  { id: 'circle', icon: FiCircle, label: 'Circle' },
  { id: 'arrow', icon: FiArrowUpRight, label: 'Arrow' },
  { id: 'text', icon: FiType, label: 'Text' },
]

export function Toolbar({
  tool,
  setTool,
  onUndo,
  onRedo,
  onClear,
  onExportPNG,
  canUndo,
  canRedo,
  color,
  setColor,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {tools.map((t) => (
        <Button
          key={t.id}
          variant={tool === t.id ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setTool(t.id)}
          className="p-2"
          title={t.label}
          aria-label={t.label}
          aria-pressed={tool === t.id}
        >
          <t.icon className="h-5 w-5" />
        </Button>
      ))}
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="h-8 w-8 cursor-pointer rounded border border-slate-300 dark:border-slate-600"
        aria-label="Stroke color"
        title="Color"
      />
      <div className="mx-1 h-6 w-px bg-slate-300 dark:bg-slate-600" />
      <Button variant="ghost" size="sm" onClick={onUndo} disabled={!canUndo} className="p-2" aria-label="Undo" title="Undo (Ctrl+Z)">
        <FiRotateCcw className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onRedo} disabled={!canRedo} className="p-2" aria-label="Redo" title="Redo (Ctrl+Shift+Z)">
        <FiRotateCw className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
        aria-label="Clear canvas"
        title="Clear canvas"
      >
        <FiTrash2 className="h-5 w-5" />
      </Button>
      <Button variant="outline" size="sm" onClick={onExportPNG} title="Export as PNG">
        <FiDownload className="mr-2 h-4 w-4" /> PNG
      </Button>
    </div>
  )
}
