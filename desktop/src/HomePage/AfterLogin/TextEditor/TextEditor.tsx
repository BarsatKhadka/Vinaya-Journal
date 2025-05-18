import { useCallback, useRef } from 'react'

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

  // Handle click anywhere to focus
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (editorRef.current && e.target === e.currentTarget) {
      editorRef.current.focus()
      // Place cursor at the end
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(editorRef.current)
      range.collapse(false)
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }, [])

  return (
    <div className="h-[calc(100vh)] flex flex-col">
      <div 
        className="flex-1 bg-white/40 backdrop-blur-[2px] overflow-y-auto"
        onClick={handleContainerClick}
        style={{
          maxHeight: '100%'
        }}
      >
        <div 
          ref={editorRef}
          contentEditable
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          className="w-full max-w-4xl mx-auto p-6 focus:outline-none 
                   prose prose-slate
                   prose-p:text-gray-700 prose-p:leading-relaxed
                   prose-blockquote:border-l-[#2F4F4F]/20 prose-blockquote:text-gray-600
                   prose-pre:bg-[#2F4F4F]/5 prose-pre:text-gray-700
                   font-serif text-lg cursor-text"
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        />
      </div>
    </div>
  )
}