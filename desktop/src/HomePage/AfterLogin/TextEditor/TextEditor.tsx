import { useTextEditor } from "./TextEditorHandles"
import { EditorHeader } from "./EditorHeader"
import { EditorFooter } from "./EditorFooter"
import { useState, useEffect } from "react"
import imageBackground from "../../../assets/BackgroundImages/textEditorBackground.png"

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
    <div className="h-screen flex flex-col relative bg-[#fae4b2]">
    
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imageBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: '66% center ',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3, 
          pointerEvents: 'none', 
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <EditorHeader />
        <div
          className="flex-1 overflow-y-auto border-t border-[#e6cfa7]"
          onClick={handleContainerClick}
        >
          <div
            ref={editorRef}
            contentEditable
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            data-placeholder="Begin writing..."
            className="w-full max-w-full p-8 focus:outline-none 
                     prose prose-slate empty:before:content-[attr(data-placeholder)]
                     empty:before:text-gray-500 empty:before:pointer-events-none
                     prose-p:text-[#2F4F4F] prose-p:leading-relaxed prose-p:font-['Fira_Sans']
                     prose-pre:bg-[#2F4F4F]/5 prose-pre:text-[#2F4F4F]
                     prose-strong:text-[#2F4F4F] prose-em:text-[#2F4F4F]/80
                     text-lg cursor-text min-h-[calc(100vh-12rem)]"
            style={{
              fontFamily: 'serif',
              background: 'repeating-linear-gradient(to bottom, #fef1d6, #fef1d6 28px, #f9e4b7 29px, #fef1d6 30px)',
            }}
          />
        </div>
        <EditorFooter content={content} />
      </div>
    </div>
  )
}