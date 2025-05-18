import { useTextEditor } from "./TextEditorHandles"

export const TextEditor = () => {
  const { editorRef, handlePaste, handleKeyDown, handleContainerClick } = useTextEditor()
  
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