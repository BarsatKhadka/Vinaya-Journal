import { LineChart, Bot, SquareTerminal, CalendarClock} from "lucide-react";
import { useAppStore } from "../../../../store";
import { OllamaAIModelDropdown } from "./OllamaAIModelDropdown";


export const SideBarAfterLogin = () => {
    const { setSelectedSidebar } = useAppStore();
    return (
        <div className="flex flex-col h-full w-full px-4 py-6 bg-[#fae4b2] border-r border-[#e6cfa7]"
        >
            <div className="flex flex-col gap-2 mt-2 flex-grow">
                <button onClick={() => setSelectedSidebar('Contextual RAG Memory')} className="flex items-center gap-3 px-3 py-2 rounded-md text-[#2F4F4F] font-serif text-base hover:bg-[#e6cfa7] transition-all w-full cursor-pointer">
                    <SquareTerminal className="w-5 h-5" />
                    <span>Contextual RAG</span>
                </button>
                <button onClick={() => setSelectedSidebar('Mood Insights')} className="flex items-center gap-3 px-3 py-2 rounded-md text-[#2F4F4F] font-serif text-base hover:bg-[#e6cfa7] transition-all w-full cursor-pointer">
                    <LineChart className="w-5 h-5" />
                    <span>Mood Insights</span>
                </button>
                <button onClick={() => setSelectedSidebar('Vinaya Ollama AI')} className="flex items-center gap-3 px-3 py-2 rounded-md text-[#2F4F4F] font-serif text-base hover:bg-[#e6cfa7] transition-all w-full cursor-pointer">
                    <Bot className="w-5 h-5" />
                    <span>Vinaya Ollama AI</span>
                </button>
                <button onClick={() => setSelectedSidebar('Retrieve Past Entries')} className="flex items-center gap-3 px-3 py-2 rounded-md text-[#2F4F4F] font-serif text-base hover:bg-[#e6cfa7] transition-all w-full cursor-pointer">
                    <CalendarClock className="w-5 h-5" />
                    <span>Retrieve Past Entries</span>
                </button>
            </div>
            <div className="mt-8">
                <OllamaAIModelDropdown />
            </div>
        </div>
    );
};
