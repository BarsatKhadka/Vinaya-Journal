import { useCallback, useRef} from 'react'

export const TextEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null)

  // Handle paste to remove formatting
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, text)
  }, [])

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      document.execCommand('insertText', false, '    ')
    }
  }, [])

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 bg-white/40 backdrop-blur-[2px] overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div
            ref={editorRef}
            contentEditable
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            className="min-h-[200px] p-6 focus:outline-none 
                     prose prose-slate max-w-none
                     prose-p:text-gray-700 prose-p:leading-relaxed
                     prose-blockquote:border-l-[#2F4F4F]/20 prose-blockquote:text-gray-600
                     prose-pre:bg-[#2F4F4F]/5 prose-pre:text-gray-700
                     font-serif text-lg"
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          />
        </div>
      </div>
    </div>
  )
}