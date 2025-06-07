import { useAppStore } from "../../../../../store";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";

export const InChatAIModelDropdown = () => {
    const {ollamaRunning, ollamaModels, currentModel, setCurrentModel} = useAppStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="w-full flex items-center mb-2">
            {ollamaRunning ? (
                <div className="ml-auto mr-4 flex items-center gap-2">
                    <span className="text-xs font-semibold md:text-sm font-serif text-[#2F4F4F] whitespace-nowrap ml-2">
                        Ollama
                    </span>
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#2F4F4F] text-white font-serif hover:bg-[#2F4F4F]/90 transition-colors"
                        >
                            {ollamaModels.length === 0 ? "No models found" : currentModel}
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {isDropdownOpen && ollamaModels.length > 0 && (
                            <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-[#e6cfa7] z-50">
                                {ollamaModels.map((model) => (
                                    <button
                                        key={model}
                                        onClick={() => {
                                            setCurrentModel(model);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 font-serif text-[#2F4F4F] hover:bg-[#fae4b2] transition-colors ${
                                            currentModel === model ? 'bg-[#fae4b2]' : ''
                                        }`}
                                    >
                                        {model}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-1 text-xs text-red-700 font-serif">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Ollama is not running
                </div>
            )}
        </div>
    );
}