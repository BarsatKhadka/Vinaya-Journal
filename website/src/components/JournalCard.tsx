import React from 'react';

interface JournalCardProps {
  selectedFeature: 'home' | 'ollama' | 'rag' | 'mood' | 'retrieve';
  featureImages: Record<string, string>;
}

const featureNames: Record<string, string> = {
  home: 'Home',
  ollama: 'Vinaya Ollama AI',
  rag: 'Contextual RAG',
  mood: 'Mood Insights',
  retrieve: 'Retrieve Past Entries',
};

const JournalCard: React.FC<JournalCardProps> = ({ selectedFeature, featureImages }) => {
  return (
    <div
      className="p-1 rounded-3xl bg-gradient-to-r from-[#FFD700] to-[#F5C242] shadow-2xl w-full max-w-4xl overflow-hidden"
      style={{ boxShadow: '0 0 0 1px #f5c24233, 0 8px 32px 0 rgba(47,79,79,0.10)' }}
    >
      <div className="rounded-3xl bg-white/60 backdrop-blur-lg flex flex-col items-center justify-center w-full h-full overflow-hidden">
        {/* Mac-style window bar with breadcrumb */}
        <div className="flex items-center justify-between px-2 sm:px-4 py-2 w-full rounded-t-3xl bg-white border-b border-amber-200/40">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400 inline-block border border-red-300" />
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-300 inline-block border border-yellow-200" />
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 inline-block border border-green-300" />
          </div>
          <div className="flex items-center">
            <span className="bg-[#fae4b2] border border-amber-200/60 rounded-lg px-2 sm:px-3 py-1 flex items-center shadow-sm max-w-full overflow-hidden">
              <span className="text-green-700 font-bold mr-1 sm:mr-2 text-xs sm:text-sm">$</span>
              <span className="text-gray-700 font-mono text-xs select-none hidden xs:inline">cd /VinayaJournal/</span>
              <span className="text-gray-700 font-mono text-xs select-none xs:hidden">cd /</span>
              <span className="ml-1 sm:ml-2 text-vinayaGreen font-mono text-xs sm:text-sm select-none truncate">
                {featureNames[selectedFeature]}
              </span>
            </span>
          </div>
        </div>
        {/* Image area */}
        <div className="w-full flex-1 flex items-stretch justify-center rounded-b-3xl bg-transparent">
          <img
            src={featureImages[selectedFeature]}
            alt={selectedFeature}
            className="w-full h-full object-contain rounded-b-3xl bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default JournalCard; 