import { LineChart, Bot, SquareTerminal, CalendarClock} from "lucide-react";
import { useAppStore } from "../../../../store";
import { OllamaAIModelDropdown } from "./OllamaAIModelDropdown";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export const SideBarAfterLogin = () => {
    const { setSelectedSidebar, selectedSidebar } = useAppStore();
    const { t } = useTranslation();

    return (
        <div className="flex flex-col h-full w-full px-4 py-6 bg-[#fae4b2] border-r border-[#e6cfa7]">
            <div className="flex flex-col gap-2 mt-2 flex-grow">
                <button 
                    onClick={() => setSelectedSidebar('Contextual RAG Memory')} 
                    className="relative flex items-center gap-3 px-3 py-2 rounded-md font-serif text-base w-full cursor-pointer"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                >
                    {selectedSidebar === 'Contextual RAG Memory' && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-[#2F4F4F] rounded-md"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-3">
                        <SquareTerminal className={`w-5 h-5 ${selectedSidebar === 'Contextual RAG Memory' ? 'text-white' : 'text-[#2F4F4F]'}`} />
                        <span className={selectedSidebar === 'Contextual RAG Memory' ? 'text-white' : 'text-[#2F4F4F]'}>
                            {t('sidebar.contextualRag')}
                        </span>
                    </span>
                </button>
                <button 
                    onClick={() => setSelectedSidebar('Mood Insights')} 
                    className="relative flex items-center gap-3 px-3 py-2 rounded-md font-serif text-base w-full cursor-pointer"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                >
                    {selectedSidebar === 'Mood Insights' && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-[#2F4F4F] rounded-md"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-3">
                        <LineChart className={`w-5 h-5 ${selectedSidebar === 'Mood Insights' ? 'text-white' : 'text-[#2F4F4F]'}`} />
                        <span className={selectedSidebar === 'Mood Insights' ? 'text-white' : 'text-[#2F4F4F]'}>
                            {t('sidebar.moodInsights')}
                        </span>
                    </span>
                </button>
                <button 
                    onClick={() => setSelectedSidebar('Vinaya Ollama AI')} 
                    className="relative flex items-center gap-3 px-3 py-2 rounded-md font-serif text-base w-full cursor-pointer"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                >
                    {selectedSidebar === 'Vinaya Ollama AI' && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-[#2F4F4F] rounded-md"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-3">
                        <Bot className={`w-5 h-5 ${selectedSidebar === 'Vinaya Ollama AI' ? 'text-white' : 'text-[#2F4F4F]'}`} />
                        <span className={selectedSidebar === 'Vinaya Ollama AI' ? 'text-white' : 'text-[#2F4F4F]'}>
                            {t('sidebar.vinayaAI')}
                        </span>
                    </span>
                </button>
                <button 
                    onClick={() => setSelectedSidebar('Retrieve Past Entries')} 
                    className="relative flex items-center gap-3 px-3 py-2 rounded-md font-serif text-base w-full cursor-pointer"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                >
                    {selectedSidebar === 'Retrieve Past Entries' && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-[#2F4F4F] rounded-md"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-3">
                        <CalendarClock className={`w-5 h-5 ${selectedSidebar === 'Retrieve Past Entries' ? 'text-white' : 'text-[#2F4F4F]'}`} />
                        <span className={selectedSidebar === 'Retrieve Past Entries' ? 'text-white' : 'text-[#2F4F4F]'}>
                            {t('sidebar.retrieveEntries')}
                        </span>
                    </span>
                </button>
            </div>
            <div className="mt-8">
                <OllamaAIModelDropdown />
            </div>
        </div>
    );
};
