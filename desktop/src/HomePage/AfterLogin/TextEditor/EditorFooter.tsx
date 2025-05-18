import React from 'react';

interface EditorFooterProps {
  content: string;
}

export const EditorFooter: React.FC<EditorFooterProps> = ({ content }) => {
  const getWordCount = (text: string) => {
    // Remove extra whitespace and split by spaces
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <div className="bg-white/30 backdrop-blur-[2px] border-t border-white/20 px-4 py-2">
      <div className="flex justify-end text-sm text-gray-600 items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500/70"></div>
        <span>{getWordCount(content)} {getWordCount(content) > 1 ? 'words': 'word'} </span>
      </div>
    </div>
  );
}; 