import { useCallback, useRef } from "react"

export const useTextEditor = () => {
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
    
    // Format shortcuts (Ctrl/Cmd + key)
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault()
          document.execCommand('bold', false)
          break
        case 'i':
          e.preventDefault()
          document.execCommand('italic', false)
          break
        case 'u':
          e.preventDefault()
          document.execCommand('underline', false)
          break
        case 's':  
          e.preventDefault()
          document.execCommand('strikethrough', false)
          break
      }
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

  return {
    editorRef,
    handlePaste,
    handleKeyDown,
    handleContainerClick
  }
}