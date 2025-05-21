import React from 'react';
import { Save } from "lucide-react";
import axios from "axios";

interface EditorFooterProps {
  content: string;
}

export const EditorFooter: React.FC<EditorFooterProps> = ({ content }) => {
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
    try {
      await axios.post("http://localhost:8080/journalEntry", {
        content: content,
      });
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  };

  return (
    <div className="bg-white/30 backdrop-blur-[2px] border-t border-white/20 px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="px-4 py-2 rounded-lg flex items-center gap-2
                     bg-[#2F4F4F] hover:bg-[#1F3F3F] text-white shadow-md
                     transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            style={{ fontFamily: '"Fira Sans", sans-serif' }}
          >
            <Save size={18} />
            <span className="text-sm">Save</span>
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