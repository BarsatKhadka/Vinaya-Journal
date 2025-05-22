import { useEffect } from "react";
import { useAppStore } from "../../../../store";
import { checkOllamaRunning } from "../../../BeforeLogin/OllamaAISection/OllamaAICard";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export const OllamaAIModelDropdown = () => {
    const { ollamaRunning, setOllamaRunning } = useAppStore();

    //check if ollama is running
    useEffect(() => {
        const fetchOllamaRunning = async () => {
            const ollamaRunning = await checkOllamaRunning();
            setOllamaRunning(ollamaRunning);
        };
        fetchOllamaRunning();
    }, []);

    return (
        <div className="w-full max-w-xs mx-auto">
            {ollamaRunning ? (
                <>
                    <label className="block text-xs md:text-sm font-serif text-[#2F4F4F] mb-2 ml-1">
                        Ollama AI Model
                    </label>
                    <select
                        className="w-full px-2 md:px-3 py-2 rounded-md border border-gray-300 bg-white text-[#2F4F4F] font-serif text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#2F4F4F]"
                        defaultValue="Mistral 78"
                    >
                        <option value="Mistral 78">Mistral 78</option>
                        <option value="Llama 3">Llama 3</option>
                        <option value="Phi 3">Phi 3</option>
                    </select>
                </>
            ) : (
                <div className="w-full px-2 md:px-3 py-4 rounded-md border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 text-red-700 font-serif text-xs md:text-sm text-center shadow-sm flex flex-col items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-red-400 mb-1" />
                    <div className="font-semibold text-base md:text-lg text-red-700">
                        Ollama is not running
                    </div>
                    <div className="text-xs md:text-sm text-red-600">
                        Start Ollama to select a model and chat with AI.
                    </div>
                    <Link to="/" className="w-full">
                        <p className="mt-2 w-full px-2 md:px-4 py-1.5 rounded bg-red-100 text-red-700 font-medium hover:bg-red-200 transition cursor-pointer text-xs md:text-sm">
                            Guide to setup Ollama
                        </p>
                    </Link>
                </div>
            )}
        </div>
    );
};