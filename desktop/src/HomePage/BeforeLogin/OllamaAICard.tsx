import { useState, useEffect } from "react";
import axios from "axios";
import LocalAiMemory from "../../assets/FeatureCardIcons/LocalAiMemory.png";

export const LocalAIFeature = () => {
    const [ollamaRunning, setOllamaRunning] = useState<boolean>(false);

    const checkOllamaRunning = async () => {
        try {
            const response = await axios.get("http://localhost:8000/ollama");
            setOllamaRunning(response?.data);
        } catch (error) {
            console.error("Error checking Ollama status:", error);
            setOllamaRunning(false);
        }
    };

    // Check if Ollama is running when the component mounts
    useEffect(() => {
        checkOllamaRunning();
    }, []);

    return (
        <div className="flex flex-col p-3 md:p-4 lg:p-2 
                    hover:bg-white/10 rounded-lg transition-colors">
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

            <p className="text-xs md:text-sm lg:text-base text-gray-600 pl-11 md:pl-14 lg:pl-14">
                <span style={{ fontFamily: '"Playfair Display", serif' }}>
                    cause here nothing leaves your machine
                </span>
            </p>

            {/* Ollama Detected Locally  */}
            <div className="flex items-center gap-2 pl-5 mt-8">
                <div className="flex items-center gap-2">
                    {ollamaRunning ? (
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    ) : (
                        <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-red-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                    )}
                    <span className="text-xs md:text-sm lg:text-base text-gray-600">
                        {ollamaRunning ? "Ollama detected locally" : "Ollama not detected"}
                    </span>
                </div>
            </div>

        </div>
    );
};