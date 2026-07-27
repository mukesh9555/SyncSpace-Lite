import { useParams } from 'react-router-dom'
import { CodeFileList } from '@/components/code/CodeFileList'
import { CodeEditor } from '@/components/code/CodeEditor'

export default function CodePage() {
  const { id } = useParams()
  return <div className="flex h-full flex-col space-y-6">{id ? <CodeEditor /> : <CodeFileList />}</div>
}
