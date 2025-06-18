import React from 'react';

const LocallySetupOllamaAI: React.FC = () => {
  return (
    <div className="mt-20 text-center">
      <h2 className="text-3xl text-teal-800 font-light mb-4">
        Locally Setup Ollama AI
      </h2>
      <p className="text-slate-700 font-light mb-8">
        All processing happens locally on your device
      </p>
      <div className="flex justify-center gap-6">
        <button className="px-8 py-3 border border-teal-600/60 text-teal-800 rounded-md hover:bg-teal-50/50 transition-colors font-light bg-white/20 backdrop-blur-sm">
          Download for Linux
        </button>
        <button className="px-8 py-3 border border-teal-600/60 text-teal-800 rounded-md hover:bg-teal-50/50 transition-colors font-light bg-white/20 backdrop-blur-sm">
          GitHub—Open Source
        </button>
      </div>
    </div>
  );
};

export default LocallySetupOllamaAI; 