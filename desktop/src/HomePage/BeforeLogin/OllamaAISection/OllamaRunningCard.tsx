import { useEffect} from "react";
import axios from "axios";
import { useAppStore } from "../../../store";
import { useTranslation } from "react-i18next";

const RamBadge = ({ ram }: { ram: string }) => (
    <span className="px-3 py-0.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg 
                   text-[var(--text-main)] text-[11px] tracking-wide ml-4" 
          style={{fontFamily: '"Fira Sans", sans-serif'}}>
        {ram}
    </span>
);

const ExploreMoreSection = () => {
    const { t } = useTranslation();
    return (
    <>
        {/* Divider */}
        <div className="border-t border-[var(--border-color)] mt-2"></div>

        {/* Explore More Section */}
        <div className="p-4 text-center">
            <p className="text-sm text-[var(--text-muted)] mb-2" 
               style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                {t('features.localAI.lookingForModels')}
            </p>
            <a
                href="https://ollama.ai/library"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--text-main)] hover:text-[var(--text-main)] 
                         text-sm font-medium transition-all duration-200 ease-in-out
                         underline decoration-[var(--text-main)] decoration-1 underline-offset-2 
                         hover:decoration-[var(--text-main)] hover:scale-105 transform"
                style={{ fontFamily: '"Fira Sans", sans-serif' }}
            >
                {t('features.localAI.exploreLibrary')}
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
)};

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
    const { t } = useTranslation();

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
                
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg">
                    <p className="p-6 text-[var(--text-main)] text-base font-serif border-b border-[var(--border-color)] 
                              tracking-wide text-center">
                        {t('features.localAI.setupFirstCompanion')}
                    </p>

                    {/* Mistral Card */}
                    <div className="p-4 border-b border-[var(--border-color)]">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center">
                                    <h3 className="text-lg font-serif text-[var(--text-main)] mr-5">mistral:7b</h3>
                                    <RamBadge ram="8GB+ RAM" />
                                </div>
                                <p className="text-xs text-[var(--text-muted)] mt-1 italic" 
                                   style={{fontFamily: 'Fira Sans'}}>
                                    {t('features.localAI.mistralDesc')}
                                </p>
                            </div>
                            <button className="bg-[var(--bg-card)] text-[var(--text-main)] px-4 py-1.5 rounded-md 
                                           text-sm hover:bg-[var(--bg-card)] border border-[var(--border-color)] transition-colors cursor-pointer" 
                                    style={{ fontFamily: "serif" }}>
                                {t('features.localAI.install')}
                            </button>
                        </div>
                    </div>

                    {/* Phi Card */}
                    <div className="p-4 border-b border-[var(--border-color)]">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center">
                                    <h3 className="text-lg font-serif text-[var(--text-main)] mr-8">phi:2.7b</h3>
                                    <RamBadge ram="4-8GB RAM" />
                                </div>
                                <p className="text-xs text-[var(--text-muted)] mt-1 italic" 
                                   style={{fontFamily: 'Fira Sans'}}>
                                    {t('features.localAI.phiDesc')}
                                </p>
                            </div>
                            <button className="bg-[var(--bg-card)] text-[var(--text-main)] px-4 py-1.5 rounded-md 
                                           text-sm hover:bg-[var(--bg-card)] border border-[var(--border-color)] transition-colors cursor-pointer" 
                                    style={{ fontFamily: "serif" }}>
                                {t('features.localAI.install')}
                            </button>
                        </div>
                    </div>

                    {/* TinyLlama Card */}
                    <div className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center">
                                    <h3 className="text-lg font-serif text-[var(--text-main)] mr-2">TinyLlama</h3>
                                    <RamBadge ram="2-4GB RAM" />
                                </div>
                                <p className="text-xs text-[var(--text-muted)] mt-1 italic" 
                                   style={{fontFamily: 'Fira Sans'}}>
                                    {t('features.localAI.tinyLlamaDesc')}
                                </p>
                            </div>
                            <button className="bg-[var(--bg-card)] text-[var(--text-main)] px-4 py-1.5 rounded-md 
                                           text-sm hover:bg-[var(--bg-card)] border border-[var(--border-color)] transition-colors cursor-pointer" 
                                    style={{ fontFamily: "serif" }}>
                                {t('features.localAI.install')}
                            </button>
                        </div>
                    </div>

                    <ExploreMoreSection />
                </div>
            ) : (
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg">
                    <p className="p-6 text-[var(--text-main)] text-base border-b border-[var(--border-color)] 
                              tracking-wide font-serif text-center">
                        {t('features.localAI.availableModels')}
                    </p>

                    {ollamaModels.map((model, index) => (
                        <div key={index} className={`p-4 ${
                            index !== ollamaModels.length - 1 ? 'border-b border-[var(--border-color)]' : ''
                        }`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center">
                                        <h3 className="text-lg font-serif text-[var(--text-main)]">{model}</h3>
                                        <RamBadge ram={t('features.localAI.ready')} />
                                    </div>
                                    <p className="text-xs text-[var(--text-muted)] mt-1 italic" 
                                       style={{fontFamily: 'Fira Sans'}}>
                                        {t('features.localAI.readyToUse')}
                                    </p>
                                </div>
                                <button className="bg-[var(--bg-card)] text-[var(--text-main)] px-4 py-1.5 rounded-md 
                                               text-sm hover:bg-[var(--bg-card)] border border-[var(--border-color)] transition-colors cursor-pointer" 
                                        style={{ fontFamily: "serif" }}>
                                    {t('features.localAI.remove')}
                                </button>
                            </div>
                        </div>
                    ))}

                    <ExploreMoreSection />
                </div>
            )}
        </div>
    );
};