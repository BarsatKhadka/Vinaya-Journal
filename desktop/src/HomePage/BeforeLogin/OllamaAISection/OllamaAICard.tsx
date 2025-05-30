import { useEffect } from "react";
import axios from "axios";
import {OllamaRunningCard} from "./OllamaRunningCard";
import {OllamaNotRunningCard} from "./OllamaNotRunningCard";
import LocalAiMemory from "../../../assets/FeatureCardIcons/LocalAiMemory.png"; 
import { useAppStore } from "../../../store";

export const checkOllamaRunning = async () => {
    try {
        const response = await axios.get("http://localhost:8000/ollama");
        return response?.data;
    } catch (error) {
        console.error("Error checking Ollama status:", error);
        return false;
    }
};

export const LocalAIFeature = () => {
    const { ollamaRunning, setOllamaRunning } = useAppStore();

    // Check if Ollama is running when the component mounts
    useEffect(() => {
        const fetchOllamaRunning = async () => {
            const ollamaRunning = await checkOllamaRunning();
            setOllamaRunning(ollamaRunning);
        };
        fetchOllamaRunning();
    }, []);

    return (
        <div className="flex flex-col p-6 rounded-xl
                    bg-white/40 backdrop-blur-[2px] border border-white/20
                    shadow-sm transition hover:shadow-md">
            {/* Icon and Title Row */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex-shrink-0">
                    <img
                        src={LocalAiMemory}
                        alt="Local AI Memory icon"
                        className="w-full h-full object-contain"
                    />
                </div>
                <h3 className="text-base md:text-lg lg:text-2xl font-medium text-gray-800 font-serif">
                    Locally Setup Ollama AI
                </h3>
            </div>

            <p className="text-xs md:text-sm lg:text-base text-gray-600 pl-11 md:pl-12 lg:pl-14">
                <span style={{ fontFamily: '"Playfair Display", serif', color: 'inherit' , fontWeight: '500' }}>
                    all processing happens <span style={{ color: '#4caf50',fontWeight: '600' }}>locally on your device</span>
                </span>
            </p>

            {/* Ollama Detected Locally  */}
            <div className="flex items-center gap-2 pl-2 mt-8">
                <div className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg
                    ${ollamaRunning 
                        ? 'bg-green-50/50 border border-[#E6E2DD]' 
                        : 'bg-red-50/50 border border-red-200'
                    }
                    transition-colors duration-200
                `}>
                    {ollamaRunning ? (
                        <div className="w-5 h-5 rounded-full bg-[#d4e3d3] flex items-center justify-center">
                            <svg className="w-3 h-3 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    ) : (
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-red-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                    )}
                    <span className="text-xs md:text-sm lg:text-base" 
                          style={{ fontFamily: '"Roboto Mono", sans-serif', fontWeight: '400' }}>
                        {ollamaRunning ? "Ollama detected and running locally" : "Ollama not running locally"}
                    </span>
                </div>
            </div>

            <div>
                {ollamaRunning ? (
                    <OllamaRunningCard/>
                ) : <OllamaNotRunningCard/>}
            </div>

        </div>
    );
};