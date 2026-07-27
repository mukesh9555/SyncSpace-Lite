import { useParams } from 'react-router-dom'
import { WhiteboardList } from '@/components/whiteboard/WhiteboardList'
import { WhiteboardCanvas } from '@/components/whiteboard/WhiteboardCanvas'

export default function WhiteboardPage() {
  const { id } = useParams()
  return <div className="flex h-full flex-col space-y-6">{id ? <WhiteboardCanvas /> : <WhiteboardList />}</div>
}
