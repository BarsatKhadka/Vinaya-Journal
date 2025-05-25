import { useAppStore } from "../../../../../store";
import { AlertTriangle } from "lucide-react";

export const InChatAIModelDropdown = () => {
    const {ollamaRunning, ollamaModels, currentModel, setCurrentModel} = useAppStore();


    return (
        <div className="w-full flex items-center mb-2">
            {ollamaRunning ? (
                <div className="ml-auto mr-4 flex items-center gap-2">
                    <span className="text-xs font-semibold md:text-sm font-serif text-[#2F4F4F] whitespace-nowrap ml-2">
                        Ollama
                    </span>
                    <select
                        className="px-2 py-1 rounded-md border border-[#e0f2ef] bg-[#e0f2ef]/70 shadow-sm text-[#2F4F4F] font-serif text-xs focus:outline-none focus:ring-2 focus:ring-[#2F4F4F] transition-colors"
                        value={currentModel}
                        onChange={(e) => setCurrentModel(e.target.value)}
                    >
                        {ollamaModels.length === 0 ? (
                            <option value="No models found">No models found</option>
                        ) : (
                            ollamaModels.map((model) => (
                                <option key={model} value={model}>
                                    {model}
                                </option>
                            ))
                        )}
                    </select>
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