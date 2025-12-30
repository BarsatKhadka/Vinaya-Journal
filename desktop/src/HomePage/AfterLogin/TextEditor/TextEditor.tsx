import { useTextEditor } from "./TextEditorHandles"
import { EditorHeader } from "./EditorHeader"
import { EditorFooter } from "./EditorFooter"
import { useState, useEffect, useRef } from "react"
import imageBackground from "../../../assets/BackgroundImages/textEditorBackground.png"
import { useTranslation } from "react-i18next"
import axios from "axios"

import { useAppStore } from "../../../store"

const STORAGE_KEY = "text-editor-content"

export const TextEditor = () => {
  const { editorRef, handlePaste, handleKeyDown, handleContainerClick } = useTextEditor()
  const [content, setContent] = useState<string>("")
  const { t } = useTranslation()
  const { setEditorContent, selectedDate } = useAppStore()
  const editorFooterRef = useRef<{ triggerSave: () => void }>(null)

  // Add Ctrl+S keyboard shortcut
  useEffect(() => {
    const handleSaveShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        // Trigger save function from EditorFooter
        editorFooterRef.current?.triggerSave()
      }
    }

    document.addEventListener('keydown', handleSaveShortcut)
    return () => document.removeEventListener('keydown', handleSaveShortcut)
  }, [])

  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;
  
  const isPreviousDay = selectedDate < today;
  const isReadOnly = isPreviousDay && content.trim().length > 0;

  // Load saved content on mount
  useEffect(() => {
    const loadContent = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/retrieve?date=${selectedDate}`);
          if (editorRef.current) {
             let data = response.data || "";
             if (data === "Nothing found") data = "";
             editorRef.current.innerText = data;
             setContent(data);
             sessionStorage.setItem(STORAGE_KEY, data);
             setEditorContent(data);
          }
        } catch (error) {
          console.error("Error loading entry:", error);
          if (editorRef.current) {
             editorRef.current.innerText = "";
             setContent("");
             setEditorContent("");
          }
        }
    }
    loadContent();
  }, [editorRef, setEditorContent, selectedDate])

  // Update content when editor changes and save to sessionStorage
  useEffect(() => {
    const updateContent = () => {
      if (editorRef.current) {
        const newContent = editorRef.current.innerText || ""
        setContent(newContent)
        sessionStorage.setItem(STORAGE_KEY, newContent)
        setEditorContent(newContent)
      }
    }

    const editor = editorRef.current
    if (editor) {
      editor.addEventListener('input', updateContent)
      return () => editor.removeEventListener('input', updateContent)
    }
  }, [editorRef, setEditorContent])
  
  return (
    <div className="h-screen flex flex-col relative bg-[var(--bg-main)]">
    
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imageBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: '66% center ',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3, 
          pointerEvents: 'none', 
          filter: 'var(--image-filter)',
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <EditorHeader />
        <div
          className="flex-1 overflow-y-auto border-t border-[var(--border-color)]"
          onClick={handleContainerClick}
        >
          <div
            ref={editorRef}
            contentEditable={!isReadOnly}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            data-placeholder={t('textEditor.placeholder')}
            className={`w-full max-w-full p-9 focus:outline-none
                     prose prose-slate empty:before:content-[attr(data-placeholder)]
                     empty:before:text-[var(--text-muted)] empty:before:pointer-events-none
                     prose-headings:text-[var(--text-main)] prose-ul:text-[var(--text-main)] prose-ol:text-[var(--text-main)]
                     prose-p:text-[var(--text-main)] prose-p:leading-relaxed prose-p:font-['Fira_Sans']
                     prose-pre:bg-[var(--hover-bg)] prose-pre:text-[var(--text-main)]
                     prose-strong:text-[var(--text-main)] prose-em:text-[var(--text-muted)]
                     prose-blockquote:text-[var(--text-muted)] prose-blockquote:border-[var(--accent)]
                     text-lg/7.5 cursor-text min-h-[calc(100vh-12rem)] ${isReadOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
            style={{
              fontFamily: 'serif',
              background: 'repeating-linear-gradient(to bottom, var(--paper-line-bg), var(--paper-line-bg) 28px, var(--paper-line-color) 29px, var(--paper-line-bg) 30px)',
            }}
          />
        </div>
        <EditorFooter ref={editorFooterRef} content={content} />
      </div>
    </div>
  )
}