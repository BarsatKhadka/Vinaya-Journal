import { useEffect, useState } from "react";
import axios from "axios";

const RamBadge = ({ ram }: { ram: string }) => (
    <span className="px-3 py-0.5 bg-[#E6E2DD] border border-[#CFCAC2] rounded-lg 
                   text-gray-700 text-[11px] tracking-wide ml-4" 
          style={{fontFamily: '"Fira Sans", sans-serif'}}>
        {ram}
    </span>
);

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
        <div className="px-2 py-2">
            {ollamaModels.length === 0 ? (
                <div className="bg-[#F7F4F0] border border-gray-400 rounded-lg">
                    <p className="p-6 text-gray-700 text-base font-serif border-b border-gray-200 
                              tracking-wide text-center">
                        Let's setup your first local AI companion.
                    </p>

                    {/* Mistral Card */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center">
                                    <h3 className="text-lg font-serif text-gray-800 mr-5">mistral:7b</h3>
                                    <RamBadge ram="8GB+ RAM" />
                                </div>
                                <p className="text-xs text-gray-500 mt-1 italic" 
                                   style={{fontFamily: 'Fira Sans'}}>
                                    Editor's choice - a top pick for everyday user.
                                </p>
                            </div>
                            <button className="bg-[#2F4F4F] text-white px-4 py-1.5 rounded-md 
                                           text-sm hover:bg-[#1F3F3F] transition-colors cursor-pointer" 
                                    style={{ fontFamily: "serif" }}>
                                Install
                            </button>
                        </div>
                    </div>

                    {/* Phi Card */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center">
                                    <h3 className="text-lg font-serif text-gray-800 mr-8">phi:2.7b</h3>
                                    <RamBadge ram="4-8GB RAM" />
                                </div>
                                <p className="text-xs text-gray-500 mt-1 italic" 
                                   style={{fontFamily: 'Fira Sans'}}>
                                    great for reasoning and quick response
                                </p>
                            </div>
                            <button className="bg-[#2F4F4F] text-white px-4 py-1.5 rounded-md 
                                           text-sm hover:bg-[#1F3F3F] transition-colors cursor-pointer" 
                                    style={{ fontFamily: "serif" }}>
                                Install
                            </button>
                        </div>
                    </div>

                    {/* TinyLlama Card */}
                    <div className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center">
                                    <h3 className="text-lg font-serif text-gray-800 mr-2">TinyLlama</h3>
                                    <RamBadge ram="2-4GB RAM" />
                                </div>
                                <p className="text-xs text-gray-500 mt-1 italic" 
                                   style={{fontFamily: 'Fira Sans'}}>
                                    ideal for low-resource setups.
                                </p>
                            </div>
                            <button className="bg-[#2F4F4F] text-white px-4 py-1.5 rounded-md 
                                           text-sm hover:bg-[#1F3F3F] transition-colors cursor-pointer" 
                                    style={{ fontFamily: "serif" }}>
                                Install
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 mt-2"></div>

                    {/* Explore More Section */}
                    <div className="p-4 text-center">
                        <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                            Looking for different models?
                        </p>
                        <a
                            href="https://ollama.ai/library"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#2F4F4F] hover:text-[#1F3F3F] 
                                     text-sm font-medium transition-colors underline decoration-[#2F4F4F] 
                                     decoration-1 underline-offset-2 hover:decoration-[#1F3F3F]"
                            style={{ fontFamily: '"Fira Sans", sans-serif' }}
                        >
                            Explore Ollama Model Library
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </a>
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