import { useEffect, useState } from "react";
import axios from "axios";

export const OllamaRunningCard = () => {
    const [ollamaModels, setOllamaModels] = useState<string[]>([]);
    
    useEffect(() => {
        const checkOllamaModels = async () => {
            try {
                const response = await axios.get("http://localhost:8000/models");
                setOllamaModels(response?.data.models || []);
            } catch (error) {
                console.error("Error checking Ollama status:", error);
            }
        };
        checkOllamaModels();
    }, []);

    return (
        <div className="px-4">
            {ollamaModels.length === 0 ? (
                <div className="flex flex-col gap-3">
                    <p className="text-gray-600 text-sm mb-2">No models found. Let's setup your first local AI companion.</p>
                    {/* Mistral Card */}
                    <div className="bg-[#F7F4F0] border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-serif text-gray-800">Mistral</h3>
                                <p className="text-sm text-gray-600 mt-1">a large model</p>
                            </div>
                            <button className="bg-[#2F4F4F] text-white px-4 py-1.5 rounded-md 
                                           text-sm hover:bg-[#1F3F3F] transition-colors">
                                Install
                            </button>
                        </div>
                    </div>

                    {/* Phi Card */}
                    <div className="bg-[#F7F4F0] border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-serif text-gray-800">Phi</h3>
                                <p className="text-sm text-gray-600 mt-1">a middle model</p>
                            </div>
                            <button className="bg-[#2F4F4F] text-white px-4 py-1.5 rounded-md 
                                           text-sm hover:bg-[#1F3F3F] transition-colors">
                                Install
                            </button>
                        </div>
                    </div>

                    {/* TinyLlama Card */}
                    <div className="bg-[#F7F4F0] border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-serif text-gray-800">TinyLlama</h3>
                                <p className="text-sm text-gray-600 mt-1">a tiny yet expressive model</p>
                                <p className="text-xs text-gray-500 mt-1 italic">Recommended for low memory</p>
                            </div>
                            <button className="bg-[#2F4F4F] text-white px-4 py-1.5 rounded-md 
                                           text-sm hover:bg-[#1F3F3F] transition-colors">
                                Install
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-4 mt-2">
                    <p>Available local models:</p>
                    {ollamaModels.map((model, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center">
                            <div className="flex-1">
                                <div className="font-semibold text-lg">{model}</div>
                                <div className="text-gray-600 text-sm">Local model</div>
                                <div className="text-gray-400 text-xs mt-1">Status: Ready</div>
                            </div>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};