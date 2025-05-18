import { useTextEditor } from "./TextEditorHandles"

export const TextEditor = () => {
  const { editorRef, handlePaste, handleKeyDown, handleContainerClick } = useTextEditor()
  
  return (
    <div className="h-screen flex flex-col">
      {/* Editor Header */}
      <div className="bg-white/40 backdrop-blur-[2px] border-b border-white/20 px-6 py-4">
        <h1 className="text-2xl font-serif text-gray-800">
          <span className="bg-gradient-to-r from-teal-700 to-slate-700 bg-clip-text text-transparent">
            Write with gentle focus
          </span>
        </h1>
        <p className="text-sm text-gray-600 font-light tracking-wide mt-1" 
           style={{ fontFamily: '"Fira Sans", sans-serif' }}>
          Your thoughts, securely stored on your device
        </p>
      </div>

      {/* Editor Content */}
      <div 
        className="flex-1 bg-white/40 backdrop-blur-[2px] overflow-y-auto"
        onClick={handleContainerClick}
      >
        <div 
          ref={editorRef}
          contentEditable
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          data-placeholder="Begin writing..."
          className="w-full max-w-3xl p-8 focus:outline-none 
                   prose prose-slate empty:before:content-[attr(data-placeholder)]
                   empty:before:text-gray-400 empty:before:pointer-events-none
                   prose-p:text-gray-700 prose-p:leading-relaxed prose-p:font-['Fira_Sans']
                   prose-headings:font-serif prose-headings:text-gray-800
                   prose-blockquote:border-l-[#2F4F4F]/20 prose-blockquote:text-gray-600
                   prose-pre:bg-[#2F4F4F]/5 prose-pre:text-gray-700
                   prose-strong:text-[#2F4F4F] prose-em:text-gray-600
                   text-lg cursor-text min-h-[calc(100vh-8rem)]"
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: '"serif'
          }}
        />
      </div>
    </div>
  )
}