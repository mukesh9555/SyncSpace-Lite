export type ShapeType = 'line' | 'rect' | 'circle' | 'arrow' | 'text'

export interface WhiteboardShape {
  id: string
  type: ShapeType
  points?: number[]
  x?: number
  y?: number
  width?: number
  height?: number
  radius?: number
  text?: string
  fontSize?: number
  stroke: string
  strokeWidth: number
  fill?: string
}

export interface Whiteboard {
  id: string
  name: string
  shapes: WhiteboardShape[]
  createdAt: string
  updatedAt: string
}
