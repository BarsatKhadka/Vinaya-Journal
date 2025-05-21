import React, { useState } from 'react';
import { Save } from "lucide-react";
import axios from "axios";

interface EditorFooterProps {
  content: string;
}

export const EditorFooter: React.FC<EditorFooterProps> = ({ content }) => {
  const [isSaving, setIsSaving] = useState(false);

  const getWordCount = (text: string) => {
    // Remove extra whitespace and split by spaces
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharCount = (text: string) => {
    return text.length;
  };

  const Indicator = () => (
    <div className="w-1 h-1 rounded-full bg-[#4F6F4F]/80" />
  );

  const handleSave = async () => {
    if (!content.trim()) return;
    setIsSaving(true);
    try {
      await axios.post("http://localhost:8080/journalEntry", {
        content: content,
      });
    } catch (error) {
      console.error('Error saving journal entry:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white/30 backdrop-blur-[2px] border-t border-white/20 px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving || !content.trim()}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl shadow-md
              border border-[#C9A74A] bg-[#F7F4ED] relative cursor-pointer
              ${isSaving || !content.trim() ? 'bg-gray-200 cursor-not-allowed' : ''}`}
            style={{
              fontFamily: 'serif',
              fontWeight: 300,
              fontSize: '1rem',
              color: '#2F4F4F',
              background: '#F7F4ED',
            }}
          >
            <span className="mr-1"><Save size={18} /></span>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>

        <div className="flex text-md text-gray-600 items-center gap-4">
          <div className="flex items-center gap-2">
            <Indicator />
            <span style={{fontFamily: 'Roboto Mono'}}>
              {getWordCount(content)} {getWordCount(content) > 1 ? 'words' : 'word'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Indicator />
            <span style={{fontFamily: 'Roboto Mono'}}>
              {getCharCount(content)} {getCharCount(content) > 1 ? 'characters' : 'character'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 