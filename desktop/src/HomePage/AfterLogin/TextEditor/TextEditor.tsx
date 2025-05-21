import { useTextEditor } from "./TextEditorHandles"
import { EditorHeader } from "./EditorHeader"
import { EditorFooter } from "./EditorFooter"
import { useState, useEffect } from "react"

export const TextEditor = () => {
  const { editorRef, handlePaste, handleKeyDown, handleContainerClick } = useTextEditor()
  const [content, setContent] = useState<string>("")

  // Update content when editor changes
  useEffect(() => {
    const updateContent = () => {
      if (editorRef.current) {
        setContent(editorRef.current.innerText || "")
      }
    }

    const editor = editorRef.current
    if (editor) {
      editor.addEventListener('input', updateContent)
      return () => editor.removeEventListener('input', updateContent)
    }
  }, [])
  
  return (
    <div className="h-screen flex flex-col bg-[#FDFBF7]">
      <EditorHeader />

      {/* Editor Content */}
      <div 
        className="flex-1 bg-[#FDFBF7] overflow-y-auto"
        onClick={handleContainerClick}
        style={{
          backgroundImage: `
            linear-gradient(to right, #00000008 1px, transparent 1px),
            linear-gradient(to bottom, #00000008 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      >
        <div 
          ref={editorRef}
          contentEditable
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          data-placeholder="Begin writing..."
          className="w-full max-w-full p-8 focus:outline-none 
                   prose prose-slate empty:before:content-[attr(data-placeholder)]
                   empty:before:text-gray-400 empty:before:pointer-events-none
                   prose-p:text-gray-700 prose-p:leading-relaxed prose-p:font-['Fira_Sans']
                   prose-pre:bg-[#2F4F4F]/5 prose-pre:text-gray-700
                   prose-strong:text-[#2F4F4F] prose-em:text-gray-600
                   text-lg cursor-text min-h-[calc(100vh-12rem)]"
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: 'serif'
          }}
        />
      </div>
      <EditorFooter content={content} />
    </div>
  )
}