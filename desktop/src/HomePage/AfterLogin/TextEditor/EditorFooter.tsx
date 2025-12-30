import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Save } from "lucide-react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { useAppStore } from "../../../store";

interface EditorFooterProps {
  content: string;
  isReadOnly?: boolean;
  onSaveSuccess?: () => void;
}

export interface EditorFooterRef {
  triggerSave: () => void;
}

export const EditorFooter = forwardRef<EditorFooterRef, EditorFooterProps>(({ content, isReadOnly, onSaveSuccess }, ref) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | 'idle'>('idle');
  const [saved_at, setSaved_at] = useState<string>("");
  const { t, i18n } = useTranslation();
  const { selectedDate } = useAppStore();
  

  const getWordCount = (text: string) => {
    // Remove extra whitespace and split by spaces
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharCount = (text: string) => {
    return text.length;
  };

  const Indicator = () => (
    <div className="w-1 h-1 rounded-full bg-[var(--accent)]/80" />
  );

  useEffect(() => {
    const fetchSaved_at = async () => {
      const response = await axios.get(`http://localhost:8080/lastSavedAt?date=${selectedDate}`);
      if(response.data != "") {
        setSaved_at(response.data);
      }else{
        setSaved_at("")
      }
    };
    fetchSaved_at();
  }, [selectedDate]);

  const handleSave = async () => {
    if (!content.trim()) return;

    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    if (selectedDate < today) {
        const confirmed = window.confirm(t('textEditor.confirmPreviousDaySave'));
        if (!confirmed) return;
    }

    setIsSaving(true);
    try {
      const response = await axios.post("http://localhost:8080/journalEntry", {
        content: content,
        date: selectedDate
      });
      setSaved_at(response.data);
      setSaveStatus("success");
      if (onSaveSuccess) onSaveSuccess();
    } catch (error) {
      console.error('Error saving journal entry:', error);
      setSaveStatus("error");
    } finally {
      setTimeout(() =>{
        setIsSaving(false)
      }, 1000)
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }
  };

  // Expose handleSave to parent component
  useImperativeHandle(ref, () => ({
    triggerSave: handleSave
  }));

  let buttonText = t('textEditor.save')
  if(isSaving) {
    buttonText = t('textEditor.saving')
  } else if(saveStatus === 'success') {
    buttonText = t('textEditor.saved')
  } else if(saveStatus === 'error') {
    buttonText = t('textEditor.error')
  }

  return (
    <div className=" backdrop-blur-[2px] border-t border-[var(--border-color)] px-4 py-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving || !content.trim() || isReadOnly}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-xl
              border border-[var(--accent)] relative cursor-pointer
              transition-all duration-150
              ${isSaving || !content.trim() || isReadOnly ? 'opacity-60 cursor-not-allowed' : 'hover:border-[var(--text-main)] hover:shadow-md active:scale-[0.98]'}
              ${saveStatus === 'success' ? 'border-[var(--accent)] text-[var(--text-main)]' : ''}
              ${saveStatus === 'error' ? 'border-red-400 text-red-500' : ''}
            `}
            style={{
              outline: 'none',
              minWidth: 90,
              letterSpacing: '0.01em',
              fontFamily: 'serif',
              fontWeight: 400,
              fontSize: '1rem',
              color: 'var(--text-main)',
              background: 'var(--bg-card)',
              boxShadow: isSaving || saveStatus === 'success' || saveStatus === 'error'
                ? '0 2px 8px 0 rgba(0,0,0,0.1)'
                : '0 1px 2px 0 rgba(0,0,0,0.05)',
              borderBottomWidth: '2.5px',
              borderRightWidth: '2.5px',
            }}
          >
            <span className="mr-1"><Save size={18} /></span>
            <span style={{fontFamily: 'Fira Sans'}}>{buttonText}</span>
          </button>
          {saved_at && (
            <span className="text-xs lg:text-md text-gray-500 ml-2 whitespace-nowrap">
              {t('textEditor.lastSavedAt')}: {new Date(saved_at).toLocaleString(i18n.language)}
            </span>
          )}
          {saved_at === "" && (
            <span className="lg:text-md text-xs text-gray-500 ml-2 whitespace-nowrap">
              {t('textEditor.noEntriesYet')}
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row text-xs lg:text-lg md:text-md text-gray-600 items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <Indicator />
            <span style={{fontFamily: 'Roboto Mono'}}>
              {getWordCount(content)} {getWordCount(content) > 1 ? t('textEditor.words') : t('textEditor.word')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Indicator />
            <span style={{fontFamily: 'Roboto Mono'}}>
              {getCharCount(content)}{" "}
              <span className="inline lg:hidden">
                {t('textEditor.char')}
              </span>
              <span className="hidden lg:inline">
              {getCharCount(content) > 1 ? t('textEditor.characters') : t('textEditor.character')}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

EditorFooter.displayName = 'EditorFooter';