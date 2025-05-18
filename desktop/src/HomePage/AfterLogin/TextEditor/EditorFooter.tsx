import React from 'react';

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

  return (
    <div className="bg-white/30 backdrop-blur-[2px] border-t border-white/20 px-4 py-2">
      <div className="flex justify-end text-md text-gray-600 items-center gap-4">
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
  );
}; 