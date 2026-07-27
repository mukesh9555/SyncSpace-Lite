import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCodeStore } from '@/store/codeStore'
import Editor from '@monaco-editor/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useDebounce } from '@/hooks/useDebounce'
import { FiArrowLeft, FiCopy, FiDownload, FiTrash2 } from 'react-icons/fi'
import { useSettingsStore } from '@/store/settingsStore'
import { useTheme } from '@/hooks/useTheme'
import { downloadTextFile, fileExtensionForLanguage } from '@/utils/helpers'
import toast from 'react-hot-toast'

const languages = [
  'javascript',
  'typescript',
  'python',
  'html',
  'css',
  'json',
  'markdown',
  'java',
  'cpp',
  'go',
  'rust',
  'php',
  'sql',
]

export function CodeEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const file = useCodeStore((state) => state.files.find((f) => f.id === id))
  const updateFile = useCodeStore((state) => state.updateFile)
  const deleteFile = useCodeStore((state) => state.deleteFile)
  const { settings, setEditorFontSize } = useSettingsStore()
  const { theme } = useTheme()

  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [language, setLanguage] = useState('javascript')
  const loadedRef = useRef<string | null>(null)

  useEffect(() => {
    if (file && loadedRef.current !== file.id) {
      setName(file.name)
      setContent(file.content)
      setLanguage(file.language)
      loadedRef.current = file.id
    }
  }, [file])

  const debouncedContent = useDebounce(content, 500)
  const debouncedName = useDebounce(name, 500)

  useEffect(() => {
    if (file && loadedRef.current === file.id && (debouncedContent !== file.content || debouncedName !== file.name)) {
      updateFile(file.id, { content: debouncedContent, name: debouncedName || 'untitled' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedContent, debouncedName])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      toast.success('Copied to clipboard')
    } catch {
      toast.error('Could not copy to clipboard')
    }
  }

  const handleDownload = () => {
    downloadTextFile(`${name}.${fileExtensionForLanguage(language)}`, content)
    toast.success('File downloaded')
  }

  const handleDelete = () => {
    if (!file) return
    if (confirm(`Delete "${file.name}"? This can't be undone.`)) {
      deleteFile(file.id)
      toast.success('File deleted')
      navigate('/code')
    }
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    if (file) updateFile(file.id, { language: value })
  }

  if (!file) {
    return (
      <div className="text-center text-slate-500 dark:text-slate-400">
        <p>File not found.</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/code')}>
          <FiArrowLeft className="mr-2 h-4 w-4" /> Back to files
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" onClick={() => navigate('/code')}>
            <FiArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-40"
            aria-label="File name"
          />
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-2 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            aria-label="Language"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <select
            value={settings.editorFontSize}
            onChange={(e) => setEditorFontSize(Number(e.target.value))}
            className="rounded-md border border-slate-300 bg-white px-2 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            aria-label="Font size"
          >
            {[12, 14, 16, 18, 20].map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <FiCopy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <FiDownload className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={handleDelete}
          >
            <FiTrash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="min-h-[500px] flex-1 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700">
        <Editor
          height="100%"
          language={language}
          value={content}
          onChange={(value) => setContent(value ?? '')}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          loading={<div className="flex h-full items-center justify-center text-sm text-slate-400">Loading editor...</div>}
          options={{
            minimap: { enabled: true },
            fontSize: settings.editorFontSize,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  )
}
