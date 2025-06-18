import { useEffect} from "react";
import axios from "axios";
import { useAppStore } from "../../../store";

const RamBadge = ({ ram }: { ram: string }) => (
    <span className="px-3 py-0.5 bg-[#E6E2DD] border border-[#CFCAC2] rounded-lg 
                   text-gray-700 text-[11px] tracking-wide ml-4" 
          style={{fontFamily: '"Fira Sans", sans-serif'}}>
        {ram}
    </span>
);

const InstallButton = ({ modelName }: { modelName: string }) => {
    const isWindows = navigator.platform.indexOf('Win') !== -1;
    const tooltipText = isWindows 
        ? `Download ${modelName} from Ollama app` 
        : `Run: ollama pull ${modelName}`;

    return (
        <div className="relative group">
            <button className="bg-[#2F4F4F] text-white px-4 py-1.5 rounded-md 
                           text-sm hover:bg-[#1F3F3F] transition-colors cursor-pointer" 
                    style={{ fontFamily: "serif" }}>
                Install
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 
                        bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10
                        before:content-[''] before:absolute before:top-full before:left-1/2 
                        before:transform before:-translate-x-1/2 before:border-4 before:border-transparent 
                        before:border-t-gray-800">
                {tooltipText}
            </div>
        </div>
    );
};

const RemoveButton = ({ modelName }: { modelName: string }) => {
    const isWindows = navigator.platform.indexOf('Win') !== -1;
    const tooltipText = isWindows 
        ? `Remove ${modelName} from Ollama app` 
        : `Run: ollama rm ${modelName}`;

    return (
        <div className="relative group">
            <button className="bg-[#2F4F4F] text-white px-4 py-1.5 rounded-md 
                           text-sm hover:bg-[#1F3F3F] transition-colors cursor-pointer" 
                    style={{ fontFamily: "serif" }}>
                Remove
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 
                        bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10
                        before:content-[''] before:absolute before:top-full before:left-1/2 
                        before:transform before:-translate-x-1/2 before:border-4 before:border-transparent 
                        before:border-t-gray-800">
                {tooltipText}
            </div>
        </div>
    );
};

const ExploreMoreSection = () => (
    <>
        {/* Divider */}
        <div className="border-t border-gray-200 mt-2"></div>

        {/* Explore More Section */}
        <div className="p-4 text-center">
            <p className="text-sm text-gray-600 mb-2" 
               style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                Looking for different models?
            </p>
            <a
                href="https://ollama.ai/library"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#2F4F4F] hover:text-[#1F3F3F] 
                         text-sm font-medium transition-all duration-200 ease-in-out
                         underline decoration-[#2F4F4F] decoration-1 underline-offset-2 
                         hover:decoration-[#1F3F3F] hover:scale-105 transform"
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
    </>
);

export const fetchOllamaModels = async (): Promise<string[]> => {
    try {
        const response = await axios.get("http://localhost:8000/models");
        return response?.data.models || [];
    } catch (error) {
        console.error("Error checking Ollama status:", error);
        return [];
    }
};

export const OllamaRunningCard = () => {
    const {ollamaModels, setOllamaModels, setCurrentModel} = useAppStore()

    useEffect(() => {
        const fetchModels = async () => {
            const models = await fetchOllamaModels();
            if(models.length != 0) {
                setCurrentModel(models[0]);
            }
            setOllamaModels(models);
        };
        fetchModels();
    }, []);

    return (
        <div className="px-2 py-2">
            {ollamaModels.length === 0 ? (
                
                <div className="bg-[#F7F4F0] border border-gray-300 rounded-lg bg-[#FCFBFA]">
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
                            <InstallButton modelName="mistral:7b" />
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
                            <InstallButton modelName="phi:2.7b" />
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
                            <InstallButton modelName="TinyLlama" />
                        </div>
                    </div>

                    <ExploreMoreSection />
                </div>
            ) : (
                <div className="bg-[#F7F4F0] border border-gray-400 rounded-lg">
                    <p className="p-6 text-gray-700 text-base border-b border-gray-200 
                              tracking-wide font-serif text-center">
                        Available local models
                    </p>

                    {ollamaModels.map((model, index) => (
                        <div key={index} className={`p-4 ${
                            index !== ollamaModels.length - 1 ? 'border-b border-gray-200' : ''
                        }`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center">
                                        <h3 className="text-lg font-serif text-gray-800">{model}</h3>
                                        <RamBadge ram="Ready" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 italic" 
                                       style={{fontFamily: 'Fira Sans'}}>
                                        Local model - ready to use
                                    </p>
                                </div>
                                <RemoveButton modelName={model} />
                            </div>
                        </div>
                    ))}

                    <ExploreMoreSection />
                </div>
            )}
        </div>
    );
};