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
      <div className="flex justify-end text-sm text-gray-600">
        <span>{getWordCount(content)} words</span>
      </div>
    </div>
  );
}; 