import React, { useState , useEffect} from 'react';
import { Save } from "lucide-react";
import axios from "axios";

interface EditorFooterProps {
  content: string;
}

export const EditorFooter: React.FC<EditorFooterProps> = ({ content }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | 'idle'>('idle');
  const [saved_at, setSaved_at] = useState<string>("");
  

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

  useEffect(() => {
    const fetchSaved_at = async () => {
      const response = await axios.get("http://localhost:8080/lastSavedAt");
      setSaved_at(new Date(response.data).toLocaleString());
    };
    fetchSaved_at();
  }, []);

  const handleSave = async () => {
    if (!content.trim()) return;
    setIsSaving(true);
    try {
      const response = await axios.post("http://localhost:8080/journalEntry", {
        content: content,
      });
      setSaved_at(response.data);
      setSaveStatus("success");
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

  let buttonText = 'Save'
  if(isSaving) {
    buttonText = 'Saving...'
  } else if(saveStatus === 'success') {
    buttonText = 'Saved'
  } else if(saveStatus === 'error') {
    buttonText = 'Error'
  }

  return (
    <div className=" backdrop-blur-[2px] border-t border-white/20 px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving || !content.trim()}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-xl
              border border-[#C9A74A] relative cursor-pointer
              transition-all duration-150
              ${isSaving || !content.trim() ? 'opacity-60 cursor-not-allowed' : 'hover:border-[#2F4F4F] hover:shadow-md active:scale-[0.98]'}
              ${saveStatus === 'success' ? 'border-green-400 text-green-700' : ''}
              ${saveStatus === 'error' ? 'border-red-400 text-red-700' : ''}
            `}
            style={{
              outline: 'none',
              minWidth: 90,
              letterSpacing: '0.01em',
              fontFamily: 'serif',
              fontWeight: 400,
              fontSize: '1rem',
              color: '#2F4F4F',
              background: '#FDFBF7',
              backgroundImage: `
                linear-gradient(to right, #00000008 1px, transparent 1px),
                linear-gradient(to bottom, #00000008 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
              boxShadow: isSaving || saveStatus === 'success' || saveStatus === 'error'
                ? '0 2px 8px 0 #e6e1d5'
                : '0 1px 2px 0 #eceae6',
              borderBottomWidth: '2.5px',
              borderRightWidth: '2.5px',
            }}
          >
            <span className="mr-1"><Save size={18} /></span>
            <span style={{fontFamily: 'Fira Sans'}}>{buttonText}</span>
          </button>
          {saved_at && (
            <span className="text-xs lg:text-md text-gray-500 ml-2 whitespace-nowrap">
              Today's entry last saved at: {new Date(saved_at).toLocaleString()}
            </span>
          )}
          {saved_at === "" && (
            <span className="lg:text-md text-xs text-gray-500 ml-2 whitespace-nowrap">
              No entries yet
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row text-xs lg:text-lg md:text-md text-gray-600 items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <Indicator />
            <span style={{fontFamily: 'Roboto Mono'}}>
              {getWordCount(content)} {getWordCount(content) > 1 ? 'words' : 'word'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Indicator />
            <span style={{fontFamily: 'Roboto Mono'}}>
              {getCharCount(content)}{" "}
              <span className="inline lg:hidden">
                char  
              </span>
              <span className="hidden lg:inline">
              {getCharCount(content) > 1 ? 'characters' : 'character'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 